Simplifier Connectors
=====================

Simplifier allows users to create a connection to other applications. Think about sending a StructureDefinition to an Example generator, a TestScript resource to a server test application, a ValueSet to an terminology server etc.

Subscribe to a connector
------------------------

If you want to make use of an already available connector, you can personally "subscribe" to one. To do this, please follow these steps:

   1. Log In on https://simplifier.net
   2. Go To you portal, by clicking on "portal"in the menu, or go to the following link: https://www.simplifier.net/ui/User/Index
   3. Click on "Connectors" in the portal menu
   4. Go to "shop" to find a list of connectors
   5. Find the connector you want to use and click on "subscribe". 

Create a connector
------------------

   1. Log In on https://simplifier.net
   2. Go To you portal, by clicking on "portal"in the menu, or go to the following link: https://www.simplifier.net/ui/User/Index
   3. Click on "Connectors" in the portal menu
   4. Go to "create/edit" 
   5. Go to "create connector"
   6. Fill in the metadata of your connector under the properties tab
   7. Use the "Script" tab to write the actual Script. **Note:** You have to write your script using Javascript.

      Example: 

      .. code-block:: Javascript

       window.location.href = "http://example.com/createExample?profile={endpoint}&callbackurl={returnUrl}";

      This script sends the FHIR endpoint of the resource to example.com. Example.com can then retrieves the profile and creates an example instance.

   8. Once you have created your connector, the Simplifier administrator gets notified. The administrator can either approve the connector or turns it down. If your connector is approved, it will be available in the shop. 

Use a connector
---------------

Each connector specifies one or multiple resources is can be used with. You can see this in the shop or if you already subscribed, on your personal connector page. If you have subscribed to a connector, you can use the connector on each resource of the type specified there under the "connectors" tab.

 
| Example: 
|
| For example, if you have subscribed to a resource which generates an example for StructureDefinitions, you can access that connector on each StructureDefinition.
| Once you click on it, the connector sends a request to open this specific resource from Simplifier








