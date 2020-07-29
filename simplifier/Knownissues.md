# Known issues

If your issue is not listed below, please contact us at [simplifier@fire.ly](mailto:simplifier@fire.ly) or (for customers) [our premium support desk](https://firely.atlassian.net/servicedesk).

*Updated for version 24.3*

| Status | Category | Description |
| - | - | - |
| Open | Packages | On package creation duplicate files can be introduced. For now: Make sure your project does not use the same filename (without the extension) twice. We are working to warn you about this in the proces. <!-- https://firely.atlassian.net/browse/SIM-960 --> |
| Open | Validation | Package `hl7.fhir.r3.core` version 3.0.2 contains a profile on SimpleQuantity, that is being sliced on the root level. This is invalid and causes an error during validation of all resources that make use of that profile. The next technical release of that package should have a fix for that, and the validation engine of Simplifier will circumvent this error from version 1.9. <!-- https://firely.atlassian.net/browse/SIM-1127 --> |
| Workaround in place | Validation | Validation against FHIR version 3.0.2 gives `eld-16` [warning 2009](https://simplifier.net/docs/fhir-net-api/Code-2009) and [error 1012](https://simplifier.net/docs/fhir-net-api/Code-1012). This is due to an error in FHIR. The errors should not prevent the rest of the validation of the resource. The underlying issue [has been acknowledged](https://jira.hl7.org/browse/FHIR-25776) and should be resolved in a possible FHIR version 3.0.3. Simplifier will silence these errors and warnings for you. <!-- https://firely.atlassian.net/browse/SIM-799 --> |
| Open | Validation | When having multiple discriminators the validator checks against both descriminators, not either of them. Reported to the FHIR API:  https://github.com/FirelyTeam/fhir-net-api/issues/1246 <!-- ? --> |

All our tooling is built on top of the official .NET API for HL7 FHIR .NET FHIR API, developed and managed by Firely. The [API is open source and maintained on Github](https://github.com/FirelyTeam/fhir-net-api/) and [issues are publicly tracked there](https://github.com/FirelyTeam/fhir-net-api/issues).

HL7 is maintaining a [known issue list for the FHIR specifications on their Confluence](https://confluence.hl7.org/display/FHIR/Known+Issues+with+the+published+FHIR+Specifications).