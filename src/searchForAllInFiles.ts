import { window, commands } from 'vscode';
import { displayErrorMessage, generateRegexForSearch } from './utils';

/**
 * Add values to command, and search for files containing ALL of the provided strings, in any order
 * @example Input = thing1,somethingElse
 * @output Search = ((thing1)(.*\n)*.*(somethingElse))|((somethingElse)(.*\n)*.*(thing1))
 */
export default async () => {
  // TODO: Refactor to better input style - Maybe Quickpick?
  const userInput = await window.showInputBox({ placeHolder: 'Input comma separated values to find in all files...' });

  if (!userInput) {
    displayErrorMessage('No user input provided');
    return;
  }

  const asArray = userInput?.split(',');
  console.log('asArray', asArray);

  const query = generateRegexForSearch(asArray);
  console.log('query', query);

  const args = {
    isRegex: true,
    triggerSearch: true,
    query,
  };
  commands.executeCommand('workbench.action.findInFiles', args);
};