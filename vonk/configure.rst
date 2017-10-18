:orphan:


.. |br| raw:: html

   <br />

.. _configure_old:

Configuring the Vonk server
===========================

In this section we assume you have downloaded and installed the Vonk binaries, and have obtained a license file.
If not, please see the :ref:`previous section <getting-started>` and follow the steps there first.

The steps you followed to get started will provide you with a basic Vonk server,
that runs on a standard port and keeps the data in memory.

If you need to adjust the port, or want to use a MongoDB or SQL database, you can
configure Vonk by adjusting the :code:`appsettings.json` file.
If you want to change the way Vonk logs its information, you can adjust :code:`logsettings.json`.
On this page you can read how to change the settings.

Changing the port number
------------------------

By default Vonk will run on port 4080 of your system. You can change the port setting in the :code:`appsettings.json` file that is part
of the Vonk distribution:

*	Navigate to your Vonk working directory
*	In a text editor open :code:`appsettings.json` to find this setting:
	::

		"Hosting": {
			"HttpPort": 4080
		}

*	Change the number to the port number you want


Changing from http to https
---------------------------

If you need your server to run on https instead of http, follow these steps:

*	Navigate to the location where you extracted the Vonk files.
*	Open :code:`appsettings.json` in a text editor and find these settings:

    ::

		"Hosting": {
			"HttpPort": 4080,
			"HttpsPort": 4081, // Enable this to use https
			"CertificateFile": "<your-certificate-file>.pfx", //Relevant when HttpsPort is present
			"CertificatePassword" : "<cert-pass>" // Relevant when HttpsPort is present
		},

*	Uncomment the lines for :code:`HttpsPort`, :code:`CertificateFile` and :code:`CertificatePassword`.
*	Set the :code:`HttpsPort` to the port of your liking (standard https port is 443)
*	Set :code:`CertificateFile` to the location of the `.pfx` file that contains the certificate for your site
*	Set :code:`CertificatePassword` to the password for the certificate file.
	NOTE: We recommend setting this value as an environment variable for security reasons::
	
		VONK_Hosting:CertificatePassword=<password>

	To set this:

	+ In Powershell run:|br| 
	  ``> $env:VONK_Hosting:CertificatePassword="my_password"``
	  |br| where `my_password` is the password for the `.pfx` file
	+ or go to your `System`, open the `Advanced system settings` --> `Environment variables` and create a new variable
	  with the name :code:`VONK_Hosting:CertificatePassword` and the value set to your password


Using a different repository
----------------------------

The default setting for Vonk is to run in memory. You will probably want to change this to use your own database.
You can use either a MongoDB or a SQL server database with Vonk.

.. include:: ./configuration/db_mongo.rst

.. include:: ./configuration/db_sql.rst

.. include:: ./configuration/logsettings.rst

.. include:: ./features/customsearchparameters.rst

Using Environment variables
---------------------------
All the settings in ``appsettings.json`` can be overridden by environment variables on your OS.
This can be useful if you want to deploy Vonk to several machines, each having their own settings for certain options.
Or if you don't want  a database password in the ``appsettings.json`` file.

The format for the environment variables is:

appsettings.json::

	"Repository" : "SQL"

environment variable::

	VONK_Repository = SQL

If the configuration value is embedded in a json document you can use the ``:`` separator.

appsettings.json::

	"Administration" : {
		"SqlDbOptions" : {
			"ConnectionString" : "<some connectionstring>"
		}
	}

environment variable::

	VONK_Repository:SqlDbOptions:ConnectionString = <some connectionstring>

.. include:: ./features/prevalidation.rst

Running the server
------------------

When you have completed your configuration changes, you can run the server.
Open a command prompt or Powershell, navigate to your working directory and run:|br|
:code:`> dotnet .\Vonk.Server.dll`



