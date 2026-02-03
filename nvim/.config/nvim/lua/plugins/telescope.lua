-- Telescope: Fuzzy finder for files, text, and more
-- Press <leader>ff to find files, <leader>fg to search text
return {
  "nvim-telescope/telescope.nvim",
  branch = "0.1.x",
  dependencies = {
    "nvim-lua/plenary.nvim",
    -- Faster fuzzy matching (optional but recommended)
    {
      "nvim-telescope/telescope-fzf-native.nvim",
      build = "make",
    },
  },
  keys = {
    -- Find files by name
    { "<leader>ff", "<cmd>Telescope find_files<cr>", desc = "Find files" },
    -- Search text in all files (grep)
    { "<leader>fg", "<cmd>Telescope live_grep<cr>", desc = "Grep text" },
    -- Switch between open buffers
    { "<leader>fb", "<cmd>Telescope buffers<cr>", desc = "Find buffers" },
    -- Search help documentation
    { "<leader>fh", "<cmd>Telescope help_tags<cr>", desc = "Help tags" },
  },
  config = function()
    local telescope = require("telescope")

    telescope.setup({
      defaults = {
        -- Show file paths relative to project root
        path_display = { "truncate" },
        -- Ignore common non-code directories
        file_ignore_patterns = {
          "node_modules",
          ".git/",
          "%.lock",
        },
      },
    })

    -- Load fzf extension for faster fuzzy matching
    pcall(telescope.load_extension, "fzf")
  end,
}
