.. _FHIR-parsing:

=========================
Parsing and serialization
=========================

The .NET API makes it easy to work with XML and Json-based FHIR data. There are two approaches for getting data in and out of your application:

* Work with the POCO classes (as described in :ref:`FHIR-model`). These are .NET classes that represent the FHIR resources mostly one-on-one.
* Work with the ``ElementModel`` classes, which is an abstract memory model representing the FHIR data as an in-memory tree of data.

The first approach is the simplest and is most applicable if you prefer working with strongly typed classes that align with the FHIR resources. E.g. there is a 
class ``Patient`` with a property ``name``, as you would expect from looking at the FHIR documentation. For most users, this is all they need.

However, there are several reasons the POCO-based approach may not work for you:

* The generated POCO classes are based on a specific version of FHIR, so if you need to deal with FHIR data independent of versions, POCO's are cumbersome to work with.
* The parsers for POCO classes cannot deal with incorrect data - there is no way to express invalid FHIR data as a POCO, so although you will get parser errors, there is no way to recover or correct the data.
* You may only be working with FHIR data in the sense that you need to be able to parse, persist and retrieve bits of data, without needing the full overhead of creating POCOs in memory.
* You need to be able to customize data when parsing or serializing data.

The second approach, using the ``ElementModel`` abstraction, has been designed to work with these usecases. In fact, the POCO parsers are built on top of the more low-level ``ElementModel`` classes.

The rest of this section describes working with the POCO parsers and serializers, more information on the ``ElementModel`` parsers can be found at :ref:`elementmodel-intro`.

Parsing with POCOs
------------------

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


Serialization with POCOs
------------------------

Serialization, unsurprisingly, turns a given POCO back into Json or XML, and is handled by either ``FhirXmlSerializer`` or ``FhirJsonSerializer``. Both classes have several methods to serialize the POCO into different forms:

* ``SerializeToString``, ``SerializeToBytes`` - will turn the POCO into an XML/Json string or directly into a UTF-8 encoded byte representation.
* ``Serialize`` - writes the POCO to an XmlWriter
* ``SerializeToDocument`` - turns the POCO into an ``XDocument`` or ``JObject``

Continuing the previous example, we could change some value in the parsed Patient and then serializing out again:

.. code-block:: csharp

    parsedPatient.active = false;
    var serializer = new FhirXmlSerializer();
    var xmlText = serializer.SerializeToString(parsedPatient);
    
Note that creating a new ``FhirXmlSerializer`` (or ``FhirXmlParser``) is cheap. The constructor for the ``FhirXmlSerializer`` and ``FhirJsonSerializer`` take a single parameter to change settings, most notably to 'pretty print' your output.

Summaries
+++++++++

The FHIR specification introduces several `summary versions of resources <http://hl7.org/fhir/search.html#summary>`_. You can serialize a POCO into one of these
summary forms by passing the ``summary`` parameter to any of the serialization methods described above:

.. code-block:: csharp

    var xml = serializer.SerializeToString(b, summary: Fhir.Rest.SummaryType.Text);

POCO's and parsing incorrect data
---------------------------------

The POCO parsers are pretty strict about what data they will accept: since the data read and parsed must fit the POCO structure there is little room in allowing incorrect FHIR data. It is possible to allow a bit of flexibility however, which is controlled by passing a `ParserSettings` instance to the constructor of the xml or json parser:

.. code-block:: csharp
    
    var parser = new FhirXmlParser(new ParserSettings { AcceptUnknownMembers = true, 
        AllowUnrecognizedEnums = true });

``AcceptUnknownMembers`` will ensure the parser does not throw an exception when an instance of FHIR data contains an unknown (or incorrectly spelled) property. This is particularly useful when you want to make sure that your software will be able to read data from newer FHIR versions: for normative parts of the FHIR specification, all existing properties will remain unchanged, but newer versions of FHIR might add new members. By settings this property to ``true``, you can make sure your older software can still read newer data. There is, however, no way to read the unrecognized data.

The same is true for ``AllowUnrecognizedEnums``. When the parser turns a coded value (say Patient.gender) into an ``enum``, the parser will allow values that are not part of the enumeration, and can therefore not be turned into an enumerated value. This means that the property will return a null value - you can, however, get to the 'unrecognized' value using the ``ObjectValue`` backing field, as demonstrated in the code below:

.. code-block:: csharp

    var parser = new FhirXmlParser(new ParserSettings {
        AllowUnrecognizedEnums = true });
    p = parser.Parse<Patient>(xml2);    // xml2 contains a Patient.gender of 'superman'
    Assert.IsNull(p.Gender);   // p.Gender will now be null
    Assert.AreEqual("superman", p.GenderElement.ObjectValue);    // but you can query the backing value


.. toctree::   
   :maxdepth: 3
   :hidden:

   parsing/intro-to-elementmodel
   parsing/isourcenode


