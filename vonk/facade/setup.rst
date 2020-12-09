
Facade setup options
--------------------

There are two ways to set up a Firely Server FHIR Facade. By creating a library with services and providing that as a plugin to Firely Server, or by creating your own ASP.NET Core Web Application and utilizing Firely Server NuGet packages.
The first approach is the most widely used one, and also used in our exercise.

.. important::

  We strongly recommend using the first approach because of its benefits described below, and because we may deprecate the second
  approach in the future.

Provide a plugin to Firely Server FHIR Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This leverages the capabilities of :ref:`vonk_plugins`. With this setup you:

- create a new ASP.NET Core library
- include Firely Server NuGet packages
- implement your own repository backend to interface with your data store (can be SQL server or any other medium)
- configure the PipelineOptions to use your library instead of Firely Server's own repository implementation
- configure the PipelineOptions to limit the plugins to those that are supported by your repository implementation.

The benefit of using this approach is that you automatically get to use all of Firely Server's configuration, logging,
Application Insights integration, the :ref:`Administration API<administration_api>`, etc. described in the other sections
of this documentation.

The :ref:`exercise <facadestart>` below uses this setup.

.. note::

  Although we take care to try and avoid breaking changes, please be prepared to retest and update your plugins when you
  choose to update Firely Server.


Create your own server
^^^^^^^^^^^^^^^^^^^^^^

In this setup you:

- create a new ASP.NET Core Web Application
- include Firely Server NuGet packages
- set up the necessary Firely Server services (usually a subset of the services that Firely Server FHIR Server uses)
- implement your own repository backend

This also allows you to include the Firely Server plugins into a web application of your own that may offer more interfaces than just the FHIR RESTful API.
