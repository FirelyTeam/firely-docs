.. _feature_accesscontrol_idprovider:

===========================
Set up an Identity Provider
===========================

About Identity Providers and Vonk
---------------------------------

In order to use :ref:`feature_accesscontrol` you need an Identity Provider that can provide OAuth2 JWT Tokens with claims that conform to :ref:`SMART on FHIR`. In a production scenario you typically already have such a provider. It could be the EHR system, the Active Directory or a provider set up specifically for let's say a Patient Portal. It is also very well possible that the provider handing the correct claims uses a federated OAuth2 provider to do the authentication.

Set up for testing
------------------

To allow you to test :ref:`feature_accesscontrol` we provide you with instructions to set up an Identity Provider in which you can configure the neccessary clients, claims and users yourself to test different scenarios. The instructions are based on the excellent `IdentityServer4 project on GitHub <https://github.com/IdentityServer/IdentityServer4>`_ by Dominick Baier and Brock Allen. It requires a bit of programming: you will customize an existing example and compile and run it. This is all in Microsoft .NET Core.

#. Clone the project `Vonk.IdentityServer.Test from GitHub <https://github.com/furore-fhir/Vonk.IdentityServer.Test>`_
#. Run the Powershell script .\scripts\GenerateSSLCertificate.ps1
   This will generate an SSL Certificate in .\Vonk.IdentityServer.Test\ssl_cert.pfx, with the password 'cert-password'. This is preconfigured in Program.cs.
#. Open the solution Vonk.IdentityServer.Test.sln in Visual Studio
#. Build the solution
#. Run the Vonk.IdentityServer.Test project
#. Visual Studio should automatically open http://localhost:5100 in your browser.

   You should see a page like this.

   .. image:: \vonk\images\ac_identityprovider_startup.png

#. Also try https://localhost:5101 for the https connection. Your browser will ask you to make a security exception for the self-signed certificate. 
#. Get the openid connect configuration at http://localhost:5000/.well-known/openid-configuration.
   You can see all the available scopes in this document.

Configuration
-------------

The Identity Server is preconfigured with two users and one client:

Client
^^^^^^

:ClientId: Postman
:Secret: secret
:Redirect Uri: https://www.getpostman.com/oauth2/callback

This client is allowed to request any of the available scopes. 

It is called Postman, since many users use the Postman REST client to test FHIR Servers. If you use another client, you can still use it as the ClientId, or alter the values in Config.cs.

Users
^^^^^

Alice
~~~~~

:UserName: Alice
:Password: password
:Launch context: patient=alice-identifier

Bob
~~~

:UserName: Bob
:Password: password
:Launch context: patient=bob-identifier

You can add or alter users in Config.cs.

.. _feature_accesscontrol_postman:

Usage from Postman
------------------

You can use Postman to get a JWT Token from the IdentityServer, and use that in a subsequent request to your local Vonk instance.

#. Make sure IdentityServer is running (see above), I assume at http://localhost:5100
#. Open Postman Settings (menu: File | Settings) and turn ssl certificate validation off, otherwise your self-signed certificate will not be accepted.

      .. image:: \vonk\images\ac_postman_certificateverificationoff.png

#. Open a request in Postman, let's say GET /Patient
#. Verify that you get a 401 (smile)
#. Go to the Headers tab and make sure there is no Authorization header (if there is it might have an outdated token, and you don't want that)
#. Go to the Autorization tab, that looks like this:

   .. image:: \vonk\images\ac_postman_auth_tab.png

#. In the 'Type' dropdown choose OAuth2 (SMART uses OpenIdConnect, which is a specialization of OAuth2)
#. In the 'Add authorization data to' dropdown choose 'Request headers' (probably preselected)
#. Click Get New Access Token, and in the popup window fill in the blanks:

   .. image:: \vonk\images\ac_postman_request_token.png

#. You can alter the values in 'Scope' to get other claims in the token.
#. Click Request Token and you'll be presented with the login screen of IdentityServer:

   .. image:: \vonk\images\ac_postman_login.png

#. Log in as Bob or Alice and you'll be presentede with the grant screen of IdentityServer. It will ask you whether Postman may have the claims you requested in the 'Scope' field.

   .. image:: \vonk\images\ac_postman_grant.png

#. Click 'Allow' and you return to Postman with the newly retrieved token:

   .. image:: \vonk\images\ac_postman_managetokens.png

#. You can copy the value of the access token and paste it into `JWT.io <http://jwt.io>`_. It will show you the contents of the token.
#. Scroll down and click 'Use Token':

   .. image:: \vonk\images\ac_postman_usetoken.png

#. The token will be added as Authorization header to the request.
#. Issue the original request again. Provided there is a Patient with the identifier of Bob or Alice (whomever you chose), it will be in the search results.

.. note:: In theory you should be able to use the https port of IdentityServer as well, but while creating this documentation that did not seem to work from Postman.

