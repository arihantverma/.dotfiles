--------------------------------------------------------------------------------
-- FORMATTING
-- Auto-format on save using conform.nvim.
--
-- Strategy: Tries Biome first (if biome.json exists in project), falls back
-- to Prettier. Uses stop_after_first so only one formatter runs.
--
-- Keymaps:
--   <leader>cf — Format current buffer manually
--------------------------------------------------------------------------------

return {
  {
    "stevearc/conform.nvim",
    event = "BufWritePre",
    cmd = { "ConformInfo" },
    config = function()
      local conform = require("conform")

      local web_formatters = { "biome", "prettier", stop_after_first = true }

      conform.setup({
        formatters_by_ft = {
          javascript = web_formatters,
          typescript = web_formatters,
          javascriptreact = web_formatters,
          typescriptreact = web_formatters,
          html = web_formatters,
          css = web_formatters,
          json = web_formatters,
          jsonc = web_formatters,
        },
        format_on_save = {
          timeout_ms = 500,
          lsp_format = "fallback",
        },
      })

      vim.keymap.set({ "n", "v" }, "<leader>cf", function()
        conform.format({ async = true, lsp_format = "fallback" })
      end, { desc = "Format buffer" })
    end,
  },
}
