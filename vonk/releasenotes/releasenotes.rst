.. _vonk_releasenotes:

Release notes Vonk
==================

.. toctree::
   :maxdepth: 1
   :titlesonly:

   releasenotes_old
   security_notes

.. _vonk_releasenotes_0710:

Release 0.7.1.0
---------------

.. attention::

   Issue nr. 8 requires a reindex/searchparameters with ``include=Resource._id,Resource._lastUpdated,Resource._tag``. 
   Please review :ref:`feature_customsp_reindex` on how to perform a reindex and the cautions that go with it.
   Also note the changes to reindexing in issue nr. 1.

Database
^^^^^^^^

#. We added support for SQLite! See :ref:`configure_sqlite` for details.
#. We also made SQLite the default setting for both the main Vonk database and the :ref:`administration_api`.
#. With the introduction of SQLite we advise running the Administration API on SQLite. In the future we will probably deprecate running the Administration API on any of the other databases.
#. Support for CosmosDB is expanded. Though there are a :ref:`few limitations <configure_cosmosdb_limitations>`.

Facade
^^^^^^

#. If you rejected the value for the _id searchparameter in your repository, Vonk would report an InternalServerError. Now it reports the actual message of your ArgumentException.

Features and fixes
^^^^^^^^^^^^^^^^^^

#. We sped up :ref:`feature_customsp_reindex`. The request will be responded upon immediately, while Vonk starts the actual reindex asynchronously and with many threads in parallel.
   Users are guarded against unreliable results by blocking other requests for the duration of the reindex.
   Reindexing is still not to be taken lightly. It is a very heavy operation that may take very long to complete.
   See :ref:`feature_customsp_reindex` for details. 
#. A really large bundle could lead Vonk (or more specifically: the validator in Vonk) to a StackOverflow. You can now set :ref:`limits <sizelimits_options>` to the size of incoming data to avoid this.
#. :ref:`Reindexing <feature_customsp_reindex>` is supported on CosmosDB, but it is less optimized than on MongoDB.
#. Using _include or _revinclude would yield an OperationOutcome if there are no search results to include anything on. Fixed that to return 404 as it should.
#. Using the :not modifier could return false positives. 
#. A batch or transaction with an entry having a value for IfModifiedSince would fail.
#. History could not be retrieved for a deleted resource. Now it can.
#. :ref:`Reindex <feature_customsp_reindex>` would ignore the generic searchparameters defined on Resource (_id, _lastUpdated, _tag). Because id and lastUpdated are also stored apart from the search index, this was really only a problem for _tag.
   If you rely on the _tag searchparameter you need to reindex **just for the searchparameter ``Resource._tag``**.
#. Vonk logs its configuration at startup. See :ref:`log_configuration` for details.

.. _vonk_releasenotes_0700:

Release 0.7.0.0
---------------

Database
^^^^^^^^

#. Indexes on the SQL Server repository were updated to improve performance. They will automatically be applied with :ref:`AutoUpdateDatabase<configure_sql>`.

Facade
^^^^^^

#. Release 0.7.0.0 is compatible again with Facade solutions built on the packages with versions 0.6.2, with a few minor changes. 
   Please review the Vonk.Facade.Starter project for an example of the necessary adjustments. All the differences can be seen in `this file comparison <https://github.com/FirelyTeam/Vonk.Facade.Starter/commit/ea4734da117e7add0d7155b225f5f320db86919c#diff-c7ac183ffadb9c835e21f6853864bad0>`_.
#. Fix: The SMART authorization failed when you don't support all the resourcetypes. It will now take into account the limited set of supported resourcetypes.
#. Fix: Vonk.Facade.Relational.RelationalQueryFactory would lose a _count argument. 
#. Documentation: We added documentation on how to implement Create, Update and Delete in a facade on a relational database. See :ref:`enablechange`. This is also added to the `example Facade solution <https://github.com/FirelyTeam/Vonk.Facade.Starter/tree/exercise/cud>`_ on GitHub.

Features and fixes
^^^^^^^^^^^^^^^^^^

#. Feature: :ref:`Vonk FHIR Components<vonk_components>` has been released. You can now add libraries with your own components through configuration. 
#. Feature: Through :ref:`Vonk FHIR Components<vonk_components>` you can replace the landing page with one in your own style. We provided an :ref:`example<vonk_components_landingpage>` on how to do that.
#. Feature: You can now start Vonk from within another directory than the Vonk binaries directory, e.g. ``c:\programs>dotnet .\vonk\vonk.server.dll``.
#. Feature: You can configure the maximum number of entries allowed in a Batch or Transaction, to avoid overloading Vonk. See :ref:`batch_options`.
#. Upgrade: We upgraded the FHIR .NET API to version 0.96.0, see their :ref:`release notes<api_releasenotes_0960>` for details.
   Mainly #599 affects Vonk, since it provides the next...
#. Fix: Under very high load the FhirPath engine would have concurrency errors. The FhirPath engine is used to extract the search parameters from the resources. This has been fixed.
#. Fix: Search on a frequently used tag took far too long on a SQL Server repository.
#. Fix: The `Patient.deceased <http://hl7.org/fhir/patient.html#search>`_ search parameter from the specification had an error in its FhirPath expression. We put a corrected version in the :ref:`errata.zip<feature_errata>`.
#. Fix: Several composite search parameters on Observation are defined incorrectly in the specification, as is reported in `GForge issue #16001 <https://gforge.hl7.org/gf/project/fhir/tracker/?action=TrackerItemEdit&tracker_item_id=16001&start=0>`_. 
   Until the specification itself is corrected, we provide corrections in the :ref:`errata.zip<feature_errata>`.
#. Fix: Relative references in a resource that start with a forward slash (like ``/Patient/123``) could not be searched on.
#. Fix: System wide search within a compartment looked for the pattern ``<base>/Patient/123/?_tag=bla``. Corrected this to ``<base>/Patient/123/*?_tag=bla``
#. Fix: When loading :ref:`Simplifier resources<conformance_fromsimplifier>`, Vonk can now limit this to the changes since the previous import, because the Simplifier FHIR endpoint supports _lastUpdated. 
#. Fix: :ref:`Conformance resources<conformance>` are always loaded into the Administration API when running on a Memory repository. Or actually, always if there are no StructureDefinitions in the Administration database.
   To enable this change, imported files are no longer moved to the :ref:`AdministrationOptions.ImportedDirectory<conformance_import>`.
#. Fix: :ref:`feature_customsp_reindex` would stop if a resource was encountered that could not properly be indexed. It will now continue working and report any errors afterwards in an `OperationOutcome <http://hl7.org/fhir/operationoutcome.html>`_.
#. Fix: The terms and privacy statement on the default landing page have been updated.
#. Fix: When searching on a search parameter of type date, with an argument precision to the minute (but not seconds), Vonk would reject the argument. It is now accepted.
#. Fix: DateTime fields are always normalized to UTC before they are stored. This was already the case on MongoDb, and we harmonized SQL and Memory to do the same. There is no need to reindex for this change. 
#. Fix: When you use accents or Chinese characters in the url for a search, Vonk gives an error.
#. Fix: A reverse chained search on MongoDb sometimes failed with an Internal Server Error. 

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



