.. _releasenotes:

Release notes
=============

All notable changes to this project will be documented in this file.
This project adheres to `Semantic Versioning <http://semver.org/>`_.

Release 0.3.4 - 2020-03-23
-------------------

  - Feature: "Cannot resolve symbol" error messages now include a 'GroupId' for improved debugging
  - Feature: CCDA transformations are now supported for FHIR version STU3 in addition to R4
  - Fix: "@primitivvalue@" is no longer printed when logging static text within a mapping statement
  - Fix: "status" metadata information were not copied to the StructureMap by $convert if the mapping file included a comment between the first group and the metadata information

Release 0.3.3 - 2020-03-10
-------------------

  - Built against Vonk 3.3.0
  - Upgraded .NET API to version 1.6
  - Added support for reading HL7 (C)-CDA XML files natively. See :ref:`fhirmapper_supportedformats`.
  
Release 0.3.2 - 2020-03-03
-------------------
 
  - Internal release.

Release 0.3.1 - 2020-02-11
-------------------
 
  - Internal release.

Release 0.3.0 - 2020-02-11
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

Release 0.2.0 - 2019-11-18
-------------------

  - Built against Vonk 3.0.0
  - Compatible with Vonk 3.0.0, 3.1.0
  - Upgrade to .NET API 1.4.0
  - Initial public release

Release 0.1.0 - 2019-11-18
-------------------
  
  - Built against Vonk 2.1.0
  - Initial internal release
