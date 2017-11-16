import * as escapeStringRegexp from 'escape-string-regexp';

import { Operator } from "./operators";
import { Token, TokenType } from './token';

const operatorValues = Object.keys(Operator).map(x => Operator[x]);
const escapedOperatorValues = Object.keys(Operator).map(x => escapeStringRegexp(Operator[x]))
const isOperator = (token: string): boolean => operatorValues.indexOf(token) >= 0

const parse = (text) => {
  const lines = text.split('\n');
  const regex = new RegExp('(' + escapedOperatorValues.join('|') + ')', 'g');

  const tokens = lines.map(line => {
    console.log(line);
    const lineSplits = line.split(regex);

    return lineSplits
      .map(token => token.trim())
      .filter(token => !!token)
      .map((token, index) => {
      if (isOperator(token)) {
        return {
          type: TokenType[TokenType.Operator],
          value: token
        }
      }

      if (index + 1 <= lineSplits.length) {
        if (lineSplits[index + 1] === Operator.Assignment) {
          return {
            type: TokenType[TokenType.Identifier],
            value: token
          }
        }
      }

      return {
        type: TokenType[TokenType.Literal],
        value: token
      };
    });
  });

  return tokens;
}


console.log(parse(`hello = 'world'\nnum=5\nsum = 2 + 4\nanswer = () -> 42`));