vim.g.mapleader = " "

vim.keymap.set({ "n", "v", "i", "c" }, "<leader>ft", function()
    local reveal_file = vim.fn.expand("%:p")
    if (reveal_file == "") then
      reveal_file = vim.fn.getcwd()
    else
      local f = io.open(reveal_file, "r")
      if (f) then
        f.close(f)
      else
        reveal_file = vim.fn.getcwd()
      end
    end
    require("neo-tree.command").execute({
      action = "focus",
      source = "filesystem",
      reveal_file = reveal_file,
      reveal_force_cwd = true,
      position = "float"
    })
  end,
  { silent = true }
);
