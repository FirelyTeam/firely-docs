.. _mapping_file:

Mapping File
============

The mapping files give purpose to our FHIR Mapper: with them, we're able to `$transform <https://www.hl7.org/fhir/structuremap-operation-transform.html>`_ data from one format to another. Let's convert the mapping file to a `StructureMap <https://www.hl7.org/fhir/structuremap.html>`_ resource and upload to our Vonk. The whole specification of the FHIR Mapping Language can be found `here <https://www.hl7.org/fhir/mapping-language.html>`_.

1. ``POST http(s)://<vonk-endpoint>/$convert`` with the body as your mapping file and the ``Content-Type`` header set to ``text/fhir-mapping;charset=utf-8`` to convert your mapping file to a StructureMap. The operation parses your mapping file to check it is valid. You will receive an OperationOutcome if an syntax error is encountered inclduing a hint on how to fix it.

2. ``POST http(s)://<vonk-endpoint>/StructureMap`` with the resulting ``StructureMap``, or ``PUT`` to a unique ID. Make sure you don't make duplicates of the StructureMap on the server - so always use ``PUT`` to update the existing one afterwards. Note down logical ID of your map.

  2.1. In our example, we'll upload the map to ``http://localhost:4080/StructureMap/tutorial``, so the logical ID is ``tutorial``.
  
With the structure map and the custom resource uploaded to Vonk, you are now ready to run your transformations (:ref:`running_transforms`).
