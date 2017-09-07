.. _resetdb:

Reset the database
==================

If you have set up Vonk as a reference server in a testing environment it can be useful to reset the database. Usually in combination with :ref:`preload`.

To do so execute:
::

    POST http(s)//<vonk-endpoint>/administration/reset

Vonk will return statuscode 200 if the operation succeeded. 

If you are not permitted to do this, Vonk will return statuscode 403.

On a large database this operation may take a while. 
An alternative if you have direct access to the database server is to delete the database altogether and have Vonk recreate it again with the AutoUpdateDatabase feature. 
See the :ref:`configure` on how to enable the AutoUpdateDatabase feature.

Although the operation requires no further arguments it requires a POST, since it is certainly not side-effect free.
