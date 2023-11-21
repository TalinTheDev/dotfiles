{ stdenv, pkgs }:
{
  feather = stdenv.mkDerivation {
    name = "feather-1.0";
    dontBuild = true;
    installPhase = ''
      mkdir -p $out/share/fonts/truetype/feather
      cp -r feather/TTF/* $out/share/fonts/truetype/feather
    '';
    src = ./feather;
  };
}
