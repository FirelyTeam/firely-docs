.. _restful:

FHIR RESTful API
================

Vonk supports most of the features in the `FHIR RESTful API <http://www.hl7.org/implement/standards/fhir/http.html>`_.

.. _restful_crud:

Create, read, update, delete
----------------------------

These four operations to manage the contents of the Vonk FHIR Server, commonly referenced by the acronym CRUD, are implemented as per the specification.
This includes version-read and the conditional variations. 
Only a few limitations apply.

Vonk enables create-on-update: If you request an update and no resource exists for the given id, the provided resource will be created under the provided id.

Vonk can reject a resource based on :ref:`feature_prevalidation`.

.. _restful_crud_limitations:

Limitations
^^^^^^^^^^^

#. ``_summary`` is not yet supported.

.. _restful_versioning:

Versioning
----------

Vonk keeps a full version history of every resource, including the resources on the :ref:`administration_api`.

.. _restful_not_supported:

Search
------

Search is supported as per the specification, with a few :ref:`restful_search_limitations`.

In the default configuration the SearchParameters from the `FHIR specification <http://www.hl7.org/implement/standards/fhir/searchparameter-registry.html>`_ 
are available. But Vonk also allows :ref:`feature_customsp`. 

Chaining and reverse chaining is fully supported.

Quantity search on UCUM quantities automatically converts units to a canonical form. This means you can have kg in an Observation and search by lbs, or vice versa.

.. _restful_search_limitations:

Limitations
^^^^^^^^^^^

The following parameters and options are not yet supported:

#. ``_text``
#. ``_content``
#. ``_query``
#. ``_containedType``
#. ``_filter``
#. ``:approx`` modifier on a quantity SearchParameter
#. ``:text`` modifier on a string SearchParameter
#. ``:above``, ``:below``, ``:in``, ``:not-in`` modifiers on a token SearchParameter
#. ``:recurse`` modifier on ``_include`` and ``_revinclude``.

Furthermore:

#. ``_sort`` is only implemented for the parameter ``_lastUpdated`` in order to support History.
#. Whether a SearchParameter in a request is not implemented or has an error (e.g. in the format of the argument), it is always reported as 'not supported'.

.. _restful_capabilities:

Capabilities
-------------

On the Capabilities interaction (``<vonk-endpoint>/meteadata``) Vonk returns a CapabilityStatement that is built dynamically from the 
supported ResourceTypes, SearchParameters and interactions. E.g. if you :ref:`configure_searchparameters`, the SearchParameters that are actually loaded appear in the CapabilityStatement.

Not supported interactions
--------------------------

These interactions are not yet supported by Vonk:

#. patch
