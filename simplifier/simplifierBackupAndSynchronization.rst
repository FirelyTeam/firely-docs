Backup and Synchronization
""""""""""""""""""""""""""
The Simplifier team has a solid backup process. We have continuous backup by our cloud storage provider. In addition, we perform a weekly manual backup.
Please note that this is for emergency situations, and you should not require to depend or rely on that from a user perspective.

Customers may want to have a possibility to backup whatever content they have on Simplifier (or more generally in the cloud for that matter). Here are some ways to make sure your data is regularly backed up:

FHIR endpoint
-------------
Each Simplifier project has a :ref:`FHIR endpoint<simpl_endpoint>`. With this, you can get a specific resource from your project using any FHIR client. You can also get all resources from a specific resource type.

*Future plans:* |br|
We have plans to implement the FHIR “global search” endpoint where you can get all resources from all types.


Zip Endpoint
------------
Simplifier has a ZIP API for every project. With an HTTP tool you can use ``GET`` or ``PUT https://simplifier.net/yourproject/api/zip`` to retrieve or update your project in zipped form.

Download
--------
You can always download the current versions of all resources, including or excluding texts and images.
Filepaths are preserved from GitHub and the regular upload. Resources that are initially uploaded through the fhir endpoint will have a persistent filename, but no absolute path.

Client tool
-----------
We can provide a client tool called Torinox that allows easy and automated synchronization and backup. `Torinox <simplifierPackages.html#torinox>`_ uses the simplifier ZIP API and was built to assist CI/CD scenarios.

All you need is this command line syntax: ``fhir sync <projectname> -down``

`Download it
<https://simplifier.net/downloads/torinox>`_ free.

Atom feed
---------
If you want to automate backup on any updated file, you can use the atom feed of the project log to trigger your client backup.

Webhook
-------
This is not implemented yet, but will be put on our roadmap if there is enough demand.


.. |br| raw:: html

   <br />
