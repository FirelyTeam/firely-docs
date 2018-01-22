.. _configure_administration:

Configure the Administration API
================================

This configuration is part of :ref:`configure_appsettings`.

::

  "Administration": {
    "Repository": "Memory", //SQL / MongoDb
    "MongoDbOptions": {
      "ConnectionString": "mongodb://localhost/vonkadmin",
      "EntryCollection": "vonkentries"
    },
    "SqlDbOptions": {
      "ConnectionString": "connectionstring to your Vonk Admin SQL Server database (SQL2012 or newer); Set MultipleActiveResultSets=True",
      "SchemaName": "vonkadmin",
      "AutoUpdateDatabase": true
      //"AutoUpdateConnectionString" : "set this to the same database as 'ConnectionString' but with credentials that can alter the database. If not set, defaults to the value of 'ConnectionString'"
    },
    "Security": {
      "AllowedNetworks": [ "::1" ], // i.e.: ["127.0.0.1", "::1" (ipv6 localhost), "10.1.50.0/24", "10.5.3.0/24", "31.161.91.98"]
      "OperationsToBeSecured": [ "reindex", "reset", "preload" ]
    }
  },

.. _configure_administration_repository:

Choosing your storage
---------------------

#. ``Repository``: Choose which type of repository you want. Valid values are:

  #. Memory
  #. SQL
  #. MongoDb

#. ``MongoDbOptions``: Use these with ``"Repository": "MongoDb"``, see :ref:`configure_mongodb` for details.
#. ``SqlDbOptions``: Use these with ``"Repository": "SQL"``, see :ref:`configure_sql` for details.

.. _configure_administration_access:

Limited access
--------------

#. ``Security``: You can restrict access to the operations listed in ``OperationsToBeSecured`` from only the IP addressess listed in ``AllowedNetworks``.

  * Operations that can be secured are:

    * ``reindex`` (see :ref:`feature_customsp_reindex`)
    * ``reset`` (see :ref:`feature_resetdb`)
    * ``preload`` (see :ref:`feature_preload`)
    * Read / write on the Conformance resources of type:
      * ``StructureDefinition``
      * ``SearchParameter``
      * ``ValueSet``
      * ``CodeSystem``
      * ``CompartmentDefinition``
    * ``Subscription``: all the read and write on /Subscription (see :ref:`feature_subscription`)

  * The AllowedNetworks have to be valid IP addresses, either IPv4 or IPv6, and masks are allowed.
