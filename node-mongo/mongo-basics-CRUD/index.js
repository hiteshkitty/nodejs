const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const operations = require('./operations.js');
const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    // collection.insertOne({"name": "Uthappizza", "description": "test"},
    // (err, result) => {
    //     assert.equal(err,null);

    //     console.log("After Insert:\n");
    //     console.log(result.ops);

    //     collection.find({}).toArray((err, docs) => {
    //         assert.equal(err,null);
            
    //         console.log("Found:\n");
    //         console.log(docs);

    //         db.dropCollection("dishes", (err, result) => {
    //             assert.equal(err,null);

    //             client.close();
    //         });
    //     });
    // });

    dishCollection = {"name" : "Raghav", "description":"sweet"};
    operations.insertDocument(db, dishCollection, "dishes" , (result)=> {
        console.log("inserted document: " + result.ops);

        operations.findDocuments(db, "dishes", (result) => {
            console.log("find documents: " + result);

            operations.updateDocument(db, { name: "Raghav" },
                    { description: "soo sweet" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        operations.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
                    });
        });


    });
});