=================
Working with REST
=================

In this section we explain the methods of the FhirClient that are in the
``Hl7.Fhir.Rest`` part of the API package.

Add this ``using`` directive to your code:

.. code-block:: csharp

	using Hl7.Fhir.Rest;

The first topics in this chapter cover the settings of the FhirClient and the CRUD
interactions you can perform with it. We will then give some examples of history
and search interactions, and explain how to perform operations and transactions.
There's also a section on helper methods for resource identities, and we end the
chapter with other miscellaneous helpers in the ``Hl7.Fhir.Rest`` namespace.

.. toctree::
   :maxdepth: 3
   :hidden:

   client/setup
   client/crud
..
   client/history
   client/search
   client/request-response
   client/resource-identity

