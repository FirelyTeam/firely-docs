
This is the second step for enabling search.

2. Get the data and map to FHIR
-------------------------------

Getting the data happens in the implementation of the ``ISearchRepository``. It has only one method, ``Search``. 
The Vonk.Facade.Relational package has an abstract implementation of it that you can use as a starting point. 
This implementation assumes that you can support searching for exactly one ResourceType at a time.
Then the gist of the implementation is to switch the querying based on the ResourceType. The querying itself then looks pretty much the same for every type of resource.

#. Implement the new class ViSiRepository in the folder Repository::

    public class ViSiRepository : SearchRepository

#. You have to provide a constructor that gets a ``QueryBuilderContext``. We'll get to that later. 
   Apart from that you will need your DbContext to query on, and the ResourceMapper to perform the mapping of the results.
   So put all of that in the constructor::

        private readonly ViSiContext _visiContext;
        private readonly ResourceMapper _resourceMapper;

        public ViSiRepository(QueryContext queryContext, ViSiContext visiContext, ResourceMapper resourceMapper) : base(queryContext)
        {
            _visiContext = visiContext;
            _resourceMapper = resourceMapper;
        }

#. The method ``ISearchRepository.Search(IArgumentCollection arguments, SearchOptions options)`` of the interface is already implemented and finds out whether the arguments specify exactly one ResourceType.
   It then calls the abstract method ``Task<SearchResult> Search(string resourceType, IArgumentCollection arguments, SearchOptions options)`` that you have to implement. 
   
   #. Let's inspect the parameters:
   
      #. resourceType: The ResourceType that is being searched for, e.g. Patient in ``<vonk-endpoint>/Patient?...``
      #. arguments: All the arguments provided in the search, whether they come from the path (like 'Patient'), the querystring (after the '?'), the headers or the body. Usually you don't have to inspect these yourself.
      #. options: A few hints on how the query should be executed: are deleted or contained resources allowed etc. Usually you just pass these on as well.

   #. The pattern of the implementation is:

      #. switch on the resourceType
      #. dispatch to a method for querying for that resourceType

   #. For us that will be::

        protected override async Task<SearchResult> Search(string resourceType, IArgumentCollection arguments, SearchOptions options)
        {
            switch (resourceType)
            {
                case "Patient":
                    return await SearchPatient(arguments, options);
                default:
                    throw new NotImplementedException($"ResourceType {resourceType} is not supported.");
            }
        }

        Of course we do this async, since in a web application you should never block a thread while waiting for the database.

#. Now we moved the problem to ``SearchPatient``. The pattern here is:

   #. Create a query - a PatientQuery in this case.
   #. Execute the query against the DbContext (our _visiContext) to get a count of matches.
   #. Execute the query against the DbContext to get the current page of results.
   #. Map the results using the _resourceMapper

#. The implementation of this looks like::

        private async Task<SearchResult> SearchPatient(IArgumentCollection arguments, SearchOptions options)
        {
            var query = _queryContext.CreateQuery(new PatientQueryFactory(_visiContext), arguments, options);

			var count = await query.ExecuteCount(_visiContext);
            var patientResources = new List<IResource>();

            if (count > 0)
            {
                var visiPatients = await query.Execute(_visiContext).ToListAsync();

                foreach (var visiPatient in visiPatients)
                {
                    patientResources.Add(_resourceMapper.MapPatient(visiPatient));
                }
            }
            return new SearchResult(patientResources, query.GetPageSize(), count);
        }

#. What happens behind the scenes is that the QueryBuilderContext creates a QueryBuilder that analyzes all the arguments and options, and translates that into calls into your PatientQueryFactory.
   This pattern offers maximum assistance in processing the search, but also gives you full control over the raw arguments in case you need that for anything.
   Any argument that is reported as in Error, or not handled will automatically show up in the OperationOutcome.

