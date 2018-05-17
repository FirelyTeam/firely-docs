.. _facadestart:

Build your first Facade
=======================

Using a Vonk Facade allows you to open up legacy systems to the FHIR ecosystem, segregate your logical data storage, or even add a whole new database backend.

In this exercise you will use Vonk FHIR Facade libraries to build an ASP.NET Core Web API implementing a FHIR RESTful API on top of an existing database.

The existing database contains two simple tables 'Patient' and 'BloodPressure'. In the exercise we refer to it as the 'ViSi' system, short for 'VitalSigns'.

.. toctree::
   :maxdepth: 2
   :hidden:
   :titlesonly:

   prerequisites
   prepare
   projectsetup
   databasemodel
   enablesearch_1
   Next search step <enablesearch_2>
   Last three search steps <enablesearch_3>
   finalizesearch
   facade_accesscontrol
   accesscontrol_api





