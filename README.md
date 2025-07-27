# Vim Substitute for VSCodeVim

Vim Substitute for VSCodeVim enhances VSCodeVim with smarter find and replace. It prepares substitute commands using the word under the cursor or selected text, making replacements quick and intuitive.

## Features

- Detects word under cursor (Normal mode) or uses selected text (Visual modes)
- Escapes regex special characters for safe literal matching
- Two commands:
  - **Replace All** (`:%s/`): File-wide substitution
  - **Replace Line** (`:s/`): Line-specific substitution
- Integrates with VSCodeVim's command mode
- Default keybindings:
  - `Space + s + a` (Replace All)
  - `Space + s + l` (Replace Line)

## Usage

1. Place your cursor on a word or select text
2. Run the command:
   - `Vim Substitute: Replace All Word/Selection` (or press `Space + s + a`)
   - `Vim Substitute: Replace Line Word/Selection` (or press `Space + s + l`)
3. The command line will show the substitute command with your search text
4. Type your replacement and press Enter

## Changing Keybindings

You can remap keys for Vim Substitute commands directly in VSCodeVim's settings:

1. Open your VS Code settings (`Ctrl+,`)
2. Search for "vim.normalModeKeyBindings" or "vim.visualModeKeyBindings"
3. Add a new remapping for your preferred key combination and command.

Example for `settings.json`:

```json
"vim.normalModeKeyBindingsNonRecursive": [
  {
    "before": ["<space>", "s", "a"],
    "commands": ["vim-substitute.replaceAll"]
  }
],
"vim.visualModeKeyBindingsNonRecursive": [
  {
    "before": ["<space>", "s", "l"],
    "commands": ["vim-substitute.replaceLine"]
  }
]
```

You can change the `before` sequence to any keys you prefer. Save your settings and test the new keybinding in VSCodeVim Normal or Visual mode.

## Installation

1. Clone this repository
2. Run `pnpm install`
3. Build with `pnpm run compile`
4. Press `F5` to launch extension development host

## Requirements

- VSCodeVim extension must be installed and enabled

## Troubleshooting

- If commands do not work, ensure VSCodeVim is active
- For keybinding conflicts, check Keyboard Shortcuts
- For build errors, run `pnpm install` and `pnpm run compile`

## License

See LICENSE.md for details.
