Browse existing FHIR resources
============================
Simplifier is a repository for FHIR resources. There are a multitude of resources that are available to the public including profiles, extensions, valuesets, dictionaries, mappings, examples and more. If these resources are listed as public then you can find them here. 

You can browse these resources easily from the Simplifier homepage or search for more specific resources if you know what you are looking for. To search for a specific resource navigate to the search box at the top of the homepage and type the term in the search field. Once you have reached the page with your search results you have options to further filter your results to include or exclude results based on certain parameters. To limit your search results to resources select ``Resources`` from the Search Type options. You can apply other filters such as Resource Categories and Fhir Status here.

.. image:: ./images/Resourcessearch.PNG
  :align: center

Once you have found the resource you are looking for select it to see further details. Within the resource’s page you can view which project that resource is a part of, the type, status (maturity level), versioning, and  different resource views. 

Available views
"""""""""""""""
While viewing resources you can display information in a few different ways.  

Depending on the type of resource, the different views include:

* **Overview** – This is either a preview (e.g. texts) or a Logical view (e.g. profiles) of the resource. The Logical view of a profile includes Element names in the leftmost column followed by Flags, Cardinality, Type, and  Description & Constraints.
* **Narrative** - This is a preview of the narrative part of an example Resource, e.g. a Patient.
* **Details** – This is an easy-to-read list per element of all the details of a profile. The specification refers to this as the dictionary. 
* **Mappings** - This is a list of all the mappings specified in a profile.
* **Table** – This is a simple table view of the resource.
* **XML & JSON** – Respective views of resources in either XML or JSON formatting. 
* **History** – On this tab you can view the difference between two versions of the same profile. This is a great feature for comparing and tracking changes.
* **Issues** - On this tab users with a paid account can track issues. New issues can be created by clicking the ``New issue`` button. The issue list can be filtered on open, closed or your own issues. By clicking on an issue you can read the entire conversation and add a new comment.

Update Resources
""""""""""""""""
When you want to update your resource, there are several ways to do so. Choose one of the following options from the ``Update`` menu at the top of the Resource page:

* **Upload**: Update by uploading a file (either XML or JSON)
* **Fetch**: Update by fetching from a different FHIR server (provide a GET request to the server where your resource is located)
* **Edit**: Update by editing the last version (opens a XML-editor where you can directly edit the XML code of your resource)

Download Resources
""""""""""""""""""
You may also choose to download the resource and save a local copy on your computer. You can either choose to download the resource as a XML or JSON file or directly copy the XML or JSON code of the resource to your clipboard, so you can easily copy-paste it to another location.

