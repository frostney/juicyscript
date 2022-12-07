export enum ASTNodeType {
  Program = "Program",
  Function = "Function",
  Identifier = "Identifier",
  Number = "Number",
  String = "String",
  BinaryExpr = "BinaryExpr",
}

export class ASTNode {
  type: ASTNodeType;
  value: any;
  name: string | undefined;
  args: string[] | undefined;
  left: ASTNode | undefined;
  right: ASTNode | undefined;
  children: ASTNode[];

  constructor(
    type: ASTNodeType,
    value?: any,
    name?: string,
    args?: string[],
    left?: ASTNode,
    right?: ASTNode,
    children?: ASTNode[]
  ) {
    this.type = type;
    this.value = value;
    this.name = name;
    this.args = args;
    this.left = left;
    this.right = right;
    this.children = children || [];
  }
}
