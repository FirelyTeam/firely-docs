.. _iis:

====================
Deploy Vonk on IIS
====================

Prerequisites
-------------

1. The following operating systems are supported: Windows 7 or Windows Server 2008 R2 and later   

2. Have IIS windows feature turned on on the hosting machine. 
   You can do this in **Control Panel** -> **Programs and Features** -> **Turn Windows features on or off** .
   You need to check **Internet Information Services** -> **Web Management Tools** -> **IIS Management Console** 
   and **Internet Information Services** -> **World Wide Web Services** to accept the default features or customize IIS to fit your needs.
  
  .. image:: ../../images/iis_turn_windows_features_on.PNG
    :align: center   

3. Choose a solution to deploy/move the application to the hosting system. 
   Multiple alternative exist like Web Deploy, Xcopy, Robocopy or Powershell. 
   One popular choice is using Web Deploy in Visual Studio. For using that you will need to install 
   Web Deploy on the hosting system. To install Web Deploy, you can use the Web Platform Installer 
   (https://www.microsoft.com/web/downloads/platform.aspx).

4. Install the .NET Core Windows Server Hosting bundle on the hosting system. After installing it, you may need to do a “net stop was /y” and “net start w3svc” to ensure all the changes are picked up for IIS. The bundle installs the .NET Core Runtime, .NET Core Library, and the ASP.NET Core Module. ASP.NET Core Module (ANCM) allows you to run ASP.NET Core applictions using Kestrel behind IIS. For more information about ANCM check https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/aspnet-core-module

5. Prepare binaries. You can either download the binaries for Vonk (see :ref:`getting_started`), or creating your own solution by building a facade.
   If you are deploying a Vonk facade, take the additional following prerequisites into consideration:
   
   - Make sure you use the **IISIntegration NuGet** package. You can install this as part of one of the metapackages (``Microsoft.AspNetCore`` and ``Microsoft.AspNetCore.All``) or independently  ``Microsoft.AspNetCore.Server.IISIntegration``. This is needed for the interoperability between Kestrel and ANCM.

   - Provide a *web.config* file for configuring the ANCM module or make sure the selected deploy options generates one for you. Using **dotnet publish** or **Visual studio publish** would generate a *web.config* for you. Check https://docs.microsoft.com/en-us/aspnet/core/hosting/aspnet-core-module for guidance on configuring the ANCM.


Create Website in IIS
----------------------

1. Publish the application to a location on the host server, using the solution selected in the Prerequisites step 3.

2. In IIS Manager create a new website or a new application under existing IIS site. Fill the **Site name**, the **Binding** and link the **Physical path** to the folder created in the previous step, similar to the picture below. The bindings defined in IIS override any bindings set in the application  by calling either Listen or UseUrls. 

.. image:: ../../images/iis_create_website.PNG
  :align: center

3. Edit the application pool to set the **.NET CLR VERSION** to **NO Managed Code**, similar to the picture below (we use  IIS as a reverse proxy, so it isn’t actually executing any .NET code). To edit the application pool, go to the **Application Pools** panel, right-click the website's app pool and select **Basic Settings...** from the popup menu.

.. image:: ../../images/iis_edit_application_pool.PNG
  :align: center


Configuration
-------------
- You can use *web.config* to configure ASP.NET Core Module and IIS using the  <system.webServer> section. 
  Read more about configuring ANCM at https://docs.microsoft.com/en-us/aspnet/core/hosting/aspnet-core-module.

- You can configure the Vonk server using the appsettings.json file (see :ref:`configure_vonk`).

- If you are building a Vonk facade, you can use IISOptions to configure IISIntegration service options. You can read more about IISOptions at
  https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.builder.iisoptions?view=aspnetcore-2.0.

::

  services.Configure<IISOptions>(options => 
  {
      ...
  });

