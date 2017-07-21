.. _history:

Retrieving resource history
---------------------------

There are several ways to retrieve version history for resources with
the FhirClient.

.. note:: Servers are not required to support version retrieval. If the ``history`` interaction
	is supported, the server can can choose	on which level it is supported. You can check the
	``CapabilityStatement`` of the server to see what it supports.

History of a specific resource
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The version history of a specific resource can be retrieved with the
``History`` method of the FhirClient. It is possible to specify a date, to
include only the changes that were made after the given date, and a count
to specify the maximum number of results returned.

The method returns a Bundle resource with the history for the resource
instance, for example:

.. code:: csharp

	var pat_31_hist = client.History("Patient/31");
	// or
	var pat_31_hist = client.History("Patient/31", new FhirDateTime("2016-11-29").ToDateTimeOffset());
	// or
	var pat_31_hist = client.History("Patient/31", new FhirDateTime("2016-11-29").ToDateTimeOffset(), 5);

.. note:: The Bundle may contain entries without a resource, when the version of the instance
	was the result of a ``delete`` interaction.
	


History for a resource type
^^^^^^^^^^^^^^^^^^^^^^^^^^^
Sometimes you may want to retrieve the history for a **type** of
resource instead of an instance (e.g. the versions of all Patients). In
this case you can use the ``TypeHistory`` method.

.. code:: csharp

    var pat_hist = client.TypeHistory<Patient>();

As with the method on the instance level, a date and page size can optionally be
specified.

System wide history
^^^^^^^^^^^^^^^^^^^
When a system wide history is needed, retrieving all versions of all
resources, the FhirClient's ``WholeSystemHistory`` method is used. Again, it is
possible to specify a date and a page size.

.. code:: csharp

    var lastMonth = DateTime.Today.AddMonths(-1);
    var last_month_hist = client.WholeSystemHistory(since: lastMonth, pageSize: 10);

In this case the function retrieves all changes to all resources that
have been done since the last month and limits the results to a maximum
of 10. See :ref:`paging` for an example on how to page through the resulting Bundle.


	