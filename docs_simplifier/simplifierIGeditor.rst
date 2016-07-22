Implementation Guide Editor
===========================
The Implementation Guide Editor enables you to make implementation guides (IG) using the resources available in Simplifier.
You can include your own project's Resources or those from others in your IG. 
With the help of this Markdown based editor you can easily construct a clear, good-looking and practicable IG. 
An IG can be rendered in two formats, namely: a Two Level Menu and a Tree Table IG. 
This page will elaborate further on how to use the IG editor.

Create your first IG
--------------------

To get to the IG editor go to your portal. To get there, click on your User name on the top right, select ``portal`` and open the ``Implementation Guides`` tab. 
This tab shows your IGs and gives you the option to browse, edit or delete them. 
Click the green button and provide a title to make a new IG. 
After creating a new IG, the IG editor can be opened by clicking the edit button.

IG editing
----------

The IG editor consist of three sections. 
The left section is the IG's tree table which is used to define the outline of your IG. 
The midsection is the actual editor. The right part is a preview of the selected page. 
By way of dragging the section bars you can adjust the size of each section.


Tree table
^^^^^^^^^^

The IG editor opens with the page of the root element. 
This page allows you to adjust the IG's title and select an IG rendering format.
Moving your cursor over the elements in the tree table will bring out icons on the right site. 
These icons are used to edit the tree table and consist of the following functionalities:

- add a base element
- add a child element
- edit element's name
- delete element

The root element has only the 'add a child element' icon. 
The root element name is adjusted by changing the title of the IG. 
Elements can be moved up or down the tree be selecting the element first and pressing the arrow up or arrow down key.

Editor
^^^^^^

The midsection is a Markdown based editor used to compose your IG content. 
Markdown is a text-to-HTML conversion tool. 
It allows you to write using an easy-to-read, easy-to-write plain text format. 
The following link provides an overview of the Markdown features which can be used in this editor: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet.

A short summation of frequently used features:

- Header size with ``#Header size 1`` to ``######Header size 6``
- Emphasis, also know as italics, with ``*asterisks*`` or ``_underscores_``
- Strong emphasis, also known as bold, with ``**asterisks**`` or ``__underscores__``
- Combined emphasis with ``**asterisks``` and ``_underscores_**``
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

The statement is made up of 2 parts, namely: the kind of function and the location of the content in Simplifier. 
The location is based on the name of the project and the name of the resource. 
They can be found in the Simplifier URL after the hostname (``https://simplifier.net/``). 
For example, if you want to include a profile on an Organization, as described at https://simplifier.net/DAF/daf-organization a correct statement would be {{tree:DAF/daf-organization}}. 

The following statements add an index within the IG. 

- {{index:root}}	- gives an index of the entire IG 
- {{index:current}} - gives an index of the current selected element






