import express from "express";
import cors from "cors";
import "dotenv/config";
import geoRouter from "./routes/geo.js";
import mathRouter from "./routes/math.js";
import scienceRouter from "./routes/science.js";

const app = express();
const port = process.env.PORT || process.argv[2] || 8080;
const { CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(cors());
app.use(express.json());

app.use("/geo", geoRouter);
app.use("/math", mathRouter);
app.use("/science", scienceRouter);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
