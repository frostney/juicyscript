import { Token, TokenType } from "./Token";

const keywords = ["if", "else", "for", "while"];

const leftParen = "(";
const rightParen = ")";

const punctuation = [
  "{",
  "}",
  "[",
  "]",
  ".",
  ",",
  ";",
  ":",
  "=",
  "+",
  "-",
  "*",
  "/",
  "%",
  ">",
  "<",
  "!",
  "?",
];

export class Lexer {
  private input: string;
  private position: number;
  private current: string;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.current = this.input[this.position];
  }

  private next(): void {
    this.position++;
    this.current = this.input[this.position];
  }

  private isNumber(c: string): boolean {
    return !isNaN(parseInt(c));
  }

  private isAlpha(c: string): boolean {
    return /[a-z]/i.test(c);
  }

  private isAlphaNumeric(c: string): boolean {
    return this.isNumber(c) || this.isAlpha(c);
  }

  private skipWhitespace(): void {
    while (this.current && this.current === " ") {
      this.next();
    }
  }

  private skipTab(): void {
    while (this.current && this.current === "\t") {
      this.next();
    }
  }

  private skipNewline(): void {
    while (this.current && this.current === "\n") {
      this.next();
    }
  }

  private readNumber(): Token {
    let number = "";
    while (this.current && this.isNumber(this.current)) {
      number += this.current;
      this.next();
    }

    return new Token(TokenType.Number, number);
  }

  private readString(): Token {
    let str = "";
    while (this.current && this.current !== '"') {
      str += this.current;
      this.next();
    }

    if (this.current === '"') {
      this.next();
    }

    return new Token(TokenType.String, str);
  }

  private readIdentifier(): Token {
    let identifier = "";
    while (this.current && this.isAlphaNumeric(this.current)) {
      identifier += this.current;
      this.next();
    }

    if (keywords.includes(identifier)) {
      return new Token(TokenType.Keyword, identifier);
    }

    return new Token(TokenType.Identifier, identifier);
  }

  private readPunctuation(): Token {
    let punctuation = this.current;
    this.next();
    return new Token(TokenType.Punctuation, punctuation);
  }

  private readParen(): Token {
    let paren = this.current;
    this.next();
    if (paren === leftParen) {
      return new Token(TokenType.LeftParen, paren);
    }

    return new Token(TokenType.RightParen, paren);
  }

  nextToken(): Token {
    while (this.current) {
      if (this.current === " ") {
        this.skipWhitespace();
        continue;
      }

      if (this.current === "\t") {
        this.skipTab();
        continue;
      }

      if (this.current === "\n") {
        this.skipNewline();
      }

      if (this.isNumber(this.current)) {
        return this.readNumber();
      }

      if (this.current === '"') {
        return this.readString();
      }

      if (this.isAlpha(this.current)) {
        return this.readIdentifier();
      }

      if ([leftParen, rightParen].includes(this.current)) {
        return this.readParen();
      }

      if (punctuation.includes(this.current)) {
        return this.readPunctuation();
      }

      throw new Error(`Unrecognized character: ${this.current}`);
    }

    return new Token(TokenType.EOF, "");
  }

  public lex(): Token[] {
    const tokens: Token[] = [];

    while (true) {
      const token = this.nextToken();
      tokens.push(token);
      if (token.type === TokenType.EOF) {
        break;
      }
    }

    return tokens;
  }
}
