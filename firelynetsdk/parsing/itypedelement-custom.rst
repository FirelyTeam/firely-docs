=================================================
Writing your own ``ITypedElement`` implementation
=================================================

The components that make up the parsing and serialization stack of the .NET framework are designed to be composed to be provide flexibility for different usecases and make it easy to add additional behaviour. You could build a pipeline converting XML to JSON by starting out with the `FhirXmlNode` (implementing `ISourceNode`), calling ``ToTypedElement()`` on it (effectively wrapping it in an internal implementation of `ITypedElement` called `TypedElement`). This is then again wrapped by the `FhirJsonBuilder` class, which turns the output into JSON.

This pipeline can be extended by custom implementations of both interfaces, and the SDK already contains a few extra's out of the box:

* The ``MaskingNode``, which wraps another ``ITypedElement`` and which represents a tree pruned to just the nodes marked with `isSummary <http://hl7.org/fhir/elementdefinition-definitions.html#ElementDefinition.isSummary>`_. It could also be extended to mask out data based on the user's authorization. 
* The ``ScopedNode``, which tracks parent/child relationships and keeps track of the nearest "parent resource" (amonst other things) while traversing the tree. This information is used by both the validator and the FhirPath evaluation engine.

The `MaskingNode source code <https://github.com/FirelyTeam/firely-net-sdk/blob/develop/src/Hl7.Fhir.ElementModel/MaskingNode.cs>`_ is an excellent place to start exploring the possibilities provided by the framework.
