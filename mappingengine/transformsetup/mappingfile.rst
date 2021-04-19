.. _mapping_file:

Mapping File
============

The mapping files give purpose to our FHIR Mapper: with them, we're able to `$transform <https://www.hl7.org/fhir/structuremap-operation-transform.html>`_ data from one format to another. These transformation rules can be represented in two formats:

- `FHIR Mapping Language syntax <https://www.hl7.org/fhir/mapping-language.html>`_ (human-readable)
- `FHIR StructureMap resource <https://www.hl7.org/fhir/stu3/structuremap.html>`_ (machine-readable)

These two formats are isomorphic and can be converted between each other. 

The FHIR Mapper operates on a StructureMap resource, so let's convert the mapping file to a `StructureMap <https://www.hl7.org/fhir/structuremap.html>`_ resource and upload to our Firely Server. 

1. ``POST http(s)://<firely-server-endpoint>/administration/$convert`` with the body as your mapping file and the ``Content-Type`` header set to ``text/fhir-mapping;charset=utf-8`` to convert your mapping file to a StructureMap. The operation parses your mapping file to check it is valid. You will receive an OperationOutcome if an syntax error is encountered, including a hint on how to fix it.

  1.1. In our example, ``POST http://localhost:4080/administration/$convert`` with `our sample map <https://simplifier.net/fhirmapper/FHIRMapperTutorial/~overview>`_ as the body.

2. ``POST http(s)://<firely-server-endpoint>/administration/StructureMap`` with the resulting ``StructureMap``, or ``PUT`` to a unique ID. Make sure you don't make duplicates of the StructureMap on the server - so always use ``PUT`` to update the existing one afterwards. Note down logical ID of your map.

  2.1. In our example, add ``"id": "tutorial",`` to the StructureMap received in step 1 and upload it to ``http://localhost:4080/administration/StructureMap/FHIRMapperTutorial``. Thus ``FHIRMapperTutorial`` is the logical ID we're working with.
  
.. note::

  The $convert operation supports a persist option. By adding ?persist=true to the $convert URL, the FHIR Mapper will automatically   store the StructureMap. StructureDefinition.id and hence the location of the StructureMap will be automatically chosen based on   StructureMap.name. 

With the structure map and the logical model uploaded to Firely Server, you are now ready to run your transformations (:ref:`running_transforms`).
