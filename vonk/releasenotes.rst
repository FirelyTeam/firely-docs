:: _releasenotes

Release notes Vonk
==================

Release 2.8
-----------

1. Database changes

  If you have professional support, please consult us on the best way to upgrade your database.

  #. The schema for the SQL Database has changed. It also requires re-indexing all resources. 
  #. The (implicit) schema for the documents in the MongoDb database has changed. 
  #. The Administration API requires a separate database (SQL) or collection (MongoDb).

2. New features:

  #. :ref:`Custom Search Parameters <administration>`
  #. Preload resources from a zip.
  #. Reset database
  #. Conditional create / update /delete
  #. Support for the prefer header
  #. Validation on update / create (can be turned on/off)
  #. Configure supported interactions (turn certain interactions on/off)
  #. Support for Subscriptions with Webhook channel
  #. Restrict creates/updated to specific profiles.
  

3. New search features:

  #. ``_has``
  #. ``_type`` (search on system level)
  #. ``_list``
  #. ``_revinclude``
  #. ``_elements``

4. Enhancements

  #. ``:exact``: Correctly search case (in)sensitive when the :exact modifier is (not) used on string parameters.
  #. Enhanced reporting of errors and warnings in the OperationOutcome.
  #. Custom profiles / StructureDefinitions separated in the Administration API (instead of in the regular database).
  #. Full FHIRPath support for Search Parameters.
  #. Fixed date searches on dates without seconds and timezone
  #. Fixed evaluation of modifier :missing
  #. Correct total number of results in search result bundle.
  #. Fix paging links in search result bundle
  #. Better support for mimetypes.

5. DevOps:

  #. New :ref:`Administration API <administration>`
  #. Enabled logging of the SQL statements issued by Vonk (see :ref:`configure <configure>`)
  #. Migrations for SQL Server (auto create database schema, also for the Administration API)

6. Performance
  #. Added indexes to MongoDb and SQL Server implementations.



