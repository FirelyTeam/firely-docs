.. _fhirmapper_supportedfeatures:

Supported Mapping Language features
===================================

The FHIR Mapper implements a broad set of features of the FHIR Mapping Language, allowing you write transformations to handle a variety of use cases. Please note that the FHIR Mapping Language is still under active development by the FHIR community. The following page provides an overview of all features that are supported by our engine.

Metadata
-------------
Metadata can be added to a StructureMap based on a FHIR Mapping Language script by using a ``///`` comment at the beginning of the file. It's possible to set:

- StructureMap.title
- StructureMap.version
- StructureMap.status

::

  /// version = 0.1
  /// title = "FHIR Mapper Tutorial : FakeInpatientDrugChart"
  /// status = draft

  map "http://vonk.fire.ly/fhir/StructureMap/FHIRMapperTutorial" = FHIRMapperTutorial

Imported StructureDefinitions can be annotated with an alias that can be used instead of the type name throughout the mapping file: ::

  uses "http://hl7.org/fhir/StructureDefinition/Patient" alias PatientAlias as source
  group MapPatient(source src: PatientAlias, target bundle: Bundle) {...}


Flow control
-------------
In some cases it is necessary to control which order mapping groups are executed. It's possible to chain mapping groups in order for them to be evaluated subsequently: ::

  group MapFakeInpatientDrugChart(source src: FakeInpatientDrugChart, target bundle: Bundle)
  {
    src -> bundle.id = uuid();
    src -> bundle.entry as entry, entry.resource = create('Patient') as patient then
      TransformPatient(src, patient), TransformPatientPostHandler(src, patient, bundle);
  }

Here ``TransformPatient`` is called first followed by ``TransformPatientPostHandler``, allowing to refine the created Patient resource or to use its content in another resource mapping.

Transformation functions
------------------------
The FHIR Mapping language defines a series of transformation functions that can alter the source content before being copied to a target. The following functions are currently supported by the FHIR Mapper.

1. ``create('<type>')`` - explicitly create an element to pass it into a subsequent rule / mapping group: ::
 
    src.guardian as guardian -> patient.contact = create('BackboneElement') as contact collate then {...}

2. ``dateOp('<date>')`` - transform a string to a date: ::

    src.dateOfBirth as dateOfBirth -> patient.birthDate = dateOp(dateOfBirth);

3. ``uuid()`` - create a random UUID: ::

    src -> tgt.id = uuid();

4. ``cc('<text>')`` / ``cc('<CodeSystemCanonical>', '<code>', '<DisplayValue>')`` - create a CodeableConcept: ::

    src -> observation.category = cc('http://hl7.org/fhir/observation-category', 'vital-signs', 'Vital Signs');

5. ``id('<CodeSystemCanonical>', '<identifier>')`` - create an Identifier: ::

    src.mpi as mpi -> patient.identifier = id('http://vonk.fire.ly/fhir/CodeSystem/mpi', mpi) as identifier, identifier.use = 'official';

6. ``c('<CodeSystemCanonical>', '<code>', '<DisplayValue>')`` - create a Coding.

7. ``cast(source, '<type>')`` - cast source to a certain different type.

8. ``translate(source, map_uri, output)`` - transform codes using a `ConceptMap <https://www.hl7.org/fhir/conceptmap.html>`_ by its canonical URL. The conceptmap must be available on the non-administrative ``/`` endpoint (temporary limitation). Note that only ``equal`` and ``equivalent`` equivalences are supported. ::

  src.gender as gender -> patient.gender =
    translate(gender, 'http://vonk.fire.ly/fhir/ConceptMap/MyFakePatientGender', 'code');

List modes
------------------------
FHIR Mapper supports the ``collate`` list mode: so if you have multiple rules that create elements within one backbone element, and you'd like all elements to go into one backbone element, you need to use collate - otherwise the engine will create multiple backbone elements with only one element each.

FHIRPath Checks
------------------------
A mapping rule can be conditionally blocked from running by including a FHIRPath statement as a ``where`` selector: ::

  src.weight where "weight.exists()" -> bundle.entry as entry,
            entry.resource = create('Observation') as observation
            then TransformObservationWeight(src, patient, observation);

Please note that the FHIRPath result set is selected on the source of the mapping rule. Even if you select src.<element> as your input for the target transformation, the FHIRPath is run on ``src`` and not on ``<element>`` - so in our example, you still have to say ``weight.exists()``, not ``$this.exists()``. It's even possible to use FHIRPath variables like ``$this``.

Similar to ``where``, FHIR mapper also supports ``check`` - using that will raise an error if the condition fails.

Logging
------------------------
For debugging purposes source content can be dumped as an OperationOutcome via a ``log`` statement. A log statement can include an arbitrary FHIRPath statement and is executed on the source of the transformation rule: ::

  patient.id as patientId log "$this" -> observation.subject = create('Reference') as subject,
      subject.reference = evaluate(patientId, '\'Patient/\' + $this');

To see the debugging output StructureMap.experimental needs to be set to ``true``.

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

- The following items are not supported when selecting a source element:
  
  - type
  - min..max
  - default
  - list-option

- The following list modes on a target transform are not supported:

  - first
  - last
  - share

- <<stereotypes>> for mapping groups
- Extending groups
- conceptmaps embedded in the mapping file (they have to be uploaded to Vonk instead)
- Using the "as queried" / "as produced" modes when importing a StructureDefinition
