import { Decimal } from "@prisma/client/runtime/library"


export type HoursByWorkerID = {
    [id: string]: {
        hours: number
    }
}

export type WagesByWorkerId = {
    [id: string]: {
        username: string,
        wage: number
    }
}

export type LocationFilterCriteria = {
    locationsWhere: object,
    workersWhere: object,
    taskStatuses: object
}

export const Statuses: string[] = ["complete", "incomplete"];