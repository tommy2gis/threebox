const mapConfigJson={
  "routingurl": "http://api.tianditu.gov.cn",
  "serverurl":"http://geowork.wicp.vip:25081/citymonitor",
  "gatewayurl":"http://geowork.wicp.vip:25081/gateway",
  "dataurl":"http://localhost:8081/data/",
  "arcgisurl":"http://192.168.101.201:6080/arcgis/rest/services/rugao/",
  "map3d": {
    "viewport": {
      "latitude": 32.38186566,
      "longitude": 120.5750516,
      "zoom": 14,
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
      "x": 120.575,
      "y": 32.38186566,
      "crs": "EPSG:4326"
    },
    "zoom": 14,
    "maxZoom": 19,
    "layers": []
  }
}
