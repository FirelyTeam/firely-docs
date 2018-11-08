.. _feature_accesscontrol_postman:

Access Control Tokens with Postman
==================================

You can use Postman to get a JWT Token from the IdentityServer, and use that in a subsequent request to your local Vonk instance.

#. Make sure IdentityServer is running (see :ref:`feature_accesscontrol_idprovider`), I assume at http://localhost:5100
#. Open Postman Settings (menu: File | Settings) and turn ssl certificate validation off, otherwise your self-signed certificate will not be accepted.

      .. image:: ../images/ac_postman_certificateverificationoff.png

#. Open a request in Postman, let's say GET /Patient
#. Verify that you get a 401 (smile)
#. Go to the Headers tab and make sure there is no Authorization header (if there is, it might have an outdated token, and you don't want that)
#. Go to the Authorization tab, that looks like this:

   .. image:: ../images/ac_postman_auth_tab.png

#. In the 'Type' dropdown choose OAuth2 (SMART uses OpenIdConnect, which is a specialization of OAuth2)
#. In the 'Add authorization data to' dropdown choose 'Request headers' (probably preselected)
#. Click Get New Access Token, and in the popup window fill in the blanks:

   .. image:: ../images/ac_postman_request_token_https.png

#. You can alter the values in 'Scope' to get other claims in the token.
#. Click Request Token and you'll be presented with the login screen of IdentityServer:

   .. image:: ../images/ac_postman_login.png

#. Log in as Bob or Alice and you'll be presented with the grant screen of IdentityServer. It will ask you whether Postman may have the claims you requested in the 'Scope' field.

   .. image:: ../images/ac_postman_grant.png

#. Click 'Allow' and you return to Postman with the newly retrieved token:

   .. image:: ../images/ac_postman_managetokens.png

#. You can copy the value of the access token and paste it into `JWT.io <http://jwt.io>`_. It will show you the contents of the token.
#. Scroll down and click 'Use Token':

   .. image:: ../images/ac_postman_usetoken.png

#. The token will be added as Authorization header to the request.
#. Issue the original request again. Provided there is a Patient with the identifier of Bob or Alice (or whomever you chose), it will be in the search results.

