/**
 * Capitalize the first letter of the string
 */
export function toTitleCase(s) {
  if (!s) {
    return s;
  }
  return s.substr(0, 1).toUpperCase() + s.substr(1);
}

/**
 * Clean out any non-ascii characters in the test
 */
export function cleanText(t) {
  if (!t) {
    // console.log("!t");
    // console.log(t);
    return "";
  }
  function cleanChar(c) {
    const code = c.charCodeAt(0);
    if (code > 127) {
      console.log(`Code ${code}: ${c}`);
      return "?";
    } else {
      return c;
    }
  }
  return t.split("").map(cleanChar).join("");
}
