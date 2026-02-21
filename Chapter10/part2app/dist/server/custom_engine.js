import { readFile } from "fs";
import * as features from "./custom_features.js";
const renderTemplate = (path, context, callback) => {
    readFile(path, (err, data) => {
        if (err != undefined) {
            callback("Cannot generate content", undefined);
        }
        else {
            callback(undefined, parseTemplate(data.toString(), { ...context, features }));
        }
    });
};
const parseTemplate = (template, context) => {
    const ctx = Object.keys(context)
        .map((k) => `const ${k} = context.${k}`)
        .join(";");
    const expr = /{{(.*)}}/gm;
    return template.toString().replaceAll(expr, (match, group) => {
        const evalFunc = (expr) => {
            return eval(`${ctx};${expr}`);
        };
        try {
            if (group.trim()[0] === "@") {
                group = `features.${group.trim().substring(1)}`;
                group = group.replace(/\)$/m, ", context, evalFunc)");
            }
            let result = evalFunc(group);
            if (expr.test(result)) {
                result = parseTemplate(result, context);
            }
            return result;
        }
        catch (err) {
            return err;
        }
    });
};
export const registerCustomTemplateEngine = (expressApp) => expressApp.engine("custom", renderTemplate);
