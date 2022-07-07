const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.post("/create_region/:name", controller.createRegion);
router.get("/regions", controller.getRegions);
router.get("/areas/:user_id", controller.getAreas);
router.get("/routes", controller.getRoutes);
router.get("/routesDetails", controller.getRouteDetails);
router.get("/routesDetails/:id", controller.getRouteDetailsByRouteId);
router.post("/create_area/:name/:region_id", controller.createArea);
router.post("/create_mine/:name/:area_id", controller.createMine);
router.post("/create_vehicle/:name/:tag_id/:route_id/:area_id/:mine_id/:vehicle_type/:status", controller.createVehicle);
router.get("/mines", controller.getMines);

router.get("/vehicles", controller.getVehicles);
router.get("/vehicle/:vehicle_no", controller.getVehicleByVehicleNo);
router.get("/vehicle/route/:vehicle_no", controller.getVehicleRouteByVehicleNo);
router.get("/vehicle/route-details/:vehicle_no", controller.getVehicleRouteDetailsByVehicleNo);
//verify post request
router.post("/vehicle/route/rfid/verify/:open_type/:vehicle_no/:rfid_ip", controller.getVehicleRouteRfidPoint);
router.get("/rfids", controller.getRfids);
router.post("/trips", controller.getTrips);
router.get("/tripDetails/:id", controller.getTripDetails);
router.post("/createrfid/:ipadd/:name/:frontip/:topip/:mine/:area/:status", controller.createRfid);
router.post("/createroute/:name/:area/:mine/:route_type", controller.createRoute);
router.post("/create_route_config", controller.createRouteConfig);
router.post("/delete/region/:id", controller.deleteRegion);
router.post("/delete/area/:id", controller.deleteArea);
router.post("/delete/mine/:id", controller.deleteMine);
router.post("/delete/route/:id", controller.deleteRoute);
router.post("/delete/vehicle/:id", controller.deleteVehicle);
router.post("/delete/rfid/:id", controller.deleteRfid);
router.post("/delete/route_config/:id", controller.deleteRouteConfigByRouteConfigId);
router.post("/delete/route/route_config/:id", controller.deleteRouteConfigByRouteId);
router.post("/updaterfid/:id/:ipadd/:name/:frontip/:topip/:mine/:area/:status", controller.updateRfidPoint);
router.post("/update_vehicle/:id/:name/:tag_id/:route_id/:area_id/:mine_id/:vehicle_type/:status", controller.updateVehicle);

router.get("/minesByType/:id", controller.getMinesbyType);
router.get("/routesByType/:id", controller.getRoutesByType);
router.post("/manuals", controller.getManuals);
router.post("/tripReports", controller.getTripReports);
router.post("/tripReportsByPoint", controller.getTripReportsByPoint);
router.get("/getActiveTrip/:id", controller.getActiveTrip);

module.exports = router;
