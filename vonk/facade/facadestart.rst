.. _facadestart:

=======================
Build your first Facade
=======================

In this exercise you will use Vonk FHIR Facade libraries to build an ASP.NET Core Web API implementing a FHIR RESTful API on top of an existing database.

The existing database contains two simple tables 'Patient' and 'BloodPressure'. In the exercise we refer to it as the 'ViSi' system, short for 'VitalSigns'.

.. toctree::
   :maxdepth: 2
   :hidden:

   prepare
   projectsetup
   databasemodel
   enablesearch_1
   Next search step <enablesearch_2>
   Last three search steps <enablesearch_3>
   finalizesearch
   

Prerequisites
=============

* Experience with programming ASP.NET (Core) web applications. If neccessary take a look at the `Fundamentals <https://docs.microsoft.com/en-us/aspnet/core/fundamentals/?tabs=aspnetcore2x>`_.
* Basic understanding of the `FHIR RESTful API <http://www.hl7.org/implement/standards/fhir/http.html>`_ and FHIR servers.
* Git client of your choice
* Visual Studio 2017
   
   #. get a free community edition at https://www.visualstudio.com/downloads/ 
   #. be sure to select the components for C# ASP.NET Core web development

* .NET Core 2.0 SDK, from https://www.microsoft.com/net/download/windows 

   #. this is probably installed along with the latest Visual Studio, but needed if your VS is not up-to-date.

* SQL Server 2012 or newer:

   #. get a free developer or express edition at https://www.microsoft.com/en-us/sql-server/sql-server-downloads
   #. add SQL Server Management Studio from https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms

* Postman, Fiddler or a similar tool to issue http requests and inspect the responses.


