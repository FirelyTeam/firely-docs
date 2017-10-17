.. _configure_searchparameters:

Configure Search Parameters
---------------------------

You can control which search parameters are loaded at the startup of Vonk. You specify that in the appsettings.json::

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

You can mix and repeat the sources: 
they will be read from top to bottom, where the first search parameter with a specific id will take precedence
over later search parameters with the same id. |br|
This means that if you want to override a search parameter from the specification with your own definition, you will
need to put your own search parameter(s) higher in the list than the parameters from the specification.


