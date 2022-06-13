import dotenv from "dotenv";

dotenv.config();

export const DISCORD_TOKEN: string = process.env["DISCORD_TOKEN"] || "";
export const DALLE_BACKEND: string = process.env["DALLE_BACKEND"] || "http://127.0.0.1:3005";