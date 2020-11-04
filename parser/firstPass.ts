import { CharToken } from "./CharToken";

const firstPass = (chars: CharToken[]): object[] => {
  let buffer = "";

  return chars.reduce(
    (previousValue: object[], charToken: CharToken, index: number, arr) => {
      const { char, col, line } = charToken;

      if (char === "\n") {
        if (buffer) {
          previousValue.push({
            value: buffer,
            col: col - buffer.length,
            line: line
          });
          buffer = "";
        }
        return previousValue;
      }

      if (!char.match(/[a-zA-Z0-9\x7f-\xff]/)) {
        if (buffer) {
          previousValue.push({
            value: buffer,
            col: col - buffer.length,
            line: line
          });
          buffer = "";
        }

        previousValue.push({
          type: "Punctuator",
          value: char,
          col: col,
          line: line
        });

        return previousValue;
      }

      buffer += char;

      if (index === arr.length - 1) {
        previousValue.push({
          value: buffer,
          col: col - 1,
          line: line
        });
        buffer = "";
      }

      return previousValue;
    },
    []
  );
};

export default firstPass;
