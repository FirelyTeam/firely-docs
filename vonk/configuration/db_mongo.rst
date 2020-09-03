.. |br| raw:: html

   <br />

.. _configure_mongodb:

Using MongoDB
=============
We assume you already have MongoDB installed. If not, please refer to the `MongoDB download <https://www.mongodb.com/download-center>`_ pages.

Vonk can work with MongoDb 4.0 and higher. Since Vonk version 3.7.0 Vonk uses the MongoDb Aggregation Framework heavily, and you are advised to upgrade to MongoDb 4.4 (or newer). 
In this version issue `SERVER-7568 <https://jira.mongodb.org/browse/SERVER-7568>` is solved, so the most selective index is used more often. 

* Navigate to your Vonk working directory

* Changing a setting means overriding it as described in :ref:`configure_change_settings`. 

* Find the ``Repository`` setting:	
    
    ``"Repository": "SQLite",``

* Change the setting to ``MongoDb``

* If you have your own database in MongoDB already, change the ``MongoDbOptions`` to reflect your settings::

   "MongoDbOptions": {
       "ConnectionString": "mongodb://localhost/vonkstu3",
       "EntryCollection": "vonkentries",
       "SimulateTransactions": "false"
   },

* If MongoDB does not have a database and/or collection by this name, Vonk will create it for you.

*   Find the section called ``PipelineOptions``. Make sure it contains the MongoDB repository in the root path for Vonk Data::

        "PipelineOptions" : 
        {
            "Branches" : [
                "/" : { 
                    "Include" : [
                        "Vonk.Repository.MongoDb.MongoDbVonkConfiguration"
                        //...
                    ]
                }
            ]
        }

* You can set SimulateTransactions to "true" if you want to experiment with `FHIR transactions <https://www.hl7.org/fhir/http.html#transaction>`_.
  MongoDB does not support real transactions across documents, so in case of an error already processed entries will NOT be rolled back. 

.. _configure_mongodb_admin:

Using MongoDB for the Administration API database
-------------------------------------------------

Although we encourage you to use :ref:`SQLite for Vonk Administration <sqlite_admin_reasons>`, you can still use MongoDB for Vonk Administration as well.

This works the same as with the normal Vonk database, except that you:

*   put the settings within the ``Administration`` section

*   provide a different ConnectionString and/or EntryCollection, e.g.::

     "Administration": {
         "Repository": "MongoDB",
         "MongoDbOptions": {
             "ConnectionString": "mongodb://localhost/vonkstu3",
             "EntryCollection": "vonkadmin",
             "SimulateTransactions": "false"
         }
     }

*   Find the section called ``PipelineOptions``. Make sure it contains the MongoDB repository in the administration path for Vonk Administration::

        "PipelineOptions" : 
        {
            "Branches" : [
                "/administration" : { 
                    "Include" : [
                        "Vonk.Repository.MongoDb.MongoDbAdministrationConfiguration"
                        //...
                    ]
                }
            ]
        }

.. attention::

    For MongoDb it is essential to retain the ``.vonk-import-history.json`` file. Please read :ref:`vonk_conformance_history` for details.

Tips and hints for using MongoDb for Vonk
-----------------------------------------

#. If searches and/or creates and updates are excessively slow, you may be limited by the IOPS on your MongoDb deployment (e.g. MongoDb Atlas). Try upgrading it and check the timings again.
#. If for any reason you would like to see how Vonk is interacting with MongoDb, make the following adjustments to the :ref:`configure_log`:

    #. In the section ``Serilog.MinimumLevel.Override`` add ``"Vonk.Repository.DocumentDb": "Verbose"``. Add it before any broader namespaces like ``Vonk``.
    #. In the section on the File sink, change the ``restrictedToMinimumLevel`` to ``Verbose``.

