#!/bin/bash
if [ $(echo $HOME | grep "/root" | wc -w) -eq "1" ]
then
cat <<'EOF'

EOF
    echo ">>> Installing latest update of discord...";
    wget --max-redirect=1 "https://discord.com/api/download/stable?platform=linux&format=tar.gz" -O discord.tar.gz;
    tar xvf discord.tar.gz > /dev/null 2>&1;
    rm -rf /usr/lib64/discord > /dev/null 2>&1;
    mv Discord /usr/lib64/discord > /dev/null 2>&1;
    rm -rf discord.tar.gz Discord > /dev/null 2>&1;
    echo ">>> Done! Have a nice day!";
    echo "#For more scripts: https://bit.ly/morescripts"
else
    echo "Please run script with sudo";
fi