.. _fhirmapper_supportedformats:

Supported source data formats
===================================
All components of the FHIR Mapper are designed to handle customs data formats as the source for a mapping to FHIR.
By default the FHIR Mapper supports reading and writing 'Custom FHIR resources' (:ref:`feature_customresources`), however it is also possible to provide data in other formats besides the JSON / XML serialization format of FHIR. 
The mapping engine therefore supports different 'adapters' which can be used to read in other formats natively.

+-------------------------------+-------------------------+-----+--------+-----+-------------+
| FHIR Version / Content format | Custom Resources (FHIR) | CSV | HL7 v2 | VCF | HL7 (C)-CDA |
+===============================+=========================+=====+========+=====+=============+
| FHIR STU3                     | X                       | X   |        | X   | X           |
+-------------------------------+-------------------------+-----+--------+-----+-------------+
| FHIR R4                       | X                       | X   | X      | X   | X           |
+-------------------------------+-------------------------+-----+--------+-----+-------------+

CSV
-------------
The FHIR Mapper supports mapping a comma-separated values (CSV) file without any prior setup (e.g. creating StructureDefinitions). You can POST the CSV file as the HTTP Body to the $transform operation and access its metadata and content within a StructureMap.

To enable CSV support, please adjust the BinaryWrapper settings in your appsettings.instance.json to allow Firely Server to accept the ``text/csv`` Content-Type header: ::

      "Vonk.Plugin.BinaryWrapper":{
        "RestrictToMimeTypes": ["application/pdf", "text/plain", "image/png", "image/jpeg", "text/fhir-mapping", "text/csv"]
      }

In order to fully use the type-safety features of the FHIR Mapping Language, a StructureDefinition is generated automatically by the FHIR Mapper when a CSV file is received. Depending on the composition of the CSV, two different formats are used:

1. CSV file contains a header with column metadata:

For example, given a CSV file that contains the following rows: ::

    ID, Given,        Family,     Gender
    1,  Peter James,  Chalmers,   M
    2,  Sandy,        Notsowell,  F 
    
The following StructureDefinition would be produced in the background while executing $transform: 

.. raw:: html

  <embed>
    <iframe src=https://simplifier.net/embed/render?id=fhirmapperr4/csvtransport height="345px" width="100%"></iframe>
  </embed>
  
The .hasHeader child element indicates if the CSV mapping adapter was configured to interpret the first row of the CSV file as a header record. This behaviour can be indicated according to `RFC 4180 <https://tools.ietf.org/html/rfc4180>`_ by using the ``header`` parameter in the Content-Type header, ie: ``text/csv; header=present``.

All other column identifiers are exposed as child elements of the .record BackboneElement. They can directly be used in a mapping rule: ::

  src.record as record then 
  {
    record.ID as id -> tgt.identifier = id('<system>', id);
    record.Given as given -> tgt.name as name, name.given = given;
    record.Family as family -> tgt.name as name collate, name.family = family;
    record.Gender as gender -> tgt.gender = translate('<ConceptMap>', gender, 'code');
  };
  
2. CSV file contains no header metadata:

Regardless if the CSV file contains a header, all elements are accessible for the mapping to FHIR. For files not containing a metadata row, element names for the mapping source are generated dynamically as ``field#`` (starting with field0): :: 

  src.record as record then 
  {
    record.field0 as id -> tgt.identifier = id('<system>', id);
    record.field1 as given -> tgt.name as name, name.given = given;
    record.field2 as family -> tgt.name as name collate, name.family = family;
    record.field3 as gender -> tgt.gender = translate('<ConceptMap>', gender, 'code');
  };
  
(C)-CDA
-------------
The FHIR Mapper supports mapping (C)-CDA XML documents to FHIR documents. All files needed to execute these mappings are provided as package in the `Firely.FhirMapper.Examples Repository <https://github.com/FirelyTeam/Firely.FhirMapper.Examples>`_. 

It contains:

1. StructureDefinitions respresenting (C)-CDA documents and all corresponding data types. All StructureDefinitions are based on the `CDA-Core-2.0 <https://github.com/HL7/cda-core-2.0>`_ Project from HL7 International. For more information see `CDA-Core-2.0 ImplementationGuide <http://build.fhir.org/ig/HL7/cda-core-2.0/>`_.
2. StructureMap / FHIR Mapping Language files for executing the mapping. For C-CDA documents, the mappings are based on an open-source project provided by HL7 International. See `ccda-to-fhir GitHub project <https://github.com/HL7/ccda-to-fhir>`_. For more information about the scope of the mappings see `HL7 CCDA Mapping Report <https://github.com/HL7/ccda-to-fhir/blob/master/Mapping%20Report.pdf>`_. A high-level overview of the mapping can be found `here as an Excel Sheet <https://github.com/HL7/ccda-to-fhir/blob/master/CDA-to-FHIR_mappings.xlsx>`_.

To enable (C)-CDA support, please adjust the BinaryWrapper settings in your appsettings.instance.json to allow Firely Server to accept the ``application/hl7-sda+xml`` Content-Type header: ::

      "Vonk.Plugin.BinaryWrapper":{
        "RestrictToMimeTypes": ["application/pdf", "text/plain", "image/png", "image/jpeg", "text/fhir-mapping", "application/hl7-sda+xml"]
      }
