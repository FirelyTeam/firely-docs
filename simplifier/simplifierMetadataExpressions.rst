Metadata Expressions
============================
The metadata expressions editor enables you to define what Simplifier should display as Title, Description, UrlKey, Workflow or FilePath for your resources. To start editing the metadata expressions of your project, select ``Options`` and click on ``Edit Expressions for Metadata``.

When editing the metadata expressions you will have access to the default expressions used by Simplifier. If your FHIR PATH expressions are missing, are not correct or the value extracted is empty, Simplifier will fall back to the default expressions. If a default expression is not able to provide a value, a generic text based on the resource type will be used. Workflow and FilePath don't have a default expression. For Filepath in this case, if the extracted value is empty or missing, the fallback will be the original/generated  filepath of the uploaded file.

As a convention, you must specify the resource type followed by the property (Title, Description, UrlKey, Workflow or FilePath) with a semicolon and the FHIR PATH expression based on which we extract the value.

Example:

.. code-block:: Javascript

   Patient.Title: identifier    
   Patient.Description: name.family

Note that in this example, identifier and name.family are both collections that could contain more than one item. By default Simplifier only takes the first item of a collection. We built a custom FHIR PATH function to concatenate multiple items called ``glue()``. The items are separated by the argument that is passed to this function.

Example:

.. code-block:: Javascript

   Patient.Description: name.family.glue(', ')

The description of the Patient resource would now show all names of the patient, seperated by a comma. It is also possible to take the first name of the patient only by adding ``[0]`` behind the element. Another possibility is to merge collections from different elements by using the ``|`` character. So, to show the first given name and the first family name sperated by a comma, you would get something like:

.. code-block:: Javascript

   Patient.Description: (name[0].given[0] | name[0].family).glue(' ')

Note that the ``|`` character could also function as an ``OR`` operator as Simplifier will only select the first item in a collection. For example, say you want to show the name of an organization, but if name is empty you want to show the (first) identifier. You could use the following code to do so:

.. code-block:: Javascript

       Organization.Title: name | identifier[0].value

In some cases, you may want to select the first item of a collection yourself, because you want to add additional text as well. In this situation, you could also use the ``first()`` function that is available in FHIR PATH. 

Example:

.. code-block:: Javascript

       PractitionerRole.Title: 'Role(s) of ' + (practitioner.display | practitioner.reference).first()

This example would show the value in the display element in the Reference to practitioner if available. If not available, it would show the value in the reference element. If none of these values is available, Simplifier would switch to the default value ``Example of a PractitionerRole`` that is defined in the core code.

There is a difference between using the ``+`` operator and the ``&`` operator to concatenate values. When the ``+`` operator is used and one of the values is empty, the complete result will be empty. When the ``&`` operator is used, it doesn't matter if any of the values is empty. The remaining values will still be concatenated. So, if we would have used the ``&`` operator in the example above instead of the ``+`` operator and both practitioner.display and practitioner.reference would be empty, Simplifier would show the Title of the PractitionerRole resource as following: ``Role(s) of`` Which is of course not what we would want and the reason for using the ``+`` operator.

The editor supports comments as well. The comments are identified by using the ``#`` or ``//`` characters.

Example:

.. code-block:: Javascript

        #Resource examples
        Observation.Title: code.text
        //Profiles
        Profile.Description: description
        StructureDefinition.FilePath: 
        
**FilePath**

Special attention must be paid to the FilePath property. Since the filepath of the file is used for matching files in Simplifier, uniqueness is necessary. The extracted value for FilePath using metadata expression must be unique within the project. Otherwise fallback will be used or new filepath will be generated. 

.. warning::
   In case the project is linked to a Github repository and there is a FhirPath expression specified for FilePath in the metadata expressions screen, the resulted value must match the filepath of the file in Github. If the filepath doesn't match, the linking is broken and file will not be synched anymore.



In case a property (Title, Description, UrlKey, Workflow or FilePath) should use the same FhirPath expression for all resource types, the generic Resource can be used. 
Example:

.. code-block:: Javascript

   Resource.FilePath: url


**Workflow**'

Workflow property is populated using FhirPath expression for extracting from the extension of the resource. The extracted workflow key will be used to identify the coresponding workflow status from the custom workflow selected within the project in Simplifier.
Example:

.. code-block:: Javascript

   StructureDefinition.Workflow: url



For more information on how to use FHIR PATH, visit the following link to the FHIR PATH specification: http://hl7.org/fhirpath/
