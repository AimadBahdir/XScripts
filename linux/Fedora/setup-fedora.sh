#!/bin/bash
if [ $(echo $HOME | grep "/root" | wc -w) -eq "1" ]
then
    cat << 'END'
     _____       _             _____     _           
    |   __|___ _| |___ ___ ___|   __|___| |_ _ _ ___ 
    |   __| -_| . | . |  _| .'|__   | -_|  _| | | . |
    |__|  |___|___|___|_| |__,|_____|___|_| |___|  _|
                                                |_|  
END
    exec </dev/tty >/dev/tty
    read -p "Do you want to update firefox? (Y/n) " uf;
    read -p "Do you want to install NodeJs? (Y/n) " injs;
    read -p "Do you want to install snap? (Y/n) " isn;
    read -p "Do you want to install Docker? (Y/n) " id;
    read -p "Do you want to install Chrome? (Y/n) " ich;
    read -p "Do you want to setup flutter env? (Y/n) " flutter;
    echo ">> Update dnf.conf";
    echo "fastestmirror=True" >> /etc/dnf/dnf.conf;
    echo "max_parallel_downloads=5" >> /etc/dnf/dnf.conf;
    echo "defaultyes=True" >> /etc/dnf/dnf.conf;
    echo "keepcache=True" >> /etc/dnf/dnf.conf;
    #############################################
    echo ">> Clean dnf cache";
    dnf clean all > /dev/null 2>&1;
    #############################################
    echo ">> Update system (dnf)";
    dnf update > /dev/null 2>&1;
    #############################################
    echo ">> Enable RPM Fusion";
    dnf -y install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm > /dev/null 2>&1;
    dnf groupupdate core > /dev/null 2>&1;
    #############################################
    echo ">> Adding Flatpaks...";
    flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo > /dev/null 2>&1;
    #############################################
    echo ">> Installing Media Codecs...";
    dnf groupupdate multimedia --setop="install_weak_deps=False" --exclude=PackageKit-gstreamer-plugin > /dev/null 2>&1;
    #############################################
    echo ">> Installing Visual Studio Code...";
    rpm --import https://packages.microsoft.com/keys/microsoft.asc > /dev/null 2>&1;
    sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo' > /dev/null 2>&1;
    dnf -y install code > /dev/null 2>&1;
    #############################################
    echo ">> Installing Discord...";
    dnf -y install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm > /dev/null 2>&1;
    dnf -y install discord > /dev/null 2>&1;
    wget https://raw.githubusercontent.com/AimadBahdir/XScripts/main/linux/Fedora/update-discord.sh -P /usr/ > /dev/null 2>&1;
    echo "alias discordup='sudo bash /usr/update-discord.sh'" >> ~/.bashrc;
    #############################################
    case $isn in n ) break;; * )
        echo ">> Installing snap...";
        dnf -y install snapd > /dev/null 2>&1;
        systemctl enable --now snapd.socket > /dev/null 2>&1;
        ln -s /var/lib/snapd/snap /snap > /dev/null 2>&1;;
    esac
    #############################################
    case $uf in n ) break;; * )
        echo ">>> Installing latest update of firefox...";
        wget --max-redirect=1 "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64&lang=en-US" -O firefox.tar.bz2 > /dev/null 2>&1;
        tar xjf firefox.tar.bz2 > /dev/null 2>&1;
        mv firefox /opt > /dev/null 2>&1;
        ln -s /opt/firefox/firefox /usr/local/bin/firefox > /dev/null 2>&1;
        rm firefox.tar.bz2 > /dev/null 2>&1;
        wget https://raw.githubusercontent.com/mozilla/sumo-kb/main/install-firefox-linux/firefox.desktop -P /usr/local/share/applications > /dev/null 2>&1;
        sudo sed 's/^Name=.*/Name=Firefox/' /usr/local/share/applications/firefox.desktop > /dev/null 2>&1;;
    esac
    #############################################
    case $ich in n ) break;; * )
        echo ">>> Installing chrome...";
        dnf -y install fedora-workstation-repositories > /dev/null 2>&1;
        dnf config-manager --set-enabled google-chrome > /dev/null 2>&1;
        dnf -y install google-chrome-stable > /dev/null 2>&1;;
    esac
    #############################################
    case $injs in n ) break;; * )
        echo ">>> Installing NodeJS...";
        dnf -y install nodejs;
    esac
    #############################################
    case $flutter in n ) break;; * )
        curl https://raw.githubusercontent.com/AimadBahdir/XScripts/main/linux/Fedora/setup-flutter-env.sh | bash;;
    esac
    #############################################
    case $id in n ) break;; * )
        echo ">>> Installing Docker...";
        dnf remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-selinux docker-engine-selinux docker-engine > /dev/null 2>&1;
        dnf -y install dnf-plugins-core > /dev/null 2>&1;
        dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
        dnf -y install docker-ce docker-ce-cli containerd.io docker-compose-plugin > /dev/null 2>&1;
        systemctl enable docker.service > /dev/null 2>&1;;
    esac
    #############################################
    echo ">>> Done! Have a nice day!";
    echo "#For more scripts: https://bit.ly/morescripts"
else
    echo "Please run script with sudo";
fi