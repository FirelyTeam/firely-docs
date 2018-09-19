.. _elementmodel-intro:

============================
Introduction to ElementModel
============================

.. caution:: This documentation describes features in a prelease of version 1.0 of the API. The documentation may be outdated and code examples may become incorrect.

While most developers will be most comfortable with using .NET POCOs to work with FHIR data, the .NET API itself largely uses the ElementModel classes to read and manipulate data. These classes enable the API to work independently of FHIR versions (e.g. DSTU2, STU3, R4, etc), and can even work with incorrect data. In addition, these classes make it simple to traverse data and obtain type information about the data without the need for .NET reflection.

The ElementModel interfaces
---------------------------
The ElementModel namespace contains two interfaces that represent FHIR data as a tree of nodes, each node containing children, primitive data, or both. They are ``ISourceNode`` and ``ITypedElement``. The former is an abstraction on top of the serialized formats (currently XML, Json and RDF), whereas the second represents the strongly typed logical FHIR data model. The parsing API has a low-level ``ISourceNode`` implementation for each serialization format. The API then allows you to turn an untyped, low-level tree represented by the ``ISourceNode`` interface into a ``ITypedElement`` based typed tree by adding type information to it. Both interfaces can be found in the ``Hl7.Fhir.ElementModel`` assembly and namespace.

The next sections will details how to use the ``ISourceNode`` based parsers in the API, how to add type information and serialize data back out using the ``ITypedElement`` based serializers.
