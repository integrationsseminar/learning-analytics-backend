import { Request, Response } from "express";

import { getAvailableTrophys } from "../../utils/availableTrophys";

export default class TrophyController {
    public static getAvailableTrophys(_req: Request, res: Response) {
        res.json(getAvailableTrophys());
    }
}