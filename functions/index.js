const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Authenticate to Algolia Database.
// TODO: Make sure you configure the `algolia.app_id` and `algolia.api_key` Google Cloud environment variables.
const algoliasearch = require('algoliasearch');
const client = algoliasearch(functions.config().algolia.app_id, functions.config().algolia.api_key);

// Name fo the algolia index for recipes content.
const ALGOLIA_POSTS_INDEX_NAME = 'SCRANPLAN_RECIPES';

// Updates the search index when new recipe entries are created or updated.
exports.indexentry = functions.database.ref('recipes').onWrite(
    async (data, context) => {
      const records = [];
      const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);
      const childKey = data.id;
      const firebaseObject = data.data();

      firebaseObject.objectID = childKey;
      records.push(firebaseObject);

      await index.saveObject(records);
    });