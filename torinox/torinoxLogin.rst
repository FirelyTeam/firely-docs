Login with Torinox into Simplifier 
==================================
Several api endpoints in Simplifier require you to login first.
By logging in th Torinox FHIR command line tool gives you access to most of these endpoints:

- packages api
- zip upload and download api
- fhir endpoint
- writing (post and put) to private fhir endpoinds

In order to login with Torinox use the `login`_ command:
::
  > fhir login

After this you must provide your credentials: email address and password. Login uses standard JWT practices so that your 
credentials are sent safely over the wire only once and so that sequentual requests are done with a token, so that your 
credentials don't have to be stored locally either.

