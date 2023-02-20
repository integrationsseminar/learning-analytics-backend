import { Request, Response, NextFunction } from "express";

import { ErrorWithStatus } from '../../errors/errorWithStatus';
import { TrophyIdents, TrophyTiers } from "../../types/usertrophy.types";
import UserTrophy from "../../models/usertrophy.model";

export default class UserTrophyController {
    public static async getUserTrophys(req: Request, res: Response) { 
        const trophys = await Promise.all(Object.values(TrophyIdents).map(async (ident) => {
            let trophy = await UserTrophy.findOne({
                user: req.user._id,
                trophy: ident
            });

            if(!trophy) {
                trophy =  await UserTrophy.create({
                    user: req.user._id,
                    trophy: ident,
                    tier: TrophyTiers.NONE
                });
            }

            return trophy
        }));

        res.json({
            data: trophys,
            count: trophys.length
        })
    }

    public static async getUserTrophyByIdentifier(req: Request, res: Response, next: NextFunction) {
        if(!Object.values(TrophyIdents).includes(req.params.name as TrophyIdents)) {
            return next(new ErrorWithStatus("Trophy Identifier is not valid", 400));
        }

        let trophy = await UserTrophy.findOne({
            user: req.user._id,
            trophy: req.params.name 
        });

        if(!trophy) {
            trophy =  await UserTrophy.create({
                user: req.user._id,
                trophy: req.params.name,
                tier: TrophyTiers.NONE
            });
        }

        res.json(trophy);
    }
}