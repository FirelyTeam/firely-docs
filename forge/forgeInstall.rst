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


#. Download and install the latest version of `Wine <https://wiki.winehq.org/Download>`_ (4.0.2).  

#. Install winetricks: ::

	wget https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks
	chmod +x winetricks
	sudo mv winetricks /usr/local/bin

#. Install .NET 4.8. This step may take 5-10 minutes to complete.  
   Answer `yes` to installing `Gecko` and `no` to Mono. ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 winetricks -q dotnet48
	
#. Install core fonts: ::

    WINEPREFIX="$HOME/.forge" WINEARCH=win32 winetricks corefonts

#. Download and run the `Forge <https://simplifier.net/forge/download>`_ setup package: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine setup.exe

#. The ClickOnce installer will erronously say that .NET 4.7.2 isn't installed, when it is (4.8 is a superset). Hit 'Install' - it'll think about installing it for a moment, then realise that it doesn't need to and proceed to launch Forge.

#. Ready!

   To run Forge again the next time, repeat the command: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine setup.exe


Running on macOS
~~~~~~~~~~~~~~~~
The .NET Framework and WPF support only the Windows operating system. However, it is possible to run Forge on macOS using `Wine <https://www.winehq.org/>`_ (unless you're on macOS Catalina - it does not support 32bit applications). While we do not officially support running Forge on macOS, here are the steps to get you started:


#. Open the ``Terminal`` (you can do so via Launchpad)

#. Install ``Homebrew`` by copy/pasting the following into the Terminal: ::

	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

#. Install ``Wine`` itself. This may take some time: ::

	brew install wine cabextract winetricks

#. Install .NET Framework. This step may take 5-10 minutes to complete. ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 winetricks -q dotnet48
	
#. Install necessary fonts. ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 winetricks corefonts
	
#. Improve font rendering. First, run the following: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 winecfg
	
#. Then in the ``Wine configuration`` window, go to the ``Graphics`` tab and set the ``Screen resolution`` to ``150`` dpi.
	
#. Download the `Forge <https://simplifier.net/forge/download>`_ setup package from Simplifier.  

   Move ``setup.exe`` to your ``/Applications`` folder and rename to ``Forge-R4.exe`` (or ``Forge-STU3.exe``, depending on your version).  
   Then execute the downloaded file to install the application: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine /Applications/Forge-R4.exe
	
   If wine complains that it cannot find the exe-file check if the ``Forge-R4.exe`` file is indeed in the ``/Applications`` folder.

   The ClickOnce installer will erronously say that .NET 4.7.2 isn't installed, when it is (4.8 is a superset). Hit 'Install' - it'll think about installing it for a moment, then realise that it doesn't need to and proceed to launch Forge.
	
#. Ready!

   To run Forge again in the future, rerun the last command in the terminal: ::

	WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine /Applications/Forge-R4.exe

   It might still think on each startup that .NET needs to be installed again. Just click through and it will realise it is already there and continue to open Forge.

Known issues
~~~~~~~~~~~~

#. On some systems, having an active secondary display will cause application rendering issues (e.g. gray window).  
   Please try to detach/disable secondary screen before starting the application.
