.. _vonk_securitynotes:

Security notifications for Vonk
===============================

January 2019
------------

Microsoft has published two Security Advisories regarding ASP.NET Core:

   * If you run Vonk behind Internet Information Server (IIS), you may be vulnerable to "Microsoft Security Advisory CVE-2019-0548: ASP.NET Core Denial Of Service Vulnerability".
     Refer to the related `Github issue #335 <https://github.com/aspnet/Announcements/issues/335>`_ for details and the fix.
   * When using older versions of some of the ASP.NET Core packages you may be vulnerable to "Microsoft Security Advisory CVE-2019-0564: ASP.NET Core Denial of Service Vulnerability".
     Refer to the related `Github issue #334 <https://github.com/aspnet/Announcements/issues/334>`_ for details.
     Vonk FHIR Server up until version 1.1.0 uses versions of the packages involved that are not affected (older than the vulnerable versions). In a future version we will upgrade beyond the vulnerable version upto secure versions. No action is required by the administrator of Vonk.

April 2018
----------

Microsoft has published two Security Advisories regarding ASP.NET Core:

   * If you run Vonk behind Internet Information Server (IIS), you may be affected by "Microsoft Security Advisory CVE-2018-0808: ASP.NET Core Denial Of Service Vulnerability". 
     Refer to the related `GitHub issue #294 <https://github.com/aspnet/Announcements/issues/294>`_ for details and the fix.
   * If you expose Vonk directly to the internet, or host it behind a proxy which does not validate or restict host headers to known good values, you may be affected by "Microsoft Security Advisory CVE-2018-0787: ASP.NET Core Elevation Of Privilege Vulnerability".
     Refer to the related `GitHub issue #295 <https://github.com/aspnet/Announcements/issues/295>`_ for details and the correct way of hosting Vonk.
     This 'host validating middleware' mentioned by this issue is not a part of Vonk. We advise you to run a publicly exposed Vonk :ref:`behind a proxy <deploy_reverseProxy>` or on an Azure Web App. 

