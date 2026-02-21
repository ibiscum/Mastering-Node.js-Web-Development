const matchPattern = /[&<>="'`]/g;
const characterMappings = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "=": "&#x3D;",
    "'": "&#x27;",
    "`": "&#x60;",
};
export const santizeValue = (value) => value?.replace(matchPattern, (match) => characterMappings[match]);
