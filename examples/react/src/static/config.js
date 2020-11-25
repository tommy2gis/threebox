const mapConfigJson={
  "routingurl": "http://api.tianditu.gov.cn",
  "serverurl":"http://geowork.wicp.vip/citymonitor",
  "gatewayurl":"http://geowork.wicp.vip/gateway",
  "dataurl":"http://localhost:8081/data/",
  "arcgisurl":"http://192.168.101.201:6080/arcgis/rest/services/rugao/",
  "map3d": {
    "viewport": {
      "latitude": 32.3852029747,
      "longitude": 120.56724545301,
      "zoom": 17,
      "maxZoom": 19,
      "minZoom": 10,
      "bearing": 25,
      "pitch": 50
    }
  },

  "map": {
    "projection": "EPSG:4326",  
    "units": "m",
    "center": {
      "x": 120.56724545301,
      "y": 32.3852029747,
      "crs": "EPSG:4326"
    },
    "zoom": 17,
    "maxZoom": 19,
    "layers": []
  }
}
