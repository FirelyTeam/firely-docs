.. _primitive-types:

Primitive data types
--------------------
In FHIR, the `data types <http://www.hl7.org/fhir/datatypes.html>`__ are divided into 'primitive'
and 'complex' data types. The primitive data types are types like ``string``, ``integer``, ``boolean``,
etc. that can take a single value. The complex types consist of multiple values grouped together.

.. important:: Primitives are not really primitive in FHIR!

Because you can `extend <http://www.hl7.org/fhir/extensibility.html>`__ resources **and** data types
in FHIR, the API has provided FHIR data types for the primitive types.
Where the name of the FHIR data type would conflict with existing .Net data types, the word 'Fhir' is
added to the type, e.g. ``FhirString``. 

For each of the fields that take a primitive data type, the API provides you with two fields in the
class. |br|
One of the fields has the same name as the element it corresponds with in the FHIR resource, e.g.
``Active`` in the ``Patient`` class. This field is of the standard .Net data type.

You can fill this field just the way you would expect:

.. code-block:: csharp

	var pat = new Patient();
	pat.Active = true;

The other field has got the name of the element, with 'Element' added to it, for example
``ActiveElement`` in the ``Patient`` class. You fill this field with the FHIR data type that is in
the API:

.. code-block:: csharp

	pat.ActiveElement = new FhirBoolean(true);

.. note:: Both of the statements set the same private data member of the class. 

---------

Complex data types
------------------
Complex data types in FHIR are data types that group certain values together, such as ``Address``,
``Identifier`` and ``Quantity``. The `FHIR specification <http://www.hl7.org/fhir/datatypes.html>`__
describes which elements are part of these data types.

The API has created classes for each of the data types, with fields for each of the elements.
Most of the elements will be of a primitive data type, but you can also encounter complex types
within a complex data type.

Filling in the fields for the primitive types is explained :ref:`in the previous paragraph <primitive-types>`.
However, if you need to fill in a field that is of a complex data type, you will need to create an instance
of that type first.

For example, if we want to fill in the data for a field of type ``Identifier``,
we can use this code:

.. code-block:: csharp

	var id = new Identifier();
	
	id.System = "http://hl7.org/fhir/sid/us-ssn";
	id.Value = "000-12-3456";

	
.. |br| raw:: html

   <br />