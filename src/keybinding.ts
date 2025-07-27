import * as vscode from "vscode";
import { COMMANDS, VIM_CONFIG_KEYS } from "./constants";
import {
  KeybindingConfig,
  VimBinding,
  KeybindingMode,
  DefaultKeybindings,
} from "./types";
import {
  getLeaderKey,
  getExistingBindings,
  isSubstituteCommand,
  removeConflictingBindings,
} from "./utils/vim-config.utils";

/**
 * Creates default keybinding configurations
 */
function createDefaultKeybindings(leader: string): DefaultKeybindings {
  const baseBindings: KeybindingConfig[] = [
    { before: [leader, "s", "a"], commands: [COMMANDS.REPLACE_ALL] },
    { before: [leader, "s", "l"], commands: [COMMANDS.REPLACE_LINE] },
  ];

  return {
    normal: baseBindings,
    visual: baseBindings,
  };
}

/**
 * Checks if our keybindings are already configured
 */
export async function areKeybindingsConfigured(): Promise<boolean> {
  const allBindings = getExistingBindings();

  return allBindings.some((binding) =>
    binding.commands?.some(isSubstituteCommand)
  );
}

/**
 * Creates keybinding modes configuration
 */
function createKeybindingModes(): KeybindingMode[] {
  const leader = getLeaderKey();
  const defaultBindings = createDefaultKeybindings(leader);

  return [
    {
      configKey: VIM_CONFIG_KEYS.NORMAL,
      bindings: defaultBindings.normal,
    },
    {
      configKey: VIM_CONFIG_KEYS.VISUAL,
      bindings: defaultBindings.visual,
    },
  ];
}

/**
 * Applies keybindings to vim configuration for all modes
 */
async function applyKeybindingsToModes(modes: KeybindingMode[]): Promise<void> {
  const vimConfig = vscode.workspace.getConfiguration("vim");

  for (const mode of modes) {
    try {
      const currentBindings = vimConfig.get<VimBinding[]>(mode.configKey, []);
      const filteredBindings = removeConflictingBindings(currentBindings);
      const newBindings = [...filteredBindings, ...mode.bindings];

      await vimConfig.update(
        mode.configKey,
        newBindings,
        vscode.ConfigurationTarget.Global
      );
    } catch (error) {
      throw new Error(
        `Failed to update keybindings for ${mode.configKey}: ${error}`
      );
    }
  }
}

/**
 * Sets up default keybindings for the extension
 */
export async function setupDefaultKeybindings(): Promise<void> {
  if (await areKeybindingsConfigured()) {
    return; // Already configured
  }

  const modes = createKeybindingModes();
  await applyKeybindingsToModes(modes);
}
