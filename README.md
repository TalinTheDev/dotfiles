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
- linux (kernal)
- linux-firmware (kernal firmware)
- linux-lts (backup kernal)
- mako (notifications)
- man (manpages)
- neovim (code editor)
- networkmanager (wifi)
- openssh (SSH)
- paru (AUR package manager) [not installed through pacman]
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
- keychain (ssh-agent manager)
- zig (zig)
- tmux (terminal multiplexer)
- jq (json on the terminal)
- socat (daemon runner)
- zed (code editor)
- man-db (man pages)
- kcharselect (character viewer)

## AUR Packages

- anki (flashcards)
- aylurs-gtk-shell (widgets)
- google-chrome (backup browser)
- visual-studio-code-bin (code editor)
- insomnia (api tester)
- ttf-tabler-icons (icon font for ags)

## Install

```bash
git clone git@github.com:TalinTheDev/dotfiles.git ~/.config
cd ~/.config
chmod +x ./install.sh
./install.sh
```
