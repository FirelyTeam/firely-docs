.. |br| raw:: html

   <br />
   
.. _configure_sqlite:

Using SQLite
============

SQLite is a file based database engine. The engine itself does not run separately on the server, but in-process in the application, Vonk FHIR Server in this case. 

For more background on SQLite please refer to the `SQLite documentation <https://sqlite.org/about.html>`_.

SQLite is the default configuration of Vonk FHIR Server. For the Administration database there is little reason to change this. 
For the actual runtime data, (the 'Vonk database') itself, you may run into limitations of SQLite if you put it through its paces. 
You may find one of the other repositories a better fit then. You can safely use different storage engines for Vonk Data and Vonk Administration.

.. _sqlite_admin_reasons:

Prefer SQLite for Vonk Administration
-------------------------------------

Until Vonk version 0.7.0 you could use any of the storage engines for both Vonk Data and Vonk Administration. Starting with Vonk 0.7.1 you are encouraged to use SQLite for Vonk Administration.
Over time we will deprecate support for running Vonk Administration on the SQL Server, MongoDb and Memory storage engines.
For Vonk Data you can of course still use the storage engine of your preference. 

Vonk Administration poses very limited stress on its storage engine, therefore SQLite is adequate. And it provides several advantages:

*   Runs out of the box: SQLite requires no installation of a database engine, but still provides durable storage (unlike the Memory storage). 
    Thus, you don't need to setup anything to run Vonk Administration. And you can download the Vonk binaries and run them without any further configuration.

*   Flexible on updates: Many of the features that we will add to Vonk require changes to the schema of the Administration database. By only supporting SQLite for this, we can provide these features to you more quickly.

*   Readymade database: In the other storage engines, the conformance resources from the specification had to be :ref:`imported<conformance_import>` before Vonk could start. This would take a couple of minutes.
    Because SQLite is file based, we can run the import process for you and provide you with a readymade Administration database.

*   Runs with Facades: perhaps the most important feature. If you build a Vonk FHIR Facade, the facade will not provide support for hosting conformance resources. 
    With Vonk Administration on SQLite the facade has its own storage and you can use Vonk Administration out of the box. This enables e.g. validation against your custom resources (that can be imported from your Simplifier project), subscriptions, and other use cases.

.. _configure_sqlite_data:

Settings for using SQLite for Vonk Data
---------------------------------------

*	Changing a setting means overriding it as described in :ref:`configure_change_settings`. 

*   Find the ``Repository`` setting and set it to SQLite if it not already set to that::

	"Repository": "SQLite",

*   Find the section called ``SQLiteDbOptions``. It has these values by default::

        "SQLiteDbOptions": {
            "ConnectionString": "Data Source=./data/vonkdata.db",
            "AutoUpdateDatabase": true
        },

    Vonk will create the database *file*, but please make sure the *directory* already exists.

*   Find the section called ``PipelineOptions``. Make sure it contains the SQLite repository in the root path::

        "PipelineOptions" : 
        {
            "Branches" : [
                "/" : {
                    "Include" : [
                        "Vonk.Repository.SQLite.SqliteVonkConfiguration"
                        //...
                    ]
                },
                //...
            ]
        }

.. _configure_sqlite_admin:

Settings for using SQLite for Vonk Administration
-------------------------------------------------

*   Set the ``SqlDbOptions`` under ``Administration`` for the Administration database similar to those above:
    ::
	
        "Administration" : {
            "Repository": "SQLite",
            "SQLiteDbOptions": {
                "ConnectionString": "Data Source=./data/vonkadmin.db",
                "AutoUpdateDatabase": "true"
            }
        }

    Vonk will create the database *file*, but please make sure the *directory* already exists.

*   Find the section called ``PipelineOptions``. Make sure it contains the SQLite repository in the administration path::

        "PipelineOptions" : 
        {
            "Branches" : [
                "/": {
                    //...
                },
                "/administration" : {
                    "Include" : [
                        "Vonk.Repository.SQLite.SqliteAdministrationConfiguration"
                        //...
                    ]
                }
            ]
        }


.. _sqlite_importhistory:

Administration import history in SQLite
---------------------------------------

When Vonk :ref:`imports Conformance resources<conformance_import>`, it keeps record of what is has imported. Unlike the SQL Server and MongoDb engines,
the SQLite storage engine does *not* use the .vonk-import-history.json file for that. Instead, in SQLite the import history is stored within the Administration database itself.

