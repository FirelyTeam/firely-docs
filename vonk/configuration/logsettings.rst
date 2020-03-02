.. _configure_log:

Log settings
============

Vonk uses `Serilog <https://serilog.net/>`__ for logging. The logging settings are controlled in json configuration files called ``logsettings(.*).json``. The files are read in a hierarchy, exactly like the :ref:`appsettings files <configure_levels>` are.
Vonk comes with default settings in ``logsettings.default.json``. You can adjust the way Vonk logs its information by overriding these default settings in ``logsettings.json``. You need to create this ``logsettings.json`` yourself.

Alternatively you can control :ref:`configure_envvar_log`.

.. _configure_log_level:

Changing the log event level
----------------------------
Serilog defines several levels of log events. From low to high, these are ``Verbose``, ``Debug``, ``Information``,
``Warning``, ``Error`` and ``Fatal``. You can set the minimum level you want to log, meaning that events for that
level or higher will be logged. By default, Vonk uses ``Error`` as the minimum level of recording information.

To change the level of logging, follow these steps:

*	Navigate to your Vonk working directory.
*	Open :code:`logsettings.json` in a text editor and find this settings::

		"MinimumLevel": {
			"Default": "Error",
		},

*	Change the setting for :code:`Default` from ``Error`` to the level you need, from the choice of
	``Verbose``, ``Debug``, ``Information``, ``Warning``, ``Error`` and ``Fatal``.

You can deviate from the default mimimum level for specific namespaces. You do this by specifying the namespace
and the log event level you would like for this namespace, for example::

	"MinimumLevel": {
		"Default": "Error",
		"Override": {
			"Vonk": "Warning"
		}
	},

Some additional namespaces you might want to log are:

- ``Vonk.Configuration`` to log configuration information on startup
- ``Vonk.Core.Licensing`` to show license information in your logs
- ``Vonk.Repository.Sql``, ``Vonk.Repository.MongoDb`` or ``Vonk.Repository.Memory`` to log repository events
- ``Microsoft`` to log events from the Microsoft libraries
- ``System`` to log events from the System libraries

Please note that the namespaces are evaluated in order from top to bottom, so more generic 'catch all' namespaces should be at the bottom of the list. 
So this will log events on ``Vonk.Repository.Sql`` on ``Information`` level::

	"MinimumLevel": {
		"Default": "Error",
		"Override": {
			"Vonk.Repository.Sql": "Information",
			"Vonk": "Warning"
		}
	},

But in this (purposefully incorrect) example the ``Warning`` level on the ``Vonk`` namespace will override the ``Information`` level on the ``Vonk.Repository.Sql`` namespace::

	"MinimumLevel": {
		"Default": "Error",
		"Override": {
			"Vonk": "Warning",
			"Vonk.Repository.Sql": "Information"
		}
	},

.. _configure_log_sinks:
 
Changing the sink
-----------------
Another setting you can adjust is ``WriteTo``. This tells Serilog which sink(s) to log to.
Serilog provides several sinks, and for Vonk you can use ``Console``, ``ColoredConsole``, ``RollingFile`` and ``Seq``.

RollingFile
^^^^^^^^^^^
For the ``RollingFile`` sink, you can specify the location of the log files with the ``pathFormat`` argument.
Please include the ``{Date}``, ``{Hour}`` or ``{HalfHour}`` placeholder, so Serilog can add date and time
information to your filename.

*	Navigate to your Vonk working directory.
*	Open :code:`logsettings.json` in a text editor and find the ``WriteTo`` setting::

		"WriteTo": [
			{ "Name": "ColoredConsole" },
			{
				"Name": "RollingFile",
				"Args": { "pathFormat": "c:/temp/vonk-{Date}.log" }
			},

*	Under ``RollingFile``, change the location of the logfiles by editing the value for ``pathFormat``.
	For example::

		{
			"Name": "RollingFile",
			"Args": { "pathFormat": "c:/logfiles/vonk-{Hour}.log" }
		},

You can also limit the size of the log file, which is 1GB by default, with the ``fileSizeLimitBytes`` option.
If you set the value for this argument to ``null``, you remove the limit. Serilog retains a maximum of 31 files.
This value can also be removed or changed, by providing the ``retainedFileCountLimit`` argument::

	{
		"Name": "RollingFile",
		"Args": { "pathFormat": "c:/logfiles/vonk-{Hour}.log", "retainedFileCountLimit": "24" }
	},

Seq
^^^
For the ``Seq`` sink, you can also specify arguments. One of them is the server URL for your
Seq server:

*	Navigate to your Vonk working directory.
*	Open :code:`logsettings.json` in a text editor and find the ``Seq`` sink under the
	``WriteTo`` setting::

		"WriteTo": [
			{
				"Name": "Seq",
				"Args": { "serverUrl": "http://localhost:5341" }
			}

* Change ``serverUrl`` to the URL of your Seq server

All sinks
^^^^^^^^^
For all sinks, you can set a restriction on the minimum log event level. This is not an override of
the ``MinimumLevel`` setting we discussed earlier, but rather a filter on the events that are logged.
With this extra sink argument, you can for example log only a small portion of the events to the
console, but all of them to the log file.

*	Navigate to your Vonk working directory.
*	Open :code:`logsettings.json` in a text editor and find the sink you want to set the
	filter for under the ``WriteTo`` setting.
*	Add the ``restrictedToMinimumLevel`` argument to the ``Args`` of the sink::

		"WriteTo": [
			{
				"Name": "ColoredConsole",
				"Args": { "restrictedToMinimumLevel": "Warning" }
			},
		],

.. _configure_log_database:

Database details
----------------
Whether you use MongoDB or SQL Server, you can have Vonk log in detail what happens towards your database. Just set the appropriate loglevel to 'Verbose'::

	"MinimumLevel": {
		"Default": "Error",
		"Override": {
			"Vonk.Repository.Sql": "Verbose",
			"Vonk.Repository.MongoDb": "Verbose",
			"Vonk": "Warning"
		}
	},

If you do so you probably don't want all this detail in your console sink, so you can limit the level for that, see `All sinks`_ above.

.. _configure_log_insights:

Azure Application Insights
--------------------------
Vonk can also log to Azure Application Insights ("Application Insights Telemetry"). What you need to do:

#. Create an Application Insights instance on Azure.
#. Get the InstrumentationKey from the Properties blade of this instance.
#. Add the correct sink to the logsettings.json::

		"WriteTo": [
			{
				"Name": "ApplicationInsightsTraces",
				"Args": {
					"instrumentationKey": "<the key you copied in step 2>", 
					"restrictedToMinimumLevel": "Verbose" //Or a higher level
				}
			},
		],

#. This also enables Dependency Tracking for access to your database. This works for both SQL Server and MongoDB. And for the log sent to `Seq`_ if you enabled that.
#. If you set the level for Application Insights to ``Verbose``, and combine that with `Database details`_, you get all the database commands right into Application Insights.
