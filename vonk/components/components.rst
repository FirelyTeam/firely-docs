.. _vonk_components:

Vonk FHIR Components
====================

.. toctree::
   :maxdepth: 1
   :titlesonly:

   example_landingpage

Vonk FHIR Components is the means to adjust a Vonk FHIR Server to your own special needs, beyond the configuration.
Vonk FHIR Server is built as a pipeline of middleware, see :ref:`architecture` for more background on that.
Vonk FHIR Components allows you to put components of your own into that pipeline, and remove components that you do not need.
This page gives a brief overview of how you can do this.

.. warning::

   Vonk FHIR Components and the PipelineOptions described below are in their early stages of development. 
   This means you may encounter rough edges, parts of the programming interface may still change and the 
   PipelineOptions themselves may still change. 
   Especially the use of Vonk FHIR Components for building a Facade in combination with the Administration API will get a lot of attention in upcoming releases.
   All changes will be announced in the :ref:`vonk_releasenotes`.
   You are encouraged to try Vonk FHIR Components, but not rely on it for production use yet.

.. _vonk_components_config:

Configuration of the pipeline with PipelineOptions
--------------------------------------------------

Configuration of the pipeline in Vonk FHIR Server is done with the PipelineOptions. A default setup is installed with Vonk in appsettings.default.json, and it looks like this:
::

  "PipelineOptions": {
    "PluginDirectory": "./plugins",
    "Branches": [
      {
        "Path": "/",
        "Include": [
          "Vonk.Core",
          "Vonk.Fhir.R3",
          "Vonk.Repository.Sql",
          "Vonk.Repository.MongoDb",
          "Vonk.Repository.Memory",
          "Vonk.Subscription",
          "Vonk.UI.Demo"
        ],
        "Exclude": [
        ]
      },
      {
        "Path": "/administration",
        "Include": [
          "Vonk.Core.Context",
          "Vonk.Core.Infra",
          "Vonk.Repository.Sql",
          "Vonk.Repository.MongoDb",
          "Vonk.Repository.Memory",
          "Vonk.Core.Operations.Terminology",
          "Vonk.Administration"
        ],
        "Exclude": [
        ]
      }
    ]
  }

PluginDirectory:
   You can put plugins of your own (or third party) into this directory for Vonk to pick them up, without polluting the Vonk binaries directory itself. The directory in the default setting of ./plugins is not created upon install, you may do this yourself if you want to add a plugin.
Branches:
   A web application can branch into different paths, and Vonk has two by default:

   * /: the root branch, where the main :ref:`restful` is hosted;
   * /administration: where the :ref:`administration_api` is hosted.
 
   ``Branches`` contains a subdocument for each of the defined paths:
   
   Path
      The path for this branch. This is the part after the base URL that Vonk is hosted on.
   Include
      (Prefixes of) :ref:`vonk_components_configclass` that add services and middleware to Vonk.
   Exclude
      (Prefixes of) :ref:`vonk_components_configclass` that may not be executed. ``Exclude`` overrides ``Include`` and is useful if you want to use all but one configuration classes from a namespace.

.. _vonk_components_configclass:

Configuration classes
---------------------

A configuration class is a static class with two public static methods having the signature as below, that can add services to the Vonk FHIR Server dependency injection system, and add middleware to the pipeline.

.. code-block:: csharp

   [VonkConfiguration (order: xyz)] //xyz is an integer
   public static class MyVonkConfiguration
   {
      public static void ConfigureServices(IServiceCollection services)
      {
         //add services here to the DI system of ASP.NET Core
      }

      public static void Configure(IApplicationBuilder builder)
      {
         //add middleware to the pipeline being built with the builder
      }
   }

As you may have noticed, the methods resemble those in an ASP.NET Core Startup class. That is exactly where they are ultimately called from. We'll explain each of the parts in more detail.

:VonkConfiguration: This is an attribute defined by Vonk (package Vonk.Core, namespace Vonk.Core.Pluggability). It tells Vonk to execute the methods in this configuration class.
   The ``order`` property determines where in the pipeline the middleware will be added. You can see the order of the components in the :ref:`log<vonk_components_log_pipeline>` at startup.
:MyVonkConfiguration: You can give the class any name you want, it will be recognized by Vonk through the attribute, not the classname. We do advise you to choose a name that actually describes what is configured.
   It is also better to have multiple smaller configuration classes than one monolith adding all your components, so you allow yourself to configure your components individually afterwards.
:ConfigureServices: The main requirements for this method are:

   * It is public static;
   * It has a first formal argument of type ``Microsoft.Extensions.DependencyInjection.IServiceCollection``;
   * It is the only method in this class matching the first two requirements.

   This also means that you can give it a different name.
   Beyond that, you may add formal arguments for services that you need during configuration. You can only use services that are available from the ASP.NET Core hosting process, not any services you have added yourself earlier. Usual services to request are:

   * IConfiguration  
   * IHostingEnvironment

   These services will be injected automatically by Vonk.
:Configure: The main requirements for this method are:

   * It is public static;
   * It has a first formal argument of type ``Microsoft.AspNetCore.Buider.IApplicationBuilder``;
   * It is the only method in this class matching the first two requirements.

   This also means that you can give it a different name.
   Beyond that, you may add formal arguments for services that you may need during configuration. Here you can use services that are available from the ASP.NET Core hosting process *and* any services you have added yourself earlier. For services in request scope please note that this method is not run in request scope.
   These services will be injected automatically by Vonk.

We provided an :ref:`example<vonk_components_landingpage>` of this: creating your own landing page.

.. _vonk_components_log_detail:

Detailed logging of loading components
--------------------------------------

If your component or any of the Vonk components appears not to be loaded correctly, you may inspect what happens in more detail in the log. See :ref:`configure_log` for where you can find the log file.
You can vary the log level for ``Vonk.Core.Pluggability.VonkConfigurer`` to hide or reveal details.

.. _vonk_components_log_assemblies:

On the ``Information`` level, Vonk will tell you which assemblies are loaded and searched for ``VonkConfiguration`` attributes:

::

   Looking for Configuration in these assemblies:
      C:\data\dd18\vonk_preview\Vonk.Administration.Api.dll
      C:\data\dd18\vonk_preview\Vonk.Core.dll
      C:\data\dd18\vonk_preview\Vonk.Fhir.R3.dll
      C:\data\dd18\vonk_preview\Vonk.Repository.Generic.dll
      C:\data\dd18\vonk_preview\Vonk.Repository.Memory.dll
      C:\data\dd18\vonk_preview\Vonk.Repository.MongoDb.dll
      C:\data\dd18\vonk_preview\Vonk.Repository.Sql.dll
      C:\data\dd18\vonk_preview\vonk.server.dll
      C:\data\dd18\vonk_preview\Vonk.Server.PrecompiledViews.dll
      C:\data\dd18\vonk_preview\Vonk.Smart.dll
      C:\data\dd18\vonk_preview\Vonk.Subscriptions.dll
      C:\data\dd18\vonk_preview\Vonk.UI.Demo.dll
      C:\data\dd18\vonk_preview\plugins\Visi.Repository.dll
      C:\data\dd18\vonk_preview\plugins\Vonk.Facade.Relational.dll

.. _vonk_components_log_pipeline:

Also on the ``Information`` level, Vonk will show the services and middleware as it has loaded, in order.
The list below is also the default pipeline as it is configured for Vonk FHIR Server.

::

   Configuration:
   /
      FhirR3Configuration [100] | Services: V | Pipeline: X
      MetadataConfiguration [110] | Services: V | Pipeline: X
      LicenseConfiguration [120] | Services: V | Pipeline: X
      SerializationConfiguration [130] | Services: V | Pipeline: X
      RepositorySearchSupportConfiguration [140] | Services: V | Pipeline: X
      RepositoryIndexSupportConfiguration [141] | Services: V | Pipeline: X
      PluggabilityConfiguration [150] | Services: V | Pipeline: X
      ViSiConfiguration [240] | Services: V | Pipeline: X
      DemoUIConfiguration [800] | Services: V | Pipeline: V
      VonkToHttpConfiguration [1110] | Services: V | Pipeline: V
      VonkFeaturesExtensions [1120] | Services: X | Pipeline: V
      FormatConfiguration [1130] | Services: V | Pipeline: V
      LongRunningConfiguration [1170] | Services: V | Pipeline: V
      VonkCompartmentsExtensions [1210] | Services: X | Pipeline: V
      SupportedInteractionConfiguration [1220] | Services: V | Pipeline: V
      UrlMappingConfiguration [1230] | Services: V | Pipeline: V
      ElementsConfiguration [1240] | Services: V | Pipeline: V
      FhirBatchConfiguration [3110] | Services: V | Pipeline: V
      FhirTransactionConfiguration [3120] | Services: V | Pipeline: V
      SubscriptionConfiguration [3200] | Services: V | Pipeline: V
      ValidationConfiguration [4000] | Services: V | Pipeline: V
      DefaultShapesConfiguration [4110] | Services: V | Pipeline: V
      CapabilityConfiguration [4120] | Services: V | Pipeline: V
      IncludeConfiguration [4210] | Services: V | Pipeline: X
      SearchConfiguration [4220] | Services: V | Pipeline: V
      ProfileFilterConfiguration [4310] | Services: V | Pipeline: V
      PrevalidationConfiguration [4320] | Services: V | Pipeline: V
      ReadConfiguration [4410] | Services: V | Pipeline: V
      CreateConfiguration [4420] | Services: V | Pipeline: V
      UpdateConfiguration [4430] | Services: V | Pipeline: V
      DeleteConfiguration [4440] | Services: V | Pipeline: V
      ConditionalCreateConfiguration [4510] | Services: V | Pipeline: V
      ConditionalUpdateConfiguration [4520] | Services: V | Pipeline: V
      ConditionalDeleteConfiguration [4530] | Services: V | Pipeline: V
      HistoryConfiguration [4610] | Services: V | Pipeline: V
      VersionReadConfiguration [4620] | Services: V | Pipeline: V
      InstanceValidationConfiguration [4840] | Services: V | Pipeline: V
      SnapshotGenerationConfiguration [4850] | Services: V | Pipeline: V
   /administration
      SqlVonkConfiguration [220] | Services: V | Pipeline: X
      SqlAdministrationConfiguration [221] | Services: V | Pipeline: X
      DatabasePluggabilityConfiguration [300] | Services: V | Pipeline: X
      VonkToHttpConfiguration [1110] | Services: V | Pipeline: V
      VonkFeaturesExtensions [1120] | Services: X | Pipeline: V
      FormatConfiguration [1130] | Services: V | Pipeline: V
      SecurityConfiguration [1150] | Services: V | Pipeline: V
      AdministrationOperationConfiguration [1160] | Services: V | Pipeline: V
      LongRunningConfiguration [1170] | Services: V | Pipeline: V
      VonkCompartmentsExtensions [1210] | Services: X | Pipeline: V
      SupportedInteractionConfiguration [1220] | Services: V | Pipeline: V
      UrlMappingConfiguration [1230] | Services: V | Pipeline: V
      ElementsConfiguration [1240] | Services: V | Pipeline: V
      DefaultShapesConfiguration [4110] | Services: V | Pipeline: V
      AdministrationSearchConfiguration [4221] | Services: V | Pipeline: V
      ValidationConfiguration [4310] | Services: V | Pipeline: X
      SubscriptionValidationConfiguration [4330] | Services: V | Pipeline: V
      ChangeInterceptionConfiguration [4390] | Services: X | Pipeline: V
      AdministrationReadConfiguration [4411] | Services: V | Pipeline: V
      AdministrationCreateConfiguration [4421] | Services: V | Pipeline: V
      AdministrationUpdateConfiguration [4431] | Services: V | Pipeline: V
      AdministrationDeleteConfiguration [4441] | Services: V | Pipeline: V
      AdministrationImportConfiguration [5000] | Services: V | Pipeline: V
      CodeSystemLookupConfiguration [5110] | Services: V | Pipeline: V
      ValueSetValidateCodeInstanceConfiguration [5120] | Services: V | Pipeline: V
      ValueSetValidateCodeTypeConfiguration [5130] | Services: V | Pipeline: V
      ValueSetExpandInstanceConfiguration [5140] | Services: V | Pipeline: V
      ValueSetExpandTypeConfiguration [5150] | Services: V | Pipeline: V
      CodeSystemComposeInstanceConfiguration [5160] | Services: V | Pipeline: V
      CodeSystemComposeTypeConfiguration [5170] | Services: V | Pipeline: V

It shows all the configuration classes it found, and whether a ConfigureServices and / or a Configure method was found and executed.
It also displays the value of the ``order`` property of the ``VonkConfiguration`` attribute for each configuration class.
This allows you to determine an appropriate order for your own configuration class.

.. _vonk_components_log_includes:

On the ``Verbose`` level, Vonk will also tell you why each configuration class that is found is being included or excluded. An example:

::

   2018-07-02 12:58:10.586 +02:00 [Vonk] [Verbose] [Machine: XYZ] [ReqId: ] Searching for configurations in assembly "Vonk.Core, Version=0.7.0.0, Culture=neutral, PublicKeyToken=null"
   2018-07-02 12:58:10.625 +02:00 [Vonk] [Verbose] [Machine: XYZ] [ReqId: ] "Vonk.Core.Serialization.SerializationConfiguration" was included on "/" because it matches the include "Vonk.Core"
   2018-07-02 12:58:10.625 +02:00 [Vonk] [Verbose] [Machine: XYZ] [ReqId: ] "Vonk.Core.Serialization.SerializationConfiguration" was not included on "/administration" because it did not match any include
