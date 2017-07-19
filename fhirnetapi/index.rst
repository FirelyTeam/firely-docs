Welcome 
=======

This is documentation site for the support API for working with `HL7
FHIR <http://www.hl7.org/fhir>`__ on the Microsoft .NET platform.

The library provides:

-  Class models for working with the FHIR data model using POCO's
-  A REST client for working with FHIR-compliant servers
-  Xml and Json parsers and serializers
-  Helper classes to work with the specification metadata, and generation of differentials

On these pages we provide you with the documentation you need to get up and running with the API.
We'll first explain how the FHIR model is represented in the API and give you code examples to work with the model.
The FhirClient and its methods will also be demonstrated. Within an hour you can create your own simple
FHIR client!

After those topics to get you started, we have added some pages that delve deeper into nice API features, such
as parsing and serializing FHIR data, working with transactions, and using the ResourceIdentity functionality.

.. note:: All code examples on these pages are for the STU3 version of the library. Some of them can still be used
	with the DSTU2 library, but you might need to tweak the code a bit.

Please look at the :ref:`api-contact` page for ways to ask questions, contribute to the API, or reach out to other
.Net developers in the FHIR community.


.. toctree::
   :maxdepth: 3
   :hidden:

   start
   model
   client
   contact
.. add files here, or in between

