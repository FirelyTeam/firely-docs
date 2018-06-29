Finalizing change repository
============================

These are the last two steps for enabling changes.

3. Arrange the Dependency Injection
-----------------------------------

Add the following class to the IServiceCollection::

    services.AddScoped<IResourceChangeRepository, ViSiChangeRepository>();

Arrange support for create, update and delete by adding the corresponding middlewares to the ASP.NET Core pipeline and the right services registrations:

::

    app
        .UseCreate()
        .UseUpdate()
        .UseDelete();

::

    services.AddCreateServices()
            .AddUpdateServices()
            .AddDeleteServices()


4. Indicating support for the interactions
------------------------------------------

In this final step, we have to indicate support for the CUD interactions by adding them to our appsettings file.

#. Open the ``appsettings.json`` file
#. Add the interactions to the ``SupportedInteractions`` section::

    "SupportedInteractions": {
       "InstanceLevelInteractions": "read, update, delete",
       "TypeLevelInteractions": "create, search",
       "WholeSystemInteractions": "capabilities"
    },

Now you can test the interactions, for example try if you can update an existing patient.


The end?
--------
		
This concludes the exercise. Please feel free to try out more options, and ask for help if you get stuck!

The next topic will show you how to integrate :ref:`Access Control<feature_accesscontrol>`.