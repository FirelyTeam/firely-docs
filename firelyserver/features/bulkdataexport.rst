.. _feature_bulkdataexport:

Bulk Data Export
================

Firely Server provides the option to export resources with the Bulk Data Export Service. 
The Bulk Data Export Service enables the $export operation from the Fhir specification. Read more about the `$export request flow <https://hl7.org/fhir/uv/bulkdata/export/index.html#request-flow>`_

Appsettings
-----------
To start using the Bulk Data Export Service (BDE) you will first have to add the plugin to the PipelineOptions in the appsettings.

.. code-block:: JavaScript

 "PipelineOptions": {
    "PluginDirectory": "./plugins",
    "Branches": [
      {
        "Path": "/",
        "Include": [
          "Vonk.Core",
          "Vonk.Fhir.R3",
          "Vonk.Fhir.R4",
          //"Vonk.Fhir.R5",
          "Vonk.Repository.Sql.SqlVonkConfiguration",
          "Vonk.Repository.Sqlite.SqliteVonkConfiguration",
          "Vonk.Repository.MongoDb.MongoDbVonkConfiguration",
          "Vonk.Repository.CosmosDb.CosmosDbVonkConfiguration",
          "Vonk.Repository.Memory.MemoryVonkConfiguration",
          "Vonk.Subscriptions",
          "Vonk.Smart",
          "Vonk.UI.Demo",
          "Vonk.Plugin.DocumentOperation.DocumentOperationConfiguration",
          "Vonk.Plugin.ConvertOperation.ConvertOperationConfiguration",
          "Vonk.Plugin.BinaryWrapper",
          "Vonk.Plugin.Audit",
          "Vonk.Plugins.TerminologyIntegration",
          "Vonk.Plugin.BulkDataExport"
        ],
        "Exclude": [
          "Vonk.Subscriptions.Administration"
        ]
      }, ...etc...

.. note::
    We only implemented BDE for SQL and SQLite. Make sure both the admin and data database are configured for either SQL Server or SQLite.
    
BDE introduces two new parts to the appsettings, namely TaskFileManagement and BulkDataExport.

.. code-block:: JavaScript

  "TaskFileManagement": {
      "StoragePath": "./taskfiles"
    },
    "BulkDataExport": {
      "RepeatPeriod" : 60000 //ms
    },
    
In StoragePath you can configure the folder (in de Vonk directory) where the exported files will be saved to. 

In RepeatPeriod you can configure the frequency (in milliseconds) the Task queue is checked if there are no active tasks.

$export
-------

There are three different levels for which the $export operation can be called:

:system: This will create a system level export task, exporting all resources in the Firely Server database to a .ndjson file per resourcetype.
:url: [firely-server-base]/$export

:Patient: This will create a type level export task, exporting all resources included in the Patient Compartment in the Firely Server database to a .ndjson file per resourcetype.
:url: [firely-server-base]/Patient/$export

:Group: This will create an instance level export task. For each Patient in the Group, the task will export all resources included in the Patient Compartment in the Firely Server database to a .ndjson file per resourcetype.
:url: [firely-server-base]/Group/<group-id>/$export
:note: For now we only support inclusion in a Group through Group.member.

Making a $export request will create a new task in the database with status "Queued". The request should return an absolute $exportstatus URL in the Content-Location header and the OperationOutcome in the body.  

$exportstatus
-------------

The $export request should return the $exportstatus url for your export task. This url can be used to request the current status of the task through a GET request, or to cancel the task through a DELETE request.

$exportfilerequest
------------------
