This dockerfile defines the firely/docs-sphinx image.
Should the firely docs need more dependencies, add them to requirements.txt and rebuild the image.

`docker build -t firely.azurecr.io/firely/docs-sphinx:latest .`

Then login to our private container registry on Azure. For login credentials ask Marco or Christiaan. If you have access to our Azure portal already, you can find it yourself. Look for the 'firely' Container Registry, and then its 'Access keys'.

`docker login firely.azurecr.io`

Then push the new image:

`docker push firely.azurecr.io/firely/docs-sphinx:latest`

To just *use* the image:

- login to firely.azurecr.io, see above
- pull the image: `docker pull firely.azurecr.io/firely/docs-sphinx`

At least the `firely-docs-firely-server` repo has a handy Powershell script [build-in-docker.ps1](https://github.com/FirelyTeam/firely-docs-firely-server/blob/master/build-in-docker.ps1) to run the build using this container.