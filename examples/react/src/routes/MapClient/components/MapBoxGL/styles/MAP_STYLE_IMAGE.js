const imageStyle = {
  version: 8,
  sources: {
    img_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=56e2ef8967b3a0dbb746b7a40b7faa94",
      ],
      tileSize: 256,
    },
    cia_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=cia_c&x={x}&y={y}&l={z}&tk=56e2ef8967b3a0dbb746b7a40b7faa94",
      ],
      tileSize: 256,
    },
    vec_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=56e2ef8967b3a0dbb746b7a40b7faa94",
      ],
      tileSize: 256,
    },
    cva_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=56e2ef8967b3a0dbb746b7a40b7faa94",
      ],
      tileSize: 256,
    },
   
    
    arealocation: {
      type: "geojson",
      data: {},
    },
    routinglocation: {
      type: "geojson",
      data: {},
    },
  },
  layers: [
    {
      id: "img_c",
      type: "raster",
      source: "img_c",
      minzoom: 0,
      maxzoom: 17.5,
    },
    {
      id: "cia_c",
      type: "raster",
      source: "cia_c",
      minzoom: 0,
      maxzoom: 17.5,
    },
   
    {
      id: "arealocation-outline",
      source: "arealocation",
      type: "fill",
      filter: ["all", ["==", "NAME", ""]],
      paint: {
        "fill-color": "rgba(97, 87, 204, 0.1)",
        "fill-opacity": 1,
        "fill-outline-color": "rgb(97, 87, 204)"
      },
    },
    {
      id: "routinglocation-line",
      type: "line",
      source: "routinglocation",
      paint: { "line-color": "#4DA9E5", "line-width": 6 },
    },
  ],
};

const roadStyle = {
  version: 8,
  sources: {
    img_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=56e2ef8967b3a0dbb746b7a40b7faa94",
      ],
      tileSize: 256,
    },
    cia_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=cia_c&x={x}&y={y}&l={z}&tk=56e2ef8967b3a0dbb746b7a40b7faa94",
      ],
      tileSize: 256,
    },
    vec_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=56e2ef8967b3a0dbb746b7a40b7faa94",
      ],
      tileSize: 256,
    },
    cva_c: {
      type: "raster",
      tiles: [
        "http://t0.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=56e2ef8967b3a0dbb746b7a40b7faa94",
      ],
      tileSize: 256,
    },
    arealocation: {
      type: "geojson",
      data: {},
    },
    routinglocation: {
      type: "geojson",
      data: {},
    },
  },
  layers: [
    {
      id: "vec_c",
      type: "raster",
      source: "vec_c",
      minzoom: 0,
      maxzoom: 17.5,
    },
    {
      id: "cva_c",
      type: "raster",
      source: "cva_c",
      minzoom: 0,
      maxzoom: 17.5,
    },
   
    {
      id: "arealocation-outline",
      source: "arealocation",
      type: "fill",
      filter: ["all", ["==", "NAME", ""]],
      paint: {
        "fill-color": "rgba(97, 87, 204, 0.1)",
        "fill-opacity": 1,
        "fill-outline-color": "rgb(97, 87, 204)"
      },
    },
    {
      id: "routinglocation-line",
      type: "line",
      source: "routinglocation",
      paint: { "line-color": "#4DA9E5", "line-width": 6 },
    },
  ],
};
