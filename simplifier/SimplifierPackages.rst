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
Visit the ``Packages`` tab of your project and click on ``Create`` > ``Create new package`` to create a new package. Provide a name, version number, description and release notes for your package. Note that the name of your package should include at least one dot. 

.. image:: ./images/Packages_files.PNG
  :align: center

create new version

Dependencies
-----------------------

.. image:: ./images/Resourcessearch.PNG
  :align: center

Torinox
-----------------------

NPM
-----------------------
