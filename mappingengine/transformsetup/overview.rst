.. _setup_transforms:

Setting up transformations
==========================

The FHIR Mapper was designed to handle two kinds of transformations:

- Converting a FHIR Mapping Language file into a FHIR StructureMap resource
- Transforming an instance of a custom format into FHIR or vice-versa

Prior to running the data mapping `$transform <https://www.hl7.org/fhir/structuremap-operation-transform.html>`_ operation, you need to have two things in place:

1. A definition of the data you'll be working with in the `StructureDefinition <https://www.hl7.org/fhir/structuredefinition.html>`_ format.

   1.1. If you're converting from FHIR resources, then this is already available in Firely Server. Otherwise:

   1.2. Create a logical model in Forge, see: :ref:`forge_logical_models`.

2. Your `mapping file <https://www.hl7.org/fhir/mapping-tutorial.html>`_ as a `StructureMap <https://www.hl7.org/fhir/StructureMap.html>`_ resource.

   2.1. Once you've written your mapping file, you can use Firely Server's `$convert <http://hl7.org/fhir/resource-operation-convert.html>`_ operation to convert it to a StructureMap for you.

With the definition of data(1) and the mapping file(2) available and uploaded to Firely Server, you can start transforming your data!

The following sections will guide you through all of the steps to setup your transformation and then run it.

.. toctree::
   :maxdepth: 1
   :titlesonly:
   :hidden:
   

   logicalmodel
   mappingfile
