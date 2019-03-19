
Facade setup options
--------------------

There are two ways to set up a Vonk FHIR Facade. By creating a library with services and providing that as a plugin to Vonk, or by creating your own ASP.NET Core Web Application and utilizing Vonk NuGet packages.
The first approach is the most widely used one, and also used in our exercise.

.. important::

  We strongly recommend using the first approach because of its benefits described below, and because we may deprecate the second
  approach in the future.

Provide a plugin to Vonk FHIR Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This leverages the capabilities of :ref:`vonk_components`. With this setup you:

- create a new ASP.NET Core library
- include Vonk NuGet packages
- implement your own repository
- configure the PipelineOptions to use your library instead of Vonk's own repository
- configure the PipelineOptions to limit the components to those that are supported by your repository implementation.

The benefit of using this approach is that you automatically get to use all of Vonk's configuration, logging,
Application Insights integration, the :ref:`Administration API<administration_api>`, etc. described in the other sections
of this documentation.

The :ref:`exercise <facadestart>` below uses this setup.

.. note::

  Although we take care to try and avoid breaking changes, please be prepared to retest and update your plugins when you
  choose to update Vonk.


Create your own server
^^^^^^^^^^^^^^^^^^^^^^

In this setup you:

- create a new ASP.NET Core Web Application
- include Vonk NuGet packages
- set up the necessary Vonk services (usually a subset of the services that Vonk FHIR Server uses)
- implement your own repository

This also allows you to include the Vonk components into a web application of your own that may offer more interfaces than just the FHIR RESTful API.
