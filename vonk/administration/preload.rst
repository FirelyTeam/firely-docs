.. _preload:

Preloading a set of resources
=============================

If you have set up Vonk as a reference server in a testing environment it can be useful to load it with an 'iron test set' of examples. You can do that with the preload feature. Usually you will want to :ref:`resetdb` first.

To do so execute:
::

    POST http(s)//<vonk-endpoint>/administration/preload
    Content-Type: application/octet-stream
    Body: a zip file resources, each resource in a separate file (xml or json).

Vonk will return statuscode 200 if the operation succeeded. 

If you are not permitted to do this, Vonk will return statuscode 403.

The operation can take quite long if the zip contains many resources. 
E.g. when uploading the examples-json.zip from the specification it took about a minute on MongoDb and about 7 minutes on SQL Server on a simple test server.

This feature is not meant for bulk uploading really large sets of resources. Vonk currently has no special operation for bulk operations.
