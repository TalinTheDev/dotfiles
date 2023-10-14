{ stdenv, pkgs }:
{
  sddm-chili = stdenv.mkDerivation {
    name = "sddm-chili-0.1.7";
    dontBuild = true;
    installPhase = ''
      mkdir -p $out/share/sddm/themes
      cp -aR $src $out/share/sddm/themes/chili
    '';
    src = pkgs.fetchFromGitHub {
      owner = "TalinTheDev";
      repo = "sddm-chili";
      rev = "v0.1.7";
      sha256 = "/JzvnhEGAnWRgtbsvOeuHkGARYha4vLKqh4A9FEpOew=";
    };
  };
}