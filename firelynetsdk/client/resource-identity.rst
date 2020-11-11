.. _resource-identity:

About resource identity
-----------------------
``Read`` only takes urls as parameters, so if you have the Resource type
and its Id as distinct data variables, use ``ResourceIdentity``:
	
.. code:: csharp
	
	var patResultC = client.Read<Patient>(ResourceIdentity.Build("Patient","33"));

