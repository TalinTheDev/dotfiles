return {
	"echasnovski/mini.nvim",
	version = false,

	config = function()
		require("mini.starter").setup()
		require("mini.statusline").setup()
		require("mini.pairs").setup()
		require("mini.sessions").setup({ autoread = true, autowrite = true })
	end,
}
