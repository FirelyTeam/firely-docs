.. _simplifier_vonk:

Use Firely Server with your Simplifier artifacts
===================================================

If you have defined some profiles, valuesets and examples in your Simplifier project, you may want to setup a FHIR Server for you or others to test against.
We have tried to make that extremely simple for you, using Firely Server FHIR Server. Here is how:

Currently we only enabled this for Windows 10, using PowerShell. Later we will add support for Linux and/or MacOS.

#. Install `Docker for Windows <https://www.docker.com/get-docker>`_
#. Start it.
#. Open its settings (right click on the docker icon in the system tray and click 'Settings')
#. Under shared drives, share your local drive.
   
   .. image:: ./images/YellowButton_ShareDrive.png 

#. Now in Simplifier, go to the project page of your project, drop down the Download button and click 'demo FHIR Server'

   .. image:: ./images/YellowButton_DownloadFHIRServer.png 

#. This takes you to the 'Demo Project FHIR Server' page.
#. Click the 'Download' button

   .. image:: ./images/YellowButton_DownloadZip.png

#. Unzip the downloaded file. For this explanation we choose to unzip to ``c:\programs\demo-VonkDockerServer``
#. Open a PowerShell window
#. Since we have not (yet) signed the Powershell script that will start the server, you need to temporarily allow execution of downloaded scripts::

      Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process

#. Navigate to the directory where you unzipped the download.
#. Then run the script .\\start-vonk-server.ps1

   .. image:: ./images/YellowButton_RunStart.png

#. The script will:

   * pull the neccessary images from the Docker hub (vonk-web and vonk-mongo-db)
   * start the containers
   * import conformance resources from the specification AND your Simplifier project
   * import the examples from your Simplifier project

   This will take a couple of minutes. Subsequent startups will be a lot faster though.

   .. attention:: Docker and PowerShell are not perfect friends, and Docker may show some 'NativeCommandError' messages. You can ignore those.

#. You can use the .\stop-vonk-server.ps1 script to stop Firely Server again.