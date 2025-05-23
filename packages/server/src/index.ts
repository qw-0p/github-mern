import express, {Application} from "express";
import router from "./api/routes";
import cors from "cors";
import { createDatabase } from './db/createDatabase';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000



export const get = async () => {
    await createDatabase();

    const app: Application = express();

    app.use(express.json());

    app.use(cors());

    app.use("/api/v1", router);

    return app
}



const start = async () => {
    const app = await get();
    try {
        app.listen(PORT, () => {
            console.info(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
