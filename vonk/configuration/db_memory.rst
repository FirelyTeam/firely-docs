.. _configure_memory:

Using the In-Memory storage
===========================

* Navigate to your Vonk working directory
* In a text editor open :code:`appsettings.json` to find the ``Repository`` setting::

	"Repository": "Memory",

* If it is not already set to ``Memory``, do so now.

* If you want to run , change the ``MongoDbOptions`` to reflect your settings::

* If MongoDB does not have a database and/or collection by this name, Vonk will create it for you.

* You can set SimulateTransactions to "true" if you want to experiment with `FHIR transactions <https://www.hl7.org/fhir/http.html#transaction>`_.
  The In-Memory implementation does not support real transactions, so in case of an error already processed entries will NOT be rolled back::

   "MemoryOptions": {
       "SimulateTransactions": "true"
   },


.. _configure_memory_admin:

Using the In-Memory storage for the Administration API database
---------------------------------------------------------------
This works the same as with the normal Vonk database, except that you put the settings within the ``Administration`` section

E.g.::

   "Administration": {
       "Repository": "Memory",
       "MemoryOptions": {
           "SimulateTransactions": "false"
       }
   }
