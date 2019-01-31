.. _vonk_releasenotes:

Release notes Vonk
==================

.. toctree::
   :maxdepth: 1
   :titlesonly:

   releasenotes_old
   security_notes


.. _vonk_releasenotes_110:

Release 1.1.0
-------------

.. attention::
   
   New security issues have been identified by Microsoft. See the :ref:`vonk_securitynotes` for details.

.. attention::

   The setting for the location of the license file has moved. It was in the top level setting ``LicenseFile``. It still has the same name, but it has moved into the section ``License``. See :ref:`configure_license` for details.

.. attention::

   This version of Vonk is upgraded to the Hl7.Fhir.API version 1.1.1. Plugin- and Facade builders will transitively get this dependency through the Vonk.Core package.

Database
^^^^^^^^

No changes have been made to any of the database implementations.

Feature
^^^^^^^

#. Vonk will count the number of requests that it processes. See :ref:`configure_license` for settings on that. Because of this change, the ``LicenseFile`` setting has moved from the top level to under ``License``.
#. The plugin folder (:ref:`settings_pipeline`) may now contain subfolders. Plugins will be read from all underlying folders.
#. Vonk supports If-Match on update. See `Managing Resource Contention <http://hl7.org/fhir/http.html#concurrency>`_ in the specification for details.
#. Plugins may return non-FHIR content. See :ref:`vonk_components_directhttp`.
#. This feature may also be used for :ref:`accesscontrol_custom_authentication`.
#. A :ref:`vonk_components_plugintemplate` is added to the documentation.
#. A documentation page on performance is added: :ref:`vonk_performance`.
#. Upgrade of the Hl7.Fhir.API library to 1.1. See the API releasenotes for :ref:`api_releasenotes_1.1.0`.

Fix
^^^

#. Transaction: forward references from one resource to another in a Transaction were not correctly resolved.
#. When you set ValidateIncomingResources to true, Vonk no longer accepts resources with extensions that are unknown to it. This is now also reflected in the CapabilityStatement.acceptUnknown.
#. The links in a bundle response (``Bundle.link``) were relative links. Now they are absolute links.
#. HTTP 500 instead of an OO was returned when trying to update a subscription with an invalid request status.
#. If an error is found in a SearchParameter in the Administration database, Vonk logs the (canonical) url of that SearchParameter for easier reference.
#. Transaction: Response bundle contained versioned fullUrls. We changed that to unversioned urls.
#. Bundles: Response bundles with an OperationOutcome contained a versioned fullUrl for the entry containing the OperationOutcome. We changed that to an unversioned url. 
#. Deleting a resource from the Administration API that does not exist would lead to an internal server error.

Supported Plugins
^^^^^^^^^^^^^^^^^

#. Several fixes have been done on the `Document plugin <https://github.com/FirelyTeam/Vonk.Plugin.DocumentOperation>`_.

.. _vonk_releasenotes_100:

Release 1.0.0
-------------

Yes! Vonk version 1.0 is out. It is also the first version that is released withouth the -beta postfix. It has been very stable from the very first version, and now we think it is time to make that formal. 

Release 1.0.0 is functionally identical to 0.7.4.0. But we optimized the deployment process for :ref:`yellowbutton` and :ref:`Docker <use_docker>` in general. The contents of the core specification are now preloaded in the SQLite administration database, so your first startup experience is a lot faster.

.. _vonk_releasenotes_0740:

Release 0.7.4.0
---------------

Database
^^^^^^^^

#. The index definitions for SQL Server have been updated for improved performance. This should be handled automatically when you start Vonk 0.7.4 and have :ref:`AutoUpdateDatabase <configure_sql>` enabled.

Fix
^^^

#. Posting a resource with an invalid content-type to the regular FHIR endpoint should result in HTTP 415 and not HTTP 400.
#. Warning 'End method "PocoResourceVisitor.VisitByType", could not cast entity to PocoResource.' in the log was incorrect.
#. When running Administration API on SQLite and Vonk on SQL Server, update or delete would fail.
#. Handle quantity with very low precision (e.g. '3 times per year' - 3|http://unitsofmeasure.org|/a).
#. POST to <vonk_base>/Administration/* with another Content-Type than application/json or application/xml results in HTTP 500.

Feature
^^^^^^^

#. Support forward references in a :ref:`Transaction bundle <restful_transaction>`. Previously Vonk would only process references back to resources higher up in the bundle.
#. Performance of Validation and Snapshot Generation has improved by approximately 10 times...
#. ... and correctness has improved as well.
#. Administration API also support the NamingSystem resource.

.. _vonk_releasenotes_0730:

Release 0.7.3.0
---------------

Fix
^^^
#. Search on /administration/Subscription was broken
#. Neater termination of the Subscription evaluation process upon Vonk shutdown
#. A Bundle of type batch is now rejected if it contains internal references.
#. Urls in the narrative (href and src) are also updated to the actual location on the server.
#. A system wide search on compartment returns 403, explaining that that is too costly. 

.. _vonk_releasenotes_0721:

Release 0.7.2.1
---------------

Fix
^^^

#. Delete on /administration was broken.

.. _vonk_releasenotes_0720:

Release 0.7.2.0
---------------

Database
^^^^^^^^

#. Fixes 2 and 3 require a reindex for specific searchparameters, if these parameters are relevant to you.

Features and fixes
^^^^^^^^^^^^^^^^^^

#. Fix: Reject a search containing a modifier that is incorrect or not supported.
#. Fix: The definition for searchparameter Encounter.length was unclear. We added the correct definition from FHIR R4 to the errata.zip, so it works for STU3 as well.
   If this is relevant for you, you may want to reindex for this searchparameter. See :ref:`feature_customsp_reindex_specific`, just for 'Encounter.length'.
#. Fix: Error "Unable to index for element of type 'base64Binary'". This type of element is now correctly indexed. 
   One known searchparameter that encounters this type is Device.udi-carrier. If this is relevant to you, you may want to reindex for this searchparameter. See :ref:`feature_customsp_reindex_specific`, just for 'Device.udi-carrier'.
#. Fix: Validation would fail on references between contained resources. See also fix #423 in the :ref:`release notes for the FHIR API <api_releasenotes_0950>`.
#. Fix: E-tag was missing from the response on a delete interaction.
#. Fix: An invalid mimetype in the _format parameter (like _format=application/foobar) returned response code 400 instead of 415.
#. Fix: If a subscription errors upon execution, not only set the status to error, but also state the reason in Subscription.error for the user to inspect.
#. Fix: Search on /Observation?value-string:missing=false did not work. As did the missing modifier on other searchparameters on value[x] elements.
#. Feature: After /administration/importResources (see :ref:`conformance_on_demand`), return an OperationOutcome detailing the results of the operation.
#. Feature: Upon usage of a wrong value for _summary, state the possible, correct values in the OperationOutcome.
#. Feature: Allow for multiple deletes with a Conditional Delete, see :ref:`restful_crud`.
#. Feature: The version of Vonk is included in the log file, at startup.
#. Configuration: Add Vonk.Smart to the PipelineOptions by default, so the user only needs to set the SmartAuthorizationOptions.Enabled to true.
#. Upgrade: We upgraded to the latest C# driver for MongoDb (from 2.4.4 to 2.7.0).

.. _vonk_releasenotes_0711:

Release 0.7.1.1
---------------

Fix
^^^

Spinning up a Docker container would crash the container because there was no data directory for SQlite (the default repository). This has been 
solved now: Vonk will create the data directory when it does not exist. 


.. _vonk_releasenotes_0710:

Release 0.7.1.0
---------------

.. attention::

   Fix nr. 8 requires a reindex/searchparameters with ``include=Resource._id,Resource._lastUpdated,Resource._tag``. 
   Please review :ref:`feature_customsp_reindex` on how to perform a reindex and the cautions that go with it.
   Also note the changes to reindexing in fix nr. 1.

Database
^^^^^^^^

#. We added support for SQLite! See :ref:`configure_sqlite` for details.
#. We also made SQLite the default setting for both the main Vonk database and the :ref:`administration_api`.
#. With the introduction of SQLite we advise running the Administration API on SQLite. In the future we will probably deprecate running the Administration API on any of the other databases.
#. Support for CosmosDB is expanded, though there are a :ref:`few limitations <configure_cosmosdb_limitations>`.

Facade
^^^^^^

#. If you rejected the value for the _id searchparameter in your repository, Vonk would report an InternalServerError. Now it reports the actual message of your ArgumentException.

Features and fixes
^^^^^^^^^^^^^^^^^^

#. We sped up :ref:`feature_customsp_reindex`. The request will be responded to immediately, while Vonk starts the actual reindex asynchronously and with many threads in parallel.
   Users are guarded against unreliable results by blocking other requests for the duration of the reindex.
   Reindexing is still not to be taken lightly. It is a **very heavy** operation that may take very long to complete.
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





