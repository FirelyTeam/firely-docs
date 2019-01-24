==========================
Working with ITypedElement
==========================

.. caution:: This documentation describes features in a prelease of version 1.0 of the API. The documentation may be outdated and code examples may become incorrect.

The main difference between ``ISourceNode`` (see :ref:`isourcenode`) and ``ITypedElement`` is the presence of type information: metadata coming from the FHIR specification about which elements exist for a given version of FHIR, whether they repeat, what the type of each element is, etcetera. Type information is necessary for many operations on data, most notably serialization, running FhirPath statements and doing validation. As such, it is more common to work with ``ITypedElement`` than it is to work with ``ISourceNode``. However, as one could imagine, in cases where type information is not necessary, ``ISourceNode`` is more performant and has a smaller memory footprint.

This is what ``ITypedElement`` looks like:

.. code-block:: csharp

    public interface ITypedElement
    {
        string Name { get; }       
        object Value { get; }
        string Location { get; }  

        string InstanceType { get; }
        IElementDefinitionSummary Definition { get; }

        IEnumerable<ITypedElement> Children(string name=null);
    }

Just like ``ISourceNode``, the interface represents a single node in the tree, has a name and a location and you can enumerate its children using ``Children()``.

Unlike ``ISourceNode`` however, type information is available by looking at the ``InstanceType`` and ``Definition`` properties. As a consequence, the ``Name`` property now returns the actually defined name of the element in the specification, so for choice types the element would not include the type suffix. For example,  ``Observation.valueQuantity`` in an ``ISourceNode`` would turn into ``Observation.value`` in ``ITypedElement``.

Similarly, the primitive value of the node (if any) is now of type object, and returns the value of the primitive, represented as a native .NET value. The following table lists the mapping between the encountered FHIR primitive and the .NET type used to represent the value:

.. csv-table:: Mapping between FHIR type and .NET type
    :header: "FHIR Type", ".NET type"

    "instant", "Hl7.Fhir.Model.Primitive.PartialDateTime"
    "time", "Hl7.Fhir.Model.Primitive.PartialTime"
    "date, dateTime", "Hl7.Fhir.Model.Primitive.PartialDateTime"
    "decimal", "decimal"
    "boolean", "bool"
    "integer", "long"
    "unsignedInt", "long"
    "positiveInt", "long"
    "string", "string"
    "code", "string"
    "id", "string "
    "uri, oid, uuid, canonical, url", "string" 
    "markdown","string"
    "base64Binary", "string (uuencoded)"
    "xhtml", "string"

Note that ``Location`` is exactly the same on both interfaces - every part of the path still has an array index, whether the element repeats or not. If you would like to have a shortened path, where non-repeating elements have their array index removed, you can check whether the underlying implementation of `ITypedElement` implements ``IShortPathGenerator`` (which the implementations from the API do), and get its ``ShortPath`` property.

.. important::
    The ``IElementDefinitionSummary`` interface returned by the ``Definition`` property is very likely still to change. You are welcome to experiment with it and provide feedback, but the next release of the API will most likely add (incompatible) capabilities.

The API offers a set of extension methods on top of ``ITypedElement`` (like ``Visit()`` and ``Descendants()``) to make it easier to select subtrees and process the data in the tree.

Obtaining an ITypedElement
--------------------------
The API enables you to turn data in POCO or ``ISourceNode`` form into an ``ITypedElement`` by calling the ``ToTypedElement()`` extension method.

In the first case, the POCO has all additional type information available (being based on a strongly-typed object model), and simply surface this through the ``ITypedElement`` interface.
In the second case, the API needs an external source of type information to associate type information to the untyped nodes in the ``ISourceNode`` tree. The ``ToTypedElement`` method on ``ISourceNode`` looks like this:

.. code-block:: csharp

    public static ITypedElement ToTypedElement(this ISourceNode node, 
        IStructureDefinitionSummaryProvider provider, string type = null, 
        TypedElementSettings settings = null);

Notice that the ``provider`` parameter is used to pass in type information structured by the ``IStructureDefinitionSummaryProvider`` interface. Currently, the API supplies two implementations of this interface:

* The ``PocoStructureDefinitionSummaryProvider``, which obtains type information from pre-compiled POCO classes. This is very similar to calling ``ToTypedElement()`` on a POCO, but this method does not require the caller to have data present in POCOs.
* The ``StructureDefinitionSummaryProvider``, which obtains type information from ``StructureDefinitions`` provided with the core specification and additional Implementation Guides and packages. The constructor for this provider needs a reference to an ``IResourceResolver``, which is the subsystem used to get access to FHIR's metadata resources (like ``StructureDefinition``). See :ref:`specification-sources` for more information about ``IResourceResolver``..

This is a complete example showing how to turn the ``patientNode`` from the last section into a ``ITypedElement`` by using external metadata providers:

.. code-block:: csharp

    ISourceNode patientNode = ...
    IResourceResolver zipSource = ZipSource.CreateValidationSource();
    ITypedElement patientRootElement = patientNode.ToTypedElement(zipSource);
    ITypedElement activeElement = patientRootElement.Children("active").First();
    Assert.AreEqual("boolean", activeElement.Type);

Compatibility with ``IElementNavigator``
----------------------------------------
Previous versions of the API defined and used the precursor to ``ITypedElement``, called ``IElementNavigator``. Though functionally the same, ``ITypedElement`` is stateless, whereas ``IElementNavigator`` was not. To aid in parallellization, we have chosen to obsolete the stateful ``IElementNavigator`` in favor of ``ITypedElement``. At this moment, not all parts of the API have been rewritten (yet) to use the new ``ITypedElement`` and we expect the same is true for current users of the API. To aid in migration from one concept to the other, the API provides a set of adapters to turn ``IElementNavigators`` into ``ITypedElements`` and vice versa. These can be constructed by simply calling ``ToElementNavigator()`` on a ``ITypedElement`` or ``ToTypedElement()`` on an ``IElementNavigator``. The compiler will emit messages about this interface being obsolete to stimulate migration to the new paradigm.

Handling structural type errors
-------------------------------
While traversing the ITypedElement tree, the implementations will try to associate type information from the specification with the data encountered. If this fails, errors are by default thrown as exceptions, but the all underlying implementations of ITypedElement implement ``IExceptionSource`` to alter this behaviour. See :ref:`errorhandling` for more information. 

Detecting type errors is done `lazily`, so in order to detect all errors, one would have to do a complete visit of the tree, including forcing a read of the primitive data by getting the ``Value`` property. There is a convenience method ``VisitAll()`` that does exactly this. Additionally, there is a metehod ``VisitAndCatch()`` that will traverse the whole tree, returning a list of errors and warnings.
