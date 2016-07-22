GitHub integration
==================
The Github integration enables you to link Simplier projects to Github repositories. When linking the project with the repository, the
resources from the repository are fetched and added to your Simplifier project.
This page will elaborate further on how to perform the linking.

GitHub Linking
--------------
You can link a repository in Github to your Simplifier project by going to your project and selecting the "Link to Github Repository" under the Options menu.
You will be redirected to the GitHub login or, when you are already logged in in GitHub, straight to the page where you will be asked to authorize that Simplifier can access your repository.

When that succeeds, you will be directed back to Simplifier, where Simplifier will ask you which repository you want to link and which branch within that repository.

Settings
--------
When connecting a GitHub repository you will be asked to choose a strategy on how to deal with resources that fail to import (most likely because they are not valid FHIR resources) and whether to remove resources from your project when they are removed from your repository.

Fetch Updates
-------------
After the linking is performed, any updates on your resources in the Github repository will be sent automatically to Simplifier. Based on the the linking settings, resources from your Simplifier project will be updates/deleted/added from Github. 


