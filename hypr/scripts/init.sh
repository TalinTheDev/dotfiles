#!/usr/bin/bash

sh ~/.config/hypr/scripts/changeMonitor.sh
hyprctl dispatch workspace 1 > /dev/null
echo "Starting TLP..."
sudo tlp start
sudo tlp usb

echo "Adding ssh keys..."
fish -c sshKeyAdd

echo "System setup complete"
sleep 2 && pkill kitty
