.. _configure_mapping_engine:

Configuring FHIR Mapper on Firely Server
========================================

To configure the FHIR Mapper in your Firely Server installation, follow the steps below. If you don't have a copy yet, `get in touch <https://fire.ly/contact/>`_ with us if you're interested in purchasing it for your needs.

Load the engine
~~~~~~~~~~~~~~~

1. Ensure the ``/plugins`` directory exists in your Firely Server installation.

   1.1. The location of this folder is customisable via the ``PluginDirectory`` property, so if you chose a different directory, ensure it exists instead.

2. Verify that all required DLLs can be found in the plugin directory:

  - <path to firely server>/plugins/vonk.plugin.mapping/<version>/Hl7.Fhir.Language.dll
  - <path to firely server>/plugins/vonk.plugin.mapping/<version>/Hl7.Fhir.Mapping.dll
  - <path to firely server>/plugins/vonk.plugin.mapping/<version>/Hl7.Fhir.Mapping.STU3.Poco.dll
  - <path to firely server>/plugins/vonk.plugin.mapping/<version>/Hl7.Fhir.Mapping.R4.Poco.dll
  - <path to firely server>/plugins/vonk.plugin.mapping/<version>/Superpower.dll
  - <path to firely server>/plugins/vonk.plugin.mapping/<version>/Vonk.Plugin.Mapping.dll
  - <path to firely server>/plugins/vonk.plugin.binarywrapper/<version>/Vonk.Plugin.BinaryWrapper.dll

3. Configure the :ref:`configure_appsettings` and check that ``$convert`` is added as a``WholeSystemInteractions`` to support the `convert <http://hl7.org/fhir/resource-operation-convert.html>`_ operation.

4. ``text/fhir-mapping`` must be added as a MIME type to the ``Vonk.Plugin.BinaryWrapper`` settings. Please add it as a new value to the ``RestrictToMimeTypes`` array.
 
5. Similarly, add ``$transform`` to ``InstanceLevelInteractions`` and ``TypeLevelInteractions`` to declare support for the `transform <http://hl7.org/fhir/structuremap-operation-transform.html>`_ operation. Sample configuration: ::

    "SupportedInteractions": {
      "InstanceLevelInteractions": "read, vread, update, patch, delete, history, conditional_delete, conditional_update, $validate, $validate-code, $expand, $compose, $meta, $meta-add, $transform",
      "TypeLevelInteractions": "create, search, history, conditional_create, compartment_type_search, $validate, $snapshot, $validate-code, $expand, $lookup, $compose, $transform",
      "WholeSystemInteractions": "capabilities, batch, transaction, history, search, compartment_system_search, $validate, $convert"
    },

6. Review the ``/administration`` path of ``PipelineOptions`` and make sure that the mapping engine plugin are included using the following namespaces: ::

    "Vonk.Plugin.BinaryWrapper", 
    "Vonk.Plugin.Mapping"

Sample configuration: ::

    "PipelineOptions": {
      "PluginDirectory": "./plugins",
      "Branches": [
        {
          "Path": "/administration",
          "Include": [
            "Vonk.Core",
            "Vonk.Fhir.R3",
            "Vonk.Fhir.R4",
            //"Vonk.Fhir.R5",
            "Vonk.Repository.Sql.SqlAdministrationConfiguration",
            "Vonk.Repository.Sqlite.SqliteAdministrationConfiguration",
            "Vonk.Repository.MongoDb.MongoDbAdminConfiguration",
            "Vonk.Repository.Memory.MemoryAdministrationConfiguration",
            "Vonk.Subscriptions.Administration",
            "Vonk.Plugins.Terminology",         
            "Vonk.Administration",
            "Vonk.Plugin.BinaryWrapper",
            "Vonk.Plugin.Mapping"
          ],
        },

6. Start Firely Server :)

Verifying
~~~~~~~~~

To verify that the mapping engine is loaded, do check the metadata with ``http(s)://<firely-server-endpoint>/metadata``. If it mentions this in the response: ::

 {
   "name": "transform",
   "definition": {
     "reference": "http://hl7.org/fhir/OperationDefinition/StructureMap-transform"
    }
  }

That means the plugin is loaded and working.

(alternatively, run ``curl -s http://localhost:4080/metadata | jq ".rest[].operation[] | select (.name == \"transform\")"``)

Troubleshooting
~~~~~~~~~~~~~~~

If the verification didn't work for some reason, check the Firely Server logs for the following:

1. In the ``Looking for Configuration in these assemblies`` section, ensure the dll's are loaded: ::

   - <path to firely server>/plugins/vonk.plugin.mapping/<version>/Hl7.Fhir.Language.dll
   - <path to firely server>/plugins/vonk.plugin.mapping/<version>/Hl7.Fhir.Mapping.dll
   - <path to firely server>/plugins/vonk.plugin.mapping/<version>/Hl7.Fhir.Mapping.STU3.Poco.dll
   - <path to firely server>/plugins/vonk.plugin.mapping/<version>/Hl7.Fhir.Mapping.R4.Poco.dll
   - <path to firely server>/plugins/vonk.plugin.mapping/<version>/Superpower.dll
   - <path to firely server>/plugins/vonk.plugin.mapping/<version>/Vonk.Plugin.Mapping.dll
   - <path to firely server>/plugins/vonk.plugin.binarywrapper/<version>/Vonk.Plugin.BinaryWrapper.dll

If they're not listed, check that the dll files are available in your ``PluginDirectory`` directory (``./plugins`` by default). 
    
2. Ensure the plugins are being registered with the Firely Server pipeline: ::

    Configuration:
    /administration
        [...]
        BinaryEncodeConfiguration          	[1112] | Services: V | Pipeline: V
	BinaryDecodeConfiguration 		[1122] | Services: V | Pipeline: V
        MappingToStructureMapConfiguration 	[1500] | Services: V | Pipeline: V
        TransfromOperationConfiguration    	[4560] | Services: V | Pipeline: V

If they're not listed, double-check your that your ``PipelineOptions`` are loading the engine plugins.
