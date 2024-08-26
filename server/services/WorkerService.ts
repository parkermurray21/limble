import WorkersDTO from '../DTO/WorkersDTO';
import BaseService from './BaseService';


export default class WorkerService extends BaseService {
    constructor() {
      super();
    }
  
    static newInstance() {
      return new WorkerService();
    }

    fetchWorker = async(workerId: string)=>{
        const filterCriteria = {id: parseInt(workerId)}
        const worker = await WorkersDTO.newInstance().fetchWorker(filterCriteria);
        return worker;
    }

    fetchWorkers = async(filterCriteria: object)=>{
      
      const worker = await WorkersDTO.newInstance().fetchWorkers(filterCriteria);
      return worker;
  }

}  
