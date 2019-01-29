.. _vonk_releasenotes_history:

Older Vonk Release notes
========================

.. _vonk_releasenotes_0650:

Release 0.6.5.0
---------------

.. attention::

   This version changes the way conformance resources are loaded from zip files and/or directories at startup. They are no longer loaded only in memory, but are added to the Administration API's database.
   You will notice a delay at first startup, when Vonk is loading these resources into the database. See Feature #1 below.

.. attention::

   2018-06-07: We updated the Database actions for 0.6.5.0, you should always perform a reindex, see right below.

Database
^^^^^^^^

#. Feature 2, 4 and 14 below require a :ref:`reindex/all <feature_customsp_reindex>`, both for MongoDB and SQL Server.

Facade
^^^^^^

#. Release 0.6.5.0 is not released on NuGet, so the latest NuGet packages have version 0.6.2-beta. Keep an eye on it for the next release...

Features and fixes
^^^^^^^^^^^^^^^^^^

#. Feature: Run Vonk from you Simplifier project! See :ref:`simplifier_vonk` for details.
#. Feature: Vonk supports Microsoft Azure CosmosDB, see :ref:`configure_cosmosdb`.
   This required a few small changes to the MongoDB implementation (the share the drivers), so please reindex your MongoDB database: :ref:`reindex/all <feature_customsp_reindex>`.
#. Feature: Configuration to restrict support for ResourceTypes, SearchParameters and CompartmentDefinitions, see :ref:`supportedmodel`.
#. Feature: Errata.zip: collection of corrected search parameters (e.g. that had a faulty expression in the FHIR Core specification), see :ref:`feature_errata`
#. Upgrade: FHIR .NET API 0.95.0 (see :ref:`api_releasenotes_0950`)
#. Fix: a search on _id:missing=true was not processed correctly.
#. Fix: better distinction of reasons to reject updates (error codes 400 vs. 422, see `RESTful API specification <http://hl7.org/fhir/http.html#2.21.0.10.1>`_
#. Fix: recognize _format=text/xml and return xml (instead of the default json)
#. Fix: handling of the :not modifier in token searches (include resource that don't have a value at all).
#. Fix: handling of the :not modifier in searches with choice arguments
#. Fix: fullUrl in return bundles cannot be version specific.
#. Fix: evaluate _count=0 correctly (it was ignored).
#. Fix: correct error message on an invalid _include (now Vonk tells you which resourcetypes are considered for evaluating the used searchparameter).
#. Fix: indexing of Observation.combo-value-quantity failed for UCUM code for Celcius. This fix requires a :ref:`reindex/all <feature_customsp_reindex>` on this searchparameter.
#. Fix: total count in history bundle.
#. Fix: on vonk.fire.ly we disabled validating all input, so you can now create or update resources also if the relevant profiles are not loaded 
   (this was neccessary for Crucible, since it references US Core profiles, that are not present by default).
#. Fix: timeout of Azure Web App on first startup of Vonk - Vonk's first startup takes some time due to import of the specification (see :ref:`conformance_specification_zip`). 
   Since Azure Web Apps are allowed a startup time of about 3 minutes, it failed if the web app was on a low level service plan.
   Vonk will now no longer await this import. It will finish startup quickly, but until the import is finished it will return a 423 'Locked' upon every request.
#. Fix: improved logging on the import of conformance resources at startup (see :ref:`conformance_import`).

Release 0.6.4.0
---------------

.. attention::

   This version changes the way conformance resources are loaded from zip files and/or directories at startup. They are no longer loaded only in memory, but are added to the Administration API's database.
   You will notice a delay at first startup, when Vonk is loading these resources into the database. See Feature #1 below.

Database
^^^^^^^^

#. Fix #9 below requires a :ref:`reindex/all <feature_customsp_reindex>`.

Facade
^^^^^^

#. Release 0.6.4.0 is not released on NuGet, so the latest NuGet packages have version 0.6.2-beta. 
   This release is targeted towards the Administration API and :ref:`feature_terminology`, both of which are not (yet) available in Facade implementations.
   We are working on making the features of the Administration API available to Facade implementers in an easy way. 

Features and fixes
^^^^^^^^^^^^^^^^^^

#. Feature: Make all loaded conformance resources available through the Administration API. 
   
   Previously:

   * Only SearchParameter and CompartmentDefinition resources could be loaded from ZIP files and directories;
   * And those could not be read from the Administration API.
   
   Now:

   * The same set of (conformance) resourcetypes can be read from all sources (ZIP, directory, Simplifier);
   * They are all loaded into the Administration database and can be read and updated through the Administration API.

   Refer to :ref:`conformance` for details.

#. Feature: Experimental support for :ref:`feature_terminology` operations $validate-code, $expand, $lookup, $compose.
#. Feature: Support for `Compartment Search <http://www.hl7.org/implement/standards/fhir/search.html#2.21.1.2>`_.
#. Feature: Track timing of major dependencies in :ref:`Azure Application Insights <configure_log_insights>`.
#. Feature: :ref:`configure_log` can be overridden in 4 levels, just as the appsettings. The logsettings.json file will not be overwritten anymore by a Vonk distribution.
#. Fix: The check for :ref:`allowed profiles <feature_prevalidation>` is no longer applied to the Administration API. Previously setting AllowedProfiles to e.g. [http://mycompany.org/fhir/StructureDefinition/mycompany-patient] would prohibit you to actually create or update the related StructureDefinition in the Administration API.
#. Fix: When posting any other resourcetype than the supported conformance resources to the Administration API, Vonk now returns a 501 (Not Implemented).
#. Fix: Support search on Token with only a system (e.g. ``<base>/Observation?code=http://loinc.org|``)
#. Fix: Support search on Token with a fixed system, e.g. ``<base>/Patient?gender=http://hl7.org/fhir/codesystem-administrative-gender.html|female``. This fix requires a :ref:`reindex/all <feature_customsp_reindex>`.
#. Fix: Reindex could fail when a Reference Searchparameter has no targets.
#. Fix: Vonk works as Data Server on `ClinFHIR <http://clinfhir.com>`_, with help of David Hay.
#. Fix: Clearer error messages in the log on configuration errors.
#. Fix: Loading conformance resources from disk in Docker.

Documentation
^^^^^^^^^^^^^

#. We added documentation on :ref:`using IIS or NGINX as reverse proxies <deploy_reverseProxy>` for Vonk.
#. We added documentation on running Vonk on Azure Web App Services.


Release 0.6.2.0
---------------

.. attention::

  The loading of appsettings is more flexible. After installing a new version you can simply paste your previous appsettings.json in the Vonk directory. Vonk's default settings are now in appsettings.default.json. see :ref:`configure_appsettings` for details.

Database
^^^^^^^^
No changes

Features and fixes
^^^^^^^^^^^^^^^^^^

#. Feature: Conditional References in :ref:`Transactions <restful_transaction>` are resolved.
#. Feature: More flexible support for different serializers (preparing for ndjson in Bulkdata)
#. Feature: Improved handling on missing settings or errors in the :ref:`configure_appsettings`.
#. Feature: Improved :ref:`logging <configure_log>`, including Dependency Tracking on Azure Application Insights, see :ref:`configure_log_insights`
#. Feature: SearchParameter and CompartmentDefinition are now also imported from :ref:`Simplifier <conformance_fromsimplifier>`, so both Simplifier import and the :ref:`Administration API <conformance_administration_api>` support the same set of conformance resources: StructureDefinition, SearchParameter, CompartmentDefinition, ValueSet and CodeSystem. See :ref:`Conformance resources<conformance>`.
#. Feature: Loading of appsettings is more flexible, see :ref:`configure_appsettings`.
#. Feature: Added documentation on running Vonk behind IIS or NGINX: :ref:`deploy_reverseProxy`.
#. Performance: Improvement in speed of validation, especially relevant if you are :ref:`feature_prevalidation`.
#. Fix: If you try to load a SearchParameter (see :ref:`conformance_fromdisk`) that cannot be parsed correctly, Vonk puts an error about that in the log.
#. Fix: Results from _include and _revinclude are now marked with searchmode: Include (was incorrectly set to 'Match' before)
#. Fix: _format as one of the parameters in a POST Search is correctly evaluated.
#. Fix: No more errors in the log about a Session being closed before the request has finished 
   ("Error closing the session. System.OperationCanceledException: The operation was canceled.")
#. Fix: Subscription.status is evaluated correctly upon create or update on the Administration API
#. Fix: Token search with only a system is supported (``Observation.code=somesystem|``)
#. Fix: On validation errors like 'Cannot resolve reference Organization/Organization-example26"' are now suppressed since the validator is set not to follow these references.
#. Fix: New Firely logo in SVG format - looks better
#. Fix: Creating resources with duplicate canonical url's on the Administration API is prohibited, see :ref:`conformance`.
#. Fix: If a Compartment filter is used on a parameter that is not implemented, Vonk will return an error, see :ref:`feature_accesscontrol_compartment`.

Release 0.6.1.0
---------------
Name change from Furore to Firely

Release 0.6.0.0
---------------

.. attention:: 

   * SearchParametersImportOptions is renamed to :ref:`MetadataImportOptions<conformance_fromdisk>`.
   * :ref:`Subscription <feature_subscription>` can now be disabled from the settings.

Database
^^^^^^^^
#. The MongoDB implementation got a new index. It will be created automatically upon startup.

Features and fixes
^^^^^^^^^^^^^^^^^^

#. Feature: :ref:`Access control based on SMART on FHIR <feature_accesscontrol>`.
#. Feature: Vonk can also load CompartmentDefinition resources. See :ref:`conformance` for instructions.
#. Feature: ValueSet and CodeSystem resources can be loaded into the administration endpoint, and loaded from Simplifier. See :ref:`conformance` for instructions.
#. Feature: Be lenient on trailing slashes in the url.
#. Feature: OperationOutcome is now at the top of a Bundle result. For human readers this is easier to spot any errors or warnings.
#. Fix: In the :ref:`settings for SQL Server <configure_sql>` it was possible to specify the name of the Schema to use for the Vonk tables. That was actually not evaluated, so we removed the option for it. It is fixed to 'vonk'.
#. Fix: The OperationOutcome of the :ref:`Reset <feature_resetdb>` operation could state both an error and overall success.
#. Fix: If you did not set the CertificatePassword in the appsettings, Vonk would report a warning even if the password was not needed.
#. Fix: :ref:`Loading conformance resources <conformance_fromsimplifier>` in the SQL Server implementation could lead to an error.
#. Fix: Clearer error messages if the body of the request is mandatory but empty.
#. Fix: Clearer error message if the Content-Type is missing.
#. Fix: GET on [base]/ would return the UI regardless of the Accept header. Now if you specify a FHIR mimetype in the Accept header, it will return the result of a system wide search.
#. Fix: In rare circumstances a duplicate logical id could be created.
#. Fix: GET [base]/metadat would return status code 200 (OK). But it should return a 400 and an OperationOutcome stating that 'metadat' is not a supported resourcetype.

Documentation
^^^^^^^^^^^^^

#. We consolidated documentation on loading conformance resources into :ref:`conformance`.
   
Release 0.5.2.0
---------------

.. attention:: Configuration setting SearchOptions is renamed to BundleOptions.


Features and fixes
^^^^^^^^^^^^^^^^^^
#. Fix: When you specify LoadAtStartup in the :ref:`ResourceLoaderOptions <conformance_fromsimplifier>`, an warning was displayed: "WRN No server base configured, skipping resource loading."
#. Fix: `Conditional create <http://www.hl7.org/implement/standards/fhir/http.html#ccreate>`_ that matches an existing resource returned that resource instead of an OperationOutcome.
#. Fix: _has, _type and _count were in the CapabilityStatement twice.
#. Fix: _elements would affect the stored resource in the Memory implementation.
#. Fix: Getting a resource with an invalid id (with special characters or over 64 characters) now returns a 404 instead of 501.
#. Feature: :ref:`feature_customsp_reindex` now also re-indexes the Administration API database.
#. Fix: modifier :above for parameter type Url now works on the MongoDB implementation.
#. Fix: Vonk would search through inaccessible directories for the specification.zip.
#. Fix: Subscription could not be posted if 'Database' was not one of the SearchParametersImportOptions.
#. Fix: _(rev)include=* is not supported but was not reported as such.
#. Fix: In a searchresult bundle, the references to other resources are now made absolute, refering to the Vonk server itself.
#. Fix: :ref:`BundleOptions <bundle_options>` (previously: SearchOptions) settings were not evaluated.
#. Fix: Different responses for invalid resources when you change ValidateIncomingResources setting (400 vs. 501)
#. Fix: Better reporting of errors when there are invalid modifiers in the search.
#. Fix: Creating a resource that would not fit MongoDB's document size resulted in an inappropriate error.
#. Fix: There was no default sort order in the search, resulting in warnings from the SQL implementation. Added default sort on _lastUpdated (desc).
#. Fix: Preliminary disposal of LocalTerminology server by the Validator.

Facade
^^^^^^
#. Fix: _include/_revinclude on searchresults having contained resources triggered a NotImplementedException.

Release 0.5.1.1
---------------

Facade
^^^^^^

We released the Facade libraries on `NuGet <https://www.nuget.org/packages?q=vonk>`_ along with :ref:`getting started documentation <facadestart>`.

No features have been added to the Vonk FHIR Server.

Release 0.5.0.0
---------------

Database
^^^^^^^^
#. Long URI's for token and uri types are now supported, but that required a change of the SQL Server database structure. If you have AutoUpdateDatabase enabled (see :ref:`configure_sql`), Vonk will automatically apply the changes. As always, perform a backup first if you have production data in the database.
#. To prevent duplicate resources in the database we have provided a unique index on the Entry table. This update does include a migration. It can happen that that during updating of your database it cannot apply the unique index, because there are duplicate keys in your database (which is not good). Our advise is to empty your database first (with ``<vonk-endpoint>/administration/reset``, then update Vonk with this new version and then run Vonk with ``AutoUpdateDatabase=true`` (for the normal and the administration databases).

   If you run on production and encounter this problem, please contact our support. 

Features and fixes
^^^^^^^^^^^^^^^^^^
#. Feature: POST on _search is now supported
#. Fix: Statuscode of ``<vonk-endpoint>/administration/preload`` has changed when zero resources are added. The statuscode is now 200 instead of 201.
#. Fix: OPTIONS operation returns now the capability statement with statuscode 200.
#. Fix: A search operation with a wrong syntax will now respond with statuscode 400 and an OperationOutcome. For example ``GET <vonk-endpoint>/Patient?birthdate<1974`` will respond with statuscode 400.
#. Fix: A statuscode 501 could occur together with an OperationOutcome stating that the operation was successful. Not anymore.
#. Fix: An OperationOutcome stating success did not contain any issue element, which is nog valid. Solved. 
#. Improvement: In the configuration on :ref:`conformance_fromsimplifier` the section ``ArtifactResolutionOptions`` has changed to ``ResourceLoaderOptions`` and a new option has been introduced under that section named ``LoadAtStartup`` which, if set to true, will attempt to load the specified resource sets when you start Vonk
#. Improvement: the Memory implementation now also supports ``SimulateTransactions``
#. Improvement: the option ``SimulateTransactions`` in the configuration defaults to false now
#. Feature: You can now add SearchParameters at runtime by POSTing them to the Administration API. You need to apply :ref:`feature_customsp_reindex` to evaluate them on existing resources.
#. Fix: The batch operation with search entries now detects the correct interaction.
#. Fix: ETag header is not sent anymore if it is not relevant. 
#. Fix: Searching on a String SearchParameter in a MongoDB implementation could unexpectedly broaden to other string parameters.
#. Fix: If Reference.reference is empty in a Resource, it is no longer filled with Vonks base address.
#. Feature: Search operation now supports ``_summary``.
#. Fix: Paging is enabled for the history interaction.
#. Fix: Conditional updates won't create duplicate resources anymore when performing this action in parallel.
#. Fix: Indexing of CodeableConcept has been enhanced. 
#. Fix: Search on reference works now also for an absolute reference.
#. Fix: Long uri's (larger than are 128 characters) are now supported for Token and Uri SearchParameters.
#. Improvement: The configuration of IP addresses in :ref:`configure_administration_access` has changed. The format is no longer a comma-separated string but a proper JSON array of strings.


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
#. Improvement: :ref:`Loading resources from Simplifier <conformance_fromsimplifier>` now also works for the Memory implementation.
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
#. Feature: :ref:`load profiles from your Simplifier project <conformance_fromsimplifier>` at startup.
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

