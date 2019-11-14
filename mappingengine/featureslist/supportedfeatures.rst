===================================
Supported Mapping Language Features
===================================

The FHIR Mapper implements a broad set of features of the FHIR Mapping Language, allowing you use write transformations to handle a variety of use cases. Please note that the FHIR Mapping Language is still under active development by the FHIR community. The following page provides an overview of all features that are supported by the our engine.

Metadata
-------------
Metadata can be added to a StructureMap based on a FHIR Mapping Language script by using a /// comment at the beginning of the file. It's possible to set:

- StrcutureMap.title
- StrcutureMap.version
- StrcutureMap.status

::

  /// version = 0.1
  /// title = "FHIR Mapper Tutorial : FakeInpatientDrugChart"
  /// status = draft

  map "http://vonk.fire.ly/fhir/StructureMap/FHIRMapperTutorial" = FHIRMapperTutorial


Flow control
-------------
In some cases it is necessary to control which order mapping groups are executed. It's possible to chain mapping groups in order for them to be evaluated subsequently ::

  group MapFakeInpatientDrugChart(source src: FakeInpatientDrugChart, target bundle: Bundle)
  {
    src -> bundle.id = uuid();
    src -> bundle.entry as entry, entry.resource = create('Patient') as patient then
      TransformPatient(src, patient), TransformPatientPostHandler(src, patient, bundle);
  }

Here TransformPatient is called first followed by TransformPatientPostHandler, allowing to refine the created Patient resource or to use its content in another resource mapping.

Transformation functions
------------------------
The FHIR Mapping language defines a series of transformation functions that can alter the source content before being copied to a target. The following functions are currently supported by the FHIR Mapper.

1. create('<type>') - Explicitly create an element to pass it into a subsequent rule / mapping group::
  
  src.guardian as guardian -> patient.contact = create('BackboneElement') as contact collate then {...}

2. dateOp('<date>') - Transform a string to a date::

  src.dateOfBirth as dateOfBirth -> patient.birthDate = dateOp(dateOfBirth);

3. uuid() - Creates a random UUID:

  src -> tgt.id = uuid();

4. cc('<text>') / cc('<CodeSystemCanonical>', '<code>', '<DisplayValue>') - Create a CodeableConcept ::

  src -> observation.category = cc('http://hl7.org/fhir/observation-category', 'vital-signs', 'Vital Signs');
  
5. id('<CodeSystemCanonical>', '<identifier>') - Create an Identifier::

  src.mpi as mpi -> patient.identifier = id('http://vonk.fire.ly/fhir/CodeSystem/mpi', mpi) as identifier, identifier.use = 'official';

6. c('<CodeSystemCanonical>', '<code>', '<DisplayValue>') - Create a Coding

7. cast(source, '<type>') - Cast a source to a certain different type

FHIRPath Checks
------------------------

Unsupported features
------------------------

- Transformation functions:

  - truncate
  - escape
  - append
  - reference
  - pointer
  - qty
  - cp
  
- <<stereotypes>> for mapping groups
- Using the "as queried" / "as produced" modes when importing a StructureDefinition
