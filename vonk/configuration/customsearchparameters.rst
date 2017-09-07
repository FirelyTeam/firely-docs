Configuring Custom Search Parameters
------------------------------------

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

You can mix and repeat the sources; they will be read from top to bottom, overriding earlier search parameters with the same id.
This also means that you can for example load all the search parameters from the specification and then override some of them with a different definition.


