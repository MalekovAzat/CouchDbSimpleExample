"use strict";

const PouchDb = require("pouchdb-node");

const { generageRandomJson } = require("./createRandomJsonTree");
// const { kcToken } = require("./kcToken");
// const { readArgs } = require("./getCommandLineArguments");

// empty - name of the remote db
writeToRemoteDb({ remote: "http://localhost:5984/empty" });

function writeToRemoteDb({
  remote = `http://localhost:5984/<REMOTE_TABLE_NAME>`,
}) {
  const localDb = PouchDb("RandomName");
  const remoteDb = PouchDb(remote);
  // generate random json 1mb size
  const data = generageRandomJson(8 * 1024 * 1024 * 1, 10, 10);

  localDb.post(data).then(() => {
    localDb.replicate
      .to(remoteDb)
      .on("complete", (info) => {
        console.log("data sync completed");
      })
      .on("error", (error) => {
        // console.log("Replication error", error);
        reject(error);
      });
  });
}
