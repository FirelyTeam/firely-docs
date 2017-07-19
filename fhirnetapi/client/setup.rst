Creating a FhirClient
---------------------

Before we can do any of the interactions explained in the next part, we
have to create a new ``FhirClient`` instance. This is done by passing the url of the
FHIR server's endpoint as a parameter to the constructor:

.. code:: csharp

    var client = new FhirClient("http://vonk.furore.com");

The constructor method is overloaded, to enable you to use a URI instead of a string.
As second parameter to the constructor, you can specify whether the client should
perform a conformance check to see if the server has got a compatible FHIR version.
The default setting is ``false``.

You'll create an instance of a client for every server you want to work
with. Every call we'll do on this client will be for interactions
with this server. Since resources may reference other resources on a different FHIR server,
you'll have to inspect any references and direct them to the right FhirClient.
Of course, if you're dealing with a single server within your organization or a single
cloud-based FHIR server, you don't have to worry about this.

There's a list of `publically available test 
servers <http://wiki.hl7.org/index.php?title=Publicly_Available_FHIR_Servers_for_testing>`__ you can use.

.. _minimal:

FhirClient communication options
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To specify the preferred format --JSON or XML-- of the content to be used when communicating
with the FHIR server, you can use the ``PreferredFormat`` attribute:

.. code:: csharp

	client.PreferredFormat = ResourceFormat.Json;

The FHIR client will send all requests in the specified format. Servers
are asked to return responses in the same format, but may choose
to ignore that request. The default setting for this field is ``XML``.

When communicating the preferred format to the server, this can either be done by appending
``_format=[format]`` to the URL, or setting the ``Accept`` HTTP header. The client uses the
latter by default, but if you want, you can use the ``_format`` parameter instead:

.. code:: csharp

	client.UseFormatParam = true;

If you perform a ``Create``, ``Update`` or ``Transaction`` interaction, you can request the server
to either send back the complete representation of the interaction, or a minimal data set, as
described in the `Managing Return Content <http://www.hl7.org/fhir/http.html#2.21.0.5.2>`_ section
of the specification. The default setting is to ask for the complete representation. If you want to
change that request, you can set the ``ReturnFullResource`` attribute:

.. code:: csharp

	client.ReturnFullResource = false;
	
This sets the ``Prefer`` HTTP header in the request to ``minimal``, asking the
server to return no body in the response.

You can set the timeout to be used when making calls to the server with the ``Timeout`` attribute:

.. code:: csharp

	client.Timeout = 120000; // The timeout is set in milliseconds, with a default of 100000