const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const firebase = require('firebase-admin');
var serviceAccount = require('/mnt/c/Users/Nathan/Documents/Developer/ScranPlanAlgolia/AccountKey.json');


// load values from the .env file in this directory into process.env
dotenv.config();

// configure firebase
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    // apiKey: process.env.FIREBASE_API_KEY,
    // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
});

console.log(firebase.app().name);  // '[DEFAULT]'

const db = firebase.firestore();

console.log(db.name);

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME_U);

var docRef = db.collection(process.env.FIREBASE_U);
const records = [];

db.collection(process.env.FIREBASE_U).get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            // get the key and data from the snapshot
            const childKey = doc.id;
            const childData = {
                objectID: doc.id,
                displayName: doc.get("displayName"),
                email: doc.get("email"),
                imageURL: doc.get("imageURL")
            };
            // We set the Algolia objectID as the Firebase .key
            // childData.objectID = childKey;
            // Add object for indexing
            records.push(childData);
            console.log(doc.id, '=>', childData);
        });
        // Add or update new objects
        index.saveObjects(records).then(() => {
            console.log('Documents imported into Algolia');
            process.exit(0);
        })
        .catch(error => {
            console.error('Error when importing documents into Algolia', error);
            process.exit(1);
        });
    })
    .catch((err) => {
        console.error('Error getting documents', error);
    });