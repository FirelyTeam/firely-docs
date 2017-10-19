.. _configure_vonk:

Configuring the Vonk server
===========================

In this section we assume you have downloaded and installed the Vonk binaries, and have obtained a license file.
If not, please see the :ref:`previous section <getting_started>` and follow the steps there first.

The steps you followed to get started will provide you with a basic Vonk server,
that runs on a standard port and keeps the data in memory.

If you need to adjust the port, or want to use a MongoDB or SQL database, you can
configure Vonk by adjusting the :ref:`configure_appsettings`.

If you want to change the way Vonk logs its information, you can adjust the :ref:`configure_log`.

.. toctree::
   :maxdepth: 1
   :titlesonly:
   :hidden:

   appsettings
   environment_variables
   administration
   ../features/customsearchparameters
   ../features/prevalidation
   ../features/structuredef_admin
   db_mongo
   db_sql
   hosting
   logsettings

