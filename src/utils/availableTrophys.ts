import { TrophyIdents, TrophyTiers, TTrophy } from "../types/trophy.types";

export function getAvailableTrophys(): TTrophy[] {
    return [
        {
            identifier: TrophyIdents.SubmitSurveyAnswer,
            description: "Beantworte Umfragen",
            availableTiers: [{
                tier: TrophyTiers.BRONZE,
                description: "Beantworte deine erste Umfrage"
            }]
        },
        {
            identifier: TrophyIdents.ReadNotification,
            description: "Lese Beanchrichtigung",
            availableTiers: [{
                tier: TrophyTiers.BRONZE,
                description: "Lese deine erste Beanchrichtigung"
            }]
        },
        {
            identifier: TrophyIdents.CreateThreadComment,
            description: "Erstelle Kommentare in Beiträgen",
            availableTiers: [{
                tier: TrophyTiers.BRONZE,
                description: "erstelle deinen ersten Kommentar"
            }]
        },
    ];
}