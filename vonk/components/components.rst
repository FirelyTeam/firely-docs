.. _vonk_components:

Vonk FHIR Components
====================

Vonk FHIR Components is the means to adjust a Vonk FHIR Server to your own special needs, beyond the configuration.
Vonk FHIR Server is built as a pipeline of middleware, see :ref:`architecture` for more background on that.
Vonk FHIR Components allows you to put components of your own into that pipeline, and remove components that you do not need.

.. warning::

   Vonk FHIR Components and the PipelineOptions described below are in their early stages of development. 
   This means you may encounter rough edges, parts of the programming interface may still change and the 
   PipelineOptions themselves may still change. 
   Especially the use of Vonk FHIR Components for building a Facade in combination with the Administration API will get a lot of attention in upcoming releases.
   All changes will be announced in the :ref:`vonk_releasenotes`.
   You are encouraged to use Vonk FHIR Components, but we may not be able to avoid breaking changes.

.. toctree::
   :maxdepth: 1
   :titlesonly:

   components_config
   components_configclasses
   components_log
   components_classes
   components_plugintemplate
   components_directhttp
   Example: Create a new Landing Page <example_landingpage>
   Example: $document <example_documentoperation>

