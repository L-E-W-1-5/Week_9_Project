import query from "../db/index.js";
import { neonConnection } from "../db/index.js";

async function getSpanishDefinitions() {
  const allSpanishObject = await neonConnection.query("SELECT * FROM spanishDefinitions");
  return allSpanishObject;
}

async function getSpanishDefinitionByEnglishTitle(englishtitle) {
  const allSpanishObject = await neonConnection.query("SELECT * FROM spanishDefinitions WHERE englishtitle ILIKE '%'||$1||'%'", [englishtitle]);
  return allSpanishObject;
}

async function getSpanishDefinitionByTitle(title) {
  const allSpanishObject = await neonConnection.query("SELECT * FROM spanishDefinitions WHERE title ILIKE '%'||$1||'%'", [title]);
  return allSpanishObject;
}

async function updateSpanishDefinition(id, englishtitle, title, definition, example, links, week) {
  const updateSpanishObject = await neonConnection.query("UPDATE spanishDefinitions SET englishtitle = $2, title = $3, definition = $4, example = $5, links = $6, week = $7 WHERE id = $1 RETURNING *;", [id, englishtitle, title, definition, example, links, week]);
  return updateSpanishObject;
}

async function createSpanishDefinition(englishtitle, title, definition, example, links, week) {
  const createSpanishObject = await neonConnection.query("INSERT INTO spanishDefinitions (englishtitle, title, definition, example, links, week) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [englishtitle, title, definition, example, links, week]);
  return createSpanishObject;
}

async function deleteSpanishDefinition(id) {
  const deleteSpanishObject = await neonConnection.query("DELETE FROM spanishDefinitions WHERE id = $1 RETURNING *;", [id]);
  return deleteSpanishObject;
}



export {
  getSpanishDefinitions,
  getSpanishDefinitionByEnglishTitle,
  getSpanishDefinitionByTitle,
  updateSpanishDefinition,
  createSpanishDefinition,
  deleteSpanishDefinition
}
