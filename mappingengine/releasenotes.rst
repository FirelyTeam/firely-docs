.. _mapping_releasenotes:

Release notes
=============

All notable changes to this project will be documented in this file.
This project adheres to `Semantic Versioning <http://semver.org/>`_.

.. _mapping_releasenotes_071:

Release 0.7.1 - 2021-05-12
--------------------------
- Fix: CSV entries that are enclosed with a double-qoute (e.g. values that contain a delimiter sign in the value itself) do not contain the surrounding quotes as part of their value anymore when mapped to FHIR

.. _mapping_releasenotes_070:

Release 0.7.0 - 2021-04-09
--------------------------
- Feature: Added an overload to the uuid() mapping function. It allows to create uuids in version 3 and version 5.  See :ref:`fhirmapper_supportedfeatures`.
- Fix: Re-enabled support for (C)-CDA Transformations
- Fix: CSV parser preserves the casing of the CSV headers, uppercase headers don't need to be written as lowercase anymore
- Fix: Segment location is reported in OperationOutcome error message if segment contains too many components

.. _mapping_releasenotes_060:

Release 0.6.0 - 2021-01-27
--------------------------

- Known Issue: The (C)-CDA support is currently disabled due to an issue with accessing the .value element of a complex CDA element. We will publish a hotfix for this as soon as possible.
- Known Issue: CSV parsing lowercases all identifiers, meaning that CSV headers should be accessed lowercase in the map file.

- Feature: Upgraded to Firely SDK version 2.0.3. This new major release includes improved support for the normative version of FHIRPath. See https://github.com/FirelyTeam/firely-net-sdk/wiki/Breaking-changes-in-2.0#changes-to-the-fhirpath-engine for more details.
- Feature: ": <type>" (StructureDefinition.group.rule.source.type) can now be used on the source side of a mapping rule
- Feature: "(min..max)" (StructureDefinition.group.rule.source.min / max) can now be used on the source side of a mapping rule
- Feature: StructureMapSourceListMode (first | not_first | last | not_last | only_one) are now fully implemented
- Feature: $convert is now extracting /// experimental = <bool> from a StructureMap as a metadata annotation
- Experimental support for HL7 v2 has been added. See :ref:`fhirmapper_supportedformats`. 
- Feature: Suppport for <<types>> group annotations has been added. Please note that <<type+>> annotations are not yet supported.
- Feature: A "delimiter=<delimiter>" and "header = <absent|present>" parameter can be added to the Content-Type header for text/csv
- Fix: The internal LogicalModel type for CSV representation has been renamed from CSV_Transport to CSV
- Fix: A simple copy rule now checks if the source and target types are the same instance types
- Fix: Let statements with constants can now be used
- Fix: Line numbers have been added to error messages from the CSV parser to improve the debugging experience
- Fix: "/administration" was always included the .reference string of a Reference. Now all references stay as they are defined in the mapping. No absolute reference is being generated when executing $transform
- Fix: Include more details in the error message if the compilation step to IL fails when executing $transform


.. _mapping_releasenotes_050:

Release 0.5.0 - 2020-09-04
--------------------------

- Feature: Support for parsing Variant Call Format files. See :ref:`fhirmapper_supportedformats`.
- Feature: External variables can now be used in a log FHIRPath statement using the %var syntax
- Feature: "default" FHIRPath statements can now be specified in mapping rules, the default FHIRPath statement will be executed if the src element is empty
- Feature: Upgrade to .NET FHIR API v1.9
- Fix: An error is now thrown if a mapping attempts to call a mapping function without a contex (e.g. "src.ele -> create('<resourceType>') as var", note the missing target assignment)

.. _mapping_releasenotes_036:

Release 0.4.0 - 2020-07-26
--------------------------

- Fetaure: Implement $transform as a Type level interaction using Parameter resources as input
- Feature: Upgrade the .NET FHIR API to 1.7
- Feature: $convert?$persist returns a location header
- Feature: External variables can now be used in a where FHIRPath check using the %var syntax
- Feature: Added support for the truncate transformation function
- Feature: Added support for casting a string to an integer
- Feature: Allow any kind of date type as the first parameter of dateOp
- Feature: Support the direct mapping of complex child elements
- Fix: Don't overwrite non-repeating elements if the collate option is being used
- Fix: The initial group selection did not account for type aliases

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
