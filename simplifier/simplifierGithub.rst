GitHub integration
==================
The GitHub integration enables you to link Simplier projects to GitHub repositories. When linking the project with the repository, the
resources from the repository are fetched and added to your Simplifier project.
This page will elaborate further on how to perform the linking.

GitHub Linking
--------------
You can link a repository in GitHub to your Simplifier project by going to your project and selecting the "Link to GitHub Repository" button under the Options menu.
You will be redirected to the GitHub login or, if you are already logged in to GitHub, straight to the page where you will be asked to authorize that Simplifier can access your repository.

Once this step is complete, you will be directed back to Simplifier, where Simplifier will ask you which repository you want to link and which branch within that repository.

To link an Organization GitHub repository after an already made link, you should go to your Organization on GitHub -> Settings Tab -> Third-party access -> and press the "Remove Restrictions" button. Now you should see the repositories from that organization when you try to link a GitHub Repository.

Settings
--------
When connecting a GitHub repository you will be asked to choose a strategy about how to deal with resources that fail to import (most likely because they are not valid FHIR resources) and whether to remove resources from your project when they are removed from your repository.

Fetch Updates
-------------
After the linking is performed, any updates to your resources in the GitHub repository will be sent automatically to Simplifier. Based on the the linking settings, resources from your Simplifier project will be updated to, deleted from, or added to GitHub. 

GitHub Sync
-----------
GitHub Sync enables you to synchronize your Simplifier project with the linked GitHub repository. Images or css files that up until recently were not supported by Simplifier are now available. If you decided to skip the initial import after linking or you have old markdown, you are now able to access them in Simplifier by using the sync process. 


GitHub Include/Exclude
----------------------
The include/exclude feature allows users to specify the folders or file types that should be fetched from GitHub into Simplifier. This also applies to the folders or file types that you would like to be excluded from the import. You are able to specify these rules right after the initial link to the repository, before the initial import or later by accessing the GitHub -> Change GitHub Settings menu option from the project page.
By default, everything is included. If include statements are added then everything else (not included in your include statement) will be excluded by default. Simplifier only imports xml, json, images, and markdown file types. Comments are also supported using the "#" character.
The syntax is the following:

Examples: 

  **#Include examples**
  
   **FHIR/IG/****
   
   ***.xml**


  **#Exclude examples**
  
   **!FHIR/*.img**
   
   **!*.cs**
   
   **!FHIR/examples/***



Gitwebhook per Branch
---------------------
For our Team and Enterprise account users, we added the ability to filter files that are synced from GitHub. We followed the .gitignore logic, but expanded it slightly to work from a include perspective as well. After you've set up a GitHub link, you can specify rules to include or exclude certain files or folders from your GitHub repository.

  **# Include all files under examples folder**
  **resources/examples/***

  **# Include all files and folders under staging**
  **project/staging/****

  **# Include all xml files:**
  ***.xml**

  **# Exclude all json files under temp folder:**

  **!temp/*.json**

Note that if you only use exclude patterns (starting with a exclamation mark !), Simplifier will assume you want to include everything but those filters.

You can use the same globbing patterns you are used to in a .gitignore file.


