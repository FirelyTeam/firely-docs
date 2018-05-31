.. |br| raw:: html

   <br />

.. _configure_cosmosdb:

Using Microsoft Azure CosmosDB
==============================
You can connect Vonk to CosmosDB the same way you connect to MongoDB. There are few limitations that we will work out later. They are listed below.

1. Create a CosmosDB account on Azure, see the `Quickstart Tutorial <https://docs.microsoft.com/en-us/azure/cosmos-db/>`_
2. Make sure you choose the MongoDB API
3. In the Azure Portal, open your CosmosDB account and go to the 'Connection Strings' blade. Copy the 'Primary Connection String' to your clipboard.

4. Now on your own machine, navigate to your Vonk working directory
5. In a text editor open :code:`appsettings.json` to find the ``Repository`` setting::

	"Repository": "Memory",

6. Change the setting to ``MongoDB`` (Yes, we have no separate setting yet for CosmosDB - that might change in the future)

7. If you have your own database in CosmosDB already, change the ``MongoDbOptions`` to reflect your settings::

        "MongoDbOptions": {
            "ConnectionString": "<see below>",
            "EntryCollection": "vonkentries",
            "SimulateTransactions": "false"
        },

   Paste the ConnectionString from step 3, and add the databasename that you want to use. The connectionstring looks like this::

      mongodb://<accountname>:<somerandomstring>==@<accountname>.documents.azure.com:10255?ssl=true&replicaSet=globaldb

   You can add the databasename after the portnumber, like this::

      mongodb://<accountname>:<somerandomstring>==@<accountname>.documents.azure.com:10255/vonk?ssl=true&replicaSet=globaldb

8. If your CosmosDB account does not have a database or collection by this name, Vonk will create it for you.

9. You can set SimulateTransactions to "true" if you want to experiment with `FHIR transactions <https://www.hl7.org/fhir/http.html#transaction>`_.
   Vonk does not utilize the CosmosDB way of supporting real transactions across documents, so in case of an error already processed entries will NOT be rolled back. 

.. _configure_cosmosdb_admin:

Using CosmosDB for the Administration API database
--------------------------------------------------
This works the same as with the normal Vonk database, except that you:

*   put the settings within the ``Administration`` section

*   provide a different database name in the ConnectionString and/or a different EntryCollection

E.g.::

   "Administration": {
	   "Repository": "MongoDB",
       "MongoDbOptions": {
           "ConnectionString": "<as in step 7>",
           "EntryCollection": "vonkadmin",
           "SimulateTransactions": "false"
       }
   }

.. _configure_cosmosdb_limitations:

CosmosDB Request Units
----------------------

If you upload a lot of data in a short time (as is done on :ref:`initial import of conformance resources <conformance_fromdisk>`), you quickly exceed the default maximum of 1000 Request Units / second.
You are advised to raise the limit to at least 5000 RU/s. See the `Microsoft documentation <https://docs.microsoft.com/en-us/azure/cosmos-db/set-throughput#provision-throughput-by-using-azure-portal>`_ for instructions.

Limitations
-----------

#. MongoDB implementation will try to remove indexes that Vonk no longer uses. But CosmosDB manages it's own indexes and will not allow removal of indexes. This leads to warnings like these, that you can safely ignore::

    2018-05-24 15:23:01.246 +02:00 [Vonk] [Information] [Machine: <machinename>] [ReqId: ] Dropping 12 unused indexes
    2018-05-24 15:23:01.251 +02:00 [Vonk] [Verbose] [Machine: <machinename>] [ReqId: ] Attempting to drop index with name type_1_res_id_1_ver_1
    2018-05-24 15:23:01.259 +02:00 [Vonk] [Verbose] [Machine: <machinename>] [ReqId: ] "MongoDB" command: "{ \"dropIndexes\" : \"vonkentries\", \"index\" : \"type_1_res_id_1_ver_1\" }"
    2018-05-24 15:23:01.386 +02:00 [Vonk] [Warning] [Machine: <machinename>] [ReqId: ] Could not drop index "type_1_res_id_1_ver_1" because: "Invalid index name: type_1_res_id_1_ver_1" - ERROR CODE: 9

#. Request size for insertions to CosmosDB is limited to around 5 MB. Some bundles in the examples from the specification exceed that limit. Then you will get an error stating 'Request size too large'.
#. :ref:`Reindexing<feature_customsp_reindex>` does not work, since CosmosDB does not support one of the MongoDB operations we use for it.
