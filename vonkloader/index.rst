.. _vonkloader_index:

Welcome to the VonkLoader documentation
=========================================

Installing
----------
VonkLoader is a free, multithreaded tool for Windows / macOS / Linux to upload resources in bulk to any FHIR server. To install, go to `simplifier.net/downloads <https://simplifier.net/downloads>`_ and log in.


Running
-------

Available parameters are: ::

    -file:<filename>
        zip file with xml and/or json files with resources, mandatory
    -server:<url>
        FHIR server base address, mandatory
    -limit:x
        load no more than x resources, default is all the resources in the zip
    -parallel:
        how many requests are sent in parallel, default is 10
    -collectionHandling: AsIs / Split / Transaction
        AsIs: send a collection Bundle as is (to /Bundle)
        Split: send each of the Bundle.resource's from a collection Bundle separately (STU3 only)
        Transaction: convert the collection Bundle to a transaction Bundle and send it to the server base address (STU3 only)
    -forcePutInTransaction: resources in collections that have no id get one and are turned into a PUT entry in the transaction.
        By default they are turned into a POST. Only useful in combination with -collectionHandling:Transaction


See also ``vonkloader --help`` on running the tool.

Example: ::

    vonkloader -file:examples-json-stu3.zip -server:http://localhost:4080

    // load Synthea zip
    vonkloader -file:examples-json-stu3.zip -server:http://localhost:4080 -collectionHandling:Transaction -forcePutInTransaction

Release notes
-------------

2.1.0
^^^^^

#. Report unknown arguments
#. Recognize arguments case insensitively

2.0.1
^^^^^

#. Ignore directory entries, just traverse into them (they were reported as invalid files)
#. NullReference error could occur on transaction bundles

2.0.0
^^^^^

#. Add -forcePutInTransaction
#. Improve log messages
#. Recognize Batch and Transaction bundles and send them as-is (opposite to Collection bundles that can be transformed to Transaction bundles first).

1.1.0
^^^^^

#. Exit without user interaction (easier for automation scripts)

1.0.1
^^^^^

#. First public version, on .NET Core 2.1