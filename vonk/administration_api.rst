.. _administration:

=======================
Vonk Administration API
=======================

Besides the regular FHIR endpoint, Vonk also exposes an Administration API. The endpoint for this is::

   http(s)://<vonk-endpoint>/administration


.. |br| raw:: html

   <br />   

Custom profiles
---------------
If you have a custom profile, in the form of a StructureDefinition resource, and you want Vonk to use that 
when validating resources, you can simply feed the StructureDefinition to Vonk through the Administration API.
To this end the ``/administration`` endpoint is also a FHIR endpoint for StructureDefinition resources. 

To add a custom profile 'mypatient' you can::

   PUT https://<vonk-endpoint>/administration/StructureDefinition/mypatient

Subscriptions
-------------
Subscriptions can be posted to the ``/administration`` endpoint as well. If you post a Subscription
to the regular FHIR endpoint, it will be stored but not evaluated. Subscriptions posted to the
``/administration`` endpoint will be processed and evaluated for each POST/PUT to the server.

Vonk currently only supports Subscriptions with a Channel of type rest-hook.


.. include:: ./administration/reindex.rst

.. include:: ./administration/resetdb.rst

.. include:: ./administration/preload.rst