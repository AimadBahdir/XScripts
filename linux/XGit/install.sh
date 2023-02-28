if ! grep -q "alias xgit='bash ~/.xgit.sh'" ~/.bashrc; then
  wget https://raw.githubusercontent.com/AimadBahdir/XScripts/main/linux/XGit/xgit.sh -O ~/.xgit.sh > /dev/null 2>&1;
  echo "alias xgit='bash ~/.xgit.sh';" >> ~/.bashrc;
  source ~/.bashrc > /dev/null 2>&1;
  echo "XGit is installed successfully, you can use it by typing xgit in your terminal";
else
  echo "The xgit is already installed";
fi