.. _request-response:

Looking at LastResult
---------------------
After the FhirClient has received a response from the server, you
will usually work with the resource instance that was returned.
But if you have set the ``ReturnFullResource`` option to ``false``,
the server will not return a resource on ``Create`` and ``Update``
interactions. If you still need to check the response from the
server, for example to lookup the technical id or version id the
server has assigned to your resource instance, you can do this by
looking at the ``LastResult`` property of the FhirClient.

.. code:: csharp

	client.Create(pat);

	if (client.LastResult.Status == "201")
	{
		Console.WriteLine("The location for the resource is: " + client.LastResult.Location);
	}


-----------

FhirClient event handlers
-------------------------
The FhirClient provides you with two event handlers, which you can use to hook
into the request/response cycle. With these handlers you can implement
extra code to be executed right before a request is sent, or directly after
a response has been received.

Adding extra headers
^^^^^^^^^^^^^^^^^^^^
It could be necessary to add extra headers to the requests your FhirClient
sends out, for example when you want to send an authorization token with your
request. Or perhaps you need other code to be executed each time the FhirClient
sends a request. You can use the ``OnBeforeRequest`` event in these cases, this can be done by adding a ``HttpClientEventHandler`` as parameter to the FhirClient:

.. code:: csharp

 	using (var handler = new HttpClientEventHandler())
	{
		using (FhirClient client = new FhirClient(testEndpoint, messageHandler: handler))
        	{
	  		handler.OnBeforeRequest += (sender, e) =>
			{                    
				e.RawRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "Your Oauth token");
			};
		}
	}
	
Extra code after response
^^^^^^^^^^^^^^^^^^^^^^^^^
The ``OnAfterResponse`` event can be used to add extra code that needs to
be executed every time a response is received by the FhirClient:

.. code:: csharp

	using (var handler = new HttpClientEventHandler())
	{
		using (FhirClient client = new FhirClient(testEndpoint, messageHandler: handler))
       		{
			handler.OnAfterResponse += (sender, e) =>
			{                    
				Console.WriteLine("Received response with status: " + e.RawResponse.StatusCode);
			};
		}
	}
