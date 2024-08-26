import { PrismaClient } from "@prisma/client";
import BaseDTO from "./BaseDTO";

const prisma = new PrismaClient();

export default class LoggedTimeDTO extends BaseDTO {
    constructor() {
      super();
    }

    static newInstance() {
        return new LoggedTimeDTO();
      }
    
    aggregateWorkersHours = async(filterCriteria: object)=>{
        const aggregateWorkersHours = prisma.logged_time.groupBy({
            where: filterCriteria,
            by: ['worker_id'],
            _sum: {
              time_seconds: true,
            },
          });
        return aggregateWorkersHours
    }
}