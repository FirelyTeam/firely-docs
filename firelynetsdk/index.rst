=======
Welcome 
=======

This is documentation site for the support SDK for working with `HL7
FHIR <http://www.hl7.org/fhir>`__ on the Microsoft .NET platform.

.. important:: The old name of this product was FHIR .NET API. Since November 2020 we renamed it to **Firely .NET SDK**.
  It is still the same product from the same contributors only with another name.


The library provides:

- Class models for working with the FHIR data model using POCO's
- A REST client for working with FHIR-compliant servers
- Xml and Json parsers and serializers
- Helper classes to work with the specification metadata, and generation of differentials
- Validator to validate instances against profiles
- A lightweight in-memory terminology server

On these pages we provide you with the documentation you need to get up and running with the SDK.
We'll first explain how the FHIR model is represented in the SDK and give you code examples to work with the model.
The FhirClient and its methods will also be demonstrated. Within an hour you can create your own simple
FHIR client!

After those topics to get you started, we have added some pages that delve deeper into nice SDK features, such
as parsing and serializing FHIR data, working with transactions, and using the ResourceIdentity functionality.

.. note:: All code examples on these pages are for the STU3 version of the library. 

Please look at the :ref:`sdk-contact` page for ways to ask questions, contribute to the SDK, or reach out to other
.Net developers in the FHIR community.


.. toctree::
   :maxdepth: 3
   :hidden:

   start
   model
   client
   parsing
   contact
   releasenotes
.. add files here, or in between

