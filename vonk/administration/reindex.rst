Re-indexing for new or changed SearchParameters
-----------------------------------------------

Vonk extracts values from resources based on the available search parameters upon create or update.
This means that if you already had resources in your database before adding a custom search parameter, 
those resources will not be indexed for that parameter. If you on the other hand removed a previously used 
search parameter, the index will contain superfluous data.

To fix that, you should re-index (repeat the extraction) for these parameters.

.. warning:: This is a possibly lengthy operation, so use it with care.

*	To re-index all resources for all search parameters, use:

	::
	
		POST http(s)://<vonk-endpoint>/administration/reindex/all

	This will delete any previously indexed data and extract it again from the resources.

*	To re-index all resources for certain search parameters, use:

	::
	
		POST http(s)://<vonk-endpoint>administration/reindex/searchparameters

	In the body of the POST, you put the parameters to actually re-index as form parameters:

	::
	
		include=Patient.name,Observation.code
		exclude=Organization.name

	``include`` means that resources will be re-indexed only for those search paramters.
	You use this if you added or changed one or few search parameters.

	``exclude`` means that any existing index data for those search parameters will be erased.
	You use this when you removed a search parameter.
