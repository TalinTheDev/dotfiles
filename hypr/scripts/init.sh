#!/usr/bin/bash

sh ~/.config/hypr/scripts/changeMonitor.sh
echo "Starting TLP..."
sudo tlp start
sudo tlp usb

echo "Adding ssh keys..."
fish -c sshKeyAdd

echo "System setup complete"
sleep 1 && pkill kitty
