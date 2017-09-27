.. _feature_artifactresolution:

Loading profiles from Simplifier
================================

You can already POST or PUT StructureDefinitions to Vonk in the :ref:`Administration API <administration>` so it can use them for validation.

But if you have several StructureDefinitions in a Simplifier project, you can instruct Vonk to load all of them at startup:
::

  "ArtifactResolutionOptions": {
    "Sets": [
      {
        "Uri": "FHIR endpoint for retrieving StructureDefinitions",
        "UserName": "UserName for retrieving the StructureDefinitions",
        "Password": "Password for the above user name"
      }
    ],
    "BatchSize": 20
  }

* The Uri must point to a Simplifier project endpoint
* The UserName and Password must have access to that project.
* You can load from multiple projects by adding extra Sets.
