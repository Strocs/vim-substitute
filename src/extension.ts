import * as vscode from "vscode";
import { setupDefaultKeybindings } from "./keybinding";
import { COMMANDS } from "./constants";

export function activate(context: vscode.ExtensionContext) {
  // Automatically setup default keybindings on activation
  setupDefaultKeybindings().catch((error) => {
    console.error("Failed to setup default keybindings:", error);
  });
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
    mode: "all" | "line"
  ) {
    const escapedSearchText = escapeRegexCharacters(searchText);

    // Build the substitute command string
    const substituteCmd =
      mode === "all" ? `%s/${escapedSearchText}/` : `s/${escapedSearchText}/`;

    try {
      await vscode.commands.executeCommand("vim.remap", {
        after: [":", ...substituteCmd.split("")],
      });

      return;
    } catch (error) {
      vscode.window.showErrorMessage(`Error: ${error}`);
    }
  }

  const searchAndReplace = async (mode: "all" | "line"): Promise<void> => {
    try {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
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
        return;
      }

      await executeVimSubstitute(textToReplace, mode);
    } catch (error) {
      vscode.window.showErrorMessage(`Error: ${error}`);
    }
  };

  // Register the main replace commands
  const replaceAllCommand = vscode.commands.registerCommand(
    COMMANDS.REPLACE_ALL,
    async () => searchAndReplace("all")
  );

  const replaceLineCommand = vscode.commands.registerCommand(
    COMMANDS.REPLACE_LINE,
    async () => searchAndReplace("line")
  );

  context.subscriptions.push(replaceAllCommand, replaceLineCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
