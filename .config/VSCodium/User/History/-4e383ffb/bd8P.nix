{ config, pkgs, ... }:
{
  imports = [
    ./hardware-configuration.nix
  ];

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
    google-chrome
    vscode
    kitty
    fish
    neofetch
    git
    awesome
    plank
  ];

  services = {
    xserver = {
      enable = true;
      layout = "us";
      libinput.enable = true;
    };
    printing.enable = true;
  };

  system = {
    copySystemConfiguration = true;
    stateVersion = "23.05";
  };
}

