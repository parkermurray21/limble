import BaseService from './BaseService';
import LocationsDTO from '../DTO/LocationsDTO';
import { LocationFilterCriteria } from '../Models';

export default class LocationService extends BaseService {
    constructor() {
      super();
    }
  
    static newInstance() {
      return new LocationService();
    }

   fetchLocationData = async(locationIds: number[], workerIds: number[], taskStatuses: string[])=>{
    const filterCriteria = this.generateLocationFilterCriteria(locationIds, workerIds, taskStatuses);    
    console.log("filterCriteria")
    console.log(filterCriteria)
    const locations = await LocationsDTO.newInstance().fetchLocationData(filterCriteria);

    const locationCostData = locations.map((location) => {
        const totalCost = location.tasks.reduce((taskAcc, task) => {
          const taskCost = task.logged_time.reduce((logAcc, loggedTime) => {
            const cost = (loggedTime.time_seconds /3600) * loggedTime.workers.hourly_wage.toNumber();
            return logAcc + cost;
          }, 0);
          return taskAcc + taskCost;
        }, 0);
      
        return { locationId: location.id, totalCost };
      });

    const totalCost = locationCostData.reduce((totalCostSum, location)=>{
        totalCostSum += location.totalCost;
        return totalCostSum;
    }, 0)

    const finalizedCostData = locationCostData.map((location)=>{
        return { location_id: location.locationId, location_total_cost: location.totalCost, location_percentage: location.totalCost / totalCost};
    })

    return finalizedCostData;
    }

    generateLocationFilterCriteria = (locationIds: number[], workerIds: number[], taskStatuses: string[])=>{
        return {
            locationsWhere: locationIds.length > 0 ? {id: {in: locationIds}} : {},
            workersWhere: workerIds.length > 0 ? {worker_id: {in: workerIds}} : {},
            taskStatuses: taskStatuses.length > 0 ? {status: {in: taskStatuses}}: {}
        } as LocationFilterCriteria
    }
}
