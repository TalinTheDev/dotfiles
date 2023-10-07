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

  environment.systemPackages = with pkgs; [
    kitty
    gitFull
    nodePackages.degit
    gnome.gnome-keyring
    libsecret
    awesome
    picom
    numlockx
    networkmanagerapplet
    xfce.xfce4-power-manager
    (callPackage ./pkgs/sddm-sugar-dark/sddm-sugar-dark.nix {}).sddm-sugar-dark

    libsForQt5.qt5.qtgraphicaleffects
    plank
    bamf
  ];

  services = {
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
        defaultSession = "none+awesome";
      };

      windowManager.awesome = {
        enable = true;
        luaModules = with pkgs.luaPackages; [
          luarocks
          luadbi-mysql
        ];
      };
    };
    printing.enable = true;
  };

  system = {
    stateVersion = "23.05";
  };
  security.pam.services.sddm.enableGnomeKeyring = true;
}
