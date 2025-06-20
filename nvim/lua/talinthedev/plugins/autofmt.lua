-- Autoformatter
return {
	"stevearc/conform.nvim",
	event = { "BufWritePre" },
	cmd = { "ConformInfo" },
	keys = {
		{
			"<leader>f",
			function()
				require("conform").format({ async = true, lsp_format = "fallback" })
			end,
			mode = "",
			desc = "[F]ormat buffer",
		},
	},
	opts = {
		notify_on_error = false,
		format_on_save = function(bufnr)
			-- Disable "format_on_save lsp_fallback" for languages that don't have a well standardized coding style
			local disable_filetypes = {}
			if disable_filetypes[vim.bo[bufnr].filetype] then
				return nil
			else
				return {
					timeout_ms = 500,
					lsp_format = "fallback",
				}
			end
		end,
		formatters_by_ft = {
			lua = { "stylua" },
			sh = { "beautysh" },
			cpp = { "clang-format" },
			c = { "clang-format" },
			h = { "clang-format" },
			fish = { "fish_indent" },
			json = { "fixjson" },
			go = { "gofmt" },
			html = { "prettierd" },
			css = { "prettierd" },
			javascript = { "prettierd" },
			vue = { "prettierd" },
			astro = { "prettied" },
			zig = { "zigfmt" },
		},
	},
}
