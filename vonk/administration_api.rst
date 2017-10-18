.. _administration_api:

Vonk Administration API
=======================

Besides the regular FHIR endpoint, Vonk also exposes an Administration API. The endpoint for this is::
::

   http(s)://<vonk-endpoint>/administration


The following functions are available in the Administration API.

.. toctree::
   :maxdepth: 2
   :hidden:

   features/structuredef_admin
   features/customsearchparameters
   features/subscription
   features/reindex
   features/resetdb
   features/preload

Configuration
-------------

You can :ref:`configure_administration`, including restricting access to functions of the Administration API to specific ip addresses.

