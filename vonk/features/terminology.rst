.. _feature_terminology:

Terminology
===========

.. caution:: Terminology operations in Vonk 3.0.0-beta1 only work for STU3. We intend to provide more elaborate terminology support by integrating with a full Terminology Server, including support for R4 in the near future.

Vonk provides limited support for these Terminology operations:

* $validate-code
* $expand
* $lookup
* $compose

These operations are currently implemented on the :ref:`Administration API<administration_api>` and therefore only available through the administration endpoint on ``<vonk-endpoint>/administration``.

Refer to :ref:`conformance` on how to provide CodeSystem and ValueSet resources to the Administration API.

.. note::
   This is a first attempt on supporting Terminology operations. We welcome feedback on how you would like to use them. Contact us at vonk@fire.ly.

.. note::
   This implementation does not support complex terminologies like Snomed CT or LOINC.  

.. _terminology_validate-code:

ValueSet $validate-code
-----------------------

:definition: http://www.hl7.org/implement/standards/fhir/valueset-operations.html#validate-code
:notes: 
   * Available on the type level ``<vonk-endpoint>/administration/ValueSet/$validate-code`` and the instance level ``<vonk-endpoint>/administration/ValueSet/<id>/$validate-code``.
   * Only the parameters url, valueSet, valueSetVersion, code, system, display, coding, codeableConcept, abstract are supported.
   * The url and valueSetVersion input parameters are only taken into consideration if no valueSet resource was provided in the body. So the valueSet in the body takes priority.
   * Both ``GET`` and ``POST`` interactions are available. 

ValueSet $expand
----------------

:definition: http://www.hl7.org/implement/standards/fhir/valueset-operations.html#expand
:notes:
   * Available on the type level ``<vonk-endpoint>/administration/ValueSet/$expand`` and the instance level ``<vonk-endpoint>/administration/ValueSet/<id>/$expand``.
   * Only the parameters url, valueSet and valueSetVersion are supported.
   * The url and valueSetVersion input parameters are only taken into consideration if no valueSet resource was provided in the body. So the valueSet in the body takes priority.
   * Both ``GET`` and ``POST`` interactions are available. 

CodeSystem $lookup
------------------

:definition: http://www.hl7.org/implement/standards/fhir/codesystem-operations.html#lookup
:notes:
   * Available on the type level ``<vonk-endpoint>/administration/CodeSystem/$lookup``.
   * Only the parameters code, system, version, coding and date are supported. 
   * Code & system combination takes priority over the coding parameter.
   * Both ``GET`` and ``POST`` interactions are available. 

CodeSystem $compose
-------------------

:definition: http://www.hl7.org/implement/standards/fhir/codesystem-operations.html#compose
:notes:
   * Available on the type level ``<vonk-endpoint>/administration/CodeSystem/$compose`` and the instance level ``<vonk-endpoint>/administration/CodeSystem/<id>/$compose``.
   * Only the parameters system, exact, version, property.code and property.value are supported.
   * The url and valueSetVersion input parameters are only taken into consideration if no valueSet resource was provided in the body. So the valueSet in the body takes priority.
   * Both ``GET`` and ``POST`` interactions are available. 
   
