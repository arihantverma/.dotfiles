return {
  {
    "folke/which-key.nvim",
    event = "VeryLazy",
    opts = {
      -- These labels group related <leader> mappings in the popup.
      spec = {
        { "<leader>c", group = "Code" },
        { "<leader>f", group = "Find" },
      },
    },
  },
}
