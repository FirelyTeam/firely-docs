.. _vonkloader_index:

Welcome to the VonkLoader documentation
=========================================

Installing
~~~~~~~~~~
VonkLoader is a free, multithreaded tool for Windows / macOS / Linux to upload resources in bulk to any FHIR server. To install, go to `simplifier.net/downloads <https://simplifier.net/downloads>`_ and log in.


Running
~~~~~~~

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
