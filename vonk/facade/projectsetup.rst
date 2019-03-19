.. _project_setup:

Starting your project
---------------------

In this step, you will create and set up your project to start building the facade.

Create new project
^^^^^^^^^^^^^^^^^^

#. Open Visual Studio 2017
#. File | New | Project

   * Choose Class Library (.NET Core)
   * Project name and directory at your liking; Click OK


Add Vonk Components
^^^^^^^^^^^^^^^^^^^

1. Tools > NuGet Package Manager > Package Manager Console

   * Run ``Install-Package Vonk.Core``
   * Run ``Install-Package Vonk.Fhir.R3``

.. note:: You can install the latest beta release of the Vonk packages by adding ``-IncludePrerelease`` to the install command.
