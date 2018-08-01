.. |br| raw:: html

   <br />

.. _configure_mongodb:

Using MongoDB
=============
We assume you already have MongoDB installed. If not, please refer to the `MongoDB download <https://www.mongodb.com/download-center>`_ pages.

* Navigate to your Vonk working directory
* In a text editor open :code:`appsettings.json` to find the ``Repository`` setting::

	"Repository": "SQLite",

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
Although :ref:`deprecated<mongodb_admin_deprecated>`, you can still use MongoDB for Administration Data as well.

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
   
.. _mongodb_admin_deprecated:

MongoDB deprecated as storage for Vonk Administration
-----------------------------------------------------

As of Vonk version 0.7.1, you are encouraged to run Vonk Administration on :ref:`SQLite<configure_sqlite>` and no longer on MongoDB.
Refer to :ref:`sqlite_admin_reasons` for more background.
