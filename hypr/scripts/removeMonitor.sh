#!/usr/bin/bash

user="talins"
display=":$(ls /tmp/.X11-unix/* | sed 's#/tmp/.X11-unix/X##' | head -n 1)"
uid=$(id -u $user)

sudo -u $user hyprctl --instance 0 dispatch dpms on eDP-1
sudo -u $user hyprctl --instance 0 dispatch dpms off HDMI-A-1
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 1 eDP-1 
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 2 eDP-1 
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 3 eDP-1 
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 4 eDP-1 
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 5 eDP-1 
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 6 eDP-1 
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 7 eDP-1 
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 8 eDP-1 
sudo -u $user hyprctl --instance 0 dispatch moveworkspacetomonitor 9 eDP-1 
sudo -u $user DISPLAY=$display DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$uid/bus notify-send "Display Change" "Removed monitor"
