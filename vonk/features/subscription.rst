.. _feature_subscription:

Subscriptions
=============

Subscriptions can be managed in the :ref:`administration_api`, on the ``/administration/Subscription`` endpoint. If you post a Subscription
to the regular FHIR endpoint, it will be stored but not evaluated. Subscriptions posted to the
``/administration`` endpoint will be processed and evaluated for each POST/PUT to the server.

Vonk currently only supports Subscriptions with a Channel of type rest-hook.

If you are :ref:`not permitted <configure_administration_access>` to access the /Subscription endpoint, Vonk will return statuscode 403.

See `Subscriptions in the specification <http://www.hl7.org/implement/standards/fhir/subscription.html>`_ for more background on Subscriptions.

FHIR versions
-------------

You POST a Subscription with a fhirVersion parameter (see :ref:`feature_multiversion`). It will then respond to changes on resources *in that FHIR version*.
So if you need a Subscription on both STU3 and R4 resources, POST that Subscription for both FHIR versions.

.. _subscription_configure:

Configuration
-------------
Vonk evaluates the active Subscriptions periodically, and in batches (x at a time, until all the active Subscriptions have been evaluated).
You can control the period and the batchsize.

::

    "SubscriptionEvaluatorOptions": {
        "Enabled" : true
        "RepeatPeriod": 20000,
        "SubscriptionBatchSize" : 1
    },

* ``Enabled`` allows you to quickly enable or disable the evaluation of Subscriptions. Default value is 'false', which implies that Subscription evaluation is also off if this section is left out of the settings.
* ``RepeatPeriod`` is expressed in milliseconds. In the example above the period is set to 20 seconds, meaning that after a change a subscriber will be notified in at most 20 seconds.
* ``SubscriptionBatchSize`` is expressed in number of Subscriptions that is retrieved and evaluated at once. Default is 1, but you can set it higher if you have a lot of Subscriptions.
