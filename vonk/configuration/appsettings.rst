.. _configure_appsettings:

Vonk settings
=============

Vonk settings are controlled in json configuration files called ``appsettings(.*).json``. The possible settings in these files are all the same and described below.
The different files are read in a hierarchy so you can control settings on different levels. All appsettings files are in the Vonk distribution directory, next to vonk.server.dll. 
We go through all the sections of this file and refer you to detailed pages on each of them.

You can also control :ref:`configure_envvar`.

Changes to the settings require a restart of Vonk.

.. _configure_levels:

Hierarchy of settings
---------------------

Vonk reads its settings from these sources, in this order:

:appsettings.default.json: Installed with Vonk, contains default settings and a template setting if no sensible default is available.
:appsettings.json: You can create this one for your own settings. Because it is not part of the Vonk distribution, it will not be overwritten by a next Vonk version.
:environment variables: See :ref:`configure_envvar`.
:appsettings.instance.json: You can create this one to override settings for a specific instance of Vonk. It is not part of the Vonk distribution.
                            This file is especially useful if you run multiple instances on the same machine. 

Settings lower in the list override the settings higher in te list. It works comparable to Cascading Style Sheets, if you're familiar with that.

.. warning::

   JSON settings files can have arrays in them. The configuration system can NOT merge arrays. 
   So if you override an array value, you need to provide all the values that you want in the array.
   In the Vonk settings this is relevant for e.g. Validation.AllowedProfiles. 

Settings after first install
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After you installed Vonk (see :ref:`getting_started`), either:

* copy the ``appsettings.default.json`` to ``appsettings.json`` and remove settings that you do not intend to alter, or
* create an empty ``appsettings.json`` and copy individual parts from the ``appsettings.default.json`` if you wish to adjust them.

Adjust the new ``appsettings.json`` to your liking using the explanation below.

When running :ref:`Vonk on Docker<use_docker>` you probably want to adjust the settings using the Environment Variables.

Settings after update
^^^^^^^^^^^^^^^^^^^^^

If you install the binaries of an updated version of Vonk, you can:

* copy the new binaries over the old ones, or
* deploy the new version to a new directory and copy the appsettings.json over from the old version.

In both cases, check the :ref:`vonk_releasenotes` to see if settings have changed, or new settings have been introduced.
If you want to adjust a changed / new setting, copy the relevant section from ``appsettings.default.json`` to your own ``appsettings.json`` and then adjust it.

Commenting out sections
^^^^^^^^^^^^^^^^^^^^^^^

JSON formally has no notion of comments. But the configuration system of ASP.Net Core (and hence Vonk) accepts double slashes just fine::

    "Administration": {
        "Repository": "Memory", //SQL / MongoDb
        "SqlDbOptions": {
            "ConnectionString": "connectionstring to your Vonk Admin SQL Server database (SQL2012 or newer); Set MultipleActiveResultSets=True",
            "SchemaName": "vonkadmin",
            "AutoUpdateDatabase": true
            //"AutoUpdateConnectionString" : "set this to the same database as 'ConnectionString' but with credentials that can alter the database. If not set, defaults to the value of 'ConnectionString'"
        },

This will ignore the AutoUpdateConnectionString.

.. _log_configuration:

Log of your configuration
-------------------------

Because the hierarchy of settings can be overwhelming, Vonk logs the resulting configuration. 
To enable that, the loglevel for ``Vonk.Server`` must be ``Information`` or more detailed. That is set for you by default in ``appsettings.default.json``.
Refer to :ref:`configure_log` for information on setting log levels.

Administration
--------------
::

    "Administration": {
        "Repository": "SQLite", //Memory / SQL / MongoDb are other options, but SQLite is advised.
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
       "SQLiteDbOptions": {
            "ConnectionString": "Data Source=./data/vonkadmin.db",
            "AutoUpdateDatabase": true
        },
        "Security": {
        "AllowedNetworks": [ "::1" ], // i.e.: ["127.0.0.1", "::1" (ipv6 localhost), "10.1.50.0/24", "10.5.3.0/24", "31.161.91.98"]
        "OperationsToBeSecured": [ "reindex", "reset", "preload" ]
        }
    },

The ``Administration`` section is to :ref:`configure_administration` and its repository. 

License
-------
::

    "LicenseFile": "vonk-trial-license.json",


The :ref:`getting_started` explains how to obtain a licensefile for Vonk. Once you have it, put the path to it in the ``LicenseFile`` setting. Note that in json you either use forward slashes (/) or double backward slashes (\\\\\\) as path separators.

Repository
----------
::

    "Repository": "Memory", //SQL / MongoDb


#. ``Repository``: Choose which type of repository you want. Valid values are:

  #. Memory
  #. SQL, for Microsoft SQL Server
  #. MongoDb

Memory
^^^^^^
::

    "MemoryOptions": {
        "SimulateTransactions": "false"
    },

Refer to :ref:`configure_memory` for configuring the In-Memory storage.

MongoDB
^^^^^^^
::

    "MongoDbOptions": {
        "ConnectionString": "mongodb://localhost/vonkstu3",
        "EntryCollection": "vonkentries",
        "SimulateTransactions": "false"
    },


Refer to :ref:`configure_mongodb` for configuring the connection to your MongoDB databases.

SQL
^^^
::

    "SqlDbOptions": {
        "ConnectionString": "connectionstring to your Vonk SQL Server database (SQL2012 or newer); Set MultipleActiveResultSets=True",
        "SchemaName": "vonk",
        "AutoUpdateDatabase": true
        //"AutoUpdateConnectionString" : "set this to the same database as 'ConnectionString' but with credentials that can alter the database. If not set, defaults to the value of 'ConnectionString'"
    },


Refer to :ref:`configure_sql` for configuring access to your SQL Server databases.

SQLite
^^^^^^
::

    "SQLiteDbOptions": {
        "ConnectionString": "Data Source=./data/vonkdata.db",
        "AutoUpdateDatabase": true
    },


Refer to :ref:`configure_sqlite` for configuring access to your SQLite Server databases.

http and https
--------------
::

    "Hosting": {
        "HttpPort": 4080,
        //"HttpsPort": 4081, // Enable this to use https
        //"CertificateFile": "<your-certificate-file>.pfx", //Relevant when HttpsPort is present
        //"CertificatePassword" : "<cert-pass>" // Relevant when HttpsPort is present
    },

Refer to :ref:`configure_hosting` for enabling https and adjusting port numbers.

Validation
----------
::

    "Validation": {
        "ValidateIncomingResources": "true",
        "AllowedProfiles": []
    },


Refer to :ref:`feature_prevalidation`.

.. _bundle_options:

Search and History
------------------
::

    "BundleOptions": {
        "DefaultCount": 10,
        "MaxCount": 50
    },


The Search and History interactions return a bundle with results. Users can specify the number of results that they want to receive in one response with the ``_count`` parameter.

* ``DefaultCount`` sets the number of results if the user has not specified a ``_count`` parameter.
* ``MaxCount`` sets the number of results in case the user specifies a ``_count`` value higher than this maximum. This is to protect Vonk from being overloaded.
* ``DefaultCount`` should be less than or equal to ``MaxCount``

.. _batch_options:

Batch and transaction
---------------------
::

    "BatchOptions": {
        "MaxNumberOfEntries": 100
    },

This will limit the number of entries that are accepted in a single Batch or Transaction bundle.

.. _sizelimits_options:

Protect against large input
---------------------------
::

    "SizeLimits": {
        "MaxResourceSize": 1MiB,
        "MaxBatchSize": 5MiB,
        "MaxBatchEntries": 150
    },

* ``MaxResourceSize`` sets the maximum size of a resource that is sent in a create or update.
* ``MaxBatchSize`` sets the maximum size of a batch or transaction bundle. 
  (Note that a POST http(s)://<vonk-endpoint>/Bundle will be limited by MaxResourceSize, since the bundle must be processed as a whole then.)
* ``MaxBatchEntries`` limits the number of entries that is allowed in a batch or transaction bundle.
* The values for ``MaxResourceSize`` and ``MaxBatchSize`` can be expressed in b (bytes, the default), kB (kilobytes), KiB (kibibytes), MB (megabytes), or MiB (mibibytes).
  Do not put a space between the amount and the unit.


SearchParameters and other Conformance Resources
------------------------------------------------
::

    "AdministrationImportOptions": {
        "ImportDirectory": "./vonk-import",
        "ImportedDirectory": "./vonk-imported", //Do not place ImportedDirectory *under* ImportDirectory, since an import will recursively read all subdirectories.
        "SimplifierProjects": [
          {
            "Uri": "https://stu3.simplifier.net/<your-project>",
            "UserName": "Simplifier user name",
            "Password": "Password for the above user name",
            "BatchSize": 20
          }
        ]
    }

See :ref:`conformance` and :ref:`feature_customsp`.

.. _supportedmodel:

Restrict supported resources and SearchParameters
-------------------------------------------------
::

   "SupportedModel": {
     "RestrictToResources": [ "Patient", "Observation" ]
     "RestrictToSearchParameters": ["Patient.active", "Observation.patient"]
     "RestrictToCompartments": ["Patient"]
   },

By default, Vonk supports all ResourceTypes, SearchParameters and CompartmentDefinitions from the specification. They are loaded from the :ref:`specification.zip <conformance_specification_zip>`.
If you want to limit support, you can do so with the configuration above. This is primarily targeted towards Facade builders, because they have to provide an implementation for everything that is supported. 

Be aware that:

* support for _type and _id cannot be disabled
* the Administration API requires support for the 'url' SearchParameter on the conformance resourcetypes

.. _disable_interactions:

Enable or disable interactions
------------------------------

By default, the value ``SupportedInteractions`` contains all the interactions that are implemented in Vonk. 
But you can disable interactions by removing them from these lists.
::

    "SupportedInteractions": {
        "InstanceLevelInteractions": "read, vread, update, delete, history, conditional_delete, conditional_update, $validate",
        "TypeLevelInteractions": "create, search, history, $validate, $snapshot, conditional_create",
        "WholeSystemInteractions": "capabilities, batch, transaction, history, search, $validate"
    },

Subscriptions
-------------
::

    "SubscriptionEvaluatorOptions": {
	    "Enabled": true,
        "RepeatPeriod": 20000,
        "SubscriptionBatchSize" : 1
    },

See :ref:`feature_subscription`.

