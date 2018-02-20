.. _facade_accesscontrol:

Add Access Control to your Facade
=================================

If you have completed the exercise from :ref:`facadestart`, you can choose to integrate :ref:`feature_accesscontrol`.
Please refer to that section to read how this Access Control mechanism works. You will use it as-is in your facade.

Add the required package
------------------------

The functionality for Access Control based on SMART-on-FHIR is encapsulated in the NuGet package Vonk.Smart.
Open the NuGet package manager console and run::

   Install-Package Vonk.Smart -IncludePrerelease

Register neccessary services
----------------------------

All the services needed are combined into one extension method. This includes registration of the SmartAuthorizationOptions. Use it in the ``Startup.ConfigureServices`` method::

   using Vonk.Smart;

   public void ConfigureServices(IServiceCollection services)
   {
      services.AddFhirServices()
         .AddSmartServices() //This registers the Access Control services.
         .AddVonkMinimalServices()
         ...
   }

Register neccessary middleware
------------------------------

In the ``Startup.Configure`` method you need to add the middleware that comes with the Access Control. It can only protect middleware that comes *after* it in the pipeline, so put it right after ``UseVonkMinimal``::

   app
         .UseVonkMinimal()
         .UseSmartAuthorization()
         ...

Add CompartmentDefinition(s) to your metadata
---------------------------------------------

A CompartmentDefinition defines a set of resources that are linked to a specific resource and the reference search parameters that link them together. You can find more information on Compartments and access control `here <http://docs.simplifier.net/vonk/features/accesscontrol.html#compartments>`__. 

Add a folder in your working directory where you can place metadata files (if you didn't do this earlier). Add your CompartmentDefinition(s) to this folder. You can download a CompartmentDefinition for Patient `here <https://github.com/FirelyTeam/Vonk.Facade.Starter/tree/master/metadata>`__. Copy this file to your metadata directory.

Add the relevant settings
-------------------------

Configure the MetadataImportOptions in the ``appsettings.json`` file:: 

   "MetadataImportOptions": {
      "Enabled": true,

      "Sets": [
        {
          "Path": "",
          "Source": "Api"
        },
        {
          "Path": "C:\\Path\\To\\Metadata",
          "Source": "Directory"
        }
      ]    
   }

Configure the SmartAuthorizationOptions in the ``appsettings.json`` file. The options are described in :ref:`feature_accesscontrol_config` of Access Control.

Test it
-------

Start the Facade application. Try ``<base>/metadata``. This operation is part of ``UseVonkMinimal`` and is thus not protected. You should get a CapabilityStatement.

Now try ``<base>/Patient/1``. You will get an OperationOutcome stating that you need to provide a valid JWT Bearer token.

See :ref:`feature_accesscontrol_postman` on how to get a token and check that you can then access ``<base>/Patient/1`` again.
