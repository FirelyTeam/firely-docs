.. _errorhandling:

===============
Handling errors
===============

It is pretty common to encounter errors while parsing (external) FHIR data - in fact so common that the .NET API does not consider them true Exceptions but 
instead employs streaming error reporting for the parser classes. With streaming error reporting, you can subscribe to errors occuring in these components
by installing a callback. When an error is encountered while parsing, this callback will be called with details about the error. There are several advantages to this approach:

* Since errors are common, we avoid the cost of raising a true .NET exception and the associated unwrapping of the stack.
* The parser will report errors as you navigate through the instance. This also means you can stop or halt wherever it fits your usecase.
* You are not limited to processing just the first error. As long as you continue navigating the instance, parsing will continue.

All components in the API (there are a few in addition to the parsers) that support streaming error reporting implement the ``IExceptionSource`` interface. It has a single property ``ExceptionHandler``, which is a .NET delegate:

.. code-block:: csharp

    public delegate void ExceptionNotificationHandler(object source, ExceptionNotification args);

    public interface IExceptionSource
    {
        ExceptionNotificationHandler ExceptionHandler { get; set; }
    }

On encountering an error, such a component will invoke the delegate, passing it an ``ExceptionNotification``, which is basically a wrapper around an (unraised) exception, with an additional message and severity.

Note that, if there is no such delegate installed, a component (in this case the parser) will just raise the exception instead.

Working with IExceptionSource
------------------------------
Installing a delegate by setting the ``ExceptionHandler`` property like this is feasible, but it is easy to forget to unregister the delegate (leading to unexpected call backs or memory leaks). You also probably wanto to check whether there was already a previously installed handler, which you might want to to forward the exception to once you are done with it.

To make working with ``ExceptionHandler`` easier, we have added a ``Catch()`` extension method to ``IExceptionSource``, which returns an ``IDisposable``, so you can use the returned value in a ``using`` statement like so:

.. code-block:: csharp

    List<Exception> allExceptions = new List<Exception>();
    var src = FhirXmlNode.Parse("....");

    using (src.Catch((_, arg) => allExceptions.Add(arg.Exception)))
    {
        // navigate through src, or feed the instance to another
        // consumer, which will navigate it for you:
        var poco = src.ToPoco();
    }

This will install your error callback, and uninstall it when the flow leaves the ``using`` block. ``Catch()`` has a ``forward`` argument which you can use to indicate whether you need to forward the errors to a handler that might have been installed before calling ``Catch()``.

If you are just interested in triggering all errors, you can do so by visiting the complete tree, catching the errors in the meantime:

.. code-block:: csharp

    using (src.Catch((_, arg) => allExceptions.Add(arg.Exception)))
    {
        src.VisitAll();
    }

or even more concise:

.. code-block:: csharp

    List<ExceptionNotification> errors = src.VisitAndCatch();
