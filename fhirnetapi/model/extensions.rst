Extensions
----------
In the :ref:`primitive-types` paragraph, we have mentioned that both resource *and* data types
can be extended in FHIR. To add an extension to your data, you will have to fill in both a URL
identifying the extension and a value that is valid according to the definition of the
extension.

The following code example adds a place and time of birth to our Patient instance defined by
`standard extensions <http://www.hl7.org/fhir/patient-profiles.html#extensions>`__ in the FHIR
specification. The URL and the type of value you can fill in are listed in the definition of the
extension. The definition will also tell you on what field the extension can be added.

.. code-block:: csharp

	var birthplace = new Extension();
	birthplace.Url = "http://hl7.org/fhir/StructureDefinition/birthPlace";
	birthplace.Value = new Address() { City = "Seattle" };
	pat.Extension.Add(birthplace);
	
	var birthtime = new Extension("http://hl7.org/fhir/StructureDefinition/patient-birthTime",
	                               new FhirDateTime(1983,4,23,7,44));
	pat.BirthDateElement.Extension.Add(birthtime);

The extension for birthPlace is pretty straightforward to add. The URL is taken from the
extension definition. The value is of type ``Address``, and the extension can be added to the
top-level of the Patient instance. |br|
The birthTime extension is a little more complex. This extension takes a ``dateTime`` value, and
has to be added to the ``BirthDate`` field. For this field the API provides you with the easy way
to fill it, by allowing you to set the value of ``BirthDate`` as a ``string`` -- internally
converting this to the ``Date`` type. This means you will have to use the ``[fieldname]Element``
construction to add extensions to the field.

	
.. |br| raw:: html

   <br />