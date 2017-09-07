Using MongoDB
^^^^^^^^^^^^^
We assume you already have MongoDB installed. If not, please refer to the `MongoDB download <https://www.mongodb.com/download-center>`_ pages.

* Navigate to your Vonk working directory
* In a text editor open :code:`appsettings.json` to find the ``Repository`` setting::

	"Repository": "Memory",

* Change the setting to ``MongoDB``

* If you have your own database in MongoDB already, change the ``MongoDbOptions`` to reflect your settings::

   "MongoDbOptions": {
       "ConnectionString": "mongodb://localhost/vonkstu3",
       "EntryCollection": "vonkentries",
       "SimulateTransactions": "false"
   },

* If MongoDB does not have a database and/or collection by this name, Vonk will create it for you.

* You can set SimulateTransactions to "true" if you want to experiment with `FHIR transactions <https://www.hl7.org/fhir/http.html#transaction>`_.
  MongoDB does not support real transactions across documents, so in case of an error already processed entries will NOT be rolled back. 

Using MongoDB for the Administration API database
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This works the same as with the normal Vonk database, except that you:

*   put the settings within the ``Administration`` section

*   provide a different ConnectionString and/or EntryCollection

E.g.::

   "Administration": {
       "MongoDbOptions": {
           "ConnectionString": "mongodb://localhost/vonkstu3",
           "EntryCollection": "vonkadmin",
           "SimulateTransactions": "false"
       }
   }
