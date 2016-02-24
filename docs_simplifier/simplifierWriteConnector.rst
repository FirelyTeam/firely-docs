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

Place holders
-------------

Your script may contain place holders, that will be filled in before your connector script is executed:

{endpoint}
	When your connector is executed by a user, he will do that from the page that shows a resource. 
	The {endpoint} placeholder contain the url of the FHIR endpoint of that resource.

{returnurl}
	This placeholder will contain the url of the page from where your connector script is executed.

   