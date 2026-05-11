import query from "../db/index.js";
import { neonConnection } from "../db/index.js";

async function getFrenchDefinitions() {
  const allFrenchObject = await neonConnection.query("SELECT * FROM frenchDefinitions");
  return allFrenchObject;
}

async function getFrenchDefinitionByTitle(title) {
  const allFrenchObject = await neonConnection.query("SELECT * FROM frenchDefinitions WHERE title ILIKE '%'||$1||'%' ", [title]);
  return allFrenchObject;
}

async function getFrenchDefinitionByEnglishTitle(englishtitle) {
  const allFrenchObject = await neonConnection.query("SELECT * FROM frenchDefinitions WHERE englishtitle ILIKE '%'||$1||'%'", [englishtitle]);
  return allFrenchObject;
}

async function updateFrenchDefinition(id, englishtitle, title, definition, example, links, week) {
  const updateFrenchObject = await neonConnection.query("UPDATE frenchDefinitions SET englishtitle = $2, title = $3, definition = $4, example = $5, links = $6, week = $7 WHERE id = $1 RETURNING *;", [id, englishtitle, title, definition, example, links, week]);
  return updateFrenchObject;
}

async function createFrenchDefinition(englishtitle, title, definition, example, links, week) {
  const createFrenchObject = await neonConnection.query("INSERT INTO frenchDefinitions (englishtitle, title, definition, example, links, week) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [englishtitle, title, definition, example, links, week]);
  return createFrenchObject;
}

async function deleteFrenchDefinition(id) {
  const deleteFrenchObject = await neonConnection.query("DELETE FROM frenchDefinitions WHERE id = $1 RETURNING *;", [id]);
  return deleteFrenchObject;
}


export {
  getFrenchDefinitions,
  getFrenchDefinitionByTitle,
  updateFrenchDefinition,
  createFrenchDefinition,
  deleteFrenchDefinition,
  getFrenchDefinitionByEnglishTitle
}
