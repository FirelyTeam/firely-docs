.. _request-response:

Looking at LastResponse
-----------------------
After the FhirClient has received a response from the server, you
will usually work with the resource instance that was returned.
But if you have set the ``ReturnFullResource`` option to ``false``,
the server will not return a resource on ``Create`` and ``Update``
interactions. If you still need to check the response from the
server, for example to lookup the technical id or version id the
server has assigned to your resource instance, you can do this by
looking at the ``LastResponse`` property of the FhirClient.



-----------

Adding extra headers
--------------------