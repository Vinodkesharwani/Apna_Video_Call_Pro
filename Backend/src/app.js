import express from "express";
import mongoose, { set } from "mongoose";

import { createServer } from "node:http";
import { Server } from "socket.io";

import cors from "cors";
import connectToSocket from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);


const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect(
  
    "mongodb+srv://VinodGuru95:DaminiShukla95@apnavideocall.jqyvbke.mongodb.net/"

    
  );

  console.log(`MONGO CONNECTED DB HOST:${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("Server  is running on the port 8000    ");
  });
};
start();
