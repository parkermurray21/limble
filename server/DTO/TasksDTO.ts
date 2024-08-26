import { PrismaClient } from "@prisma/client";
import BaseDTO from "./BaseDTO";

const prisma = new PrismaClient();

export default class TasksDTO extends BaseDTO {
    constructor() {
      super();
    }

    static newInstance() {
        return new TasksDTO();
      }

    fetchTasks = async(filterCriteria: object)=>{
      const tasks = await prisma.tasks.findMany({
        where: filterCriteria
      })
      return tasks;  
    }
}