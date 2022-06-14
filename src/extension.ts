import vscode from 'vscode';
import searchFilesWithRegex from './searchForAllInFiles';

export function activate(context: vscode.ExtensionContext) {
	// code here is run once when extension is activated.
	console.log('findAllStrings command added!');
	// in registerCommand, code will be executed every time the command is invoked
	const disposable = vscode.commands.registerCommand('extension.findAllStrings', searchFilesWithRegex);

	context.subscriptions.push(disposable);
}