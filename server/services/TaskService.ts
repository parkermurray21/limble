import { Decimal } from '@prisma/client/runtime/library';
import LoggedTimeDTO from '../DTO/LoggedTimeDTO';
import BaseService from './BaseService';
import { HoursByWorkerID } from '../Models';
import TasksDTO from '../DTO/TasksDTO';


export default class TaskService extends BaseService {
    constructor() {
      super();
    }
  
    static newInstance() {
      return new TaskService();
    }

   fetchTasks = async(filterCriteria: object)=>{
        
        const tasks = await TasksDTO.newInstance().fetchTasks(filterCriteria);
        return tasks;
    }
}
