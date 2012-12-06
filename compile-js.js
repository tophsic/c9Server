var input = process.argv[2];
var output = process.argv[3];

if (!input) {
    console.log("First argument is mandatory.");
    return;
}

if (!require("path").existsSync(input)) {
    console.log("Input must exist.");
    return;
}

var jsp = require(__dirname + "/node_modules/uglify-js/uglify-js").parser;
var pro = require(__dirname + "/node_modules/uglify-js/uglify-js").uglify;

var code = require("fs").readFileSync(input);

var ast = jsp.parse(code.toString());
ast = pro.ast_mangle(ast);
ast = pro.ast_squeeze(ast);

var final = pro.gen_code(ast);

if (!output) {
    console.log(final);
} else {
    try {
        require("fs").writeFileSync(output, final);
        console.info("Good job :)");
    } catch (e) {
        console.error("Cannot write to output.");
    }
}