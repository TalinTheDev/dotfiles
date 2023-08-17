{
  description = "Talin's First NixOS Flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    home-manager.url = "github:nix-community/home-manager";
    home-manager.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = inputs@{ nixpkgs, home-manager, ... }: {
    nixosConfigurations = {
      TalinsNix = nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          ./configuration.nix
          home-manager.nixosModules.home-manager
          {
            home-manager.useGlobalPkgs = true;
            home-manager.useUserPackages = true;
<<<<<<< HEAD
            home-manager.users.talin = import ./home.nix;

=======
            home-manager.users.talin = import ./home-manager/talin.nix;
>>>>>>> 013707a (More fish stuff and trying to change folder stuff)
          }
        ];
      };
    };
  };
}