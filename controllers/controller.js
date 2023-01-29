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


exports.getMinesbyType = async (req, res, next) => {
    console.log(req.query);
    if (req.query.area_id == undefined) {
        const data = await postgress.getMinesByType(req.params.id);
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

exports.getRoutesByType = async (req, res, next) => {
    console.log(req.params);
    const data = await postgress.getRoutesByType(req.params.id);
    res.send(data.rows);
};

exports.getManuals = async (req, res, next) => {
    const area = req.body.payload.area_type;
    const from = req.body.payload.from;
    const to = req.body.payload.to;
    console.log(area);
    try{
        const data = await postgress.getManuals(area, from, to);
        res.send(data.rows);
    } catch (e) {
        res.send(e);
    }

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
    const vno = req.params.name;
    const vehicle = await postgress.getVehicleByVehicleNo(vno.toUpperCase());
    // console.log(vehicle);
    if (vehicle.rows.length > 0) {
        const data = await postgress.updateVehicle(vehicle.rows[0].vehicle_id, vno.toUpperCase(), vno.toUpperCase(), req.params.area_id, req.params.route_id, req.params.mine_id, req.params.vehicle_type, req.params.status);
        res.send("true");
    } else {
        const data = await postgress.createVehicle(vno.toUpperCase(), vno.toUpperCase(), req.params.area_id, req.params.route_id, req.params.mine_id, req.params.vehicle_type, req.params.status);
        res.send("true");
    }

};

exports.updateVehicle = async (req, res, next) => {
    const vno = req.params.name;
    const data = await postgress.updateVehicle(req.params.id, vno.toUpperCase(), vno.toUpperCase(), req.params.area_id, req.params.route_id, req.params.mine_id, req.params.vehicle_type, req.params.status);
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
        // console.log(route);
        if (route.rows[0].status == true) {


            try {
                data = await postgress.getVehicleRouteRfidPoint(req.params.vehicle_no, req.params.rfid_ip);
                route.rows[0]["route-config"] = data.rows;
                if (data.rows.length == 0) {
                    res.send(false);
                } else {
                    
                    const route_points = await (await postgress.getRouteDetailsByRouteId(data.rows[0].route_id)).rows;
                    // console.log(route_points);
                    let index = route_points.findIndex((route_point) => route_point.rfid_ip_address === req.params.rfid_ip);
                    const activeTrip = await (await postgress.getActiveTripByVehicle_id(req.params.vehicle_no)).rows;
                    let currentTrip;
                    let currentIndex;
                    let currentPoint;
                    let previousPoint;
                    var allOptionalPoints ;
                    var gotPoint = route_points[index];
                    var previousPointFromRoute = route_points[index - 1];

                    if (activeTrip.length > 0) {
                        console.log("Inside active trip true");
                        currentTrip = await (await postgress.getTripDetailsByTripId(activeTrip[0].trip_id)).rows;
                        allOptionalPoints =  currentTrip.filter((point) => point.optional == true);
                        var multipleIps = currentTrip.filter((point) => point.rfid_ip_address === req.params.rfid_ip);
                        // console.log("multipleIps length", multipleIps.length );
                        // console.log(multipleIps);
                        var allFalses = multipleIps.filter((ip) => ip.status == false);
                        console.log("all falses length", allFalses.length);

                        if (multipleIps.length >= 2) {

                            if (allFalses.length >= 2) {
                                index = currentTrip.findIndex((trip) => trip.trip_info_id === multipleIps[0].trip_info_id);
                                currentPoint = currentTrip[index];
                                previousPoint = currentTrip[index - 1];
                            } else {
                                console.log(multipleIps);
                                multipleIps.forEach((point) => {
                                    if (point.status == false) {
                                        index = currentTrip.findIndex((trip) => trip.trip_info_id === point.trip_info_id);
                                        console.log("currentIndex", index);
                                        console.log("index", index);
                                        currentPoint = currentTrip[index];
                                        previousPoint = currentTrip[index - 1];
                                    }
                                })
                            }

                        } else {
                            index = currentTrip.findIndex((trip) => trip.rfid_ip_address === req.params.rfid_ip);
                            currentPoint = currentTrip[index];
                            previousPoint = currentTrip[index - 1];
                        }

                        if(gotPoint.route_start) {
                            console.log("Double time start");
                            // const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                            res.send(false);
                        } else {
                            if(gotPoint.route_start == false && gotPoint.route_end == true) {
                                console.log("trip end");
                                console.log("############################################################");
                                console.log(currentTrip);
                                console.log(index, currentPoint, previousPoint);
                                console.log("OPtional points");
                                console.log("optional points length in trip " + allOptionalPoints.length);
                                var touchedOptionalPoints = allOptionalPoints.filter((point) => point.status == true);
                                if(touchedOptionalPoints.length > 0) {
                                    console.log("Touched atleast one optional Point");
                                    if (previousPoint.status == true && currentPoint.status == false) {
                                        if (previousPoint.open_type === "AUTO" || previousPoint.open_type === "MANUAL") {
                                            if (req.params.open_type === "AUTO") {
                                                const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                                const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                                if (route.rows[0].vehicle_type_name == 'PHD') {
                                                    const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                                }

                                                res.send(true);
                                            }
                                        }
                                    } else {
                                        console.log("in Previous point" + previousPoint.route_end, previousPoint.route_start);
                                        if (previousPointFromRoute.route_end == true) {

                                            const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                            const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())

                                            if (route.rows[0].vehicle_type_name == 'PHD') {
                                                const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                            }
                                            res.send(true);
                                        } else {
                                            if (req.params.open_type === "MANUAL") {
                                                const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "MANUAL", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                                const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                                if (route.rows[0].vehicle_type_name == 'PHD') {
                                                    const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                                }
                                                res.send(true);
                                            } else {
                                                console.log("Sent from here");
                                                if(gotPoint.route_end == true) {
                                                    const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                                    const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                                    if (route.rows[0].vehicle_type_name == 'PHD') {
                                                        const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                                    }
                                                    res.send(true);
                                                } else {
                                                    res.send(false);
                                                }

                                            }
                                        }
                                    }
                                } else {
                                    console.log("Not Touched atleast one optional Point");
                                    if (req.params.open_type === "MANUAL") {
                                        const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "MANUAL", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                        const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                        if (route.rows[0].vehicle_type_name == 'PHD') {
                                            const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                        }
                                        res.send(true);
                                    } else {
                                        if(gotPoint.preweightbin == true) { 
                                            const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                            const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                            if (route.rows[0].vehicle_type_name == 'PHD') {
                                                const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                            }
                                            res.send(true);
                                        } else {
                                            if(allOptionalPoints.length == 0 && previousPoint.status == true) {
                                                const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                                const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                                if (route.rows[0].vehicle_type_name == 'PHD') {
                                                    const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                                }
                                                res.send(true);
                                            } else {
                                                console.log("not touched point");
                                                res.send(false);
                                            }
                                        }
                                    }
                                }


                            } else {
                                console.log("********************************************************************");
                                // console.log(currentTrip);

                                console.log(index, currentPoint, previousPoint);


                                if (previousPoint.status == true && currentPoint.status == false) {
                                    if (previousPoint.open_type === "AUTO" || previousPoint.open_type === "MANUAL") {
                                        if (req.params.open_type === "AUTO") {
                                            const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                            res.send(true);
                                        }
                                    }
                                } else {
                                    if (previousPointFromRoute.optional == false && previousPointFromRoute.route_start == true && previousPoint.status == false) {
                                        const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                        res.send(true);
                                    } else {
                                        if (req.params.open_type === "MANUAL") {
                                            const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "MANUAL", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                            res.send(true);
                                        } else {
                                            if(gotPoint.optional == true && previousPointFromRoute.optional == true) {
                                                let firstOptionalPointIndex = currentTrip.findIndex((trip) => trip.rfid_ip_address == allOptionalPoints[0].rfid_ip_address);
                                                console.log("firstOptionalPointIndex" + firstOptionalPointIndex);
                                                console.log(currentTrip[firstOptionalPointIndex]);
                                                let pointBeforeFirstOptionalPoint = currentTrip[firstOptionalPointIndex - 1];
                                                console.log(pointBeforeFirstOptionalPoint);

                                                if(pointBeforeFirstOptionalPoint.optional == false && pointBeforeFirstOptionalPoint.status == false) {
                                                    res.send(false);
                                                } else {
                                                    const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                                    res.send(true);
                                                }
                                            } else {
                                               res.send(false);
                                            }

                                        }
                                    }
                                }
                            }
                        }




                    } else {
                        if (req.params.open_type === "MANUAL") {
                                const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
                                res.send(true);
                        } else {
                            console.log("Got Index of rfid points", index);
                            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                            console.log(route_points[index]);
                            gotPoint = route_points[index];
                            if(gotPoint.optional == false && gotPoint.route_start == true && gotPoint.route_end == false) {
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
                                        temp.push("null");
                                        temp.push("null");
                                        temp.push(point.optional);
                                        temp.push(point.route_start);
                                        temp.push(point.route_end);
                                        temp.push(point.preweightbin);
                                        values.push(temp);
                                    });
                                    // console.log(values);
                                    values[index][3] = "true";
                                    values[index][4] = "AUTO";
                                    values[index][11] = req.body.front_view ;
                                    values[index][12] = req.body.top_view ;
                                    const trip_info = await postgress.createTrip_Detail(values);
                                    // console.log(trip_info);
                                    res.send(true);
                                } else {
                                    res.send(false);
                                }
                            } else {
                                   res.send(false);
                            }

                        }

                        console.log("Inside active trip false");
                    }


                }
            } catch (e2) {
                console.error(e2.stack);
                if (req.params.open_type === "MANUAL") {

                        const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
                        res.send(true);


                } else {
                    res.send(false);
                }
                console.log("Inside catch 1");
            }
        } else {
            if (req.params.open_type === "MANUAL") {

                    const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
                    res.send(true);

            } else {
                res.send(false);
            }
        }
    } catch (e) {
        console.error(false);
        if (req.params.open_type === "MANUAL") {

            const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
            res.send(true);

        } else {
            res.send(false);
        }
        console.log("Inside catch 2");

    }

};

exports.addToAllowedTrips = async (req,res) => {
    console.log(req.params.vehicle_no);
    console.log(req.body.front_view);
    console.log(req.body.top_view);
    let route;
    let data;
    try {
        route = await postgress.getVehicleRouteNameByVehicleNo(req.params.vehicle_no);
        // console.log(route);
        if (route.rows[0].status == true) {


            try {
                data = await postgress.getVehicleRouteRfidPoint(req.params.vehicle_no, req.params.rfid_ip);
                route.rows[0]["route-config"] = data.rows;
                if (data.rows.length == 0) {
                    res.send(false);
                } else {
                    const route_points = await (await postgress.getRouteDetailsByRouteId(data.rows[0].route_id)).rows;
                    // console.log(route_points);
                    let index = route_points.findIndex((route_point) => route_point.rfid_ip_address === req.params.rfid_ip);
                    const activeTrip = await (await postgress.getActiveTripByVehicle_id(req.params.vehicle_no)).rows;
                    let currentTrip;
                    let currentIndex;
                    let currentPoint;
                    let previousPoint;
                    var allOptionalPoints ;
                    var gotPoint = route_points[index];
                    var previousPointFromRoute = route_points[index - 1];

                    if (activeTrip.length > 0) {
                        console.log("Inside active trip true");
                        currentTrip = await (await postgress.getTripDetailsByTripId(activeTrip[0].trip_id)).rows;
                        allOptionalPoints =  currentTrip.filter((point) => point.optional == true);
                        var multipleIps = currentTrip.filter((point) => point.rfid_ip_address === req.params.rfid_ip);
                        // console.log("multipleIps length", multipleIps.length );
                        // console.log(multipleIps);
                        var allFalses = multipleIps.filter((ip) => ip.status == false);
                        console.log("all falses length", allFalses.length);

                        if (multipleIps.length >= 2) {

                            if (allFalses.length >= 2) {
                                index = currentTrip.findIndex((trip) => trip.trip_info_id === multipleIps[0].trip_info_id);
                                currentPoint = currentTrip[index];
                                previousPoint = currentTrip[index - 1];
                            } else {
                                console.log(multipleIps);
                                multipleIps.forEach((point) => {
                                    if (point.status == false) {
                                        index = currentTrip.findIndex((trip) => trip.trip_info_id === point.trip_info_id);
                                        console.log("currentIndex", index);
                                        console.log("index", index);
                                        currentPoint = currentTrip[index];
                                        previousPoint = currentTrip[index - 1];
                                    }
                                })
                            }

                        } else {
                            index = currentTrip.findIndex((trip) => trip.rfid_ip_address === req.params.rfid_ip);
                            currentPoint = currentTrip[index];
                            previousPoint = currentTrip[index - 1];
                        }

                        if(gotPoint.route_start) {
                            console.log("Double time start");
                            const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                            res.send(true);
                        } else {
                            if(gotPoint.route_start == false && gotPoint.route_end == true) {
                                console.log("trip end");
                                console.log("############################################################");
                                console.log(currentTrip);
                                console.log(index, currentPoint, previousPoint);
                                console.log("OPtional points");
                                console.log("optional points length in trip " + allOptionalPoints.length);
                                var touchedOptionalPoints = allOptionalPoints.filter((point) => point.status == true);
                                if(touchedOptionalPoints.length > 0) {
                                    console.log("Touched atleast one optional Point");
                                    if (previousPoint.status == true && currentPoint.status == false) {
                                        if (previousPoint.open_type === "AUTO" || previousPoint.open_type === "MANUAL") {
                                            if (req.params.open_type === "AUTO") {
                                                const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                                const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                                if (route.rows[0].vehicle_type_name == 'PHD') {
                                                    const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                                }

                                                res.send(true);
                                            }
                                        }
                                    } else {
                                        console.log("in Previous point" + previousPoint.route_end, previousPoint.route_start);
                                        if (previousPointFromRoute.route_end == true) {

                                            const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                            const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())

                                            if (route.rows[0].vehicle_type_name == 'PHD') {
                                                const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                            }
                                            res.send(true);
                                        } else {
                                            if (req.params.open_type === "MANUAL") {
                                                const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "MANUAL", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                                const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                                if (route.rows[0].vehicle_type_name == 'PHD') {
                                                    const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                                }
                                                res.send(true);
                                            } else {
                                                console.log("Sent from here");
                                                if(gotPoint.route_end == true) {
                                                    const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                                    const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                                    if (route.rows[0].vehicle_type_name == 'PHD') {
                                                        const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                                    }
                                                    res.send(true);
                                                } else {
                                                    const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                                    const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                                    if (route.rows[0].vehicle_type_name == 'PHD') {
                                                        const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                                    }
                                                    res.send(true);
                                                }

                                            }
                                        }
                                    }
                                } else {
                                    console.log("Not Touched atleast one optional Point");
                                    if (req.params.open_type === "MANUAL") {
                                        const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "MANUAL", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                        const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                        if (route.rows[0].vehicle_type_name == 'PHD') {
                                            const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                        }
                                        res.send(true);
                                    } else {
                                        if(gotPoint.preweightbin == true) {
                                            const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                            const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                            if (route.rows[0].vehicle_type_name == 'PHD') {
                                                const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                            }
                                            res.send(true);
                                        } else {
                                            const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                            const data2 = await postgress.updateTrip(activeTrip[0].trip_id, new Date().toISOString())
                                            if (route.rows[0].vehicle_type_name == 'PHD') {
                                                const data3 = await postgress.updateVehicleStatus(route.rows[0].vehicle_id, false);
                                            }
                                            res.send(true);
                                        }

                                    }
                                }


                            } else {
                                console.log("********************************************************************");
                                // console.log(currentTrip);

                                console.log(index, currentPoint, previousPoint);


                                if (previousPoint.status == true && currentPoint.status == false) {
                                    if (previousPoint.open_type === "AUTO" || previousPoint.open_type === "MANUAL") {
                                        if (req.params.open_type === "AUTO") {
                                            const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                            res.send(true);
                                        }
                                    }
                                } else {
                                    if (previousPointFromRoute.optional == false && previousPointFromRoute.route_start == true ) {
                                        const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                        res.send(true);
                                    } else {
                                        if (req.params.open_type === "MANUAL") {
                                            const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "MANUAL", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                            res.send(true);
                                        } else {
                                            if(gotPoint.optional == true && previousPointFromRoute.optional == true) {
                                                let firstOptionalPointIndex = currentTrip.findIndex((trip) => trip.rfid_ip_address == allOptionalPoints[0].rfid_ip_address);
                                                console.log("firstOptionalPointIndex" + firstOptionalPointIndex);
                                                console.log(currentTrip[firstOptionalPointIndex]);
                                                let pointBeforeFirstOptionalPoint = currentTrip[firstOptionalPointIndex - 1];
                                                console.log(pointBeforeFirstOptionalPoint);

                                                if(pointBeforeFirstOptionalPoint.optional == false && pointBeforeFirstOptionalPoint.status == false) {
                                                    const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                                    res.send(true);
                                                } else {
                                                    const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                                    res.send(true);
                                                }
                                            } else {
                                                const data = await postgress.updateTripDetail(currentPoint.trip_info_id, "AUTO", new Date().toISOString(), true, req.body.front_view, req.body.top_view)
                                                res.send(true);
                                            }

                                        }
                                    }
                                }
                            }
                        }




                    } else {
                        if (req.params.open_type === "MANUAL") {
                            const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
                            res.send(true);
                        } else {
                            console.log("Got Index of rfid points", index);
                            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                            console.log(route_points[index]);
                            gotPoint = route_points[index];
                            if(gotPoint.optional == false && gotPoint.route_start == true && gotPoint.route_end == false) {
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
                                        temp.push("null");
                                        temp.push("null");
                                        temp.push(point.optional);
                                        temp.push(point.route_start);
                                        temp.push(point.route_end);
                                        temp.push(point.preweightbin);
                                        values.push(temp);
                                    });
                                    // console.log(values);
                                    values[index][3] = "true";
                                    values[index][4] = "AUTO";
                                    values[index][11] = req.body.front_view ;
                                    values[index][12] = req.body.top_view ;
                                    const trip_info = await postgress.createTrip_Detail(values);
                                    // console.log(trip_info);
                                    res.send(true);
                                } else {
                                    const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
                                    res.send(true);
                                }
                            } else {
                                const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
                                res.send(true);
                            }

                        }

                        console.log("Inside active trip false");
                    }


                }
            } catch (e2) {
                console.error(e2.stack);
                if (req.params.open_type === "MANUAL") {

                    const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
                    res.send(true);


                } else {
                    const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
                    res.send(true);
                }
                console.log("Inside catch 1");
            }
        } else {
            if (req.params.open_type === "MANUAL") {

                const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
                res.send(true);

            } else {
                const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
                res.send(true);
            }
        }
    } catch (e) {
        console.error(false);
        if (req.params.open_type === "MANUAL") {

            const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
            res.send(true);

        } else {
            const data = await postgress.createManualVehicle(req.params.vehicle_no, req.body.front_view, req.body.top_view, new Date().toISOString(), req.params.rfid_ip);
            res.send(true);
        }
        console.log("Inside catch 2");

    }
}


exports.getRfids = async (req, res, next) => {
    const data = await postgress.getRfids();
    res.send(data.rows);
};

exports.getTrips = async (req, res, next) => {
    const vehicle = req.body.payload.vehicle;
    const area = req.body.payload.area_type;
    const from = req.body.payload.from;
    const to = req.body.payload.to;
    const data = await postgress.getTrips(vehicle,area,from,to);
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
        const data = await postgress.createRoute(req.params.name, req.params.area, req.params.mine, req.params.route_type);
        res.send(data.rows);
    } catch (e) {
        console.error(e.stack);
    }
};

exports.createRouteConfig = async (req, res, next) => {
    console.log(req.body.data);
    const query = `insert into route_config(route_id, rfid_id, optional) values %L`
    const data = await postgress.createRouteConfig(req.body.data);
    res.send(data);
};

exports.clearStage = async (req, res, async) => {
    console.log(req.params.id);
    const data = await postgress.updateTripDetail(req.params.id, "NULL", new Date().toISOString(), false, null, null);
    res.send(data);
}

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

exports.getTripReports = async (req, res, next) => {
    console.log(req.body.payload);
    const vehicles = req.body.payload.vehicles;
    const vehicle_type = req.body.payload.vehicle_type;
    const mine = req.body.payload.mine_type;
    const area = req.body.payload.area_type;
    const from = req.body.payload.from;
    const to = req.body.payload.to;
    const source = req.body.payload.source;
    const destination = req.body.payload.destination;
    let str = "";
    if(vehicles.length == 1) {
        str = "(" + vehicles[0] + ")";
    } else {
        vehicles.forEach((val, index) => {
            switch (index) {
                case 0 : str = "(" + val + ","; break;
                case vehicles.length -1 : str += val + ")"; break;
                default: str += val + ","; break;
            }
        });
    }
    try {
            const points =  "(" + "'" + source + "'" + ", " + "'" + destination + "'" + ")";
            console.log(points);
            const data = await postgress.getTripReportsPHD(
                str,area,mine,from,to,points
            );
            res.send(data.rows);

    } catch (e) {
        res.send(e.stack);
    }

}

exports.getTripReportsByPoint = async (req, res, next) => {
    const point = req.body.payload.point;
    const mine = req.body.payload.mine_type;
    const area = req.body.payload.area_type;
    const from = req.body.payload.from;
    const to = req.body.payload.to;
    try {
            const data = await postgress.getTripReportsByPoint(
                point, area, mine, from, to
            );
            console.log(data);
            res.send(data.rows);


    } catch (e) {
        res.send(e.stack);
    }

}



exports.getActiveTrip = async (req, res, next) => {
    try {
        const data = await postgress.getOnGoingTrips(
           req.params.id
        );
        console.log(data);
        res.send(data.rows);
    } catch (e) {
        res.send(e.stack);
    }
}

exports.endActiveTrip = async (req, res, next) => {
    try {
        const data = await postgress.endActiveTrip(
            req.params.id,
            new Date().toISOString()
        );
        console.log(data);
        res.send(data);
    } catch (e) {
        res.send(e.stack);
    }
}

exports.resumeTrip = async (req, res, next) => {
    try {
        const data = await postgress.resumeTrip(
            req.params.id,
            new Date().toISOString(),
        );
        console.log(data);
        res.send(data);
    } catch (e) {
        res.send(e.stack);
    }
}