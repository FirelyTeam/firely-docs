.. |br| raw:: html

   <br />


.. _feature_customsp:

Using Custom Search Parameters
==============================

.. include:: ./configuration/configure_searchparameters.rst

.. include:: ./features/reindex.rst


The SearchParameters that are loaded are automatically included in the CapabilityStatement in response to the :ref:`restful_capabilities` interaction.
This implies that you can check the CapabilityStatement to see whether a specific SearchParameter was actually loaded.

.. _feature_customsp_limitations:

Limitations
-----------

* Search parameters can NOT (yet) be posted to the /administration endpoint. 
* If a search parameter cannot be parsed correctly, it will silently be ignored. Expect improvement of this in a later version.
* Every search parameter has to have either:

  * a valid FhirPath in it's Expression property, or
  * be a Composite search parameter and specify at least one component.

