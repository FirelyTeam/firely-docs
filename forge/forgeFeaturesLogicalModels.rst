*New Feature -* Logical Models
==============
Forge also supports the authoring of Logical Models. A logical model represents an abstract data model that is not derived from one of the core FHIR resources or datatype.

Note: FHIR defines resources that allow you to define a mapping from a logical model to a set of FHIR resources. 

Forge does not support these mapping resources.This is of course very handy to facilitate the planning and for the eventual translation of elements from the logical model into new resources. To create Logical Models in Forge select the New Logical Model command. You can customize the meta properties for your model and add backbone elements and typed elements.

* A backbone element has no datatype. A backbone element may contain other child elements; either typed elements and/or other (nested) backbone elements.

.. image:: /images/LogicalModel-BackboneElement.png 

* A typed element is mapped to a FHIR datatype or resource profile. 

.. image:: /images/LogicalModel-TypedElement.png   

You cannot introduce new child elements of a typed element, because they are implicitly defined by the element datatype profile.You also have the ability to customize all backbone elements and sub elements to constrain their cardinality, specify their datatypes etc.

