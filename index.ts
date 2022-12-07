import { Lexer } from "./Lexer";
import { Parser } from "./Parser";
import { Interpreter } from "./Interpreter";

const input = `add = (a, b) => a + b`;
const lexer = new Lexer(input);
const tokens = lexer.lex();

console.log(tokens);

const parser = new Parser(tokens);
const ast = parser.parse();

console.log(ast);

const interpreter = new Interpreter(ast);
console.log(interpreter);

// const code = `
//   add = (a, b) => a + b
//   result = add(1, 2)
// `;

// const lexer = new Lexer(code)
// const parser = new Parser(lexer)
// const interpreter = new Interpreter(parser.parse())

// console.log(interpreter.functions.get('result')) // should print 3
