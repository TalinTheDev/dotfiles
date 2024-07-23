return {"nvim-treesitter/nvim-treesitter", build = ":TSUpdate", config = function() 
	require("nvim-treesitter.configs").setup({
		ensure_installed = { "lua", "javascript", "typescript", "html", "css", "vue", "rust", "toml", "bash", "gitignore", "markdown", "sql", "json"},
		sync_install = false,
		auto_install = true,
		highlight = { enable = true, additional_vim_regex_highlighting = false },
		indent = { enable = true },  
	})
end}
