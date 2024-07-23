return {
	"folke/which-key.nvim",
	config = function() 
		vim.keymap.set("n", "<leader>w", function() require("which-key").show({ global = true }) end, { desc = "Show which-key" })		
	end
}
