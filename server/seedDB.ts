import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const seedLocations = async ()=>{
    console.log("seeding zones")
    
    try{
        await prisma.locations.create({
            data:{
                name: "zone1"
            }
        });
    
      await prisma.locations.create({
        data:{
            name: "zone2"
        }
      });
    
      await prisma.locations.create({
        data:{
            name: "zone3"
        }
      });
    
      await prisma.locations.create({
        data:{
            name: "zone4"
        }
      });
    }catch(err){
        console.log(err)
    }
}


const seedWorkers = async ()=>{
  console.log("seeding workers")
  
  try{
    await prisma.workers.create({
      data:{
          username: "parkermurray21",
          hourly_wage: 100.00,
      }
    });

    await prisma.workers.create({
      data:{
          username: "coryMorin12",
          hourly_wage: 75.00,
      }
    });
  }catch(err){
      console.log(err)
  }
}


const seedTask = async ()=>{
  console.log("seeding tasks")
  
  try{
    await prisma.tasks.create({
      data:{
          description: "Install Warp Engine #1",
          location_id: 1,
      }
    });

    await prisma.tasks.create({
      data:{
          description: "Install Warp Engine #2",
          location_id: 1,
      }
    });

    await prisma.tasks.create({
      data:{
          description: "update hollow deck Firm Ware",
          location_id: 2,
      }
    });


    await prisma.tasks.create({
      data:{
          description: "Resupply Sick Bay",
          location_id: 3,
      }
    });
  }catch(err){
      console.log(err)
  }
}



const seedLoggedTime = async ()=>{
  console.log("seeding Logged Time")
  
  try{
    await prisma.logged_time.create({
      data:{
          time_seconds: 3600,
          task_id: 1,
          worker_id: 1
      }
    });

    await prisma.logged_time.create({
      data:{
          time_seconds: 3600,
          task_id: 1,
          worker_id: 1
      }
    });

    await prisma.logged_time.create({
      data:{
          time_seconds: 3600,
          task_id: 1,
          worker_id: 2
      }
    });


    await prisma.logged_time.create({
      data:{
          time_seconds: 1800,
          task_id: 2,
          worker_id: 2
      }
    });

    await prisma.logged_time.create({
      data:{
          time_seconds: 1800,
          task_id: 2,
          worker_id: 1
      }
    });
  }catch(err){
      console.log(err)
  }
}




//seedDB();
//seedWorkers();
//seedTask();
seedLoggedTime();