.. _feature_customsp:

Using Custom Search Parameters
=============================

.. |br| raw:: html

   <br />

.. include:: ../configuration/customsearchparameters.rst

.. include:: ../administration/reindex.rst

.. _feature_customsp_limitations:

Limitations
-----------

* Search parameters can NOT (yet) be posted to the /administration endpoint. 
* If a search parameter cannot be parsed correctly, it will silently be ignored. Expect improvement of this in a later version.
* Every search parameter has to have either:

  * a valid FhirPath in it's Expression property, or
  * be a Composite search parameter and specify at least one component.

