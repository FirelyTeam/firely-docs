.. _facadestart:

Build your first Facade
=======================

In this exercise you will use Vonk FHIR Facade libraries to build an ASP.NET Core Web API implementing a FHIR RESTful API on top of an existing database.

The existing database contains two simple tables 'Patient' and 'BloodPressure'. In the exercise we refer to it as the 'ViSi' system, short for 'VitalSigns'.

Prerequisites
-------------

#. Experience with programming ASP.NET (Core) web applications. If neccessary take a look at the `Fundamentals <https://docs.microsoft.com/en-us/aspnet/core/fundamentals/?tabs=aspnetcore2x>`_.
#. Basic understanding of the `FHIR RESTful API <http://www.hl7.org/implement/standards/fhir/http.html>`_ and FHIR servers.
#. Git client of your choice
#. Visual Studio 2017
   
   #. get a free community edition at https://www.visualstudio.com/downloads/ 
   #. be sure to select the components for C# ASP.NET Core web development

#. .NET Core 2.0 SDK, from https://www.microsoft.com/net/download/windows 

   #. this is probably installed along with the latest Visual Studio, but needed if your VS is not up-to-date.

#. SQL Server 2012 or newer:

   #. get a free developer or express edition at https://www.microsoft.com/en-us/sql-server/sql-server-downloads
   #. add SQL Server Management Studio from https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms

#. Postman, Fiddler or a similar tool to issue http requests and inspect the responses.


Vonk License File
-----------------

Vonk will not operate without a valid license. You can download an evaluation license from Simplifier.

#. Go to `Simplifier <https://simplifier.net>`_
#. If you don't have an account yet, create one.
#. From the homepage under 'Vonk FHIR Server' click 'Login and Install'
#. On the page 'Install Vonk' fill in your Organization name and Country, then click 'Download key'
#. Save the 'vonk-trial-license.json' file to your disk. In this tutorial we assume you save it to C:\Vonk\vonk-trial-license.json.

Git repository Vonk.Facade.Starter
----------------------------------

This repository contains the completed exercise. It has several branches to checkout the solution at several stages of the exercise.
You can find the repository at `Github <https://github.com/furore-fhir/Vonk.Facade.Starter>`_.
You are not allowed to push commits to this repository.

Please clone branch exercise/step1::

    git clone https://github.com/furore-fhir/Vonk.Facade.Starter.git -b exercise/step1

Database
--------

Create SQL Server database with scripts/CreateDatabase.SQL

It creates a database 'ViSi' with two tables: Patient and BloodPressure. You can familiarize yourself with the table structure and contents to prepare for the mapping to FHIR later on.

Create new project
------------------

#. Open Visual Studio 2017
#. File | New | Project

   #. ASP.NET Core Web Application
   #. Project name and directory at your liking; Next
   #. .Net Core; ASP.NET Core 2.0

        .. image:: ./images/NewProject-1.PNG
            :align: center
#. Run your project with F5, and check whether it starts, an on what port.

Adjust how your project is run
------------------------------

   #. Visual Studio loads the 'homepage' into your default browser when you start the project. Since that is not exactly useful for a FHIR RESTful server, you may disable this from the Project Properties:

        .. image:: ./images/PreventBrowserLaunch.PNG
            :align: center

   #. In this same window, alter the App URL to http://localhost:5017
      You can choose another port number, but this one is used throughout the text.

   #. Visual Studio by default runs your application inside IIS Express. You can change it to run the ASP.NET Core Kestrel webserver directly by changing the value next to the green run button in the toolbar from 'IIS Express' to the name of your project.
      See the highlight in the above image.

Add Configuration
-----------------

Vonk needs configuration settings, and maybe you do to. For ASP.NET Core projects settings are usually in the file appsettings.json. We will add this file and make it available to Vonk.

#. Create a settings file (see :ref:`configure_appsettings` for more background)

   #. File | New | ASP.NET Configuration File
   #. Accept the default name appsettings.json
   #. Visual Studio opens the newly created appsettings file.

      #. Remove the default ConnectionStrings section, but keep the outermost curly brackets
      #. Add the reference to your license file: ``"LicenseFile": "c:/vonk/vonk-trial-license"``
      #. Add the ``SupportedInteractions`` section

#. Open Startup.cs

   #. Add a constructor and configure reading the appsettings::

        private readonly IConfigurationRoot _configurationRoot;

        public Startup(IHostingEnvironment env)
        {
            _configurationRoot = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile(path: "appsettings.json", reloadOnChange: true, optional: true)
                .Build();
        }

   #. In ConfigureServices, register the ``IConfigurationRoot`` instance for use by other services (especially for Vonk)::

        services.AddSingleton(_configurationRoot);

Add Vonk Components
-------------------

#. Tools > NuGet Package Manager > Package Manager Console

   #. Run ``Install-Package Vonk.Core -IncludePrerelease``
   #. Run ``Install-Package Vonk.Fhir.R3 -IncludePrerelease``
   #. Run ``Install-Package Hl7.Fhir.Specification.STU3 -IncludePrerelease``

   .. note:: ``Hl7.Fhir.Specification.STU3`` is already transitively included with ``Vonk.Core``, but NuGet fails to output the file ``specification.zip`` then. Therefore we need a direct reference as well.
             Note that when you upgrade ``Vonk.Core`` in the future, you may need to upgrade ``Hl7.Fhir.Specification.STU3`` as well, to match the versions.

#. Open Startup.cs

   #. In the method ConfigureServices register the services needed for a minimal FHIR Server::

        services
            .AddFhirServices()
            .AddVonkMinimalServices()
        ;

   #. Apply the usings that Visual Studio suggests.

   #. In the method Configure, before the App.Run statement add::
   
        app
            .UseVonkMinimal()
        ;

   #. Then remove the App.Run statement.

   #. Now you can run the project again, it should start without errors, and the log should look like this:

        .. image:: ./images/FirstVonkRun_Log.PNG
            :align: center

   #. Open Postman, and request ``http://localhost:50175/metadata``
   #. You get a CapabilityStatement, so you now officially have a FHIR Server running!

You can get the result of the exercise at this step in the Github branch exercise/step2::

    git checkout exercise/step2


Reverse engineer the database model
-----------------------------------

To use EF Core, install the package for the database provider(s) you want to target. This walkthrough uses SQL Server. For a list of available providers see Database Providers.

* Tools > NuGet Package Manager > Package Manager Console
* Run ``Install-Package Microsoft.EntityFrameworkCore.SqlServer``

We will be using some Entity Framework Tools to create a model from the database. So we will install the tools package as well:

* Run ``Install-Package Microsoft.EntityFrameworkCore.Tools``

Now it's time to create the EF model based on your existing database.

* Tools –> NuGet Package Manager –> Package Manager Console
* Run the following command to create a model from the existing database. Adjust the Data source to your instance of SQL Server. If you receive an error stating The term 'Scaffold-DbContext' is not recognized as the name of a cmdlet, then close and reopen Visual Studio.::

    Scaffold-DbContext "MultipleActiveResultSets=true;Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=ViSi;Data Source=localhost" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models

    //For localdb: Scaffold-DbContext "Server=(localdb)\mssqllocaldb;Database=ViSi;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
    //For SQLEXPRESS: Scaffold-DBContext "Data Source=(local)\SQLEXPRESS;Initial Catalog=ViSi;Integrated Security=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models


The reverse engineer process created entity classes (Patient.cs & BloodPressure.cs) and a derived context (ViSiContext.cs) based on the schema of the existing database.

The entity classes are simple C# objects that represent the data you will be querying and saving. Later on you will use these classes to define your queries on and to map the resources from.

* To avoid naming confusion with the FHIR Resourcetype Patient, rename both files and classes:

  * Patient => ViSiPatient
  * BloodPressure => ViSiBloodPressure

Create your first mapping
-------------------------

#. Add a project folder Repository.
#. Add a new class ``ResourceMapper``
#. Add usings for ``Vonk.Core.Common`` and ``Vonk.Facade.Starter.Models``
#. Add a method to the class ``public IResource MapPatient(ViSiPatient source)``
#. In this method, put code to create a FHIR Patient object, and fill it's elements with data from the ViSiPatient.
#. Then return the created Patient object as an IResource (you can use the extension method ``AsIResource``).

.. attention::

    ``IResource`` is an abstraction from actual Resource objects as they are known to specific versions of the Hl7.Fhir.Net API.
    Currently the only implementation is PocoResource, but this area is likely to change in the future to support multiple versions of FHIR and possibly resources that are not valid.

Enable Search
-------------

Enabling search involves four major steps:

#. creating a query based on the bits and pieces in the search url;
#. getting a count and actual data from the database with that query, and map it to a SearchResult;
#. get all the dependency injection right
#. make the searchparameter known to Vonk
#. configure the ASP.NET Core Pipeline

Create a query
^^^^^^^^^^^^^^

Vonk FHIR Facade is meant to be used across all kinds of database paradigms and schemas. Or even against underlying web services or stored procedures.
This means Vonk cannot prescribe the way your query should be expressed. After all, it could be an http call to a webservice, or a json command to MongoDB.
In our case we will build a LINQ query against our ViSi model, that is translated by Entity Framework to a SQL query.
Because this is a quite common case, Vonk provided a basis for it in the package ``Vonk.Facade.Relational``.

#. Go back to the NuGet Package Manager Console and run ``Install-Package Vonk.Facade.Relational -IncludePrerelease``

You usually create a query-type per ResourceType. In this case we start with Patient: ``PatientQuery``. The Query object is to capture the elements of the search that are provided to the QueryFactory...

With every query-type goes a QueryFactory. In this case we start with PatientQueryFactory. Because PatientQuery has no specific content of it's own, we will include both in one file.

#. To the Repository folder add a new class ``PatientQueryFactory``
#. Above the actual ``PatientQueryFactory`` class insert the ``PatientQuery`` class::

    public class PatientQuery: RelationalQuery<ViSiPatient>
    {}

#. Now flesh out the ``PatientQueryFactory``::

    public class PatientQueryFactory: RelationalQueryFactory<ViSiPatient, PatientQuery>
    {}

#. You have to provide a constructor. With this you tell Vonk for which resourcetype this QueryFactory is valid. 
   The DbContext is used for retrieving DbSets for related entities, as we will see later.::

    public PatientQueryFactory(DbContext onContext) : base("Patient", onContext) { }

#. Each of the searchparameters in the search results in a call to the ``Filter`` method::

    public virtual PatientQuery Filter(string parameterName, IFilterValue value)
    {}

   #. The ``parametername`` is the name of the SearchParameter (or technically the code) as it was used in the search url.
   #. The ``IFilterValue value`` is one of 10 possible implementations, one for each type of SearchParameter:
  
      #. StringValue
      #. DateTimeValue
      #. TokenValue
      #. NumberValue
      #. QuantityValue
      #. UriValue
      #. ReferenceValue

   #. Besides that there are two special values for chaining and reverse chaining:
  
      #. ReferenceToValue
      #. ReferenceFromValue

   #. And finally there is a special value for when Vonk does not know the SearchParameter and hence not the type of it:

      #. RawValue

   #. By default the ``Filter`` method dispatches the call to a suitable overload of ``AddValueFilter``, based on the actual type of the ``value`` parameter.
     It is up to you to override the ones you support any parameters for.

#. Override the method ``PatientQuery AddValueFilter(string parameterName, TokenValue value)`` to implement support for the ``_id`` parameter.

   #. Token search is by default on the whole code. ``_id`` is a special parameter that never has a system specified.
      The ``_id`` parameter must be matched against the ViSiPatient.Id property. So we have to:

      #. Parse the Token.Code to a long (ViSiPatient.Id is of type long)
      #. Create a query with a predicate on ViSiPatient.Id.

   #. This is how::

            if (parameterName == "_id")
            {
                if (!long.TryParse(value.Code, out long patientId))
                {
                    throw new ArgumentException("Patient Id must be an integer value.");
                }
                else
                {
                    return PredicateQuery(vp => vp.Id == patientId);
                }
            }
            return base.AddValueFilter(parameterName, value);
        }

#. That's it for now with creating a Query, we will add support for another parameter later.
   
Get the data and map to FHIR
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Getting the data happens in the implementation of the ``ISearchRepository``. It has only one method, ``Search``. 
The Vonk.Facade.Relational package has an abstract implementation of it that you can use as a starting point. 
This implementation assumes that you can support searching for exactly one ResourceType at a time.
Then the gist of the implementation is to switch the querying based on the ResourceType. The querying itself then looks pretty much the same for every type of resource.

#. Implement the new class ViSiRepository in the folder Repository::

    public class ViSiRepository : SearchRepository

#. You have to provide a constructor that gets a ``QueryBuilderContext``. We'll get to that later. 
   Apart from that you will need your DbContext to query on, and the ResourceMapper to perform the mapping of the results.
   So put all of that in the constructor::

        private readonly ViSiContext _visiContext;
        private readonly ResourceMapper _resourceMapper;

        public ViSiRepository(QueryContext queryContext, ViSiContext visiContext, ResourceMapper resourceMapper) : base(queryContext)
        {
            _visiContext = visiContext;
            _resourceMapper = resourceMapper;
        }

#. The method ``ISearchRepository.Search(IArgumentCollection arguments, SearchOptions options)`` of the interface is already implemented and finds out whether the arguments specify exactly one ResourceType.
   It then calls the abstract method ``Task<SearchResult> Search(string resourceType, IArgumentCollection arguments, SearchOptions options)`` that you have to implement. 
   
   #. Let's inspect the parameters:
   
      #. resourceType: The ResourceType that is being searched for, e.g. Patient in ``<vonk-endpoint>/Patient?...``
      #. arguments: All the arguments provided in the search, whether they come from the path (like 'Patient'), the querystring (after the '?'), the headers or the body. Usually you don't have to inspect these yourself.
      #. options: A few hints on how the query should be executed: are deleted or contained resources allowed etc. Usually you just pass these on as well.

   #. The pattern of the implementation is:

      #. switch on the resourceType
      #. dispatch to a method for querying for that resourceType

   #. For us that will be::

        protected override async Task<SearchResult> Search(string resourceType, IArgumentCollection arguments, SearchOptions options)
        {
            switch (resourceType)
            {
                case "Patient":
                    return await SearchPatient(arguments, options);
                default:
                    throw new NotImplementedException($"ResourceType {resourceType} is not supported.");
            }
        }

        Of course we do this async, since in a web application you should never block a thread while waiting for the database.

#. Now we moved the problem to ``SearchPatient``. The pattern here is:

   #. Create a query - a PatientQuery in this case.
   #. Execute the query against the DbContext (our _visiContext) to get a count of matches.
   #. Execute the query against the DbContext to get the current page of results.
   #. Map the results using the _resourceMapper

#. The implementation of this looks like::

        private async Task<SearchResult> SearchPatient(IArgumentCollection arguments, SearchOptions options)
        {
            var query = _queryContext.CreateQuery(new PatientQueryFactory(_visiContext), arguments, options);

            var count = await query.ExecuteCount(_visiContext);
            var patientResources = new List<IResource>();
            if (count > 0)
            {
                var visiPatients = await query.Execute(_visiContext).ToListAsync();

                foreach (var visiPatient in visiPatients)
                {
                    patientResources.Add(_resourceMapper.MapPatient(visiPatient));
                }
            }
            return new SearchResult(patientResources, query.GetPageSize(), count);
        }

#. What happens behind the scenes is that the QueryBuilderContext creates a QueryBuilder that analyzes all the arguments and options, and translates that into calls into your PatientQueryFactory.
   This pattern offers maximum assistance in processing the search, but also gives you full control over the raw arguments in case you need that for anything.
   Any argument that is reported as in Error, or not handled will automatically show up in the OperationOutcome.

Arrange the Dependency Injection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Add the following classes to the IServiceCollection (directly in the Startup.ConfigureServices method or you can create an extension method for this called for example AddViSiServices):
::

    services.AddDbContext<ViSiContext>();
    services.AddSingleton<ResourceMapper>();
    services.AddScoped<ISearchRepository, ViSiRepository>();

Register also the dependencies needed for search and specify the supported resource type like in the following code:

::

    services.AddSearchServices()
        .AllowResourceTypes("Patient");

.. _addSearchParameters:

Make the searchparameter known to Vonk
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The :ref:`feature_customsp_configure` allows you to control what SearchParameters are loaded into Vonk, and hence are understood by Vonk. That goes for all SearchParameters, not just the custom ones. 
So here we need to make Vonk load the ``_id`` SearchParameter on the ``Resource`` type. 

#. Download the FHIR Definitions in `JSON <http://www.hl7.org/implement/standards/fhir/definitions.json.zip>`_ or `XML <http://www.hl7.org/implement/standards/fhir/definitions.xml.zip>`_ from the FHIR Specification website.
#. Extract the Bundle with all SearchParameters (search-parameters.json/xml) from it.
#. Open the Bundle and isolate the SearchParameter on Resource._id (it is close to the top of the file).
#. Save this resource in a separate file in your project, under ``.\searchparameters\Resource-id.json`` (or xml).
#. Open your appsettings.json file.
#. Add this section, in line with the settings described above::

    "SearchParametersImportOptions": {
        "Enabled": true,
        "Sets": [
            {
                "Path": "<your project path>/searchparameters", //TODO: Can be a path relative to the .csproj directory
                "Source": "Directory"
            }
        ]
    },

#. Now start Vonk again and inspect the CapabilityStatement. It should contain the _id parameter on Patient.

Configure the ASP.NET Core Pipeline
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Add the Search middleware to the ASP.NET Core pipeline, by using the ``IApplicationBuilder.UseSearch()`` extension method in the ``Configure`` method of Startup.cs:

::

    app
        .UseVonkMinimal()
        .UseSearch();


Now you can test that searching patients by ``_id`` works: ``GET http://localhost:5017/Patient?_id=1``

You can get the exercise completed until this step in the Github branch exercise/step3::

    git checkout exercise/step3

Add support for the ViSiBloodPressure Observations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow similar steps as above to support ViSiBloodPressure:

#. Add a mapping method in the ResourceMapper class to map from a 
   ViSiBloodPressure to an IResource.
#. Create a BloodPressureQuery query class.
#. Add a BPQueryFactory extending ``RelationalQueryFactory<ViSiBloodPressure, BloodPressureQuery>``.
#. Implement support for the ``_id`` parameter by overriding ``public virtual BloodPressureQuery AddValueFilter(string parameterName, TokenValue value)``.
#. Add support for the Observation resource type in the ``Startup`` class, ``ConfigureServices`` method, by sending the resource name as a parameter to the ``AllowResourceTypes`` call.

Add support for chaining
^^^^^^^^^^^^^^^^^^^^^^^^
To add support for searching on ``Observation?subject:Patient._id`` we need to override the ``AddValueFilter`` 
overload receiving a ``ReferenceToValue`` parameter in the query factory for BloodPressure (BPQueryFactory). 

The ``ReferenceToValue`` type contains the possible ``Targets`` for the chain search parameter as parsed from the query string.
We are currently interested only on the Patient type so we can restrict the implementation to that target.
The ``ReferenceToValue`` type also has an extension method ``CreateQuery`` that expects an implementation of the ``RelationalQueryFactory`` 
of the referenced target. This will generate the query to obtain the resources referenced by it.

Searching on chained parameters involves the following steps:

    #. Retrieve all patients ids based on the chained parameter. 
       You can use the ``ReferenceToValue.CreateQuery`` extension method 
       to get the query and run the query with its ``Execute`` method.
    #. Create a  ``PredicateQuery`` with the condition that ``ViSiBloodPressure.PatientId`` is included in the ids retrieved at the previous step.

        The final code should look similar to this:

        ::

            public override BloodPressureQuery AddValueFilter(string parameterName, ReferenceToValue value)
            {
                if (parameterName == "subject" && value.Targets.Contains("Patient"))
                {
                    var patientQuery = value.CreateQuery(new PatientQueryFactory(OnContext));
                    var patIds = patientQuery.Execute(OnContext).Select(p => p.Id);

                    return PredicateQuery(bp => patIds.Contains(bp.PatientId));
                }
                return base.AddValueFilter(parameterName, value);
            }

    #. Load the definition for the ``Observation.subject`` search parameter in Vonk similar to how we did it for ``_id``. Check :ref:`addSearchParameters`.

At this point you should be able to search for ``GET http://localhost:5017/Observation?subject:Patient._id=1``

Add support for reverse chaining
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Adding support for ``Patient?_has:Observation:subject:_id=1`` is similar. You just need to use the  ``AddValueFilter`` 
overload receiving a ``ReferenceFromValue``. 

The ``ReferenceFromValue`` type has a ``Source`` property filled in with the source of the search parameter. It also has an extension method ``CreateQuery`` that given the corresponding ``RelationalQueryFactory`` implementation can generate 
the query to obtain resources referenced by the reverse chaining.

So you can add reverse chaining with the following code:

::

    public override PatientQuery AddValueFilter(string parameterName, ReferenceFromValue value)
    {
        if (parameterName == "subject" && value.Source == "Observation")
        {
            var obsQuery = value.CreateQuery(new BPQueryFactory(OnContext));
            var obsIds = obsQuery.Execute(OnContext).Select(bp => bp.PatientId);

            return PredicateQuery(p => obsIds.Contains(p.Id));
        }
        return base.AddValueFilter(parameterName, value);
    }

Now you can test reverse chaining works: ``http://localhost:5017/Patient?_has:Observation:subject:_id=1``

Get the goodies
---------------
At this point you get out of the box support for ``_include``, ``_revinclude`` and combinations of search parameters.
You can test the following scenarios:

#. ``_include``: ``http://localhost:5017/Observation?_include=Observation:subject``
#. ``_revinclude``: ``http://localhost:5017/Patient?_revinclude=Observation:subject``
#. combinations of the above

Also you get support for read and validation by just adding the corresponding middlewares to the ASP.NET Core pipeline:

::

    app
        .UseRead()
        .UseValidation()
        .UseInstanceValidation();
 
and the right services registrations:

::

    services
        .AddReadServices()
        .AddInstanceValidationServices()
        .AddValidationServices() 