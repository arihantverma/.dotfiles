-- Oil: Edit your filesystem like a buffer
-- Press - to open the file explorer in the current directory
return {
  "stevearc/oil.nvim",
  dependencies = { "echasnovski/mini.icons" },
  -- Oil must load at startup to disable netrw and claim the `-` keymap
  lazy = false,
  config = function()
    require("oil").setup({
      -- Use mini.icons for file icons (already installed)
      default_file_explorer = true,
      -- Show hidden files by default
      view_options = {
        show_hidden = true,
      },
      -- Keymaps within oil buffer (these are the defaults, shown for reference)
      -- - : go up a directory
      -- <CR> : open file/directory
      -- g? : show help
    })
    vim.keymap.set("n", "-", "<cmd>Oil<cr>", { desc = "Open file explorer" })
  end,
}
