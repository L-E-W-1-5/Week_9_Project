import router from "./routes/english_routes.js";
import spanishRouter from "./routes/spanish_routes.js";
import germanRouter from "./routes/german_routes.js";
import frenchRouter from "./routes/french_routes.js";
import express from "express";
import morgan from "morgan";
import cors from 'cors'
import { createObjectTable, dropObjectTable, populateObjectTable, resetObjectTable } from "./db/helpers.js";
import { createObjectTableDE, dropObjectTableDE, populateObjectTableDE, resetObjectTableDE } from "./db/helpersDE.js";
import { createObjectTableFR, dropObjectTableFR, populateObjectTableFR, resetObjectTableFR } from "./db/helpersFR.js";
import { createObjectTableES, dropObjectTableES, populateObjectTableES, resetObjectTableES } from "./db/helpersES.js";

const PORT = process.env.PORT;

const app = express();

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());

// resetObjectTableES()
// resetObjectTableFR()
// resetObjectTableDE()

app.use("/api/englishDefinitions", router);
app.use("/api/spanishDefinitions", spanishRouter);
app.use("/api/germanDefinitions", germanRouter);
app.use("/api/frenchDefinitions", frenchRouter);

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});


export default app;

