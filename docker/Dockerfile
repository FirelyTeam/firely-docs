# in your Dockerfile
FROM sphinxdoc/sphinx
# add requirements for sphinxcontrib-spelling or anything else then remove to keep image small
RUN apt-get update \
 && apt-get install --no-install-recommends -y \
      enchant-2 \
      git \
 && apt-get autoremove \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /docs
ADD requirements.txt /docs
RUN pip3 install -r requirements.txt
CMD sphinx-build -b html . ./_build/html

#to build this image (note the dot at the end for the current folder): 
#docker build -t firely.azurecr.io/firely/docs-sphinx:latest .