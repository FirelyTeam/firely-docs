.. _administration_structuredefinition:

Administration of StructureDefinitions
=======================================

Vonk must have access to all the StructureDefinitions that are referenced directly and indirectly by a profile in order to validate a resource claiming conformance to that profile.

Likewise it needs access to all the StructureDefinitions referenced by a StructureDefinition in a request to :ref:`feature_snapshot`.

Vonk has access to StructureDefinitions in the following locations:

#. All the StructureDefinitions from the FHIR Specification, distributed along with Vonk in the specification.zip. 
#. The StructureDefinitions in the Administration repository. The contents of this repository can be managed by:
    #. Using the :ref:`administration_structuredefinition_api`
    #. Loading from :ref:`administration_structuredefinition_simplifier`

.. _administration_structuredefinition_zip:

Specification.zip
-----------------

Vonk reads the contents of the specification.zip when they are first needed. So that is on the first request that requires validation, or snapshot generation. This is done by default and requires no administration from the user.

.. _administration_structuredefinition_api:

Admninistration API
--------------------------

The Administration repository for StructureDefinitions is managed through the :ref:`administration`. This API exposes a FHIR RESTful API endpoint for StructureDefinition. So you can GET, POST, PUT and DELETE StructureDefinitions on this endpoint.

Please be aware that StructureDefinitions have to have a unique canonical url, in their url element. If Vonk has access to two or more StructureDefinitions with the same canonical url, it is not defined which one will be used.
You can use a conditional create to prevent this from happening.

Example
^^^^^^^

To add a StructureDefinition to Vonk
::

    POST <vonk-endpoint>/administration/StructureDefinition

* In the body provide the StructureDefinition that you want to add.
* The Content-Type header must match the format of the body (application/fhir+json or application/fhir+xml)

.. _administration_structuredefinition_simplifier:

Simplifier
----------

See :ref:`feature_artifactresolution` on how to configure loading resources from Simplifier, including StructureDefinitions.
