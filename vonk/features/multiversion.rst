.. _feature_multiversion:

Running multiple versions of FHIR
=================================

Since version 3.0.0 Vonk can run multiple versions of FHIR side-by-side in the same server. This page explains how this works and what the consequences are.

Requests
--------

The FHIR Specification explains the mimetype parameter that distinguishes one FHIR version from another in the paragraph on the `FHIR Version parameter <http://hl7.org/fhir/R4/http.html#version-parameter>`_.
Vonk uses this approach to let you choose the model for your request. Below are examples on how to use the fhirVersion parameter and how in influences the behaviour of Vonk. 
Accepted values for the parameter are:

* fhirVersion=3.0, for FHIR STU3
* fhirVersion=4.0, for FHIR R4

The examples below explain the behaviour with STU3, but if you replace fhirVersion with 4.0, it works exactly the same on R4. 

.. note:: 
   If you do not specify a fhirVersion parameter, Vonk will use fhirVersion=3.0 (STU3) as a default. This way the behaviour is compatible with previous versions of Vonk
   ::

      GET <base>/Patient
      Accept=application/fhir+json; fhirVersion=3.0

.. note:: 
   If you use both an Accept header and a Content-Type header, the fhirVersion parameter for both must be the same. So this would be *invalid*
   ::

      POST <base>/Patient
      Accept=application/fhir+json; fhirVersion=3.0
      Content-Type=application/fhir+json; fhirVersion=4.0

Search for all Patients in STU3. In Vonk this means Patient resources that were also stored as STU3. There is no automatic conversion of resources that were stored as R4 to the STU3 format (or vice versa).::

   GET <base>/Patient?name=Fred
   Accept=application/fhir+json; fhirVersion=3.0

Search for Patients with the name 'Fred' in STU3. The searchparameters used in the query must be valid in STU3.::

   POST <base>/Patient
   Content-Type=application/fhir+json; fhirVersion=3.0
   Accept=application/fhir+json; fhirVersion=3.0

   {<valid Patient JSON body>}

Create a Patient resource in STU3. This will only be retrievable when accessed with STU3.::

   PUT <base>/Patient/123
   Content-Type=application/fhir+json; fhirVersion=3.0
   Accept=application/fhir+json; fhirVersion=3.0

   {<valid Patient JSON body with id: 123>}

Update a Patient resource in STU3.

#. If no resource with this id existed before: it will be created with this id. (This was already always the behaviour of Vonk.)
#. If a resource with this id existed before, in STU3: update it.
#. If a resource with this id already exists in R4: you will get an error with an OperationOutcome saying that a resource with this id already exists with a different informationmodel.

.. note:: Id's still have to be unique within a resourcetype, regardless of the FHIR version.

Delete a Patient resource.::

   DELETE <base>/Patient/123
   Accept=application/fhir+json; fhirVersion=3.0

This will delete Patient/123, regardless of its FHIR version. The Accept header is needed for Vonk to know how to format an OperationOutcome if there is an error.

Conformance resources
---------------------

Conformance resources like StructureDefinition and SearchParameter are registered *per FHIR version*. This implies:

#. Conformance resources will be imported during :ref:`conformance_import` for both STU3 and R4. To avoid id clashes (see note above), the id's in R4 are appended with '-Fhir4.0'

   #. So the StructureDefinition for Patient will be available for STU3 and R4 respectively like this:
   ::

      GET <base>/StructureDefinition/Patient
      Accept=application/fhir+json; fhirVersion=3.0

      GET <base>/StructureDefinition/Patient-Fhir4.0
      Accept=application/fhir+json; fhirVersion=4.0

#. If you add a StructureDefinition or SearchParameter via the Administration API, you can decide for yourself whether to append the FHIR version to the id or not. 
   Just note that you cannot use the same id for different FHIR versions.
#. Depending on the fhirVersion parameter Vonk evaluates whether a resourcetype or searchparameter is valid in that FHIR version. E.g. 'VerificationResult' is only valid in R4, but 'DataElement' is only valid in R3.
#. For validation, the StructureDefinitions and terminology resources needed are only searched for in the FHIR version of the resource that is being validated.
#. When you :ref:`conformance_administration_api`, a StructureDefinition can only be posted to the Administration API in the context of a FHIR Version that matches the StructureDefinition.fhirVersion.
   So this works::
   
      POST <base>/administration/StructureDefinition
      Accept=application/fhir+json; fhirVersion=4.0
      Content-Type=application/fhir+json; fhirVersion=4.0

      {
         "resourcetype": "StructureDefinition"
         ...
         "fhirVersion": "4.0.0" //Note the FHIR version matching the Content-Type
      }

   But it would not work if ``"fhirVersion"="3.0.1"``

#. If you :ref:`conformance_on_demand`, this will be done for all the importfiles described above, regardless of the fhirVersion in the Accept header.

Running a single version
------------------------

It is currently not possible to run a single version of FHIR in Vonk.

You can only exclude the namespace of the version that you don't need (``Vonk.Fhir.R3`` or ``Vonk.Fhir.R4``) from the :ref:`PipelineOptions <vonk_components_config>` so Vonk does not create unneccessary classes.

Running different versions on different endpoints
-------------------------------------------------

It is currently not possible to run the different versions on different endpoints. 

With the PipelineOptions you could create separate branches, like /R3 and /R4 but you'd still have to provide the fhirVersion parameter.