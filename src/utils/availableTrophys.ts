import { TrophyIdents, TrophyTiers, TTrophy } from "../types/trophy.types";

export function getAvailableTrophys(): TTrophy[] {
    return [
        {
            identifier: TrophyIdents.SubmitSurveyAnswer,
            description: "Beantworte Umfragen",
            tiers: [{
                tier: TrophyTiers.BRONZE,
                description: "Beantworte deine erste Umfrage"
            }]
        },
        {
            identifier: TrophyIdents.ReadNotification,
            description: "Lese Beanchrichtigung",
            tiers: [{
                tier: TrophyTiers.BRONZE,
                description: "Lese deine erste Beanchrichtigung"
            }]
        },
        {
            identifier: TrophyIdents.CreateThreadComment,
            description: "Erstelle Kommentare in Beiträgen",
            tiers: [{
                tier: TrophyTiers.BRONZE,
                description: "erstelle deinen ersten Kommentar"
            }]
        },
    ];
}