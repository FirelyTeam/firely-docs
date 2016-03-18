Connector scripts
=================

There are several things that you will likely do when you write a connector script. And to make this as easy as possible, your script will have access to the following Javascript libraries:

	- JQuery 1.7
	- JQuery.Redirect 1.0.1
	- Fhir.js

If you wish to fetch data from a server

	.. code-block:: Javascript
	
		$.get(url).succes(function()
		{
			
		});
		
		$.post(url, body).succes(function()
		{
			
		});

To redirect to a different page, with a POST body payload:

	.. code-block:: Javascript
	
		$.redirect(url, body);

Helpers
-------------

You have access to several variables that will be filled in before your connector script is executed:

fhirServer
	Wrapper of fhir.js client with a jQuery adapter. You will instantiate a new client by providing the base url and you will have
	access to all the functionality provided by fhir.js with an embedded jQuery adapter (which is required by the plain fhir.js 		constructor). For example: 
	
	.. code-block:: Javascript
	
		var client = fhirServer("www.example.com");
	
simplifierServer
	Wrapper of simplifhier client which hides the fhir.js client construction. When your connector is executed by a user, he will 	do that from the page that shows a resource. The FHIR endpoint of that resource can be accessed in the following manner:
	
	.. code-block:: Javascript
	
		simplifierServer.ResourceEndpoint
	
	You will also have access to the resource in XML and Json in case of post calls to another server
	
	.. code-block:: Javascript
	
		simplifierServer.ResourceXml
		simplifierServer.ResourceJson
		
	Since in essence it is a fhir.js client, simplifierServer also exposes all the methods implemented in fhir.js
	
	.. code-block:: Javascript
	
			simplifierServer.read(...)
			
returnUrl
	This placeholder will contain the url of the page from where your connector script is executed.

   
