Enable Search
=============

Enabling search involves five major steps:

#. Creating a query based on the bits and pieces in the search url;
#. Getting a count and actual data from the database with that query, and map it to a SearchResult;
#. Get all the dependency injection right
#. Make the searchparameter known to Vonk
#. Configure the ASP.NET Core Pipeline

The next paragraphs will walk you through these steps. At the end of the steps you will find a link to an example solution.

1. Create a query
-----------------

Vonk FHIR Facade is meant to be used across all kinds of database paradigms and schemas. Or even against underlying web services or stored procedures.
This means Vonk cannot prescribe the way your query should be expressed. After all, it could be an http call to a webservice, or a json command to MongoDB.

In our case we will build a LINQ query against our ViSi model, that is translated by Entity Framework to a SQL query.
Because this is a quite common case, Vonk provided a basis for it in the package ``Vonk.Facade.Relational``.

* Go back to the NuGet Package Manager Console and run ``Install-Package Vonk.Facade.Relational -IncludePrerelease``

Adding classes for the query
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You usually create a query-type per ResourceType. The Query object is used to capture the elements of the search that are provided to the QueryFactory.
For each query-type you will need a QueryFactory.

In this exercise we start with resource type Patient, and will create a ``PatientQuery`` and ``PatientQueryFactory`` class. 
Because PatientQuery has no specific content of it's own, we will include both in one file.

* To the Repository folder add a new class ``PatientQueryFactory``
* Above the actual ``PatientQueryFactory`` class insert the ``PatientQuery`` class::

    public class PatientQuery: RelationalQuery<ViSiPatient>
    {}

Now flesh out the ``PatientQueryFactory``::

    public class PatientQueryFactory: RelationalQueryFactory<ViSiPatient, PatientQuery>
    {}

Adding a constructor
^^^^^^^^^^^^^^^^^^^^

You have to provide a constructor for the factory class. With this you tell Vonk for which resource type this QueryFactory is valid. 
The DbContext is used for retrieving DbSets for related entities, as we will see later.::

    public PatientQueryFactory(DbContext onContext) : base("Patient", onContext) { }


Each of the searchparameters in the search results in a call to the ``Filter`` method::

    public virtual PatientQuery Filter(string parameterName, IFilterValue value)
    {}

The ``parametername`` is the name of the SearchParameter (or technically the code) as it was used in the search url.
The ``IFilterValue value`` is one of 10 possible implementations, one for each type of SearchParameter. See :ref:`parameter_types`
for a short description of these possibilities.
 
By default the ``Filter`` method dispatches the call to a suitable overload of ``AddValueFilter``, based on the actual type of the ``value`` parameter.
It is up to you to override the ones you support any parameters for.

* Override the method ``PatientQuery AddValueFilter(string parameterName, TokenValue value)`` to implement support for the ``_id`` parameter.

   #. Token search is by default on the whole code. ``_id`` is a special parameter that never has a system specified.
      The ``_id`` parameter must be matched against the ViSiPatient.Id property. So we have to:

      * Parse the Token.Code to a long (ViSiPatient.Id is of type long)
      * Create a query with a predicate on ViSiPatient.Id.

   This is how::

      if (parameterName == "_id")
      {
                if (!long.TryParse(value.Code, out long patientId))
                {
                    throw new ArgumentException("Patient Id must be an integer value.");
                }
                else
                {
                    return PredicateQuery(vp => vp.Id == patientId);
                }
      }
      return base.AddValueFilter(parameterName, value);


That's it for now with creating a Query, we will add support for another parameter later.

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

