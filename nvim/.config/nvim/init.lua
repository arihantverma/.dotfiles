-- Neovim configuration entry point
-- This file runs when Neovim starts. It sets up the plugin manager
-- and loads your personal settings.

--------------------------------------------------------------------------------
-- LAZY.NVIM BOOTSTRAP
-- This section auto-installs lazy.nvim (the plugin manager) if it's not present.
-- lazy.nvim is the most popular Neovim plugin manager as of 2025.
-- Docs: https://lazy.folke.io/
--------------------------------------------------------------------------------

-- Where lazy.nvim will be installed (~/.local/share/nvim/lazy/lazy.nvim)
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

-- If lazy.nvim isn't installed, clone it from GitHub
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local lazyrepo = "https://github.com/folke/lazy.nvim.git"
  local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
  if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo({
      { "Failed to clone lazy.nvim:\n", "ErrorMsg" },
      { out, "WarningMsg" },
      { "\nPress any key to exit..." },
    }, true, {})
    vim.fn.getchar()
    os.exit(1)
  end
end

-- Add lazy.nvim to Neovim's runtime path so we can require() it
vim.opt.rtp:prepend(lazypath)

--------------------------------------------------------------------------------
-- LEADER KEY
-- Must be set before loading keymaps or plugins that use <leader>
--------------------------------------------------------------------------------
-- mapleader: The global leader key used for custom keymaps across all files.
-- When you define a keymap with <leader>, it uses this key as the prefix.
-- Example: <leader>y becomes Space+y when mapleader is set to Space.
-- Default is backslash (\), but Space is popular because it's easy to reach.
vim.g.mapleader = ' '

-- maplocalleader: A separate leader key for buffer-local or filetype-specific
-- keymaps. Plugins for specific languages often use <localleader> so their
-- shortcuts don't conflict with your global <leader> mappings.
-- Example: A Python plugin might use <localleader>r to run the current file,
-- while your global <leader>r does something else entirely.
-- Setting it to Space keeps things simple (one key to remember).
-- Some people prefer a different key (like comma) to keep them distinct.
vim.g.maplocalleader = ' '

--------------------------------------------------------------------------------
-- USER CONFIGURATION
-- Your personal settings split into separate files for organization
--------------------------------------------------------------------------------
require('arihantverma.options')  -- Editor options (line numbers, tabs, etc.)
require('arihantverma.keymaps')  -- Custom key mappings

--------------------------------------------------------------------------------
-- PLUGIN SETUP
-- Loads all plugin specs from lua/plugins/ directory.
-- Each .lua file in that folder can return a plugin spec or list of specs.
-- Run :Lazy to open the plugin manager UI (press 'q' to close it).
--------------------------------------------------------------------------------
require("lazy").setup("plugins")
