{ stdenv, pkgs }:
{
  mantablockscreen = stdenv.mkDerivation {
    name = "mantablockscreen-0.5";
    dontBuild = false;
    src = pkgs.fetchFromGitHub {
      owner = "reorr";
      repo = "mantablockscreen";
      rev = "v0.5";
      sha256 = "CR9BsddPv7YSfHwkG0E1mJKbPYhPuijsOrxYyQhQoWQ=";
    };
  };
}