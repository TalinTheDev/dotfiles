{ stdenv, pkgs }:
{
  sddm-sugar-dark = stdenv.mkDerivation {
    name = "mantablockscreen-0.5";
    dontBuild = false;
    src = pkgs.fetchFromGitHub {
      owner = "TalinTheDev";
      repo = "sddm-sugar-dark";
      rev = "v1.2.5";
      sha256 = "CR9BsddPv7YSfHwkG0E1mJKbPYhPuijsOrxYyQhQoWQ=";
    };
  };
}