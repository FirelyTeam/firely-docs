# [Firely Docs](https://docs.fire.ly/) &middot; [![Documentation Status](https://readthedocs.org/projects/simplifier/badge/?version=latest)](https://docs.fire.ly/)

This is the source code for the Firely documentation site, documenting the Firely FHIR tooling, found at https://docs.fire.ly.

## Subprojects
Some of the tools are documented in separate repositories:
* [Firely .NET SDK](https://github.com/FirelyTeam/firely-docs-firely-net-sdk)
* [Firely Terminal](https://github.com/FirelyTeam/firely-docs-firely-terminal)
* [Forge](https://github.com/FirelyTeam/firely-docs-forge)
* [Simplifier.net](https://github.com/FirelyTeam/firely-docs-simplifier)
* [Firely Server](https://github.com/FirelyTeam/firely-docs-firely-server)

## Contributions
* Contributions most welcome! Just fork the repository, make your changes and send a pull request to our master branch.
* Spot an issue in the documentation? Feel free to [report it in our Github issues](https://github.com/FirelyTeam/firely-docs/issues).

## Building locally
1. Install dependencies: `pip install -r requirements.txt` 
2. Run `./build.bat` for a single build.
3. For autobuild on localhost that updates when files change, install sphinx-autobuild (`pip install sphinx-autobuild`) and run: `./autobuild.bat`

## Adding a new RTD subproject

1. Create empty public repository on Github.com: `firely-docs-PROJECT-NAME`

2. Create empty RTD project: `sphinx-quickstart`

3. Copy from another subproject like https://github.com/firelyTeam/firely-docs-firely-terminal, and don't change just for your subproject to avoid diversion:
  * In root: `build.bat`, `autobuild.bat`, `.gitignore`, `requirements.txt`
  * In root: `README.md` and update it for your project
  * In `_templates`: `breadcrumbs.html` (to customize top page name), `layout.html` (for Firely layout and logo link), `searchbox.html` (for accessibility label on search field)
  * In _static: `css/style.css`, `images/banner.png`

4. In conf.py:
  * Change theme: `html_theme = 'sphinx_rtd_theme'`
  * Set theme options:
  
  ```
  master_doc = 'index'
  html_theme_options = {'navigation_depth': 3}
  ```
  
  * Set intersphinx settings to link to other RTD (sub)projects:
  
  ```
  extensions = ['sphinx.ext.intersphinx']

  intersphinx_mapping = {
      'main_docs': ('https://docs.fire.ly', None),
      }
  ```

5. Create a new project on readthedocs.org with an account with access to the [main project](https://readthedocs.org/projects/simplifier/) based on the new Github repo. Add the Firely Google Analytics code (copied from the main project) under Admin > Advanced Settings.

6. Add the new project as [a Subproject to the main project](https://readthedocs.org/dashboard/simplifier/subprojects/). Note: Choose a pretty Alias/slug (Project-Name) because it will be shown as project name on the search page.

7. Add your project to the `intersphinx_mapping` of the main project and link it in the projects toctree. Note: toctree directive needs full urls and doesn't support intersphinx.

## Best practices

### Making links

The most stable way to refer to (places on) other pages seems to be:
* Put this above where you want to link to:
```
.. _some_unique_tag:
```
* Link to it like so: 
```
:ref:`my link text <some_unique_tag>`
```
* Or, using intersphinx, link to the other repo's page like so:
```
:ref:`my link text <main_docs:some_unique_tag>`
```

This makes sure you can change the file name and location for the source files. It's also easier to search your entire documentation to see if a link is used. (Don't forget to also search all other docs repos to if you're planning to remove an anchor. I put them all in one VS Workspace for this)

### Embedding images

Make sure to give an image a `width` tag. This makes sure it scales nicely and it can be clicked to enlarge.

```
.. image:: images/ForgeProject.png
   :alt: Forge
   :width: 536
```



