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
  sound.enable = true;
  hardware.pulseaudio.enable = true;

  users.users.talin = {
    description = "Talin Sharma";
    isNormalUser = true;
    extraGroups = [ "wheel" "video" "networkmanager" ];
  };
  programs = {
    hyprland = {
      enable = true;
    };
    firefox = {
      enable = true;
    };
  };
  environment.systemPackages = with pkgs; [
    kitty
    gitFull
    gnome.gnome-keyring
    libsecret
    numlockx
    rofi-wayland
    eww-wayland
    (callPackage ./pkgs/sddm-sugar-dark/sddm-sugar-dark.nix {}).sddm-sugar-dark

    libsForQt5.qt5.qtgraphicaleffects
    bamf
    
    # For EWW
    jq 
    socat
  ];

  services = {
    bamf.enable = true;
    gnome.gnome-keyring = {
      enable = true;
    };

    xserver = {
      enable = true;
      layout = "us";
      libinput.enable = true;

      displayManager = {
        sddm.enable = true;
        sddm.theme = "sugar-dark";
      };
    };
    printing.enable = true;
  };

  system = {
    stateVersion = "23.05";
  };
  security.pam.services.sddm.enableGnomeKeyring = true;
  security.pam.services.swaylock = {};
}
