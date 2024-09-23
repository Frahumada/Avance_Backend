import { Router } from "express";

const viewRouter = Router();

viewRouter.get('/', (req, res) => {
    res.render('websocket');
});

export default viewRouter;