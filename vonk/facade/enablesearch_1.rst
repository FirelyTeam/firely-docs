Enable Search
=============

Enabling search involves two major steps:

#. Creating a query based on the bits and pieces in the search url
#. Getting a count and actual data from the database with that query, and map it to a SearchResult

The next paragraphs will walk you through these steps.

1. Create a query
-----------------

Vonk FHIR Facade is meant to be used across all kinds of database paradigms and schemas. Or even against underlying web services or stored procedures.
This means Vonk cannot prescribe the way your query should be expressed. After all, it could be an http call to a webservice, or a json command to MongoDB.

In our case we will build a LINQ query against our ViSi model, that is translated by Entity Framework to a SQL query.
Because this is a quite common case, Vonk provides a basis for it in the package ``Vonk.Facade.Relational``.

* Go back to the NuGet Package Manager Console and run ``Install-Package Vonk.Facade.Relational``

.. note:: If you did this previously for the other Vonk packages, you can install the latest beta release of this package as well by adding
          ``-IncludePrerelease`` to the install command.

Adding classes for the query
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You usually create a query class per ResourceType. The Query object is used to capture the elements of the search that are provided to the QueryFactory.

In this exercise we start with resource type Patient, and will create a ``PatientQuery`` and ``PatientQueryFactory`` class.
Because PatientQuery has no specific content of its own, we will include both in one file.

* Add a new class ``PatientQueryFactory`` to the root of the project
* Add using statements for ``Vonk.Facade.Relational``, ``Microsoft.EntityFrameworkCore``, and ``<your project>.Models``
* Above the actual ``PatientQueryFactory`` class insert the ``PatientQuery`` class::

    public class PatientQuery: RelationalQuery<ViSiPatient>
    {}

* Now flesh out the ``PatientQueryFactory``::

    public class PatientQueryFactory: RelationalQueryFactory<ViSiPatient, PatientQuery>
    {}

Adding a constructor
^^^^^^^^^^^^^^^^^^^^

You have to provide a constructor for the factory class. With this you tell Vonk for which resource type this QueryFactory is valid.
The DbContext is used for retrieving DbSets for related entities, as we will see later::

    public PatientQueryFactory(DbContext onContext) : base("Patient", onContext) { }


Handling the search request
^^^^^^^^^^^^^^^^^^^^^^^^^^^
Each of the searchparameters in the search request triggers a call to the ``Filter`` method. This method takes a
``parameterName`` and ``IFilterValue`` as its arguments.

The ``parameterName`` is the searchparameter as it was used in the search url. This name corresponds with the code field in a SearchParameter resource.
The ``IFilterValue value`` is one of 10 possible implementations, one for each type of SearchParameter. See :ref:`parameter_types`
for a short description of these possibilities.

By default the ``Filter`` method dispatches the call to a suitable overload of ``AddValueFilter``, based on the actual type of the ``value`` parameter.
It is up to you to override the ones you support any parameters for.

* Override the method ``PatientQuery AddValueFilter(string parameterName, TokenValue value)`` to implement support for the ``_id`` parameter, which
  is a token type parameter.

  The ``_id`` parameter must be matched against the ViSiPatient.Id property. So we have to:

  * Parse the Token.Code to an integer (ViSiPatient.Id is of type int)
  * Create a query with a predicate on ViSiPatient.Id.

    This is how:

    .. code-block:: csharp

     if (parameterName == "_id")
     {
         if (!int.TryParse(value.Code, out int patientId))
         {
             throw new ArgumentException("Patient Id must be an integer value.");
         }
         else
         {
             return PredicateQuery(vp => vp.Id == patientId);
         }
     }
     return base.AddValueFilter(parameterName, value);

.. note::
  The ``ArgumentException`` in this code will automatically result in setting the argument status to error, so the Vonk
  server will send a response with an error code and OperationOutcome. See the information about the ``IArgumentCollection``
  and ``IArgument`` classes in :ref:`components_classes`.

That's it for now, we will add support for another parameter later.

.. _parameter_types:

IFilterValue implementations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are 10 possible implementations you can use as value for the IFilterValue parameter in the Query.
The first 7 are the general search parameter types: StringValue, DateTimeValue, TokenValue, NumberValue,
QuantityValue, UriValue and ReferenceValue.

Besides that there are two special values for chaining and reverse chaining:
ReferenceToValue and ReferenceFromValue.

And finally there is a special value for when Vonk does not know the SearchParameter and hence not the type of it:
RawValue.
