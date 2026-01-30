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
