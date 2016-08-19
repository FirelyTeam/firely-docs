Implementation Guide Editor
===========================
The Implementation Guide Editor enables you to make implementation guides (IG) using the resources available in Simplifier.
You can include your own project's Resources or those from others in your IG. 
With the help of this Markdown based editor you can easily construct an organized and practical IG that is both easy to read and navigate. 

This page will elaborate further on getting started and how you can use the IG editor.

Create your first IG
--------------------
You can access the IG editor via the Portal in your Simplifier account. To get there, log in to Simplifier and open the ``Implementation Guides`` tab in your ``Portal page``. This tab allows access to create IGs and edit existing IGs. To create a new IG click the green button ``+New Implementation Guide`` and provide a title for the IG. After creating a new IG, the IG editor can be opened by clicking the edit button. You also have the option to Browse or Delete your existing IGs. 

Editing an IG
-------------
The IG editor consist of three sections. 
The left section is the IG's tree table which is used to define the outline of your IG and navigate between the pages of the IG. The middle section is the actual editor. This is where you will add and edit content. 
The right section is a preview of the selected page. 
By way of dragging the section bars you can adjust the size of each section to customize your view.

Tree table
^^^^^^^^^^

The IG editor opens in the page of the root element. 
This page allows you to adjust the IG's title and select an IG rendering format. An IG can be rendered in two formats: a Two Level Menu format and a Tree Table format. 

A Two Level Menu rendering will display your IG with the elements in tabs along the top of the page.

.. image:: http://i32.photobucket.com/albums/d41/sdfgsdg1asdj/5.IGblog_zps3cloxvdy.png


A Tree table rendering will display your IG with the elements in a format similar to the tree table with the elements and their hierarchy along the left side of the page.

.. image:: http://i32.photobucket.com/albums/d41/sdfgsdg1asdj/0c898a190d7241b9a4e48e739a87af8f_zpszdeyzndo.jpg


Hovering your cursor over the elements in the tree table will display icons on the right site. 
These icons are used to edit the tree table and consist of the following functionalities:

- add a base element
- add a child element
- edit element's name
- delete an element

The root element has only the 'add a child element' icon. 
The root element name is adjusted by changing the title of the IG. 
Elements can be moved up or down the tree be selecting the element first and pressing the arrow up or arrow down key.

Markdown 
^^^^^^^^

In the middle section is a Markdown based editor used to compose your IG content. 
Markdown is a text-to-HTML conversion tool. 
It allows you to write using an easy-to-read, easy-to-write plain text format. 
The following link provides an overview of the Markdown features which can be used in this editor: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet.

A short summary of frequently used features are as follows:

- Header size edits using ``#Header size 1`` to ``######Header size 6``
- Adding Emphasis, also know as italics, with ``*asterisks*`` or ``_underscores_``
- Adding Strong emphasis, also known as bold, with ``**asterisks**`` or ``__underscores__``
- Adding Combined emphasis with ``**asterisks``` and ``_underscores_**``
- Strikethrough uses two tildes. ``~~Scratch this.~~``

IG editor features
------------------

The IG editor has features which allow you to include Simplifier content in your IG. 
These features work by using the statements written below in the editor. 
After adding these statements in the editor refresh the page, by pressing Crtl + Enter or clicking the Refresh button, to make them visible in the preview section. 

- {{tree:ProjectName/ResourceName}}		    - renders a tree structure as seen in the resource overview tab
- {{table:ProjectName/ResourceName}}		- renders a table as seen in the resource table tab
- {{structure:ProjectName/ResourceName}}	- renders the resource in a newly defined tree (unfinished)
- {{link:ProjectName/ResourceName}}			- provides a link to the specific resource page on Simplifier
- {{namingsystems:ProjectName}}				- lists all namespaces of a project in a table

The statement is made up of 2 parts: the kind of function and the location of the content in Simplifier. 
The location is based on the name of the project and the name of the resource. 
They can be found in the Simplifier URL after the hostname (``https://simplifier.net/``). 
For example, if you want to include a profile on an Organization, as described at https://simplifier.net/DAF/daf-organization a correct statement would be {{tree:DAF/daf-organization}}. 

The following statements add an index within the IG. 

- {{index:root}}	- gives an index of the entire IG 
- {{index:current}} - gives an index of the current selected element

