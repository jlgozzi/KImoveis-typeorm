import "reflect-metadata";
import "express-async-errors";
import express from "express";
import errorHandlingMiddleware from "./middlewares/errorHandling";
import userRoutes from "./routes/userRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";

const app = express();
app.use(express.json());

app.use(userRoutes);
app.use(sessionRoutes);
app.use(categoryRoutes);
app.use(propertyRoutes);
app.use(scheduleRoutes);

app.use(errorHandlingMiddleware);

export default app;
