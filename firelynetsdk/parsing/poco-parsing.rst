.. _poco-parsing

==================
Parsing with POCOs
==================

Start by add this ``using`` directive to your code:

.. code-block:: csharp
	
    using Hl7.Fhir.Serialization;

You will now have access to the parsers and serializers for XML and Json:

* For XML: ``FhirXmlParser`` and ``FhirXmlSerializer``
* For Json: ``FhirJsonParser`` and ``FhirJsonSerializer``.

The way you would work with these does not differ much between XML or Json, so this section will just show you how to work with XML.

First, let us parse a bit of XML representing a FHIR Patient into the corresponding ``Patient`` class:

.. code-block:: csharp
    
    var xml = "<Patient xmlns='http://hl7.org/fhir'><active value='true'></Patient>";
    var parser = new FhirXmlParser();

    try
    {
        var parsedPatient = parser.Parse<Patient>(xml);
        Console.WriteLine(parsedPatient.Active);
    }
    catch (FormatException fe)
    {
        // the boring stuff
    }

In the example above, we knew the data contained a patient, but it is perfectly alright to be less specific and work with the ``Resource`` base class instead:

.. code-block:: csharp
        
        Resource parsedResource = parser.Parse<Resource>(xml);

You can then use C# constructions like the ``is`` operator to make your code behave differently depending on the type of resource parsed.

The ``Parse`` method has a few overloads, one of which allows you to pass in an ``XmlReader`` instead of a string, which makes sense if you have a stream of data that you don't want to read into a string first.

POCO's and parsing incorrect data
---------------------------------

The POCO parsers are pretty strict about what data they will accept: since the data read and parsed must fit the POCO structure there is little room in allowing incorrect FHIR data. It is possible to allow a bit of flexibility however, which is controlled by passing a `ParserSettings` instance to the constructor of the xml or json parser:

.. code-block:: csharp
    
    var parser = new FhirXmlParser(new ParserSettings { AcceptUnknownMembers = true, 
        AllowUnrecognizedEnums = true });

``AcceptUnknownMembers`` will ensure the parser does not throw an exception when an instance of FHIR data contains an unknown (or incorrectly spelled) property. This is particularly useful when you want to make sure that your software will be able to read data from newer FHIR versions: for normative parts of the FHIR specification, all existing properties will remain unchanged, but newer versions of FHIR might add new members. By settings this property to ``true``, you can make sure your older software can still read newer data. There is, however, no way to access the unrecognized data.

The same is true for ``AllowUnrecognizedEnums``. When the parser turns a coded value (say Patient.gender) into an ``enum``, the parser will allow values that are not part of the enumeration, and can therefore not be turned into an enumerated value. This means that the property will return a null value - you can, however, get to the 'unrecognized' value using the ``ObjectValue`` backing field, as demonstrated in the code below:

.. code-block:: csharp

    var parser = new FhirXmlParser(new ParserSettings {
        AllowUnrecognizedEnums = true });
    p = parser.Parse<Patient>(xml2);    // xml2 contains a Patient.gender of 'superman'
    Assert.IsNull(p.Gender);   // p.Gender will now be null
    Assert.AreEqual("superman", p.GenderElement.ObjectValue);    // but you can query the backing value

