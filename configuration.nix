{ config, pkgs, ... }:
{
  imports = [
    ./hardware-configuration.nix
  ];

  nixpkgs.config.allowUnfree = true;
  nix.settings.experimental-features = [ "nix-command" "flakes" ];
  
  boot = {
    loader = {
      systemd-boot.enable = true;
      efi.canTouchEfiVariables = false;
    };
  };

  networking = {
    hostName = "TalinsNix";
    networkmanager.enable = true;
    firewall.enable = true;
  };


  time.timeZone = "America/New_York";
  hardware.pulseaudio.enable = true;
  hardware.bluetooth.enable = true;
  hardware.bluetooth.powerOnBoot = true;

  users.users.talin = {
    description = "Talin Sharma";
    isNormalUser = true;
    extraGroups = [ "wheel" "video" "networkmanager" "audio" ];
  };
  programs = {
    hyprland = {
      enable = true;
    };
  };
  environment.systemPackages = with pkgs; [
    kitty
    git
    mako
    libnotify
    pulseaudio
    gnome.gnome-keyring
    libsecret
    rofi-wayland
    wlogout
    libsForQt5.qt5.qtgraphicaleffects # SDDM
    libsForQt5.qt5.qtquickcontrols2 # SDDM
    nwg-look # GTK Themes
    (callPackage ./pkgs/sddm-theme-corners/sddm-theme-corners.nix {}).sddm-theme-corners
  ];

  fonts.packages = with pkgs; [
    font-awesome
    google-fonts
    nerdfonts
  ];

  services = {
    blueman.enable = true;
    printing.enable = true;
    bamf.enable = true;
    gnome.gnome-keyring = {
      enable = true;
    };

    avahi = {
      enable = true;
      nssmdns = true;
      openFirewall = true;
    };

    xserver = {
      enable = true;
      layout = "us";
      libinput.enable = true;

      displayManager = {
        sddm.enable = true;
        sddm.theme = "corners";
      };

      excludePackages = [
        pkgs.xterm
      ];
    };
  };

  system = {
    stateVersion = "23.05";
  };
  security.pam.services.sddm.enableGnomeKeyring = true;
  security.pam.services.gtklock = {};
  services.thermald.enable = true;
  services.tlp.enable = true;
  powerManagement.powertop.enable = true;
}
