.. _feature_hipaa:

HIPAA compliance
================

Vonk is stable, secure HL7 FHIR® server that enables you to comply with the Technical Safeguards of the HIPAA Security Rule.

On this page we will detail how you can achieve compliance for your Vonk deployment. To ensure your organisation's specific usecase, environment, and deployment are compliant, feel free to :ref:`contact us <vonk-contact>`, we'd be happy to help.

.. _hipaa_164.312.a.1:

164.312(a)(1) Standard: Access control
--------------------------------------

   Implement technical policies and procedures for electronic information systems that maintain electronic protected health information to allow access only to those persons or software programs that have been granted access rights as specified in 164.308(a)(4).

There are several ways to approach this:

1. ensure Vonk is deployed in a secure environment where only those with correct permissions are able to access it,
2. use SMART on FHIR as a means of controlling access,
3. or add custom authentication based on a plugin.

Deploying in a secure environment (1) would mean access to Vonk is controlled by third-party software or policy, placing this scenario outside the scope of this guide.

For scenario (2), Vonk implements support for `Smart on FHIR <http://hl7.org/fhir/smart-app-launch/index.html>`_, a sibling specification to FHIR for securely connecting third-party applications to Electronic Health Record data. See :ref:`feature_accesscontrol` on how to configure Vonk with it.

You may also wish to setup custom authentication (3). Given how Vonk is based on a pipeline architecture, you can insert a plugin at the start of the pipeline to call out to your authentication service(s) prior to handling the request. See `this gist <https://gist.github.com/cknaap/e031a4c11b93a4309d691ee4fbdbec8c>`_ as an example.

.. _hipaa_164.312.c.1:

164.312(c)(1) Standard: Integrity
---------------------------------

   Implement policies and procedures to protect electronic protected health information from improper alteration or destruction.

The same solutions apply to this point as :ref:`hipaa_164.312.a.1` and :ref:`hipaa_164.312.b`.

.. _hipaa_164.312.d:

164.312(d) Standard: Person or entity authentication
----------------------------------------------------

   Implement procedures to verify that a person or entity seeking access to electronic protected health information is the one claimed.

The same solutions apply to this point as :ref:`hipaa_164.312.a.1`, see above.

.. _hipaa_164.312.a.2.i:

164.312(a)(2)(i) Unique user identification
-------------------------------------------

   Assign a unique name and/or number for identifying and tracking user identity.

The same solution applies to this point as :ref:`hipaa_164.312.b`, see below.

.. _hipaa_164.312.b:

164.312(b) Standard: Audit controls
-----------------------------------

   Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use electronic protected health information.

With the use of the `Audit Event log <https://fire.ly/products/vonk/plugins/>`_ plugin, Vonk will thoroughly log every interaction as an `AuditEvent <https://www.hl7.org/fhir/auditevent.html>`_ resource, a FHIR resource specially made for this purpose. Logged information will be a trace record of all system activity: viewing, modification, deletion and creation of all Eletronic Protected Health Information (ePHI).

The audit trail will also track user ID, event type, date, and time. 







