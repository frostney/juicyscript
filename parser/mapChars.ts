import { CharToken } from "./CharToken";

const mapChars = (text: string): CharToken[] => {
  let col = 0;
  let line = 0;
  let returnNextLine = false;

  const chars = text
    .split("")
    .map(char => {
      col = col + 1;

      if (returnNextLine) {
        line = line + 1;
        col = 0;
        returnNextLine = false;
      }

      if (char === "\n") {
        returnNextLine = true;
      }

      return {
        char,
        col,
        line
      };
    })
    .filter(({ char }) => char !== " ");

  return chars;
};

export default mapChars;
