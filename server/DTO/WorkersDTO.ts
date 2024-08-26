import { PrismaClient } from "@prisma/client";
import BaseDTO from "./BaseDTO";

const prisma = new PrismaClient();

export default class WorkersDTO extends BaseDTO {
    constructor() {
      super();
    }

    static newInstance() {
        return new WorkersDTO();
      }
    
    fetchWorker = async(filterCriteria: object)=>{
      const worker = await prisma.workers.findFirst({
        where: filterCriteria
      })
      return worker;  
    }

    fetchWorkers = async(filterCriteria: object)=>{
      const workers = await prisma.workers.findMany({
        where: filterCriteria
      })
      return workers;  
    }
}