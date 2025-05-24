local wezterm = require("wezterm")
local act = wezterm.action

local config = {}

-- Font
config.font = wezterm.font("JetBrains Mono")

-- Color Scheme
config.color_scheme = "Black Metal (Gorgoroth) (base16)"

-- Misc.
config.hide_tab_bar_if_only_one_tab = true

return config
