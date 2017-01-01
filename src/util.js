export const isString = (obj) => typeof obj === "string";
export const getNonEmptyAttr = (name, value) => (value ? {[name]: value} : {});
export const selectStringParam = (...options) => options.find((option) => isString(option));
