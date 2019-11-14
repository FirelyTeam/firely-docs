===================================
Supported Mapping Language Features
===================================

The FHIR Mapper implements a broad set of features of the FHIR Mapping Language so that you use these transformations in a variety of use cases. Please note that the FHIR Mapping Language is still under active development by the FHIR community. The following page provides an overview of all features that are supported by the our engine.

Metadata
-------------
Metadata can be added to a StrcutureMap based on a FHIR Mapping Language script by using a /// comment at the beginning of the file. It's possible to set:

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

Transformation functions
------------------------

Unsupported features
------------------------
