const express = require("express");
const router = express.Router();
const controller = require("../controllers//controller");

router.post("/create_region/:name", controller.createRegion);
router.get("/regions", controller.getRegions);
router.get("/areas", controller.getAreas);
router.get("/routes", controller.getRoutes);
router.get("/routesDetails", controller.getRouteDetails);
router.post("/create_area/:name/:region_id", controller.createArea);
router.post("/create_mine/:name/:area_id", controller.createMine);
router.post(
  "/create_vehicle/:name/:tag_id/:route_id/:area_id",
  controller.createVehicle
);
router.get("/mines", controller.getMines);
router.get("/vehicles", controller.getVehicles);
router.get("/vehicle/:vehicle_no", controller.getVehicleByVehicleNo);
router.get("/vehicle/route/:vehicle_no", controller.getVehicleRouteByVehicleNo);
router.get(
  "/vehicle/route-details/:vehicle_no",
  controller.getVehicleRouteDetailsByVehicleNo
);
router.get(
  "/vehicle/route/rfid/verify/:vehicle_no/:rfid_ip",
  controller.getVehicleRouteRfidPoint
);
router.get("/rfids", controller.getRfids);
router.post(
  "/createrfid/:ipadd/:name/:frontip/:topip/:mine/:area",
  controller.createRfid
);
router.post("/createroute/:name/:area", controller.createRoute);
router.post("/create_route_config/:rid/:rfid", controller.createRouteConfig);
router.post("/delete/region/:id", controller.deleteRegion);
router.post("/delete/area/:id", controller.deleteArea);
router.post("/delete/mine/:id", controller.deleteMine);
router.post("/delete/route/:id", controller.deleteRoute);
router.post("/delete/vehicle/:id", controller.deleteVehicle);
router.post("/delete/rfid/:id", controller.deleteRfid);
router.post("/delete/route_config/:id", controller.deleteRouteConfig);
module.exports = router;