Finalizing search
=================

In the previous steps you have created search support for the _id parameter on a Patient resource type.

Add support for the ViSiBloodPressure Observations
--------------------------------------------------

Follow similar steps as above to support ViSiBloodPressure:

#. Add a mapping method in the ResourceMapper class to map from a 
   ViSiBloodPressure to an IResource.
#. Create a BloodPressureQuery query class.
#. Add a BPQueryFactory extending ``RelationalQueryFactory<ViSiBloodPressure, BloodPressureQuery>``.
#. Implement support for the ``_id`` parameter by overriding ``public virtual BloodPressureQuery AddValueFilter(string parameterName, TokenValue value)``.
#. Add support for the Observation resource type in the ``Startup`` class, ``ConfigureServices`` method, by sending the resource name as a parameter to the ``AllowResourceTypes`` call.

Add support for chaining
^^^^^^^^^^^^^^^^^^^^^^^^
To add support for searching on ``Observation?subject:Patient._id`` we need to override the ``AddValueFilter`` 
overload receiving a ``ReferenceToValue`` parameter in the query factory for BloodPressure (BPQueryFactory). 

The ``ReferenceToValue`` type contains the possible ``Targets`` for the chain search parameter as parsed from the query string.
We are currently interested only on the Patient type so we can restrict the implementation to that target.
The ``ReferenceToValue`` type also has an extension method ``CreateQuery`` that expects an implementation of the ``RelationalQueryFactory`` 
of the referenced target. This will generate the query to obtain the resources referenced by it.

Searching on chained parameters involves the following steps:

    #. Retrieve all patients ids based on the chained parameter. 
       You can use the ``ReferenceToValue.CreateQuery`` extension method 
       to get the query and run the query with its ``Execute`` method.
    #. Create a  ``PredicateQuery`` with the condition that ``ViSiBloodPressure.PatientId`` is included in the ids retrieved at the previous step.

        The final code should look similar to this:

        ::

            public override BloodPressureQuery AddValueFilter(string parameterName, ReferenceToValue value)
            {
                if (parameterName == "subject" && value.Targets.Contains("Patient"))
                {
                    var patientQuery = value.CreateQuery(new PatientQueryFactory(OnContext));
                    var patIds = patientQuery.Execute(OnContext).Select(p => p.Id);

                    return PredicateQuery(bp => patIds.Contains(bp.PatientId));
                }
                return base.AddValueFilter(parameterName, value);
            }

    #. Load the definition for the ``Observation.subject`` search parameter in Vonk similar to how we did it for ``_id``. Check :ref:`addSearchParameters`.

At this point you should be able to search for ``GET http://localhost:5017/Observation?subject:Patient._id=1``

Add support for reverse chaining
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Adding support for ``Patient?_has:Observation:subject:_id=1`` is similar. You just need to use the  ``AddValueFilter`` 
overload receiving a ``ReferenceFromValue``. 

The ``ReferenceFromValue`` type has a ``Source`` property filled in with the source of the search parameter. It also has an extension method ``CreateQuery`` that given the corresponding ``RelationalQueryFactory`` implementation can generate 
the query to obtain resources referenced by the reverse chaining.

So you can add reverse chaining with the following code:

::

    public override PatientQuery AddValueFilter(string parameterName, ReferenceFromValue value)
    {
        if (parameterName == "subject" && value.Source == "Observation")
        {
            var obsQuery = value.CreateQuery(new BPQueryFactory(OnContext));
            var obsIds = obsQuery.Execute(OnContext).Select(bp => bp.PatientId);

            return PredicateQuery(p => obsIds.Contains(p.Id));
        }
        return base.AddValueFilter(parameterName, value);
    }

Now you can test reverse chaining works: ``http://localhost:5017/Patient?_has:Observation:subject:_id=1``

Get the goodies
---------------
At this point you get out of the box support for ``_include``, ``_revinclude`` and combinations of search parameters.
You can test the following scenarios:

#. ``_include``: ``http://localhost:5017/Observation?_include=Observation:subject``
#. ``_revinclude``: ``http://localhost:5017/Patient?_revinclude=Observation:subject``
#. combinations of the above

Also you get support for read and validation by just adding the corresponding middlewares to the ASP.NET Core pipeline and the right services registrations:

::

    app
        .UseRead()
        .UseValidation()
        .UseInstanceValidation();


::

    services
        .AddReadServices()
        .AddInstanceValidationServices()
        .AddValidationServices()

The end?
--------
		
This concludes the exercise. Please feel free to try out more options, and ask for help if you get stuck!

The next topic will show you how to enable :ref:`Create, Update and Delete<enablechange>` interactions.