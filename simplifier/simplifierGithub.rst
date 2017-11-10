GitHub integration
==================
The GitHub integration enables you to link Simplier projects to GitHub repositories. When linking the project with the repository, the
resources from the repository are fetched and added to your Simplifier project.
This page will elaborate further on how to perform the linking.

GitHub Linking
--------------
You can link a repository in GitHub to your Simplifier project by going to your project and selecting the "Link to GitHub Repository" under the Options menu.
You will be redirected to the GitHub login or, when you are already logged in in GitHub, straight to the page where you will be asked to authorize that Simplifier can access your repository.

When that succeeds, you will be directed back to Simplifier, where Simplifier will ask you which repository you want to link and which branch within that repository.

To link an Organization GitHub repository after an already made link, you should go to your Organization on GitHub -> Settings Tab -> Third-party access -> press "Remove Restrictions" button. Now you should see the repositories from that organization when you try to link a GitHub Repository.

Settings
--------
When connecting a GitHub repository you will be asked to choose a strategy on how to deal with resources that fail to import (most likely because they are not valid FHIR resources) and whether to remove resources from your project when they are removed from your repository.

Fetch Updates
-------------
After the linking is performed, any updates on your resources in the GitHub repository will be sent automatically to Simplifier. Based on the the linking settings, resources from your Simplifier project will be updates/deleted/added from GitHub. 

GitHub Sync
-----------
GitHub Sync enables you to synchronize your Simplifier project with the linked GitHub repository. If you decided to skip the initial import after linking or you have old markdown, images or css files that up until recently were not supported by Simplifier, you are now able to have them in Simplifier as well using the sync process.


GitHub Include/Exclude
----------------------
The include/exclude feature allows users to specify what folders or file type they want to be fetched from GitHub into Simplifier. This goes as well for the folders or file type they want to be excluded from the import. You are able to specify these rules right after the initial link of the repository, before the initial import or later by accessing the GitHub->Change GitHub Settings menu option from the project page.
By default, everything is included. If some include statements are added, we will exclude everything by default. Simplifier import only xml, json, images and markdown file types. Comments are also supported using the "#" character.
The syntax is the following:

  #Include examples:
   FHIR/IG/**
   
   *.xml


  #Exclude examples:
   !FHIR/*.img
   
   !*.cs
   
   !FHIR/examples/*
