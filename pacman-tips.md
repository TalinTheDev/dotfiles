# Pacman Tips & Tricks

Install Package/Group: `pacman -S --needed <target>`
Remove Package: `pacman -R <target>`
Remove Package & Dependencies: `pacman -Rs <target>`
Remove Package, Dependencies, & Backup Files: `pacman -Rns <target>`

Update Packages: `pacman -Syu --needed`

List Packages Not Needed As Dependencies (Orphans): `pacman -Qqdt`
List Packages Installed But Not Required As Dependencies: `pacman -Qqet`

List Explicitly Installed Packages: `pacman -Qqe`
List Explicitly Installed Packages By Pacman: `pacman -Qqen`
List Foreign Packages: `pacman -Qqm`
List Debug Packages: `pacman -Qqs '\-debug$'

# Paru Tips & Tricks

Install AUR Package: `paru --needed <target>` OR `paru -S --needed <target>`
Update AUR Packages: `paru -Sua --needed`
Print AUR Updates: `paru -Qua`
