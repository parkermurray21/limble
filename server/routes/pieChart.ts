import express from "express";
import { Prisma, PrismaClient } from '@prisma/client';
import { z } from 'zod';
import WorkerService from "../services/WorkerService";
import LoggedTimeService from "../services/LoggedTimeService";
import { HoursByWorkerID, Statuses, WagesByWorkerId } from "../Models";
import TaskService from "../services/TaskService";
import LocationService from "../services/LocationService";

const router = express.Router();

router.get("/workers", async(req, res) => {
  const workerIds: number[] = getWorkerIdsFromReq(req.query.worker_id)
  const locationIds: number[] = getLocationIdsFromReq(req.query.location_id) 
  const taskStatuses: string[] = getTaskStatuses(req.query.task_status)

  let tasksFilterCriteria = locationIds.length > 0 ? {id: {in: locationIds}} : {};
  tasksFilterCriteria.status = {in: taskStatuses};  

  const taskIds: number[] = locationIds.length > 0 ? (await TaskService.newInstance().fetchTasks(tasksFilterCriteria)).map(task=>task.id) : taskStatuses.length > 0 ? (await TaskService.newInstance().fetchTasks(tasksFilterCriteria)).map(task=>task.id) : []
  const workerFilterCriteria = workerIds.length > 0 ? {id: {in: workerIds}}: {};
  const workers = await WorkerService.newInstance().fetchWorkers(workerFilterCriteria)
  
  
  const wagesByWorkerId = workers.reduce((acc, curr) => {
    acc[curr.id] = {username: curr.username, wage: curr.hourly_wage.toNumber()};
    return acc;
  }, {} as WagesByWorkerId);
  const loggedTimeFilterCriteria = {task_id: {in: taskIds}};
  const loggedTimeByWorkerID = await LoggedTimeService.newInstance().aggregateWorkersHours(loggedTimeFilterCriteria)
  const pieChartValues = generateCostByWorker(loggedTimeByWorkerID, wagesByWorkerId)

  res.send({piechart_values: pieChartValues})
});

router.get("/locations", async(req, res) => {
  const workerIds: number[] = getWorkerIdsFromReq(req.query.worker_id)
  const locationIds: number[] = getLocationIdsFromReq(req.query.location_id) 
  const taskStatuses: string[] = getTaskStatuses(req.query.task_status)
  const locationData = await LocationService.newInstance().fetchLocationData(locationIds, workerIds, taskStatuses)  
  res.send(locationData);

});

const getTaskStatuses = (taskStatuses: any)=>{
  const newTaskStatuses = (Array.isArray(taskStatuses) ? taskStatuses : [taskStatuses]).filter((item): item is string => typeof item === 'string' && item !== undefined).filter((item)=> Statuses.includes(item))
  return newTaskStatuses.length == 0 ? Statuses : newTaskStatuses
}

const getWorkerIdsFromReq = (workerIds: any) =>{
  return (Array.isArray(workerIds) ? workerIds : [workerIds]).filter((item): item is string => typeof item === 'string' && item !== undefined).map((item)=>{return parseInt(item)});
}

const getLocationIdsFromReq = (locationIds: any) =>{
  return (Array.isArray(locationIds) ? locationIds : [locationIds]).filter((item): item is string => typeof item === 'string' && item !== undefined).map((item)=>{return parseInt(item)});
}



const generateCostByWorker = (loggedTimeByWorkerID: HoursByWorkerID, wagesByWorkerId: WagesByWorkerId)=>{
  const totalCost = Object.keys(wagesByWorkerId).map((id)=>{
    if(loggedTimeByWorkerID[id] != undefined){
      return wagesByWorkerId[id].wage * loggedTimeByWorkerID[id].hours
    }else{
      return 0;
    }
  }).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const costByWorker = Object.keys(wagesByWorkerId).map((id)=>{
    if(loggedTimeByWorkerID[id] != undefined){
      return {id: id, username: wagesByWorkerId[id].username, cost: wagesByWorkerId[id].wage * loggedTimeByWorkerID[id].hours, pie_chart_value: wagesByWorkerId[id].wage * loggedTimeByWorkerID[id].hours / totalCost}
    }
  }).filter((item)=> item != null)
  return costByWorker;
}

export default router;




