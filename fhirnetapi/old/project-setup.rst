==================================================
Setting up your .Net project to make a FHIR client
==================================================

To start using the FHIR API in your .Net project, you will need to
install the NuGet package.

Set up a new project and use the NuGet Package Manager to find and select the NuGet package you want to use.
See also the :ref:`FHIR API for .Net version table <version_table>`.

In this example a Windows Form Application with the name 'MyFirstRead' has been setup and the latest version
of the API has been selected:

.. image:: images/nuget_pm.png

After the package has been installed, you need to add these lines to the source code to start using it::

    using Hl7.Fhir.Model;
    using Hl7.Fhir.Rest;

