/**
 * Escape special characters in regex literal strings
 * @source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
 * @param str String
 * @returns Regex literal string with special characters escaped
 */
export const escapeRegExp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

/**
 * Return all possible permutations of an array of strings
 * @param arrOfStrings Array of strings
 * @returns 
 */
export const allPossibleOrders = (arrOfStrings: string[]): string[] => {
  const result = arrOfStrings.flatMap((curr, i) => arrOfStrings.slice(i + 1).map(w => curr + ' ' + w));
  console.log(result);
  return result;
};

// long test

// ((app-flow-page)(.*\n) *.* (chain)) | ((chain)(.*\n) *.* (app-flow-page))


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
        result.push([arr[i]].concat(rest[j]));
      }
    }
  }
  return result;
};
