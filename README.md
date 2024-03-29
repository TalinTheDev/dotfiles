# • DOTFILES •

## Install Steps

1. Clone this repo into `~/.config`
2. IDKKKKKK

3. Enter `fish` and execute:
    - `fisher install jorgebucaran/hydro`
    - `set -U fish-greeting “”`
4. Execute: 
    - `sudo systemctl enable bluetooth.service`
    - `systemctl enable pipewire.service`
    - `systemctl enable pipewire-pulse.service`
    - `systemctl enable bluetooth.service`
5. !!!TRY WITHOUT IT AND SEE IF IT WORKS!!!
    - Edit `/etc/pulse/client.conf` and change `autospawn=no` to `autospawn=yes`
6. Execute: `npm i -g neovim pnpm`

## Packages
### Core System
- base (base)
- base-devel (more base)
- intel-ucode (microcode)
- linux (kernel)
- linux-lts (backup kernel)
- linux-firmware (system firmware)
- refind (boot manager)
- xf86-video-intel (video drivers)
- syslinux (boot stuff for recovery)
- mtools (boot stuff for recovery)

### System Utilities
- brightnessctl	(screen brightness)
- networkmanager (wifi)
- paru (AUR helper)
- wireless_tools (more wifi)	
- wpa_supplicant (more more wifi)
- bluez (bluetooth)	
- bluez-utils (bluetooh utilities)
- bluetuith	(bluetooth TUI)
- mako (notifications)
- pipewire (audio)
- wireplumber (audio)
- pipewire-audio (audio)
- pipewire-alsa (audio)
- pipewire-pulse (audio)
- cups (printing)
- hplip-lite (HP printer ppd files)	
- htop (task manager)
- bottom (task manager)
- wl-clipboard (clipboard)
- gparted (disk editor)
- rsync (file copy)

## Apps
- google-chrome (browser) [AUR]
- thunar (file manager)

## Ricing
- hyprland (wm)
- swww (wallpaper)
- rofi-lbonn-wayland (launcher + menu) [AUR]
- python-pywal (color scheme generator)
- waybar (bar)
- kitty (terminal)
- fish (shell)
- fisher (fish plugin manager)
- ttf-font-awesome (icon font)
- nerd-fonts (fonts)
- ttf-google-fonts-git (fonts) [AUR]
- swaylock (screen locker)
- sddm (display manager)
- waybar-module-pacman-updates-git (updates script for waybar) [AUR]
- swayidle (idle)
- grimblast-git (screenshoter) [AUR]
- wlr-randr-git (video output) [AUR]

## Dev Packages
- neovim (file editor)
- fd (find alternative)
- ripgrep (grep alternative)
- wget (http)
- curl (http)
- tar (archives)
- gzip (archives)
- git (version control)
- nodejs (node.js)
- npm (node package manager)
- libsoup (tauri stuff)
- webkit2gtk (tauri stuff)

## Misc
- neofetch (system fetch)
- ranger (file manager TUI)
- pipes.sh (pipes terminal screensaver) [AUR]
- cmatrix (matrix terminal screensaver)
- discord (chat application)
- wev (wayland event viewer)
