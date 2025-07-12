-- Color scheme
return {
	{
		"vague2k/vague.nvim",
		priority = 1000, -- Make sure to load this before all the other start plugins.
		config = function()
			require("vague").setup({})
		end,
	},
	{
		"rebelot/kanagawa.nvim",
		priority = 1000, -- Make sure to load this before all the other start plugins.
		config = function()
			require("kanagawa").setup({})

			vim.cmd.colorscheme("kanagawa-wave")
		end,
	},
}
