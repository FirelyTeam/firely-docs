.. |br| raw:: html

   <br />

.. _configure_hosting:

Configure http and https
========================

You can enable http and/or https and adjust the port numbers for them in :ref:`configure_appsettings`.

Changing the port number
------------------------

By default Vonk will run on port 4080 of your system. You can change the port setting in the :code:`appsettings.json` file that is part
of the Vonk distribution:

*	Navigate to your Vonk working directory
*	In a text editor open :code:`appsettings.json` to find this setting:
	::

		"Hosting": {
			"HttpPort": 4080
		}

*	Change the number to the port number you want


Changing from http to https
---------------------------

If you need your server to run on https instead of http, follow these steps:

*	Navigate to the location where you extracted the Vonk files.
*	Open :code:`appsettings.json` in a text editor and find these settings:

    ::

		"Hosting": {
			"HttpPort": 4080,
			"HttpsPort": 4081, // Enable this to use https
			"CertificateFile": "<your-certificate-file>.pfx", //Relevant when HttpsPort is present
			"CertificatePassword" : "<cert-pass>" // Relevant when HttpsPort is present
		},

*	Uncomment the lines for :code:`HttpsPort`, :code:`CertificateFile` and :code:`CertificatePassword`.
*	Set the :code:`HttpsPort` to the port of your liking (standard https port is 443)
*	Set :code:`CertificateFile` to the location of the `.pfx` file that contains the certificate for your site
*	Set :code:`CertificatePassword` to the password for the certificate file.

    ..	note::

        We recommend setting this value as an environment variable for security reasons::

	    	VONK_Hosting:CertificatePassword=<password>
..


	To set this:

	+ In Powershell run:|br| 
	  ``> $env:VONK_Hosting:CertificatePassword="my_password"``
	  |br| where `my_password` is the password for the `.pfx` file
	+ or go to your `System`, open the `Advanced system settings` --> `Environment variables` and create a new variable
	  with the name :code:`VONK_Hosting:CertificatePassword` and the value set to your password

*   You can choose to comment-out the ``HttpPort`` setting, so Vonk will no longer be available through unsecured http.