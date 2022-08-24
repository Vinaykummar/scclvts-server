const {Client} = require("pg");
const format = require("pg-format");
const client = new Client({
    user: "uedhcthd49fusd",
    password: "pec653ff5f2414b94af5b12870abf41a80e74d8d76173725c18a7c14eacbe621e",
    database: "de1tts8su5l4c8",
    host: "ec2-50-17-64-161.compute-1.amazonaws.com",
    port: 5432,
    ssl: {rejectUnauthorized: false}
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
    const query = `insert into regions(region_name) values (` + "'" + name + "'" + `)`;
    client.query(query).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    })
};

exports.getRegionsById = async (region_id) => {
    const query = "select * from regions where region_id = " + region_id;
    const data = await client.query(query);
    return data;
};

exports.createArea = async (name, region_id) => {
    const query = `insert into areas(area_name, region_id) values (` + "'" + name + "'" + `,` + "'" + region_id + "'" + `)`;
    client.query(query).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    })
};

exports.createRoute = async (name, area_id, mine_id, route_type) => {
    try {
        const query = `insert into routes(route_name, area_id, mine_id,route_type_id) values (` + "'" + name + "'" + `,` + "'" + area_id + "'" + `,` + "'" + mine_id + "'" + `,`  + route_type +   `) Returning route_id`;
        return await client.query(query);
    } catch (e) {
        return e.stack;
    }
};

exports.createRouteConfig = async (body) => {
   const query = `insert into route_config(route_id, rfid_id, optional, route_start, route_end, preweightbin) values %L`;

    var sql =   format(query,body);
    console.log(sql);
    client.query(sql).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    })
    // const query = `insert into route_config(route_id, rfid_id, optional) values (` + "'" + rid + "'" + `,` + "'" + rfid + "'" + `,` + optional  + `)`;
    // client.query(query).then((res) => {
    //     return res;
    // }).catch((err) => {
    //     return err;
    // })
};

exports.createMine = async (name, area_id) => {
    const query = `insert into mines(mine_name, area_id) values (` + "'" + name + "'" + `,` + "'" + area_id + "'" + `)`;
    client.query(query).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    })
};

exports.createRfid = async (ip, name, frip, tpip, mid, aid, status) => {
    const query = `insert into rfids(
    rfid_ip_address,
    rfid_name,
    rfid_front_cam_ip_address,
    rfid_top_cam_ip_address,
    mine_id, 
    area_id,
    status) values (` + "'" + ip + "'" + `,` + "'" + name + "'" + `,` + "'" + frip + "'" + `,` + "'" + tpip + "'" + `,` + "'" + mid + "'" + `,` + "'" + aid + "'" + `,` + status + `)`;
    client.query(query).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    })
};
exports.updateRfid = async (id, ipadd, name, frontip, topip, mine, area, status) => {
    const query = `UPDATE rfids SET 
        rfid_ip_address = ` + "'" + ipadd + "'" + `,rfid_name = ` + "'" + name + "'" + `,rfid_front_cam_ip_address =` + "'" + frontip + "'" + `,rfid_top_cam_ip_address =` + "'" + topip + "'" + `,area_id =` + area + `,mine_id =` + mine + `,status =` + status + ` WHERE rfid_id = ` + id;
    console.log(query);
    client.query(query).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    })
}

exports.getareas = async (user_name) => {
    const query = `
select 
areas.area_name,
areas.area_id,
regions.region_name
from 
user_config
inner join users on users.user_id = user_config.user_id
inner join areas on areas.area_id = user_config.area_id
inner join regions on regions.region_id = areas.region_id
where users.username =` + "'" + user_name + "'" + ``;
    const data = await client.query(query);
    return data;
};

exports.getAreasByRegionId = async (region_id) => {
    const query = "select * from areas where region_id=" + region_id;
    const data = await client.query(query);
    return data;
};

exports.getAreasByAreaIdAndRegionId = async (area_id, region_id) => {
    const query = "select * from areas where area_id =" + area_id + "and region_id=" + region_id;
    const data = await client.query(query);
    return data;
};

exports.getMines = async () => {
    const query = `select mines.mine_id,mines.mine_name,areas.area_id,areas.area_name from mines
  inner join areas on areas.area_id = mines.area_id;`;
    const data = await client.query(query);
    return data;
};

exports.getMinesByType = async (typeId) => {
    const query = `select mines.mine_id,mines.mine_name,areas.area_id,areas.area_name from mines
  inner join areas on areas.area_id = mines.area_id
  inner join mine_type on mine_type.mine_type_id = mines.mine_type_id where mine_type.mine_type_id = `+typeId;
    const data = await client.query(query);
    return data;
};


exports.getMinesByAreaId = async (area_id) => {
    const query = "select * from mines where area_id = " + area_id;
    const data = await client.query(query);
    return data;
};

exports.getManuals = async (area, from, to) => {
    const query = `select * from manual_vehicles
inner join rfids on rfids.rfid_ip_address = manual_vehicles.rfid_ip_address 
inner join mines on mines.mine_id = rfids.mine_id
inner join areas on areas.area_id = rfids.area_id
where areas.area_id = ` + "'" + area + "'" + ` and
manual_vehicles.timestamp between ` + "'" + from + "'" + `::timestamp - interval '5.3 hour' and  ` + "'" + to + "'" + `::timestamp  - interval '5.3 hour' order by manual_vehicles.timestamp desc
`;
    console.log(query);
    const data = await client.query(query);
    return data;
};

exports.getMinesByMineIdAndAreaId = async (mine_id, area_id) => {
    const query = "select * from mines where mine_id = " + mine_id + " and area_id = " + area_id;
    const data = await client.query(query);
    return data;
};

exports.createVehicle = async (name, tag_id, area_id, route_id, mine_id, vehicle_type,status) => {
    const query = `insert into vehicles (vehicle_no,vehicle_tag_id,area_id,mine_id,vehicle_type_id,status) values (` + "'" + name + "'" + `,` + "'" + tag_id + "'" + `,` + area_id + `,` + mine_id +`,` + vehicle_type +`,` + status + `) Returning vehicle_id`;
    console.log(query);
    client.query(query).then(async (res) => {
        const query2 = `insert into vehicle_route_config (vehicle_id,route_id) values (` + res.rows[0].vehicle_id + `,` + route_id + `)`;
        console.log(query2);
        client.query(query2).then((res2) => {
            return res2;
        }).catch((err1) => {
            return err1;
        })
    }).catch((err) => {
        return err;
    })
};

exports.updateVehicle = async (id, name, tag_id, area_id, route_id, mine_id, vehicle_type,status) => {
    const query = `UPDATE vehicles SET 
        vehicle_no = ` + "'" + name + "'" + `,vehicle_tag_id = ` + "'" + tag_id + "'" + `,area_id =` + area_id + `,mine_id =` + mine_id +`,vehicle_type_id =` + vehicle_type + `,status =` + status +  ` WHERE vehicle_id = ` + id;
    // const query = `insert into vehicles (vehicle_no,vehicle_tag_id,area_id) values (` + "'" + name + "'" + `,` + "'" + tag_id + "'" + `,` + area_id + `) Returning vehicle_id`;
    console.log(query);
    client.query(query).then(async (res) => {
        const query2 = `UPDATE vehicle_route_config SET 
        route_id = ` + route_id + ` WHERE vehicle_id = ` + id;
        // const query2 = `insert into vehicle_route_config (vehicle_id,route_id) values (` + res.rows[0].vehicle_id + `,` + route_id + `)`;
        console.log(query2);
        client.query(query2).then((res2) => {
            return res2;
        }).catch((err1) => {
            return err1;
        })
    }).catch((err) => {
        return err;
    })
};

exports.updateVehicleStatus = async (vehicle_id,status) => {
    const query = `update vehicles set status = `+ status +` where vehicle_id =` + vehicle_id;
    console.log(query);
    const data = await client.query(query);
    return data;
}

exports.createManualVehicle = async (vno,fv,tv,timestamp,ip) => {
    const query = `insert into manual_vehicles (vehicle_no,front_view,top_view,timestamp,rfid_ip_address) values (` + "'" + vno + "'" + `,` + "'" + fv + "'" + `,` + "'" + tv + "'" + `,` + "'" + timestamp + "'" +`,` + "'" + ip + "'" + `)`;
    //const query = `insert into manual_vehicles (vehicle_no,front_view,top_view,timestamp,rfid_ip_address)
    //values ("'" +vno+  "'" + "," + "'" +front_view+  "'" + "," + "'" +top_view+  "'" + "," + "'" + timestamp+  "'" + "," + "'" +rfid_ip_address+  "'" + ``)`;
    console.log(query);
    const data = await client.query(query);
    return data;
}


exports.getVehicles = async () => {
    const query = `
  select 
  vehicles.vehicle_id,
  routes.route_id,
  vehicles.vehicle_no,
  vehicles.vehicle_tag_id, 
  vehicles.vehicle_type_id, 
  vehicle_type.vehicle_type_name, 
  vehicles.status, 
  routes.route_name,
  areas.area_name,
  areas.area_id,
  mines.mine_id,
  mines.mine_name,
  vehicle_route_config.vehicle_route_config_id
  from 
  vehicles 
  inner join areas on areas.area_id = vehicles.area_id
  INNER JOIN vehicle_route_config ON vehicle_route_config.vehicle_id = vehicles.vehicle_id
  INNER JOIN mines ON mines.mine_id = vehicles.mine_id
  INNER JOIN vehicle_type ON vehicle_type.vehicle_type_id = vehicles.vehicle_type_id
  INNER JOIN routes ON routes.route_id = vehicle_route_config.route_id`;
    const data = await client.query(query);
    return data;
};

exports.getVehiclesByVehicleIdAndAreaId = async (vehicle_id, area_id) => {
    const query = "select * from vehicles where vehicle_id = " + vehicle_id + " and area_id = " + area_id;
    const data = await client.query(query);
    return data;
};

exports.getVehicleByVehicleNo = async (vehicle_no) => {
    const query = `
  select 
  vehicles.vehicle_id,
  vehicles.vehicle_no,
  vehicles.vehicle_tag_id,
  areas.area_name,
  regions.region_name
  from vehicles 
  inner join areas on areas.area_id = vehicles.area_id
  inner join regions on regions.region_id = areas.region_id
  where vehicles.vehicle_no =` + "'" + vehicle_no + "'" + ``;
    console.log(query);
    const data = await client.query(query);
    return data;
};

exports.getVehicleRouteNameByVehicleNo = async (vehicle_no) => {
    const query = `
select 
  vehicles.vehicle_id,
  vehicles.vehicle_no,
  vehicles.status,
  vehicles.vehicle_type_id,
  vehicle_type.vehicle_type_name,
  routes.route_name
  from
  vehicles
  INNER JOIN vehicle_route_config ON vehicle_route_config.vehicle_id = vehicles.vehicle_id
  INNER JOIN routes ON routes.route_id = vehicle_route_config.route_id
  INNER JOIN vehicle_type ON vehicle_type.vehicle_type_id = vehicles.vehicle_type_id
  where vehicles.vehicle_no = ` + "'" + vehicle_no + "'" + ``;
    // console.log(query);
    try {
        return await client.query(query);
    } catch (e) {
        console.error(e.stack);
        return e.stack;
    }

};

exports.getVehicleRouteDetailsByVehicleNo = async (vehicle_no) => {
    const query = `
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
where vehicles.vehicle_no = ` + "'" + vehicle_no + "'" + `order by route_config.route_config_id`;
    console.log(query);
    const data = await client.query(query);
    return data;
};

exports.getVehicleRouteRfidPoint = async (vehicle_no, rfid_ip) => {
    const query = `
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
where vehicles.vehicle_no = ` + "'" + vehicle_no + "'" + ` and rfids.rfid_ip_address = ` + "'" + rfid_ip + "'" + ``;
    try {
        return await client.query(query);
    } catch (e) {
        console.error(e.stack);
        return e.stack;
    }

};

exports.getRfids = async () => {
    const query = `select 
  rfids.rfid_id,
  rfids.rfid_ip_address,
  rfids.rfid_name,
  rfids.rfid_front_cam_ip_address,
  rfids.rfid_top_cam_ip_address,
  rfids.status,
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
  inner join mines on mines.mine_id = routes.mine_id
  inner join route_type on route_type.route_type_id = routes.route_type_id
  `;
    const data = await client.query(query);
    return data;
};

exports.getRoutesByType = async (route_typ) => {
    const query = `
  SELECT 
  *
  FROM 
  routes
  inner join areas on areas.area_id = routes.area_id
  inner join mines on mines.mine_id = routes.mine_id
  inner join route_type on route_type.route_type_id = routes.route_type_id
  where route_type.route_type_id =` + route_typ;
    const data = await client.query(query);
    return data;
};

exports.getRouteDetails = async (id) => {
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
  route_config.route_config_id,
  route_config.optional,
  route_config.route_start,
  route_config.route_end,
  route_config.preweightbin
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

exports.getRouteDetailsByRouteId = async (route_id) => {
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
route_config.optional,
route_config.route_start,
route_config.route_end,
route_config.preweightbin
FROM 
routes 
INNER JOIN route_config ON route_config.route_id = routes.route_id 
INNER JOIN rfids ON rfids.rfid_id = route_config.rfid_id
INNER JOIN mines ON mines.mine_id = rfids.mine_id
INNER JOIN areas ON areas.area_id = rfids.area_id
where route_config.route_id = ` + route_id + ` order by route_config.route_config_id`;
    // console.log(query);
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

exports.deleteRouteConfigByRouteConfigId = async (id) => {
    try {
        const query = "delete from route_config where route_config_id =" + id;
        return await client.query(query);
    } catch (e) {
        return e.stack;
    }
};

exports.deleteRouteConfigByRouteId = async (id) => {
    try {
        const query = "delete from route_config where route_id =" + id;
        return await client.query(query);
    } catch (e) {
        return e.stack;
    }
};

exports.deleteRoute = async (id) => {
    try {
        const query = "delete  from routes where route_id =" + id;
        return await client.query(query);
    } catch (e) {
        return e.stack;
    }

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
    const query = `insert into trips (vehicle_id,timestamp,route_id,trip_active) values (` + "'" + vno + "'" + `,` + "'" + date.toISOString() + "'" + `,` + "'" + route_id + "'" + ",true" + `) Returning trip_id`;
    const data = await client.query(query);
    return data;
};

exports.getTrips = async (vehicle,area, from, to) => {
    const query = `
SELECT
vehicles.vehicle_no,
trips.trip_id,
trips.vehicle_id,
trips.trip_active,
trips.timestamp,
trips.end_timestamp,
routes.route_name,
areas.area_name,
mines.mine_name
from
trips
inner join vehicles on vehicles.vehicle_id = trips.vehicle_id
inner join routes on routes.route_id = trips.route_id
INNER JOIN mines ON mines.mine_id = routes.mine_id
INNER JOIN areas ON areas.area_id = mines.area_id
inner join vehicle_type on vehicle_type.vehicle_type_id = vehicles.vehicle_type_id
where vehicles.vehicle_no = ` + "'" + vehicle + "'" +  ` and areas.area_id = ` + area + ` and
 trips.timestamp between ` + "'" + from + "'" + `::timestamp - interval '5.3 hour' and  ` + "'" + to + "'" + `::timestamp  - interval '5.3 hour' order by trips.timestamp desc`;
    console.log(query);
    const data = await client.query(query);
    return data;
};

exports.getTripDetailsByTripId = async (id) => {
    const query = `select * from trip_info where trip_id =` +id+ `order by trip_info_id`;
    const data = await client.query(query);
    return data;
};

exports.getActiveTripByVehicle_id = async (vno) => { 
    const query = `select
trips.trip_id,
trips.vehicle_id,
trips.route_id,
trips.trip_active,
trips.timestamp,
vehicles.vehicle_no
from
trips
inner join vehicles on vehicles.vehicle_id = trips.vehicle_id
where vehicles.vehicle_no = ` + "'" + vno + "'" + ` and trips.trip_active=true`;
    const data = await client.query(query);
    // console.log(data);
    return data;
};

exports.getOnGoingTrips = async (id) => {
    const query =
        `select 
  vehicles.vehicle_id,
  vehicles.vehicle_no,
  trips.trip_active
  from 
  vehicles 
  inner join areas on areas.area_id = vehicles.area_id
  INNER JOIN trips ON trips.vehicle_id = vehicles.vehicle_id
  where trips.trip_active = true  and areas.area_id = ` + id + ``;
    const data = await client.query(query);
    // console.log(data);
    return data;
};

exports.createTrip_Detail = async (values) => {
    const tripDetailsQuery = `insert into trip_info
                        (trip_id,vehicle_id,route_id,status,open_type,timestamp,vehicle_no,route_name,rfid_ip_address,rfid_name,trip_active,front_view,top_view,optional,route_start,route_end,preweightbin) 
                        values %L Returning trip_info_id`;
    var sql = format(tripDetailsQuery, values);
    console.log(sql);
    const data = await client.query(sql);
    return data;
};

exports.updateTripDetail = async (id, type, timestamp, status,front_view,top_view) => {
    const query = `UPDATE trip_info SET 
        open_type = ` + "'" + type + "'" + `,timestamp = ` + "'" + timestamp + "'" + `,front_view = ` + "'" + front_view + "'" + `,top_view = ` + "'" + top_view + "'" + `,status =` + status + ` WHERE trip_info_id = ` + id;
    // console.log(query);
    client.query(query).then((res) => {
        return res;
    }).catch((err) => {
        console.log(err);
        return err;
    })
}



exports.updateTrip = async (id,time) => {
    const query = `UPDATE trips SET 
        trip_active = false, end_timestamp = `+"'" + time + "'" + `  WHERE trip_id = ` + id;
    client.query(query).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    })
}

exports.endActiveTrip = async (id,time) => {
    const query = `UPDATE trips SET 
        trip_active = false, end_timestamp = `+"'" + time + "'" + `  WHERE trip_id = ` + id;
    client.query(query).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    })
}

exports.resumeTrip = async (id,time) => {
    const query = `UPDATE trips SET 
        trip_active = true WHERE trip_id = ` + id;
    client.query(query).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    })
}



// exports.getTripReports = async (vehicles,area,mine,from,to) => {
//     const tripDetailsQuery = `
//     SELECT
// vehicles.vehicle_id,
// vehicles.vehicle_no,
// vehicle_type.vehicle_type_name,
// vehicle_type.vehicle_type_id,
// routes.route_name,
// mines.mine_name,
// mines.mine_Id,
// areas.area_name,
// trips.timestamp,
// trips.end_timestamp,
// trips.trip_active,
// trips.trip_id
// from
// trips
// inner join vehicles on vehicles.vehicle_id = trips.vehicle_id
// INNER JOIN vehicle_type ON vehicle_type.vehicle_type_id = vehicles.vehicle_type_id
// INNER JOIN routes ON routes.route_id = trips.route_id
// INNER JOIN mines ON mines.mine_id = routes.mine_id
// INNER JOIN areas ON areas.area_id = mines.area_id
// where trips.vehicle_id in `+vehicles+`
//  and trips.trip_active = false and mines.mine_id = ` + mine + ` and
// areas.area_id = ` + area + ` and
// timestamp between ` + "'" + from + "'" + `::timestamp - interval '5.5 hour' and  ` + "'" + to + "'" + `::timestamp  - interval '5.5 hour' order by timestamp desc`;
//     var sql = format(tripDetailsQuery, vehicles);
//     console.log(sql);
//     const data = await client.query(sql);
//     console.log(data);
//     return data;
// };

exports.getTripReports = async (vehicles,area,mine,from,to, points) => {
    const tripDetailsQuery = `
SELECT
trip_info.trip_info_id,
trip_info.timestamp,
trips.trip_id,
trips.trip_active,
vehicles.vehicle_no,
vehicles.vehicle_id,
routes.route_name,
vehicle_type.vehicle_type_name,
trip_info.rfid_ip_address,  
trip_info.rfid_name,
mines.mine_name,
areas.area_name
from
trip_info
inner join trips on trips.trip_id = trip_info.trip_id
inner join vehicles on vehicles.vehicle_id = trip_info.vehicle_id
inner join routes on routes.route_id = trip_info.route_id
INNER JOIN mines ON mines.mine_id = routes.mine_id
INNER JOIN areas ON areas.area_id = mines.area_id
inner join vehicle_type on vehicle_type.vehicle_type_id = vehicles.vehicle_type_id
where trip_info.vehicle_id in `+vehicles+` and trip_info.rfid_ip_address in ` + points +` and 
trip_info.status = true and mines.mine_id = ` + mine + ` and areas.area_id = ` + area + ` and 
trip_info.timestamp between ` + "'" + from + "'" + `::timestamp - interval '5.3 hour' and  ` + "'" + to + "'" + `::timestamp  - interval '5.3 hour' order by trip_info.timestamp desc`;
    var sql = format(tripDetailsQuery, vehicles);
    console.log(tripDetailsQuery);
    const data = await client.query(tripDetailsQuery);
    return data;
};

exports.getTripReportsPHD = async (vehicles,area,mine,from,to, points) => {
//     const tripDetailsQuery = `
// SELECT
// trip_info.trip_info_id,
// trips.trip_id,
// vehicles.vehicle_id,
// vehicles.vehicle_no,
// routes.route_name,
// vehicle_type.vehicle_type_name,
// trip_info.rfid_ip_address,
// trip_info.rfid_name,
// mines.mine_name,
// areas.area_name
// from
// trip_info
// inner join trips on trips.trip_id = trip_info.trip_id
// inner join vehicles on vehicles.vehicle_id = trip_info.vehicle_id
// inner join routes on routes.route_id = trip_info.route_id
// INNER JOIN mines ON mines.mine_id = routes.mine_id
// INNER JOIN areas ON areas.area_id = mines.area_id
// inner join vehicle_type on vehicle_type.vehicle_type_id = vehicles.vehicle_type_id
// where trip_info.vehicle_id in ` + vehicles + ` and trip_info.rfid_ip_address   = ` + "'" + points[0] + "'" + ` and
// trip_info.status = true and trip_info.rfid_ip_address = `  + "'" + points[1] + "'" + ` and trip_info.status = true and
//  mines.mine_id = ` + mine + ` and areas.area_id = ` + area +` and
// trip_info.timestamp between ` + "'" + from + "'" + `::timestamp - interval '5.3 hour' and  ` + "'" + to + "'" + `::timestamp  - interval '5.3 hour' order by trip_info.timestamp desc`;
    const tripDetailsQuery = `
SELECT
trip_info.trip_info_id,
trips.trip_id,
vehicles.vehicle_id,
vehicles.vehicle_no,
routes.route_name,
vehicle_type.vehicle_type_name,
trip_info.rfid_ip_address,
trip_info.rfid_name,
mines.mine_name,
areas.area_name
from
trip_info
inner join trips on trips.trip_id = trip_info.trip_id
inner join vehicles on vehicles.vehicle_id = trip_info.vehicle_id
inner join routes on routes.route_id = trip_info.route_id
INNER JOIN mines ON mines.mine_id = routes.mine_id
INNER JOIN areas ON areas.area_id = mines.area_id
inner join vehicle_type on vehicle_type.vehicle_type_id = vehicles.vehicle_type_id
where trip_info.vehicle_id in `+vehicles+` and trip_info.rfid_ip_address in ` + points +` and 
trip_info.status = true and mines.mine_id = ` + mine + ` and areas.area_id = ` + area + ` and 
trip_info.timestamp between ` + "'" + from + "'" + `::timestamp - interval '5.3 hour' and  ` + "'" + to + "'" + `::timestamp  - interval '5.3 hour' order by trip_info.timestamp desc`;
    var sql = format(tripDetailsQuery, vehicles);
    // console.log(sql);
    const data = await client.query(tripDetailsQuery);
    // console.log(data);
    return data;
};

exports.getTripReportsByPoint = async (point,area,mine,from,to) => {
    const tripDetailsQuery = `
SELECT
trip_info.trip_info_id,
trip_info.timestamp,
trips.trip_id,
trips.trip_active,
vehicles.vehicle_no,
routes.route_name,
vehicle_type.vehicle_type_name,
trip_info.rfid_ip_address,  
trip_info.rfid_name,
mines.mine_name,
areas.area_name,
trip_info.status,
trip_info.open_type
from
trip_info
inner join trips on trips.trip_id = trip_info.trip_id 
inner join vehicles on vehicles.vehicle_id = trip_info.vehicle_id
inner join routes on routes.route_id = trip_info.route_id
INNER JOIN mines ON mines.mine_id = routes.mine_id
INNER JOIN areas ON areas.area_id = mines.area_id
inner join vehicle_type on vehicle_type.vehicle_type_id = vehicles.vehicle_type_id
where trip_info.rfid_ip_address =  ` + "'" + point + "'" + ` and 
trip_info.status = true and  areas.area_id = ` + area + ` and 
trip_info.timestamp between ` + "'" + from + "'" + `::timestamp - interval '5.3 hour' and  ` + "'" + to + "'" + `::timestamp  - interval '5.3 hour' order by trip_info.timestamp desc`;
    const data = await client.query(tripDetailsQuery);
    console.log(tripDetailsQuery);
    return data;
};