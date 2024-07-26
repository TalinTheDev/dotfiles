# Dotfiles

## Package List

- base (system)
- base-devel (system)
- bottom (process manager)
- brightnessctl (screen brightness controls)
- cups (print support)
- exfatprogs (exfat file system tools)
- firefox (browser)
- fish (shell)
- fisher (shell package manager)
- git (version control system)
- gnome-keyring (keyring)
- gparted (partition manager)
- grim (screenshotter)
- hyprland (window manager)
- hyprlock (lock screen)
- intel-ucode (CPU microcode)
- kitty (terminal)
- libnotify (notification backend)
- libsecret (keyring)
- linux (kernal)
- linux-firmware (kernal firmware)
- linux-lts (backup kernal)
- mako (notifications)
- man (manpages)
- neovim (code editor)
- networkmanager (wifi)
- openssh (SSH)
- paru (AUR package manager)
- pipewire (audio)
- pipewire-alsa (audio)
- pipewire-audio (audio)
- pipewire-pulse (audio)
- polkit-kde-agent (audio)
- powertop (battery)
- python-pywal (color scheme generator)
- qt5-graphicaleffects (login screen tools)
- qt5-quickcontrols2 (login screen tools)
- qt5-svg (login screen tools)
- yazi (terminal file manager)
- refind (boot loader)
- reflector (pacman server configurator)
- rofi-wayland (rofi:?)
- rustup (rust installer/manager)
- sddm (login manager)
- slurp (screen area selector)
- sudo (root priviliges giver)
- swww (wallpaper)
- thermald (CPU temperature)
- timeshift (backups)
- tlp (battery)
- ttf-jetbrains-mono-nerd (jetbrains mono font)
- unzip (archive manager)
- wev (wayland event viewer)
- wget (http worker?)
- wl-clipboard (wayland clipboard)
- xf86-video-intel (video drivers)
- ripgrep (file search)
- seahorse (keyring manager)
- ntfs-3g (Windows parition access)
- luarocks (Lua package manager for nvim)
- waybar (system bar)
- keychain (ssh-agent manager)

## AUR Packages

- anki (flashcards)
- aylurs-gtk-shell (widgets)
- google-chrome (backup browser)
- visual-studio-code-bin (code editor)
- insomnia (api tester)

## Install Commands

### Packages

```bash
sudo pacman -Syu base base-devel bottom brightnessctl code cups exfatprogs firefox fish fisher git gparted grim hyprland hyprlock intel-ucode kitty libnotify linux linux-firmware linux-lts mako man-db neovim networkmanager openssh paru pipewire pipewire-alsa pipewire-audio pipewire-pulse polkit-kde-agent powertop python-pywal qt5-graphicaleffects qt5-quickcontrols2 qt5-svg refind reflector rofi-wayland rustup sddm slurp sudo swww thermald timeshift tlp ttf-jetbrains-mono-nerd unzip wev wgetwl-clipboard xf86-video-intel yazi ripgrep gmome-keyring libsecret seahorse ntfs-3g luarocks waybar keychain
```

#### Paru setup and AUR package install

```bash
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si
paru -Syu anki aylurs-gtk-shell google-chrome visual-studio-code-bin insomnia
```

### System Setup

#### Fish

```bash
fisher install jorgebucaran/hydro
fisher install danhper/fish-ssh-agent
set -U fish_greeting ""
set -U EDITOR nvim
```

#### Git & SSH

```bash
git config --global user.name "Talin Sharma"
git config --global user.email "talinsharma.dev@gmai.com"
ssh-keygen -t ed25520 -C "talinsharma.dev@gmail.com"
```

#### Wifi

```bash
nmcli device wifi connect "<SSID>" password "<PASSWORD>"
```

#### Refind

```bash
sudo cp ~/.config/refind.conf /boot/EFI/refind/refind.conf
sudo cp ~/.config/themes /boot/EFI/refind/themes -r
refind-install
```

#### SDDM

```bash
sudo cp ~/.config/sddm/themes/sugar-candy/* /usr/share/sddm/themes/sugar-candy -r
sudo cp ~/.config/sddm/sddm.conf /etc/sddm.conf
```

#### /etc Config Files

```bash
sudo cp ~/.config/etc/* /etc -r
```

#### Timeshift

```bash
sudo cp ~/.config/services/timeshift.service /usr/lib/systemd/system/timeshift.service
sudo cp ~/.config/services/timeshift.timer /usr/lib/systemd/system/timeshift.timer
```

#### System Service & Timers

```bash
sudo systemctl enable cups.service
sudo systemctl enable NetworkManager.service
sudo systemctl enable polkit.service
sudo systemctl enable sddm.service
sudo systemctl enable sshd.service
sudo systemctl enable powertop.service
sudo systemctl enable fstrim.timer
sudo systemctl enable reflector.timer
sudo systemctl enable timeshift.timer
```
