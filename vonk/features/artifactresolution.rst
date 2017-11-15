.. _feature_artifactresolution:

Loading profiles from Simplifier
================================

You can already POST or PUT StructureDefinitions to Vonk in the :ref:`administration_api` so it can use them for validation.

But if you have several StructureDefinitions in a Simplifier project, you can tell Vonk where to find them, and then issue the command to actually load them.

Configuration for setting the source of the StructureDefinitions
----------------------------------------------------------------
::

  "ResourceLoaderOptions": {
    "Sets": [
      {
        "Uri": "FHIR endpoint for retrieving StructureDefinitions",
        "UserName": "UserName for retrieving the StructureDefinitions",
        "Password": "Password for the above user name"
      }
    ],
    "BatchSize": 20,
    "LoadAtStartup": false
  }

* The Uri must point to a Simplifier project endpoint
* The UserName and Password must have access to that project.
* You can load from multiple projects by adding extra Sets.

Actually load the StructureDefinitions
--------------------------------------

It is often useful to reload the profiles, e.g. after you have finalized changes in your project.
Therefore you can instruct Vonk to actually load the profiles from the source(s) with a separate command:

::

  POST http(s)://<vonk-endpoint>/administration/importResources

You can also instruct Vonk to load the StructureDefinitions at startup with the settings::

  "ResourceLoaderOptions": {
    "LoadAtStartup": true
  }
