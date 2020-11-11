Model classes
-------------
For each Resource type and data type in FHIR, the SDK contains a class in the form of a public partial
class. If you need extra code to be performed when using these classes, you can just implement
your own partial class for it. That way you can keep your code separate from the SDK code.

Creating a new Patient resource instance, and an instance of the Identifier data type:

.. code-block:: csharp

	var pat = new Patient();
	var id = new Identifier();

.. important:: When you are creating an instance of a resource or data type, lookup the
	definition in the `FHIR specification <http://www.hl7.org/fhir>`__ to see which
	elements are mandatory for that particular type.


Class fields
^^^^^^^^^^^^
The SDK classes have a field for each of the elements in the Resource or data type model.
For example, the Patient resource has an ``active`` element:

.. image:: ../images/fhir_patient_active.png

The Patient class in the SDK has a field called ``Active`` that corresponds with this element:
 
.. image:: ../images/sdk_patient_active.png

Likewise, the Identifier data type has an element called ``use``:

.. image:: ../images/fhir_identifier_use.png

And the Identifier class in the SDK has a field called ``Use`` that corresponds with this element:
 
.. image:: ../images/sdk_identifier_use.png

As you can see, the classes and fields all have inline documentation describing them.