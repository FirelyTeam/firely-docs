=================
Working with REST
=================

In this section we explain the methods of the FhirClient that are in the
Hl7.Fhir.Rest part of the API package.

Creating a FhirClient
---------------------

Before we can do any of the interactions explained in the next part, we
have to create a new FhirClient. This is done by passing the url of the
FHIR server's endpoint as a parameter to the constructor:

.. code:: csharp

    var client = new FhirClient("http://vonk.furore.com");

You'll create an instance of a client for every server you want to work
with. Every call we'll do on this client will be for interactions
with this server. Since resources may reference other resources on a different FHIR server,
you'll have to inspect any references and direct them to the right FhirClient.
Of course, if you're dealing with a single server within your organization or a single
cloud-based FHIR server, you don't have to worry about this.

There's a list of `publically available test 
servers <http://wiki.hl7.org/index.php?title=Publicly_Available_FHIR_Servers_for_testing>`__ you can use.

FhirClient options
^^^^^^^^^^^^^^^^^^
To specify the preferred format --JSON or XML-- of the content to be used when communicating
with the FHIR server, you can use the ``PreferredFormat`` attribute:

.. code:: csharp

    client.PreferredFormat = ResourceFormat.Json;

The FHIR client will send all requests in the specified format. Servers
are asked to return responses in the same format, but may choose
to ignore that request.


..
	.. include:: client-crud.rst
