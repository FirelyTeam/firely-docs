.. _request-response:

Message Handlers
-------------------------
The FhirClient provides you an option to add ``HttpMessageHandlers``, which you can use to hook
into the request/response cycle. With these handlers you can implement
extra code to be executed right before a request is sent, or directly after
a response has been received.

Adding extra headers
^^^^^^^^^^^^^^^^^^^^
It could be necessary to add extra headers to the requests your FhirClient
sends out, for example when you want to send an authorization token with your
request. Or perhaps you need other code to be executed each time the FhirClient
sends a request. This can be achieved by implementing your own message handler, for example an AuthorizationMessageHandler:

.. code:: csharp

	public class AuthorizationMessageHandler : HttpClientHandler
   	{
        	public System.Net.Http.Headers.AuthenticationHeaderValue Authorization { get; set; }        	
		protected async override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        	{
            		if (Authorization != null)
                		request.Headers.Authorization = Authorization;
            		return await base.SendAsync(request, cancellationToken);
        	}
    	}

and add that to the ``FhirClient``:

.. code:: csharp

	 var handler = new AuthorizationMessageHandler();
	 var bearerToken = "AbCdEf123456" //example-token;
	 handler.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);
	 var client = new FhirClient(handler);
	 client.Read<Patient>("example");


Chaining Multiple MessageHandlers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
You can chain multiple ``HttpMessageHandlers`` as well to combine their functionality in a single FhirClient. You can do this using 
``DeligateHandlers``. DelegatingHandler is a handler that is designed to be chained with another handler, effectively forming a pipeline through which requests and responses will pass.
Each handler has a chance to examine and/or modify the request before passing it to the next handler in the chain, and to examine and/or modify the response it receives from the next handler. 
Typically, the last handler in the pipeline is the ``HttpClientHandler``, which communicates directly with the network.

For example, next to a AuthorizationMessageHandler, you might want to use both and a LoggingHandler:

.. code:: csharp

	public class LoggingHandler : DelegatingHandler
	{
		private readonly ILogger _logger;

		public LoggingHandler(ILogger logger)
		{
			_logger = logger;
		}

		protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
		{
			_logger.Trace($"Request: {request}");
			try
			{
				// base.SendAsync calls the inner handler
				var response = await base.SendAsync(request, cancellationToken);
				_logger.Trace($"Response: {response}");
				return response;
			}
			catch (Exception ex)
			{
				_logger.Error($"Failed to get response: {ex}");
				throw;
			}
		}
	}

source: https://thomaslevesque.com/2016/12/08/fun-with-the-httpclient-pipeline/

If you want to combine this with the AuthorizationMessageHandler from the previous section, you can add that to the LoggingHandler as an ``InnerHeader``, because the LoggingHandler implements ``DelegatingHandler``.
Like this:

.. code:: csharp

	var authHandler = new AuthorizationMessageHandler();
	var loggingHandler = new LoggingHandler()
	{
		InnerHandler = authHandler
	};
	var client = new FhirClient("http://vonk.fire.ly", FhirClientSettings.CreateDefault(), loggingHandler);


This puts the AuthorizationMessageHandler inside the LoggingHandler, which is added to the client. Resulting in that both handlers form a pipeline through which requests and responses will pass.



OnBeforeRequest and OnAfterResponse
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To make use ``OnBeforeRequest`` and ``OnAfterResponse`` features that were on the previous implementation of the FhirClient, you can use the pre-defined ``HttpClientEventHandler``.
Use the ``OnBeforeRequest`` to add extra code before a request is executed by the FhirClient, and the ``OnAfterResponse`` event to add extra code that needs to be executed every time a response is received by the FhirClient:

.. code:: csharp

 	using (var handler = new HttpClientEventHandler())
	{
		using (FhirClient client = new FhirClient(testEndpoint, messageHandler: handler))
        	{
	  		handler.OnBeforeRequest += (sender, e) =>
			{                    
				e.RawRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "Your Oauth token");
			};

			handler.OnAfterResponse += (sender, e) =>
			{                    
				Console.WriteLine("Received response with status: " + e.RawResponse.StatusCode);
			};
		}
	}
