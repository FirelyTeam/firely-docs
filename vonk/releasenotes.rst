.. _releasenotes:

Release notes Vonk
==================

Release 0.3.3.0
---------------

IMPORTANT: 

.. attention:: We upgraded to .NET Core 2.0. For this release you have to install .NET Core Runtime 2.0, that you can download from `dot.net <https://www.microsoft.com/net/download/core#/runtime/>`_.

Hosting
^^^^^^^

The options for enabling and configuring HTTPS have moved. They are now in appsettings.json, under 'Hosting':
   ::

    "Hosting": {
      "HttpPort": 4080,
      "HttpsPort": 4081, // Enable this to use https
      "CertificateFile": "<your-certificate-file>.pfx", //Relevant when HttpsPort is present
      "CertificatePassword" : "<cert-pass>" // Relevant when HttpsPort is present
    },
  
   This means you have to adjust your environment variables for CertificateFile and CertificatePassword (if you had set them) to:
   ::

    VONK_Hosting:CertificateFile
    VONK_Hosting:CertificatePassword

   The setting 'UseHttps' is gone, in favour of Hosting:HttpsPort.

Database
^^^^^^^^

There are no changes to the database structure.

Features and fixes
^^^^^^^^^^^^^^^^^^

1. Feature: Subscription is more heavily checked on create and update. If all checks pass, status is set to active. If not, the Subscription is not stored, and Vonk returns an OperationOutcome with the errors.

  * Criteria must all be supported
  * Endpoint must be absolute and a correct url
  * Enddate is in the future
  * Payload mimetype is supported

2. Feature: use _elements on Search

#. Feature: :ref:`load profiles from your Simplifier project <feature_artifactresolution>` at startup.

#. Feature: Content-Length header is populated.

#. Fix: PUT or POST on /metadata returned 200 OK, but now returns 405 Method not allowed.

#. Fix: Sometimes an error message would appear twice in an OperationOutcome.

#. Fix: _summary is not yet implemented, but was not reported as 'not supported' in the OperationOutcome. Now it is. (Soon we will actually implement _summary.)

#. Fix: If-None-Exist header was also processed on an update, where it is only defined for a create. 

#. Fix: Set Bundle.entry.search.mode to 'outcome' for an OperationOutcome in the search results.

#. UI: Display software version on homepage.

Release 0.3.2.0
---------------

1. Fix: _include and _revinclude could include too many resources.

Release 0.3.1.0
---------------

1. IP address restricted access to Administration API functions.

2. Fix on Subscriptions: 

  #. Accept only Subscriptions with a channel of type rest-hook and the payload (if present) has a valid mimetype.
  #. Set them from requested to active if they are accepted.

Release 0.3.0.0
---------------

1. Database changes

  If you have professional support, please consult us on the best way to upgrade your database.

  #. The schema for the SQL Database has changed. It also requires re-indexing all resources. 
  #. The (implicit) schema for the documents in the MongoDb database has changed. 
  #. The Administration API requires a separate database (SQL) or collection (MongoDb).

2. New features:

  #. :ref:`Custom Search Parameters <feature_customsp>`
  #. Support for Subscriptions with rest-hook channel
  #. Preload resources from a zip.
  #. Reset database
  #. Conditional create / update / delete
  #. Support for the prefer header
  #. Validation on update / create (can be turned on/off)
  #. Restrict creates/updated to specific profiles.
  #. Configure supported interactions (turn certain interactions on/off)

3. New search features:

  #. ``_has``
  #. ``_type`` (search on system level)
  #. ``_list``
  #. ``_revinclude``

4. Enhancements

  #. ``:exact``: Correctly search case (in)sensitive when the :exact modifier is (not) used on string parameters.
  #. Enhanced reporting of errors and warnings in the OperationOutcome.
  #. Custom profiles / StructureDefinitions separated in the Administration API (instead of in the regular database).
  #. Full FHIRPath support for Search Parameters.
  #. Fixed date searches on dates without seconds and timezone
  #. Fixed evaluation of modifier :missing
  #. Correct total number of results in search result bundle.
  #. Fix paging links in search result bundle
  #. Better support for mimetypes.

5. DevOps:

  #. New :ref:`Administration API <administration>`
  #. Enabled logging of the SQL statements issued by Vonk (see :ref:`configure <configure>`)
  #. Migrations for SQL Server (auto create database schema, also for the Administration API)

6. Performance

  #. Added indexes to MongoDb and SQL Server implementations.



