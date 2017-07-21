Bundles
-------
Although Bundle is just another resource type in FHIR, and you can fill in the values
for the fields in the way that has been described in this chapter, a Bundle is still
a bit special. Bundles are used to communicate sets of resources. Usually you will first
encounter them when you're performing a :ref:`search interaction <searching>`. In that
case, the server will send you a Bundle, and you will browse through the contents to
process the data. Sometimes you will need to construct a Bundle instance and
fill in the details, for example when you are going to setup a FHIR document, or want to
perform a :ref:`transaction <transactions>`, or if you're implementing the server side
response to a search request. 

Looking at the content
^^^^^^^^^^^^^^^^^^^^^^
A Bundle resource has got some fields that contain metadata about the Bundle, such as
the type of Bundle, and a total if the Bundle contains a result from a :ref:`search <searching>`
or :ref:`history <history>` interaction. The resources that are put in a Bundle, are located
in the ``entry`` element of the Bundle resource.

Since ``entry`` is a 0..* element **and** a :ref:`component <components>` block, the API
provides you with a list of ``EntryComponent`` in the ``Bundle.Entry`` field.
You can loop through that list, or use any of the standard C# List methods to work with the list.

The fully qualified URL identifying the resource that is in the entry, is stored in the
``FullUrl`` field of the entry. |br|
The API doesn't know the type of resource that is in the entry, so the data type for the
``Resource`` field in the entry is the base type ``Resource``. You will need to cast to
the actual resource type if you want to have access to the fields for that type.

.. tip:: You can check the ``Resource.ResourceType`` field first, if you don't know the type 
	of resource for an entry.

Suppose we have performed a search interaction on Patient resources, and have stored the
results in a variable called ``result``. We can then loop through the resources in the
``Entry`` list like this:

.. code-block:: csharp

	foreach (var e in result.Entry)
	{
		// Let's write the fully qualified url for the resource to the console:
		Console.WriteLine("Full url for this resource: " + e.FullUrl);

		var pat_entry = (Patient)e.Resource;
		
		// Do something with this patient, for example write the family name that's in the first 
		// element of the name list to the console:
		Console.WriteLine("Patient's last name: " + pat_entry.Name[0].Family);
	}


Filling a Bundle
^^^^^^^^^^^^^^^^
When constructing a Bundle, you will need to look at the `definition <http://www.hl7.org/fhir/bundle.html>`__
for the Bundle resource to see which elements are mandatory, just as you would do for other
resource types. 

.. tip:: If you want to create a Bundle for a batch or transaction, you can use the helper methods
	in the API to construct the Bundle correctly, described in the :ref:`transactions` paragraph.

Then, for each resource you want to include in the Bundle, you will add an
``EntryComponent`` to the ``Entry`` list. This can be done by creating an instance of type
``EntryComponent``, which you fill with the fully qualified URL for the resource, and the
resource. Or, you could use the ``AddResourceEntry`` method of the ``Bundle`` class.
This second option creates cleaner code if you only need to fill in the URL and resource.
However, if you need to fill in more fields for the ``EntryComponent`` class, the first
option can be useful.

This example shows both ways:

.. code-block:: csharp

	var collection = new Bundle();
	collection.Type = Bundle.BundleType.Collection;
	
	var first_entry = new Bundle.EntryComponent();
	first_entry.FullUrl = res1.ResourceBase.ToString() + res1.ResourceType.ToString() + res1.Id;
	first_entry.Resource = res1;
	collection.Entry.Add(first_entry);
	
	// adding a second entry
	collection.AddResourceEntry(res2, "urn:uuid:01d04293-ed74-4f93-aa0a-2f096a693fb1");

In this example we create a Bundle with a general collection of resources, and have set the
type accordingly. The first resource we want to add, ``res1``, is a resource that already has
a technical id. For now, we have constructed the FullUrl with parts of the information that's
in the resource instance, but we could also have used the helper methods for
``ResourceIdentity`` which are in the ``Hl7.Fhir.Rest`` namespace. See :ref:`resource-identity`
for more information. |br|
The second resource we add to this collection, ``res2``, is a new resource that has not
been stored, and doesn't have a technical identifier assigned to it yet. We still have to
fill in the ``FullUrl`` field, as demanded by the ``bdl-7`` `constraint for Bundle
<http://www.hl7.org/fhir/bundle.html#invs>`__ in the specification. This is done by creating
a temporary UUID, and representing that as a fully qualified URL with the ``urn:uuid:`` notation.

..
	TODO: add explanation for extra Bundle helper methods, like GetResources, FindEntry, etc.


.. |br| raw:: html

   <br />
