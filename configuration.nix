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
  hardware.pulseaudio.package = pkgs.pulseaudioFull;

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
    gnome.gnome-keyring
    libsecret
    rofi-wayland
    (callPackage ./pkgs/sddm-chili/sddm-chili.nix {}).sddm-chili
    #(callPackage ./pkgs/ags/ags.nix {}).ags
  ];

  fonts.fonts = with pkgs; [
    font-awesome
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
        sddm.theme = "chili";
      };
    };
  };

  system = {
    stateVersion = "23.05";
  };
  security.pam.services.sddm.enableGnomeKeyring = true;
}
