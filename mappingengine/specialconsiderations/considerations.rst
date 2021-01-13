.. _fhirmapper_special_considerations:

Special considerations
======================

The following special considerations - and features - are handy to keep in mind when working with the FHIR Mapper.

log statement
~~~~~~~~~~~~~
FHIR Mapper supports logging with ``log``, but it is a bit different from the specification: 

1. use ``log`` in the start source field
2. enclose the log statement in double quotes ``"``
3. enclose plain text within the log statement in single quotes ``'``
4. concatenate values with ``+``

Example: ::

    src.patientName as s log"'patient name is ' + $this.patientName" -> tgt.name as t, t.text = s;

where/check statements
~~~~~~~~~~~~~~~~~~~~~~
Enclose the ``where`` and ``check`` FHIRPath statements (`documentation <https://www.hl7.org/fhir/mapping-language.html#7.7.0.7.1>`_) in double quotes: ::

  src.contact as s where "address.exists()" -> ...
  
bulk input
~~~~~~~~~~
In order to transform data in bulk, submit it in CSV format. JSON format supports only individual transformations.
