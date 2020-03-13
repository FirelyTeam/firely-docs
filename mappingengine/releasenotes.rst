.. _releasenotes:

Release notes
=============

All notable changes to this project will be documented in this file.
This project adheres to `Semantic Versioning <http://semver.org/>`_.

0.3.3 - 2020-02-11:
-------------------

  - Built against Vonk 3.3.0
  - Added support for reading HL7 (C)-CDA XML files natievly. See ref:

0.3.0 - 2020-02-11:
-------------------
 
 - Built against Vonk 3.2.0
 - Fix: Error messages about empty groups now contain the corresponding group id
 - Fix: Improved internal unit tests
 - Fix: Improved handling of the 'collate' target list mode. In some cases the usage of collate resulted in too many repeating elements.
 - Feature: "import" statements can now be used. All StructureMaps need to be uploaded first to the Administration Endpoint of Vonk.
 - Fix: $transform was not showing up in the CapabilityStatement of Vonk when using FHIR R4
 - Feature: Added support for different parameters for the dateOp function. See :ref:`fhirmapper_supportedfeatures`.
 - Feature: Calls to evaluate() which return an empty result set result now in an error message to improve debugging
 - Feature: $convert now uses the name of the StructureMap as its id

0.2.0 - 2019-11-18:
-------------------

  - Built against Vonk 3.0.0
  - Compatible with Vonk 3.0.0, 3.1.0
  - Upgrade to .NET API 1.4.0
  - Initial public release

0.1.0 - 2019-11-18:
-------------------
  
  - Built against Vonk 2.1.0
  - Initial internal release
