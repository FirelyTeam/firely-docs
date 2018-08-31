.. _simpl_endpoint:

API
^^^^^^^^
The endpoint of a project or resource can be used to either search for resources in Simplifier or to read, search, add and update resources in a FHIR client. System wide searches and history searches are also supported. To retrieve the endpoint of a project or resource in Simplifier click on ``API`` in the top right menu when visiting either the `project <simplifierProjects.html#project-page>`_ or `resource <simplifierResources.html#resource-page>`_ page. The below image shows the location.

.. image:: ./ProjectApicCmpleteScreen.png


Project FHIR API
""""""""""""""""
The project FHIR API is available at both project and resource level. You will need the FHIR endpoint when you want to use a FHIR client to read or add and update resources to your Simplifier project. For example, the Vonk FHIR server supports the import of resources from Simplifier by supporting a (manual) import operation and specification of the project's endpoint and authentication in the appsettings.

On the project page, you can retrieve the FHIR endpoint of your project.

.. image:: ./images/ProjectEndpoint.PNG 

On the resource page, you can retrieve the FHIR endpoint of your resource. You will need this endpoint to find your resource when using a FHIR client.

.. image:: ./images/ResourceEndpoint.PNG 

Project ZIP API
"""""""""""""""
The project ZIP API is available at project level. You can use the ZIP endpoint for synchronization. With an HTTP tool you can use GET or PUT https://api.simplifier.net/<project>/zip to retrieve or update your project in zipped form.

.. image:: ./images/ProjectZipApi.png

JWT authentication
------------------
The ZIP endpoint is available for Simplifier users based on JWT authentication. 

First retrieve a JWT token from Simplifier. This works with a POST at https://api.simplifier.net/token with your account details in the message body in JSON format. Header should be Content-Type: application/json

::
  
  POST https://api.simplifier.net/token 
  
  Header:
  Content-Type: application/json

  Body:
    {
       "Email": "youremail@example.com",
       "Password": "your password"
    }
    
Donwloading or uploading your project works with a GET or a PUT at https://api.simplifier.net/<project>/zip with a authorization header that includes your retrieved token as shown below. The token is valid for 8 hours.

::
  
  GET https://api.simplifier.net/<yourproject>/zip
  
  Header:
  Authorization: Bearer <access_token> 

Simplifier FHIR API
"""""""""""""""""""
Using the global Simplifier FHIR API, users can search for all resources in Simplifier. For example, the request ``GET https//stu3.simplifier.net/open/Patient`` can be used to retrieve all (STU3) Patient resources from Simplifier. The global Simplifier endpoint of your resource is available at the resource page. Using the global endpoint resources have a globally unique GUID here.

.. image:: ./images/ResourceGlobalEndpoint.PNG
