# Vim Substitute for VSCodeVim

A VS Code extension that enhances the VSCodeVim experience by providing intelligent find and replace functionality. This extension bridges the gap between VSCodeVim's command mode and modern editor capabilities by automatically preparing substitute commands with the word under cursor or selected text.

## Features

- **Smart Word Detection**: Automatically detects the word under the cursor when no text is selected
- **Selection Support**: Uses selected text when available (works in Visual, VisualLine, and VisualBlock modes)
- **Regex Escaping**: Safely escapes special regex characters to prevent unintended pattern matching
- **Dual Command Support**: Two distinct commands for different substitute scopes
  - **Replace All** (`:%s/`): Replace throughout the entire file
  - **Replace Line** (`:s/`): Replace only on the current line or selection
- **Vim Integration**: Seamlessly integrates with VSCodeVim's command mode
- **Flexible Keybindings**:
  - `Space + s + a` for replace all in Normal mode
  - `Space + s + l` for replace line in Visual modes

## How It Works

The extension implements a sophisticated workflow that combines VS Code's editor API with VSCodeVim's command system:

1. **Text Detection**:

   - In Normal mode: Extracts the word under the cursor using VS Code's `getWordRangeAtPosition`
   - In Visual modes: Uses the current selection text

2. **Safety Processing**:

   - Escapes regex special characters (`.*+?^${}()|[\]\\`) to ensure literal matching
   - Prevents accidental pattern interpretation

3. **Command Selection**:

   - **Replace All**: Uses `:%s/` for file-wide substitution
   - **Replace Line**: Uses `:s/` for line-specific substitution

4. **Vim Command Preparation**:
   - Executes VSCodeVim's `vim.remap` command to enter command mode
   - Automatically types the appropriate substitute command followed by the escaped search text and `/`
   - Positions cursor ready for replacement text input

## Installation

1. Clone this repository
2. Install dependencies: `pnpm install`
3. Build the extension: `pnpm run compile`
4. Press `F5` to open a new VS Code window with the extension loaded

## Usage

### Replace All (File-wide)

1. Place your cursor on a word or select text you want to replace
2. Press `Space + s + a`
3. The command line will show `:%s/your-text/` with cursor positioned after the second `/`
4. Type your replacement text and press Enter to execute

### Replace Line (Current line/selection)

1. Place your cursor on a word or select text you want to replace
2. Press `Space + s + l`
3. The command line will show `:%s/your-text/` with cursor positioned after the second `/`
4. Type your replacement text and press Enter to execute

### Example Workflow

**Replace All Example:**

```
Original text: "Hello world, hello universe, hello everyone"
1. Place cursor on "hello"
2. Press Space + s + a
3. Command line shows: :%s/hello/
4. Type "hi" and press Enter
5. Result: "Hi world, hi universe, hi everyone"
```

**Replace Line Example:**

```
Original text:
Line 1: "Hello world, hello there"
Line 2: "Hello universe, hello again"

1. Place cursor on "hello" in Line 1
2. Press Space + s + l
3. Command line shows: :%s/hello/
4. Type "hi" and press Enter
5. Result:
Line 1: "Hi world, hi there"
Line 2: "Hello universe, hello again" (unchanged)
```

## Architecture

### Core Components

#### `extension.ts`

The main extension file containing:

- **`activate(context)`**: Extension entry point that registers both commands and keybindings
- **`getWordUnderCursor(editor)`**: Utility function that extracts word boundaries using VS Code's text document API
- **`escapeRegexCharacters(text)`**: Safety function that escapes special regex characters
- **`getTextToReplace()`**: Shared function that determines text from cursor position or selection
- **`executeVimSubstitute(searchText)`**: Core function that orchestrates the Vim command preparation
- **`replaceAllCommand`**: Command handler for file-wide substitution (`:%s/`)
- **`replaceLineCommand`**: Command handler for line-specific substitution (`:s/`)

#### Key Implementation Details

```typescript
// Smart word detection using VS Code API
const wordRange = editor.document.getWordRangeAtPosition(position);

// Regex escaping for safety
text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Shared text extraction logic
const getTextToReplace = (): string => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return "";

  const selection = editor.selection;
  const hasSelection = !selection.isEmpty;

  return hasSelection
    ? editor.document.getText(selection)
    : getWordUnderCursor(editor);
};

// VSCodeVim integration for file-wide replacement
await vscode.commands.executeCommand("vim.remap", {
  after: [":", "%", "s", "/"],
});

// VSCodeVim integration for line-specific replacement
await vscode.commands.executeCommand("vim.remap", {
  after: [":", "s", "/"],
});
```

### Configuration

#### Package.json Contributions

- **Commands**:
  - Registers `vim-substitute.replaceAll` command for file-wide substitution
  - Registers `vim-substitute.replaceLine` command for line-specific substitution
- **Keybindings**:
  - Maps `Space + s + a` to replace all command in Normal mode
  - Maps `Space + s + l` to replace line command in Visual modes
- **Activation**: Extension activates automatically when VS Code starts

#### Build System

- **TypeScript**: Compiled with strict type checking
- **ESBuild**: Fast bundling with watch mode support
- **Development**: Hot reload with `pnpm run watch`

## Development

### Project Structure

```
├── src/
│   ├── extension.ts          # Main extension logic
│   └── test/
│       └── extension.test.ts # Test suite (basic setup)
├── package.json              # Extension manifest and dependencies
├── tsconfig.json            # TypeScript configuration
├── esbuild.js               # Build configuration
└── README.md                # This file
```

### Available Scripts

- `pnpm run compile`: Build the extension
- `pnpm run watch`: Development mode with hot reload
- `pnpm run test`: Run test suite
- `pnpm run lint`: Check code style

### Development Workflow

1. Make changes to `src/extension.ts`
2. Run `pnpm run watch` for automatic compilation
3. Press `F5` to launch extension development host
4. Test functionality in the new VS Code window

## TODOs

### High Priority

- [x] **Multiple Search Patterns**: ✅ **COMPLETED** - Added support for different substitute commands (`:s` for line, `:%s` for all) with dedicated keybindings
- [ ] **Enhanced Visual Mode**: Improve visual selection handling for line-based and block-based operations
- [ ] **Configuration Options**: Add settings for default substitute scope and regex escaping behavior

### Medium Priority

- [ ] **Command Variants**: Implement additional commands for common replace patterns (case-insensitive, global flags)
- [ ] **Undo Integration**: Better integration with Vim's undo system
- [ ] **Multi-cursor Support**: Handle multiple cursors/selections simultaneously
- [ ] **Preview Mode**: Add option to preview replacements before execution
- [ ] **Range-specific Replace**: Add support for `:'<,'>s` when text is selected in visual mode

### Low Priority

- [ ] **Custom Keybindings**: Allow users to configure their own key combinations
- [ ] **Search History**: Integration with Vim's search history
- [ ] **Advanced Regex**: Support for more complex regex patterns and flags
- [ ] **Performance Optimization**: Optimize for large files and selections
- [ ] **Additional Substitute Modes**: Add support for other Vim substitute variations (`:g/`, `:v/`, etc.)

### Testing & Quality

- [ ] **Unit Tests**: Comprehensive test suite for all utility functions
- [ ] **Integration Tests**: Tests for VSCodeVim command integration for both replace modes
- [ ] **Edge Cases**: Handle empty selections, special characters, and error scenarios
- [ ] **Documentation**: Add inline code documentation and API reference
- [ ] **Command Validation**: Add tests to ensure correct substitute command generation (`:s` vs `:%s`)

### Future Enhancements

- [ ] **Plugin Ecosystem**: Integration with other Vim plugins
- [ ] **Snippets Integration**: Support for replacement with snippets
- [ ] **Project-wide Replace**: Extend functionality to work across multiple files
- [ ] **Regex Builder**: Visual regex pattern builder for complex replacements

## Technical Considerations

### VSCodeVim Integration

The extension relies on VSCodeVim's `vim.remap` command, which simulates key presses in Vim mode. This approach ensures compatibility with VSCodeVim's internal state management.

### Error Handling

Current implementation includes basic error handling with user notifications. Future versions should include more granular error recovery and validation.

### Performance

The extension is designed to be lightweight with minimal performance impact. Word detection and regex escaping operations are optimized for speed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source. Please check the license file for details.

## Dependencies

- **VS Code API**: ^1.102.0
- **VSCodeVim**: Required for Vim mode functionality
- **TypeScript**: ^5.8.3
- **ESBuild**: ^0.25.3 for fast compilation

## Troubleshooting

### Common Issues

1. **Command not working**: Ensure VSCodeVim is installed and enabled
2. **Keybinding conflicts**: Check for conflicting key mappings in VS Code settings
   - Default keybindings: `Space + s + a` (replace all), `Space + s + l` (replace line)
3. **Build errors**: Run `pnpm install` and `pnpm run compile`
4. **Wrong substitute scope**: Make sure you're using the correct keybinding for your intended scope
   - Use `Space + s + a` for file-wide replacement
   - Use `Space + s + l` for line-specific replacement

### Debug Mode

Enable VS Code's developer tools and check the console for error messages when the extension doesn't work as expected.
