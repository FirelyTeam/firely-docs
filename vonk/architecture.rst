.. _architecture:

============
Architecture
============
Pipeline and middleware components
----------------------------------
Vonk is built upon ASP.NET Core and its modular setup of a pipeline of middleware_.
It also leverages the `dependency injection`_ pattern that is central to ASP.NET Core.
If you are not familiar with these concepts, please review them first.

Vonk FHIR Components are pieces of middleware that handle the interactions of the `FHIR RESTful API`_. These components are placed in the pipeline. 
The pipeline starts with a few general components that interpret the incoming http request and determine which interaction is being called. 
This information is fed to the rest of the pipeline as the Request property of an IVonkContext object, analogous to the HttpContext and its Request property of ASP.NET Core itself.
The IVonkContext also provides the Response property that is used to communicate the status, resource and/or OperationOutcome resulting from the interaction.
On the way back through the pipeline the counterparts of the interpreting middleware translates the IVonkContext Response back to an http response, conforming to the FHIR specification.
The rest of the pipeline consists of middleware components that each fulfill one of the interactions. So there is one for ``read``, one for ``create``, for ``search`` et cetera. 
These components are just regular ASP.Net Core Middleware components, except that they have access to the IVonkContext, and act on that. 

Adding custom middleware
^^^^^^^^^^^^^^^^^^^^^^^^
Using Vonk FHIR Components you can add your own middleware anywhere in the pipeline. It can be standard ASP.NET Core middleware - having nothing to do with FHIR - or middleware acting on the IVonkContext,
e.g. to implement a custom operation. Vonk also provides convenience methods to register your middleware as one that handles a FHIR interaction, 
including attributes to declare for which interaction and which resource types your middleware should be invoked. 

Repository interfaces
---------------------
Many of the FHIR interactions require access to a repository of resources. E.g. ``create`` must be able to store a resource, whereas ``search`` must be able to query resources and retrieve the results.
In Vonk, the middleware components that implement these interactions access the repository through interfaces. There are four different interfaces for different parts of the `FHIR RESTful API`_.

.. code-block:: csharp 

    IResourceReadRepository     //for read and vread
    IResourceChangeRepository   //for create and update
    ISearchRepository           //for all types of search
    IHistoryRepository          //for system -, type -, and instance history.

In many scenarios, a custom implementation does not need to implement all the interactions. For example, many implementations will be read-only. 
That is why these functionalities are split into the interfaces. You only need to implement the ones you actually support.

These interfaces enable you to implement a Vonk FHIR Facade. And they enable us to support database engines as diverse as MongoDB, SQL Server and in-memory.

Search
^^^^^^
The `FHIR RESTful Search`_ is the most complicated part of the `FHIR RESTful API`_. Vonk is capable of interpreting the search and translating it to small query-bits irrespective of the actual repository implementation.
When implementing the ``ISearchRepository`` you get full control over which parameters you support and how you support them. 
On the method ``ISearchRepository.Search()``, you just get the list of arguments that make up the search, as an ``IArgumentCollection``. If you decide to act on these raw arguments directly, you can.
But if you want Vonk to interpret the search, you can use the ``QueryBuilderContext.CreateQuery`` method that will decompose the IArgumentCollection, interpret and validate every argument in it and then call into the 
``IRepoQueryFactory.Filter`` or ``IRepoQueryFactory.ResultShape`` method for each of the arguments.

So the ``Filter`` method is called with interpreted search arguments. E.g. ``identifier=abc`` will be provided as (in pseudocode) ``Filter("identifier", TokenValue{code = "abc", noSystem = true})``.
If no search parameter is defined for an argument, you still get the change to handle it. E.g. ``myspecialparameter=qyz`` will be provided as ``Filter("myspecialparameter", RawValue{ value = "qyz" })``. 
This allows for easy extensibility without defining your own SearchParameter resources, and is suitable for adding parameters that map to non-FHIR structures in your backend system.

The ``ResultShape`` method is called when an argument is recognized as a '`Search result parameter`_', like _sort or _include.

Capabilities
------------
A FHIR server has to express its capabilities in a CapabilityStatement, available on the ``/metadata`` endpoint. Vonk's capabilities are defined by the middleware components that make up its pipeline. 
Every component knows what interaction it adds to the capabilities. Therefore, we keep that information close to the component itself. 
Typically, every component has an implementation of :code:`IConformanceContributor`, in which it gets access to the :code:`IConformanceBuilder`. 
The latter provides methods to add information to the CapabilityStatement without having to worry about what is already added by other components or the order of execution.

Current status
--------------
Currently we have implemented three different generic repository implementations and two different facades to existing systems. This has given us a fairly good idea of the strengths and weaknesses of this architecture and its interfaces.
However, as we continue to expand on generic implementations (PostgreSQL, DocumentDB or MySQL are just some of the ideas) and guide more facade implementations we will further strengthen the interfaces and support methods.
So they will still change over time. And we don't want to break your implementation on every update. Therefore the Vonk FHIR Components are not yet made publicly available on NuGet.

If you want to use the Vonk FHIR Components or Facade already, please :ref:`contact <contact>` us. We can then provide you with the necessary NuGet packages along with personal guidance to help you succeed with your implementation.
Also, we can then make sure that your implementation gets updated upon changes to the architecture or the interfaces. 
And we will learn from your requirements and adapt Vonk where needed.

When the Vonk FHIR Components are made publicly available on NuGet we will also extend this documentation.

.. _middleware: https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware
.. _dependency injection: https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection
.. _FHIR RESTful API: http://www.hl7.org/implement/standards/fhir/http.html
.. _FHIR RESTful Search: http://www.hl7.org/implement/standards/fhir/search.html
.. _Search result parameter: http://www.hl7.org/implement/standards/fhir/search.html#2.21.1.1