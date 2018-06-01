.. _conformance:

Controlling the Conformance Resources
=====================================

Vonk uses `Conformance Resources <http://www.hl7.org/implement/standards/fhir/conformance-module.html>`_ along with some `Terminology Resources <http://www.hl7.org/implement/standards/fhir/terminology-module.html>`_ for various operations:

* SearchParameter: For indexing resources and evaluating :ref:`search <restful_search>` interactions.
* StructureDefinition: For :ref:`snapshot generation<feature_snapshot>`, and of course -- along with ValueSet and CodeSystem -- for :ref:`validation <feature_validation>`.
* CompartmentDefinition: For :ref:`access control <feature_accesscontrol>` and Compartment :ref:`restful_search`.
* ValueSet and CodeSystem: For :ref:`feature_terminology` operations.

You can control the behaviour of Vonk for these interactions by loading resources of these types into Vonk. There are two ways of doing this:

#. With regular FHIR interactions (create, update, delete) on the :ref:`administration_api`.
#. With the :ref:`conformance_import`.

No matter which method you use, all Conformance resources are persisted in the Administration API database (see :ref:`configure_administration` for configuring that database), and available through the Administration API endpoint (``<vonk-endpoint>/administration``)

.. attention::
   
   Please be aware that Conformance Resources have to have a **unique canonical url**, in their url element. Vonk does not allow you to POST two conformance resources with the same canonical url.
   For SearchParameter resources, the combination of base and code must be unique.

.. attention::
   
   Creates or updates of **SearchParameter** resources should be followed by a :ref:`re-index <feature_customsp_reindex>`. 

   Before you delete a SearchParameter, be sure to remove it from the index first, see the ``exclude`` parameter in :ref:`re-index <feature_customsp_reindex>`.

   Changes to the other types of resources have immediate effect.

.. toctree::
   :maxdepth: 3

.. _conformance_import:

Import of Conformance Resources
-------------------------------

The import process of conformance resources runs on every startup of Vonk, and :ref:`on demand<conformance_on_demand>`. 

The process uses these locations on disk:

* ImportDirectory;
* ImportedDirectory;
* a read history in the file .vonk-import-history.json, written in ImportedDirectory.

The process follows these steps:

#. Load the :ref:`conformance_specification_zip`, if they have not been loaded before.
#. Load the :ref:`feature_errata`, if they have not been loaded before.
#. :ref:`conformance_fromdisk`. After reading, the read files are appended with a timestamp and moved to the ImportedDirectory, and registered in the read history.
#. :ref:`conformance_fromsimplifier`. After reading, the project is registered in the read history. Subsequent reads will query only for resources that have changed since the last read.

The read history keeps a record of files that have been read, with an MD5 hash of each.
If you wish to force a renewed import of a specific file, you should:

* manually edit the read history file and delete the entry about that file;
* provide the file again in the ImportDirectory.

.. _conformance_specification_zip:

Default Conformance Resources
-----------------------------

Vonk comes with the specification.zip file from the HL7 FHIR API. It contains all the Conformance resources from the specification. These are loaded and used for validation and snapshot generation by default.  

Some of the conformance resources (especially SearchParameters) contain errors in the core specification. You can override them by:

* updating them through the administration api, as described below;
* providing an altered version in the ImportDirectory, with the same id and canonical url.

.. attention::
   The Core Specification provides almost 4000 Conformance Resources. Depending on the machine it may take a few minutes to load and index them. 

.. _conformance_fromdisk:

Load Conformance Resources from disk
------------------------------------

Vonk can read SearchParameter and CompartmentDefinition resources from a directory on disk at startup. The AdministrationImportOptions in the :ref:`configure_appsettings` control from which directory resources are loaded::

  "AdministrationImportOptions": {
    "ImportDirectory": "<path to the directory you want to import from, default ./vonk-import>",
    "ImportedDirectory": "<path to the directory where imported files are moved to, default ./vonk-imported>"
  },

:ImportDirectory: All files and zip files will be read, and any conformance resources in them will be imported.
:ImportedDirectory: Every file and zip file that is read, is moved to this directory. This directory will also contain the read history in the .vonk-import-history.json file.

.. attention::
   Do not place the ImportedDirectory under ImportDirectory, since Vonk reads all zip files and regular files from the ImportDirectory *and* its subdirectories. 

Note that in json you either use forward slashes (/) or double backward slashes (\\\\) as path separators.

.. _conformance_fromsimplifier:

Load Conformance Resources from simplifier.net
----------------------------------------------

You are encouraged to manage and publish your profiles and related Conformance Resources on `simplifier.net <https://simplifier.net>`_. If you do that, you can have Vonk read those. You configure this in the :ref:`configure_appsettings`::

  "AdministrationImportOptions": {
    "SimplifierProjects": [
      {
        "Uri": "FHIR endpoint for retrieving StructureDefinitions",
        "UserName": "UserName for retrieving the StructureDefinitions",
        "Password": "Password for the above user name",
        "BatchSize": "<number of resources imported at once, optional - default is 20>"
      }
    ],
  }

:Uri: must point to a Simplifier project endpoint, see below on how to get this
:UserName: your username, if you access a private Simplifier project
:Password: password with the username
:BatchSize: you normally don't need to change this parameter

You can load from multiple Simplifier projects by adding them to the list.

Get a FHIR endpoint for a Simplifier project
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Open the project of your choice on https://simplifier.net. There are two limitations:

1. You must have access to the project (so either public or private but accessible to you)
2. The project must be STU3

Then on the overview page of the project click 'Endpoint' and copy the value you see there:

   .. image:: ../images/simplifier-vonk-endpoint.png
      :align: center   

By default the endpoint is ``https://stu3.simplifier.net/<projectname>``

.. _conformance_on_demand:

Load Conformance Resources on demand
------------------------------------

It can be useful to reload the profiles, e.g. after you have finalized changes in your project.
Therefore you can instruct Vonk to actually load the profiles from the source(s) with a separate command:

::

  POST http(s)://<vonk-endpoint>/administration/importResources

Please note that this will also respect the history of already read files, and not read them again.

.. _conformance_administration_api:

Manage Conformance Resources with the Administration API
--------------------------------------------------------

The :ref:`administration_api` has a FHIR interface included, on the ``https://<vonk-endpoint>/administration`` endpoint. On this endpoint you can do most of the FHIR interactions (create, read, update, delete, search) on these resourcetypes:

* SearchParameter
* StructureDefinition
* ValueSet
* CodeSystem
* CompartmentDefinition

If you are :ref:`not permitted <configure_administration_access>` to access the endpoint for the resource you want to manage (e.g. ``<vonk-endpoint>/administration/StructureDefinition``), Vonk will return statuscode 403.

.. note:: You can also do the same interactions on the same resourcetypes on the normal Vonk FHIR interface ``https://<vonk-endpoint>``. This will only result in storing, updating or deleting the resource. But it will not have any effect on the way Vonk operates.

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

