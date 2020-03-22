.. _fhirmapper_supportedformats:

Supported source data formats
===================================
All components of the FHIR Mapper are designed to handle customs data formats as the source for a mapping to FHIR.
By default the FHIR Mapper supports reading and writing 'Custom FHIR resources' (:ref:`feature_customresources`), however it is also possible to provide data in other formats besides the JSON / XML serialization format of FHIR. 
The mapping engine therefore supports different 'adapters' which can be used to read in other formats natively.
