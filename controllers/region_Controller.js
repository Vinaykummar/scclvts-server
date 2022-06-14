const client = require("../services/postgress_service");

exports.getRegionsFromDatabase = async (req,res,next) => {
    console.log(req);
    // const data = await client.getRfifsByArea();
    res.send("data.rows");
}

exports.getAreasFromDatabase = async (req,res,next) => {
    const data = await client.getRfifsByArea();
    res.send(data.rows);
}

exports.getMinesFromDatabase = async (req,res,next) => {
    const data = await client.getRfifsByArea();
    res.send(data.rows);
}

exports.getVehiclesFromDatabase = async (req,res,next) => {
    const data = await client.getRfifsByArea();
    res.send(data.rows);
}

exports.getRfidsFromDatabase = async (req,res,next) => {
    const data = await client.getRfidsByMinesAndArea(0,9);
    res.send(data.rows);
}

exports.getRoutesFromDatabase = async (req,res,next) => {
    const data = await client.getRfifsByArea();
    res.send(data.rows);
}

exports.getRouteConfigsFromDatabase = async (req,res,next) => {
    const data = await client.getRfifsByArea();
    res.send(data.rows);
}