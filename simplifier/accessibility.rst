Accessibility
================================

Firely Accessibility Conformance Report - WCAG Edition
------------------------------------------------------

**(Based on VPAT**\ ® **Version 2.4)**

**Name of Product/Version:** Simplifier.net  

**Report Date:** 30-11-2020  

**Product Description:** Simplifier.net by Firely is an online platform for collaborating on, and publishing the artifacts from, FHIR specifications.

**Contact Information:** simplifier@fire.ly

**Notes:**

* 30-11-2020: First edition published

**Evaluation Methods Used:**

* Testing based on general product knowledge
* Testing with assistive technologies with Google Chrome/Microsoft Edge on Windows

   * `WAVE Web Accessibility Evaluation Tool`_

   * `Microsoft Narrator`_

Applicable Standards/Guidelines
-------------------------------

This report covers the degree of conformance for the following
accessibility standard/guidelines:

+-----------------------------------+-----------------------------------+
| Standard/Guideline                | Included In Report                |
+===================================+===================================+
| `Web Content Accessibility        | | Level A: Yes                    |
| Guidelines 2.0`_                  | | Level AA: Yes                   |
|                                   | | Level AAA: No                   |
+-----------------------------------+-----------------------------------+
| `Web Content Accessibility        | | Level A: Yes                    |
| Guidelines 2.1`_                  | | Level AA: Yes                   |
|                                   | | Level AAA: No                   |
+-----------------------------------+-----------------------------------+

Terms
-----

The terms used in the Conformance Level information are defined as
follows:

-  **Supports** : The functionality of the product has at least one
   method that meets the criterion without known defects or meets with
   equivalent facilitation.
-  **Partially Supports** : Some functionality of the product does not
   meet the criterion.
-  **Does Not Support** : The majority of product functionality does not
   meet the criterion.
-  **Not Applicable** : The criterion is not relevant to the product.
-  **Not Evaluated** : The product has not been evaluated against the
   criterion. This can be used only in WCAG 2.0 Level AAA.


Scope
------

Tests were executed with the following pages, taken as representative for the full application:

.. list-table::
   :widths: 10 10 10
   :header-rows: 1

   * - Id
     - Web Page / Screen / Document Identifier
     - Location / URL
   * - 1
     - Implementation Guide
     - https://simplifier.net/guide/accessibilitytestingimplementationguide
   * - 1.1
     - Implementation Guide home page and navigation
     - https://simplifier.net/guide/AccessibilitytestingImplementationGuide/Home
   * - 1.2
     - Implementation Guide static Markdown pages
     - https://simplifier.net/guide/accessibilitytestingimplementationguide/staticmarkdownpage
   * - 1.3
     - Implementation Guide page with an embedded resource
     - https://simplifier.net/guide/accessibilitytestingimplementationguide/pagewithanembeddedresource
   * - 2
     - Resource page
     - https://simplifier.net/Accessibilitytestingproject/ACMEbasePatient
   * - 2.1
     - Resource overview page with tree view
     - https://simplifier.net/Accessibilitytestingproject/ACMEbasePatient/~overview
   * - 3
     - Home page
     - https://simplifier.net/
   * - 4
     - Organization page
     - https://simplifier.net/organization/firely
   * - 5
     - Project page
     - https://simplifier.net/accessibilitytestingproject
   * - 6
     - Package page
     - https://simplifier.net/packages/firely.com.accessibilitytesting/0.0.1-test/~introduction
   * - 7
     - Validation page
     - https://simplifier.net/snippet/wardweistra/18/$validate
   * - 8
     - Search page
     - https://simplifier.net/search (Postponed until after upcoming redesign)
   * - 9
     - Snippet page
     - https://simplifier.net/snippet/wardweistra/18
   * - 10
     - Documentation page
     - https://docs.fire.ly/simplifier/index.html
   

WCAG 2.x Report
---------------

Note: When reporting on conformance with the WCAG 2.x Success Criteria,
they are scoped for full pages, complete processes, and
accessibility-supported ways of using technology as documented in the
`WCAG 2.0 Conformance Requirements`_.

Table 1: Success Criteria, Level A
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Notes:

* 30-11-2020: First publication

.. list-table::
   :widths: 10 10 10
   :header-rows: 1

   * - Criteria
     - Conformance Level
     - Remarks and Explanations
   * - `1.1.1 Non-text Content`_ (Level A)
     -
     - * Test
       * Test2
   * - `1.2.1 Audio-only and Video-only (Prerecorded)`_ (Level A)
     -
     -
   * - `1.2.2 Captions (Prerecorded)`_ (Level A)
     -
     -
   * - `1.2.3 Audio Description or Media Alternative (Prerecorded)`_ (Level A)
     -
     -
   * - `1.3.1 Info and Relationships`_ (Level A)
     -
     -
   * - `1.3.2 Meaningful Sequence`_ (Level A)
     -
     -
   * - `1.3.3 Sensory Characteristics`_ (Level A)
     -
     -
   * - `1.4.1 Use of Color`_ (Level A)
     -
     -
   * - `1.4.2 Audio Control`_ (Level A)
     -
     -
   * - `2.1.1 Keyboard`_ (Level A)
     -
     -
   * - `2.1.2 No Keyboard Trap`_ (Level A)
     -
     -
   * - `2.1.4 Character Key Shortcuts`_ (Level A 2.1 only)
     -
     -
   * - `2.2.1 Timing Adjustable`_ (Level A)
     -
     -
   * - `2.2.2 Pause, Stop, Hide`_ (Level A)
     -
     -
   * - `2.3.1 Three Flashes or Below Threshold`_ (Level A)
     -
     -
   * - `2.4.1 Bypass Blocks`_ (Level A)
     -
     -
   * - `2.4.2 Page Titled`_ (Level A)
     -
     -
   * - `2.4.3 Focus Order`_ (Level A)
     -
     -
   * - `2.4.4 Link Purpose (In Context)`_ (Level A)
     -
     -
   * - `2.5.1 Pointer Gestures`_ (Level A 2.1 only)
     -
     -
   * - `2.5.2 Pointer Cancellation`_ (Level A 2.1 only)
     -
     -
   * - `2.5.3 Label in Name`_ (Level A 2.1 only)
     -
     -
   * - `2.5.4 Motion Actuation`_ (Level A 2.1 only)
     -
     -
   * - `3.1.1 Language of Page`_ (Level A)
     -
     -
   * - `3.2.1 On Focus`_ (Level A)
     -
     -
   * - `3.2.2 On Input`_ (Level A)
     -
     -
   * - `3.3.1 Error Identification`_ (Level A)
     -
     -
   * - `3.3.2 Labels or Instructions`_ (Level A)
     -
     -
   * - `4.1.1 Parsing`_ (Level A)
     -
     -
   * - `4.1.2 Name, Role, Value`_ (Level A)
     -
     -


Table 2: Success Criteria, Level AA
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Notes:

* 30-11-2020: First publication

.. list-table::
   :widths: 10 10 10
   :header-rows: 1

   * - Criteria
     - Conformance Level
     - Remarks and Explanations
   * - `1.2.4 Captions (Live)`_ (Level AA)
     -
     -
   * - `1.2.5 Audio Description (Prerecorded)`_ (Level AA)
     -
     -
   * - `1.3.4 Orientation`_ (Level AA 2.1 only)
     -
     -
   * - `1.3.5 Identify Input Purpose`_ (Level AA 2.1 only)
     -
     -
   * - `1.4.3 Contrast (Minimum)`_ (Level AA)
     -
     -
   * - `1.4.4 Resize text`_ (Level AA)
     -
     -
   * - `1.4.5 Images of Text`_ (Level AA)
     -
     -
   * - `1.4.10 Reflow`_ (Level AA 2.1 only)
     -
     -
   * - `1.4.11 Non-text Contrast`_ (Level AA 2.1 only)
     -
     -
   * - `1.4.12 Text Spacing`_ (Level AA 2.1 only)
     -
     -
   * - `1.4.13 Content on Hover or Focus`_ (Level AA 2.1 only)
     -
     -
   * - `2.4.5 Multiple Ways`_ (Level AA)
     -
     -
   * - `2.4.6 Headings and Labels`_ (Level AA)
     -
     -
   * - `2.4.7 Focus Visible`_ (Level AA)
     -
     -
   * - `3.1.2 Language of Parts`_ (Level AA)
     -
     -
   * - `3.2.3 Consistent Navigation`_ (Level AA)
     -
     -
   * - `3.2.4 Consistent Identification`_ (Level AA)
     -
     -
   * - `3.3.3 Error Suggestion`_ (Level AA)
     -
     -
   * - `3.3.4 Error Prevention (Legal, Financial, Data)`_ (Level AA)
     -
     -
   * - `4.1.3 Status Messages`_ (Level AA 2.1 only)
     -
     -
.. _Web Content Accessibility Guidelines 2.0: http://www.w3.org/TR/2008/REC-WCAG20-20081211
.. _Web Content Accessibility Guidelines 2.1: https://www.w3.org/TR/WCAG21
.. _WCAG 2.0 Conformance Requirements: https://www.w3.org/TR/WCAG20/#conformance-reqs

.. _WAVE Web Accessibility Evaluation Tool: https://wave.webaim.org/
.. _Microsoft Narrator: https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1

.. _1.1.1 Non-text Content: http://www.w3.org/TR/WCAG20/#text-equiv-all
.. _1.2.1 Audio-only and Video-only (Prerecorded): http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt
.. _1.2.2 Captions (Prerecorded): http://www.w3.org/TR/WCAG20/#media-equiv-captions
.. _1.2.3 Audio Description or Media Alternative (Prerecorded): http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc
.. _1.3.1 Info and Relationships: http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic
.. _1.3.2 Meaningful Sequence: http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence
.. _1.3.3 Sensory Characteristics: http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding
.. _1.4.1 Use of Color: http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color
.. _1.4.2 Audio Control: http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio
.. _2.1.1 Keyboard: http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable
.. _2.1.2 No Keyboard Trap: http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping
.. _2.1.4 Character Key Shortcuts: https://www.w3.org/TR/WCAG21/#character-key-shortcuts
.. _2.2.1 Timing Adjustable: http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors
.. _2.2.2 Pause, Stop, Hide: http://www.w3.org/TR/WCAG20/#time-limits-pause
.. _2.3.1 Three Flashes or Below Threshold: http://www.w3.org/TR/WCAG20/#seizure-does-not-violate
.. _2.4.1 Bypass Blocks: http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip
.. _2.4.2 Page Titled: http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title
.. _2.4.3 Focus Order: http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order
.. _2.4.4 Link Purpose (In Context): http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs
.. _2.5.1 Pointer Gestures: https://www.w3.org/TR/WCAG21/#pointer-gestures
.. _2.5.2 Pointer Cancellation: https://www.w3.org/TR/WCAG21/#pointer-cancellation
.. _2.5.3 Label in Name: https://www.w3.org/TR/WCAG21/#label-in-name
.. _2.5.4 Motion Actuation: https://www.w3.org/TR/WCAG21/#motion-actuation
.. _3.1.1 Language of Page: http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id
.. _3.2.1 On Focus: http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus
.. _3.2.2 On Input: http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change
.. _3.3.1 Error Identification: http://www.w3.org/TR/WCAG20/#minimize-error-identified
.. _3.3.2 Labels or Instructions: http://www.w3.org/TR/WCAG20/#minimize-error-cues
.. _4.1.1 Parsing: http://www.w3.org/TR/WCAG20/#ensure-compat-parses
.. _4.1.2 Name, Role, Value: http://www.w3.org/TR/WCAG20/#ensure-compat-rsv

.. _1.2.4 Captions (Live): http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions
.. _1.2.5 Audio Description (Prerecorded): http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only
.. _1.3.4 Orientation: https://www.w3.org/TR/WCAG21/#orientation
.. _1.3.5 Identify Input Purpose: https://www.w3.org/TR/WCAG21/#identify-input-purpose
.. _1.4.3 Contrast (Minimum): http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast
.. _1.4.4 Resize text: http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale
.. _1.4.5 Images of Text: http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation
.. _1.4.10 Reflow: https://www.w3.org/TR/WCAG21/#reflow
.. _1.4.11 Non-text Contrast: https://www.w3.org/TR/WCAG21/#non-text-contrast
.. _1.4.12 Text Spacing: https://www.w3.org/TR/WCAG21/#text-spacing
.. _1.4.13 Content on Hover or Focus: https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus
.. _2.4.5 Multiple Ways: http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc
.. _2.4.6 Headings and Labels: http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive
.. _2.4.7 Focus Visible: http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible
.. _3.1.2 Language of Parts: http://www.w3.org/TR/WCAG20/#meaning-other-lang-id
.. _3.2.3 Consistent Navigation: http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations
.. _3.2.4 Consistent Identification: http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality
.. _3.3.3 Error Suggestion: http://www.w3.org/TR/WCAG20/#minimize-error-suggestions
.. _3.3.4 Error Prevention (Legal, Financial, Data): http://www.w3.org/TR/WCAG20/#minimize-error-reversible
.. _4.1.3 Status Messages: https://www.w3.org/TR/WCAG21/#status-messages
