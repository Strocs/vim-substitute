import * as vscode from "vscode";
import { COMMANDS, VIM_CONFIG_KEYS, DEFAULTS } from "../constants";
import { VimBinding } from "../types";

/**
 * Utility functions for working with VSCodeVim configuration
 */

/**
 * Gets the current VSCodeVim leader key
 */
export function getLeaderKey(): string {
  const vimConfig = vscode.workspace.getConfiguration("vim");
  return vimConfig.get<string>(VIM_CONFIG_KEYS.LEADER, DEFAULTS.LEADER);
}

/**
 * Gets existing bindings for all relevant vim modes
 */
export function getExistingBindings(): VimBinding[] {
  const vimConfig = vscode.workspace.getConfiguration("vim");

  const normalBindings = vimConfig.get<VimBinding[]>(
    VIM_CONFIG_KEYS.NORMAL,
    []
  );
  const visualBindings = vimConfig.get<VimBinding[]>(
    VIM_CONFIG_KEYS.VISUAL,
    []
  );

  return [...normalBindings, ...visualBindings];
}

/**
 * Checks if a command is one of our substitute commands
 */
export function isSubstituteCommand(cmd: string): boolean {
  return cmd === COMMANDS.REPLACE_ALL || cmd === COMMANDS.REPLACE_LINE;
}

/**
 * Removes existing bindings that conflict with our commands
 */
export function removeConflictingBindings(
  bindings: VimBinding[]
): VimBinding[] {
  return bindings.filter(
    (binding) => !binding.commands?.some(isSubstituteCommand)
  );
}
