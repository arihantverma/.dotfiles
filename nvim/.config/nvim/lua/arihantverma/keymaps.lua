-- System clipboard shortcuts
-- By default, y/p use Neovim's internal registers, separate from the system
-- clipboard. These mappings let you easily copy/paste to/from the system
-- clipboard (what you copy in Chrome, etc.) using leader key shortcuts.
-- The "+ register is the system clipboard on Linux/macOS/Windows.
vim.keymap.set('v', '<leader>y', '"+y', { desc = 'Yank to system clipboard' })
vim.keymap.set('n', '<leader>Y', '<cmd>%y+<CR>', { desc = 'Yank entire file to system clipboard' })
vim.keymap.set('n', '<leader>p', '"+p', { desc = 'Paste from system clipboard' })
vim.keymap.set('n', '<leader>P', '"+P', { desc = 'Paste from system clipboard (before cursor)' })
