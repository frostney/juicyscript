import { Lexer } from "./Lexer";
import { Parser } from "./Parser";
import { Interpreter } from "./Interpreter";

const t0 = performance.now();
const input = `add = (a, b) => a + b`;
const lexer = new Lexer(input);
const tokens = lexer.lex();
const t1 = performance.now();

console.log(tokens);

const parser = new Parser(tokens);
const ast = parser.parse();
const t2 = performance.now();

console.log(ast);

const interpreter = new Interpreter(ast);
console.log(interpreter);

const t3 = performance.now();

console.log(`Lexer: ${(t1 - t0).toFixed(3)}ms`);
console.log(`Parser: ${(t2 - t1).toFixed(3)}ms`);
console.log(`Interpreter: ${(t3 - t2).toFixed(3)}ms`);
console.log(`Total: ${(t3 - t0).toFixed(3)}ms`);

// const code = `
//   add = (a, b) => a + b
//   result = add(1, 2)
// `;

// const lexer = new Lexer(code)
// const parser = new Parser(lexer)
// const interpreter = new Interpreter(parser.parse())

// console.log(interpreter.functions.get('result')) // should print 3
