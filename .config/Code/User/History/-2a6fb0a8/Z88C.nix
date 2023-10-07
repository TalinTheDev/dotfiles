{ stdenv, pkgs }:
{
  sddm-sugar-dark = stdenv.mkDerivation {
    name = "sddm-sugar-dark-1.2.3";
    dontBuild = true;
    installPhase = ''
      mkdir -p $out/share/sddm/themes
      cp -aR $src $out/share/sddm/themes/sugar-dark
    '';
    src = pkgs.fetchFromGitHub {
      owner = "TalinTheDev";
      repo = "sddm-sugar-dark";
      rev = "v1.2.3";
      sha256 = "J8ElwjPs278bExs8Cm8IJMU0FJcIAzedKsJ+xtHlruE=";
    };
  };
}