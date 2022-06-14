getRouteDetails =
`SELECT 
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
where route_config.route_id = 1`;


getEachVehicleRouteDetails = 
`SELECT 
vehicles.vehicle_id,
vehicles.vehicle_no,
vehicles.vehicle_tag_id,
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
where vehicle_route_config.vehicle_id = 2`;

getAllVehiclesByAreaId = 
`select
vehicles.vehicle_id,
vehicles.vehicle_no,
vehicles.vehicle_tag_id,
routes.route_name,
areas.area_name,
regions.region_name
FROM
routes
INNER JOIN vehicle_route_config ON vehicle_route_config.route_id = routes.route_id
INNER JOIN vehicles ON vehicles.vehicle_id = vehicle_route_config.vehicle_id
INNER JOIN areas ON areas.area_id = vehicles.area_id
INNER JOIN regions ON regions.region_id = areas.region_id
where areas.area_id = 9`;


getTripInfoDetailsByTripIdAndVehicleId =
`select
trips.trip_id,
vehicles.vehicle_id,
routes.route_id, 
vehicles.vehicle_no,
routes.route_name,
rfids.rfid_ip_address,
rfids.rfid_front_cam_ip_address,
rfids.rfid_top_cam_ip_address,
rfids.rfid_name,
trip_info.status,
trip_info.mode,
trip_info.timestamp
FROM
vehicles
INNER JOIN trips ON trips.vehicle_id = vehicles.vehicle_id
INNER JOIN routes ON routes.route_id = trips.route_id
INNER JOIN route_config ON route_config.route_id = routes.route_id
INNER JOIN rfids ON rfids.rfid_id = route_config.rfid_id
INNER JOIN trip_info ON trip_info.trip_id = trips.trip_id

where trips.trip_id = 1 and vehicles.vehicle_id = 1 `;