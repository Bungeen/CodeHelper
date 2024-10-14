import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "CodeHelper" is now active!');
	
	const disposables: vscode.Disposable[] = [];  //Array of desposables objects

	let scrollDownCommand = vscode.commands.registerCommand('CodeHelper.ScrollDown', () => {
		const editor = vscode.window.activeTextEditor;
        if (editor) {
            const currentPosition = editor.selection.active;
			const document = editor.document;
			const lastLineIndex = document.lineCount - 1;
			if (currentPosition.line > 0 && lastLineIndex != currentPosition.line) {
				const newPosition = currentPosition.translate(1, 0);

            	editor.selection = new vscode.Selection(newPosition, newPosition);
				const reverseNewPosition = currentPosition.translate(-1, 0)
            	editor.revealRange(new vscode.Range(reverseNewPosition, reverseNewPosition), vscode.TextEditorRevealType.InCenter);
			} else if (lastLineIndex != currentPosition.line) {
				const newPosition = currentPosition.translate(1, 0);

            	editor.selection = new vscode.Selection(newPosition, newPosition);
			}
        }
	});
	disposables.push(scrollDownCommand);

	let scrollUpCommand = vscode.commands.registerCommand('CodeHelper.ScrollUp', () => {
		const editor = vscode.window.activeTextEditor;

        if (editor) {
			const currentPosition = editor.selection.active;
			const document = editor.document;
			if (currentPosition.line > 0) {
            	const currentPosition = editor.selection.active;
            	const newPosition = currentPosition.translate(-1, 0);

            	editor.selection = new vscode.Selection(newPosition, newPosition);
				const reverseNewPosition = currentPosition.translate(1, 0)
            	editor.revealRange(new vscode.Range(reverseNewPosition, reverseNewPosition), vscode.TextEditorRevealType.InCenter);
			}
        }
	});
	disposables.push(scrollUpCommand);

	let extractFunctionCommand = vscode.commands.registerCommand('CodeHelper.ExtractFunction', async () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const text = editor.document.getText(selection).split('\n').map(line => line.trim()).join('\n\t');
			const functionName = await vscode.window.showInputBox({ prompt: 'Write the name of function' });
			const functionType = await vscode.window.showInputBox({ prompt: 'Write the function type' });
			const functionArgs = await vscode.window.showInputBox({ prompt: 'Write args for function separated by commas' });
			if (functionName && functionType) {
				const functionDefinition = `\n${functionType} ${functionName}(${functionArgs}) {\n\t${text}\n\n \treturn${functionType === 'void' ? ';' : ` ${functionType}();`}\n}\n`;
				vscode.env.clipboard.writeText(functionDefinition);
				const position = editor.selection.active;
				const functionCall = `${functionType === 'void' ? ';' : `${functionType} result = `}${functionName}(/*--Args--*/);`;
				editor.edit(editBuilder => {
					editBuilder.insert(position, functionCall);
					editBuilder.delete(selection);
				});
				vscode.window.showInformationMessage('Function has been copied to the clipboard');
				if (!functionArgs) {
					vscode.window.showWarningMessage('Function without any arguments');
				}
			} else if (!functionName) {
				vscode.window.showErrorMessage('Invalid function name');
			} else {
				vscode.window.showErrorMessage('Invalid function type');
			}
		}
	});

	disposables.push(extractFunctionCommand);

    context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider('*', {
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				const completionItem = new vscode.CompletionItem('ifexit', vscode.CompletionItemKind.Snippet);
				completionItem.insertText = new vscode.SnippetString('if (true) {\n\t${1:/* code */}\n\treturn /* n */;\n}\n');
				completionItem.documentation = new vscode.MarkdownString('Code snippet for if (true) return n');
				return [completionItem];
			}
		}, 'ifex')
	);
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider('*', {
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				const completionItem = new vscode.CompletionItem('minusL', vscode.CompletionItemKind.Snippet);
				completionItem.insertText = new vscode.SnippetString('for (size_t i = ${1:count}; i >= 0; --i) {\n\t${0:/* code */}\n}');
				completionItem.documentation = new vscode.MarkdownString('Code snippet for loop for (--i)');
				return [completionItem];
			}
		}, 'mi')
	);
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider('*', {
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
				const completionItem = new vscode.CompletionItem('plusL', vscode.CompletionItemKind.Snippet);
				completionItem.insertText = new vscode.SnippetString('for (size_t i = ${1:count}; i >= 0; ++i) {\n\t${0:/* code */}\n}');
				completionItem.documentation = new vscode.MarkdownString('Code snippet for loop for (--i)');
				return [completionItem];
			}
		}, 'pl')
	);
	context.subscriptions.push(...disposables);

}

// This method is called when your extension is deactivated
export function deactivate() {}
