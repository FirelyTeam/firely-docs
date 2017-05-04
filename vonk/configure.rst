.. _configure:

===========================
Configuring the Vonk server
===========================

In this section we assume you have downloaded and installed the Vonk binaries, and have obtained a license file.
If not, please see the :ref:`previous section <getting-started>` and follow the steps there first.

The steps you followed to get started will provide you with a basic Vonk server,
that runs on a standard port and keeps the data in memory.

If you need to adjust the port, or want to use a MongoDB or SQL database, you can
configure Vonk by adjusting the :code:`hosting.json` and :code:`appsettings.json` file.
If you want to change the way Vonk logs its information, you can adjust :code:`logsettings.json`.
On this page you can read how to change the settings.


Changing the port number
------------------------
By default Vonk will run on port 4080 of your system. You can change the port setting in the :code:`hosting.json` file that is part
of the Vonk distribution:

*	Navigate to the location where you extracted the Vonk files
*	In a text editor open :code:`bin\hosting.json` to find this setting::

	"urls": "http://*:4080"

*	Change the number to the port number you want


Using a different repository
----------------------------
The default setting for Vonk is to run in memory. You will probably want to change this to use your own database.
You can use either a MongoDB or a SQL server database with Vonk.

Using MongoDB
^^^^^^^^^^^^^
We assume you already have MongoDB installed. If not, please refer to the `MongoDB download <https://www.mongodb.com/download-center>`_ pages.

*	Navigate to your Vonk working directory
*	In a text editor open :code:`bin\appsettings.json` to find the ``Repository`` setting::

	"Repository": "Memory",

*	Change the setting to ``MongoDB``

*	If you have your own database in MongoDB already, change the ``MongoDbOptions`` to reflect your settings::

		"MongoDbOptions": {
			"ConnectionString": "mongodb://localhost/vonkstu3",
			"EntryCollection": "vonkentries"
		},


Using SQL server
^^^^^^^^^^^^^^^^

*	To run Vonk on SQL Server you will need to prepare a database in an existing SQL Server instance. The version must be 2012 or newer, any edition will do.

*	Open SQL Server Management Studio or some other tool to run a SQL script and connect it to your SQL Server instance.

*	From the working directory open :code:`scripts\01-CreateDatabaseAndSchema.sql`

*	In SQL Server Management Studio, in the menu select Query|SQLCMD Mode.

*	In the script adjust the variable :code:`dbName` to your own liking.

*	Run the script. You now have a database with the Vonk schema.

*	In a text editor open :code:`bin\appsettings.json` to find the ``Repository`` setting::

	"Repository": "Memory",

*	Change the setting to ``SQL``

*	For this step you will need to have configured your SQL server. You can use the default names that are already present in the
	file, or you can change the ``SqlDbOptions`` settings to your database settings::

		"SqlDbOptions": {
			"ConnectionString": "Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=VonkStu3;Data Source=(localdb)\\mssqllocaldb",
			"SchemaName": "vonk"
		},


Changing from http to https
---------------------------
If you need your server to run on https instead of http, follow these steps:

*	Navigate to the location where you extracted the Vonk files.
*	Open :code:`bin\appsettings.json` in a text editor and find these settings::

		"UseHttps": "false",
		"CertificateFile": "<your certificate file>.pfx",

*	Change the setting for :code:`UseHttps` from ``false`` to ``true``
*	Set :code:`CertificateFile` to the location of the `.pfx` file that contains the certificate for your site
*	Edit :code:`hosting.json` and change the ``urls`` setting to include https for the port number you want. For example::

		{
		   "urls": "http://*:4080;https://*:5080"
		}


*	Before starting the server, set an environment variabele on your system to contain the password of the `.pfx` file:

	+ In Powershell run:|br| 
	  ``> $env:VONK_certificate_password="my_password"``
	  |br| where `my_password` is the password for the `.pfx` file
	+ or go to your `System`, open the `Advanced system settings` --> `Environment variables` and create a new variable
	  with the name :code:`VONK_certificate_password` and the value set to your password


..
	Configuring log settings
	------------------------

Running the server
------------------

When you have completed your configuration changes, you can run the server.
Open a command prompt or Powershell, navigate to your working directory and run:|br|
:code:`> dotnet .\Vonk.Server.dll`



.. |br| raw:: html

   <br />
