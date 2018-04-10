.. _azure_webapp:

Vonk deployment on Azure Web App Service
========================================

In this section we explain how you can deploy Vonk in the Azure cloud. 

Getting started
---------------

Before you can run Vonk, you will need to download the Vonk binaries and request a license:

	1. Go to the Simplifier website, login and download the Vonk binaries from https://simplifier.net/vonk/download
	2. Also download from the same location the license file.
 
Futhermore you need an Azure subscription and a FTP client.

Deployment
----------

#. Go to Azure (https://portal.azure.com)  and create a web app:

   .. image:: ../images/Azure_01_CreateWebApp.PNG
      :align: center

#. Choose a name for the webapp, here we chose vonkserver. Fill in an existing resource group or create a new one and select Windows for the operation system (OS):

   .. image:: ../images/Azure_02_ChooseName.PNG
      :align: center

#. Go to the section Deployment credentials and create a new username and password:

   .. image:: ../images/Azure_03_Credentials.PNG
      :align: center

#. Open a webbrowser and navigate to https://<webapp>.scm.azurewebsites.net/ZipDeploy and drag vonk_distribution.zip in the browser. 
   This will install the Vonk server as a Web App in Azure.
   In our example the url is https://vonkserver.scm.azurewebsites.net/ZipDeploy
#. Open an FTP client and connect to the ftp server with the credentials you created in step 3. The address of the ftp server can be found on the property page of the Web app.
#. Upload the license file (vonk-trial-license.json) to site/wwwroot. Close the ftp connection.
#. Restart the Web App in Azure
#. Open a browser and go to the site https://vonkserver.azurewebsites.net/ . This will show the Vonk home page.

Change database
---------------

In this example Vonk is using a memory repository. If you want to change it to another kind of repository then you could change that on the page Application Settings of the Web App. Here you can set :ref:`Environment Variables<configure_envvar>` 
with the settings for either :ref:`SQL Server<configure_sql>` or :ref:`MongoDB<configure_mongodb>`. For example for MongoDB it will look like this:

.. image:: ../images/Azure_04_Settings.PNG
   :align: center
