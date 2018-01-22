.. _feature_snapshot:

Snapshot generation
===================

Vonk is capable of generating a Snapshot for a StructureDefinition. This operation is not defined in the FHIR Specification.

You can invoke this operation with
::

    POST <vonk-endpoint>/StructureDefinition/$Snapshot

* The body must contain the StructureDefinition that you want filled with a fresh snapshot. The StructureDefinition may contain an existing snapshot, it will be ignored.
* The Content-Type header must match the format of the body (application/fhir+json or application/fhir+xml)

Vonk will return the same StructureDefinition, but with the snapshot element (re-)generated.

.. _feature_snapshot_pre:

Precondition
------------

Vonk must be aware of all the other StructureDefinitions that are referred to by the StructureDefinition in the body of the request. Refer to the :ref:`conformance` for more information.
