Connectors
==========

Simplifier allows users to create a connection to other applications. Think about sending a StructureDefinition to an Example generator, a TestScript resource to a server test application, a ValueSet to a terminology server etc.

Subscribe to a connector
------------------------

If you want to make use of an already available connector, you can personally "subscribe" to one. To do this, please follow these steps:

   1.	Go to https://simplifier.net.
   2.	Log in to your portal by clicking the Log in button in the upper right corner, or go to the following link https://www.simplifier.net/ui/User/Index.
   3.	Click on “Connectors” in the portal menu.
   4.	Click on “Shop” to see a list of available connectors.
   5.	Subscribe to the connector that’s right for you and click the “subscribe” button.


Create a connector
------------------
You can also create a connector for your own personal use or for publication and use by others. Please follow these steps:

   1.	Go to https://simplifier.net.
   2.	Log in to your portal by clicking the Log in button in the upper right corner, or go to the following link https://www.simplifier.net/ui/User/Index.
   3.	Click on “Connectors” in the portal menu.
   4.	Click on “Create”.
   5.	Fill in the metadata for your connector under the "Properties" tab.
   6.	Use the “Script Editor” tab to write the actual script. **Note:** You have to write your script using Javascript. 


      Example: 

      .. code-block:: Javascript

       window.location.href = "http://example.com/createExample?profile="+simplifierServer.ResourceEndpoint+"&callbackurl="+returnUrl;

      This script sends the FHIR endpoint of the resource to example.com. Example.com then retrieves the profile and creates an example instance.
      
      To find out more about writing the actual script visit the `Connector Scripts <http://docs.simplifier.net/en/latest/docs_simplifier/simplifierWriteConnector.html>`_ page. 

   7. Once you are satisfied with your input, click on “Save”. The connector is then created and will be visible in the “Connectors” tab of your personal portal.
   8.	To submit your connector for publication, open the connector from your "Connectors" tab and click on “Request Connector Publication” in the upper right.  Your connector will then be submitted for review by  the Simplifier administrator. Once the connector is approved it will be available in the shop for use by others. **Note**: The Simplifier Administrator reviews all connectors submitted for publication to ensure the quality and security of all content. 


Use a connector
---------------
Each connector specifies one or multiple resources that it can be used with. You can view this in the shop or, if you are already subscribed, in your personal connector portal page. Once you have subscribed to a connector, you can use the connector for every resource type specified for that resource.
 
| Example: 
|
| If you have subscribed to a resource which generates an example for StructureDefinitions, you can access that connector on each StructureDefinition.
| Once you click on it, the connector sends a request to open this specific resource from Simplifier.

