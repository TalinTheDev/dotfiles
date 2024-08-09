#!/usr/bin/bash

# Setup script
mkdir ~/.config >/dev/null 2>&1
mkdir ~/.config/tmp >/dev/null 2>&1
tmp=~/.config/tmp
cd ~/.config
clear

if [ "$1" = "create" ]; then
  mkdir ~/.config/packages >/dev/null 2>&1
  pacman -Qqen > ~/.config/packages/archpackages.txt
  sed -n '/paru/!p' <<< $(pacman -Qqm) > ~/.config/packages/parupackages.txt
  echo "Created package lists"
  exit 0
fi

# Install system package

read -p "Install pacman packages? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$resp" = "Y" ]; then
  sudo pacman -Syuq --needed - < ~/.config/packages/archpackages.txt
else
  read -p "Can't setup system without packages... Are you sure you want to skip installing packages? (y/N)" resp
  if [ -z "$resp" ] || [ "$resp" = "n" ] || [ "$resp" = "N" ]; then
    sudo pacman -Syuq --needed - < ~/.config/packages/archpackages.txt
  fi
fi
clear

# Install paru and paru packages
read -p "Install paru? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$resp" = "Y" ]; then
  git clone https://aur.archlinux.org/paru.git $tmp/paru
  cd $tmp/paru
  makepkg -si --needed 
  cd ~/.config
  
  read -p "Install paru packages? (Y/n): " resp
  if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$resp" = "Y" ]; then
    paru --skipreview --removemake --cleanafter --nokeepsrc --needed -Syuq - < ~/.config/packages/parupackages.txt
  else
    echo "Some things won't work without paru packages..."
  fi
else
  echo "Some things won't work without paru packages..."
fi
clear

# Setup fish
read -p "Setup fish? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$resp" = "Y" ]; then
  fish -c installFish
fi
clear

# Setup git
read -p "Setup git? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$resp" = "Y" ]; then
  read -p "Name to use for git commits: " gitName
  read -p "Email to use for git commits: " gitEmail

  git config --global user.name "$gitName"
  git config --global user.email "$gitEmail"
  ssh-keygen -t ed25520 -C "$gitEmail"
fi
clear

# Setup wifi
read -p "Setup wifi? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$rest" = "Y" ]; then
  read -p "Wifi SSID: " wifiSSID
  read -p "Wifi password: " wifiPassword
  nmcli device wifi connect "$wifiSSID" password "$wifiPassword"
fi
clear

# Setup boot loader
read -p "Setup refind (boot loader)? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$rest" = "Y" ]; then
  sudo cp ~/.config/refind.conf /boot/EFI/refind/refind.conf
  sudo cp ~/.config/themes /boot/EFI/refind/themes -r
  sudo refind-install
fi
clear

# Setup display manager
read -p "Setup SDDM (display manager)? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$rest" = "Y" ]; then
  sudo cp ~/.config/sddm/themes/sugar-candy/* /usr/share/sddm/themes/sugar-candy -r
  sudo cp ~/.config/sddm/sddm.conf /etc/sddm.conf
fi
clear

# Setup /etc
read -p "Setup /etc? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$rest" = "Y" ]; then
  sudo cp ~/.config/etc/* /etc -r
fi
clear

# Setup Timeshift
read -p "Setup timeshift (system backup)? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$rest" = "Y" ]; then
  sudo cp ~/.config/services/timeshift.service /usr/lib/systemd/system/timeshift.service
  sudo cp ~/.config/services/timeshift.timer /usr/lib/systemd/system/timeshift.timer
fi
clear

# Setup System Service & Timers
read -p "Setup services and timers? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$rest" = "Y" ]; then
  sudo systemctl enable cups.service
  sudo systemctl enable NetworkManager.service
  sudo systemctl enable polkit.service
  sudo systemctl enable sddm.service
  sudo systemctl enable sshd.service
  sudo systemctl enable powertop.service
  sudo systemctl enable fstrim.timer
  sudo systemctl enable reflector.timer
  sudo systemctl enable timeshift.timer
  sudo systemctl enable thermald.service
fi
clear

# Exit script
rm -rf ~/.config/tmp
echo "System setup complete. Reboot and enjoy!"
exit 0
