import { readFileSync } from "fs";
export const style = (stylesheet) => {
    return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
};
export const partial = (file, context) => {
    const path = `./${context.settings.views}/${file}.custom`;
    return readFileSync(path, "utf-8");
};
export const conditional = (expression, trueFile, falseFile, context, evalFunc) => {
    return partial(evalFunc(expression) ? trueFile : falseFile, context);
};
