Using the FhirClient to do basic CRUD
-------------------------------------

A FhirClient named ``client`` has been setup in the previous topic, now
let's do something with it.

Create a new Resource
~~~~~~~~~~~~~~~~~~~~~

Assume we want to create a new ``Patient`` instance and want to ask the
server to store it for us. This is done using ``Create()``:

.. code:: csharp

    var pat = new Patient() { /* set up data */ };
    var patResult = client.Create(pat);

As you'd probably expect, this interaction will throw an Exception when
things go wrong, in most cases a ``FhirOperationException``. This
exception has an ``Outcome`` property that contains an
`OperationOutcome`_,
and which you may inspect to find out more information about why the
interaction failed. Most FHIR servers will return a human-readable error
description in the ``OperationOutcome`` to help you out.

If the interaction was successful, the server will return an instance
of ``Resource<Patient>``, containing the id, metadata and a copy
of the data you just posted to the server. |br|
If you don't want the server to return a copy of the data, you can set
this preference using the ``ReturnFullResource`` property of the FHIR
client:

.. code:: csharp

	client.ReturnFullResource = false;

This sets the ``Prefer`` header in the request to ``minimal``, asking the
server to return no body. For the ``Create()`` interaction
this means the server will return the new id and version number of the
created Resource in the headers of the response and ``patResult`` will be
``null``.

For the conditional version of this interaction, see `Conditional interactions`_.
	
.. Commented out this part for review
	Refreshing data
	~~~~~~~~~~~~~~~

	Whenever you have held a Resource for some time, its data may have
	changed on the server because of changes made by others. At any time,
	you can refresh your local copy of the data by using the ``Refresh``
	call, passing it the ResourceEntry as returned by a previous ``Read`` or
	``Create``:

	.. code:: csharp

		var newEntry = client.Refresh(oldEntry);

	This call will go to the server and fetch the latest version and
	metadata of the Resource as pointed to by the ``Id`` property in the
	ResourceEntry passed as the parameter.

Reading an existing Resource
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To read the data for a given Resource instance from a server, you'll
need its web address (url). You may have previously stored this
reference, or you have found its address in a ResourceReference (e.g.
``Observation.Subject.Reference``).

The ``Read()`` interaction on the FhirClient has two overloads to cover both
cases. Furthermore, it accepts both relative paths and absolute paths
(as long as they are within the endpoint passed to the constructor of
the FhirClient).

.. code:: csharp

    // Read the current version of a Resource
    var location = new Uri("http://spark.furore.com/fhir/Patient/31");
    var patResultA = client.Read<Patient>(location);
    // or
    var patResultA = client.Read<Patient>("Patient/31");

    // Read a specific version of a Resource
    var locationB = new Uri("http://spark.furore.com/fhir/Patient/32/_history/4");
    var patResultB = client.Read<Patient>(locationB);
    // or
    var patResultB = client.Read<Patient>("Patient/32/_history/4");

``Read()`` only takes urls as parameters, so if you have the Resource type
and its Id as distinct data variables, use ``ResourceIdentity``:

.. code:: csharp

    var patResultC = client.Read<Patient>(ResourceIdentity.Build("Patient","33"));

Note that ``Read()`` can be used to get the most recent version of a Resource
as well as a specific version, and thus covers the two 'logical' REST
interactions ``read`` and ``vread``.

Updating a Resource
~~~~~~~~~~~~~~~~~~~

Once you have retrieved a Resource, you may edit its contents and send
it back to the server. This is done using the ``Update()`` interaction. It
takes the Resource instance previously retrieved as a parameter:

.. code:: csharp

    var patResult = client.Read<Patient>("Patient/34");
    // Add a name to the patient, and update
    patResult.Name.Add(HumanName.ForFamily("Kramer").WithGiven("Ewout"));
    client.Update(patResult);

There's always a chance that between retrieving the resource and sending
an update, someone else has updated the resource as well. Servers
supporting version-aware updates may refuse your update in this case and
return a HTTP status code 409 (Conflict), which causes the ``Update()``
interaction to throw a ``FhirOperationException`` with the same status
code. Clients that are version-aware can use the 
:ref:`conditional version <conditions>` of this interaction.

Deleting a Resource
~~~~~~~~~~~~~~~~~~~

The ``Delete()`` interaction on the FhirClient deletes a resource from the
server. It is up to the server to decide whether the resource is
actually removed from storage, or whether previous versions are still
available for retrieval. The ``Delete()`` interaction has multiple overloads
to allow you to delete based on an url or a Resource instance:

.. code:: csharp

    // Delete based on a url or Resource location
    var location = new Uri("http://spark.furore.com/fhir/Patient/35");
    client.Delete(location);
    // or
    client.Delete("Patient/35");

    // You may also delete based on an existing Resource instance
    client.Delete(patResult);

The ``Delete()`` interaction will fail and throw a
``FhirOperationException`` if the Resource was already deleted or if the
Resource did not exist before deletion.

Note that sending an update to a Resource after it has been deleted is
not considered an error and may effectively "undelete" it.

.. _conditions:

Conditional interactions
~~~~~~~~~~~~~~~~~~~~~~~~

The API provides support for the conditional versions of the ``Create()``,
``Update()`` and ``Delete()`` interactions.
Not all servers will support conditional interactions and can return
an HTTP 412 error with an `OperationOutcome`_ to indicate that.

All of the conditional interactions make use of search parameters. See the
page of the Resource type in the 
`HL7 FHIR specification <http://www.hl7.org/fhir/resourcelist.html>`__ 
to check which search parameters are available for that type. Then setup
the conditions:

.. code:: csharp

    var conditions = new SearchParams();
    conditions.Add("identifier", "http://ids.acme.org|123456");

For the ``Create()`` interaction you can have the server check if an
equivalent resource already exists, based on the search parameters:

.. code:: csharp

   var patResult = client.Create<Patient>(pat, conditions);

If no matches are found, the Resource will be created. If one match is
found, the server will not create the resource and will return an
HTTP 200 (OK). In both cases ``patResult`` will contain the Resource
that was sent back by the server. When multiple Resources match the
conditions, the server will return an error.

To perform a conditional ``Update()``, the code is the same as for the
``Create()`` interaction above:

.. code:: csharp

   var patResult = client.Update<Patient>(pat, conditions);
   
If a match is found, that Resource instance will be updated with the
new information. If no matches are found, the server will perform the
create interaction.
When multiple Resources match, the server will return an error.

The conditional ``Delete()`` takes a ``string`` as first argument,
indicating the Resource type and the search parameters as second argument:

.. code:: csharp

   var patResult = client.Delete("Patient", conditions);

When no match is found, the server will return an error. If one match
is found, that Resource will be deleted. The server may choose to
delete all Resources if multiple instances match, or it may return
an error.

More information
~~~~~~~~~~~~~~~~

More information about the CRUD interactions and how FHIR works with REST
can be found `here <http://www.hl7.org/fhir/http.html>`__.

.. _OperationOutcome: http://www.hl7.org/fhir/operationoutcome.html

.. |br| raw:: html

   <br />