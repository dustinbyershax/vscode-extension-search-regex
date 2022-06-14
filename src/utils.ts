import { window } from 'vscode';

/**
 * @unused
 * Escape special characters in regex literal strings
 * @source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
 * @param str String
 * @returns Regex literal string with special characters escaped
 */
export const escapeRegExp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

export const generateRegexLiteral = (strs: string[]): string => {

  const regexString = strs.reduce((acc, curr, i) => {
    const nextStringExists = !!strs[i + 1];
    // If it is the beginning of the string, add capture group opening
    if (i === 0) {
      acc += '(';
    }
    // Add string to search for
    acc += `(${curr})`;
    // If more strings to search for, account for anything in between, multi-line strings etc
    if (nextStringExists) {
      acc += `(.*\\n)*.*`;
      // Close capture group
    } else {
      acc += `)`;
    }
    return acc;
  }, '');
  return regexString;
};

/**
 * Generate regex string for all matching words, in any order
 * @param arrOfStrings Array of strings
 * @returns Reg literal string like "((app-flow-page)(.*\n)*.*(chain))|((chain)(.*\n)*.*(app-flow-page))"
 */
export const generateRegexForSearch = (arr: string[]): string => {
  const arrayOfStrings = arr.map(str => escapeRegExp(str));
  let regexLiteralString = '';
  //  Return all possible permutations of an array of strings
  const getPermutations = (arr: string[]): string[][] => {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      const first = arr.slice(0, i);
      const second = arr.slice(i + 1);
      const both = first.concat(second);

      const rest = getPermutations(both);
      if (!rest.length) {
        result.push([arr[i]]);
      } else {
        for (let j = 0; j < rest.length; j++) {
          const inner = [arr[i]].concat(rest[j]);
          result.push(inner);
          if (inner.length === arrayOfStrings.length) {
            // when the row is complete, we add this to the regex query string
            regexLiteralString += generateRegexLiteral(inner);
            if (i < arr.length - 1) {
              regexLiteralString += '|';
            }
          }
        }
      }
    }
    return result;
  };

  getPermutations(arrayOfStrings);
  return regexLiteralString;
};

// Display an error message box to the user
export const displayErrorMessage = (string: string) => window.showErrorMessage(string);