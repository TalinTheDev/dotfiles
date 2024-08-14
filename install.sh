#!/usr/bin/bash

runStow() {
  cd ~/dotfiles
  stow -R $1
}

# Setup script
if [ "$1" = "create" ]; then
  mkdir ~/dotfiles/packages >/dev/null 2>&1
  pacman -Qqen > ~/dotfiles/packages/archpackages.txt
  sed -n '/paru/!p' <<< $(pacman -Qqm) > ~/dotfiles/packages/parupackages.txt
  echo "Created package lists"
  exit 0
fi

mkdir ~/dotfiles/tmp >/dev/null 2>&1
tmp=~/dotfiles/tmp
cd ~/dotfiles
clear

# Install system package
read -p "Install pacman packages? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$resp" = "Y" ]; then
  sudo pacman -Syuq --needed - < ~/dotfiles/packages/archpackages.txt
else
  read -p "Can't setup system without packages... Are you sure you want to skip installing packages? (y/N)" resp
  if [ -z "$resp" ] || [ "$resp" = "n" ] || [ "$resp" = "N" ]; then
    sudo pacman -Syuq --needed - < ~/dotfiles/packages/archpackages.txt
  fi
fi
clear

# Install paru and paru packages
read -p "Install paru? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$resp" = "Y" ]; then
  git clone https://aur.archlinux.org/paru.git $tmp/paru
  cd $tmp/paru
  makepkg -si --needed 
  cd ~/dotfiles
  
  read -p "Install paru packages? (Y/n): " resp
  if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$resp" = "Y" ]; then
    paru --skipreview --removemake --cleanafter --nokeepsrc --needed -Syuq - < ~/dotfiles/packages/parupackages.txt
  else
    echo "Some things won't work without paru packages..." && sleep 1
  fi
else
  echo "Some things won't work without paru packages..." && sleep 1
fi
clear

# Setup fish
read -p "Setup fish? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$resp" = "Y" ]; then
  runStow fish
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
  sudo cp ~/dotfiles/refind.conf /boot/EFI/refind/refind.conf
  sudo cp ~/dotfiles/themes /boot/EFI/refind/themes -r
  sudo refind-install
fi
clear

# Setup display manager
read -p "Setup SDDM (display manager)? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$rest" = "Y" ]; then
  sudo cp ~/dotfiles/sddm/themes/sugar-candy/* /usr/share/sddm/themes/sugar-candy -r
  sudo cp ~/dotfiles/sddm/sddm.conf /etc/sddm.conf
fi
clear

# Setup /etc
read -p "Setup /etc? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$rest" = "Y" ]; then
  sudo cp ~/dotfiles/etc/* /etc -r
fi
clear

# Setup Timeshift
read -p "Setup timeshift (system backup)? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$rest" = "Y" ]; then
  sudo cp ~/dotfiles/services/timeshift.service /usr/lib/systemd/system/timeshift.service
  sudo cp ~/dotfiles/services/timeshift.timer /usr/lib/systemd/system/timeshift.timer
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
  sudo systemctl enable tlp.service
fi
clear

# Setup all other dotfiles
read -p "Setup dotfiles? (Y/n): " resp
if [ -z "$resp" ] || [ "$resp" = "y" ] || [ "$resp" = "Y" ]; then
  stow ags
  stow bottom
  stow fish
  stow hypr
  stow kitty
  stow nvim
  stow scripts
  stow vscode
  stow wallpapers
  stow yazi
  stow zed
fi

# Exit script
rm -rf ~/dotfiles/tmp
echo "System setup complete. Reboot and enjoy!"
exit 0
