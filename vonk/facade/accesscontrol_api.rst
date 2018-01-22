.. _accesscontrol_api:

=======================================
Access Control in Facade and Components
=======================================

The :ref:`Access Control feature <feature_accesscontrol>` is also available to users of a Vonk FHIR Facade or Vonk FHIR Components. You can use the default implementation based on SMART on FHIR, or provide an implementation of your own.

Default implementation
======================

The default implementation is described in :ref:`feature_accesscontrol`. 
You just have to implement support for the search parameters used in defining the Compartment Filter. If a search parameter that is used for authorization is not implemented, Vonk will respond with a 401 Unauthorized.

Alternative implementation
==========================

The access control engine is programmed using interfaces for which you can provide your own implementation. Because we think the model behind SMART on FHIR covers many cases, these interfaces are loosely modelled after it.
The important interfaces and class are:

.. csv-table:: Access Control interfaces
   :header: "Interface / Class", "Description"
   :widths: 20, 80

   "IAuthorization", "Defines whether your are allowed to read or write a type of resource. Abstraction of the concept of a scope (like user/Observation.read) in SMART"
   "ICompartment", "Confines the user to a compartment, expressed as a combination of a CompartmentDefinition and a search argument. Abstraction of the concept of a launch context (like patient=123) in SMART"
   "IReadAuthorizer", "Calculates access control for a type of resource given an instance of IAuthorization and/or ICompartment"
   "IWriteAuthorizer", "Calculates access control for writing a new (version of a) resource given an instance of IAuthorization and/or ICompartment"
   "AuthorizationResult", "Return value of IReadAuthorizer and IWriteAuthorizer methods. It expresses whether you are authorized at all, and if so - under which conditions. These conditions are expressed as search arguments."

IReadAuthorizer
---------------

Provides two methods to check authorizion for reading types of resources.

* AuthorizeRead
* AuthorizeReadAnyType

The latter is only used if a system wide search is performed, without a _type parameter. In that case it is not efficient to call the first method for every supported resourcetype.

The input of these operations is an IAuthorization and an ICompartment. The result is an AuthorizationResult. With this class you can return:

* simply true or false
* extra search arguments to add to the search query in order to confine the search to those resources the user is allowed to read.

The AuthorizationResult Filters member is a collection of IArgumentCollections. Arguments within a collection will be AND'ed together. Multiple collections will be OR'ed together.

IWriteAuthorizer
----------------

Provides one method to assess whether the user is allowed to write a resource. Input is again IAuthorization and ICompartment, but also IResource - the resource that is to be written - and an Uri called 'serverBase'.
The 'serverBase' parameter is primarily provided because it is required to perform a search on the ISearchRepository interface. 
The IAuthorization instance can be used to decide whether the user is allowed to write resources of the given resourcetype at all.
The ICompartment can be used to search in the database whether the to-be-written resource is linked to the current compartment.
