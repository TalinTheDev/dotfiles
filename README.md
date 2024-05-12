# Dotfiles

## Package List
- base
- base-devel
- bottom (Task manager/system info viewer)
- brightnessctl (Screen brightness control)
- cups (Printing)
- exfatprogs (Work with exfat partitions)
- firefox (Browser)
- fish (Shell prompt)
- fisher (Fish's package manager)
- git
- gparted (Disk management)
- hyprland (Window manager)
- intel-ucode (CPU microcode)
- kitty (Terminal)
- libnotify (Notifications)
- linux (Main kernel)
- linux-firmware (Kernel firmware)
- linux-lts (Backup kernel)
- mako (Notifications)
- neovim (File editor)
- networkmanager (Wifi)
- openssh (SSH)
- polkit-kde-agent (Authentication)
- powertop (Power management)
- ranger (File explorer)
- refind (Bootloader)
- reflector (Pacman mirrors)
- rustup (Rust)
- sddm (Login manager)
- thermald (CPU scaling)
- timeshift (Backups)
- tlp (Power management)
- wofi (Application launcher)
- xf86-video-intel (Video Drivers)

## AUR Packages
- anki (Flashcards)
- paru (AUR Helper)
- swww (Wallpaper)

## Install Commands
### Packages
```bash
sudo pacman -Syu base base-devel bottom brightnessctl cups exfatprogs firefox fish fisher git gparted hyprland intel-ucode kitty libnotify linux linux-firmware linux-lts mako neovim networkmanager openssh polkit-kde-agent powertop ranger refind reflector rustup sddm thermald timeshift tlp wofi xf86-video-intel
```
```bash
# Paru setup and AUR package install
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si
paru -Syu anki swww`
```
### System Setup
```bash
# Fish
fisher install jorgebucaran/hydro
set -U fish_greeting ""
set -U EDITOR nvim
```
```bash
# Git & SSH
git config --global user.name "Talin Sharma"
git config --global user.email "talinsharma.dev@gmai.com"
ssh-keygen -t ed25519 -C "talinsharma.dev@gmail.com"
su root
bash
exec ssh-agent bash
ssh-add /home/talins/.ssh/<SSH_KEY>
```
```bash
# Wifi
nmcli device wifi connect "<SSID>" password "<PASSWORD>"
```
```bash
# Refind
sudo cp ~/.config/refind.conf /boot/EFI/refind/refind.conf
sudo cp ~/.config/themes /boot/EFI/refind/themes -r
```
```bash
# SDDM
```
```bash
# Timeshift
sudo cp ~/.config/services/timeshift.service /usr/lib/systemd/system/timeshift.service
sudo cp ~/.config/services/timeshift.timer /usr/lib/systemd/system/timeshift.timer
```
```bash
# System Service & Timers
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
