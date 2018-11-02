.. _feature_prevalidation:

Validating incoming resources
=============================

You can have Vonk validate all resources that are sent in for create or update. The setting to do that is like this:
::

  "Validation": {
    "ValidateIncomingResources": "true",
    "AllowedProfiles": 
    [
        http://hl7.org/fhir/StructureDefinition/daf-patient, 
        http://hl7.org/fhir/StructureDefinition/daf-allergyintolerance
    ]
  },

To enable this feature, set ``ValidateIncomingResources`` to ``true``.

If you leave the list of AllowedProfiles empty, each resource will only be validated against the profiles from the FHIR specification itself.

When you add canonical urls of StructureDefinitions to this list, Vonk will:

* check whether the incoming resource has any of these profiles listed in its meta.profile element
* validate the resource against the profiles listed in its meta.profile element.

So in the example above, Vonk will only allow resources that conform to either the DAF Patient profile or the DAF AllergyIntolerance profile.
Note that the resource has to contain that profile in its meta.profile element. Vonk will *not* try to validate against all the allowed profiles to see whether the resource conforms to any of them.

If you set ``ValidateIncomingResources`` to ``false``, the only restriction to incoming resources is that they can be parsed correctly.
