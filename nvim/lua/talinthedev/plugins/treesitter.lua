-- Provides syntax highlighting, indentation, and more
return {
	{
		"nvim-treesitter/nvim-treesitter",
		build = ":TSUpdate",
		main = "nvim-treesitter.configs",
		config = function()
			local proj_conf = {}
			local ok, cfg = pcall(dofile, vim.fn.getcwd() .. "/.nvim-setup.lua")
			if ok then
				proj_conf = cfg
			end
			require("nvim-treesitter").setup({
				ensure_installed = proj_conf.treesitter or { "lua", "luadoc", "markdown", "vim", "vimdoc" },
				auto_install = true,
				highlight = {
					enable = true,
					--  If you are experiencing weird indenting issues, add the language to the list of additional_vim_regex_highlighting and disabled languages for indent.
					additional_vim_regex_highlighting = {},
				},
				indent = { enable = true, disable = {} },
			})
		end,
	},
	{
		"nvim-treesitter/nvim-treesitter-context",
		opts = {},
	},
}
