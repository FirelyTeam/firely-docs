Features
========
Simplifier offers the possibility to create FHIR projects and share your FHIR resources with others all over the world.

Browse existing projects
------------------------
The Project Browser enables ordering and filtering all existing Simplifier.net projects. You can access the Project Browser through the home page of Simplfier.

Above the list of projects you will find an "Order By" dropdown menu. The available options in this menu are :

* Project Name 
* Project Key
* Project Scope
* Creation Date

You can use the filter to search for more specific projects. The filter pane starts with two options, namely Search by Project Name, and Filter on Project Scope. 
Filtering on Project Scope allows you to make a distinction between Core, International, National, Local, and Regional projects.
If you select the National Project Scope, the Nationality filter option will open. Here you can select one or more nationalities.


View existing FHIR resources
---------------------------- 
Once you find the project you were looking for, click the project to open the project page. 
The project page consists of three main topics, Introduction, Resources, and Members.

Introduction
^^^^^^^^^^^^
On the Introduction tab you can find:

* The Most Popular resources of the project
* The number of Conformance Resources contained in the project
* The number of Examples Resources contained in the project

Resources
^^^^^^^^^
On the Resources tab you can find all the Conformance and Example Resources of the project.
This tab also offers a search and filter option. 

You can filter Resources on their Published status (All/Yes/No) and their Publication Categories (ConformanceResource/ExampleResource).
If you select the ConformanceResource Publication Category, the filter pane will show more options. You can further specify the Conformance Resource Types into StructureDefinition, ValueSet, and Extension. 

If you select the type StructureDefinition the filter pane will show the option to search Core Base Types, allowing you to show all Resources of one or more specific Core Base Types.

Members
^^^^^^^
On the Members tab you can find all project members and their role. This tab also offers a search option, allowing you to search a member on username or full name.

Manage your content
--------------------

Personal Portal
^^^^^^^^^^^^^^^
All your personal content is accessible through your personal portal. Through this portal you can create new projects, manage your existing projects, quickly access your favourite projects and publications, create or your connectors, shop for connectors, and view and edit your personal details.

Projects
^^^^^^^^^^^^^^^
In the tab Your projects on your Portal page you can find the button labeled Create New Project. Clicking this button will allow you to create a new project by entering a Display Name, Description, and Scope

If you are in a project team you will see the Project Name and your role in the project. If you click on a project, the Project Page of this project will open. This is the same page as described in the "View existing FHIR Resources" section.

Upload Resources
""""""""""""""""
If you have "Write" rights to a project you will see an Upload button at the top of the Project Page. 

The following Upload options are available:

* You can upload **.json** or **.xml**
* You can upload a single **resource** or multiple in a **bundle**
* You can upload a **.zip** file containing multiple files

If you upload a batch of resources you can choose how to publish the resources that are part of the batch.
The following options are available:

* Do not publish these resources automatically
* Publish these resources when their status is "Active" (examples will always be published)
* Publish all of them

Github integration
------------------

Connectors
----------
A Connector is a script written by you or another community member. These scripts connects functionality from other websites or applications to Simplifier.net.
You can view your active connectors, shop for new connectors, or create or edit your own connectors via the Portal page.

Shop for Connectors
^^^^^^^^^^^^^^^^^^^
In the Connectors Shop you can see a list of all available connectors. This list shows the Name, Description, Owner, Direction, and Resource Type of the Connector. To Subscribe to the Connector you want, simply press the Subscribe button.

Create/Edit Connectors
^^^^^^^^^^^^^^^^^^^^^^
On the Connectors - Create and Edit page you will see a Create Connector button and a list of your Connectors.

Using the Create Connector button or clicking an existing Connector will open the Connector Details page where you can enter or edit the Name, Description, Direction, and Resource Type.
To build or edit your script, click the Script Editor.

**Note**: All scripts will go through a proliferation process and will not be usable without the approval of a Simplifier.net Admin.


