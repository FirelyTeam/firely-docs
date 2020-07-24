# Known issues

If your issue is not listed below, please contact us at [forge@fire.ly](mailto:forge@fire.ly), [simplifier@fire.ly](mailto:simplifier@fire.ly) or (for customers) [our premium support desk](https://firely.atlassian.net/servicedesk).

*Updated for 24.2 for STU3, R4, R5*

| Status | Category | Description |
| - | - | - |
| Open | Validation | When adding a new slice or extension, Forge is taking over values from/validating against properties of another slice. For now: Please just ignore the warning `Cannot further constrain a fixed value that is defined in a base profile.` in that case.  <!-- https://firely.atlassian.net/browse/FOR-373 --> |
| Parked | Navigation | When adding extension, refresh might be necessary for showing and editing all options on extension.  <!-- https://firely.atlassian.net/browse/FOR-420 --> |
| Parked | Navigation | When moving to the Dependencies tab on a Forge project, the interface might refuse to switch back directly to the Project tab. Please click in the packages window below first and then try again. <!-- https://firely.atlassian.net/browse/FOR-395 --> |

All our tooling is built on top of the official .NET API for HL7 FHIR .NET FHIR API, developed and managed by Firely. The [API is open source and maintained on Github](https://github.com/FirelyTeam/fhir-net-api/) and [issues are publicly tracked there](https://github.com/FirelyTeam/fhir-net-api/issues).

HL7 is maintaining a [known issue list for the FHIR specifications on their Confluence](https://confluence.hl7.org/display/FHIR/Known+Issues+with+the+published+FHIR+Specifications).