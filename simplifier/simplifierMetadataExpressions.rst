Metadata Expressions
============================
The metadata expressions editor enables you to define what Simplifier should display as Title and Description for your resources. To start editing the metadata expressions of your project, select ``Options`` and click on ``Edit Expressions for Metadata``.

When editing the metadata expressions you will have access to the default expressions used by Simplifier. If your FHIR PATH expressions are missing, are not correct or the value extracted is empty, Simplifier will fall back to the default expressions. If a default expression is not able to provide a value, a generic text based on the resource type will be used.

As a convention, you must specify the resource type followed by the property (Title or Description) with a semicolon and the FHIR PATH expression based on which we extract the value.

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
       
For more information on how to use FHIR PATH, visit the following link to the FHIR PATH specification: http://hl7.org/fhirpath/
