.. _FHIR-parsing:

=========================
Parsing and serialization
=========================

The .NET API makes it easy to work with XML and Json-based FHIR data. There are two approaches for getting data in and out of your application:

* Work with the POCO classes (as described in :ref:`FHIR-model`). These are .NET classes that represent the FHIR resources mostly one-on-one.
* Work with the ``ElementModel`` classes, which is an abstract memory model representing the FHIR data as an in-memory tree of data.

The first approach is the simplest and is most applicable if you prefer working with strongly typed classes that align with the FHIR resources. E.g. there is a 
class ``Patient`` with a property ``name``, as you would expect from looking at the FHIR documentation. For most users, this is all they need.

However, there are several reasons the POCO-based approach may not work for you:

* The generated POCO classes are based on a specific version of FHIR, so if you need to deal with FHIR data independent of versions, POCO's are cumbersome to work with.
* The parsers for POCO classes cannot deal with incorrect data - there is no way to express invalid FHIR data as a POCO, so although you will get parser errors, there is no way to recover or correct the data.
* You may only be working with FHIR data in the sense that you need to be able to parse, persist and retrieve bits of data, without needing the full overhead of creating POCOs in memory.
* You need to be able to customize data when parsing or serializing data.

The second approach, using the ``ElementModel`` abstraction, has been designed to work with these usecases. In fact, the POCO parsers are built on top of the more low-level ``ElementModel`` classes.

.. toctree::   
   :maxdepth: 3
   :hidden:
   
   parsing/poco-parsing
   parsing/poco-serialization
   parsing/intro-to-elementmodel
   parsing/isourcenode
   parsing/itypedelement
   parsing/itypedelement-serialization
   parsing/elementmodel-overview


