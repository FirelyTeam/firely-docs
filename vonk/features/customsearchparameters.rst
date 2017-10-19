.. |br| raw:: html

   <br />


.. _feature_customsp:

Using Custom Search Parameters
==============================

.. _feature_customsp_configure:

Configure Search Parameters
---------------------------

You can control which search parameters are loaded at the startup of Vonk. You specify that in the :ref:`configure_appsettings`:
::

  "SearchParametersImportOptions": {
    "Enabled": true,
    "Sets": [
      {
        "Path": "",
        "Source": "Api"
      },
      {
        "Path": "C:/MySearchParameters",
        "Source": "Directory"
      },
      {
        "Path": "C:/MySearchParameters/Parameters.zip",
        "Source": "ZipFile"
      }
    ]
  },

You can mix and repeat the sources. They will be read from top to bottom, where the first search parameter with a specific id will take precedence
over later search parameters with the same id. |br|
This means that if you want to override a search parameter from the specification with your own definition, you will
need to put your own search parameter(s) higher in the list than the parameters from the specification.

Note that in json you either use forward slashes (/) or double backward slashes (\\\\) as path separators.

The SearchParameters that are loaded are automatically included in the CapabilityStatement in response to the :ref:`restful_capabilities` interaction.
This implies that you can check the CapabilityStatement to see whether a specific SearchParameter was actually loaded.

.. _feature_customsp_reindex:

Re-indexing for new or changed SearchParameters
-----------------------------------------------

Vonk extracts values from resources based on the available search parameters upon create or update.
This means that if you already had resources in your database before adding a custom search parameter, 
those resources will not be indexed for that parameter. If you on the other hand removed a previously used 
search parameter, the index will contain superfluous data.

To fix that, you should re-index (repeat the extraction) for these parameters.

.. warning:: This is a possibly lengthy operation, so use it with care.

.. warning:: During the re-index operation, search results may be unreliable.

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

	``include`` means that resources will be re-indexed only for those search parameters.
	You use this if you added or changed one or few search parameters.

	``exclude`` means that any existing index data for those search parameters will be erased.
	You use this when you removed a search parameter.

  Remember to adjust the Content-Type header: ``application/x-www-form-urlencoded``.

If you are :ref:`not permitted <configure_administration_access>` to perform the reindex, Vonk will return statuscode 403.

.. _feature_customsp_reindex_configure:

Re-index Configuration
^^^^^^^^^^^^^^^^^^^^^^

Vonk will not re-index the resources in the database all at once, but in batches. The re-index operation will process all batches until all resources are re-indexed.
You can control the size of the batches in the :ref:`configure_appsettings`.
::

    "ReindexOptions": {
        "BatchSize": 100
    },

Use any integer value >= 1.

.. _feature_customsp_limitations:

Limitations
-----------

* Search parameters can NOT (yet) be posted to the /administration endpoint. 
* If a search parameter cannot be parsed correctly, it will silently be ignored. Expect improvement of this in a later version.
* Every search parameter has to have either:

  * a valid FhirPath in it's Expression property, or
  * be a Composite search parameter and specify at least one component.

