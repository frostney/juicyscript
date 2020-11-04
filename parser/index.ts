import mapChars from "./mapChars";
import firstPass from "./firstPass";
import secondPass from "./secondPass";

const parse = (text: string): object[] =>
  text
  |> mapChars
  |> firstPass
  |> secondPass

export default parse;
