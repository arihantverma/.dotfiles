return {
  {
    "mason-org/mason.nvim",
    config = function()
      require("mason").setup()
    end,
  },

  {
    "WhoIsSethDaniel/mason-tool-installer.nvim",
    dependencies = { "mason-org/mason.nvim" },
    config = function()
      require("mason-tool-installer").setup({
        ensure_installed = {
          "typescript-language-server",
          "html-lsp",
          "css-lsp",
          "tailwindcss-language-server",
          "eslint-lsp",
          "emmet-ls",
        },
      })
    end,
  },

  {
    "neovim/nvim-lspconfig",
    dependencies = {
      "WhoIsSethDaniel/mason-tool-installer.nvim",
      "saghen/blink.cmp",
    },
    config = function()
      vim.lsp.config("*", {
        capabilities = require("blink.cmp").get_lsp_capabilities(),
      })

      vim.lsp.enable({ "ts_ls", "html", "cssls", "tailwindcss", "eslint", "emmet_ls" })

      vim.api.nvim_create_autocmd("LspAttach", {
        callback = function(args)
          vim.keymap.set("n", "<leader>e", vim.diagnostic.open_float, { buffer = args.buf, silent = true })
        end,
      })
    end,
  },
}
