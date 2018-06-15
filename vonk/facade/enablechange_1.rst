Enable changes to the repository
================================

In the previous steps you have created read and search support.
The next part will walk you through enabling create, update and delete support.
This will be done in four steps:

1.	Implement the IResourceChangeRepository;
2.	Map the FHIR resource to our database model;
3.	Arrange the Dependency Injection and configure the ASP.NET Core Pipeline
4.  Indicate support in the appsettings file

1. Implement the IResourceChangeRepository
------------------------------------------

You are going to implement a repository that handles changes to your database. The interface for this is called ``IResourceChangeRepository``, which
can be found in ``Vonk.Core.Repository``.

#. To the Repository folder add a new class ViSiChangeRepository, that implements the IResourceChangeRepository::

    public class ViSiChangeRepository : IResourceChangeRepository

#.  Choose to implement the interface, so the required methods are added to the class.
#.  Just like with the search repository, you will need your DbContext to query on, and the ResourceMapper to perform the mapping of the incoming
    data to your proprietary model.
    So put all of that in the constructor::

        private readonly ViSiContext _visiContext;
        private readonly ResourceMapper _resourceMapper;

        public ViSiChangeRepository(ViSiContext visiContext, ResourceMapper resourceMapper)
        {
            _visiContext = visiContext;
            _resourceMapper = resourceMapper;
        }

Implementing Create
^^^^^^^^^^^^^^^^^^^
		
#.  Now implement the Create method with a switch on resource type, so you can add other resource types later::

       public async Task<IResource> Create(IResource input)
       {
            switch (input.Type)
            {
                case "Patient":
                    return await CreatePatient(input);
                default:
                    throw new NotImplementedException($"ResourceType {input.Type} is not supported.");
            }
        }

#.  As you can see, we have deferred the work to a CreatePatient method, which we also need to implement. This method
    will add the new resource to the collection, and save the changes to the database::

        private async Task<IResource> CreatePatient(IResource input)
        {
            var visiPatient = _resourceMapper.MapViSiPatient(input);

            await _visiContext.Patient.AddAsync(visiPatient);
            await _visiContext.SaveChangesAsync();

            return input;
        }

#.  For the ``Create`` and ``Update`` methods, you will also need to implement the ``NewId`` and ``NewVersion`` methods.
    Since our ViSi repository does not handle versions, we will let that last method return null. For the ``NewId`` method,
    we need to know what the last used id is, and increment this or return 1 when the collection is still empty::

        public string NewId(string resourceType)
        {
            int last_id;

            switch (resourceType)
            {
                case "Patient":
                    try
                    {
                        last_id = _visiContext.Patient.Last().Id;
                        last_id++;
                        return last_id.ToString();
                    }
                    catch (ArgumentNullException)
                    {
                        return "1";
                    }
                default:
                    throw new NotImplementedException($"ResourceType {resourceType} is not supported.");
            }
        }

.. note::

  For the ViSi repository we're using a simple incremental Id field, but you can implement this method any way that's
  useful for your own repository. The public Vonk server for example generates a GUID in this method. 

Implementing Update
^^^^^^^^^^^^^^^^^^^
Implementing the ``Update`` method can be done like the ``Create``, with a switch on resource type, and instead of adding
a resource to the collection, you will update the collection::

        private async Task<IResource> UpdatePatient(ResourceKey original, IResource update)
        {
            var visiPatient = _resourceMapper.MapViSiPatient(update);
			
            try
            {
               _visiContext.Patient.Update(visiPatient);
                await _visiContext.SaveChangesAsync();

                return update;
            }
            catch (Exception ex)
            {
                throw new VonkRepositoryException($"Error on update of {original} to {update.Key()}", ex);
            }
        }

Implementing Delete
^^^^^^^^^^^^^^^^^^^
Deleting a resource from the collection is done by first looking up the corresponding resource, and then removing
it from the collection. Note that in the database used for this exercise cannot process the deletion of the Patient
when there are still related Observations in the BloodPressure table, so we need to remove them as well.

#. First, create a switch on resource type in the main ``Delete`` method again.
#. Implement the ``DeletePatient``::

        private async Task<IResource> DeletePatient(ResourceKey toDelete)
        {
            int toDelete_id = int.Parse(toDelete.ResourceId);
            var visiPatient = _visiContext.Patient.Find(toDelete_id);
            var bpEntries = _visiContext.BloodPressure.Where(bp => bp.PatientId == toDelete_id);
            
            var result = _resourceMapper.MapPatient(visiPatient);

            try
            {
                _visiContext.BloodPressure.RemoveRange(bpEntries);
                _visiContext.Patient.Remove(visiPatient);
                await _visiContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new VonkRepositoryException($"Error on deleting Patient with Id {toDelete_id}", ex);
            }

            return result;
        }

The next steps will finalize the change repository, by implementing the mapping, and adding the correct dependency injection.