#!/usr/bin/bash

hyprctl dispatch dpms on HDMI-A-1
hyprctl dispatch dpms off eDP-1
hyprctl dispatch moveworkspacetomonitor 1 HDMI-A-1
hyprctl dispatch moveworkspacetomonitor 2 HDMI-A-1
hyprctl dispatch moveworkspacetomonitor 3 HDMI-A-1
hyprctl dispatch moveworkspacetomonitor 4 HDMI-A-1
hyprctl dispatch moveworkspacetomonitor 5 HDMI-A-1
hyprctl dispatch moveworkspacetomonitor 6 HDMI-A-1
hyprctl dispatch moveworkspacetomonitor 7 HDMI-A-1
hyprctl dispatch moveworkspacetomonitor 8 HDMI-A-1
hyprctl dispatch moveworkspacetomonitor 9 HDMI-A-1
notify-send "Display Change" "Added monitor"
