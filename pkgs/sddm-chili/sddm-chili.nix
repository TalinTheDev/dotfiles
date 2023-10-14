{ stdenv, pkgs }:
{
  sddm-chili = stdenv.mkDerivation {
    name = "sddm-chili-0.1.5";
    dontBuild = true;
    installPhase = ''
      mkdir -p $out/share/sddm/themes
      cp -aR $src $out/share/sddm/themes/chili
    '';
    src = pkgs.fetchFromGitHub {
      owner = "MarianArlt";
      repo = "sddm-chili";
      rev = "v0.1.5";
      sha256 = "=";
    };
  };
}