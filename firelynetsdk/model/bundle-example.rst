Code example for Bundle
-----------------------
In this paragraph, we provide a code example that sets up a Bundle that could be the response
to a search request.
Next to adding the resources to the ``Entry`` field, we have also added some extra data such
as the total number of results. At the end, we have included the loop to walk through the Bundle
entries.

.. code-block:: csharp

	// example searchset Bundle setup, fictional data only
	var search_response = new Bundle();
	search_response.Type = Bundle.BundleType.Searchset;
	
	// adding some metadata
	search_response.Id = "[insert temporary uuid here, or real id if you store this Bundle]";
	search_response.Meta = new Meta()
	{
		VersionId = "1",
		LastUpdatedElement = Instant.Now()
	};
	
	// we assume the search has already taken place on your database, and the resulting
	// resources are available to us in a list called 'dataset'
	search_response.Total = dataset.Count;
	
	// for searches, we need to fill in the 'self' link, that represents the search request
	// as understood by the server, e.g. "http://myserver.org/fhir/Patient?name=steve"
	// if you are paging the response, also fill in the other relevant links, like 'next',
	// 'last', etc.
	search_response.SelfLink = new Uri("[search request]");

	foreach (var r in dataset)
	{
		var full_url = r.ResourceBase.ToString() + r.ResourceType.ToString() + r.Id;

		// instead of using AddResourceEntry, we use the search variant to also include
		// the search mode
		search_response.AddSearchEntry(r, full_url, Bundle.SearchEntryMode.Match);
	}

	// the Bundle is now ready to be sent to the requester

	// walking through the entries in the Bundle:
	foreach (var e in search_response.Entry)
	{
		// Let's write the fully qualified url for the resource to the console:
		Console.WriteLine("Full url for this resource: " + e.FullUrl);

		// Do something with this resource, for example write human readable text of
		// the resource to the console:
		var resource = (DomainResource)e.Resource;
		Console.WriteLine("Human readable text of this resource: " + resource.Text);
	}
