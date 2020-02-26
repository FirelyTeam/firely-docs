.. _feature_auditing:

Auditing
========

Vonk can log access through the RESTful API for auditing purposes. It has 2 features:

#. Write requests and responses to a separate audit logfile.
#. Include user id and name from the JWT token (if present) in the audit log lines.

Both features can be enabled by including ``Vonk.Plugins.Audit`` in the pipeline. See :ref:`vonk_plugins_config` for details on how to do that.

Configure where to put the audit log file and the format of its lines in the appsettings (see :ref:`configure_appsettings`)::

   "Audit": {
      "PathFormat": "./audit/AuditLog-{Date}.log"
      "OutputTemplate": "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Application}] [Audit] [Machine: {MachineName}] [ReqId: {RequestId}] [IP-Address: {Ip}] [Connection: {ConnectionId}] [UserId: {UserId}] [UserName: {UserName}] [Path: {Path}] [Action: {Action}] [Resource: {Resource} Key:{ResourceKey}] [StatusCode: {StatusCode}] {NewLine}"
   },

The OutputTemplate listed here contains all the properties that can be logged:

* RequestId: unique id of this request, use this to correlate request and response
* Ip: IP Address of the client
* ConnectionId: use this to correlate requests from the same client
* UserId: user id from the JWT token (if present)
* UserName: user name from the JWT token (if present)
* Path: request url
* Action: interaction that was request (like instance_read or type_search)
* Resource: resourcetype involved
* ResourceKey: key of the resource involved (type/id)
* StatusCode: statuscode of the response at the time of logging (by default '-1' when the request is not handled yet)

For transactions and batches, the audit plugin will write a line for the transaction/batch as a whole *and* one for every entry in the transaction/batch.
