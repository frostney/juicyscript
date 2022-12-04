import { Operator } from "./operators";
import { Token, TokenType } from "./token";

import parse from "./parser";

const operatorValues = Object.keys(Operator).map((x) => Operator[x]);
const isOperator = (token: string): boolean =>
  operatorValues.indexOf(token) >= 0;

console.log(
  parse(`hello = 'world'\nnum=5\nsum = 2 + 4\nanswer = () -> 42\nanswer()`)
);
