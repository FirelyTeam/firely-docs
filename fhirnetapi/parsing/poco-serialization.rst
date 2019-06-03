========================
Serialization with POCOs
========================

Serialization, unsurprisingly, turns a given POCO back into Json or XML, and is handled by either ``FhirXmlSerializer`` or ``FhirJsonSerializer``. Both classes have several methods to serialize the POCO into different forms:

* ``SerializeToString``, ``SerializeToBytes`` - will turn the POCO into an XML/Json string or directly into a UTF-8 encoded byte representation.
* ``Serialize`` - writes the POCO to an XmlWriter
* ``SerializeToDocument`` - turns the POCO into an ``XDocument`` or ``JObject``

Continuing the previous example, we can change some value in the parsed Patient and then serialize it back out:

.. code-block:: csharp

    parsedPatient.active = false;
    var serializer = new FhirXmlSerializer();
    var xmlText = serializer.SerializeToString(parsedPatient);
    
Note that creating a new ``FhirXmlSerializer`` (or ``FhirXmlParser``) is cheap. The constructor for the ``FhirXmlSerializer`` and ``FhirJsonSerializer`` take a single parameter to change settings, most notably to 'pretty print' your output:

.. code-block:: csharp

    var serializer = new FhirJsonSerializer(new SerializerSettings() {
        Pretty = true
    });

Summaries
---------

The FHIR specification introduces several `summary versions of resources <http://hl7.org/fhir/search.html#summary>`_. You can serialize a POCO into one of these
summary forms by passing the ``summary`` parameter to any of the serialization methods described above:

.. code-block:: csharp

    var xml = serializer.SerializeToString(b, summary: Fhir.Rest.SummaryType.Text);

Convenience methods
-------------------

.. caution:: This documentation describes features in a prelease of version 1.0 of the API. The documentation may be outdated and code examples may become incorrect.

Although the code examples above are simple enough, there is also a set of extension methods available on POCOs to make serialization even easier, without the need of explicitly creating a serializer:

.. csv-table:: Serialization of POCOs to different outputs
    :header: "Method", "Output"
 
    "ToJson()", "string"
    "ToJsonBytes()", "byte[]"
    "ToJObject()", "JObject"
    "WriteTo()", "JsonWriter"
    "ToXml()", "string"
    "ToXmlBytes()", "byte[]"
    "ToXDocument()", "XDocument"
    "WriteTo()", "XmlWriter"


    
    
