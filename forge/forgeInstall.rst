Click once installer
====================
Running on Windows
~~~~~~~~~~~~~~~~~~
Forge is deployed using a `ClickOnce <https://docs.microsoft.com/en-us/visualstudio/deployment/clickonce-security-and-deployment>`_ installer.
You can download and install the application without requiring administrator permissions (except .NET FW, see below).
The application automatically detects and installs updates when you start the application.
After installation of a new release, you will again receive automatic update notifications on application startup.

Forge is based on the `Microsoft .NET Framework <https://dotnet.microsoft.com/learn/dotnet/what-is-dotnet>`_ version 4.7.2 and `WPF <https://visualstudio.microsoft.com/vs/features/wpf/>`_.
The ClickOnce installer will download and install the .NET Framework 4.7.2 on demand, if not already available.

**Warning!** Installing or updating the .NET Framework requires administrator permissions.
If you have insufficient permissions, please contact your system administrator.


Running on Linux
~~~~~~~~~~~~~~~~
The .NET Framework and WPF support only the Windows operating system. However, it is possible to run Forge on Linux using `Wine <https://www.winehq.org/>`_. While we do not officially support running Forge on Linux, here are the steps to get you started:


#. Install Wine 2.4 (later versions have issues running .NET). If you're using Ubuntu, copy/paste the following into the terminal: ::

	curl -O https://dl.winehq.org/wine-builds/ubuntu/pool/main/wine-staging-amd64_2.4.0-3~zesty_amd64.deb
	curl -O https://dl.winehq.org/wine-builds/ubuntu/pool/main/wine-staging-compat_2.4.0-3~zesty_amd64.deb
	curl -O https://dl.winehq.org/wine-builds/ubuntu/pool/main/wine-staging-compat_2.4.0-3~zesty_i386.deb
	curl -O https://dl.winehq.org/wine-builds/ubuntu/pool/main/wine-staging-dev_2.4.0-3~zesty_amd64.deb
	curl -O https://dl.winehq.org/wine-builds/ubuntu/pool/main/wine-staging_2.4.0-3~zesty_amd64.deb
	curl -O https://dl.winehq.org/wine-builds/ubuntu/pool/main/wine-staging_2.4.0-3~zesty_i386.deb
	curl -O https://dl.winehq.org/wine-builds/ubuntu/pool/main/winehq-staging_2.4.0-3~zesty_amd64.deb
	curl -O https://dl.winehq.org/wine-builds/ubuntu/pool/main/winehq-staging_2.4.0-3~zesty_i386.deb
	sudo dpkg -i *.deb

#. Install winetricks: ::

	wget https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks
	chmod +x winetricks
	sudo mv winetricks /usr/local/bin

#. Install .NET 4.7.2. This may take some time.
   Answer `yes` to installing `Gecko` and `no` to Mono. ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 winetricks -q dotnet472

#. Download `Forge <https://simplifier.net/forge/download>`_.

#. Run Forge with: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine setup.exe

#. Ready!

   To run Forge again the next time, repeat the command: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine setup.exe


Running on macOS
~~~~~~~~~~~~~~~~
The .NET Framework and WPF support only the Windows operating system. However, it is possible to run Forge on macOS using `Wine <https://www.winehq.org/>`_. While we do not officially support running Forge on macOS, here are the steps to get you started:


#. Install ``Xcode`` from the App Store.

#. Open the ``Terminal`` (you can do so via Launchpad)

#. Install ``Homebrew`` by copy/pasting the following into the Terminal: ::

	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

#. Install ``Wine`` itself. This may take some time: ::

	brew install wine cabextract winetricks

#. Install .NET 4.7.2. This may take some time.
   Answer `yes` to installing `Gecko` and `no` to Mono. ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 winetricks -q dotnet472
	
#. Improve font rendering. First, run the following: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 winecfg
	
#. Then in the ``Wine configuration`` window, go to the ``Graphics`` tab and set the ``Screen resolution`` to ``150`` dpi.
	
#. Download ``setup.exe`` from the `Forge download page <https://simplifier.net/forge/download>`_ and run it: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine $HOME/Downloads/setup.exe
	
#. Ready!

   To run Forge again in the future, rerun the last command in the terminal: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine $HOME/Downloads/setup.exe
