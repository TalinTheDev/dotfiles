return {
	"navarasu/onedark.nvim",
	config = function()
		require("onedark").load()
		vim.cmd.hi("Comment gui=none")
	end,
}
