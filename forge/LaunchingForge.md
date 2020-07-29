Launching Forge
===============

Start Menu
----------

The easiest way to launch Forge is via the start menu shortcut that the
ClickOnce installer creates during the installation. Alternatively, open
the start menu and search for *\"Forge\"*. Windows should locate and
display the shortcut to the application. You can manually pin the
shortcut to the start menu or the taskbar for your convenience.

Command line
------------

You can also start Forge from the command line. This allows you to
launch Forge programmatically, from other applications. You can start
the application from code in different ways:

1.  Directly, via the main executable

First, you need to determine the installation folder that contains the
main executable `Forge.exe`. Unfortunately, the ClickOnce installer
deploys the application to a personalized AppData subfolder that is
hard to find. The Forge Options menu provides a command *Open
application folder* that helps you find the location of the ClickOnce
installation folder that contains the main executable.

2.  Indirectly, via the start menu shortcut

You can also launch the start menu `.appref-ms` shortcut created by
the ClickOnce installer from code. The start menu shortcut is always
created in a fixed location with the following path:

    %APPDATA%\Microsoft\Windows\Start Menu\Programs\Firely\Firely FHIR Tools\Forge for HL7 FHIR STU3.appref-ms

Alternatively, you can create or generate an `.appref-ms` shortcut in
a well-known location. The shortcut is a single-line text file with
the following contents:

    http://downloads.simplifier.net/forge/stu3/Forge.application#Forge.application, Culture=neutral, PublicKeyToken=d35f0fdbb3d5e195, processorArchitecture=msil

Command line arguments
----------------------

The main Forge executable accepts command line arguments. You can
specify one or more documents to open: :

    Forge.exe [filePath] [filePath] [...]

The specified arguments must be fully qualified absolute file paths.
After startup, Forge will try to load all the specified files, if they
exist.

If you launch Forge indirectly via the `.appref-ms` shortcut, then you
can also specify a single (!) command line argument. For example: :

    "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Firely\Firely FHIR Tools\Forge for HL7 FHIR STU3.appref-ms" "C:\Profiles\MyPatient.xml"

Unlike the main executable, the `.appref-ms` shortcut does not accept
multiple command line arguments. This is a limitation of the ClickOnce
installer technology.
