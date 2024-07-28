#!/usr/bin/bash

user="talins"
display=":$(ls /tmp/.X11-unix/* | sed 's#/tmp/.X11-unix/X##' | head -n 1)"
uid=$(id -u $user)

sudo -u $user hyprctl --instance 0 dispatch dpms on HDMI-A-1
sudo -u $user hyprctl --instance 0 dispatch dpms off eDP-1
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 1 HDMI-A-1
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 2 HDMI-A-1
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 3 HDMI-A-1
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 4 HDMI-A-1
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 5 HDMI-A-1
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 6 HDMI-A-1
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 7 HDMI-A-1
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 8 HDMI-A-1
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 9 HDMI-A-1
sudo -u $user DISPLAY=$display DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$uid/bus notify-send "Display Change" "Added monitor"
