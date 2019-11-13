.. _running_transforms:

Running transformations
=======================

Once your transforms are setup (:ref:`setup_transforms`), you can run your data conversion!

To do so, ``POST http(s)://<vonk-endpoint>/StructureMap/<logical id>`` with content to transform as the resource body. Make sure to set the ``Content-Type`` to either ``application/json`` or ``application/xml`` accordingly.
