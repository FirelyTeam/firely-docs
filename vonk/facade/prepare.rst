.. _preparations:

Preparations
============

Before you can start implementing your facade, you need to perform three steps to prepare. You will need
to have a license file, download the first example to build on from Github, and setup an example datatabase.

Vonk License File
-----------------

Vonk will not operate without a valid license. You can download an evaluation license from Simplifier.

#. Go to `Simplifier <https://simplifier.net>`_
#. If you don't have an account yet, create one.
#. From the homepage under 'Vonk FHIR Server' click 'Login and Install'
#. On the page 'Install Vonk' fill in your Organization name and Country, then click 'Download key'
#. Save the 'vonk-trial-license.json' file to your disk. In this tutorial we assume you save it to C:\\Vonk\\vonk-trial-license.json.

Git repository Vonk.Facade.Starter
----------------------------------

This repository contains the completed exercise. It has several branches to checkout the solution at several stages of the exercise.
You can find the repository at `Github <https://github.com/FirelyTeam/Vonk.Facade.Starter>`_.
You are not allowed to push commits to this repository.

Please clone branch exercise/step1::

    git clone https://github.com/FirelyTeam/Vonk.Facade.Starter.git -b exercise/step1

Database
--------

Create SQL Server database with scripts/CreateDatabase.SQL

It creates a database 'ViSi' with two tables: Patient and BloodPressure. You can familiarize yourself with the table structure and
contents to prepare for the mapping to FHIR later on.

Proceed to the next step to setup your facade project.
