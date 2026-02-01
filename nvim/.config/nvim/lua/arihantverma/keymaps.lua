-- Keymaps configuration
-- Custom ergonomic motion keys:
--   j = down (default)
--   f = up
--   k = right
--   d = left

-- Motion remaps
vim.keymap.set({'n', 'v', 'o'}, 'f', 'k', { desc = 'Move up' })
vim.keymap.set({'n', 'v', 'o'}, 'k', 'l', { desc = 'Move right' })
vim.keymap.set({'n', 'v', 'o'}, 'd', 'h', { desc = 'Move left' })
-- j = down is already default

-- Delete operation (moved from 'd' to 's')
vim.keymap.set({'n', 'v'}, 's', 'd', { desc = 'Delete' })
vim.keymap.set('n', 'ss', 'dd', { desc = 'Delete line' })
vim.keymap.set('n', 'S', 'D', { desc = 'Delete to end of line' })

-- Find character (moved from 'f' to 't')
vim.keymap.set({'n', 'v', 'o'}, 't', 'f', { desc = 'Find character forward' })

-- System clipboard shortcuts
-- By default, y/p use Neovim's internal registers, separate from the system
-- clipboard. These mappings let you easily copy/paste to/from the system
-- clipboard (what you copy in Chrome, etc.) using leader key shortcuts.
-- The "+ register is the system clipboard on Linux/macOS/Windows.
vim.keymap.set('v', '<leader>y', '"+y', { desc = 'Yank to system clipboard' })
vim.keymap.set('n', '<leader>p', '"+p', { desc = 'Paste from system clipboard' })
vim.keymap.set('n', '<leader>P', '"+P', { desc = 'Paste from system clipboard (before cursor)' })
