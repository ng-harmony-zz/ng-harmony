/* */ 
(function(process) {
  var UglifyJS = require("../tools/node"),
      escodegen = require("escodegen"),
      esfuzz = require("esfuzz"),
      estraverse = require("estraverse"),
      prefix = Array(20).join("\b") + "    ";
  function normalizeInput(ast) {
    return estraverse.replace(ast, {enter: function(node, parent) {
        switch (node.type) {
          case "ObjectExpression":
            node.properties.forEach(function(property) {
              property.type = "Property";
            });
            break;
          case "Property":
            var key = node.key;
            if (key.type === "Literal" && typeof key.value === "string" && UglifyJS.is_identifier(key.value)) {
              node.key = {
                type: "Identifier",
                name: key.value
              };
            } else if (key.type === "Identifier" && !UglifyJS.is_identifier(key.name)) {
              node.key = {
                type: "Literal",
                value: key.name
              };
            }
            break;
          case "SequenceExpression":
            node.expressions = node.expressions.reduce(function flatten(list, expr) {
              return list.concat(expr.type === "SequenceExpression" ? expr.expressions.reduce(flatten, []) : [expr]);
            }, []);
            if (node.expressions.length === 1) {
              return node.expressions[0];
            }
            break;
        }
      }});
  }
  module.exports = function(options) {
    console.log("--- UglifyJS <-> Mozilla AST conversion");
    for (var counter = 0; counter < options.iterations; counter++) {
      process.stdout.write(prefix + counter + "/" + options.iterations);
      var ast1 = normalizeInput(esfuzz.generate({maxDepth: options.maxDepth}));
      var ast2 = UglifyJS.AST_Node.from_mozilla_ast(ast1).to_mozilla_ast();
      var astPair = [{
        name: 'expected',
        value: ast1
      }, {
        name: 'actual',
        value: ast2
      }];
      var jsPair = astPair.map(function(item) {
        return {
          name: item.name,
          value: escodegen.generate(item.value)
        };
      });
      if (jsPair[0].value !== jsPair[1].value) {
        var fs = require("fs");
        var acorn = require("acorn");
        fs.existsSync("tmp") || fs.mkdirSync("tmp");
        jsPair.forEach(function(item) {
          var fileName = "tmp/dump_" + item.name;
          var ast = acorn.parse(item.value);
          fs.writeFileSync(fileName + ".js", item.value);
          fs.writeFileSync(fileName + ".json", JSON.stringify(ast, null, 2));
        });
        process.stdout.write("\n");
        throw new Error("Got different outputs, check out tmp/dump_*.{js,json} for codes and ASTs.");
      }
    }
    process.stdout.write(prefix + "Probability of error is less than " + (100 / options.iterations) + "%, stopping.\n");
  };
})(require("process"));
