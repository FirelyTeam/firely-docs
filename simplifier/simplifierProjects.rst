Create a New Project
^^^^^^^^^^^^^^^^^^^^
In the ``Projects`` tabs on your Portal page you can find the button labeled ``Create New Project``. Clicking this button will allow you to create a new project by entering a Display Name, Description, and Scope. Once the project has been created you can then customize project information, add resources, add members, and follow changes that are occurring in that project. 

The ``Introduction`` page of each of your projects has a section to add summary text about your project. This section serves as an overview of your project. This is a good area to share information about your project with people that may be team members or viewing your project for the first time. 

Add a Resource
""""""""""""""
On the Resources tab you can find all the Conformance and Example Resources for the project. 

If you have "Write" rights to a project you will see an option to ``+Upload`` resources at the top of the Project Page. Here you can choose one of the following options: 

*1. Upload a local file*

The following Upload options are available:

* You can upload **.json** or **.xml**
* You can upload a single **resource** or multiple in a **bundle**
* You can upload a **.zip** file containing multiple files

*2. Fetch a resource from another FHIR server*

If you choose to add resources from a FHIR server, you can do a simple GET or a FHIR search. The first will add a single resource, the latter will let you add multiple resources at once. 

Examples:

* To add a Patient resource with id "example" : 
	``http://example.org/fhir/Patient/example`` 
* To add all Patient resources that conform to the DAF profile: 
	``http://example.org/fhir/Patient?profile=http://hl7.org/fhir/StringDefinition/daf-patient``

*3. Copy/Paste json or xml code*

By selecting the Copy/Paste option, you can add your own **json** or **xml** code to add a single resource or a bundle of resources. If your code contains a **bundle**, you can either upload it as a single resource or select the **split bundle** check box to upload all entries as separate resources. 


*Adding multiple resources at once*

If you add a batch of resources (via a bundle, a zip, or a search query), you can choose how to publish the resources that are part of the batch.
The following options are available:

* Do not publish these resources automatically
* Publish these resources when their status is "Active" (examples will always be published)
* Publish all of them

Canonical Base
""""""""""""""
Project owners can now customize their canonical URLs to brand their projects. In the future, we will only see canonical URLs as valid if they match the canonical base URL of their project. To choose your URL go to your project and from the Options menu select Canonical Base URLs. Click on the Add URL button and then in the popup specify which base URL you would like to use. Make note that by choosing a canonical URL you are also certifying that it is within your rights to do so. 


Add Members
"""""""""""
The ``Members`` tab displays a list of all the members with rights to that project. In this section you can invite Simplifier and non-Simplifier members to your project by clicking the ``+Invite User`` button and typing in an emailaddress. 

When adding new members to your project you have the option to assign “Admin”, “Writer”, or “Reader” rights to that user. This assigns their rights within that particular project and can be changed at any time should someone’s function change. Users have the following rights within each role:

- **Admin**- Has the rights to change anything within the project with the exception of project ownership.
- **Writer**- Has the rights to add, change, and delete resources within the project.
- **Reader**- Has the rights to view anything within the project but cannot make any addtions or changes. 


Along the top of the ``Members`` tab you will find a summary of User information for your project. The number of users, the max users allowed for this project (in accordance with the type of plan you have), and the number of invitations you have pending (the number of users who have a not yet accepted an invitation).  

.. image:: ./images/Numberofmembers.png 

Track Project Changes
"""""""""""""""""""""
On the ``Log`` tab you will find event tracking of a project. This log keeps a list of all changes made to resources within the project, along with the name of the person that made changes and the time the changes were made. 

At the top of the screen you will find the Atom feed button. This allows you to subscribe to stay informed about any changes being made within your projects. To utilize this feature, navigate to a project on Simplifier.net that you are interested in following. Once there click on the “Subscribe” button in the upper right hand corner and copy the link into a feed reader of your choice. You are then ready to start receiving updates. 

.. image does not exist anymore... image:: http://i1084.photobucket.com/albums/j404/askfj/c2818dc0-e545-4b80-9f44-47973f2ced94_zps0mgbkvyn.png

Backup and Synchronization
""""""""""""""""""""""""""
The Simplifier team has a solid backup process. We have continuous backup by our cloud storage provider. In addition, we perform a weekly manual backup.
Please note that this is for emergency situations, and you should not require to depend or rely on that from a user perspective.

Many of our customers want to have a possibility to backup whatever content they have on Simplifier (or more generally in the cloud for that matter). Here are some ways to make sure your data is regularly backed up:

FHIR endpoint
-------------
Each Simplifier project has a :ref:`FHIR endpoint<simpl_endpoint>`. With this, you can get a specific resource from your project using any FHIR client. You can also get all resources from a specific resource type.

*Future plans:* |br|
We have plans to implement the FHIR “global search” endpoint where you can get all resources from all types.


Zip Endpoint
------------
Simplifier has a ZIP API for every project. You can use GET or PUT https://simplifier.net/yourproject/api/zip to retrieve or update your project in zipped form.

Download
--------
You can always download the current versions of all resources, including or excluding texts and images.
Filepaths are preserved from GitHub and the regular upload. Resources that are initially uploaded through the fhir endpoint will have a persistent filename, but no absolute path.

Client tool
-----------
We can provide a client tool called Torinox that allows easy and automated synchronization and backup. Torinox uses the simplifier ZIP API and was built to assist CI/CD scenarios.

All you need is this command line syntax: ``fhir sync <projectname> -down``

Please :ref:`contact us<simpl_contact>` if you’re interested in this tool.


Atom feed
---------
If you want to automate backup on any updated file, you can use the atom feed of the project log to trigger your client backup.

Webhook
-------
This is not implemented yet, but will be put on our roadmap if there is enough demand.


.. |br| raw:: html

   <br />