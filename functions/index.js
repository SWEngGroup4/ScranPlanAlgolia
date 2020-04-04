// Initialize Algolia, requires installing Algolia dependencies:
// https://www.algolia.com/doc/api-client/javascript/getting-started/#install
//
// App ID and API Key are stored in functions config variables
const functions = require('firebase-functions');
// const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
// admin.initializeApp();

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;

const ALGOLIA_INDEX_NAME_R = 'SCRANPLAN_RECIPES';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

// Update the search index every time a post is written.
exports.onNoteCreatedRecipes = functions.firestore.document('recipes/{noteId}').onCreate((snap, context) => {
  // Get the note document
  const note = snap.data();

  // Add an 'objectID' field which Algolia requires
  note.objectID = context.params.noteId;

  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME_R);
  return index.saveObject(note);
});