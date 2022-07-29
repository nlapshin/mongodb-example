const clientRunner = require('../client')
const dataSets = require('./data-sets')

;(async () => {
  const client = await clientRunner.run()
  const usersCollection = client.db('mytest').collection('users');

  const sets = dataSets.generate(100000)
  await usersCollection.insertMany(sets)


  await client.close()
})()


# mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# Where and how to store data.
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
#  engine:
#  wiredTiger:

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1


# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo

#security:


#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options:

#auditLog:

#snmp:
