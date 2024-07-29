#!/usr/bin/bash

echo "Starting TLP..."
sudo tlp start
sudo tlp usb

echo "Starting monitor changing daemon..."
~/.config/hypr/scripts/changeMonitor.sh daemon &

echo "Starting mako..." &
mako > /dev/null & 
echo "Starting swww-daemon..." &
swww-daemon -q &
  echo "Starting polkit agent..."
/usr/lib/polkit-kde-authentication-agent-1 >/dev/null 2>&1 &
echo "Adding ssh keys..." &
fish -c sshKeyAdd
echo "Done..." &
