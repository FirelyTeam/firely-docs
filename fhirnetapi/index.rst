========
Welcome
========

This is documentation site for the support API for working with `HL7
FHIR <http://www.hl7.org/fhir>`__ on the Microsoft .NET platform.

This library provides:

-  Class models for working with the FHIR data model using POCO's
-  Xml and Json parsers and serializers
-  A REST client for working with FHIR-compliant servers
-  Helper classes to work with the specification metadata, and generation of differentials

Getting Started
---------------

Get started by reading this documentation and downloading one of the NuGet packages:

.. _version_table:

============    ======================    ==============================================
Spec version    Core		              Specification
============    ======================    ==============================================
DSTU 2.1        `Hl7.Fhir.DSTU21`_        `Hl7.Fhir.Specification.DSTU21`_
DSTU 2          `Hl7.Fhir.DSTU2`_         `Hl7.Fhir.Specification.DSTU2`_
DSTU 1 [*]_     `Hl7.Fhir.DSTU`_          `Hl7.Fhir.Specification.DSTU`_
============    ======================    ==============================================

.. [*] Please note that the DSTU1 release is not maintained anymore.

.. _`Hl7.Fhir.DSTU21`: https://www.nuget.org/packages/Hl7.Fhir.DSTU21/
.. _`Hl7.Fhir.DSTU2`: https://www.nuget.org/packages/Hl7.Fhir.DSTU2/
.. _`Hl7.Fhir.DSTU`: https://www.nuget.org/packages/Hl7.Fhir.DSTU/
.. _`Hl7.Fhir.Specification.DSTU21`: https://www.nuget.org/packages/Hl7.Fhir.Specification.DSTU21/
.. _`Hl7.Fhir.Specification.DSTU2`: https://www.nuget.org/packages/Hl7.Fhir.Specification.DSTU2/
.. _`Hl7.Fhir.Specification.DSTU`: https://www.nuget.org/packages/Hl7.Fhir.Specification.DSTU/

Support
-------

We actively monitor the `issues <https://github.com/ewoutkramer/fhir-net-api/issues>`__ 
coming in through the GitHub repository.
You are welcome to register your bugs and feature suggestions there!

For broader discussions, there's a `"FHIR on .NET" Google
group <https://groups.google.com/forum/#!forum/fhir-dotnet>`__.

We are also present on `chat.fhir.org <https://chat.fhir.org>`__ on Zulip.

Contributing
------------

We are welcoming contributors!

If you want to participate in this project, we're using `Git
Flow <http://nvie.com/posts/a-successful-git-branching-model/>`__ for
our branch management, so new development is done on (feature branches
from) /develop.

GIT branching strategy
~~~~~~~~~~~~~~~~~~~~~~

-  `NVIE <http://nvie.com/posts/a-successful-git-branching-model/>`__
-  Or see: `Git
   workflow <https://www.atlassian.com/git/workflows#!workflow-gitflow>`__
   
.. toctree::
   :maxdepth: 2
   :hidden:

   project-setup
   client-setup
   client-search
..
   client-history
   validation
   artifacts
   whats-new
   
