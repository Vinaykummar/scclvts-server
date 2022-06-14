const { Client } = require("pg");
const client = new Client({
  user: "mtqddqwuuphbvr",
  password: "1631a6aa1b5f7bae708bd9965be0fe641578c1d2e4f013fac2e46e8c5885a583",
  database: "dfov6ifh4k5mjh",
  host: "ec2-23-23-182-238.compute-1.amazonaws.com",
  port: 5432,
});

exports.connect = async () => {
  await client.connect();
  console.log("connected to database");
};

exports.getRegions = async () => {
  const query = "select * from regions";
  const data = await client.query(query);
  return data;
};

exports.createRegion = async (name) => {
  const query =
    `insert into regions(region_name) values (` + "'" + name + "'" + `)`;
  const data = await client.query(query);
  return data;
};

exports.getRegionsById = async (region_id) => {
  const query = "select * from regions where region_id = " + region_id;
  const data = await client.query(query);
  return data;
};

exports.createArea = async (name, region_id) => {
  const query =
    `insert into areas(area_name, region_id) values (` +
    "'" +
    name +
    "'" +
    `,` +
    "'" +
    region_id +
    "'" +
    `)`;
  const data = await client.query(query);
  return data;
};

exports.createRoute = async (name, area_id) => {
  const query =
    `insert into routes(route_name, area_id) values (` +
    "'" +
    name +
    "'" +
    `,` +
    "'" +
    area_id +
    "'" +
    `) Returning route_id`;
  const data = await client.query(query);
  console.log(data);
  return data;
};

exports.createRouteConfig = async (rid, rfid) => {
  const query =
    `insert into route_config(route_id, rfid_id) values (` +
    "'" +
    rid +
    "'" +
    `,` +
    "'" +
    rfid +
    "'" +
    `)`;
  const data = await client.query(query);
  console.log(data);
  return data;
};

exports.createMine = async (name, area_id) => {
  const query =
    `insert into mines(mine_name, area_id) values (` +
    "'" +
    name +
    "'" +
    `,` +
    "'" +
    area_id +
    "'" +
    `)`;
  const data = await client.query(query);
  return data;
};

exports.createRfid = async (ip, name, frip, tpip, mid, aid) => {
  const query =
    `insert into rfids(
    rfid_ip_address,
    rfid_name,
    rfid_front_cam_ip_address,
    rfid_top_cam_ip_address,
    mine_id, 
    area_id) values (` +
    "'" +
    ip +
    "'" +
    `,` +
    "'" +
    name +
    "'" +
    `,` +
    "'" +
    frip +
    "'" +
    `,` +
    "'" +
    tpip +
    "'" +
    `,` +
    "'" +
    mid +
    "'" +
    `,` +
    "'" +
    aid +
    "'" +
    `)`;
  const data = await client.query(query);
  return data;
};

exports.getareas = async () => {
  const query = `select areas.area_id,areas.area_name,regions.region_id , regions.region_name from areas
  inner join regions on areas.region_id = regions.region_id;`;
  const data = await client.query(query);
  return data;
};

exports.getAreasByRegionId = async (region_id) => {
  const query = "select * from areas where region_id=" + region_id;
  const data = await client.query(query);
  return data;
};

exports.getAreasByAreaIdAndRegionId = async (area_id, region_id) => {
  const query =
    "select * from areas where area_id =" +
    area_id +
    "and region_id=" +
    region_id;
  const data = await client.query(query);
  return data;
};

exports.getMines = async () => {
  const query = `select mines.mine_id,mines.mine_name,areas.area_id,areas.area_name from mines
  inner join areas on areas.area_id = mines.area_id;`;
  const data = await client.query(query);
  return data;
};

exports.getMinesByAreaId = async (area_id) => {
  const query = "select * from mines where area_id = " + area_id;
  const data = await client.query(query);
  return data;
};

exports.getMinesByMineIdAndAreaId = async (mine_id, area_id) => {
  const query =
    "select * from mines where mine_id = " +
    mine_id +
    " and area_id = " +
    area_id;
  const data = await client.query(query);
  return data;
};

exports.createVehicle = async (name, tag_id, area_id, route_id) => {
  const query =
    `insert into vehicles (vehicle_no,vehicle_tag_id,area_id) values (` +
    "'" +
    name +
    "'" +
    `,` +
    "'" +
    tag_id +
    "'" +
    `,` +
    area_id +
    `) Returning vehicle_id`;
  console.log(query);
  const data = await client.query(query);
  console.log(data.rows);
  const query2 =
    `insert into vehicle_route_config (vehicle_id,route_id) values (` +
    data.rows[0].vehicle_id +
    `,` +
    route_id +
    `)`;
  console.log(query2);
  const data2 = await client.query(query2);
  return data2;
};

exports.getVehicles = async () => {
  const query = `
  select 
  vehicles.vehicle_id,
  routes.route_id,
  vehicles.vehicle_no,
  vehicles.vehicle_tag_id, 
  routes.route_name,
  areas.area_name
  from 
  vehicles 
  inner join areas on areas.area_id = vehicles.area_id
  INNER JOIN vehicle_route_config ON vehicle_route_config.vehicle_id = vehicles.vehicle_id
  INNER JOIN routes ON routes.route_id = vehicle_route_config.route_id`;
  const data = await client.query(query);
  return data;
};

exports.getVehiclesByVehicleIdAndAreaId = async (vehicle_id, area_id) => {
  const query =
    "select * from vehicles where vehicle_id = " +
    vehicle_id +
    " and area_id = " +
    area_id;
  const data = await client.query(query);
  return data;
};

exports.getVehicleByVehicleNo = async (vehicle_no) => {
  const query =
    `
  select 
  vehicles.vehicle_id,
  vehicles.vehicle_no,
  vehicles.vehicle_tag_id,
  areas.area_name,
  regions.region_name
  from vehicles 
  inner join areas on areas.area_id = vehicles.area_id
  inner join regions on regions.region_id = areas.region_id
  where vehicles.vehicle_no =` +
    "'" +
    vehicle_no +
    "'" +
    ``;
  console.log(query);
  const data = await client.query(query);
  return data;
};

exports.getVehicleRouteNameByVehicleNo = async (vehicle_no) => {
  const query =
    `
  select 
  vehicles.vehicle_id,
  vehicles.vehicle_no,
  routes.route_name
  from
  vehicles
  INNER JOIN vehicle_route_config ON vehicle_route_config.vehicle_id = vehicles.vehicle_id
  INNER JOIN routes ON routes.route_id = vehicle_route_config.route_id
  where vehicles.vehicle_no =` +
    "'" +
    vehicle_no +
    "'" +
    ``;
  console.log(query);
  const data = await client.query(query);
  return data;
};

exports.getVehicleRouteDetailsByVehicleNo = async (vehicle_no) => {
  const query =
    `
  SELECT 
  route_config.route_config_id,
routes.route_id,
routes.route_name,
rfids.rfid_ip_address,
rfids.rfid_name,
rfids.rfid_front_cam_ip_address,
rfids.rfid_top_cam_ip_address,
mines.mine_name,
areas.area_name
FROM 
routes 
INNER JOIN route_config ON route_config.route_id = routes.route_id 
INNER JOIN rfids ON rfids.rfid_id = route_config.rfid_id
INNER JOIN mines ON mines.mine_id = rfids.mine_id
INNER JOIN areas ON areas.area_id = rfids.area_id
INNER JOIN vehicle_route_config ON vehicle_route_config.route_id = routes.route_id
INNER JOIN vehicles ON vehicles.vehicle_id = vehicle_route_config.vehicle_id
where vehicles.vehicle_no = ` +
    "'" +
    vehicle_no +
    "'" +
    `order by route_config.route_config_id`;
  console.log(query);
  const data = await client.query(query);
  return data;
};

exports.getVehicleRouteRfidPoint = async (vehicle_no, rfid_ip) => {
  const query =
    `
  SELECT 
routes.route_id,
routes.route_name,
rfids.rfid_ip_address,
rfids.rfid_name,
rfids.rfid_front_cam_ip_address,
rfids.rfid_top_cam_ip_address,
mines.mine_name,
areas.area_name
FROM 
routes 
INNER JOIN route_config ON route_config.route_id = routes.route_id 
INNER JOIN rfids ON rfids.rfid_id = route_config.rfid_id
INNER JOIN mines ON mines.mine_id = rfids.mine_id
INNER JOIN areas ON areas.area_id = rfids.area_id
INNER JOIN vehicle_route_config ON vehicle_route_config.route_id = routes.route_id
INNER JOIN vehicles ON vehicles.vehicle_id = vehicle_route_config.vehicle_id
where vehicles.vehicle_no = ` +
    "'" +
    vehicle_no +
    "'" +
    ` and rfids.rfid_ip_address = ` +
    "'" +
    rfid_ip +
    "'" +
    ``;
  console.log(query);
  const data = await client.query(query);
  return data;
};

exports.getRfids = async () => {
  const query = `select 
  rfids.rfid_id,
  rfids.rfid_ip_address,
  rfids.rfid_name,
  rfids.rfid_front_cam_ip_address,
  rfids.rfid_top_cam_ip_address,
  mines.mine_id,
  mines.mine_name,
  areas.area_id,
  areas.area_name
  from rfids 
  inner join mines on mines.mine_id = rfids.mine_id
  inner join areas on areas.area_id = rfids.area_id`;
  const data = await client.query(query);
  return data;
};

exports.getRoutes = async (area_id) => {
  const query = `
  SELECT 
  *
  FROM 
  routes
  inner join areas on areas.area_id = routes.area_id
  `;
  const data = await client.query(query);
  return data;
};

exports.getRouteDetails = async (area_id) => {
  const query = `
  SELECT 
  routes.route_id,
  routes.route_name,
  rfids.rfid_ip_address,
  rfids.rfid_name,
  rfids.rfid_front_cam_ip_address,
  rfids.rfid_top_cam_ip_address,
  mines.mine_name,
  areas.area_name,
  route_config.route_config_id
  FROM 
  routes 
  INNER JOIN route_config ON route_config.route_id = routes.route_id 
  INNER JOIN rfids ON rfids.rfid_id = route_config.rfid_id
  INNER JOIN mines ON mines.mine_id = rfids.mine_id
  INNER JOIN areas ON areas.area_id = rfids.area_id
  `;
  const data = await client.query(query);
  return data;
};

exports.getRouteConfigByRoute = async (route_id) => {
  const query = "select * from route_config where route_id =" + route_id;
  const data = await client.query(query);
  return data;
};

exports.deleteRegion = async (region_id) => {
  const query = "delete from regions where region_id =" + region_id;
  const data = await client.query(query);
  return data;
};
exports.deleteArea = async (area_id) => {
  const query = "delete  from areas where area_id =" + area_id;
  const data = await client.query(query);
  return data;
};
exports.deleteMine = async (mine_id) => {
  const query = "delete from mines where mine_id =" + mine_id;
  const data = await client.query(query);
  return data;
};

exports.deleteRouteConfig = async (id) => {
  const query = "delete from route_config where route_config_id =" + id;
  const data = await client.query(query);
  return data;
};

exports.deleteRoute = async (id) => {
  const query = "delete  from routes where route_id =" + id;
  const data = await client.query(query);
  return data;
};

exports.deleteVehicle = async (id) => {
  const query1 = "delete from vehicle_route_config where vehicle_id =" + id;
  const data1 = await client.query(query1);
  const query = "delete from vehicles where vehicle_id =" + id;
  const data = await client.query(query);
  return data;
};

exports.deleteRfid = async (id) => {
  const query = "delete from rfids where rfid_id =" + id;
  const data = await client.query(query);
  return data;
};

exports.createTrip = async (vno, route_id) => {
  const date = new Date();
  const query = 
  `insert into trips (vehicle_id,timestamp,route_id,trip_active) values (` +
  "'" +
  vno +
  "'" +
  `,` +
  "'" +
  date.toLocaleString() +
  "'" +
  `,` +
  "'" +
  route_id +
  "'" + ",true"+
  `) Returning trip_id`;
  const data = await client.query(query);
  return data;
};

exports.createTrip_Detail = async (sql) => {
  const data = await client.query(sql);
  return data;
};
