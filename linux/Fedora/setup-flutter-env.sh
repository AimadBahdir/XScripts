#!/bin/bash
if [ $(echo $HOME | grep "/root" | wc -w) -eq "0" ]
then
cat <<'EOF'
     _____ _     _   _           _____         
    |   __| |_ _| |_| |_ ___ ___|   __|___ _ _ 
    |   __| | | |  _|  _| -_|  _|   __|   | | |
    |__|  |_|___|_| |_| |___|_| |_____|_|_|\_/ 
                                            
EOF
    #############################################
    cd $HOME;
    echo ">>> Installing Android Studio...";
    if ! command -v snap &> /dev/null
    then
        dnf -y install snapd > /dev/null 2>&1;
        systemctl enable --now snapd.socket > /dev/null 2>&1;
        ln -s /var/lib/snapd/snap /snap > /dev/null 2>&1;;
    fi
    sudo snap install android-studio --classic
    #############################################
    echo ">>> Installing Dart-SDK...";
    wget https://storage.googleapis.com/dart-archive/channels/be/raw/latest/sdk/dartsdk-linux-x64-release.zip -O dartSdkTmp.zip;
    unzip dartSdkTmp.zip -d $HOME;
    rm dartSdkTmp.zip;
    #############################################
    echo ">>> Installing  Flutter...";
    git clone https://github.com/flutter/flutter.git -b stable;
    sudo dnf install clang cmake ninja-build.x86_64 gtk3-devel
    echo "  - Accepting licenses...";
    yes | $HOME/Android/Sdk/cmdline-tools/latest/bin/sdkmanager --licenses
    flutter doctor
    echo 'export PATH="$PATH:$HOME/flutter/bin"' >> $HOME/.bashrc;
    echo 'export PATH="$PATH:$HOME/dart-sdk/bin"' >> $HOME/.bashrc;
    echo 'if [ $(echo $PWD | grep /sportime | wc -w) -eq "1" ]
    then
       flutter upgrade
       git pull origin develop
    fi' >> $HOME/.bashrc;
else
    echo "Please run script without sudo";
fi
