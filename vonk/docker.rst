.. _use_docker:

====================
Using Vonk on Docker
====================

We have created a Docker image for Vonk, so you can run the server in any environment that supports Docker. For this section we
assume you have Docker installed on your system. If you want to install Docker for Windows, please read :ref:`docker_win` for specific
installation details.

.. _getting_started_docker:

Getting started
---------------

Before you can run Vonk, you will need to pull the Docker Vonk container and request a license.

1. Open your favourite command line tool and execute this command:
   ``> docker pull simplifier/vonk``

2. Go to the `Simplifier website <https://simplifier.net>`_, login and download your evaluation license.

3. Create a working directory for Vonk and place the license file there.


Running a Docker Vonk in Memory mode
------------------------------------

The easiest way to run a Docker Vonk container is to run Vonk in memory repository mode. This is also the default mode.

Open your command prompt and execute this command:
``> docker images simplifier/vonk``

You will get a list that looks like:

.. image:: ./images/docker1.PNG

Navigate to your working directory for Vonk and run the container with this command:

- in cmd.exe: ``docker run -d -p 8080:4080 --name vonk.server -v %CD%:/app/license -e "VONK_LicenseFile=./license/vonk-trial-license.json" simplifier/vonk``

- in Powershell: ``docker run -d -p 8080:4080 --name vonk.server -v ${PWD}:/app/license -e "VONK_LicenseFile=./license/vonk-trial-license.json" simplifier/vonk``

If your license file has a different name, use that name instead of ``vonk-trial-license`` in the command above.

.. important:: It looks like the command wants to retrieve your license file from a subdirectory called ``license``. This is a result
  of docker copying your file before spinning the image. You should **not** create the subdirectory. Just keep the license file in the root
  of your working directory.

This will spin up a Vonk container. It maps the host port 8080 to the container port 4080 with the switch ``-p 8080:4080``. It will give the
container the name vonk.server with the switch ``--name vonk.server``.
Furthermore it mounts the current directory (where the license file resides) from the host to the container. Also it passes an environment
variable ``VONK_LicenseFile`` to the container with the switch ``-e``.
In this example the license file is called vonk-trial-license.json. At last it will run the container in background mode with the switch ``-d``.

To test whether the container is running correctly, type the command:|br|
``> docker ps``

.. image:: ./images/docker2.PNG

You can also take a look at the logs for Vonk with:|br|
``> docker logs vonk.server``

Open a browser and use the address ``http://localhost:8080/``. This will show the landing page of Vonk.

To stop the container just type:|br|
``> docker stop vonk.server``
|br| And to start it again:|br|
``> docker start vonk.server``
|br| To completely remove the container:|br|
``> docker rm vonk.server``

Spinning with a docker-compose file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Another way to spin up a Vonk container is to use a docker-compose file. The above example can also be established by the following ``docker-compose.memory.yml``:

.. code-block:: yaml
   :linenos:

   version: '3'

   services:

     vonk-web:
       image: simplifier/vonk
       ports:
         - "8080:4080"
       environment:
         - VONK_Repository=Memory
         - VONK_LicenseFile=./license/vonk-trial-license.json
       volumes:
         - .:/app/license


Save the text above to a file in your working directory with the name ``docker-compose.memory.yml`` and then run the following command: |br|
``> docker-compose -f docker-compose.memory.yml up -d``

If your license file has a different name, use that name instead of ``vonk-trial-license`` in the text above.

.. image:: ./images/docker3.PNG

To stop the container, run: |br|
``> docker-compose -f docker-compose.memory.yml down``


Running Docker with a SQL Server container
------------------------------------------

Vonk can use also other repositories than Memory, for example SQL Server. This section describes how to spin up a Vonk container and a SQL Server container.
We will use docker-compose to achieve this.

.. warning:: SQL Server container uses at least 3.25 GB of RAM. Make sure to assign enough memory to the Docker VM if you're running on Docker for Mac or Windows.

.. code-block:: yaml
   :linenos:

   version: '3'

   services:
 
     vonk-web:
       image: simplifier/vonk
       ports:
         - "8080:4080"
       environment:
         - VONK_Repository=SQL
         - VONK_SqlDbOptions:ConnectionString=Initial Catalog=VonkStu3;Data Source=vonk-sqlserver-db,1433;User ID=vonk;Password=Tester01
         - VONK_SqlDbOptions:SchemaName=vonk
         - VONK_LicenseFile=./license/vonk-trial-license.json
       volumes:
         - .:/app/license
         - script-volume:/app/data
 
     vonk-sqlserver-db:
       image: microsoft/mssql-server-linux
       ports:
         - "1433:1433"
       environment:
         - ACCEPT_EULA=Y
         - SA_PASSWORD=SQLServerStrong(!)Password*
         - dbName=VonkStu3
         - dbPath=/var/opt/mssql/data/
         - dbUsername=vonk
         - dbPassword=Tester01
       volumes:
         - script-volume:/app/data
       command: bash -c "sleep 10 && cat /app/data/install_vonkdb.sh | tr -d '\r' | sh &  /opt/mssql/bin/sqlservr.sh"
 
   volumes:
     script-volume:
	  
Save the text above to a file in your working directory with the name ``docker-compose.mssqlserver.yaml``. Make sure your Vonk license file is named
``vonk-trial-license.json`` and is residing in your working directory (see :ref:`getting_started_docker` on how to obtain the license). 
If your license file has a different name, use that name instead of ``vonk-trial-license`` in the text above.


Adjust the ``docker-compose.mssqlserver.yaml`` file:

* On line 11 change ``User ID`` and ``Password`` to match your credentials.
* Do the same for ``dbUsername`` and ``dbPassword`` on line 27 and 28.

Then use this command to spin up a Vonk container and SQL container: |br|
``> docker-compose -f docker-compose.mssqlserver.yaml up -d``

Open a browser and use the address ``http://localhost:8080/``. This will show the landing page of Vonk.

.. warning:: Wait for about 2 minutes, because it takes a while to fire up the SQL container

Running Docker with a SQL Server on host
----------------------------------------

Another possibility is to run a Vonk container with a SQL Server repository on the host. You will need a Microsoft SQL Server running on your host.
The version of SQL Server must at least be version 2012.

To run the Vonk container we will use the following docker-compose file:

.. code-block:: yaml
   :linenos:

   version: '3'
 
   services:
	 
     vonk-web:
       image: simplifier/vonk
       ports:
         - "8080:4080"
       environment:
         - VONK_Repository=SQL
         - VONK_SqlDbOptions:ConnectionString=Initial Catalog=VonkStu3;Data Source=my_host\sql2016;User ID=vonk;Password=Tester01
         - VONK_SqlDbOptions:SchemaName=vonk
         - VONK_LicenseFile=./license/vonk-trial-license.json
		volumes:
         - .:/app/license
		extra_hosts:
         - "my_host:192.0.2.1"

Save the text above to a file in your working directory with the name ``docker-compose.mssqlserver_host.yml``. Before we spin up the container we have
to adjust the ``docker-compose.mssqlserver_host.yml``:

* On line 11 the connection string to the database server is stated. Change the ``Data Source`` to your database server. In this exampe we are using a
  named instance ``sql2016`` on the host ``my_host``.
* Also change the ``User ID`` and ``Password`` on line 11 to your credentials.
* Furthermore we have to tell Docker which IP address the host uses. This is done on line 17.
  In this case the host (named my_host) uses IP address 192.0.2.1. Change this to the appropriate address.

After saving your settings, make sure your Vonk license file is named ``vonk-trial-license.json`` and is residing in your working directory
(see :ref:`getting_started_docker` on how to obtain the license). Or use the name of your license file instead of ``vonk-trial-license`` in the text above.

You can run the Vonk container as follows: |br|
``> docker-compose -f docker-compose.mssqlserver_host.yaml up -d``

We have to create the Vonk database on the host. For this we need two SQL scripts which are located in the Vonk container. Perform the following commands
in the working directory to copy the scripts and execute them on your local SQL server::

  > docker cp vonk_vonk-web_1:/app/data ./scripts
  > cd scripts
  > sqlcmd -S my_host\sql2016 -d master -v dbName = VonkSTU3 dbPath= "C:\Program Files\Microsoft SQL Server\MSSQL13.SQL2016\MSSQL\DATA\" -i 01-CreateDatabaseAndSchema.sql
  > sqlcmd -S my_host\sql2016 -d master -v dbName = VonkSTU3 dbUsername = vonk dbPassword = Tester01  -i 02-CreateDBUser.sql

You might want to change the ``dbPath`` and provide the sqlcmd user (SA) credentials with the parameters ``-U`` and ``-P``.

Open a browser and use the address http://localhost:8080/. This will show the landing page of Vonk.

.. warning:: When you have a firewall installed on your host machine, it can block traffic from your Vonk container to your host.
	Provide an inbound rule to allow traffic from the container to the host.

Run Docker with a MongoDB container
-----------------------------------

This section describes how to spin up a Vonk container and a MongoDB container using a docker-compose. We assume you already have MongoDB installed.

.. code-block:: yaml
   :linenos:

   version: '3'
	 
   services:
	 
     vonk-web:
       image: simplifier/vonk
       environment:
         - VONK_Repository=MongoDb
         - VONK_MongoDbOptions:ConnectionString=mongodb://vonk-mongo-db/vonkstu3
         - VONK_MongoDbOptions:EntryCollection=vonkentries
         - VONK_LicenseFile=./license/vonk-trial-license.json
       volumes:
         - .:/app/license
       ports:
         - "8080:4080"
	 
     vonk-mongo-db:
       image: mongo

Save the text above to a file in your working directory with the name ``docker-compose.mongodb.yml``. Make sure your Vonk license file is named ``vonk-trial-license.json``
and is residing in your working directory (see :ref:`getting_started_docker` on how to obtain the license).
If your license file has a different name, use that name instead of ``vonk-trial-license`` in the text above.


Use this command to spin up a Vonk container and MongoDB container: |br|
``> docker-compose -f docker-compose.mongodb.yml up -d``

Open a browser and use the address http://localhost:8080/. This will show the landing page of Vonk.



.. |br| raw:: html

   <br />
