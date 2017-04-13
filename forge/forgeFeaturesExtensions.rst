
Define extensions
-----------------
Within Forge you can extend your profiles or elements with extensions created by yourself or others. 
The easiest way is to first open or create a new extension in your session explorer alongside your current profile. 
Forge is then able to assist in linking the extension to your profile.   

Extension registry
^^^^^^^^^^^^^^^^^^
When using extensions, first consult the extension registry at http://hl7.org/fhir/extensibility-registry.html or Simplifier.net to find already defined extensions that may be suitable for your needs. 
For example, extending a Patient profile with the place of birth can be done with an already existing extension found in in the HL7 extension registry. 

.. image:: ./images/ExtensionSessionExplorer.jpg
   :scale: 75%

New extension 
^^^^^^^^^^^^^
If you cannot find an already defined extension you can make your own. 
Go to ‘New’ and click ‘New Extension’ (or Ctrl + E) to create a new extension. 
Forge shows warning messages in the lower section of the your screen highlighting the need to provide context information for this new extension. 
Provide this information in `Properties` tab of the extension. 
‘Context Type’ indicates if the extension extends a Resource, Datatype, Mapping or another Extension. 
Give the exact context by clicking the + symbol after Context. 
This brings you to a new screen were you can select the specific resource or datatype where the extension is allowed to be placed. 
If you extend on the resource level you can click Select Resource. 
If you extend an element first select that element and then click Select Element. 
Depending on where the extension may be used, you can add more context information. 
You can provide a canonical URL, name and other relevant information in the properties section as well.

.. |ExtensionContextType| image:: ./images/ExtensionContextType.jpg
   :alt: Extension Properties Context
   :scale: 100%
   :align: middle
.. |SelectingExtensionContext| image:: ./images/SelectingExtensionContext.jpg
   :alt: Selecting Extension's context
   :scale: 50%
   :align: middle
   
============================ ==============================
|ExtensionContextType|       |SelectingExtensionContext|
============================ ==============================
Extension properties context Selecting extension's context
============================ ==============================

Extension profile
^^^^^^^^^^^^^^^^^^

A new extension starts with one element containing a `Value[X]`. 
A `Value[X]` can contain all datatypes, most likely this needs to be constrained to a more specific datatype. 
This can be done in the Element Properties tab by selecting the wanted datatype(s). 
An extension containing more elements is called a complex extension. 
Elements can be added and removed from the extension profile with the use of the Add and Remove buttons. 
Added elements will be placed a level lower than the selected element. 


.. image:: ./images/ExtensionProfiling.jpg
   :alt: Profile extension
   :scale: 75%

  
Add the extension to the profile
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Select the element in the Element Tree of your profile where you want to add the extension. 
Then, click the paperclip icon with the name `Extend` which is shown in the tool section above the element tree. 
Forge shows a warning highlighting that the extension element is empty and it should be associated with an extension definition. 
Select the newly made extension element and click the dropdown menu in the Element Properties section under Extension. 
All extensions in your session explorer will be available in the dropdown menu. 
Click the desired extension definition. 
If you do not have the extension available in Forge it is also possible to provide the canonical URL of the exention here.
  
.. |ExtensionAddBefore| image:: ./images/ExtensionAddBefore.jpg
   :alt: Linking the extension
   :scale: 75%
   :align: middle
.. |ExtensionAddAfter| image:: ./images/ExtensionAddAfter.jpg
   :alt: Linked extension
   :scale: 75%
   :align: middle
   
====================== ===================
|ExtensionAddBefore|   |ExtensionAddAfter|
====================== ===================
Select the extension   Linked extension
====================== ===================  

