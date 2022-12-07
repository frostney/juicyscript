import { Token, TokenType } from "./Token";
import { ASTNode, ASTNodeType } from "./ASTNode";

export class Parser {
  private tokens: Token[];
  private current: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.current = 0;
  }

  private lookahead(): Token {
    return this.tokens[this.current];
  }

  private consume(type: TokenType): Token {
    const token = this.lookahead();
    if (token.type === type) {
      this.current++;
      return token;
    }

    console.log(type);
    console.log(token.type);
    console.log(token.value);

    throw new Error(`Expected token of type ${type}, but got ${token.type}`);
  }

  private parseIdentifier(): ASTNode {
    const token = this.consume(TokenType.Identifier);
    return new ASTNode(ASTNodeType.Identifier, token.value);
  }

  private parseNumber(): ASTNode {
    const token = this.consume(TokenType.Number);
    return new ASTNode(ASTNodeType.Number, parseInt(token.value));
  }

  private parseString(): ASTNode {
    const token = this.consume(TokenType.String);
    return new ASTNode(ASTNodeType.String, token.value);
  }

  private parseParenExpr(): ASTNode {
    this.consume(TokenType.Punctuation);
    const expr = this.parseExpression();
    this.consume(TokenType.Punctuation);
    return expr;
  }

  private parsePrimaryExpr(): ASTNode {
    const lookahead = this.lookahead();
    if (lookahead.type === TokenType.Number) {
      return this.parseNumber();
    }

    if (lookahead.type === TokenType.String) {
      return this.parseString();
    }

    if (lookahead.type === TokenType.Identifier) {
      return this.parseIdentifier();
    }

    if (lookahead.type === TokenType.Punctuation && lookahead.value === "(") {
      return this.parseParenExpr();
    }

    throw new Error(`Expected primary expression, but got ${lookahead.type}`);
  }

  private parseFunction(): ASTNode {
    const name = this.consume(TokenType.Identifier);
    this.consume(TokenType.Punctuation); // =

    if (this.lookahead().type === TokenType.LeftParen) {
      // Function declaration
      this.consume(TokenType.LeftParen); // (
      const args: string[] = [];
      while (this.lookahead().type === TokenType.Identifier) {
        args.push(this.consume(TokenType.Identifier).value);
        if (
          this.lookahead().type === TokenType.Punctuation &&
          this.lookahead().value === ","
        ) {
          this.consume(TokenType.Punctuation);
        }
      }
      this.consume(TokenType.RightParen); // )
      this.consume(TokenType.Punctuation); // =
      this.consume(TokenType.Punctuation); // >
      const body = this.parseExpression();
      return new ASTNode(
        ASTNodeType.Function,
        name.value,
        "Function",
        args,
        body
      );
    } else {
      // TODO: Assignment
    }
  }

  private parseExpression(): ASTNode {
    let expr = this.parsePrimaryExpr();

    while (this.lookahead().type === TokenType.Punctuation) {
      const operator = this.consume(TokenType.Punctuation).value;
      const right = this.parsePrimaryExpr();
      expr = new ASTNode(
        ASTNodeType.BinaryExpr,
        operator,
        "BinaryExpr",
        [expr.value],
        right
      );
    }

    return expr;
  }

  public parse(): ASTNode {
    const program = new ASTNode(ASTNodeType.Program);
    while (this.lookahead().type !== TokenType.EOF) {
      program.children.push(this.parseFunction());
    }
    return program;
  }
}
