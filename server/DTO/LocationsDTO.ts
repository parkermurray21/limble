import { PrismaClient } from "@prisma/client";
import BaseDTO from "./BaseDTO";
import { LocationFilterCriteria } from "../Models";

const prisma = new PrismaClient();

export default class TasksDTO extends BaseDTO {
    constructor() {
      super();
    }

    static newInstance() {
        return new TasksDTO();
      }

    fetchLocationData = async(filterCriteria: LocationFilterCriteria)=>{
        const result = await prisma.locations.findMany({
            where: filterCriteria.locationsWhere,
            include: {
              tasks: {
                where: filterCriteria.taskStatuses,
                include: {
                  logged_time: {
                    where: filterCriteria.workersWhere,
                    include: {
                      workers: true, // This includes the workers' details after filtering
                    },
                  },
                },
              },
            },
          });
      return result;  
    }
}