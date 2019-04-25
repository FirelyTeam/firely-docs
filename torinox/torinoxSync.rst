Torinox project Synchronization
===============================
You can keep a local folder in sync with a project in Simplifier by using the Torinox `sync`_ command.
For that Torinox uses the zip api endpoint of Simplifier.

In order to sync with a project in Simplifier, you have to be logged in. 
`
    simplifier login
`_

Synchronization has several options

Synchronization to Simplifier
-----------------------------
To sync to a Simplifier project, use the `--up`_ flag.
This will synchronize all files in the current folder to your project.

Synchronizing from Simplifier to a local folder
------------------------------------------------
To synchronize to a local folder use the `--down`_ flag.
This will update all files in your current folder that are newer or missing.

Synchronization Details 
-----------------------
In order to get more detailed information during the sync process, use the flag `--verbose`_.
This will show each individual file that is being synchronized. This works both for syncing up and for syncing down.

Bidirectional
-------------
You can synchronize both ways using a combination of the `--up`_ and `--down`_ flag.

Subfolders
----------
If you want to include all subfolders of the current folder in synchronization, use the `--subfolders`_ flag.
This works both for uploading and for downloading. For Files that are in folders that don't exist in the target location,
the subfolders will be created.



