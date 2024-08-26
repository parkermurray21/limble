import { Decimal } from '@prisma/client/runtime/library';
import LoggedTimeDTO from '../DTO/LoggedTimeDTO';
import BaseService from './BaseService';
import { HoursByWorkerID } from '../Models';


export default class LoggedTimeService extends BaseService {
    constructor() {
      super();
    }
  
    static newInstance() {
      return new LoggedTimeService();
    }

    aggregateWorkersHours = async(filterCriteria: object)=>{
        const aggregateHours = await LoggedTimeDTO.newInstance().aggregateWorkersHours(filterCriteria);
        const timeByWorkerId: HoursByWorkerID = aggregateHours.reduce((acc, curr) => (
            (acc[curr.worker_id] = {hours: curr._sum.time_seconds ? curr._sum.time_seconds / 3600 : 0}),
            acc
        ), {} as HoursByWorkerID);
        return timeByWorkerId;
    }
}
