.. _administration:

=======================
Vonk Administration API
=======================

Besides the regular FHIR endpoint, Vonk also exposes an Administration API. The endpoint for this is::

   http(s)//<vonk-endpoint>/administration

Custom profiles
---------------
If you have a custom profile, in the form of a StructureDefinition resource, and you want Vonk to use that 
when validating resources, you can simply feed the StructureDefinition to Vonk through the Administration API.
To this end the ``/administration`` endpoint is also a FHIR endpoint for StructureDefinition resources. 
So to add one you can::

   PUT https://<vonk-endpoint>/administration/StructureDefinition/mypatient

Subscriptions
-------------
Subscriptions can be posted to the /administration endpoint as well. If you post it to the regular FHIR endpoint, it will be stored but not evaluated.

Vonk currently only supports Subscriptions with a Channel of type REST Webhook.

Custom search parameters
------------------------
You can control which search parameters are loaded at the startup of Vonk. You specify that in the appsettings.json::

  "SearchParametersImportOptions": {
    "Enabled": true,
    "Sets": [
      {
        "Path": "",
        "Source": "Api"
      },
      {
        "Path": "C:/MySearchParameters",
        "Source": "Directory"
      },
      {
        "Path": "C:/MySearchParameters/Parameters.zip",
        "Source": "ZipFile"
      }
    ]
  },

You can mix and repeat the sources; they will be read from top to bottom, overriding earlier search parameters with the same id.
This also means that you can for example load all the search parameters from the specification and then override some of them with a different definition.

Please note that every search parameter has to have a valid FhirPath in it's Expression property, otherwise Vonk will warn about this in the log and not use the parameter.

Search parameters can NOT (yet) be posted to the /administration endpoint. 

Re-indexing for new or changed SearchParametersImportOptions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Vonk extracts values from resources based on the available search parameters upon create or update.
If you have added a new or changed SearchParameter, you should re-index (repeat the extraction) for these parameters.
This is a possibly lengthy operation, so use it with care.
To re-index all resources for all search parameters::

   POST http(s)//<vonk-endpoint>/administration/reindexing/all

To re-index all resources for certain search parameters::

   POST http(s)//<vonk-endpoint>administration/reindexing/searchparameters

The body then contains the parameters to actually re-index as form parameters::

   include=Patient.name,Observation.code
   exclude=Organization.name

``include`` means that resources will be re-indexed only for those search paramters.
``exclude`` means that any existing index data for those search parameters will be erased.
