.. _mappingengine_create_logical_model:

Logical Model
=============

Unless your data is in FHIR already, or you're working with custom resources, you need create a model to describe your to the mapping engine.

1. Describe your logical model in Forge: see :ref:`forge_logical_models`. An example model `is available <https://simplifier.net/.netfhirmappingengine/fakeinpatientdrugchart>`_ and we'll it in the following documentation.

.. image:: ../images/sample-logical-model.png

2. Convert this logical model to a custom resource:

   2.1. Set ``.kind`` to ``resource``.

   2.2. Ensure the ``.url`` starts with ``http://hl7.org/fhir/StructureDefinition``. This is a temporary limitation.
      2.2.1. In our example, change from ``http://example.org/mappingengine/fhir/StructureDefinition/FakeInpatientDrugChart`` to ``http://hl7.org/fhir/StructureDefinition/FakeInpatientDrugChart``.
   
   2.3. Remove the URL from ``.type`` and set it to just a name.

      2.3.1. In our example, change from ``http://example.org/fhir/StructureDefinition/FakeInpatientDrugChart`` to ``FakeInpatientDrugChart``.

   2.3. 