Create my first resource
===========================

Congratulations! You are now officialy becoming a FHIR geek. Welcome to the club! On this page we will explain how you can create FHIR resources. First, we will explain the different kinds of resources that are known to FHIR. Next, we will explain which tools come in handy when creating a FHIR resource and how to use them. Finally, we will take you through the process of creating, validating and publishing your very first FHIR resource.

FHIR resources 
--------------
FHIR resources are the building blocks of FHIR. Clinical concepts, terminology, operations, conformance... everything in FHIR is stored in a resource. FHIR resources are classified into 6 categories:

- Foundation: Resources used for internal FHIR requirements and to manage specification, development and testing of FHIR solutions (e.g. CapabilityStatement, StructureDefinition)
- Base: Supporting entities involved in and workflow to manage healthcare process (e.g. Patient, Encounter, Appointment)
- Clinical: The content of a clinical record (e.g. Observation, Procedure, Medication)
- Financial: Resources that support the billing and payment parts of FHIR (e.g. Claim, Coverage)
- Specialized: Specialized resources to support research, clinical decision support, quality reporting and testing (e.g. Questionnaire, Measure, Testscript)

A full list of FHIR resources can be found in the `HL7 FHIR specification <https://www.hl7.org/fhir/resourcelist.html>`_.

Profiling
---------
FHIR resources can be used in a flexible way. The definition of a resource describes its elements and how these should be used. For example, a Patient resource has the elements name and gender. An instance of this resource is allowed to have one or more name elements, but only one gender element. The value of the gender element is restricted to male, female, other or unknown. All these rules are captured in the resource definition, which in itself is stored in a StructureDefinition resource. The StructureDefinition resource is a special kind of resource that can be used to customize resources for your own implementation. For example, you could create a MyPatient StructureDefinition resource based on the Patient resource. You can add constraints to your MyPatient resource, such as making its gender mandatory or only allow one name element. This customization process is called Profiling. Your MyPatient resource is called a Profile on the Patient resource. It is a customized definition of the Patient resource, stored in another instance of the StructureDefinition resource. Note that you can only add constraints in your Profile, you cannot remove constraints from the original resource.  


How to create resources
-----------------------
There are several ways to create resource instances: handcode them or use a tool with an interactive user-interface. The following (free) tools support the creation of FHIR resources:
- SMART FRED: An intuitive online tool that allows you to create resource instances (examples).
- Forge: A user-friendly profile editor that offers a convenient way to create StructureDefinitions (e.g. profiles and extensions) and logical models.
- ClinFHIR: An online tool with multiple helpful modules. The Scenario Builder allows you to create clinical scenarios and resource instances. With the Logical Modeller you can create LogicalModels and generate StructureDefinitions based on these models. In addition, there are modules to build extensions, CodeSystems and ValueSets.
- Snapper: An online tool that comes in handy to build your terminology resources (e.g.ValueSets and CodeSystems)

In the next sections, we will explain how to use these tools to create resources. We will also explain how you can handcode them in XML or JSON.

SMART FRED
^^^^^^^^^^
Visit `SMART FRED <http://docs.smarthealthit.org/fred/>`_. and click ``Open Resource``. By default the ``Paste JSON`` box contains the following code: ``{"resourceType": "Patient"}``. Change the resource type to the resource type you want to add. For example, if you want to add a Procedure, the box should say ``{"resourceType": "Procedure"}``. Click ``Load JSON`` to open the resource. Now you can start creating your resource. Just click ``Add element`` and select the element you want to add, let's say you want to add a Subject. The element is added to your resource. Open the drop down menu to select a sub element. Choose Reference in this case. Now an input field appears. Here you can add a reference, for example type: "Patient/example" and click enter. When you are finished adding elements to your resource, click ``Export JSON``. You may either download the JSON file or copy it to your clipboard. Note that if you need XML code there are several ways to convert XML to JSON. One of them is to upload your resource to Simplifier and download a XML version.

Forge
^^^^^
`Download Forge <https://simplifier.net/forge/download>`_. (it's free!) and run it on your desktop. Click ``New Profile`` to create a new StructureDefinition. Select the name of the resource you want to profile, e.g. Patient. By default resource profiles are selected, but you can also choose to profile data types or create extensions, derived profiles and logical models. In the next step, you can edit the name, canonical URL (should be unique) and file name. Click ``OK``. By default your profile will open on the ``Element Tree`` tab. Select an element to profile it, for example you may want to select multipleBirth and change the data type to boolean (to do so deselect the tick box in front of dateTime, note that you can also deselect all types at one by deselecting the tick box in front of Type(s) on top). You can also change the cardinality of the element, for example click on ``1..1`` to make this element mandatory. To add a slice or an extension, click ``Extend`` or ``Slice`` at the top of the element tree. To learn more about how to use Forge, visit the `Forge documentation page <http://docs.simplifier.net/forge>`_. Or visit the `Profiling Academy <https://simplifier.net/guide/profilingacademy>`_. to learn all the ins and outs of profiling.

ClinFHIR
^^^^^^^^


Snapper
^^^^^^^
Visit `Snapper <http://ontoserver.csiro.au/snapper2-dev>`_. to create terminology resources, e.g. ValueSets, ConceptMaps and CodeSystems. The next videos explain `how to create a CodeSystem <https://www.youtube.com/watch?feature=youtu.be&v=5VIqqiQ1UUU>`_. and `how to create a ValueSet <https://www.youtube.com/watch?feature=youtu.be&v=hVU9cskxo1Q>`_. using Snapper.


XML
^^^
The easiest way to create resources in XML is to use a XML-editor like oXygen XML Developer. But of course you may also use NotePad++ or write your XML code directly in Simplifier (from your project select ``Upload`` and choose ``Copy/Paste``). When using a XML-editor it is convenient to associate FHIR schemas for direct validation. These schemas can be downloaded from the `HL7 FHIR downloads page <https://www.hl7.org/fhir/downloads.html>`_. 

short explanation resource type elements xml tags + end them
simple example on Patient below

.. code-block:: XML

  <Patient>
    <id value="example" />
    <name>
        <family value="Chalmers"/>
        <given value="Peter"/>
    </name>
  </Patient>


JSON
^^^^


How to validate resources
-------------------------


How to publish resources
------------------------

.. image:: ./images/IGeditor.PNG   


