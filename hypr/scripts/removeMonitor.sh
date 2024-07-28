#!/usr/bin/bash

hyprctl dispatch dpms on eDP-1
hyprctl dispatch dpms off HDMI-A-1
hyprctl dispatch moveworkspacetomonitor 1 eDP-1 
hyprctl dispatch moveworkspacetomonitor 2 eDP-1 
hyprctl dispatch moveworkspacetomonitor 3 eDP-1 
hyprctl dispatch moveworkspacetomonitor 4 eDP-1 
hyprctl dispatch moveworkspacetomonitor 5 eDP-1 
hyprctl dispatch moveworkspacetomonitor 6 eDP-1 
hyprctl dispatch moveworkspacetomonitor 7 eDP-1 
hyprctl dispatch moveworkspacetomonitor 8 eDP-1 
hyprctl dispatch moveworkspacetomonitor 9 eDP-1 
notify-send "Display Change" "Removed monitor"
