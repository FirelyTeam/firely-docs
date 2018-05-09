Click once installer
====================
Running on Windows
~~~~~~~~~~~~~~~~~~
Forge is deployed using a click once installer. 
So it automatically updates to the newest version when you start the application. 
After installation of a new release, you will again receive automatic update notifications on application startup.

We moved Forge to a new deployment location. 
As a result existing installations of the previous DSTU-2 alpha release will no longer automatically detect the new update. 
Therefore we strongly advise you to uninstall the earlier DSTU-2 alpha release manually before installing this new version.

Running on Linux
~~~~~~~~~~~~~~~~
Forge is written in .NET, and though .NET Core is available natively on Linux, the GUI framework, `WPF <https://en.wikipedia.org/wiki/Windows_Presentation_Foundation>`_ is unfortunately not. However, it is possible to run Forge on Linux using `Wine <https://www.winehq.org/>`_. While we do not officially support running Forge on Linux, here are the steps to get you started:

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

#. Install .NET 4.6. Answer `yes` to installing `Gecko` and `no` to Mono: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 winetricks -q dotnet46

#. Download `Forge <https://simplifier.net/forge/download>`_.

#. Run Forge with: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine setup.exe

Forge will install and launch. To run Forge again the next time, repeat the command: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine setup.exe


Running on macOS
~~~~~~~~~~~~~~~~
Forge is written in .NET, and though .NET Core is available natively on macOS, the GUI framework, `WPF <https://en.wikipedia.org/wiki/Windows_Presentation_Foundation>`_ is unfortunately not. However, it is possible to run Forge on macOS using `Wine <https://www.winehq.org/>`_. While we do not officially support running Forge on macOS, here are the steps to get you started:

#. Install ``Xcode`` from the App Store.

#. Open the ``Terminal`` (you can do so via Launchpad)

#. Install ``Homebrew`` by copy/pasting the following into the Terminal: ::

	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

#. Install ``Wine`` itself. This may take some time: ::

	brew install wine cabextract winetricks

#. Setup Wine to run .NET 4.6 applications, which is what Forge is built with. This may take some time: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 winetricks -q dotnet46
	
#. Improve font rendering. First, run the following: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 winecfg
	
#. Then in the ``Wine configuration`` window, go to the ``Graphics`` tab and set the ``Screen resolution`` to ``150`` dpi.
	
#. Download ``setup.exe`` from the `Forge download page <https://simplifier.net/forge/download>`_ and run it: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine $HOME/Downloads/setup.exe
	
That's all - Forge will now install and run.

To run Forge again in the future, rerun the last command in the terminal: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine $HOME/Downloads/setup.exe
