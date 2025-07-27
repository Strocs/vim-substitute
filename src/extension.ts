import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Helper function to get word under cursor
  function getWordUnderCursor(editor: vscode.TextEditor): string {
    const position = editor.selection.active;
    const wordRange = editor.document.getWordRangeAtPosition(position);
    if (!wordRange) {
      return "";
    }
    return editor.document.getText(wordRange);
  }

  // Helper function to escape regex special characters
  function escapeRegexCharacters(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  async function executeVimSubstitute(
    searchText: string,
    mode: "all" | "line" = "all"
  ) {
    const escapedSearchText = escapeRegexCharacters(searchText);
    const modeCommand = mode === "all" ? [":", "%", "s", "/"] : [":", "s", "/"];

    try {
      // First execute the Vim remap command to enter to vim command mode
      // TODO: add different search and replace commands (e.g., :%s, :s, etc.) based on keybindings
      await vscode.commands.executeCommand("vim.remap", {
        after: modeCommand,
      });

      // Then type the escaped search text followed by a slash to start to write the replace text
      await vscode.commands.executeCommand("type", {
        text: `${escapedSearchText}/`,
      });

      return;
    } catch (error) {
      vscode.window.showErrorMessage(`Error: ${error}`);
    }
  }

  const getTextToReplace = (): string => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      return "";
    }

    const selection = editor.selection;
    const hasSelection = !selection.isEmpty;
    let textToReplace = "";

    if (hasSelection) {
      textToReplace = editor.document.getText(selection);
    } else {
      textToReplace = getWordUnderCursor(editor);
    }

    if (!textToReplace.trim()) {
      return "";
    }
    return textToReplace;
  };

  // Register the main replace command
  const replaceAllCommand = vscode.commands.registerCommand(
    "vim-substitute.replaceAll",
    async () => {
      try {
        const textToReplace = getTextToReplace();
        if (!textToReplace) {
          return;
        }
        await executeVimSubstitute(textToReplace, "all");
      } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error}`);
      }
    }
  );

  // Register the main replace command
  const replaceLineCommand = vscode.commands.registerCommand(
    "vim-substitute.replaceLine",
    async () => {
      try {
        const textToReplace = getTextToReplace();
        if (!textToReplace) {
          return;
        }
        await executeVimSubstitute(textToReplace, "line");
      } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error}`);
      }
    }
  );

  context.subscriptions.push(replaceAllCommand, replaceLineCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
