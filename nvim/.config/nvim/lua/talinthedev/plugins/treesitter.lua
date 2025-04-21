-- Provides syntax highlighting, indentation, and more
return {
	{
		"nvim-treesitter/nvim-treesitter",
		build = ":TSUpdate",
		main = "nvim-treesitter.configs",
		opts = {
			ensure_installed = { "lua", "luadoc", "markdown", "vim", "vimdoc" },
			auto_install = true,
			highlight = {
				enable = true,
				--  If you are experiencing weird indenting issues, add the language to the list of additional_vim_regex_highlighting and disabled languages for indent.
				additional_vim_regex_highlighting = {},
			},
			indent = { enable = true, disable = {} },
		},
	},
	{
		"nvim-treesitter/nvim-treesitter-context",
		opts = {},
	},
}
