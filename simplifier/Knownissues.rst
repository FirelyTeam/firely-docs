Known issues
============

If your issue is not listed below, please contact us at
simplifier@fire.ly or (for customers) `our premium support desk`_.

*Updated for version 24.3*

+-----------------------+-----------------------+----------------------------------------------------------+
| Status                | Category              | Description                                              |
+=======================+=======================+==========================================================+
| Open                  | Packages              | | On package creation duplicate files can                |
|                       |                       | | be introduced. For now: Make sure your                 |
|                       |                       | | project does not use the same filename                 |
|                       |                       | | (without the extension) twice. We                      |
|                       |                       | | are working to warn you about this in the              |
|                       |                       | | proces.                                                |
+-----------------------+-----------------------+----------------------------------------------------------+
| Open                  | Validation            | | Package ``hl7.fhir.r3.core``                           |
|                       |                       | | version 3.0.2 contains a profile on                    |
|                       |                       | | SimpleQuantity, that is being sliced on                |
|                       |                       | | the root level. This is invalid and causes             |
|                       |                       | | an error during validation of all                      |
|                       |                       | | resources that make use of that profile.               |
|                       |                       | | The next technical release of that                     |
|                       |                       | | package should have a fix for that, and the            |
|                       |                       | | validation engine of Simplifier will                   |
|                       |                       | | suppress this error in an upcoming version.            |
+-----------------------+-----------------------+----------------------------------------------------------+
| Workaround in place   | Validation            | | Validation against FHIR version 3.0.2                  |
|                       |                       | | gives ``eld-16`` `warning 2009`_ and `error 1012`_.    |
|                       |                       | | This is due to an error in FHIR. The errors            |
|                       |                       | | should not prevent the rest of the                     |
|                       |                       | | validation of the resource. The                        |
|                       |                       | | underlying issue `has been acknowledged`_              |
|                       |                       | | and should be resolved in a possible FHIR version      |
|                       |                       | | 3.0.3. Simplifier will silence these                   |
|                       |                       | | errors and warnings for you.                           |
+-----------------------+-----------------------+----------------------------------------------------------+

..
    https://firely.atlassian.net/browse/SIM-960
    https://firely.atlassian.net/browse/SIM-1127

All our tooling is built on top of the official Firely .NET SDK developed and managed by Firely. The `SDK is open source
and maintained on Github`_ and `issues are publicly tracked there`_.

HL7 is maintaining a `known issue list for the FHIR specifications on
their Confluence`_.

.. _our premium support desk: https://firely.atlassian.net/servicedesk
.. _warning 2009: https://simplifier.net/docs/fhir-net-api/Code-2009
.. _error 1012: https://simplifier.net/docs/fhir-net-api/Code-1012
.. _has been acknowledged: https://jira.hl7.org/browse/FHIR-25776
.. _SDK is open source and maintained on Github: https://github.com/FirelyTeam/firely-net-sdk/
.. _issues are publicly tracked there: https://github.com/FirelyTeam/firely-net-sdk/issues
.. _known issue list for the FHIR specifications on their Confluence: https://confluence.hl7.org/display/FHIR/Known+Issues+with+the+published+FHIR+Specifications
