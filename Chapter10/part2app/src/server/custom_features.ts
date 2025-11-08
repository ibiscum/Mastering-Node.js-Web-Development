import { readFileSync } from "fs";

export const style = (stylesheet: string) => {
  return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
};

export const partial = (file: string, context: unknown) => {
  const path = `./${context.settings.views}/${file}.custom`;
  return readFileSync(path, "utf-8");
};

export const conditional = (
  expression: string,
  trueFile: string,
  falseFile: string,
  context: unknown,
  evalFunc: (expr: string) => unknown,
) => {
  return partial(evalFunc(expression) ? trueFile : falseFile, context);
};
