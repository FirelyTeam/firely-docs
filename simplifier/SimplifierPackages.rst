Package management
========================
Simplifier.net offers functionality to handle packages and dependencies. This functionality allows you to publish packages based on your project resources, which can be immediately installed and used by people implementing your profiles. The Simplifier FHIR package server is NPM compatible. You may either connect to this server using a NPM client or use our cross platform FHIR command line tool called Torinox. On this page we will explain how to manage packages and dependencies in Simplifier, how to use a NPM client and Torinox to install packages for validation and snapshot generation, and how to create your own profile projects with package dependencies in Torinox.

Packages
---------------------------
General text on why and how?

View packages
^^^^^^^^^^^^^
Visit the ``Packages`` tab of any Simplifier project to see which packages are available in this project. For more information about a package and its content, click on the name of the package. 

The ``Introduction`` page will give you an overview of the package:
* Install instructions; shows the command you need to install the package, click on the blue copy icon to copy it to your clipboard. Click on Torinox or NPM to switch to your preferred tooling.
* Release notes; shows the release notes given by the author of the package.
* Dependencies; shows the dependencies to other packages.
* History; shows the previous versions of the package, click on a version name to see the details.
* Info; shows information about when the package was created, a link to the project it is part of and a download button to download the package.

.. image:: ./images/Packages_introduction.PNG
  :align: center

Switch to the ``Files`` tab to see the content of the package. 

.. image:: ./images/Packages_files.PNG
  :align: center

Publish packages
^^^^^^^^^^^^^^^^
Visit the ``Packages`` tab of your project and click on ``Create`` > ``Create new package`` to create a new package. Provide a name, version number, description and release notes for your package. Note that the name of your package should include at least one dot. Indicate if your package is a prelease package or not and click ``Create`` to publish your package. 
To create a new version of an existing package, click on ``Create`` and select ``Create new version for..`` followed by the name of your package. Add the required information and click ``Create`` to publish the new version of your package.

.. image:: ./images/CreatePackage.PNG
  :align: center
  
Dependencies
-----------------------
...

View dependencies
^^^^^^^^^^^^^^^^^
Visit the ``Dependencies`` tab of any Simplifier project to see a list of its package dependencies as well as indirect dependencies. Click on the name of one of the listed packages to see the details of this package. This will show the information as explained in the View Packages section.

.. image:: ./images/PackageDependencies.PNG
  :align: center

Add dependencies
^^^^^^^^^^^^^^^^
Visit the ``Dependencies`` tab to add dependencies to your project. There are two ways to do so. One way is to browse Simplifier for existing packages and add them to your project. The other way is to directly edit the JSON code.

Click ``Manage`` to search for existing dependencies. Type a search string in the search box and select a package and its version from the search results. Click ``Add`` to add the package to your project. When you are finished adding packages click ``Save`` to save the changes to your project.

.. image:: ./images/ManagePackageDependencies.PNG
  :align: center

Click ``Edit`` to directly edit the JSON code and add the packages and their version to ``dependencies``.

.. image:: ./images/EditPackageDependencies.PNG
  :align: center

Remove dependencies
^^^^^^^^^^^^^^^^^^^
To remove dependencies from your project, you could either select ``Manage`` or 

Torinox
-----------------------

NPM
-----------------------
