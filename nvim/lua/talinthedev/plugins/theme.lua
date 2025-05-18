-- Color scheme
return {
	"vague2k/vague.nvim",
	priority = 1000, -- Make sure to load this before all the other start plugins.
	config = function()
		require("vague").setup({})

		vim.cmd.colorscheme("vague")
	end,
}
