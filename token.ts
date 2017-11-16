export enum TokenType {
  Operator,
  Identifier,
  Literal
}

export interface Token {
  type: TokenType,
  value: string
}

export type TokenList = Array<Token>