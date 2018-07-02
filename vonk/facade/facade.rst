.. _vonk_facade:

Vonk FHIR Facade
================

Vonk FHIR Facade is a means to use the Vonk implementation of the FHIR RESTful API on top of an existing repository.
This repository may be a relational database, a nosql database or even another web api.

Setup
-----

There are two ways to set up a Vonk FHIR Facade. By creating your own ASP.NET Core Web Application and utilizing Vonk NuGet packages, or by just creating a library with services and providing that as a plugin to Vonk.

Create your own server
^^^^^^^^^^^^^^^^^^^^^^

In this setup you:
- create a new ASP.NET Core Web Application
- include Vonk NuGet packages
- setup the neccessary Vonk services (usually a subset of the services that Vonk FHIR Server uses)
- implement your own repository

This also allows you to include the Vonk components into a web application of your own that may offer more interfaces than just the FHIR RESTful API.

The Exercise below uses this setup.

Provide a plugin to Vonk FHIR Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This leverages the capabilities of :ref:`vonk_components`. With this setup you:
- create a new ASP.NET Core library
- include Vonk NuGet packages
- implement your own repository
- configure the PipelineOptions to use your library instead of Vonk's own repository
- configure the PipelineOptions to limit the components to those that are supported by your repository implementation.

As warned for in :ref:`vonk_components`, it is still very early in its development cycle. Therefore examples of this setup will be added at a later stage. 

Exercise
--------

The best way to get experience in developing a Vonk FHIR Facade is by following the :ref:`exercise<facadestart>`. This exercise builds a facade on a simple relational database.
