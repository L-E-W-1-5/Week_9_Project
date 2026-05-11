import query from "../db/index.js";
import { neonConnection } from "../db/index.js";

async function getGermanDefinitions() {
  const allGermanObject = await neonConnection.query("SELECT * FROM germanDefinitions");
  return allGermanObject;
}

async function getGermanDefinitionByTitle(title) {
  const allGermanObject = await neonConnection.query("SELECT * FROM germanDefinitions WHERE title ILIKE '%'||$1||'%'", [title]);
  return allGermanObject;
}

async function getGermanDefinitionByEnglishTitle(englishtitle) {
  const allGermanObject = await neonConnection.query("SELECT * FROM germanDefinitions WHERE englishtitle ILIKE '%'||$1||'%'", [englishtitle]);
  return allGermanObject;
}

async function updateGermanDefinition(id, englishtitle, title, definition, example, links, week) {
  const updateGermanObject = await neonConnection.query("UPDATE germanDefinitions SET englishtitle = $2, title = $3, definition = $4, example = $5, links = $6, week = $7 WHERE id = $1 RETURNING *;", [id, englishtitle, title, definition, example, links, week]);
  return updateGermanObject;
}

async function createGermanDefinition(englishtitle, title, definition, example, links, week) {
  const createGermanObject = await neonConnection.query("INSERT INTO germanDefinitions (englishtitle, title, definition, example, links, week) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [englishtitle, title, definition, example, links, week]);
  return createGermanObject;
}

async function deleteGermanDefinition(id) {
  const deleteGermanObject = await neonConnection.query("DELETE FROM germanDefinitions WHERE id = $1 RETURNING *;", [id]);
  return deleteGermanObject;
}


export {
  getGermanDefinitions,
  getGermanDefinitionByTitle,
  updateGermanDefinition,
  createGermanDefinition,
  deleteGermanDefinition,
  getGermanDefinitionByEnglishTitle
}
