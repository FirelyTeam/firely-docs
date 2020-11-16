
Special initializers
--------------------
As you can see from the example in the previous paragraph with the ``FhirDateTime`` or
``FhirBoolean``, for several data types, the SDK provides you with extra initialization methods.
Visual Studio's IntelliSense will help you to view the possibilities while you type, or you can take
a look at ``Hl7.Fhir.Model`` with the Object Browser to view the methods, plus their attributes as well.

For the ``HumanName`` data type, the SDK has added some methods to make it easier to construct a
name in one go, using fluent notation:

.. code-block:: csharp

	pat.Name.Add(new HumanName().WithGiven("Christopher").WithGiven("C.H.").AndFamily("Parks"));

If you need to fill in more than the ``Given`` and ``Family`` fields, you could first construct
a ``HumanName`` instance in this manner, and add to the fields later on. Or you could choose not
to use this notation, but instead fill in all the fields the way it was explained in the other
paragraphs.
