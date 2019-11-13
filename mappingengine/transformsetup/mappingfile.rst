.. _mapping_file:

Mapping File
============

The mapping files give meaning to our mapping engine: with it, we're able to `$transform <https://www.hl7.org/fhir/structuremap-operation-transform.html>`_ data from one format to another. Lets convert the mapping file to a `StructureMap <https://www.hl7.org/fhir/structuremap.html>`_ and upload to our Vonk.

1. ``POST http(s)://<vonk-endpoint>/$convert`` with the body as your mapping file and the ``Content-Type`` header set to ``text/fhir-mapping;charset=utf-8`` to convert your mapping file to a StructureMap.

2. ``POST http(s)://<vonk-endpoint>/StructureMap`` with the resulting ``StructureMap``, or ``PUT`` to a unique ID. Make sure you don't make duplicates of the StructureMap on the server - so always use ``PUT`` to update the existing one afterwards. Note down logical ID of your map.

  2.1. In our example, we'll upload the map to ``http://localhost:4080/StructureMap/tutorial``, so the logical ID is ``tutorial``.
  
With the structure map and the logical model upload to Vonk, you are now ready to run your transformations (:ref:`running_transforms`).
