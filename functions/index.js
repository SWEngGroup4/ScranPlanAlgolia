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
const ALGOLIA_INDEX_NAME_P = 'SCRANPLAN_POSTS';
const ALGOLIA_INDEX_NAME_U = 'SCRANPLAN_USERS';

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

// Update the search index every time a recipe is written.
exports.onNoteCreatedRecipes = functions.firestore.document('recipes/{noteId}').onCreate((snap, context) => {
  // Get the note document
  const note = snap.data();

  // Add an 'objectID' field which Algolia requires
  note.objectID = context.params.noteId;

  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME_R);
  return index.saveObject(note);
});

exports.onNoteUpdatedRecipes = functions.firestore.document('recipes/{noteId}').onUpdate((snap, context) => {
  // Get the note document
  const note = snap.data();

  // Add an 'objectID' field which Algolia requires
  note.objectID = context.params.noteId;

  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME_R);
  return index.saveObject(note);
});

exports.onNoteDeleteRecipes = functions.firestore.document('recipes/{noteId}').onDelete((snap, context) => {
  // Get the note document
  const note = snap.data();

  // Add an 'objectID' field which Algolia requires
  note.objectID = context.params.noteId;

  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME_R);
  return index.deleteObject(note.objectID);
});


// Update the search index every time a Post is written.
exports.onNoteCreatedPosts = functions.firestore.document('posts/{noteId}').onCreate((snap, context) => {
  // Get the note document
  const note = snap.data();

  // Add an 'objectID' field which Algolia requires
  note.objectID = context.params.noteId;

  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME_P);
  return index.saveObject(note);
});

exports.onNoteUpdatedPosts = functions.firestore.document('posts/{noteId}').onUpdate((snap, context) => {
  // Get the note document
  const note = snap.data();

  // Add an 'objectID' field which Algolia requires
  note.objectID = context.params.noteId;

  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME_P);
  return index.saveObject(note);
});

exports.onNoteDeletePosts = functions.firestore.document('posts/{noteId}').onDelete((snap, context) => {
  // Get the note document
  const note = snap.data();

  // Add an 'objectID' field which Algolia requires
  note.objectID = context.params.noteId;

  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME_P);
  return index.deleteObject(note.objectID);
});


// Update the search index every time a user is written.
exports.onUserCreated = functions.firestore.document('users/{noteId}').onCreate((snap, context) => {
  // Get the note document
  const userProfile = {
    objectID: context.params.noteId,
    displayName: snap.get("displayName"),
    email: snap.get("email"),
    imageURL: snap.get("imageURL")
};

  // Add an 'objectID' field which Algolia requires

  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME_U);
  return index.saveObject(userProfile);
});

exports.onUserUpdated = functions.firestore.document('users/{noteId}').onUpdate((snap, context) => {
// Get the note document
const userProfile = {
  objectID: context.params.noteId,
  displayName: snap.get("displayName"),
  email: snap.get("email"),
  imageURL: snap.get("imageURL")
};

// Add an 'objectID' field which Algolia requires

// Write to the algolia index
const index = client.initIndex(ALGOLIA_INDEX_NAME_U);
return index.saveObject(userProfile);
});

exports.onUserDeleted = functions.firestore.document('users/{noteId}').onDelete((snap, context) => {
  // Get the note document
  const note = snap.data();

  // Add an 'objectID' field which Algolia requires
  note.objectID = context.params.noteId;

  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME_U);
  return index.deleteObject(note.objectID);
});