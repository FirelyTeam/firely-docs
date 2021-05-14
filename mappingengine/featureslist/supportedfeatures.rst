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

  map "http://server.fire.ly/fhir/StructureMap/FHIRMapperTutorial" = FHIRMapperTutorial

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

2. ``dateOp('<input>', '<date | dateTime>')`` - transform a string to a FHIR date or dateTime. The input must match the FHIR data type specification: ::

    src.dateOfBirth as dateOfBirth -> patient.birthDate = dateOp(dateOfBirth, 'date');
    
Additional parameters are supported:
  
- ``dateOp('<input>', '<inputFormat>', '<date | dateTime>')``
- ``dateOp('<input>', '<inputFormat>', '<outputFormat>', '<outputType>')``. Custom types for other information models then FHIR are supported as the outputType. See `Custom date and time format strings <https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings>`_ for available format strings.

3. ``uuid()`` / ``uuid('<name>', '<3 | 5>')`` - create a random UUID. See `RFC4122 <https://tools.ietf.org/html/rfc4122#section-4.3>`_ for more information. ::

    src -> tgt.id = uuid();

4. ``cc('<text>')`` / ``cc('<CodeSystemCanonical>', '<code>', '<DisplayValue>')`` - create a CodeableConcept: ::

    src -> observation.category = cc('http://hl7.org/fhir/observation-category', 'vital-signs', 'Vital Signs');

5. ``id('<CodeSystemCanonical>', '<identifier>')`` - create an Identifier: ::

    src.mpi as mpi -> patient.identifier = id('http://server.fire.ly/fhir/CodeSystem/mpi', mpi) as identifier, identifier.use = 'official';

6. ``c('<CodeSystemCanonical>', '<code>', '<DisplayValue>')`` - create a Coding.

7. ``cast(source, '<type>')`` - cast source to a certain different type. The following cast options are supported:

+----------+--------+------+----+----------+-----+-----+------+-----------+-----+--------------+---------+-------------+------------+---------+---------+----------+------+
|          | string | code | id | markdown | uri | oid | uuid | canonical | url | base64Binary | integer | unsignedInt | positivInt | decimal | boolean | dateTime | time |
+==========+========+======+====+==========+=====+=====+======+===========+=====+==============+=========+=============+============+=========+=========+==========+======+
| string   | X      | X    | X  | X        | X   | X   | X    | X         | X   | X            | X       |             |            |         |         |          |      |
+----------+--------+------+----+----------+-----+-----+------+-----------+-----+--------------+---------+-------------+------------+---------+---------+----------+------+
| integer  |        |      |    |          |     |     |      |           |     |              | X       | X           | X          |         |         |          |      |
+----------+--------+------+----+----------+-----+-----+------+-----------+-----+--------------+---------+-------------+------------+---------+---------+----------+------+
| decimal  |        |      |    |          |     |     |      |           |     |              |         |             |            | X       |         |          |      |
+----------+--------+------+----+----------+-----+-----+------+-----------+-----+--------------+---------+-------------+------------+---------+---------+----------+------+
| boolean  |        |      |    |          |     |     |      |           |     |              |         |             |            |         | X       |          |      |
+----------+--------+------+----+----------+-----+-----+------+-----------+-----+--------------+---------+-------------+------------+---------+---------+----------+------+
| dateTime |        |      |    |          |     |     |      |           |     |              |         |             |            |         |         | X        |      |
+----------+--------+------+----+----------+-----+-----+------+-----------+-----+--------------+---------+-------------+------------+---------+---------+----------+------+
| time     |        |      |    |          |     |     |      |           |     |              |         |             |            |         |         |          | X    |
+----------+--------+------+----+----------+-----+-----+------+-----------+-----+--------------+---------+-------------+------------+---------+---------+----------+------+

8. ``translate(source, map_uri, output)`` - transform codes using a `ConceptMap <https://www.hl7.org/fhir/conceptmap.html>`_ by its canonical URL. The ConceptMap must be available on the ``/administration`` endpoint. Note that only ``equal`` and ``equivalent`` equivalences are supported. ::

    src.gender as gender -> patient.gender = translate(gender, 'http://server.fire.ly/fhir/ConceptMap/MyFakePatientGender', 'code');

9. ``truncate(source, maxLength)`` - shorten the source input - which must be a string - to maxLength by cutting it off. ::

    src.name as name, name.text as text -> tgt.name as name, name.text = truncate(text, 10);

Target List modes
------------------------
FHIR Mapper supports the ``collate`` target list mode: so if you have multiple rules that create elements within one backbone element, and you'd like all elements to go into one backbone element, you need to use collate - otherwise the engine will create multiple backbone elements with only one element each. ::

  src.identifierPart1 as value -> tgt.identifier = create('Identifier') as identifier, identifier.value = value;
  src -> tgt.identifier as identifier collate, identifier.system = 'TestSystem';
  
Source Content
------------------------
  - type
  - min..max
  - default
  - list-option

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

Default mapping groups
------------------------
In order to accommodate the fact that neither <<types>> or <<type+>> annotation are supported on a group level, the FHIR Mapper implements a default copy mechanism. A source element can be mapped to a target directly using the "Simple Form" ``src.element -> tgt.element`` if the source and target element consist of the same type. No casts are possible. In case of a type mismatch, the copy rule is silently ignored. For choice types, the target type is being derived from the src type.

Unsupported features
------------------------

- Transformation functions:

  - escape
  - append
  - reference
  - pointer
  - qty
  - cp

- The following list modes on a target transform are not supported:

  - first
  - last
  - share

- <<stereotypes>> for mapping groups
- Extending groups
- conceptmaps embedded in the mapping file (they have to be uploaded to Firely Server instead)
- Using the "as queried" / "as produced" modes when importing a StructureDefinition
