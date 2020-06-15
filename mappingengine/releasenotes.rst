.. _mapping_releasenotes:

Release notes
=============

All notable changes to this project will be documented in this file.
This project adheres to `Semantic Versioning <http://semver.org/>`_.

.. _mapping_releasenotes_036:

Release 0.3.6 - 2020-06-09
--------------------------

- Fix: Using $convert with the ?persist would try to persist the result of the conversion even if there was an error.

.. _mapping_releasenotes_035:

Release 0.3.5 - 2020-05-26
--------------------------

  - Feature: As StructureMaps are conformance resources, they are now stored in the Vonk administration endpoint. Please check :ref:`configure_mapping_engine` for enabling $convert and $transform on the /administration endpoint. Using the FHIR Mapper on the default branch ("{{BASE_URL}}/") is no longer supported.
  - Feature: Support for natively mapping text/csv content to FHIR. See :ref:`fhirmapper_supportedformats`.
  - Feature: Adding ?persist=true to $convert will now automatically store the StructureMap in Vonk
  - Fix: Improved the error message if an unknown / uninterpretable Content-Type header was sent to $transform
  - Fix: $transform could be executed on a StructureMap using a different information model (e.g. executing $transform using FHIR R4 on a StructureMap stored in STU3). This could lead to unexpected behaviour in the mapping execution.
  - Fix: If a FHIR Bundle was produced using $transform and the debug mode was enabled, a Bundle of Bundles would be returned. Now, the debug log is integrated into the result bundle.
  - Fix: Using a FHIRPath statement in "check" mode always threw an error regardless of the statement
  - Fix: A stacktrace is now included in error messages thrown during the execution of $transform
  - Fix: Harmonized the dateOp parameters with FHIR data types.
  - Fix: The source resource type of the initial mapping group is now checked against the provided resource type when calling $transform
  - Fix: Return an exception if it is attempted to create a child of a choice[x] element without passing a concrete type.
  - Fix: Circular 'using' statements could lead to a StackOverflow in Vonk

Release 0.3.4 - 2020-03-23
--------------------------

  - Feature: "Cannot resolve symbol" error messages now include a 'GroupId' for improved debugging
  - Feature: CCDA transformations are now supported for FHIR version STU3 in addition to R4
  - Fix: "@primitivvalue@" is no longer printed when logging static text within a mapping statement
  - Fix: "status" metadata information were not copied to the StructureMap by $convert if the mapping file included a comment between the first group and the metadata information

Release 0.3.3 - 2020-03-10
--------------------------

  - Built against Vonk 3.3.0
  - Upgraded .NET API to version 1.6
  - Added support for reading HL7 (C)-CDA XML files natively. See :ref:`fhirmapper_supportedformats`.
  
Release 0.3.2 - 2020-03-03
--------------------------
 
  - Internal release.

Release 0.3.1 - 2020-02-11
--------------------------
 
  - Internal release.

Release 0.3.0 - 2020-02-11
--------------------------
 
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
--------------------------

  - Built against Vonk 3.0.0
  - Compatible with Vonk 3.0.0, 3.1.0
  - Upgrade to .NET API 1.4.0
  - Initial public release

Release 0.1.0 - 2019-11-18
--------------------------
  
  - Built against Vonk 2.1.0
  - Initial internal release
