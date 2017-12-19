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
Though .NET Core is available natively on Linux, the GUI framework, `WPF <https://en.wikipedia.org/wiki/Windows_Presentation_Foundation>`_ is unfortunately not. However, it is possible to run Forge on Linux using `Wine <https://www.winehq.org/>`_:

#. Install Wine 2.4 (later versions have issues running .NET). If you're using Ubuntu, you can do the following: ::

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

	WINEPREFIX="$HOME/.forge7" WINEARCH=win32 winetricks -q dotnet46

#. Download `Forge <https://fhir.furore.com/forge/>`_.

#. Run Forge with: ::

	WINEPREFIX="$HOME/.forge7" WINEARCH=win32 wine setup.exe

Forge will install and launch. To run Forge again the next time, repeat the command: ::

	WINEPREFIX="$HOME/.forge7" WINEARCH=win32 wine setup.exe
