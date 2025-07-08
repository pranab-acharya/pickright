import "dotenv/config";
import express from "express";
import router from "./routes/resume-upload.route.js";

const PORT = process.env.PORT || 6001;
const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
