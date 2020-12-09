.. _vonk_faq:

Frequently asked questions
==========================

... and known issues.

Conflicting resources upon import
---------------------------------

When importing specification.zip for R4, Firely Server will report errors like these::

::

   Artifact C:\Users\<user>\AppData\Local\Temp\FhirArtifactCache-1.5.0-Hl7.Fhir.R4.Specification\specification_Fhir4_0\dataelements.xml could not be imported. Error message: Found multiple conflicting resources with the same resource uri identifier.

   Url: http://hl7.org/fhir/StructureDefinition/de-Quantity.value
      File: C:\Users\Christiaan\AppData\Local\Temp\FhirArtifactCache-1.5.0-Hl7.Fhir.R4.Specification\specification_Fhir4_0\dataelements.xml
      File: C:\Users\Christiaan\AppData\Local\Temp\FhirArtifactCache-1.5.0-Hl7.Fhir.R4.Specification\specification_Fhir4_0\dataelements.xml
      File: C:\Users\Christiaan\AppData\Local\Temp\FhirArtifactCache-1.5.0-Hl7.Fhir.R4.Specification\specification_Fhir4_0\dataelements.xml

The error message is actually correct, since there *are* duplicate fullUrls in dataelements.xml in the specification. This has been reported in `Jira issue FHIR-25430 <https://jira.hl7.org/browse/FHIR-25430>`_.

Searchparameter errors for composite parameters
-----------------------------------------------

When importing specification.zip for various FHIR versions, Firely Server will report errors like these:

::

   Composite SearchParameter 'CodeSystem.context-type-quantity' doesn't have components.

A searchparameter of type 'composite' should define which components it consists of. Firely Server checks whether all the components of such a composite searchparameter are present. If no components are defined at all - that is, SearchParameter.component is empty - it will display this error. This indicates an error in the definition of the searchparameter and should be solved by the author of it.

However, the implementation of this check seems to have an error so too many composite parameters are reported as faulty. We will address this issue in the next release.

