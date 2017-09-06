=============
Release notes
=============

0.92.5 (DSTU2) / 0.93.5 (STU3) - released 20170907
------------------

Changes to both versions:

- Changed the ``IElementNavigator`` interface to enable skipping directly to a child with a given name, thus increasing navigation performance 
- Improved performance of validation and fhirpath for POCOs
- Split off ``IFhirClient`` interface from the ``FhirClient`` implementation (primarily for testing/mocking)
- Many smaller bugfixes
- Improved error messages produced by the validator based on input from the NHS UK
- The validator will now let you put a constraint on children of ``Resource.contained``, ``Bundle.entry.resource`` and similar nested resources.
- ``SerializationUtil.XmlReaderFromString()`` will no longer try to seek the stream passed in and rewind it.
- ``TransactionBuilder`` now has a (default) argument to specify the type of Bundle to build. Thanks mbaltus!
- ``DirectorySource`` now has Include/Exclude patterns (with globs) to have more control over directory scans for resource files.
- ``DirectorySource`` now supports processing conformance resources in json
- ``FhirClient`` now has async support
- You can now have ``List<>`` properties (like Extensions and other repeating elements) with null elements - these will simply be ignored and not serialized. Thanks wdebeau1!
- Made date to string and string to date conversion more consistent, fixing problems with locales using something else than ':' for time separators.
- Fixed an error where the ``If-None-Exists`` header included the base url of the server. Thanks angusmiller+tstolker!
- All ``Search()`` overloads on ``FhirClient`` now also have a ``reverseInclude`` parameter
- Update with a conditional would not set the ``If-Match`` header when doing a version-aware update. Thanks tstolker!
- ``DeepCopy()`` did not actually deep-copy collections - if you changed the original collection before you iterated over the clone, you would see the changes. This has been fixed. Thanks mattiasflodin!
- Client would not pass on 1xx and 3xx errors to client, instead throwing a generic ``NotSupported`` exception, making it harder to handle these errors by the client. Thanks tstolker!
- Added a fall-back terminology service so the validator can now invoke an external terminology service if the local in-memory service (provided with the API)  fails.
- You can now specify a binding on an Extension, which translates to a binding on ``Extension.value[x]``
- Fixed a bug where -if the definition of ``element[x]`` had a binding and a choice of bindeable and non-bindeable types- the validator would complain if the instance was actually a non-bindeable type.
- BREAKING: ``FhirClientOperation.Operation`` has been renamed to ``RestOperation``
- BREAKING: Revision of calls to terminology services to support all parameters and overloads
- Validation across references will now include the path of the referring resource in errors about the referred resource to make interpretation of the outcomes easier.
- FhirPath's ``resolve()`` now actually works, and will resolve contained/bundled resources in the instance under evaluation. This also means the FhirPath evaluator will now take an EvaluationContext in which you can pass your resolver over to the evaluator.
- The enums in the generated code now also have an attribute on them with information about the codesystem, which can be retrieved using ``GetSystem()`` on any enum. Thanks brianpos!
- Added a few specific ``[Serializable]`` attributes to make the POCOs serializable with the Microsoft Orleans serializer. Thanks alexmarchis!
- Several improvements & bug fixes on the SnapshotGenerator

Changes to the DSTU2 version:

* Fixed small errors in the generated ``ConstraintComponent`` properties, giving more correct validation results

Changes to the STU3 version:

* Fixes to the snapshot generator to create better ``ElementDefinition`` ids
* ``_sort`` parameter now uses STU3 format ``(_sort=a,-b,c)`` instead of modifier
* You can now set the preferred return to ``OperationOutcome``. Thanks cknaap!
* You can now request the server to notify the client about unsupported search parameters. Thanks tstolker!
