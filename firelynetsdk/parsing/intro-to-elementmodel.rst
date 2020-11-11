.. _elementmodel-intro:

============================
Introduction to ElementModel
============================

While most developers will be most comfortable with using .NET POCOs to work with FHIR data, the Firely .NET SDK itself largely uses the ElementModel classes to read and manipulate data. These classes enable the SDK to work independently of FHIR versions (e.g. STU3, R4, R5, etc), and can even work with incorrect data. In addition, these classes make it simple to traverse data and obtain type information about the data without the need for .NET reflection.

The ElementModel interfaces
---------------------------
The ElementModel namespace contains two interfaces that represent FHIR data as a tree of nodes, each node containing children, primitive data, or both. They are ``ISourceNode`` and ``ITypedElement``. The former is an abstraction on top of the serialized formats (currently XML, Json and RDF), whereas the second represents the strongly typed logical FHIR data model. The parsing SDK has a low-level ``ISourceNode`` implementation for each serialization format. The SDK then allows you to turn an untyped, low-level tree represented by the ``ISourceNode`` interface into a ``ITypedElement`` based typed tree by adding type information to it. Both interfaces can be found in the ``Hl7.Fhir.ElementModel`` assembly and namespace.

The next sections will details how to use the ``ISourceNode`` based parsers in the SDK, how to add type information and serialize data back out using the ``ITypedElement`` based serializers.
