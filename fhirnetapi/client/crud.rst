CRUD interactions
-----------------
A FhirClient named ``client`` has been setup in the previous topic, now
let's do something with it.

Create a new resource
^^^^^^^^^^^^^^^^^^^^^
Assume we want to create a new resource instance and want to ask the
server to store it for us. This is done using ``Create``.

.. code:: csharp

    var pat = new Patient() { /* set up data */ };
    var created_pat = client.Create(pat);

.. tip:: See :ref:`FHIR-model` for examples on how to fill a resource with values.

As you'd probably expect, this interaction will throw an Exception when
things go wrong, in most cases a ``FhirOperationException``. This
exception has an ``Outcome`` property that contains an
`OperationOutcome`_ resource,
and which you may inspect to find out more information about why the
interaction failed. Most FHIR servers will return a human-readable error
description in the ``OperationOutcome`` to help you out.

If the interaction was successful, the server will return an instance
of the resource that was created, containing the id, metadata and a copy
of the data you just posted to the server as it was stored. Depending on the server
implementation, this could differ from what you've sent. For instance, the server
could have filled in fields with default values, if the values for those fields were
not set in your request.

If you've set the ``ReturnFullResource`` property of the :ref:`FhirClient <minimal>`
to ``false``, the server will return the technical id and version number of the newly
created resource in the headers of the response and the ``Create`` method will return
``null``. See :ref:`request-response` for an example of how to retrieve the information
from the returned headers.

For the conditional version of this interaction, see :ref:`conditionals`.

Reading an existing resource
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To read the data for a given resource instance from a server, you'll
need its technical id. You may have previously stored this after a ``Create``,
or you have found its address in a ResourceReference (e.g.
``Observation.Subject.Reference``).

The ``Read`` interaction on the FhirClient has two overloads to cover both
cases. Furthermore, it accepts both relative paths and absolute paths
(as long as they are within the endpoint passed to the constructor of
the ``FhirClient``).

.. code:: csharp

	// Read the current version of a Patient resource with technical id '31'
	var location_A = new Uri("http://vonk.furore.com/Patient/31");
	var pat_A = client.Read<Patient>(location_A);
	// or
	var pat_A = client.Read<Patient>("Patient/31");
	
	// Read a specific version of a Patient resource with technical id '32' and version id '4'
	var location_B = new Uri("http://vonk.furore.com/Patient/32/_history/4");
	var pat_B = client.Read<Patient>(location_B);
	// or
	var pat_B = client.Read<Patient>("Patient/32/_history/4");

.. tip:: See the :ref:`paragraph about ResourceIdentity<resource-identity>` for methods
	to construct URIs from separate values and other neat helper methods.
	
Note that ``Read`` can be used to get the most recent version of a resource
as well as a specific version, and thus covers the two 'logical' REST
interactions ``read`` and ``vread``.

Updating a resource
^^^^^^^^^^^^^^^^^^^
Once you have retrieved a resource, you may edit its contents and send
it back to the server. This is done using the ``Update`` interaction. It
takes the resource instance previously retrieved as a parameter:

.. code:: csharp

	// Add a name to the patient, and update
	pat_A.Name.Add(new HumanName().WithGiven("Christopher").AndFamily("Brown"));
	var updated_pat = client.Update(pat_A);

There's always a chance that between retrieving the resource and sending
an update, someone else has updated the resource as well. Servers
supporting version-aware updates may refuse your update in this case and
return a HTTP status code 409 (Conflict), which causes the ``Update``
interaction to throw a ``FhirOperationException`` with the same status
code. Clients that are version-aware can indicate this using the optional
second parameter ``versionAware`` set to ``true``. This will result in a
:ref:`conditional call<conditionals>` of the interaction.

Deleting a Resource
^^^^^^^^^^^^^^^^^^^
The ``Delete`` interaction on the FhirClient deletes a resource from the
server. It is up to the server to decide whether the resource is
actually removed from storage, or whether previous versions are still
available for retrieval. The ``Delete`` interaction has multiple overloads
to allow you to delete based on a url or a resource instance:

.. code:: csharp

    // Delete based on a url or resource location
    var location = new Uri("http://vonk.furore.com/Patient/33");
    client.Delete(location);
    // or
    client.Delete("Patient/33");
	
    // You may also delete based on an existing resource instance
    client.Delete(pat_A);

The ``Delete`` interaction will fail and throw a ``FhirOperationException``
if the resource was already deleted or if the resource did not exist before
deletion, and the server returned an error indicating that.

Note that sending an update to a resource after it has been deleted is
not considered an error and may effectively "undelete" it.

.. _conditionals:

Conditional interactions
------------------------
The API provides support for the conditional versions of the ``Create``,
``Update`` and ``Delete`` interactions.
Not all servers will support conditional interactions and can return
an HTTP 412 error with an `OperationOutcome`_ to indicate that.

All of the conditional interactions make use of search parameters. See the
page of the resource type you want to work with in the 
`HL7 FHIR specification <http://www.hl7.org/fhir/resourcelist.html>`__ 
to check which search parameters are available for that type. Then, setup
the conditions.

For example, if we want to base the interaction on the ``identifier`` element
of a resource, we can setup that search parameter with a value:

.. code:: csharp

    var conditions = new SearchParams();
    conditions.Add("identifier", "http://ids.acme.org|123456");

.. tip:: See :ref:`search` for more explanation about ``SearchParams`` and 
	example search syntax.

For the ``Create`` interaction you can have the server check if an
equivalent resource already exists, based on the search parameters:

.. code:: csharp

   var created_pat_A = client.Create<Patient>(pat, conditions);

If no matches are found, the resource will be created. If one match is
found, the server will not create the resource and will return an
HTTP 200 (OK). In both cases ``created_pat_A`` will contain the resource
that was sent back by the server, unless you set the FhirClient to ask for
the :ref:`minimal representation <minimal>. When multiple resources match the
conditions, the server will return an error.

To perform a conditional ``Update``, the code is similar to that of the
``Create`` interaction above. Again, setup a ``SearchParams`` object and
add it to your request:

.. code:: csharp

	// using the same conditions as in the previous example
	var updated_pat_A = client.Update<Patient>(pat, conditions);
   
If a match is found, the update is performed on that match. If no matches are found,
the server will perform the interaction as if it were a ``Create``.
When multiple resources match, the server will return an error.

The conditional ``Delete`` takes a string as first argument,
indicating the resource type. The search parameters are passed as second argument:

.. code:: csharp

   client.Delete("Patient", conditions);

When no match is found, the server will return an error. If one match
is found, that resource will be deleted. The server may choose to
delete all resources if multiple instances match, or it may return
an error.

-----------

Refreshing data
---------------
Whenever you have held a resource for some time, its data may have
changed on the server because of changes made by others. At any time,
you can refresh your local copy of the data by using the ``Refresh``
call, passing it the resource instance as returned by a previous ``Read``,
``Create``, or ``Update``:

.. code:: csharp

	var refreshed_pat = client.Refresh(pat_A);

This call will go to the server and fetch the latest version and
metadata of the resource as pointed to by the ``Id`` property in the
resource instance passed as the parameter.



.. _OperationOutcome: http://www.hl7.org/fhir/operationoutcome.html

.. |br| raw:: html

   <br />