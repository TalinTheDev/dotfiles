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
	-- Formatter --
	{
		"stevearc/conform.nvim",
		config = function()
			require("mason-conform").setup()
		end,
	},
	-- Auto Install Formatters --
	{
		"zapling/mason-conform.nvim",
		config = function()
			require("conform").setup({
				formatters_by_ft = {
					lua = { "stylua" },
					rust = { "rustfmt" },
					cpp = { "clang-format" },
					javascript = { "prettierd" },
				},
				format_on_save = {
					timeout_ms = 500,
					lsp_fallback = true,
				},
			})
		end,
	},
}
