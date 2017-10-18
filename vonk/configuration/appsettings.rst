.. _configure_appsettings:

Vonk settings
=============

Vonk settings are in the file ``appsettings.json``, that is part of the Vonk distribution. You can find this file in the top level directory of the distribution, next to vonk.server.dll. 
We go through all the sections of this file and refer you to detailed pages on each of them.

You can also control :ref:`configure_envvar`.

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

The ``Administration`` section is to :ref:`configure_administration` and it's repository. 

License
-------
::

    "LicenseFile": "vonk-trial-license.json",


The :ref:`getting-started` explains how to obtain a licensefile for Vonk. Once you have it, put the path to it in the ``LicenseFile`` setting. Note that in json you either use forward slashes (/) or double backward slashes (\\) as path separators.

Repository
----------
::

    "Repository": "Memory", //SQL / MongoDb


#. ``Repository``: Choose which type of repository you want. Valid values are:

  #. Memory
  #. SQL, for Microsoft SQL Server
  #. MongoDb


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



Validation
----------
::

    "Validation": {
        "ValidateIncomingResources": "true",
        "AllowedProfiles": []
    },


Refer to :ref:`feature_prevalidation`.

Search and History
------------------
::

    "SearchOptions": {
        "DefaultCount": 10,
        "MaxCount": 50
    },


The Search and History interactions return a bundle with results. Users can specify the number of results that they want to receive in one response with the ``_count`` parameter.
* ``DefaultCount`` sets the number of results if the user has not specified a ``_count`` parameter.
* ``MaxCount`` sets the number of results in case the user specifies a ``_count`` value higher than this maximum. This is to protect Vonk from being overloaded.
* ``DefaultCount`` should be less than or equal to ``MaxCount``.

SearchParameters
----------------
::

    "SearchParametersImportOptions": {
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

See :ref:`feature_customsp`.

.. _disable_interactions:

Enable or disable interactions
------------------------------

By default value ``SupportedInteractions`` contains all the interactions that are implemented in Vonk. 
But you can disable interaction by removing them from these lists.
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
        "RepeatPeriod": 20000,
        "SubscriptionBatchSize" : 1
    },

See :ref:`feature_subscription`.

Getting conformance resources from Simplifier
---------------------------------------------
::

    "ArtifactResolutionOptions": {
        "Sets": [
        {
            "Uri": "FHIR endpoint for retrieving StructureDefinitions",
            "UserName": "UserName for retrieving the StructureDefinitions",
            "Password": "Password for the above user name"
        }
        ],
        "BatchSize": 20
    }

See :ref:`feature_artifactresolution`.
