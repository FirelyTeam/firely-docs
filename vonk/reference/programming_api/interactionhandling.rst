.. _vonk_reference_api_interactionhandling:

Interaction Handling
====================

In the configuration of a plugin you specify on which interaction(s) the plugin should act. That can be done with an attribute on the main method of the service in the plugin, or with a fluent interface on IApplicationBuilder.

.. _vonk_reference_api_interactionhandlerattribute:

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
* Specific FHIR version(s) of the request: ``[InteractionHandler(InformationModel = VonkConstants.Model.FhirR4)]``
* Specific resource type(s): ``[InteractionHandler(AcceptedTypes = new["Patient", "Observation"])]``
* Specific custom operation: ``[InteractionHandler(Interaction = VonkInteraction.all_custom, CustomOperation = "myCustomOperation")]``. Note that the ``$`` that is used on the url is not included in the name of the custom operation here.
* Specific http method: ``[InteractionHandler(Method = "POST")]``
* Specific statuscode(s) on the response: ``[InteractionHandler(StatusCode = new[]{200, 201})]``

Now to configure your service to be a processor in the Vonk pipeline, you use ``UseVonkInteraction[Async]()``:

.. code-block:: csharp

   public static class MyOperationConfiguration
   {
      public static IApplicationBuilder UseMyOperation(this IApplicationBuilder app)
      {
         return app.UseVonkInteractionAsync<MyService>((svc, ctx) => svc.DoMyOperation(ctx));
      }
   }

.. _vonk_reference_api_interactionhandlerfluent:

InteractionHandler fluent interface
-----------------------------------

Because ``InteractionHandler`` is an attribute, you can only use constant values. If that is not what you want, you can use the fluent interface in the `configuration class <vonk_plugins_configclass>`_ instead. The code below shows the same filters as above, although you typically would not use all of them together (e.g. the ``PUT`` excludes ``type_create``).

.. code-block:: csharp

   public static class MyOperationConfiguration
   {
      public static IApplicationBuilder UseMyOperation(this IApplicationBuilder app)
      {
         return app
            .OnInteraction(VonkInteraction.type_create | VonkInteraction.instance_update)
            .AndInformationModel(VonkConstants.Model.FhirR4)
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
