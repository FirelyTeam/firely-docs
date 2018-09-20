==================================
Serializing ``ITypedElement`` data
==================================

.. caution:: This documentation describes features in a prelease of version 1.0 of the API. The documentation may be outdated and code examples may become incorrect.

The API provides functionality to turn ``ITypedElement`` data into XML and JSON formats using the following set of extension methods:

.. csv-table:: Serialization to different outputs
    :header: "Method", "Output"
 
    "ToJson()", "string"
    "ToJsonBytes()", "byte[]"
    "ToJObject()", "JObject"
    "WriteTo()", "JsonWriter"
    "ToXml()", "string"
    "ToXmlBytes()", "byte[]"
    "ToXDocument()", "XDocument"
    "WriteTo()", "XmlWriter"
    "ToPoco()", "Base"
    "ToPoco<T>()", "T (where T:Base)"

The last two methods deserve a bit of explanation: from the standpoint of the serializers in the API, POCOs are also an output format. This means that in addition to the XML and JSON serializers, there are methods to turn ``ITypedElement`` data directly into POCO's. Continuing with last section's example:

.. code-block:: csharp

    ITypedElement patientRootElement = patientNode.ToTypedElement(zipSource);
    string xml = patientRootElement.ToXml();
    Patient p = patientRootElement.ToPoco<Patient>();

It will come as no surprise that the higher level serializers and parsers described in :ref:`poco-parsing` are thin convenience methods, simply calling the more primitive methods described in the last sections.

Working with subtrees
---------------------
It is possible to traverse into a tree, away from the Resource root and then call one of the serialization methods above, with a caveat: the FHIR specification does not specify a "standard" serialization for subtrees, so there will not always be a "natural" way to serialize a subtree. More specifically, there is no way to serialize a subtree to JSON that represents a primitive, but this is quite possible in XML. The same is true for parsing into a subtree. The API will raise an error at runtime if the subtree cannot be represented in the chosen serialization.

Round-trip serialization
------------------------
The FHIR serialization formats need type information to work correctly. For example, repeating elements require the use of an array in Json, while narrative in XML uses a different (xhtml) namespace. This is the reason that under most circumstances, serialization needs to be done based on the type-aware ``ITypedElement`` interface. However, when working with a single format (or doing a direct round-trip), the xml and json parsers annotate the (untyped) ``ISourceNode`` tree with enough information to allow for a serialization *without* type information, resulting in a cheaper round-trip than would be possible if the user has to retrieve and add type information first.  As such, the serializers mentioned in this section have overloads on their methods to take a ``ISourceNode`` as well. This only works for round-trips however, so you will get a runtime exception when trying to serialize an ``ISourceNode`` to XML when it was created from JSON.

