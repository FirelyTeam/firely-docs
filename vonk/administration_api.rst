.. _administration_api:

Vonk Administration API
=======================

Besides the regular FHIR endpoint, Vonk also exposes an Administration API. The endpoint for this is::
::

   http(s)://<vonk-endpoint>/administration

Functions
---------

The following functions are available in the Administration API.

* :ref:`conformance`
* :ref:`feature_subscription`
* :ref:`feature_customsp_reindex`
* :ref:`feature_resetdb`
* :ref:`feature_preload`
* :ref:`feature_terminology`

Configuration
-------------

You can :ref:`configure_administration`, including restricting access to functions of the Administration API to specific ip addresses.

Database
--------

The Administration API uses a database separately from the main 'Vonk Data' database. Historically, SQL Server, MongoDB and Memory are supported as databases for the Administration API.
|br| As of Vonk version 0.7.1 SQLite is advised for this, and we have made that the default configuration. See :ref:`configure_sqlite` on how to configure for this.



.. |br| raw:: html

   <br />

