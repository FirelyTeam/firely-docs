.. _simpl_endpoint:

Endpoint
^^^^^^^^
The endpoint of a project or resource can be used to either search for resources in Simplifier or to read, search, add and update resources in a FHIR client. System wide searches and history searches are also supported. To retrieve the endpoint of a project or resource in Simplifier click on ``API`` in the top right menu when visiting either the project or resource page.

Project FHIR API
""""""""""""""""
The project FHIR API is available at both project and resource level. You will need the FHIR endpoint when you want to use a FHIR client to read or add and update resources to your Simplifier project. For example, the Vonk FHIR server supports the import of resources from Simplifier by supporting a (manual) import operation and specification of the project's endpoint and authentication in the appsettings.

On the project page, you can retrieve the FHIR endpoint of your project.

.. image:: ./images/ProjectEndpoint.PNG 

On the resource page, you can retrieve the FHIR endpoint of your resource. You will need this endpoint to find your resource when using a FHIR client.

.. image:: ./images/ResourceEndpoint.PNG 

Project ZIP API
"""""""""""""""
The project ZIP API is available at project level. You can use the ZIP endpoint for synchronization. With an HTTP tool you can use GET or PUT https://simplifier.net/yourproject/api/zip to retrieve or update your project in zipped form.

.. image:: ./images/ProjectZIPEndpoint.PNG 

Simplifier FHIR API
"""""""""""""""""""
Using the global Simplifier FHIR API, users can search for all resources in Simplifier. For example, the request ``GET https//stu3.simplifier.net/open/Patient`` can be used to retrieve all (STU3) Patient resources from Simplifier. The global Simplifier endpoint of your resource is available at the resource page. Using the global endpoint resources have a globally unique GUID here.

.. image:: ./images/ResourceGlobalEndpoint.PNG
