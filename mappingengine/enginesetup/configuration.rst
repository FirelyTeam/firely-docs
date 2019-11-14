.. _configure_mapping_engine:

Configuring FHIR Mapper on Vonk
======================================

To configure the FHIR Mapper in your Vonk installation, follow the steps below. If you don't have a copy yet, `get in touch <https://fire.ly/contact/>`_ with us if you're interested in purchasing it for your needs.

Load the plugin
~~~~~~~~~~~~~~~

1. Ensure the ``/plugins`` directory exists in your Vonk installation.

   1.1. The location of this folder is customisable via the ``PluginDirectory`` property, so if you chose a different directory, ensure it exists instead.

2. Place the all of the received DLL's into the plugins directory:

  - Hl7.Fhir.Language.dll
  - Hl7.Fhir.Mapping.dll
  - Hl7.Fhir.Mapping.STU3.Poco.dll
  - Superpower.dll
  - Vonk.Plugin.BinaryWrapper.dll
  - Vonk.Plugin.MappingToStructureMap.dll
  - Vonk.Plugin.TransformOperation.dll

3. Configure the :ref:`configure_appsettings` and add ``$convert`` to ``WholeSystemInteractions`` to declare support for the `convert <http://hl7.org/fhir/resource-operation-convert.html>`_ operation.

4. Similarly, add ``$transform`` to ``InstanceLevelInteractions`` to declare support for the `transform <http://hl7.org/fhir/structuremap-operation-transform.html>`_ operation. Sample configuration: ::

    "SupportedInteractions": {
      "InstanceLevelInteractions": "read, vread, update, delete, history, conditional_delete, conditional_update, $validate, $validate-code, $expand, $compose, $meta, $meta-add, $transform",
      "TypeLevelInteractions": "create, search, history, conditional_create, compartment_type_search, $validate, $snapshot, $validate-code, $expand, $lookup, $compose",
      "WholeSystemInteractions": "capabilities, batch, transaction, history, search, compartment_system_search, $validate, $convert"
    },

5. Update the ``/`` path of ``PipelineOptions`` to load the mapping engine plugin by including the following namespaces: ::

    "Vonk.Plugin.BinaryWrapper", "Vonk.Plugin.MappingToStructureMap", 
    "Vonk.Plugin.TransformOperation"

Sample configuration: ::

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
            "Vonk.UI.Demo",
            "Vonk.Plugin.BinaryWrapper",
            "Vonk.Plugin.MappingToStructureMap",
            "Vonk.Plugin.TransformOperation"
          ]
        },

6. Start Vonk :)

Verifying
~~~~~~~~~

To verify that the mapping engine is loaded, do check the metadata with ``http(s)://<vonk-endpoint>/metadata``. If it mentions this in the response ::

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

If the verification didn't work for some reason, check the Vonk logs for the following:

1. In the ``Looking for Configuration in these assemblies`` section, ensure the dll's are loaded: ::

    <path to vonk>/plugins/Hl7.Fhir.Language.dll
    <path to vonk>/plugins/Superpower.dll
    <path to vonk>/plugins/Vonk.Plugin.TransformOperation.dll
    <path to vonk>/plugins/Vonk.Plugin.BinaryWrapper.dll
    <path to vonk>/plugins/Vonk.Plugin.MappingToStructureMap.dll
    <path to vonk>/plugins/Hl7.Fhir.Mapping.STU3.Poco.dll
    <path to vonk>/plugins/Hl7.Fhir.Mapping.dll

If they're not listed, check that the dll files are available in your ``PluginDirectory`` directory (``./plugins`` by default). 
    
2. Ensure the plugins are being registered with the Vonk pipeline: ::

    Configuration:
    /
        [...]
        MappingToStructureMapConfiguration [4550] | Services: V | Pipeline: V
        TransfromOperationConfiguration    [4560] | Services: V | Pipeline: V

If they're not listed, double-check your that your ``PipelineOptions`` are loading the engine plugins.
