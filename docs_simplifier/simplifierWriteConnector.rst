Connector scripts
=================

There are several things that you will likely do when you write a connector script. And to make this as easy as possible, your script will have access to the following Javascript libraries:

	- JQuery 1.7
	- JQuery.Redirect 1.0.1
	- Fhir.js

Basic Ajax
----------
With JQuery, you have som basic AJAX methods to fetch or post data to servers. For example:

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
To perform actual FHIR requests, you have access to several methods and variables that will be set by SIMPLIFIER before your connector script is executed:

fhirServer
	Wrapper of fhir.js client with a jQuery adapter. You will instantiate a new client by providing the base url and you will have
	access to all the functionality provided by fhir.js with an embedded jQuery adapter (which is required by the plain fhir.js 		constructor). For example: 
	
	.. code-block:: Javascript
	
		var client = fhirServer("www.example.com");
	
simplifier
	This is a ready to use fhir.js client that connects to simplifier. When your connector is executed by a user, he will 	do that from the page that shows a resource. The FHIR endpoint of that resource can be accessed in the following manner:
	
	.. code-block:: Javascript
	
		simplifier.ResourceEndpoint
	
	This allows you to send the fhir endpoint to another server, so that that server can fetch the resource that is displayed on the current page.
	
	You will also have access to the resource itself in Json in case of post calls to another server
	
	.. code-block:: Javascript
	
		simplifier.ResourceJson
		
	Since in essence it is a fhir.js client, the simplifier client also exposes all other methods from in fhir.js like:
	
	.. code-block:: Javascript
	
			simplifier.read(...)
			
returnUrl
	This placeholder will contain the url of the page from where your connector script is executed.


Example scripts   
---------------
A simple redirect that provides the target location with the resource endpoint of the current page.

	.. code-block:: Javascript
	
		window.location.href = "http://clinfhir.com/createExample?profile="+simplifier.ResourceEndpoint;
	
