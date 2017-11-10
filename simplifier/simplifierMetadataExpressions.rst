Metadata Expressions
============================
The metadata expressions editor enables you to define what Simplifier should display as Title and Description for your resources. As a convention, you mush specify the resource type followed by the property (Title or Description) with a semicolon and the FHIR PATH expression based on which we extract the value.

Example:

        **Patient.Title: name | title**
        **Profile.Description: description**

        
The editor support comments as well. The comments are identified by using the "#" or "//" characters.
Example:

        **#defaults section**
        **Observation.Title: title**
        **//Profile.Description: description**
        
        
When editing the metadata expressions you will have access to the default expressions used by Simplifier. If your FHIR PATH expressions are not correct, the value extract is empty or they are missing, Simplifier will fallback to the default expressions. If a default expression is not able to provide a value, a generic text based on the resource type will be used.
