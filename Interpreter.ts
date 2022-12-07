import { ASTNodeType, ASTNode } from "./ASTNode";

export class Interpreter {
  private functions: Map<string, ASTNode>;

  constructor(ast: ASTNode) {
    this.functions = new Map();
    this.evaluate(ast);
  }

  private evaluate(node: ASTNode): any {
    switch (node.type) {
      case ASTNodeType.Program:
        return this.evaluateProgram(node);
      case ASTNodeType.Function:
        return this.evaluateFunction(node);
      case ASTNodeType.Identifier:
        return this.evaluateIdentifier(node);
      case ASTNodeType.Number:
        return this.evaluateNumber(node);
      case ASTNodeType.String:
        return this.evaluateString(node);
      case ASTNodeType.BinaryExpr:
        return this.evaluateBinaryExpr(node);
      default:
        throw new Error(`Invalid node type: ${node.type}`);
    }
  }

  private evaluateProgram(node: ASTNode): any {
    for (const child of node.children) {
      this.evaluate(child);
    }
  }

  private evaluateFunction(node: ASTNode): any {
    this.functions.set(node.name || "Anonymous", node);
  }

  private evaluateIdentifier(node: ASTNode): any {
    const value = this.functions.get(node.value);
    if (value === undefined) {
      throw new Error(`Undefined identifier: ${node.value}`);
    }
    return value;
  }

  private evaluateNumber(node: ASTNode): any {
    return node.value;
  }

  private evaluateString(node: ASTNode): any {
    return node.value;
  }

  private evaluateBinaryExpr(node: ASTNode): any {
    const left = node.left ? this.evaluate(node.left) : null;
    const right = node.right ? this.evaluate(node.right) : null;
    switch (node.value) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "/":
        return left / right;
      default:
        throw new Error(`Invalid operator: ${node.value}`);
    }
  }
}
