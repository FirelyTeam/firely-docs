.. _vonk_releasenotes:

Release notes Vonk
==================

.. toctree::
   :maxdepth: 1
   :titlesonly:

   releasenotes_old
   security_notes

.. _vonk_releasenotes_300-beta2:

Release 3.0.0-beta2
--------------------

.. attention::

   We updated the :ref:`vonk_securitynotes`.

Database
^^^^^^^^

Note the changes in :ref:`3.0.0-beta1 <vonk_releasenotes_300-beta1>`, but there are no new changes in beta2.

Feature
^^^^^^^

#. :ref:`feature_subscription` works for R4 also. Note that a Subscription will only be activated for resource changes in the same FHIR version as the Subscription itself.
#. :ref:`conformance_fromdisk` works for R4 also. Use a directoryname that ends with ``.R4`` for R4 conformance resources.
#. :ref:`feature_customsp_reindex` works for R4 also. Issue a reindex with a fhirVersion parameter in the Accept header, and it will be executed for the SearchParameters defined for that FHIR version.
#. Allow for non-hl7 prefixed canonical urls for conformance resources (since sdf-7 is lifted). See :ref:`feature_customresources`.
#. Custom Resources can be validated, both individually and as part of a bundle. See :ref:`feature_customresources`.
#. If the Accept header lacks a fhirVersion parameter, it will fall back to the fhirVersion parameter of the Content-Type header and vice versia.
   If both are missing, Vonk will default to STU3.

Fix
^^^

#. _include did not work for R4.
#. _include gave a 500 responsecode if a resource contains absolute references.
#. A resource with unknown elements could result in an uncaught ``Hl7.Fhir.ElementModel.StructuralTypeException``.
#. The homepage stated that Vonk was only for STU3. Fixed that.
#. Bundle.timestamp element (new in R4) was not populated in bundles returned from Search and History operations.
#. Some operations could return an OperationOutcome with an issue *and* a success message.
#. Better error message if a resource without any meta.profile is not accepted by :ref:`feature_prevalidation`.
#. Requesting an invalid FHIR version resulted in a ArgumentNullException.

Plugin and Facade API
^^^^^^^^^^^^^^^^^^^^^

#. NuGet package ``Vonk.Fhir.R4`` had a dependency on Vonk.Administration.API, but the latter is not published. We removed the dependency.
#. ``IResourceExtensions.UpdateMetadata`` did not update the id of the resource.
#. ``VonkOutcome.RemoveIssue()`` method has been removed.

.. _vonk_releasenotes_300-beta1:

Examples
^^^^^^^^

#. Plugin example (`Vonk.Plugin.ExampleOperation <https://github.com/FirelyTeam/Vonk.Plugin.ExampleOperation>`_):

   #. Added an example of middleware directly interacting with the ``HttpContext`` (instead of just the ``VonkContext``), see the file `VonkPluginMiddleware.cs <https://github.com/FirelyTeam/Vonk.Plugin.ExampleOperation/blob/master/Vonk.Plugin.ExampleOperation/VonkPluginMiddleware.cs>`_ 
   #. CapabilityStatementBuilder was not called.

#. DocumentOperation (`Vonk.Plugin.DocumentOperation <https://github.com/FirelyTeam/Vonk.Plugin.DocumentOperation>`_):

   #. Composition ID was not determined correctly when using POST.

Release 3.0.0-beta1
--------------------

Vonk 3.0.0 is a major upgrade that incorporates handling FHIR R4. This runs in the same server core as FHIR STU3. See :ref:`feature_multiversion` for background info.

.. attention::

   If you have overridden the PipelineOptions in your own settings, you should review the new additions to it in the appsettings.default.json.
   In particular we added ``Vonk.Fhir.R4`` that is needed to support FHIR R4.

.. attention::

   MacOS: you may need to clean your temp folder from previous specification.zip expansions. Find the location of the temp folder by running ``echo $TMPDIR``.

Database
^^^^^^^^

#. SQL Server, SQLite: 

   #. vonk.entry got a new column 'InformationModel', set to 'Fhir3.0' for existing resources.
   #. vonk.ref got a new column 'Version'. 
   #. Database indexes have been updated accordingly.

   Vonk will automatically update both the Administration and the Data databases when you run Vonk 3.0.0.

#. MongoDb / CosmosDb: 

   #. The documents in the vonkentries collection got a new element im (for InformationModel), set to 'Fhir3.0' for existing resources. 
   #. The documents in the vonkentries collection got a new element ref.ver (for Version). 
   #. Database indexes have been updated accordingly. 

#. MongoDb / CosmosDb: Got a light mechanism of applying changes to the document structure. A single document is added to the collection for that, containing ``VonkVersion`` and ``LatestMigration``.
#. MongoDb: The default name for the main database was changed from 'vonkstu3' to 'vonkdata'. 
   If you want to continue using an existing 'vonkstu3' database, override ``MongoDbOption:DatabaseName``, see :ref:`configure_levels`.

Feature
^^^^^^^

#. Support for FHIR R4 next to FHIR STU3. Vonk will choose the correct handling based on the fhirVersion parameter in the mimetype. 
   The mimetype is read from the Accept header and (for POST/PUT) the Content-Type header. See :ref:`feature_multiversion` for background info.
#. Upgrade to HL7.Fhir.Net API 1.3, see its :ref:`releasenotes <api_releasenotes_1.3.0>`.
#. Administration API imports both STU3 and R4 conformance resources, see :ref:`conformance`

   #. Note: :ref:`Terminology operations <feature_terminology>` are still only available for STU3.
   #. Note: :ref:`Subscriptions <feature_subscription>` are still only available for STU3.

#. Conditional delete on the Administration API. It works just as on the root, see :ref:`restful_crud`.
#. Defining a custom SearchParameter on a :ref:`Custom ResourceType <feature_customresources>` is now possible.
#. Canonical uris are now recognized when searching on references (`specification <http://www.hl7.org/implement/standards/fhir/search.html#versions>`_)
#. Vonk calls ``UseIISIntegration`` for better integration with IIS (if present).

Fix
^^^

#. In the settings, PipelineOptions.Branch.Path for the root had to be ``/``. Now you can choose your own base (like e.g. ``/fhir``)
#. $meta:
   
   #. enabled on history endpoint (e.g. ``/Patient/123/_history/v1``)
   #. disabled on type and system level
   #. returned empty Parameters resource if resource had no ``meta.profile``, now returns the resources ``meta`` element.
   #. when called on a non-existing resource, returns 404 (was: empty Parameters resource)
   #. added to the CapabilityStatement

#. History on non-existing resource returned OperationOutcome instead of 404.
#. The setting for SupportedInteractions was not enforced for custom operations.
#. CapabilityStatement.name is updated from ``Vonk beta conformance`` to ``Vonk FHIR Server <version> CapabilityStatement``.
#. :ref:`feature_terminology`:

   #. $lookup did not work on GET /CodeSystem
   #. $lookup did not support the ``coding`` parameter
   #. $expand did not fill in the expansion element.
   #. Operations were not listed in the CapabilityStatement.
   #. Namespace changed to Vonk.Plugins.Terminology, and adjusted accordingly in the default PipelineOptions.

#. A SearchParameter of type token did not work on an element of type string, e.g. CodeSystem.version.
#. Search with POST was broken.
#. If a long running task is active (responsecode 423, see :ref:`conformance_import` and :ref:`feature_customsp_reindex`), the OperationOutcome reporting that will now hide issues stating that all the arguments were not supported (since that is not the cause of the error).
#. Overriding an array in the settings was hard - it would still inherit part of the base setting if the base array was longer. 
   We changed this: an array will always overwrite the complete base array.
   Note that this may trick you if you currently override a single array element with an environment variable. See :ref:`configure_levels`.
#. The element ``meta.source`` cannot be changed on subsequent updates to a resource (R4 specific)
#. SearchParameter ``StructureDefinition.ext-context`` yielded many errors in the log because the definition of the fhirpath in the specification is not correct. We provided a corrected version in errataFhir40.zip (see :ref:`feature_errata`).
#. :ref:`disable_interactions` was not evaluated for custom operations.
#. Delete of an instance accepted searchparameters on the url.
#. Transactions: references to other resources in the transaction were not updated if the resource being referenced was in the transaction as an update (PUT).
   (this error was introduced in 2.0.0).

Plugin and Facade API
^^^^^^^^^^^^^^^^^^^^^

#. A new NuGet package is introduced: Vonk.Fhir.R4.
#. ``VonkConstants`` moved to the namespace ``Vonk.Core.Common`` (was: ``Vonk.Core.Context``)
#. ``IResource.Navigator`` element is removed (was already obsolete). Instead: Turn it into an ``ITypedElement`` and use that for navigation with FhirPath.
#. ``InformationModel`` element is added to 
   
   #. ``IResource``: the model in which the resource is defined (``VonkConstants.Model.FhirR3`` or ``VonkConstants.Model.FhirR4``)
   #. ``IVonkContext``: the model that was specified in the Accept header
   #. ``IModelService``: the model for which this service is valid (implementations are available for R3 and R4)
   #. ``VonkInteraction`` attribute: to allow you to specify that an operation is only valid for a specific FHIR version.
      This can also be done in the fluent interface with the new method ``AndInformationModel``. See :ref:`components_interactionhandler`

#. Dependency injection: if there are implementations of an interface for R3 and R4, the dependency injection in Vonk will automatically inject the correct one based on the InformationModel in the request.
#. ``FhirPropertyIndexBuilder`` is moved to Vonk.Fhir.R3 (and was already marked obsolete - avoid using it)
#. Implementations of the following that are heavily dependent upon version specific Hl7.Fhir libraries have been implemented in both Vonk.Fhir.R3 and Vonk.Fhir.R4. 

   #. ``IModelService``
   #. ``IStructureDefinitionSummaryProvider`` (to add type information to an ``IResource`` and turn it into an ``ITypedElement``)
   #. ``ValidationService``

#. ``IConformanceContributor`` is changed to ``ICapabilityStatementContributor``. The methods on it have changed slightly as well because internally they now work on a version-independent model. Please review your IConformanceContributor implementations.

Examples
^^^^^^^^

#. Document plugin: 
   
   #. `Document Bundle does not contain an identifier <https://github.com/FirelyTeam/Vonk.Plugin.DocumentOperation/issues/27>`_
   #. `Missing unit test for custom resources <https://github.com/FirelyTeam/Vonk.Plugin.DocumentOperation/issues/29>`_
   #. Upgraded to Vonk 2.0.0 libraries (no, not yet 3.0.0-beta1)

#. Facade example

   #. Added support for searching directly on a reference from Observation to Patient (e.g. ``/Observation?patient=Patient/3``).
   #. Fixed support for _revinclude of Observation on Patient (e.g. ``/Patient?_revinclude:Observation:subject:Patient``).
   #. Upgraded to Vonk 2.0.0 libraries (no, not yet 3.0.0-beta1)

#. Plugin example

   #. Added examples for pre- and post handlers.

Known to-dos
^^^^^^^^^^^^

#. :ref:`feature_customsp_reindex`: does not work for R4 yet.
#. :ref:`feature_preload`: does not work for R4 yet.
#. :ref:`feature_subscription`: do not work for R4 yet.
#. :ref:`feature_terminology`: operations do not work for R4.
#. During :ref:`conformance_import`: Files in the import directory and Simplifier projects are only imported for R3.

.. _vonk_releasenotes_210:

Release 2.1.0
--------------------

Database
^^^^^^^^

#. SQL Server: Improved concurrent throughput.

Features
^^^^^^^^

#. Upgrade to HL7.Fhir.Net API 1.3, see its :ref:`releasenotes <api_releasenotes_1.3.0>`.
#. Vonk calls ``UseIISIntegration`` for better integration with IIS (if present).

Fix
^^^

#. Transactions: references to other resources in the transaction were not updated if the resource being referenced was in the transaction as an update (PUT).
   (this error was introduced in 2.0.0).

.. _vonk_releasenotes_201:

Release 2.0.1 hotfix
--------------------

Fix
^^^

#. Supported Interactions were not checked for custom operations. In the `appsettings.json` the custom operations, like $meta, were ignored. This has been fixed now.

.. _vonk_releasenotes_200:

Release 2.0.0 final
-------------------

This is the final release of version 2.0.0, so the -beta is off.
If you directly upgrade from version 1.1, please also review all the 2.0.0-beta and -beta2 release notes below.

.. attention::

   We upgraded the version of .NET Core used to 2.2. Please get the latest 2.2.x runtime from the `.NET download site <https://www.microsoft.com/net/download/core#/runtime/>`_. The update was needed for several security patches and speed improvements.

.. attention::

   The structure of the Validation section in the settings has changed. See :ref:`feature_prevalidation` for details.

.. attention::

   This version of Vonk is upgraded to the Hl7.Fhir.API version 1.2.0. Plugin- and Facade builders will transitively get this dependency through the Vonk.Core package.

Database
^^^^^^^^

No changes have been made to any of the database implementations.

Fix
^^^

#. When you created a StructureDefinition for a new resourcetype on /administration, the corresponding endpoint was not enabled. 
#. Vonk does not update references in a transaction when a conditional create is used for an existing resource.
#. Paths in PipelineOptions would interfere if one was the prefix of the other.
#. Indexing a HumanName with no values but just extensions failed.
#. The selflink in a bundle did not contain the sort parameters. In this version the selflink always contains a sort and a count parameter, even if they were not in the request and the default values have been applied.
#. The import of conformance resources from specification.zip yielded warnings on .sch files.
#. Errors introduced in the 2.0.0-beta versions:
   
   #. Syntax errors in the XML or JSON payload yielded an exception, now they are reported with an OperationOutcome upon parsing.
   #. $expand and other terminology operations caused a NullReference exception.
   #. _element did not include the mandatory elements.

Feature
^^^^^^^

#. Vonk supports Custom Resources. See :ref:`feature_customresources`.
#. Operation :ref:`feature_meta` is now supported, to quickly get the tags, security labels and profiles of a resource.
#. /metadata, retrieving the CapabilityStatement performs a lot better (just the initial call for a specific Accept-Type takes a bit longer).
#. Validation can be controlled more detailed. Choose the strictness of parsing independent of the level of validation. With this, the settings section 'Validation' has also changed. See :ref:`feature_prevalidation`. 

Plugin and Facade API
^^^^^^^^^^^^^^^^^^^^^

#. We upgraded the embedded Fhir.Net API to version 1.2, see its :ref:`release notes <api_releasenotes_1.2.0>`.
#. Together with the upgrade to .NET Core 2.2, several libraries were updated as well. Most notably Microsoft.EntityFrameworkCore.*, to 2.2.3.

.. _vonk_releasenotes_200-beta2:

Release 2.0.0-beta2
-------------------

Fix
^^^

* Fixed RelationalQuery in Vonk.Facade.Relational, so Vonk.Facade.Starter can be used again.

.. _vonk_releasenotes_200-beta:

Release 2.0.0-beta
------------------

We have refactored Vonk internally to accomodate future changes. There are only minor functional changes to the FHIR Server.
Facade and Plugin builders must be aware of a few interface changes, most notably to the IResource interface. 

This release is a *beta* release because of the many internal changes, and because we expect to include a few more in the final release. 
Have a go with it in your test environment to see whether you encounter any trouble. We also encourage you to build your plugin and/or facade against it to prepare for code changes upon the final release.

You can still access the latest final release (1.1.0):

* Binaries: through the `Simplifier downloads page <https://simplifier.net/downloads/vonk>`_, choose 'List previous versions'.
* Docker: ``docker pull simplifier/vonk:1.1.0``
* NuGet: ``<PackageReference Include="Vonk.Core" Version="1.1.0" />``

Database
^^^^^^^^

No changes have been made to any of the database implementations.

Fix
^^^

#. The :ref:`$validate <feature_validation>` operation processes the profile parameter.
#. If an update brings a resource 'back to life', Vonk returns statuscode 201 (previously it returned 200). 
#. On an initial Administration Import of specification.zip, Vonk found an error in valueset.xml. This file was fixed in the specification.zip that comes with Fhir.NET API 1.1.2.
#. Transaction: references within the transaction are automatically changed to the id's the referenced resources get from Vonk when processing the transaction. This did not happen for references inside extensions. It does now. 
#. Administration Import: an Internal Server Error could be triggered with a zip file with nested directories in it.

   * NB: Directories in your zip are still not supported because of `Fhir.NET API issue #883 <https://github.com/FirelyTeam/fhir-net-api/issues/883>`_, but Vonk will not error on it anymore.

#. Search: The entry.fullUrl for an OperationOutcome in a Search bundle had a relative url.
#. Search: Processed _elements and _summary arguments were not reported in the selflink of the bundle (or any of the paging links).
#. Search: The selflink will include a _count parameter, even if it was not part of the request and hence the default value for _count from the :ref:`BundleOptions <bundle_options>` was applied.
#. Search on :exact with an escaped comma (e.g. ``/Patient?name:exact=value1\,value2``) was executed as a choice. Now the escape is recognized, and the argument processed as one term.

Feature
^^^^^^^

#. Upgraded Fhir.NET API to version 1.1.2, see its :ref:`release notes <api_releasenotes_1.1.2>`.
#. The Vonk Administration API now allows for StructureMap and GraphDefinition resources to be loaded.
#. The opening page of Vonk (and the only UI part of it) is updated. It no longer contains links that you can only execute with Postman, and it has a button that shows you the CapabilityStatement.
#. We published our custom operations on `Simplifier <https://simplifier.net/vonk-resources>`_! And integrated those links into the CapabilityStatement.
#. You can now access older versions of the Vonk binaries through the Simplifier downloads. (This was already possible for the Docker images and NuGet packages through their respective hubs).
#. `Vonk.IdentityServer.Test <https://github.com/FirelyTeam/Vonk.IdentityServer.Test/>`_ and `Vonk.Facade.Starter <https://github.com/FirelyTeam/Vonk.Facade.Starter>`_ have been integrated into the Continuous Integration system.
#. In JSON, the order of the output has changed:
   
   #. If id and/or meta elements were added by Vonk (on a create or update), they will appear at the end of the resource.

Plugin and Facade API
^^^^^^^^^^^^^^^^^^^^^

#. IResource interface and related classes have had several changes. If you encounter problems with adapting your code, please contact us.

   * It derives from the ISourceNode interface from the Fhir.NET API.
   * Change and Currency are properties that were only relevant in the repository domain, and not in the rest of the pipeline. They have been deprecated. 
     You can access the values still with resource.GetChangeIndicator() and resource.GetCurrencyIndicator(). This is implemented with Annotations on the ISourceNode. 
     All of Vonk's own implementations retain those annotations, but if the relevant annotation is somehow missing, default values are returned (ResourceChange.NotSet resp. ResourceCurrency.Current).
   * The Navigator property is obsolete. The type of it (IElementNavigator) is obsolete in the Fhir.NET API. To run FhirPath you provide type information and run the FhirPath over an ITypedElement::

      //Have IStructureDefinitionSummaryProvider _schemaProvider injected in the constructor.
      var typed = resource.ToTypedElement(_schemaProvider);
      var matchingElements = typed.Select('your-fhirpath-expression'); 

   * Id, Version and LastUpdated can no longer be set directly on the IResource instance. IResource has become **immutable** (just like ISourceNode). The alternatives are::

      var resourceWithNewId = resource.SetId("newId");
      var resourceWithNewVersion = resource.SetVersion("newVersion");
      var resourceWithNewLastUpdated = resource.SetLastUpdated(DateTimeOffset.UtcNow);

   * Because the IChangeRepository is responsible for creating new id's and versions, we also included extensions methods on it to update all three fields at once::

      var updatedeResource = changeRepository.EnsureMeta(resource, KeepExisting.Id / Version / LastUpdated);
      var updatedResource = changeRepository.FreshMeta(resource); //replaces all three

#. The PocoResource class is obsolete. To go from a POCO (like an instance of the Patient class) to an IResource, use the ToIResource() extension method found in Vonk.Fhir.R3.
#. The PocoResourceVisitor class is obsolete. Visiting can more effectively be done on an ITypedElement::

      //Have IStructureDefinitionSummaryProvider _schemaProvider injected in the constructor.
      var typed = resource.ToTypedElement(_schemaProvider);
      typed.Visit((depth, element) => {//do what you want with element});

#. SearchOptions has changed:

   * Properties Count and Offset have been removed.
   * Instead, use _count and _skip arguments in the IArgumentCollection provided to the SearchRepository.Search method if you need to.

#. We have created a template for a plugin on `GitHub <https://github.com/FirelyTeam/Vonk.Plugin.Template>`_. Fetch it for a quick start of your plugin.

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





