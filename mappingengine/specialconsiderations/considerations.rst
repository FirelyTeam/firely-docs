.. _fhirmapper_special_considerations:

Special Considerations
======================

The following special considerations - and features - are handy to keep in mind when working with the FHIR Mapper.

log statement
~~~~~~~~~~~~~

where/check statements
~~~~~~~~~~~~~~~~~~~~~~
Enclose the ``where`` and ``check`` FHIRPath statements (`documentation <https://www.hl7.org/fhir/mapping-language.html#7.7.0.7.1>`_) in double quotes: ::

  src.contact as s where "address.exists()" -> ...
  
