import express from "express";
import http from "http";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import symptomRouter from "./routes/symptomRoute.js";
import { initSocket } from "./socket/socketHandler.js";

const app = express();
const server = http.createServer(app); // wrap express app so socket.io can attach to it
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://doctor-appointment-familytreehospital.vercel.app",
      "https://doctor-booking-appointment-booking-three.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
  }),
);

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/symptoms", symptomRouter);

app.get("/", (req, res) => {
  res.send(`
    <body style = "background-color : black">
    <h2 style = "color : white">API WORKING</h2>
    </body>`);
});

// attach socket.io to the http server (not the express app)
initSocket(server);

// ✅ Await DB + Cloudinary before starting server
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    server.listen(port, () => console.log(`Server started on PORT:${port}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1); // crash loudly instead of running with no DB
  }
};

startServer();