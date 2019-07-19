.. _vonk_components_config:

Configure the pipeline
======================

Configuration of the pipeline in Vonk FHIR Server is done with ``PipelineOptions`` in combination with ``SupportedInteractions``. A default setup is installed with Vonk in appsettings.default.json, and it looks like this:
::

  "PipelineOptions": {
    "PluginDirectory": "./plugins",
    "Branches": [
      {
        "Path": "/",
        "Include": [
          "Vonk.Core",
          "Vonk.Fhir.R3",
          "Vonk.Repository.Sql.SqlVonkConfiguration",
          "Vonk.Repository.Sqlite.SqliteVonkConfiguration",
          "Vonk.Repository.MongoDb.MongoDbVonkConfiguration",
          "Vonk.Repository.CosmosDb.CosmosDbVonkConfiguration",
          "Vonk.Repository.Memory.MemoryVonkConfiguration",
          "Vonk.Subscriptions",
          "Vonk.Smart",
          "Vonk.UI.Demo"
        ]
      },
      {
        "Path": "/administration",
        "Include": [
          "Vonk.Core",
          "Vonk.Fhir.R3",
          "Vonk.Repository.Sql.SqlAdministrationConfiguration",
          "Vonk.Repository.Sqlite.SqliteAdministrationConfiguration",
          "Vonk.Repository.MongoDb.MongoDbAdminConfiguration",
          "Vonk.Repository.Memory.MemoryAdministrationConfiguration",
          "Vonk.Core.Operations.Terminology",
          "Vonk.Administration"
        ],
        "Exclude": [
          "Vonk.Core.Operations",
          "Vonk.Core.Licensing.LicenseRequestJobConfiguration"
        ]
      }
    ]
  },
  "SupportedInteractions": {
    "InstanceLevelInteractions": "read, vread, update, delete, history, conditional_delete, conditional_update, $validate, $validate-code, $expand, $compose, $meta, $meta-add",
    "TypeLevelInteractions": "create, search, history, conditional_create, compartment_type_search, $validate, $snapshot, $validate-code, $expand, $lookup, $compose",
    "WholeSystemInteractions": "capabilities, batch, transaction, history, search, compartment_system_search, $validate"
  }

PluginDirectory:
   You can put plugins of your own (or third party) into this directory for Vonk to pick them up, without polluting the Vonk binaries directory itself. The directory in the default setting of ``./plugins`` is not created upon install, you may do this yourself if you want to add a plugin.
PluginDirectory.Branches:
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

SupportedInteractions:
  A comma-separated list of all interactions Vonk should enable on ``[base]/[type]/[id] (InstanceLevelInteractions)``, ``[base]/[type] (TypeLevelInteractions)``, and ``[base] (WholeSystemInteractions)`` levels. Vonk will use this list to enable/disable supported interctions and reflect it in ``/metadata`` accordingly.
  
  If you'd like to limit what operations your Vonk supports, remove them from this list.
  
  If you've added a custom pipeline component that enables a new interaction, make sure to load the plugin (see `PluginDirectory` above) and enable the interaction in this list. For example, if you've added the `Vonk.Plugin.ConvertOperation` $convert plugin in ``PipelineOptions.Branches.Include``, make sure to enable the operation ``$convert`` as well: ::
  
  "WholeSystemInteractions": "$convert, capabilities, batch, transaction, history, search, compartment_system_search, $validate"
