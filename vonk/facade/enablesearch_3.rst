Last steps to enable search
===========================

These are the last three steps for enabling search.

3. Arrange the Dependency Injection
-----------------------------------

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

4. Make the searchparameter known to Vonk
-----------------------------------------

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

5. Configure the ASP.NET Core Pipeline
--------------------------------------

Add the Search middleware to the ASP.NET Core pipeline, by using the ``IApplicationBuilder.UseSearch()`` extension method in the ``Configure`` method of Startup.cs:

::

    app
        .UseVonkMinimal()
        .UseSearch();


Now you can test that searching patients by ``_id`` works: ``GET http://localhost:5017/Patient?_id=1``

You can get the exercise completed until this step in the Github branch exercise/step3::

    git checkout exercise/step3
