.. _authentication:

========================
Access control and SMART
========================
Concepts
--------
This explanation of access control and SMART in Vonk requires basic understanding of the :ref:`architecture <architecture>` of Vonk, so you know what is meant by middleware components and repository interfaces.
It also presumes general knowledge about authentication and OAuth2.

Access control generally consists of the following parts, which will be addressed one by one:

- Identification: Who are you? - usually a user name, login, or some identifier.
- Authentication: Proof your identification - usually with a password, a certificate or some other (combination of) secret(s) owned by you.
- Authorization: What are you allowed to read or change based on your identification?
- Access Control Engine: Enforce the authorization in the context of a specific request.

Identification and Authentication
---------------------------------
Vonk does not authenticate users itself. It is meant to be used in an `OAuth2`_ environment in which an `OAuth2 provider`_ is responsible for the identification and authentication of users. 
Typically, a user first enters a Web Application, e.g. a patient portal, or a mobile app. That application interactively redirects the user to the OAuth2 provider to authenticate, and receives an OAuth2 token back.
Then, the application can do an http request to Vonk to send or receive resource(s), and provide the OAuth2 token in the http Authentication header, thereby acting on behalf of the user.
Vonk can then read the OAuth2 token and validate it with the OAuth2 provider. This functionality is not FHIR specific.

Authorization
-------------
Authorization in Vonk is by default based on `SMART on FHIR`_ and more specifically the `Scopes and Launch Context`_ defined by it. SMART specifies several claims that can be present in the OAuth2 token and their meaning.
The assignment of claims to users, systems or groups is managed in the OAuth2 provider and not in Vonk.

Access Control Engine
---------------------
The Vonk ``SmartContextMiddleware`` component extracts the claims defined by SMART on FHIR from the OAuth2 token.
This information can then be used by interaction handling middleware to enforce the scope and/or launch context.

The ``SmartAuthorizationService`` is the service that provides this information. It can authorize a request based on the provided scope, e.g. patient/Patient.read or user/Encounter.write. 
This is access control on the level of the type of data access (read / write) and the type of resource (Patient / Organization / ...).

If you need to authorize on an instance level - e.g. a user is allowed to see only a specific Patient or Encounter -, the ``SmartAuthorizationService`` can translate the authorization information to additional search arguments. 
The default interaction handlers of Vonk apply these extra arguments to every interaction involving the database, so that a user can never see information outside of the allowed context.
If you have your own implementation of the repository interfaces - in a Vonk FHIR Facade solution - you can also use these additional search arguments to filter the data in your backend system. 

SMART on FHIR defines launch contexts for Patient, Encounter and Location, extendible with others if needed. 
If a request is done with a Patient launch context, and the user is allowed to see other resource types as well, these other resource types are restricted by the `Patient compartment`_.

Other forms of Authentication
-----------------------------
If you build your own server with Vonk FHIR Components you can add other middleware to provide authentication in a form that suits your needs. 
One example could be that you want to integrate Vonk FHIR Components into an ASP.NET Core web application that already uses `ASP.NET Core Identity`_. 
Then you don't need the OAuth2 middleware, but instead can use the Identity framework to authenticate your users.

Other forms of Authorization
----------------------------
The ``SmartAuthorizationService`` is an implementation of the ``IAuthorizationService`` interface. 
If your environment requires other authorization information than the standard SMART on FHIR claims, you can create your own implementation of this interface. 
All the standard interaction middleware components of Vonk can then use that implementation to enforce access control. 

Status
------
The ``IAuthorizationService`` interface and its SMART based implementation are still in alpha phase and therefore volatile. 
The SMART Scopes are fully evaluated, and the Patient launch context is currently supported. 
The other standard launch contexts (Encounter, Location) will be added later on. 
Using this functionality requires the setup of an OAuth2 provider and a web frontend application that will interactively route the user to the OAuth2 provider and then access Vonk on behalf of that user.
Because of the volatile status and the complex setup of the environment, the SMART on FHIR authorization component is not in the public beta version of the Vonk FHIR Server.
If you want to use this functionality in your organization, please :ref:`contact <contact>` us so we can provide guidance and process your feedback in the next implementation.

.. _OAuth2: https://oauth.net/2/
.. _OAuth2 provider: https://en.wikipedia.org/wiki/List_of_OAuth_providers
.. _SMART on FHIR: http://docs.smarthealthit.org/
.. _Scopes and Launch Context: http://docs.smarthealthit.org/authorization/scopes-and-launch-context/
.. _Patient compartment: http://www.hl7.org/implement/standards/fhir/compartmentdefinition-patient.html
.. _ASP.NET Core Identity: https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity