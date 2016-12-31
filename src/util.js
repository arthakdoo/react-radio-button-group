export const isString = (obj) => typeof obj === "string";
export const getNonEmptyAttr = (name, value) => (value ? {[name]: value} : {});


