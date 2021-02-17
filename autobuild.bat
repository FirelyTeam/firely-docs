REM You can install sphinx-autobuild using  'pip install sphinx-autobuild'
REM Serving the generated documents on localhost:7000, this can be changed using the --port parameter

sphinx-autobuild -b html --port 7000 . .\_build\html
