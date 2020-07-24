# Installing Forge

Go to the [Forge download page](https://simplifier.net/forge) to download Forge.

## Installing on Windows

Forge is deployed using a
[ClickOnce](https://docs.microsoft.com/en-us/visualstudio/deployment/clickonce-security-and-deployment)
installer. You can download and install the application without
requiring administrator permissions (except .NET FW, see below). The
application automatically detects and installs updates when you start
the application. After installation of a new release, you will again
receive automatic update notifications on application startup.

Forge is based on the [Microsoft .NET
Framework](https://dotnet.microsoft.com/learn/dotnet/what-is-dotnet)
version 4.7.2 and
[WPF](https://visualstudio.microsoft.com/vs/features/wpf/). The
ClickOnce installer will download and install the .NET Framework 4.7.2
on demand, if not already available.  
**Warning\!** Installing or updating the .NET Framework requires
administrator permissions. If you have insufficient permissions, please
contact your system administrator.

## Installing on other operating systems

The .NET Framework and WPF, on which Forge is built, only support the Windows operating system. For users using other platforms, generally the best solution is to **run Windows in a Virtual Machine**, on your own machine or in the cloud, and install Forge on that. [VirtualBox](https://www.virtualbox.org/) is an example of a great, free application to run virtual machines on your computer. Example instructions for [installing Windows on MacOS with VirtualBox can be found here](https://www.howtogeek.com/657464/how-to-install-a-windows-10-virtualbox-vm-on-macos/).

In some cases it is also possible to run Forge on Linux or MacOS using [Wine](https://www.winehq.org/). While we do not officially support this, the steps to get you started are below.

### Forge on Linux with Wine

1.  Download and install the latest version of
    [Wine](https://wiki.winehq.org/Download) (4.0.2).

2.  Install winetricks: :
    
        wget https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks
        chmod +x winetricks
        sudo mv winetricks /usr/local/bin

3.  Install .NET 4.8. This step may take 5-10 minutes to complete.
    Answer <span class="title-ref">yes</span> to installing
    <span class="title-ref">Gecko</span> and
    <span class="title-ref">no</span> to Mono. :
    
        WINEPREFIX="$HOME/.forge" WINEARCH=win32 winetricks -q dotnet48

4.  Install core fonts: :
    
        WINEPREFIX="$HOME/.forge" WINEARCH=win32 winetricks corefonts

5.  Download and run the [Forge](https://simplifier.net/forge/download)
    setup package: :
    
        WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine setup.exe

6.  The ClickOnce installer will erronously say that .NET 4.7.2 isn't
    installed, when it is (4.8 is a superset). Hit 'Install' - it'll
    think about installing it for a moment, then realise that it doesn't
    need to and proceed to launch Forge.

7.  Ready\!
    
    To run Forge again the next time, repeat the command: :
    
        WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine setup.exe

### Forge on MacOS with Wine

Note that the Forge installer is currently only available in 32-bit, which is
unsupported by MacOS Catalina. Please install Windows in a Virtual Machine instead.

1.  Open the `Terminal` (you can do so via Launchpad)

2.  Install `Homebrew` by copy/pasting the following into the Terminal:
    :

        /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

3.  Install `Wine` itself. This may take some time: :

        brew install wine cabextract winetricks

4.  Install .NET Framework. This step may take 5-10 minutes to complete.
    :

        WINEPREFIX="$HOME/.forge" WINEARCH=win32 winetricks -q dotnet48

5.  Install necessary fonts. :

        WINEPREFIX="$HOME/.forge" WINEARCH=win32 winetricks corefonts

6.  Improve font rendering. First, run the following: :

        WINEPREFIX="$HOME/.forge" WINEARCH=win32 winecfg

7.  Then in the `Wine configuration` window, go to the `Graphics` tab
    and set the `Screen resolution` to `150` dpi.

8.  Download the [Forge](https://simplifier.net/forge/download) setup package from Simplifier.

    Move `setup.exe` to your `/Applications` folder and rename to
    `Forge-R4.exe` (or `Forge-STU3.exe`, depending on your version).
    Then execute the downloaded file to install the application: :

        WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine /Applications/Forge-R4.exe

    If wine complains that it cannot find the exe-file check if the
    `Forge-R4.exe` file is indeed in the `/Applications` folder.

    The ClickOnce installer will erronously say that .NET 4.7.2 isn\'t
    installed, while it is (4.8 is a superset). Hit \'Install\' - it\'ll
    think about installing it for a moment, then realise that it
    doesn\'t need to and proceed to launch Forge.

9.  Ready!

    To run Forge again in the future, rerun the last command in the
    terminal: :

        WINEPREFIX="$HOME/.forge" WINEARCH=win32 wine /Applications/Forge-R4.exe

    It might still think on each startup that .NET needs to be installed
    again. Just click through and it will realise it is already there
    and continue to open Forge.

### Known issues

1.  On some systems, having an active secondary display will cause
    application rendering issues (e.g. gray window). Please try to
    detach/disable secondary screen before starting the application.

## Resolving installation Security Warning

In some cases users find that when installing or updating Forge the following security warning appears:
{{render:forgeinstallsecuritywarning}}

If this is the case for you, please follow [the steps listed in this blog post](https://www.gonnalearn.com/your-administrator-has-blocked-this-application-because-it-potentially-poses-a-security-risk-to-your-computer/) to change the values of `TrustManager` in the registry with Registry Editor. After that the installation should allow you to continue.

If you're not allowed to change the registry of your computer, please ask your administrator for help.

## Installing behind a proxy

Users installing and using Forge behind a Proxy can run into issues. Your organizations administrator might be able to resolve this issue by doing the following: 

1. Whitelisting the following IP addresses:

        simplifier.net 		IP 40.68.205.178
        downloads.simplifier.net 	IP 40.114.243.70 

2. Allow applications using port 443 (https)
3. Your administrator should allow your Proxy to support Websocket.

Additionally some users found that they had to do one extra switch to the local users’ IE proxy settings. Although “Bypass proxy server for local addresses” was checked, entering the IP address and/or domain name (whichever the local users are using) into the proxy exceptions list fixed the problem.