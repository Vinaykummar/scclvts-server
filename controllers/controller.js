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
        res.send(data);
    }
};

exports.getAreas = async (req, res, next) => {
    console.log(req.query);
    if (req.query.region_id == undefined) {
        const data = await postgress.getareas(req.params.user_id);
        res.send(data.rows);
    } else {
        if (req.query.area_id == undefined) {
            const data = await postgress.getAreasByRegionId(req.query.region_id);
            res.send(data.rows);
        } else {
            const data = await postgress.getAreasByAreaIdAndRegionId(req.query.area_id, req.query.region_id);
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
        const data = await postgress.createArea(req.params.name, req.params.region_id);
        res.send(data);
    }
};

exports.createMine = async (req, res, next) => {
    console.log(req.params.name);
    console.log(req);
    if (req.params.name == undefined || req.params.area_id == undefined) {
        res.send("Invalid parameters");
    } else {
        const data = await postgress.createMine(req.params.name, req.params.area_id);
        res.send(data);
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
            const data = await postgress.getMinesByMineIdAndAreaId(req.query.mine_id, req.query.area_id);
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
            const data = await postgress.getVehiclesByVehicleIdAndAreaId(req.query.vehicle_id, req.query.area_id);
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
    const data = await postgress.getRouteDetails(req.params.id);
    res.send(data.rows);
};

exports.getRouteDetailsByRouteId = async (req, res, next) => {
    console.log(req.params.route_id);
    const data = await postgress.getRouteDetailsByRouteId(req.params.id);
    res.send(data.rows);
};

exports.createVehicle = async (req, res, next) => {
    console.log(req.params.name);
    console.log(req);
    const data = await postgress.createVehicle(req.params.name, req.params.tag_id, req.params.area_id, req.params.route_id);
    res.send(data);
};

exports.updateVehicle = async (req, res, next) => {
    const data = await postgress.updateVehicle(req.params.id, req.params.name, req.params.tag_id, req.params.area_id, req.params.route_id);
    res.send(data);
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
        const data = await postgress.getVehicleRouteNameByVehicleNo(req.params.vehicle_no);
        res.send(data.rows);
    }
};

exports.getVehicleRouteDetailsByVehicleNo = async (req, res, next) => {
    console.log(req.params.vehicle_no);
    if (req.params.vehicle_no == undefined) {
        res.send("Please add vehicle no");
    } else {
        const route = await postgress.getVehicleRouteNameByVehicleNo(req.params.vehicle_no);
        const data = await postgress.getVehicleRouteDetailsByVehicleNo(req.params.vehicle_no);
        console.log(route.rows[0]);
        route.rows[0]["route-config"] = data.rows;
        res.send(route.rows[0]);
    }
};

exports.getVehicleRouteRfidPoint = async (req, res, next) => {
    console.log(req.params.vehicle_no);
    console.log(req.body.front_view);
    console.log(req.body.top_view);
    let route;
    let data;
    try {
        route = await postgress.getVehicleRouteNameByVehicleNo(req.params.vehicle_no);
        try {
            data = await postgress.getVehicleRouteRfidPoint(req.params.vehicle_no, req.params.rfid_ip);
            route.rows[0]["route-config"] = data.rows;
            if (data.rows.length == 0) {
                res.send(false);
            } else {
                const route_points = await (await postgress.getRouteDetailsByRouteId(data.rows[0].route_id)).rows;
                // console.log(route_points);
                const index = route_points.findIndex((route_point) => route_point.rfid_ip_address === req.params.rfid_ip);
                const activeTrip = await (await postgress.getActiveTripByVehicle_id(req.params.vehicle_no)).rows;
                let currentTrip;
                let currentIndex;
                let currentPoint;
                let previousPoint;
                if (activeTrip.length > 0) {
                    currentTrip = await (await postgress.getTripDetailsByTripId(activeTrip[0].trip_id)).rows;
                    currentIndex = currentTrip.findIndex((trip) => trip.rfid_ip_address === req.params.rfid_ip);
                    currentPoint = currentTrip[currentIndex];
                    previousPoint = currentTrip[currentIndex - 1];
                }

                switch (index) {
                    case 0:
                        // console.log("trip start");
                        // console.log(route.rows[0]["route-config"][0].route_id)
                        const route_id = route.rows[0]["route-config"][0].route_id;
                        if (activeTrip.length == 0) {
                            const trip = await postgress.createTrip(route.rows[0].vehicle_id, route_id);
                            let values = [];
                            route_points.forEach((point) => {
                                let temp = [];
                                temp.push(trip.rows[0].trip_id);
                                temp.push(route.rows[0].vehicle_id);
                                temp.push(point.route_id);
                                temp.push("false");
                                temp.push("NULL");
                                temp.push(new Date().toISOString());
                                temp.push(route.rows[0].vehicle_no);
                                temp.push(point.route_name);
                                temp.push(point.rfid_ip_address);
                                temp.push(point.rfid_name);
                                temp.push(true);
                                temp.push(req.body.front_view);
                                temp.push(req.body.top_view);
                                values.push(temp);
                            });
                            // console.log(values);
                            values[0][3] = "true";
                            values[0][4] = "AUTO";
                            const trip_info = await postgress.createTrip_Detail(values);
                            // console.log(trip_info);
                            res.send(true);
                            break;
                        } else {
                            res.send(false);
                            break;
                        }


                    case route_points.length - 1 :
                        console.log("trip end");
                        console.log("############################################################");
                        console.log(currentTrip);
                        console.log(currentIndex, currentPoint, previousPoint);
                        if (previousPoint.status == true) {
                            if (previousPoint.open_type === "AUTO" || previousPoint.open_type === "MANUAL") {
                                if (req.params.open_type === "AUTO") {
                                    const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true,req.body.front_view,req.body.top_view)
                                    const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                    res.send(true);
                                }
                            }
                        } else {
                            if (req.params.open_type === "MANUAL") {
                                const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "MANUAL", new Date().toISOString(), true,req.body.front_view,req.body.top_view)
                                const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                res.send(true);
                            } else {
                                res.send(false);
                            }
                        }
                        break;

                    default:
                        console.log("********************************************************************");
                        console.log(currentTrip);

                        console.log(currentIndex, currentPoint, previousPoint);

                        if (previousPoint.status == true) {
                            if (previousPoint.open_type === "AUTO" || previousPoint.open_type === "MANUAL") {
                                if (req.params.open_type === "AUTO") {
                                    const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true,req.body.front_view,req.body.top_view)
                                    res.send(true);
                                }
                            }
                        } else {
                            if (req.params.open_type === "MANUAL") {
                                const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "MANUAL", new Date().toISOString(), true,req.body.front_view,req.body.top_view)
                                res.send(true);
                            } else {
                                res.send(false);
                            }
                        }

                        break;
                }
            }
        } catch (e2) {
            console.error(e2.stack);
            res.send(e2.stack);
        }
    } catch (e) {
        console.error(e.stack);
    }

};


exports.getRfids = async (req, res, next) => {
    const data = await postgress.getRfids();
    res.send(data.rows);
};

exports.getTrips = async (req, res, next) => {
    const data = await postgress.getTrips();
    res.send(data.rows);
};

exports.getTripDetails = async (req, res, next) => {
    const data = await postgress.getTripDetailsByTripId(req.params.id);
    res.send(data.rows);
};

exports.createRfid = async (req, res, next) => {
    const data = await postgress.createRfid(req.params.ipadd, req.params.name, req.params.frontip, req.params.topip, req.params.mine, req.params.area, req.params.status);
    res.send(data);
};

exports.createRoute = async (req, res, next) => {
    try {
        const data = await postgress.createRoute(req.params.name, req.params.area);
        res.send(data.rows);
    } catch (e) {
        console.error(e.stack);
    }


};

exports.createRouteConfig = async (req, res, next) => {
    const data = await postgress.createRouteConfig(req.params.rid, req.params.rfid);
    res.send(data);
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
    res.send(data.rows);
};
exports.deleteRoute = async (req, res, next) => {
    try {
        const data = await postgress.deleteRoute(req.params.id);
        res.send(data.rows);
    } catch (e) {
        res.send(e.stack);
    }
};

exports.deleteRouteConfigByRouteConfigId = async (req, res, next) => {
    try {
        const data = await postgress.deleteRouteConfigByRouteConfigId(req.params.id);
        res.send(data.rows);
    } catch (e) {
        res.send(e.stack);
    }
};

exports.deleteRouteConfigByRouteId = async (req, res, next) => {
    try {
        const data = await postgress.deleteRouteConfigByRouteId(req.params.id);
        res.send(data.rows);
    } catch (e) {
        res.send(e.stack);
    }
};

exports.deleteVehicle = async (req, res, next) => {
    const data = await postgress.deleteVehicle(req.params.id);
    res.send(data.rows);
};

exports.deleteRfid = async (req, res, next) => {
    const data = await postgress.deleteRfid(req.params.id);
    res.send(data.rows);
};

exports.updateRfidPoint = async (req, res, next) => {
    try {
        const data = await postgress.updateRfid(req.params.id, req.params.ipadd, req.params.name, req.params.frontip, req.params.topip, req.params.mine, req.params.area, req.params.status);
        res.send(data);
    } catch (e) {
        res.send(e.stack);
    }

}
