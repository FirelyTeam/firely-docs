.. _paging:

Paged results
-------------
Normally, any FHIR server will limit the number of results returned for
the `history` and `search` interactions. For these interactions you can
also specify the maximum number of results you would want to receive client
side.

The FhirClient has a ``Continue`` method to browse a search or history result
Bundle, after the first page has been received. ``Continue`` supports a second
parameter that allows you to set the direction in which you want to page:
forward, backward, or directly to the first or last page of
the result. The standard direction is to retrieve the next page.
The method will return ``null`` when there is no link for the
chosen direction in the Bundle you provide.

.. code:: csharp

    while( result != null )
    {
        // Do something with the entries in the result Bundle
		
        // retrieve the next page of results
        result = client.Continue(result);
    }

    // go to the last page with the direction filled in:
    var last_page = client.Continue(result, PageDirection.Last);

