-- Editor options
-- Add your vim.opt settings here as you learn and customize

--------------------------------------------------------------------------------
-- COLORS
--------------------------------------------------------------------------------
-- termguicolors controls how Neovim handles colors:
--
--   true  = Use 24-bit "true color" (16 million colors)
--           Neovim uses its own colorscheme, ignoring terminal theme.
--           Requires a Neovim colorscheme plugin to look good.
--
--   false = Use terminal's 16-color palette
--           Neovim inherits colors from your terminal (Ghostty).
--           Change Ghostty's theme → Neovim colors change automatically.
--
-- Set to false so Neovim matches Ghostty's theme without extra config.
-- If you later install a Neovim colorscheme, set this to true.
vim.opt.termguicolors = false

--------------------------------------------------------------------------------
-- Example options (uncomment as needed):
--------------------------------------------------------------------------------
-- vim.opt.number = true         -- Show line numbers
-- vim.opt.relativenumber = true -- Relative line numbers
vim.opt.tabstop = 2           -- Tab width
vim.opt.shiftwidth = 2        -- Indent width
vim.opt.expandtab = true      -- Use spaces instead of tabs
-- vim.opt.clipboard = 'unnamedplus' -- Use system clipboard

--------------------------------------------------------------------------------
-- LSP
--------------------------------------------------------------------------------
vim.opt.signcolumn = "yes"    -- Always show sign column (prevents layout shift from diagnostics)
vim.opt.updatetime = 250      -- Faster CursorHold for LSP features (default 4000ms)
