.. _vonk_components_config:

Configuration of the pipeline with PipelineOptions
==================================================

Configuration of the pipeline in Vonk FHIR Server is done with the PipelineOptions. A default setup is installed with Vonk in appsettings.default.json, and it looks like this:
::

  "PipelineOptions": {
    "PluginDirectory": "./plugins",
    "Branches": [
      {
        "Path": "/",
        "Include": [
          "Vonk.Core",
          "Vonk.Fhir.R3",
          "Vonk.Repository.Sql",
          "Vonk.Repository.MongoDb",
          "Vonk.Repository.Memory",
          "Vonk.Subscription",
          "Vonk.UI.Demo"
        ],
        "Exclude": [
        ]
      },
      {
        "Path": "/administration",
        "Include": [
          "Vonk.Core.Context",
          "Vonk.Core.Infra",
          "Vonk.Repository.Sql",
          "Vonk.Repository.MongoDb",
          "Vonk.Repository.Memory",
          "Vonk.Core.Operations.Terminology",
          "Vonk.Administration"
        ],
        "Exclude": [
        ]
      }
    ]
  }

PluginDirectory:
   You can put plugins of your own (or third party) into this directory for Vonk to pick them up, without polluting the Vonk binaries directory itself. The directory in the default setting of ./plugins is not created upon install, you may do this yourself if you want to add a plugin.
Branches:
   A web application can branch into different paths, and Vonk has two by default:

   * ``/``: the root branch, where the main :ref:`restful` is hosted;
   * ``/administration``: where the :ref:`administration_api` is hosted.
 
   ``Branches`` contains a subdocument for each of the defined paths:
   
   Path
      The path for this branch. This is the part after the base URL that Vonk is hosted on.
   Include
      (Prefixes of) :ref:`vonk_components_configclass` that add services and middleware to Vonk.
   Exclude
      (Prefixes of) :ref:`vonk_components_configclass` that may not be executed. ``Exclude`` overrides ``Include`` and is useful if you want to use all but one configuration class from a namespace.

