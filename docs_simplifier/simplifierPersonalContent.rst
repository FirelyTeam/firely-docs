Manage your content
--------------------

Personal Portal
^^^^^^^^^^^^^^^
All your personal content is accessible through your personal portal. Through this portal you can create new projects, manage your existing projects, quickly access your favourite projects and publications, create or your connectors, shop for connectors, and view and edit your personal details.

Projects
^^^^^^^^^^^^^^^
In the tab Your projects on your Portal page you can find the button labeled Create New Project. Clicking this button will allow you to create a new project by entering a Display Name, Description, and Scope

If you are in a project team you will see the Project Name and your role in the project. If you click on a project, the Project Page of this project will open. This is the same page as described in the "View existing FHIR Resources" section.

Add Resources
""""""""""""""""
If you have "Write" rights to a project you will see an Add button at the top of the Project Page. Here you can choose to upload a local file or fetch resource from another FHIR server.

The following Upload options are available:

* You can upload **.json** or **.xml**
* You can upload a single **resource** or multiple in a **bundle**
* You can upload a **.zip** file containing multiple files

If you choose to add resources from a FHIR server, you can do a simple GET or a FHIR search. The first will add a single resource, the latter will let you add multiple resources at once. 

Examples:

- To add a Patient resource with id "example" : 
	``http://example.org/fhir/Patient/example`` 
- To add all Patient resources that conform to the DAF profile: 
	``http://example.org/fhir/Patient?profile=http://hl7.org/fhir/StringDefinition/daf-patient``

If you add a batch of resources (via a bundle, a zip, or a search query) you can choose how to publish the resources that are part of the batch.
The following options are available:

* Do not publish these resources automatically
* Publish these resources when their status is "Active" (examples will always be published)
* Publish all of them