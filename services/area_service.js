exports.getAreasByRegionId = async (client,region_id) => {
    const query = "select * from areas where region_id="+region_id;
    const data = await client.query(query);
    return data;
  };
  
  exports.getAreasByAreaIdAndRegionId = async (client,area_id,region_id) => {
    const query = "select * from areas where area_id ="+area_id+"and region_id="+region_id;
    const data = await client.query(query);
    return data;
  };