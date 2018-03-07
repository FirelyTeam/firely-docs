.. _conformance:

Controlling the Conformance Resources
=====================================

Vonk uses `Conformance Resources <http://www.hl7.org/implement/standards/fhir/conformance-module.html>`_ along with some `Terminology Resources <http://www.hl7.org/implement/standards/fhir/terminology-module.html>`_ for various operations:

* SearchParameter: For indexing resources and evaluating :ref:`search <restful_search>` interactions.
* StructureDefinition: For :ref:`snapshot generation<feature_snapshot>`, and of course -- along with ValueSet, CodeSystem and NamingSystem -- for :ref:`validation <feature_validation>`.
* CompartmentDefinition: For :ref:`access control <feature_accesscontrol>`

You can control the behaviour of Vonk for these interactions by loading resources of these types into Vonk. There are three ways of loading:

#. With regular FHIR interactions (create, update, delete) on the :ref:`administration_api`.
#. Loading them from disk at startup, using the :ref:`metadata import configuration<conformance_fromdisk>`.
#. Loading them from Simplifier at startup.

.. toctree::
   :maxdepth: 3

.. _conformance_specification_zip:

Default Conformance Resources
-----------------------------

Vonk comes with the specification.zip file from the HL7 FHIR API. It contains all the StructureDefinition resources from the specification. These are loaded and used for validation and snapshot generation by default. You can override them by creating a StructureDefinition with the same canonical url in the administration api, as described below.

.. _conformance_administration_api:

Manage Conformance Resources with the Administration API
--------------------------------------------------------

The :ref:`administration_api` has a FHIR interface included, on the ``https://[base]/administration`` endpoint. On this endpoint you can do most of the FHIR interactions (create, read, update, delete, search) on these resourcetypes:

* SearchParameter
* StructureDefinition
* ValueSet
* CodeSystem
* (NamingSystem will be added soon)
* CompartmentDefinition

Creates or updates of SearchParameter resources should be followed by a :ref:`re-index <feature_customsp_reindex>`. 

Before you delete a SearchParameter, be sure to remove it from the index first, see the ``exclude`` parameter in :ref:`re-index <feature_customsp_reindex>`.

Changes to the other types of resources have immediate effect.

If you are :ref:`not permitted <configure_administration_access>` to access the endpoint for the resource you want to manage (e.g. ``[base]/administration/StructureDefinition``), Vonk will return statuscode 403.

.. attention:: 
   Please be aware that Conformance Resources have to have a unique canonical url, in their url element. Vonk does not allow you to POST two conformance resources with the same canonical url.
   For SearchParameter resources, the combination of base and code must be unique.

.. note:: You can also do the same interactions on the same resourcetypes on the normal Vonk FHIR interface ``https://[base]``. This will only result in storing, updating or deleting the resource. But it will not have any effect on the way Vonk operates.

Example
^^^^^^^

To add a StructureDefinition to Vonk
::

    POST <vonk-endpoint>/administration/StructureDefinition

* In the body provide the StructureDefinition that you want to add.
* The Content-Type header must match the format of the body (application/fhir+json or application/fhir+xml)

If you prefer to assign your own logical id to e.g. StructureDefinition 'MyPatient', you can use an update:
::

    PUT <vonk-endpoint>/administration/StructureDefinition/MyPatient

.. _conformance_fromdisk:

Load Conformance Resources from disk
------------------------------------

Vonk can read SearchParameter and CompartmentDefinition resources from disk at startup. This can be from a directory, a zip or the FHIR .NET API library. The MetadataImportOptions in the :ref:`configure_appsettings` control from which sources resources are loaded::

  "MetadataImportOptions": {
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

:Api: Does not require a path. It reads the SearchParameters listed in the ModelInfo in the .NET HL7.Fhir.Api assembly, which is distributed along with Vonk.
:Directory: A directory with a resource per file. Resources can be in json or xml format (also mixed). Subdirectories are not evaluated.
:ZipFile: A zip file with individual resources per file in the zip archive. Resources can be in json or xml format (also mixed).  

You can mix and repeat the sources. They will be read from top to bottom, where the first resource with a specific canonical url will take precedence
over later resources with the same canonical url.

This means that if you want to override a search parameter from the specification with your own definition, you will
need to put your own search parameter(s) higher in the list than the parameters from the specification.

Note that in json you either use forward slashes (/) or double backward slashes (\\\\\\) as path separators.

The SearchParameters that are loaded are automatically included in the CapabilityStatement in response to the :ref:`restful_capabilities` interaction.
This implies that you can check the CapabilityStatement to see whether a specific SearchParameter was actually loaded.

.. _conformance_fromsimplifier:

Load Conformance Resources from simplifier.net at startup
---------------------------------------------------------

You are encouraged to manage and publish your profiles and related Conformance Resources on `simplifier.net <https://simplifier.net>`_. If you do that, you can have Vonk read those. This is currently possible for the resourcetypes StructureDefition, SearchParameter, CompartmentDefinition, ValueSet and CodeSystem. You configure this in the :ref:`configure_appsettings`::

  "ResourceLoaderOptions": {
    "Sets": [
      {
        "Uri": "FHIR endpoint for retrieving StructureDefinitions",
        "UserName": "UserName for retrieving the StructureDefinitions",
        "Password": "Password for the above user name"
      }
    ],
    "BatchSize": 20,
    "LoadAtStartup": false
  }

* The Uri must point to a Simplifier project endpoint
* The UserName and Password must have access to that project.
* You can load from multiple projects by adding extra Sets.

Actually load the StructureDefinitions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

It is often useful to reload the profiles, e.g. after you have finalized changes in your project.
Therefore you can instruct Vonk to actually load the profiles from the source(s) with a separate command:

::

  POST http(s)://<vonk-endpoint>/administration/importResources

You can also instruct Vonk to load the StructureDefinitions at startup with the settings::

  "ResourceLoaderOptions": {
    "LoadAtStartup": true
  }
