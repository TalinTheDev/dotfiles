return {
	{
		"navarasu/onedark.nvim",
		config = function()
			require("onedark").load()
		end,
	},
	{
		"rose-pine/neovim",
		name = "rose-pine",
		config = function()
			require("rose-pine").setup({
				variant = "main",
			})
		end,
	},
}
