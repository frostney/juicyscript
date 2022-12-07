export class Token {
  type: TokenType;
  value: string;

  constructor(type: TokenType, value: string) {
    this.type = type;
    this.value = value;
  }
}

export enum TokenType {
  Number = "Number",
  String = "String",
  Identifier = "Identifier",
  Keyword = "Keyword",
  Punctuation = "Punctuation",
  LeftParen = "LeftParen",
  RightParen = "RightParen",
  EOF = "EOF",
}
