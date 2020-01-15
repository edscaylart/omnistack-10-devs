import { Router } from "express";

import DevController from "./controllers/Dev";

const routes = new Router();

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);

export default routes;
