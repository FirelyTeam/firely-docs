# in your Dockerfile
FROM sphinxdoc/sphinx

WORKDIR /docs
ADD requirements.txt /docs
RUN pip3 install -r requirements.txt

CMD sphinx-build -b html . ./_build/html

#to build this image (note the dot at the end for the current folder): 
#docker build -t firely.azurecr.io/firely/docs-sphinx:latest .