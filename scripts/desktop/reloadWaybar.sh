#!/usr/bin/env bash

# Terminate already running bar instances
killall -q waybar

# Wait until the processes have been shut down
while pgrep -x waybar >/dev/null; do sleep 1; done

# Launch main
waybar -c $HOME/.config/waybar/config.json -s $HOME/.config/waybar/style.css
