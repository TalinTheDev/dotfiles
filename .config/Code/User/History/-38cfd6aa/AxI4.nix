{ stdenv, pkgs }:
{
  mantablockscreen = stdenv.mkDerivation {
    name = "mantablockscreen-0.5";
    dontBuild = false;
    makeFile = "Makefile";
    makeFlags = [ "PREFIX=$(out)" ];

    src = pkgs.fetchFromGitHub {
      owner = "TalinTheDev";
      repo = "mantablockscreen";
      rev = "v0.5.1";
      hash = "sha256-Ryru+wf7i1VGGEpEI1cceT+LKq+SVWNDw5wUxrGQG8o=";
    };
  };
}