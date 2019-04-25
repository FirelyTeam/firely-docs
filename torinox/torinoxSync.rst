Torinox project Synchronization
===============================
These documentation is for Torinox version 0.9.5 or higher.

You can keep a local folder in sync with a project in Simplifier by using the Torinox ``sync`` command.
For that Torinox uses the zip api endpoint of Simplifier.

In order to sync with a project in Simplifier, you have to be logged in. 
::
    simplifier login

Synchronization has several options.

Download
--------
To download the latest content of a Simplifier project to a local folder, use the ``--down`` flag: ::
    > fhir sync --down

This will update all files in your current folder that are newer or missing.

Upload
-------
To upload the contents of a local folder to a Simplifier use the ``--up`` command.
::
    > fhir sync --up

Details 
-------
In order to get more detailed information during the sync process, use the flag ``--verbose``.
This will show each individual file that is being synchronized. This works both for syncing up and for syncing down.

Bidirectional
-------------
You can synchronize both ways using a combination of the ``--up`` and ``--down`` flag: ::

    > fhir sync --up --down

or, using short flags: ::
    > fhir sync -ud

    
Subfolders
----------
If you want to include all subfolders of the current folder in synchronization, use the ``--folders`` flag.
This works both for uploading and for downloading. For Files that are in folders that don't exist in the target location,
the subfolders will be created.



