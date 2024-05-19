return {
  -- Mason for LSP, Formatter, Linter, Debugger --
  {
    "williamboman/mason.nvim",
    config = function()
      require("mason").setup()
    end,
  },
  -- LSP Backend (?) --
  {
    "neovim/nvim-lspconfig",
  },
  -- Auto Install LSPs --
  {
    "williamboman/mason-lspconfig.nvim",
    config = function()
      require("mason-lspconfig").setup({
        ensure_installed = {
          "astro",
          "bashls",
          "clangd",
          "cssls",
          "eslint",
          "html",
          "jsonls",
          "tsserver",
          "marksman",
          "sqlls",
          "taplo",
          "volar",
          "lua_ls",
          "rust_analyzer",
        },
      })
      require("mason-lspconfig").setup_handlers({
        function(server_name)
          require("lspconfig")[server_name].setup({})
        end,
      })
    end,
  },
  {
    "stevearc/conform.nvim",
    dependencies = { "zapling/mason-conform.nvim" },
    config = function()
      require("conform").setup({
        formatters_by_ft = {
          lua = { "styluaf" },
          rust = { "rustfmt" },
          javascript = { { "prettierd", "prettier" } },
          markdown = { "mdformat" },
          cpp = { "clang-format" },
        }
      })
      require("mason-conform").setup()
    end
  }
}
