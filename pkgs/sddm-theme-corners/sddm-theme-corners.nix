{ stdenv, pkgs }:
{
  sddm-theme-corners = stdenv.mkDerivation {
    name = "sddm-theme-corners-0.1.1";
    dontBuild = true;
    installPhase = ''
      mkdir -p $out/share/sddm/themes
      cp -R $src $out/share/sddm/themes/corners
    '';
    src = /home/talin/sddm-theme-corners/corners;
  };
}
