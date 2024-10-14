const launches=require('./launches.mongo');
const planets=require('./planets.mongo')
// const launches = new Map();

const DEFAULT_FLIGHT_NUBMER=100;
let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explore IS1",
  launchDate: new Date("December 27,2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// launches.set(launch.flightNumber, launch);

saveLaunch(launch);

async function existsLaunchWithId(launchId) {
  return await launches.findOne({
    flightNumber:launchId,
  });
}

async function getLatestFlightNumber(){
  const latestLaunch=await launches.findOne().sort('-flightNumber');
  if(!latestLaunch){
    return DEFAULT_FLIGHT_NUBMER;
  }
  return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch){
  const newFlightNumber=await getLatestFlightNumber()+1;
  const newLaunch=Object.assign(launch,{
      customers: ["ZTM", "NASA"],
      upcoming: true,
      success: true,
      flightNumber:newFlightNumber
  });

  await saveLaunch(newLaunch);
}

async function getAllLaunches() {
  // return Array.from(launches.values());
  return await launches.find({},{'__id':0,'__v':0})
}

async function abortLaunchById(launchId) {
  const aborted=await launches.updateOne({
    flightNumber:launchId
  },{
    upcoming:false,
    success:false
  })

  return aborted.modifiedCount === 1;
}

async function saveLaunch(launch){
  const planet=await planets.findOne({keplerName:launch.target});

  if(!planet){
    throw new Error('No matching planet was found');
  }

  await launches.findOneAndUpdate({
    flightNumber:launch.flightNumber
  },launch,{
    upsert:true
  })
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
