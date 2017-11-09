.. _releasenotes:

Release notes Vonk
==================

Release 0.5.0.0
---------------

Database
^^^^^^^^
#. Long URI's for token and uri types are now supported, but that required a change of the SQL Server database structure. If you have AutoUpdateDatabase enabled, Vonk will automatically apply the changes. As always, perform a backup first if you have production data in the database.
#. To prevent duplicate resources in the database we have provided a unique index on the entry table. This update does include a migration. It can happen that that during updating of your database it cannot apply the unique index, because there are duplicate keys in your database (which is not good). Our advise is to empty your database first (with ``<vonk-endpoint>/administration/reset``, then update Vonk with this new version and then run Vonk with ``AutoUpdateDatabase=true`` (for the normal and the administration dbs)

Features and fixes
^^^^^^^^^^^^^^^^^^
#. Fix: POST on _search is now supported
#. Fix: Statuscode of ``<vonk-endpoint>/administration/preload`` has changed when zero resources are added. The statuscode is now 200 instead of 201.
#. Improvement (api): UseBatchAndTransaction is no part of UseOperation anymore.
#. Fix: OPTIONS operation returns now the capability statement with statuscode 200.
#. Fix: a search operation with a wrong syntax will now respond with statuscode 400 and an OperationOutcome. For example ``GET <vonk-endpoint>/Patient?birthdate<1974`` will respond with statuscode 400.
#. Fix: For the Memory and SQL implementation a simple request will not respond with statuscode 501 anymore.
#. Improvement: in the configuration has the section ``ArtifactResolutionOptions`` changed to ``ResourceLoaderOptions`` and a new option has been introduced under that section named ``LoadAtStartup`` which, if set to true, will attempt to load the specified resource sets when you start Vonk
#. Improvement: the option ``SimulateTransactions`` in the configuration defaults to false now
#. Feature: load search parameters from administration API database is now possibe.
#. Fix: the batch operation with search entries detects now the correct interaction.
#. Fix: ETag header is now absent in some cases. 
#. Fix: search parameters are not disregarded anymore while searching on a MongoDB implementation.
#. Fix: reference will be empty when you send a resource with a field of type Reference.
#. Feature: search operation will now support ``_summary``.
#. Fix: the ``_skip`` parameter works now also for the operation history.
#. Fix: conditional updates won't create the same resources anymore when performing this action in parallel.
#. Fix: indexing of CodeableConcept has been enhanced. 
#. Fix: search on reference works now also for a relative reference.
#. Fix: long uri's (larger than are 128 characters) are now supported for token and uri.

Release 0.4.0.1
---------------

Database
^^^^^^^^

#. Long URL's for absolute references are now supported, but that required a change of the SQL Server database structure. If you have AutoUpdateDatabase enabled, Vonk will automatically apply the changes. As always, perform a backup first if you have production data in the database.
#. Datetime elements have a new serialization format in MongoDB. After installing this version, you will see warnings about indexes on these fields. Please perform :ref:`feature_customsp_reindex`, for all parameters with ``<vonk-endpoint>/administration/reindex/all``. After the operation is complete, restart Vonk and the indexes will be created without errors.

Features and fixes
^^^^^^^^^^^^^^^^^^

#. Fix: SearchParameters with a hyphen ('-', e.g. general-practitioner) were not recognized in (reverse) chains.
#. Fix: CapabilityStatement is more complete, including (rev)includes and support for generic parameters besides the SearchParameters (like ``_count``). Also the SearchParameters now have their canonical url and a description.
#. Improvement: :ref:`feature_preload` gives more informative warning messages.
#. Fix: :ref:`feature_customsp_reindex` did not handle contained resources correctly. If you have used this feature on the 0.3.3 version, please apply it again with ``<vonk-endpoint>/administration/reindex/all`` to correct any errors.
#. Improvement: :ref:`feature_artifactresolution` now also works for the Memory implementation.
#. Improvements on :ref:`feature_validation`: 

   * profile parameter can also be supplied on the url
   * if validation is successful, an OperationOutcome is still returned
   * it always returns 200, and not 422 if the resource could not be parsed

#. Feature: support for Conditional Read, honouring if-modified-since and if-none-match headers.
#. Fix: Allow for url's longer than 128 characters in Reference components.
#. Fix: Allow for an id in a resource on a Create interaction (and ignore that id).
#. Fix: Allow for an id in a resource on a Conditional Update interaction (and ignore that id).
#. Fix: Include Last-Modified header on Capability interaction.
#. Fix: Format Last-Modified header in `httpdate <https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1>`_ format.
#. Fix: Include version in bundle.entry.fullUrl on the History interaction.
#. Fix: Update ``_sort`` syntax from DSTU2 to STU3. Note: ``_sort`` is still only implemented for ``_lastUpdated``, mainly for the History interaction.
#. Improvement: If the request comes from a browser, the response is sent with a Content-Type of application/xml, to allow the browser to render it natively. Note that most browsers only render the narrative if they receive xml.

Release 0.3.3.0
---------------

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

#. Feature: Subscription is more heavily checked on create and update. If all checks pass, status is set to active. If not, the Subscription is not stored, and Vonk returns an OperationOutcome with the errors.

   * Criteria must all be supported
   * Endpoint must be absolute and a correct url
   * Enddate is in the future
   * Payload mimetype is supported

#. Feature: use _elements on Search
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

  #. New :ref:`administration_api`
  #. Enabled logging of the SQL statements issued by Vonk (see :ref:`configure_log`)
  #. Migrations for SQL Server (auto create database schema, also for the Administration API)

6. Performance

  #. Added indexes to MongoDb and SQL Server implementations.



