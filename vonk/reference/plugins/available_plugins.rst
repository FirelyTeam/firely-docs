.. _vonk_available_plugins:

Plugins available for Vonk
==========================

.. _vonk_plugins_infra:

Infrastructural plugins
-----------------------

.. _vonk_plugins_scheduler:

:Name: Scheduler
:Configuration: ``Vonk.Core.Quartz.QuartzConfiguration``
:License token: Vonk.Plugins.Core.Infra
:Order: 10
:Description: Registers a scheduler that can run jobs periodically. You can use this yourself, but with care (you don't want jobs slowing down the server):
   
   * Implement a ``Quartz.IJob``, let's say with class MyJob {...}
   * Have the ``Quartz.IScheduler`` injected
   * Call ``IScheduler.StartJob<MyJob>(TimeSpan runInterval, CancellationToken cancellationToken)``

.. _vonk_plugins_maintenance:

:Name: Maintenance
:Configuration: ``Vonk.Core.Infra.MaintenanceConfiguration``
:License token: Vonk.Plugins.Core.Infra
:Order: 20
:Description: Periodically cleans the indexed values for deleted or superceded resources from the database.

.. _vonk_plugins_license:

:Name: License
:Configuration: ``Vonk.Core.Licensing.LicenseConfiguration``
:License token: Vonk.Plugins.Core.Infra
:Order: 120
:Description: Registers the LicenseService that checks for a valid license. Without this plugin Vonk does not work.

.. _vonk_plugins_serialization:

:Name: Serialization
:Configuration: ``Vonk.Core.Serialization.SerializationConfiguration``
:License token: Vonk.Plugins.Core.Infra
:Order: 130
:Description: Registers an implementation for the ``ISerializationService`` and ``ISerializationSupport`` interfaces and actual serializers and parsers for JSON and XML.

.. _vonk_plugins_pluggability:

:Name: Pluggability
:Configuration: ``Vonk.Core.Pluggability.PluggabilityConfiguration``
:License token: Vonk.Plugins.Core.Infra
:Order: 150
:Description: Registers services to dynamically build the ``IModelService`` using registered ``IModelContributor`` implementations.

.. _vonk_plugins_httptovonk:

:Name: Http to Vonk
:Configuration: ``Vonk.Core.Context.Http.HttpToVonkConfiguration``
:License token: Vonk.Plugins.Core.Http
:Order: 1110
:Description: Builds an :ref:`vonk_reference_api_ivonkcontext` out of the `HttpContext <https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.httpcontext?view=aspnetcore-3.0>`_. You can only access the IVonkContext in the pipeline from plugins that have a higher order.

.. _vonk_plugins_vonktohttp:

:Name: Vonk to Http
:Configuration: ``Vonk.Core.Context.Http.VonkToHttpConfiguration``
:License token: Vonk.Plugins.Core.Http
:Order: 1120
:Description: Translates the response in the :ref:`vonk_reference_api_ivonkcontext` to a response on the `HttpContext <https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.http.httpcontext?view=aspnetcore-3.0>`_. It honors the value of the prefer header if present. It also adds the VonkExceptionMiddleware to the pipeline as a last resort for catching exceptions.

.. _vonk_plugins_formatter:

:Name: Formatter
:Configuration: ``Vonk.Core.Context.Format.FormatConfiguration``
:License token: Vonk.Plugins.Core.Infra
:Order: 1130
:Description: Registers an implementation of IFormatter that can write the ``IVonkContext.Response.Payload`` to the response body in the requested format. Does not add a processor to the pipeline.

.. _vonk_plugins_longrunning:

:Name: Long running tasks
:Configuration: ``Vonk.Core.Infra.LongRunning.LongRunningConfiguration``
:License token: Vonk.Plugins.Core.Infra
:Order: 1170
:Description: If Vonk processes a task that could lead to inconsistent output, all other requests are rejected by this plugin. Long running tasks are e.g. the :ref:`conformance_import` and :ref:`feature_customsp_reindex`.

.. _vonk_plugins_compartments:

:Name: Compartments
:Configuration: ``Vonk.Core.Context.Features.CompartmentsConfiguration``
:License token: Vonk.Plugins.Core.Search
:Order: 1210
:Description: Recognizes a compartment in a compartment search on system or type level (see :ref:`restful_search`). It is added as a feature of type ``ICompartment`` to the ``IVonkContext.Features`` collection, to be used by :ref:`Search <vonk_plugins_search>` later on. This ICompartment feature will limit all queries to within the specified compartment.

.. _vonk_plugins_supportedinteractions:

:Name: Supported Interactions
:Configuration: ``Vonk.Core.Context.Guards.SupportedInteractionsConfiguration``
:License token: Vonk.Plugins.Core.Infra
:Order: 1220
:Description: Blocks interactions that are not listed as supported.
:Options: ``SupportedInteractions``, see :ref:`disable_interactions`.

.. _vonk_plugins_sizelimits:

:Name: Size Limits
:Configuration: ``Vonk.Core.Context.Guards.SizeLimitsConfiguration``
:License token: Vonk.Plugins.Core.Infra
:Order: 1225
:Description: Rejects bodies that are too large and bundles with too many entries.
:Options: ``SizeLimits``, see :ref:`sizelimits_options`

.. _vonk_plugins_urlmapping:

:Name: Url mapping
:Configuration: ``Vonk.Core.Context.UrlMapping.UrlMappingConfiguration``
:License token: Vonk.Plugins.Core.Infra
:Order: 1230
:Description: In a resource in the request, urls pointing to this instance of Vonk are made relative. In a resource in the response, relative urls are made absolute, by adding the base url of the server. This way the server can be addressed in multiple ways (e.g. http://intranet.acme.com/fhir and https://fhir.acme.com) and still provide correct absolute urls. 

.. _vonk_plugins_defaultshapes:

:Name: Default Shapes
:Configuration: ``Vonk.Core.Context.Guards.DefaultShapesConfiguration``
:License token: Vonk.Plugins.Core.Infra
:Order: 4110
:Description: If no sort order is given for a search, ``_lastUpdated:asc`` is added. If no count is given for a search, ``_count=<default count>`` is added.
:Options: ``BundleOptions.DefaultCount``, see :ref:`bundle_options`.

.. _vonk_plugins_fhir_versions:

Support for different FHIR versions
-----------------------------------

.. _vonk_plugins_fhir_r3:

:Name: FHIR R3
:Configuration: ``Vonk.Fhir.R3.FhirR3Configuration``
:License token: Vonk.Plugins.FhirR3
:Order: 100
:Description: Registers services to support FHIR STU3 (or R3).

:Name: FHIR R3 Specification
:Configuration: ``Vonk.Fhir.R3.FhirR3SpecificationConfiguration``
:License token: Vonk.Plugins.FhirR3
:Order: 112
:Description: Registers an ``Hl7.Fhir.Specification.IStructureDefinitionSummaryProvider`` for FHIR STU3 (or R3).

.. _vonk_plugins_fhir_r4:

:Name: FHIR R4
:Configuration: ``Vonk.Fhir.R4.FhirR4Configuration``
:License token: Vonk.Plugins.FhirR4
:Order: 101
:Description: Registers services to support FHIR R4.

:Name: FHIR R4 Specification
:Configuration: ``Vonk.Fhir.R4.FhirR4SpecificationConfiguration``
:License token: Vonk.Plugins.FhirR4
:Order: 112
:Description: Registers an ``Hl7.Fhir.Specification.IStructureDefinitionSummaryProvider`` for FHIR R4.

.. _vonk_plugins_rest:

FHIR RESTful interactions
-------------------------

.. _vonk_plugins_read:

:Name: Read
:Configuration: ``Vonk.Core.Operations.Crud.ReadConfiguration``
:License token: Vonk.Plugins.Read
:Description: Implements FHIR instance read. It will return the Resource that matches the id *and* the FHIR version. If a Resource with matching id is found with another FHIR version you are notified.

.. _vonk_plugins_create:

:Name: Create
:Configuration: ``Vonk.Core.Operations.Crud.CreateConfiguration``
:License token: Vonk.Plugins.Create
:Description: Implements FHIR type create.

.. _vonk_plugins_update:

:Name: Update
:Configuration: ``Vonk.Core.Operations.Crud.UpdateConfiguration``
:License token: Vonk.Plugins.Update
:Description: Implements FHIR instance update, with support for 'upsert': creating a Resource with a pre-assigned id. Note that id's must be unique across FHIR versions.

.. _vonk_plugins_delete:

:Name: Delete
:Configuration: ``Vonk.Core.Operations.Crud.DeleteConfiguration``
:License token: Vonk.Plugins.Delete
:Description: Implements FHIR instance delete. Since id's in Vonk must be unique across FHIR versions, the delete is issued on the provided id, regardless of the FHIR version.

.. _vonk_plugins_search:

:Name: Search
:Configuration: ``Vonk.Core.Operations.Search.SearchConfiguration``
:License token: Vonk.Plugins.Search
:Description: Implements FHIR Search on system and type level. For data access it uses the registered implementation of ISearchRepository, which can be any of the implementations provided by Vonk or an implementation provided by a Facade plugin. The implementations provided by Vonk also require the Index plugin to extract searchparameter values from the resources.
:Options: 
   * ``AdministrationImportOptions``, see :ref:`configure_admin_import`, for available Searchparameters
   * ``SupportedModel.RestrictToSearchParameters``, see :ref:`supportedmodel` for available Searchparameters
   * ``BundleOptions``, see :ref:`bundle_options`, for number of returned results
   
   See :ref:`vonk_reference_api_isearchrepository` and :ref:`vonk_facade`.

:Name: Search support
:Configuration: ``Vonk.Core.Repository.RepositorySearchSupportConfiguration``
:License token: Vonk.Plugins.Search
:Description: Registers services required for Search. It is automatically registered by Search.

.. _vonk_plugins_index:

:Name: Index
:Configuration: ``Vonk.Core.Repository.RepositoryIndexSupportConfiguration``
:License token: Vonk.Plugins.Index
:Description: Extracts values matching Searchparameters from resources, so they can be searched on.

.. _vonk_plugins_include:

:Name: Include
:Configuration: ``Vonk.Core.Operations.Search.IncludeConfiguration``
:License token: Vonk.Plugins.Include
:Description: Implements ``_include`` and ``_revinclude``. This acts on the result bundle of a search. Therefore it also works out of the box for Facade implementations, provided that the Facade implements support for the reference Searchparameters that are used in the _(rev)include.

.. _vonk_plugins_elements:

:Name: Elements
:Configuration: ``Vonk.Core.Context.Elements.ElementsConfiguration``
:License token: Vonk.Plugins.Search
:Order: 1240
:Description: Applies the ``_elements`` parameter to the Resource that is in the response (single resource or bundle).

.. _vonk_plugins_summary:

:Name: Summary
:Configuration: ``Vonk.Core.Context.Elements.SummaryConfiguration``
:License token: Vonk.Plugins.Search
:Order: 1240
:Description: Applies the ``_summary`` parameter to the Resource that is in the response (single resource or bundle).

.. _vonk_plugins_history:

:Name: History
:Configuration: ``Vonk.Core.Operations.History.HistoryConfiguration``
:License token: Vonk.Plugins.History
:Description: Implements ``_history`` on system, type and instance level.
:Options: ``BundleOptions``, see :ref:`bundle_options`

.. _vonk_plugins_versionread:

:Name: Version Read
:Configuration: ``Vonk.Core.Operations.History.VersionReadConfiguration``
:License token: Vonk.Plugins.History
:Description: Implements reading a specific version of a resource (``<base>/Patient/123/_history/v3``).

.. _vonk_plugins_capability:

:Name: Capability
:Configuration: ``Vonk.Core.Operations.Capability.CapabilityConfiguration``
:License token: Vonk.Plugins.Capability
:Description: Provides the CapabilityStatement on the ``<base>/metadata`` endpoint. The CapabilityStatement is tailored to the FHIR version of the request. The CapabilityStatement is built dynamically by visiting all the registered implementations of ICapabilityStatementContributor, see :ref:`vonk_architecture_capabilities`.

.. _vonk_plugins_conditional_create:

:Name: Conditional Create
:Configuration: ``Vonk.Core.Operations.ConditionalCrud.ConditionalCreateConfiguration``
:License token: Vonk.Plugins.ConditionalCreate
:Description: Implements FHIR conditional create.

.. _vonk_plugins_conditional_update:

:Name: Conditional Update
:Configuration: ``Vonk.Core.Operations.ConditionalCrud.ConditionalUpdateConfiguration``
:License token: Vonk.Plugins.ConditionalUpdate
:Description: Implements FHIR conditional update.

.. _vonk_plugins_conditional_delete:

:Name: Conditional Delete
:Configuration: ``Vonk.Core.Operations.ConditionalCrud.ConditionalDeleteConfiguration``
:License token: Vonk.Plugins.ConditionalDelete
:Description: Implements FHIR conditional delete.
:Options: ``FhirCapabilities.ConditionalDeleteOptions``, see :ref:`fhir_capabilities`

.. _vonk_plugins_validation:

:Name: Validation
:Configuration: ``Vonk.Core.Operations.Validation.ValidationConfiguration``
:License token: Vonk.Plugins.Validation
:Description: Implements `FHIR $validate <http://hl7.org/fhir/R4/resource-operation-validate.html>`_ on type and instance level for POST: ``POST <base>/Patient/$validate`` or ``POST <base>/Patient/123/$validate``.

.. _vonk_plugins_instance_validation:

:Name: Instance Validation
:Configuration: ``Vonk.Core.Operations.Validation.InstanceValidationConfiguration``
:License token: Vonk.Plugins.Validation
:Description: Implements `FHIR $validate <http://hl7.org/fhir/R4/resource-operation-validate.html>`_ on instance level for GET: ``GET <base>/Patient/123/$validate``

.. _vonk_plugins_structural_validation:

:Name: Structural Validation
:Configuration: ``Vonk.Core.Operations.Validation.StructuralValidationConfiguration``
:License token: Vonk.Plugins.Validation
:Description: Validates the structure of resources sent to Vonk (is it valid FHIR JSON or XML?).

.. _vonk_plugins_prevalidation:

:Name: Prevalidation
:Configuration: ``Vonk.Core.Operations.Validation.PreValidationConfiguration``
:License token: Vonk.Plugins.Validation
:Description: Validates resources sent to Vonk against their stated profile compliance (in Resource.meta.profile). The strictness of the validation is controlled by the options.
:Options: ``Validation``, see :ref:`validation_options`

.. _vonk_plugins_profile_filter:

:Name: Profile filter
:Configuration: ``Vonk.Core.Operations.Validation.ProfileFilterConfiguration``
:License token: Vonk.Plugins.Validation
:Description: Blocks resources that do not conform to a list of profiles.
:Options: ``Validation.AllowedProfiles``, see :ref:`validation_options`

.. _vonk_plugins_meta:

:Name: Meta
:Configuration: ``Vonk.Core.Operations.MetaOperation.MetaConfiguration``
:License token: Vonk.Plugins.Meta
:Description: Implements FHIR $meta and $meta-add on instance level.

.. _vonk_plugins_snapshot:

:Name: Snapshot Generation
:Configuration: ``Vonk.Core.Operations.SnapshotGeneration.SnapshotGenerationConfiguration``
:License token: Vonk.Plugins.SnapshotGeneration
:Description: Implements `FHIR $snapshot <http://hl7.org/fhir/R4/structuredefinition-operation-snapshot.html>`_ on a type level: ``POST <base>/administration/StructureDefinition/$snapshot``.

.. _vonk_plugins_batch:

:Name: Batch
:Configuration: ``Vonk.Core.Operations.Transaction.FhirBatchConfiguration``
:License token: Vonk.Plugins.Batch
:Description: Processes a batch Bundle by sending each entry through the rest of the processing pipeline and gathering the results.
:Options: ``SizeLimits``, see :ref:`sizelimits_options`

.. _vonk_plugins_transaction:

:Name: Transaction
:Configuration: ``Vonk.Core.Operations.Transaction.FhirTransactionConfiguration``
:License token: Vonk.Plugins.Transaction
:Description: Process a transaction Bundle by sending each entry through the rest of the processing pipeline and gathering the results. Different from Batch, Transaction succeeds or fails as a whole. Transaction requires an implementation of ``Vonk.Core.Repository.IRepoTransactionService`` for transaction support by the underlying repository. The SQL Server and SQLite implementations provides a real one, whereas the MongoDb provides a simulated implementation, to allow you to experiment with transactions on MongoDb.
:Options: 
   * ``SizeLimits``, see :ref:`validation_options`
   * ``Repository``, see :ref:`configure_repository`

.. _vonk_plugins_terminology:

Terminology
-----------

The Terminology plugins are currently only implemented for FHIR STU3.

.. _vonk_plugins_codesystem_lookup:

:Name: CodeSystem Lookup
:Configuration: ``Vonk.Plugins.Terminology.CodeSystemLookupConfiguration``
:License token: Vonk.Plugins.Terminology
:Description: Implements FHIR `$lookup <http://hl7.org/fhir/STU3/codesystem-operation-lookup.html>`_ on type level requests: ``POST <base>/administration/CodeSystem/$lookup`` or ``GET <base>/administration/CodeSystem/$lookup?...``

.. _vonk_plugins_codesystem_compose:

:Name: CodeSystem Compose on Type
:Configuration: ``Vonk.Plugins.Terminology.CodeSystemComposeTypeConfiguration``
:License token: Vonk.Plugins.Terminology
:Description: Implements FHIR `$compose <http://hl7.org/fhir/STU3/codesystem-operation-compose.html>`_ on type level requests: ``POST <base>/administration/CodeSystem/$compose``

:Name: CodeSystem Compose on Instance
:Configuration: ``Vonk.Plugins.Terminology.CodeSystemComposeInstanceConfiguration``
:License token: Vonk.Plugins.Terminology
:Description: Implements FHIR `$compose <http://hl7.org/fhir/STU3/codesystem-operation-compose.html>`_ on instance level requests: ``POST <base>/administration/CodeSystem/[id]/$compose`` or ``GET <base>/administration/CodeSystem/[id]/$compose?...``

.. _vonk_plugins_valueset_validatecode:

:Name: ValueSet Validate Code on Type
:Configuration: ``Vonk.Plugins.Terminology.ValueSetValidateCodeTypeConfiguration``
:License token: Vonk.Plugins.Terminology
:Description: Implements FHIR `$validate-code <http://hl7.org/fhir/STU3/codesystem-operation-validate-code.html>`_ on type level requests: ``POST <base>/administration/ValueSet/$validate-code``

:Name: ValueSet Validate Code on Instance
:Configuration: ``Vonk.Plugins.Terminology.ValueSetValidateCodeInstanceConfiguration``
:License token: Vonk.Plugins.Terminology
:Description: Implements FHIR `$validate-code <http://hl7.org/fhir/STU3/codesystem-operation-validate-code.html>`_ on instance level requests: ``GET <base>/administration/ValueSet/[id]/$validate-code?...`` and ``POST <base>/administration/ValueSet/[id]/$validate-code``

.. _vonk_plugins_valueset_expand:

:Name: ValueSet Expand on Instance
:Configuration: ``Vonk.Plugins.Terminology.ValueSetExpandCodeInstanceConfiguration``
:License token: Vonk.Plugins.Terminology
:Description: Implements FHIR `$expand <http://hl7.org/fhir/STU3/codesystem-operation-expand.html>`_ on instance level requests: ``GET <base>/administration/ValueSet/[id]/$expand?...`` and ``POST <base>/administration/ValueSet/[id]/$expand``

:Name: ValueSet Expand on Type
:Configuration: ``Vonk.Plugins.Terminology.ValueSetExpandCodeTypeConfiguration``
:License token: Vonk.Plugins.Terminology
:Description: Implements FHIR `$expand <http://hl7.org/fhir/STU3/codesystem-operation-expand.html>`_ on type level requests: ``POST <base>/administration/ValueSet/$expand``

.. _vonk_plugins_smart:

SMART on FHIR
-------------

:Name: SMART on FHIR
:Configuration: ``Vonk.Smart.SmartConfiguration.SmartConfiguration``
:License token: Vonk.Plugins.SmartOnFhir
:Description: Implements SMART on FHIR authentication and authorization, see :ref:`feature_accesscontrol`. 

.. _vonk_plugins_subscriptions:

Subscriptions
-------------

:Name: Subscriptions
:Configuration: ``Vonk.Subscriptions.SubscriptionConfiguration.SubscriptionConfiguration``
:License token: Vonk.Plugins.Subscriptions
:Description: Implements the FHIR Subscriptions framework, see :ref:`feature_subscription`. 

.. _vonk_plugins_demoui:

Demo UI
-------

:Name: Demo UI
:Configuration: ``Vonk.UI.Demo.DemoUIConfiguration.DemoUIConfiguration``
:License token: Vonk.Plugins.DemoUI
:Description: Provides the landing page that you see when you request the base url from a browser. If you want to provide your own landing page, replace this plugin with your own. There is an example of that, see :ref:`vonk_plugins_landingpage`.

.. _vonk_plugins_document:

Documents
---------

.. _vonk_plugins_documentoperation:

:Name: Document generation
:Configuration: ``Vonk.Plugins.DocumentOperation.DocumentOperationConfiguration``
:License token: Vonk.Plugins.Document
:Order: 4900
:Description: Implements FHIR `$document <http://hl7.org/fhir/R4/composition-operation-document.html>`_ : ``POST <base>/Composition/$document`` or ``GET <base>/Composition/[id]/$document``
:Code: `GitHub <https://github.com/FirelyTeam/Vonk.Plugin.DocumentOperation>`_

.. _vonk_plugins_documentsigning:

:Name: Document signing
:Configuration: ``Vonk.Plugins.SignatureService.SignatureConfiguration``
:License token: Vonk.Plugins.Signature
:Order: 4899
:Description: Signs a document generated by :ref:`$document <vonk_plugins_documentoperation>`.

.. _vonk_plugins_convert:

Conversion
----------

:Name: Format conversion
:Configuration: ``Vonk.Plugins.ConvertOperation.ConvertOperationConfiguration``
:License token: Vonk.Plugins.Convert
:Order: 4600
:Description: Implements FHIR `$convert <http://hl7.org/fhir/R4/resource-operation-convert.html>`_ : ``POST <base>/$convert`` to convert between JSON and XML representation.

.. _vonk_plugins_binary:

Binary
------

.. _vonk_plugins_binarywrapper:

:Name: Binary wrapper
:Configuration: ``Vonk.Plugins.BinaryWrapper.BinaryWrapperConfiguration``
:License token: Vonk.Plugins.BinaryWrapper
:Order: 1112
:Description: Wraps an incoming binary format in a Binary resource for further processing by the pipeline.

.. _vonk_plugins_mapping:

Transformation and mapping
--------------------------

:Name: Mapping engine
:Configuration: ``Vonk.Plugins.Transform.TransformConfiguration``
:License token: Vonk.Plugins.Mapping
:Order: 4560
:Description: Implements FHIR `$transform <http://hl7.org/fhir/R4/structuremap-operation-transform.html>`_ : ``POST <base>/administration/StructureMap/$transform`` or ``POST <base>/administration/StructureMap/[id]/$transform``. See :ref:`mappingengine_index`.

.. _vonk_plugins_repository:

Repository implementations
--------------------------

.. TODO: Memory, SQL, SQLite, MongoDb, CosmosDb
