.. _feature_validation:

Validation
==========

Vonk can validate a resource against a profile as defined in the `$validate`_ operation. 

You can call validate on three levels:

#. :ref:`feature_validation_system`
#. :ref:`feature_validation_type`
#. :ref:`feature_validation_instance`

Besides that you can configure Vonk to validate every incoming resource and even filter on specific profiles. See the section on :ref:`feature_prevalidation`.
In all cases, the :ref:`feature_validation_pre` is that Vonk must have access to all relevant StructureDefinitions.

Validation has one :ref:`feature_validation_limitations`.

.. _feature_validation_system:

Validate on the system level
----------------------------
::

    POST <vonk_endpoint>/$validate[?profile=<canonical-url-of-structuredefinition>]

There are two ways of calling $validate:

#. With a Resource as body and optionally a profile parameter on the url.
#. With a Parameters resource as body, having

    * a parameter element with the Resource to validate in the resource parameter;
    * (optionally) the profile to validate against in the profile parameter

In both cases the request must have a Content-Type header matching the format of the body (application/fhir+json or application/fhir+xml)

If you do not specify a profile parameter, Vonk will validate the Resource against the base profile from the FHIR Specification.

If you call $validate on the system level, Vonk will make no assumptions about the ResourceType of the Resource to validate.

.. _feature_validation_type:

Validate on the ResourceType level
----------------------------------
::

    POST <vonk_endpoint>/<resourcetype>/$validate[?profile=<canonical-url-of-structuredefinition>]

You can call $validate in the same two ways as with :ref:`feature_validation_system`.

If you call $validate on the ResourceType level, Vonk will check whether the Resource to validate is of the same <resourcetype> as provided in the url.

.. _feature_validation_instance:

Validate an instance from the database
--------------------------------------
::

    GET <vonk_endpoint>/<resourcetype>/<id>/$validate[?profile=<canonical-url-of-structuredefinition>]

This time you can only use the (optional) profile parameter on the url to specify a StructureDefinition to validate against.

.. _feature_validation_pre:

Precondition
------------

Vonk must be aware of all the StructureDefinitions referenced directly or indirectly by a profile. Refer to the :ref:`administration_structuredefinition` for more information.

.. _feature_validation_limitations:

Limitation
-----------

#. The mode parameter is not yet supported.

.. _`$validate`: http://www.hl7.org/implement/standards/fhir/resource-operations.html#validate
