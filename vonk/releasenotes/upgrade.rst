.. _upgrade:

How to upgrade Vonk?
====================

Upgrading Vonk should be easy to do. The process depends on whether you have a vanilla Vonk FHIR Server, you added your own plugins or are running a Facade.
We start by describing the general process, which is then followed by a list of details per each released version of Vonk.

.. _upgrade_server: 

Upgrading Vonk FHIR Server
--------------------------

.. _upgrade_server_binaries:

Using the binary distribution
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Download the latest version of Vonk, see :ref:`getting_started`, and extract it to where you want it installed.
#. Copy your appsettings.instance and logsettings.instance files from the current installation to the new installation. 
#. Check the :ref:`vonk_releasenotes` for any new settings that you may want to apply or change from their defaults.
#. Check the :ref:`vonk_releasenotes` for any actions that you need to take specifically for this upgrade.
#. Make sure the new installation can find the license file (see :ref:`configure_license`, general advice is to put the license file outside of the installation directory).
#. Create a backup of your current databases, both the main Resource database and the Administration database. (See :ref:`configure_repository` to find the details on your configured database connection).
#. Stop the running instance of Vonk (Ctrl + C).
#. Switch to the new installation directory and start Vonk from there (``> dotnet .\Vonk.Server.dll``)
#. Vonk will now do several upgrade tasks, during which any web request will be responded to with 423 - Locked:

   #. If needed, an update is applied to the database structure.
   #. If Vonk introduces a new version of the FHIR .NET API, Vonk will load a new set of Conformance Resources from the specification.zip into the Administration database, for both FHIR STU3 and FHIR R4. In a specific case you can :ref:`prevent this step from happening <replace_admindb>`.

#. When Vonk is done with the tasks above, it is again available to process requests.
#. Check the log for warnings stating that you use obsolete settings. If so, adjust them and restart Vonk.

If anything went wrong, go back:

#. Stop the (new) running instance of Vonk.
#. Restore both databases from your backup.
#. Switch to the old installation directory and start the old version of Vonk from there (``> dotnet .\Vonk.Server.dll``)
#. It should start as it did before you began the upgrade.
#. Report the problem to the Vonk helpdesk, see :ref:`vonk-contact`.

.. _replace_admindb:

You may be able to avoid the import of specification.zip if:

* The Administration database is in SQLite and
* You have not made alterations to the Administration API through the Web API.

In this case you can simply replace the old database (usually with the filename vonkadmin.db) with the one from the new installation directory (in ./data/vonkadmin.db).
Do so *before* you start the new Vonk installation.
Anything specified in :ref:`AdministrationImportOptions <configure_admin_import>` will be re-imported into the new database.

.. _upgrade_server_docker:

Using Docker
^^^^^^^^^^^^

Revisit :ref:`use_docker`.

#. Stop the running container for Vonk: ``> docker stop vonk.server``.
#. Pull the latest image for Vonk: ``> docker pull simplifier/vonk``
#. Check the :ref:`vonk_releasenotes` for any new settings that you may want to apply or change from their defaults, and apply that to the ``environment`` setting in the docker-compose file.
#. Check the :ref:`vonk_releasenotes` for any action that you need to take specifically for this upgrade.
#. Create a backup of your current databases, both the main Resource database and the Administration database. (See :ref:`configure_repository` and your docker-compose file to find the details on where your databases are).
#. Start the new version (see :ref:`use_docker` for the various commands to run the Vonk container).
#. Vonk will now do several upgrade tasks, during which any web request will be responded to with 423 - Locked:

   #. If needed, an update is applied to the database structure.
   #. If Vonk introduces a new version of the FHIR .NET API, Vonk will load a new set of Conformance Resources from the specification.zip into the Administration database, for both FHIR STU3 and FHIR R4. In a specific case you can :ref:`prevent this step from happening <replace_admindb>`.

#. When Vonk is done with the tasks above, it is again available to process requests.
#. Check the log for warnings stating that you use obsolete settings. If so, adjust them and restart Vonk.

If anything went wrong, go back:

#. Stop the (new) running container of Vonk.
#. Restore both databases from your backup.
#. Specify your previous image of Vonk in the docker command or in the docker-compose file: ``simplifier\vonk:<previous-version-tag>``
#. Start the container based on this previous image.
#. It should start as it did before you began the upgrade.
#. Report the problem to the Vonk helpdesk, see :ref:`vonk-contact`.

.. _upgrade_plugin:

Upgrading Plugins
-----------------

Since a Plugin runs in the context of a Vonk FHIR Server we advice you to start by upgrading your Vonk FHIR Server, without loading your Plugin.
Check the section on :ref:`settings_pipeline` to see how you can exclude your plugin from the pipeline.

Upgrade the references in your plugin:

#. Open the sourcecode of your plugin, and open the project file (``yourplugin.csproj``).
#. Change the references to the Vonk.* packages to the version that you want to upgrade to.
#. Build and check the errors.
#. Check the list of breaking changes for the new Vonk version in the :ref:`vonk_releasenotes`. Applying the changes should fix the errors.
#. Still errors? Maybe we have overlooked a change. Please report it to us, see :ref:`vonk-contact`. And if it is easy to fix - do so :-)
#. Build and publish your plugin. 
#. Put the resulting dll's in the plugin directory of the new installation of Vonk.
#. Re-include your plugin in the pipeline.
#. (Re)start Vonk and test the working of your plugin.

.. _upgrade_facade:

Upgrading Facades
-----------------

A Facade implementation is technically also a plugin, but one that only adds repository access services. For this it makes no sense to try to run Vonk without the Facade as is described for plugins.
So start with upgrading the references right away.

Especially for Facades to relational databases: match the version of EntityFrameworkCore that the new version of Vonk is using. Check the list of changes to see whether we upgraded.

