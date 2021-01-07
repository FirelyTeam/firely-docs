Connectors
==========

Simplifier allows users to create connector scripts: such scripts allow external web applications to open Simplifier's resources or call an external service and show the result in Simplfier. Think about sending a StructureDefinition to an examples generator, a TestScript resource to a server test application, a ValueSet to a terminology server etc.

Subscribe to a connector
------------------------
To make use of an already available connector, you need to personally "subscribe" to one. To do this, please follow these steps:

   1.	Go to https://simplifier.net.
   2.	Log in to your portal by clicking the Log in button in the upper right corner, or go to the `following link <https://simplifier.net/portal>`_.
   3.	Click on “Connectors” in the portal menu.
   4.	Click on “Shop” to see a list of available connectors.
   5.	Subscribe to the connector that’s right for you and click the “subscribe” button.

After you've subscribed to a connector, you can start using it - see below.

Use a connector
---------------
Each connector specifies one or multiple resources that it can be used with. You can view this in the shop or, if you are already subscribed, in your personal connector portal page. Once you have subscribed to a connector, you can use the connector for every resource type specified for that resource.
 
	Example: 

	If you have subscribed to a resource which generates an example for StructureDefinitions, you can access that connector on each StructureDefinition.
	Once you click on it, the connector sends a request to open this specific resource from Simplifier.

Connector scripts
-----------------

To create a connector your own personal use or for publication and use by others, follow these steps:

   1.	Go to https://simplifier.net.
   2.	Log in to your portal by clicking the Log in button in the upper right corner, or go to the `following link <https://simplifier.net/portal>`_.
   3.	Click on “Connectors” in the portal menu.
   4.	Click on “Create”.
   5.	Fill in the metadata for your connector under the "Properties" tab.
   6.	Use the “Script Editor” tab to write the actual script. **Note:** You have to write your script using Javascript. 


      Example: 

      .. code-block:: Javascript

       // trivial connector that redirects the webpage to example.com with a parameter to the resource
       // the connector was used with
       window.location.href = "http://example.com/createExample?profile="+simplifierServer.ResourceEndpoint+"&callbackurl="+returnUrl;

      This script sends the FHIR endpoint of the resource to example.com. Example.com then would retrieve the profile and creates an example instance.
      
   7. Once you are satisfied with your input, click on “Save”. The connector is then created and will be visible in the “Connectors” tab of your personal portal.
   8.	To submit your connector for publication, open the connector from your "Connectors" tab and click on “Request Connector Publication” in the upper right.  Your connector will then be submitted for review by  the Simplifier administrator. Once the connector is approved it will be available in the shop for use by others. **Note**: The Simplifier Administrator reviews all connectors submitted for publication to ensure the quality and security of all content. 

Available libraries
-------------------

There are several things that you will likely do when you write a connector script. And to make this as easy as possible, your script will have access to the following Javascript libraries:

	- JQuery 2.1.1
	- JQuery.Redirect 1.0.1
	- `fhir.js <https://github.com/FHIR/fhir.js>`_


Helpers
-------
To perform actual FHIR requests, you have access to several methods and variables that will be set by Simplifier before your connector script is executed:

fhirServer
	Wrapper of the `fhir.js <https://github.com/FHIR/fhir.js>`_ client with a jQuery adapter. You will instantiate a new client by providing the base url and you will have access to all the functionality provided by fhir.js with an embedded jQuery adapter (which is required by the plain fhir.js constructor). For example: 
	
	.. code-block:: Javascript
	
		var client = fhirServer("www.example.com");
	
simplifier
	This is a ready to use fhir.js client that connects to Simplifier. When your connector is executed by a user, they will do that from the page that shows a resource. The FHIR endpoint of that resource can be accessed in the following manner:
	
	.. code-block:: Javascript
	
		simplifier.ResourceEndpoint // contains the URL the resource is accessible at
	
	This allows you to send the fhir endpoint to another server, so that that server can fetch the resource that is displayed on the current page.
	
	You will also have access to the resource itself in JSON or XML in case of post calls to another server.
	
	.. code-block:: Javascript
	
		simplifier.ResourceJson // contains the JSON of the resource
		simplifier.ResourceXml  // contains the XML of the resource
		
	Since in essence it is a fhir.js client, the simplifier client also exposes all other methods from in fhir.js like:
	
	.. code-block:: Javascript
	
			simplifier.read(...)
			
returnUrl
	This placeholder will contain the url of the page from where your connector script is executed.
	

$.get()
	JQuery's AJAX function to fetch data from a server:

	.. code-block:: Javascript
	
		$.get(url).success(function()
		{
			
		});


$.post()
	JQuery's AJAX function to post data to a server:
	
	.. code-block:: Javascript
	
		$.post(url, body).success(function()
		{
			
		});


$.redirect()
	Simplifier's addition to JQuery to do a POST redirect to a webpage with a payload:

	.. code-block:: Javascript
	
		$.redirect(url, body);

Read-only connectors
--------------------
There are two categories of read-only connectors: ones that redirect and ones that run an AJAX call.

Read-only connectors supply data to an external service but the service doesn't write back to Simplifier, example:

	.. code-block:: Javascript
	
	        // a simple redirect that provides the target location with the resource endpoint of the current page.
		window.location.href = "https://fhir-formats.github.io/index.html?loadResource="+simplifier.ResourceEndpoint;
	
AJAX connectors run a query on an external server and can use Simplifier to render the result as an OperationOutcome:

	.. code-block:: Javascript
	
            // sample connector that validates the patient resource
            // and uses Simplifier to render the outcome
            $.ajax({ 
                url: 'https://server.fire.ly/Patient/$validate', 
                type: 'post', 
                data: simplifier.ResourceJson, 
                headers: { 
                    Accept: 'application/fhir+json', 
                    'Content-Type': 'application/fhir+json'
                }, 
                dataType: 'json', 
                success: function (data) { 
                    $.redirect("/render/operationoutcome", data.responseText); 
                }, 
                error: function (data){ 
                    var output = data; 
                    if (output === undefined){ 
                        console.log("Error! Action could not be performed"); 
                        $.redirect("/render/operationoutcome", data.responseText); 
                    } 
                    else{
                        console.log("Validation failed");
                        $.redirect("/render/operationoutcome", data.responseText); 
                    }       
                } 
            }); 



