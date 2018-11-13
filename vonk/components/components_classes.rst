.. _components_classes:

Important classes and interfaces
================================

If you want to develop a plugin for Vonk FHIR Server, there are a couple of classes that you will probably interact with. This page lists those classes, with an explanation of each.

IVonkContext
------------

:namespace: Vonk.Core.Context.Features

:purpose: IVonkContext is the Vonk-specific counterpart to HttpContext from ASP.NET Core. It contains an IVonkRequest and IVonkResponse object that allow you to get information from the request and set results in the response, both in Vonk terms.  

Have ``IVonkContext`` injected in the method where you need it. Use a `configuration class <vonk_components_configclass>`_ to call this method from the pipeline and have the actual context injected. 

.. code-block:: csharp

   public class SomeService
   {
      public async Task DoMyOperation(IVonkContext vonkContext)
      {
         //...
      }
   }

   public static class SomeServiceConfiguration
   {
      public static IApplicationBuilder UseMyOperation(this IApplicationBuilder app)
      {
         return app.UseVonkInteractionAsync<SomeService>((svc, context) => svc.DoMyOperation(context));
      }
   }

If you also need access to the raw ``HttpContext``, you can create a normal ASP.NET Core Middleware class and access the IVonkContext with the extension method ``Vonk()`` on ``HttpRequest``.

.. code-block:: csharp

   public class SomeMiddleware
   {
      public SomeMiddleware(RequestDelegate next)
      {
         //...
      }

      public async Task Invoke(HttpContext httpContext)
      {
         var vonkContext = httpContext.Vonk();
         //...
      }
   }

   public static class SomeMiddlewareConfiguration
   {
      public static IApplicationBuilder UseSomeMiddleware(this IApplicationBuilder app)
      {
         return app.UseMiddleware<SomeMiddleware>(); //Just plain ASP.NET Core, nothing Vonk specific here.
      }
   }

IVonkContext has three major parts, that are explained below:

.. code-block:: csharp

   public interface IVonkContext
   {
      IVonkRequest Request {get;}

      IArgumentCollection: Arguments{get;}

      IVonkResponse Response {get;}
   }

And because you frequently need the parts instead of the context itself, there is an extension method on ``IVonkContext``:

.. code-block:: csharp

   public (IVonkRequest request, IArgumentCollection args, IVonkResponse respons) Parts(this IVonkContext vonkContext)

IVonkRequest
------------

:namespace: Vonk.Core.Context.Features

:purpose: Get information about the request made, in Vonk / FHIR terms.

You can access the current ``IVonkRequest`` through the `IVonkContext`_. Its properties are:

.. code-block:: csharp

   public interface IVonkRequest
   {
      string Path { get; }
      string Method { get; }
      string CustomOperation { get; }
      VonkInteraction Interaction { get; }
      RequestPayload Payload { get; }
   }

``Path`` and ``Method`` relate directly to the equivalents on HttpContext. ``Interaction`` tells you which of the FHIR RESTful interactions was called. ``CustomOperation`` is only filled if one of the custom operations was invoked, like e.g. ``$validate``. All of these can be filtered by the `InteractionHandlerAttribute`_, so you typically don't need to inspect them manually.

Payload indirectly contains the resource that was sent in the body of the request. You are advised to only use the extension methods to access it:

.. code-block:: csharp

   public static bool TryGetPayload(this IVonkRequest request, out IResource resource)

TryGetPayload is useful if your code wants to act on the payload *if it is present*, but does not care if it is not.

.. code-block:: csharp

   public void ThisMethodActsOnThePayloadIfPresent(IVonkContext vonkContext)
   {
      var (request, args, response) = vonkContext.Parts();
      if (request.TryGetPayload(response, out var resource))
      {
         // do something with the resource.
      }

   }

.. code-block:: csharp

   public static bool GetRequiredPayload(this IVonkRequest request, IVonkResponse response, out IResource resource)

GetRequiredPayload is useful if your code expects the payload to be present. It will set the appropriate response code and OperationOutcome on the provided response if it is not present or could not be parsed. Then you can choose to end the pipeline and thus return the error to the user.

.. code-block:: csharp

   public void ThisMethodNeedsAPayload(IVonkContext vonkContext)
   {
      var (request, args, response) = vonkContext.Parts();
      if (!request.GetRequiredPayload(response, out var resource))
      {
         return; //If you return with an error code in the response, Vonk will end the pipeline
      }
      // do something with the resource.
   }


IArgumentCollection, IArgument
------------------------------

:namespace: Vonk.Core.Context.Features

:purpose: Access arguments provided in the request.

The ``IVonkContext.Arguments`` property contains all the arguments from the request, from the various places:

#. The path segments: /Patient/123/_history/v1 will translate to three arguments, _type, _id and _version.
#. The query parameters: ?name=Fred&active=true will translate to two arguments, identifier and active.
#. The headers: 
   
   #.   If-None-Exists = identifier=abc&active=true will translate to two arguments, identifier and active.   
   #.   If-Modified-Since, If-None-Match, If-Match: will each translate to one argument
        
An individual argument will tell you its name (``ArgumentName``), raw value (``ArgumentValue``) and where it came from (``Source``).

Handling arguments
^^^^^^^^^^^^^^^^^^

An argument by default has a ``Status`` of ``Unhandled``.

If an argument is of interest to the operation you implement in your plugin, you can handle the argument. It is important to mark arguments handled if:

* you handled them
* or the handling is not relevant anymore because of some error you encountered
  
In both cases you simply set the ``Status`` to ``Handled``. 

If an argument is incorrect, you can set its status to ``Error`` and set the ``Issue`` to report to the client what the problem was. These issues will be accumulated in the response by Vonk automatically.

Any argument that is not handled will automatically be reported as such in an OperationOutcome.

Useful extension methods:

.. code-block:: csharp

   IArgument.Handled()
   IArgument.Warning(string message, Issue issue)
   IArgument.Error(string message, Issue issue)

Vonk has a lot of issues predefined in ``Vonk.Core.Support.VonkIssues``.

IVonkResponse
-------------

:namespace: Vonk.Core.Context.Features

:purpose: Inspect response values set by other middleware, or set it yourself.

.. code-block:: csharp

   public interface IVonkResponse
   {
      Dictionary<VonkResultHeader, string> Headers { get; }
      int HttpResult { get; set; }
      OperationOutcome Outcome { get; }
      IResource Payload { get; set; }
   }

If your operation provides a response, you should:

#. Set the response code ``HttpResult``.
#. Provide a resource in the ``Payload``, if applicable.
#. Add an issue if something is wrong.

If you just listen in on the pipeline, you can check the values of the response. Besides that, the `InteractionHandlerAttribute`_ allows you to filter on the ``HttpStatus`` of the response.

InteractionHandlerAttribute
---------------------------

:namespace: Vonk.Core.Pluggability

:purpose: Add an ``[InteractionHandler]`` attribute to a method to specify when the method has to be called. You specify this by providing values that the IVonkContext should match.

Without any arguments, the method will be called for every possible interaction.

.. code-block:: csharp

   [InteractionHandler()]
   public async Task DoMyOperation(IVonkContext vonkContext)

You can specify different filters, and combine them at will:

* Specific interaction(s): ``[InteractionHandler(Interaction = VonkInteraction.type_create | VonkInteraction.instance_update)]``
* Specific resource type(s): ``[InteractionHandler(AcceptedTypes = new["Patient", "Observation"])]``
* Specific custom operation: ``[InteractionHandler(Interaction = VonkInteraction.all_custom, CustomOperation = "myCustomOperation")]``. Note that the ``$`` that is used on the url is not included in the name of the custom operation here.
* Specific http method: ``[InteractionHandler(Method = "POST")]``
* Specific statuscode(s) on the response: ``[InteractionHandler(StatusCode = new[]{200, 201})]``

Because ``InteractionHandler`` is an attribute, you can only use constant values. If that is not what you want, you can use the fluent interface in the `configuration class <vonk_components_configclass>`_ instead. The code below shows the same filters as above, although you typically would not use all of them together (e.g. the ``PUT`` excludes ``type_create``).

.. code-block:: csharp

   public static class MyOperationConfiguration
   {
      public static IApplicationBuilder UseMyOperation(this IApplicationBuilder app)
      {
         return app
            .OnInteraction(VonkInteraction.type_create | VonkInteraction.instance_update)
            .AndResourceTypes(new[] {"Patient", "Observation"})
            .AndStatusCodes(new[] {200, 201})
            .AndMethod("PUT")
            .HandleAsyncWith<MyService>((svc, ctx) => svc.DoMyOperation(ctx));
      }
   }

Other ``Handle...`` methods allow you to define a pre-handler (that checks or alters the request before the actual operation) or a post-handler (that checks or alters the response after the actual operation), either synchronously or asynchronously.

If you have a very specific filter that is not covered by these methods, you can specify it directly with a function on the ``IVonkContext`` that returns a boolean whether or not to call your operation.

.. code-block:: csharp

   app
      .On(ctx => MyVerySpecificFilter(ctx))
      .Handle...

.. attention::

   The filter you specify is called for **every** request. So make sure you don't do any heavy calculations or I/O.
