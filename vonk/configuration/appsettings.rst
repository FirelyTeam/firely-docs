.. _configure_appsettings:

Vonk settings
=============

Vonk settings are controlled in json configuration files called appsettings(.*).json. The possible settings in these files are all the same and described below.
The different files are read in a hierarchy so you can control settings on different levels. All appsettings files are in the Vonk distribution directory, next to vonk.server.dll. 
We go through all the sections of this file and refer you to detailed pages on each of them.

You can also control :ref:`configure_envvar`.

Changes to the settings require a restart of Vonk.

.. _configure_levels:

Hierarchy of settings
---------------------

Vonk reads it's settings from these sources, in this order:

:appsettings.default.json: Installed with Vonk, contains default settings and a template setting if no sensible default is available.
:appsettings.json: You can create this one for your own settings. Because it is not part of the Vonk distribution, it will not be overwritten by a next Vonk version.
:environment variables: See :ref:`configure_envvar`.
:appsettings.instance.json: You can create this one to override settings for a specific instance of Vonk. It is not part of the Vonk distribution (especially useful if you run multiple instances on the same machine). 

Settings lower in the list override the settings higher in te list. It works comparable to Cascading Style Sheets, if you're familiar with that.

Settings after first install
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After you installed Vonk (see :ref:`getting_started`), copy the appsettings.default.json to appsettings.json. 
Adjust the new appsettings.json to your liking using the explanation below.

When running :ref:`Vonk on Docker<use_docker>` you probably want to adjust the settings using the Environment Variables.

Settings after update
^^^^^^^^^^^^^^^^^^^^^

If you install the binaries of an updated version of Vonk, you can:

* copy the new binaries over the old ones, or
* deploy the new version to a new directory and copy the appsettings.json over from the old version.

In both cases, check the :ref:`releasenotes` to see if settings have changed, or new settings have been introduced.
If you want to adjust a changed / new setting, copy the relevant section from appsettings.default.json to your own appsettings.json and then adjust it.

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

Administration
--------------
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

The ``Administration`` section is to :ref:`configure_administration` and its repository. 

License
-------
::

    "LicenseFile": "vonk-trial-license.json",


The :ref:`getting_started` explains how to obtain a licensefile for Vonk. Once you have it, put the path to it in the ``LicenseFile`` setting. Note that in json you either use forward slashes (/) or double backward slashes (\\\\) as path separators.

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

SearchParameters and other Conformance Resources
------------------------------------------------
::

    "MetadataImportOptions": {
        "Enabled": true,
        "Sets": [
          {
              "Path": "",
              "Source": "Api"
          }
        ]
    },
    "ReindexOptions": {
        "BatchSize": 100
    },

See :ref:`feature_customsp` and :ref:`conformance`.

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

Getting conformance resources from Simplifier
---------------------------------------------
::

    "ResourceLoaderOptions": {
        "Sets": [
        {
            "Uri": "FHIR endpoint for retrieving StructureDefinitions",
            "UserName": "UserName for retrieving the StructureDefinitions",
            "Password": "Password for the above user name"
        }
        ],
        "BatchSize": 20
    }

See :ref:`conformance`.
