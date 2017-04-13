Spark is one of the publically available test servers for FHIR. You can download the source code
and install Spark on your own machine. This documentation describes how to do that.

===============
Getting Started
===============

Get started by downloading the `source code <https://github.com/furore-fhir/spark>`_ for the Spark server.
Follow the steps below to install Spark on your machine.

Then,

* Install the .Net 4.6 framework.

* Install .Net 4.6 Target Package  <-- this is different than the .Net 4.6 framework. 

* unzip and load Spark.sln from the main project directory into VS.

* Do NOT manually NuGet anything

* Build the Spark Solution as is which pulls in the packages.


Mongo DB setup
--------------

Spark uses Mongo DB as its database, so you will need to download and install that:

* Download and install Mongo DB Version 3

* Create a directory on ``C:`` drive as ``C:\data\db``

* in a command prompt go to the ``Mongodb\bin`` directory and type ``mongod.exe``. 
  Leave this window running, or create a service to run Mongo on startup.

Initializing the database
-------------------------

You can populate the database with example resources by running Spark and entering the following URL in your
browser, using the port number your instance of Spark runs on::

	localhost:49911/Maintenance/Initialize
	
 

