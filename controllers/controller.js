const postgress = require("../services/postgress_service");
var format = require('pg-format');


exports.getRegions = async (req, res, next) => {
  console.log(req.query.region_id);
  if (req.query.region_id == undefined) {
    const data = await postgress.getRegions();
    res.send(data.rows);
  } else {
    const data = await postgress.getRegionsById(req.query.region_id);
    res.send(data.rows);
  }
};

exports.createRegion = async (req, res, next) => {
  console.log(req.params.name);
  console.log(req);
  if (req.params.name == undefined) {
    res.send("Invalid name");
  } else {
    const data = await postgress.createRegion(req.params.name);
    res.send("success");
  }
};

exports.getAreas = async (req, res, next) => {
  console.log(req.query);
  if (req.query.region_id == undefined) {
    const data = await postgress.getareas();
    res.send(data.rows);
  } else {
    if (req.query.area_id == undefined) {
      const data = await postgress.getAreasByRegionId(req.query.region_id);
      res.send(data.rows);
    } else {
      const data = await postgress.getAreasByAreaIdAndRegionId(
        req.query.area_id,
        req.query.region_id
      );
      res.send(data.rows);
    }
  }
};

exports.createArea = async (req, res, next) => {
  console.log(req.params.name);
  console.log(req);
  if (req.params.name == undefined || req.params.region_id == undefined) {
    res.send("Invalid parameters");
  } else {
    const data = await postgress.createArea(
      req.params.name,
      req.params.region_id
    );
    res.send("success");
  }
};

exports.createMine = async (req, res, next) => {
  console.log(req.params.name);
  console.log(req);
  if (req.params.name == undefined || req.params.area_id == undefined) {
    res.send("Invalid parameters");
  } else {
    const data = await postgress.createMine(
      req.params.name,
      req.params.area_id
    );
    res.send("success");
  }
};

exports.getMines = async (req, res, next) => {
  console.log(req.query);
  if (req.query.area_id == undefined) {
    const data = await postgress.getMines();
    res.send(data.rows);
  } else {
    if (req.query.mine_id == undefined) {
      const data = await postgress.getMinesByAreaId(req.query.area_id);
      res.send(data.rows);
    } else {
      const data = await postgress.getMinesByMineIdAndAreaId(
        req.query.mine_id,
        req.query.area_id
      );
      res.send(data.rows);
    }
  }
};

exports.getVehicles = async (req, res, next) => {
  console.log(req.params);
  if (req.query.area_id == undefined) {
    const data = await postgress.getVehicles();
    res.send(data.rows);
  } else {
    if (req.query.vehicle_id == undefined) {
      const data = await postgress.getVehiclesByAreaId(req.query.area_id);
      res.send(data.rows);
    } else {
      const data = await postgress.getVehiclesByVehicleIdAndAreaId(
        req.query.vehicle_id,
        req.query.area_id
      );
      res.send(data.rows);
    }
  }
};

exports.getRoutes = async (req, res, next) => {
  console.log(req.params);
  const data = await postgress.getRoutes();
  res.send(data.rows);
};
exports.getRouteDetails = async (req, res, next) => {
  console.log(req.params);
  const data = await postgress.getRouteDetails();
  res.send(data.rows);
};

exports.createVehicle = async (req, res, next) => {
  console.log(req.params.name);
  console.log(req);
  const data = await postgress.createVehicle(
    req.params.name,
    req.params.tag_id,
    req.params.area_id,
    req.params.route_id
  );
  res.send("success");
};

exports.getVehicleByVehicleNo = async (req, res, next) => {
  console.log(req.params.vehicle_no);
  if (req.params.vehicle_no == undefined) {
    res.send("Please add vehicle no");
  } else {
    const data = await postgress.getVehicleByVehicleNo(req.params.vehicle_no);
    res.send(data.rows);
  }
};

exports.getVehicleByVehicleNo = async (req, res, next) => {
  console.log(req.params.vehicle_no);
  if (req.params.vehicle_no == undefined) {
    res.send("Please add vehicle no");
  } else {
    const data = await postgress.getVehicleByVehicleNo(req.params.vehicle_no);
    res.send(data.rows);
  }
};

exports.getVehicleRouteByVehicleNo = async (req, res, next) => {
  console.log(req.params.vehicle_no);
  if (req.params.vehicle_no == undefined) {
    res.send("Please add vehicle no");
  } else {
    const data = await postgress.getVehicleRouteNameByVehicleNo(
      req.params.vehicle_no
    );
    res.send(data.rows);
  }
};

exports.getVehicleRouteDetailsByVehicleNo = async (req, res, next) => {
  console.log(req.params.vehicle_no);
  if (req.params.vehicle_no == undefined) {
    res.send("Please add vehicle no");
  } else {
    const route = await postgress.getVehicleRouteNameByVehicleNo(
      req.params.vehicle_no
    );
    const data = await postgress.getVehicleRouteDetailsByVehicleNo(
      req.params.vehicle_no
    );
    console.log(route.rows[0]);
    route.rows[0]["route-config"] = data.rows;
    res.send(route.rows[0]);
  }
};

exports.getVehicleRouteRfidPoint = async (req, res, next) => {
  console.log(req.params.vehicle_no);
  const route = await postgress.getVehicleRouteNameByVehicleNo(
    req.params.vehicle_no
  );
  const data = await postgress.getVehicleRouteRfidPoint(
    req.params.vehicle_no,
    req.params.rfid_ip
  );
  console.log(route.rows[0]);
  route.rows[0]["route-config"] = data.rows;
  console.log(route.rows);
  if (data.rows.length == 0) {
    res.send(false);
  } else {
    const route_points = await (await postgress.getVehicleRouteDetailsByVehicleNo(req.params.vehicle_no)).rows;
    console.log(route_points);
    const index = route_points.findIndex((route_point) => route_point.rfid_ip_address === req.params.rfid_ip);
    switch (index) {
      case 0:
        console.log("trip start");
        console.log(route.rows[0]["route-config"][0].route_id)
        const route_id = route.rows[0]["route-config"][0].route_id;
        const trip = await postgress.createTrip(route.rows[0].vehicle_id,route_id);
        console.log(trip);
        let values = [];
        route_points.forEach((point) => {
          let temp = [];
          temp.push(trip.rows[0].trip_id);
          temp.push(route.rows[0].vehicle_id);
          temp.push(point.route_id);
          temp.push("false");
          temp.push("AUTO");
          temp.push(new Date().toLocaleString());
          temp.push(route.rows[0].vehicle_no);
          temp.push(point.route_name);
          temp.push(point.rfid_ip_address);
          temp.push(point.rfid_name);
          temp.push(true);
          values.push(temp);
        });
        console.log(values);
        values[0][3] = "true";
        values[0][4] = "AUTO"; 

        const tripDetailsQuery =  
        `insert into trip_info 
        (trip_id,vehicle_id,route_id,status,open_type,timestamp,vehicle_no,route_name,rfid_ip_address,rfid_name,trip_active)
        values %L Returning trip_info_id`;
        var sql = format(tripDetailsQuery, values);
        console.log(sql); 
        const trip_info = await postgress.createTrip_Detail(sql);
        console.log(trip_info);
        res.send(true);
        break;
      
      case route_points.length -1 : 
      console.log("trip end");res.send(true);
        break;
    
      default:  console.log("trip running");res.send(true);
        break;
    }
  }
};

exports.getRfids = async (req, res, next) => {
  const data = await postgress.getRfids();
  res.send(data.rows);
};

exports.createRfid = async (req, res, next) => {
  const data = await postgress.createRfid(
    req.params.ipadd,
    req.params.name,
    req.params.frontip,
    req.params.topip,
    req.params.mine,
    req.params.area
  );
  res.send(data.rows);
};

exports.createRoute = async (req, res, next) => {
  const data = await postgress.createRoute(req.params.name, req.params.area);
  res.send(data.rows);
};

exports.createRouteConfig = async (req, res, next) => {
  const data = await postgress.createRouteConfig(
    req.params.rid,
    req.params.rfid
  );
  res.send(data.rows);
};

exports.deleteRegion = async (req, res, next) => {
  const data = await postgress.deleteRegion(req.params.id);
  res.send(data.rows);
};
exports.deleteArea = async (req, res, next) => {
  const data = await postgress.deleteArea(req.params.id);
  res.send(data.rows);
};
exports.deleteMine = async (req, res, next) => {
  const data = await postgress.deleteMine(req.params.id);
  if(data.row == undefined) {
    res.send("err")
  } else {
    res.send(data.rows);
  }
 
};
exports.deleteRoute = async (req, res, next) => {
  const data = await postgress.deleteRoute(req.params.id);
  res.send(data.rows);
};

exports.deleteRouteConfig = async (req, res, next) => {
  const data = await postgress.deleteRouteConfig(req.params.id);
  res.send(data.rows);
};

exports.deleteVehicle = async (req, res, next) => {
  const data = await postgress.deleteVehicle(req.params.id);
  res.send(data.rows);
};

exports.deleteRfid = async (req, res, next) => {
  const data = await postgress.deleteRfid(req.params.id);
  res.send(data.rows);
};
