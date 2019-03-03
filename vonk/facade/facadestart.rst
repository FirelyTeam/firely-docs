.. _facadestart:

Exercise: Build your first Facade
---------------------------------

The best way to get experience in developing a Vonk FHIR Facade is by following the exercise - build your first facade.
This exercise builds a facade on a simple relational database, by creating a plugin and inserting that into the Vonk pipeline.


Using a Vonk Facade allows you to open up legacy systems to the FHIR ecosystem, segregate your logical data storage, or even add a whole new database backend.

In this exercise you will use Vonk FHIR Facade libraries to build an ASP.NET Core library implementing a FHIR RESTful API on top of an existing database.

The existing database contains two simple tables 'Patient' and 'BloodPressure'. In the exercise we refer to it as the 'ViSi' system, short for 'VitalSigns'.

Git repository Vonk.Facade.Starter
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This repository contains the completed exercise. You can find the repository at `Github <https://github.com/FirelyTeam/Vonk.Facade.Starter>`_.
Of course we do recommend to try and do the exercise yourself first, before looking at the final result.
