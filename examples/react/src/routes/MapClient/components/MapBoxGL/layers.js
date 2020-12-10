import { MapboxLayer } from "@deck.gl/mapbox";
import { TripsLayer,Tile3DLayer } from "@deck.gl/geo-layers";
import {Tiles3DLoader} from '@loaders.gl/3d-tiles';
import greatCircle from "@turf/great-circle";
import { point, featureCollection } from "@turf/helpers";
import centroid from "@turf/center";
import {
  getFireMaterial,
  getConeMaterial,
  getWallMaterial,
  getSphereMaterial,
  getShaderBarMaterial,
  getRingMaterial,
} from "./material";

let texture = new THREE.TextureLoader().load("images/red_line.png");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

function addTripLayer(map, routes) {
  const data = [];
  routes.geometries.forEach((fea, index) => {
    if (fea.type === "LineString") {
      var times = Object.keys(
        Array.from({ length: fea.coordinates.length })
      ).map((e) => e * 10);
      data.push({
        coordinates: fea.coordinates,
        timestamps: times,
      });
    }
  });

  const tripLayer = new MapboxLayer({
    type: TripsLayer,
    id: "trips-layer1",
    data,
    getPath: (d) => d.coordinates,
    getTimestamps: (d) => d.timestamps,
    getColor: [33, 150, 243],
    opacity: 0.8,
    widthMinPixels: 2,
    rounded: true,
    trailLength: 50,
  });

  map.addLayer(tripLayer);
  return tripLayer;
}

function add3dTilesLayer(map,data) {
  const tilesLayer = new MapboxLayer({
    type: Tile3DLayer,
    id: "3dtiles-layer",
    loader: Tiles3DLoader,
    data
  });

  map.addLayer(tilesLayer,"兴趣点-level-towm");
  return tilesLayer;
}

function getWallGeometry(line, height) {
  let bs = line[0];
  let points = line.map((item) => {
    let x = (item[0] - bs[0]) * 3100;
    let y = (item[1] - bs[1]) * 3100;
    return new THREE.Vector2(x, y);
  });

  // var straightProject = tb.utils.lnglatsToWorld(line);
  // var points = tb.utils.normalizeVertices(straightProject);
  // var flattenedArray = tb.utils.flattenVectors(normalized.vertices);
  let positions = [];
  let uvs = [];
  for (
    let i = 0, j = positions.length, t = uvs.length;
    i < points.length - 1;
    i++
  ) {
    let vUvyMax = 1;
    let left = points[i];
    let right = points[i + 1];
    positions[j++] = left.x;
    positions[j++] = left.y;
    positions[j++] = 0;
    uvs[t++] = 0;
    uvs[t++] = 0;

    positions[j++] = right.x;
    positions[j++] = right.y;
    positions[j++] = 0;
    uvs[t++] = 1;
    uvs[t++] = 0;

    positions[j++] = left.x;
    positions[j++] = left.y;
    positions[j++] = height;
    uvs[t++] = 0;
    uvs[t++] = vUvyMax;

    positions[j++] = left.x;
    positions[j++] = left.y;
    positions[j++] = height;
    uvs[t++] = 0;
    uvs[t++] = vUvyMax;

    positions[j++] = right.x;
    positions[j++] = right.y;
    positions[j++] = 0;
    uvs[t++] = 1;
    uvs[t++] = 0;

    positions[j++] = right.x;
    positions[j++] = right.y;
    positions[j++] = height;
    uvs[t++] = 1;
    uvs[t++] = vUvyMax;
  }
  let geometry = new THREE.BufferGeometry();
  geometry.addAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(positions), 3)
  );
  geometry.addAttribute(
    "uv",
    new THREE.BufferAttribute(new Float32Array(uvs), 2)
  );
  return geometry;
}
function addWall(params) {
  const geometry = getWallGeometry(
    [
      [120.56302607059479, 32.390421397594814],
      [120.56363761425018, 32.38780766031788],
      [120.56435108184814, 32.38795261826575],
      [120.56506454944609, 32.38821535395333],
      [120.56580483913422, 32.38878159206095],
      [120.56656122207643, 32.38931611757739],
      [120.56727468967436, 32.390086191149685],
      [120.56695282459258, 32.39065241752877],
      [120.56655585765837, 32.390521053325074],
      [120.56613206863403, 32.39038515912019],
      [120.56581020355225, 32.390992151652284],
      [120.5651342868805, 32.39077019216963],
      [120.56458711624147, 32.39072036445571],
      [120.56302607059479, 32.390421397594814],
    ],
    2
  );
  const mesh = new THREE.Mesh(geometry, getWallMaterial());
  mesh.rotation.z = Math.PI;
  tb.add(
    tb
      .Object3D({ obj: mesh, adjustment: { x: 0, y: 0, z: 0.01 } })
      .setCoords([120.56302607059479, 32.390421397594814])
  );
  return mesh;
}

function addCone(point, color) {
  let geometry = new THREE.CylinderBufferGeometry(
    0,
    6.4,
    11,
    4,
    1,
    false,
    0,
    6.3
  );
  geometry.scale(0.1, 0.1, 0.1);
  // geometry.computeBoundingSphere();
  const mesh = new THREE.Mesh(geometry, getConeMaterial(color));
  mesh.rotation.x = -Math.PI / 2;
  tb.add(
    tb
      .Object3D({ obj: mesh, adjustment: { x: 0, y: 0, z: 2 } })
      .setCoords(point)
  );

  return mesh;
}

function addLine(resolution) {
  var arcSegments = 25;
  var linemeshs = [];
  var origns = [
    [120.54374098777771, 32.3888042415114],
    [120.55318236351012, 32.36818183094668],
    [120.59675216674805, 32.37503232765891],
    [120.54162740707397, 32.418442973316466]
  ];

  var destination = [120.56651830673216, 32.38668422833417];

  var maxElevation =
    Math.pow(Math.abs(destination[0] * destination[1]), 0.5) * 20;

  var increments = origns.map((orign) =>
    greatCircle(orign, destination, { npoints: 25 })
  );

  increments.forEach((ment, index) => {
    var line = new Array();
    for (var l = 0; l < arcSegments; l++) {
      var waypoint = ment.geometry.coordinates[l];

      var waypointElevation =
        Math.sin((Math.PI * l) / arcSegments) * maxElevation;

      waypoint.push(waypointElevation);
      line.push(waypoint);
    }
    var straightProject = tb.utils.lnglatsToWorld(line);
    var normalized = tb.utils.normalizeVertices(straightProject);
    var flattenedArray = tb.utils.flattenVectors(normalized.vertices);

    const meshLine = new MeshLine();
    meshLine.setGeometry(normalized);

    let material = new MeshLineMaterial({
      map: texture,
      useMap: true,
      lineWidth: 40,
      resolution: resolution,
      dashArray: 0.9, // 破折号之间的长度和间距。(0 -无破折号)
      dashRatio: 0.3, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
      dashOffset: 0,
      transparent: true,
      sizeAttenuation: 0.5, //使线宽不变，不管距离(1个单位是屏幕上的1px)(0 -衰减，1 -不衰减)
      side: THREE.DoubleSide,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      near: tb.camera.near,
      far: tb.camera.far,
    });

    var tmp = new THREE.Mesh(meshLine.geometry, material);
    tb.add(
      tb
        .Object3D({ obj: tmp, adjustment: { x: 0, y: 0, z: 0.5 } })
        .setCoords([line[12][0], line[12][1]])
    );

    linemeshs.push(tmp);
  });

  return linemeshs;
}

function addFire(point) {
  var _num = 12;
  var _geometry = new THREE.InstancedBufferGeometry();
  _geometry.maxInstancedCount = _num;
  var shape = new THREE.PlaneBufferGeometry(20, 40);
  shape.translate(0, 0.4, 0);
  var data = shape.attributes;
  _geometry.addAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(data.position.array), 3)
  );
  _geometry.addAttribute(
    "uv",
    new THREE.BufferAttribute(new Float32Array(data.uv.array), 2)
  );
  _geometry.addAttribute(
    "normal",
    new THREE.BufferAttribute(new Float32Array(data.normal.array), 3)
  );
  _geometry.setIndex(
    new THREE.BufferAttribute(new Uint16Array(shape.index.array), 1)
  );
  //shape.dispose();
  var orientation = new THREE.InstancedBufferAttribute(
    new Float32Array(_num * 4),
    4
  );
  var randoms = new THREE.InstancedBufferAttribute(new Float32Array(_num), 1);
  var scale = new THREE.InstancedBufferAttribute(new Float32Array(_num * 2), 2);
  var life = new THREE.InstancedBufferAttribute(new Float32Array(_num), 1);
  for (let i = 0; i < _num; i++) {
    orientation.setXYZW(i, 0, 0, 0, 1);
    life.setX(i, i / _num + 1);
  }
  var redMaterial = new THREE.MeshBasicMaterial({
    color: 0x660000,
    side: THREE.DoubleSide,
  });
  _geometry.addAttribute("orientation", orientation);
  _geometry.addAttribute("scale", scale);
  _geometry.addAttribute("life", life);
  _geometry.addAttribute("random", randoms);
  let _mesh = new THREE.Mesh(_geometry, getFireMaterial());

  _mesh.scale.set(0.04, 0.04, 0.04);
  let cube = tb
    .Object3D({ obj: _mesh, adjustment: { x: 0, y: 0.5, z: 0.01 } })
    .setCoords(point);
  cube.rotation.x = Math.PI / 2;

  tb.add(cube);
  return { mesh: _mesh, geometry: _geometry };
}
function addTree() {
  var points = [
    [120.5658209323883, 32.38584164517711],
    [120.5657136440277, 32.3860137864609],
    [120.56562781333922, 32.386149687242714],
    [120.56549906730652, 32.38633088796709],
    [120.56539177894591, 32.386493968308265],
    [120.56528449058533, 32.38668422833417],
    [120.56519865989685, 32.38684730803743],
    [120.5651021003723, 32.387019447404796],
    [120.56501626968382, 32.38715534667361],
    [120.56532740592957, 32.38728218580672],
    [120.56558489799498, 32.38739090492191],
    [120.5658209323883, 32.387490563995875],
    [120.56601405143738, 32.387572103156415],
    [120.56613206863403, 32.38739090492191],
    [120.5663251876831, 32.38734560530648],
    [120.56655049324034, 32.387427144597886],
    [120.56677579879761, 32.38752680363188],
    [120.56705474853516, 32.38761740265826],
    [120.56721568107605, 32.38768988181394],
    [120.56739807128905, 32.38746338425934],
    [120.5674946308136, 32.38727312587455],
    [120.56760191917418, 32.38709192704029],
    [120.56768774986266, 32.3869741476031],
    [120.56777358055115, 32.38688354793152],
    [120.56785941123962, 32.386729528281265],
    [120.56769847869873, 32.38660268837215],
    [120.567387342453, 32.38648490829704],
    [120.56717276573181, 32.3863580680444],
  ];
  var textureTree = new THREE.TextureLoader().load("models/tree.png");
  var spriteMaterial = new THREE.SpriteMaterial({
    map: textureTree,
  });
  points.forEach((point) => {
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.3, 0.3, 0);
    var Sprite3d = tb
      .Object3D({ obj: sprite, adjustment: { x: 0, y: 0, z: 0.5 } })
      .setCoords(point);
    tb.add(Sprite3d);
  });
}

function addlinagc(points,SelectedChange) {
 
  var options = {
    type: "mtl",
    obj: "models/粮仓模型/002.obj",
    scale: 1,
    units: "meters",
    material: new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("models/粮仓模型/002.png"),
      side: THREE.FrontSide,
      transparent: true,
      wireframe: false,
    }),
    anchor: "center",
    rotation: { x: 90, y: 180, z: 180 },
  };
  points.forEach((point,index) => {
    tb.loadObj(options, function (model) {
      const obj = model.setCoords(point);
      obj.attributes={name:(index+1)+'号稻谷仓'}
      obj.addEventListener(
                "SelectedChange",
                SelectedChange,
                false
              );
      tb.add(obj);
    });
  });
}


function addludeng() {
  var points = [
    [
      120.56525766849516,
      32.38705568722981
    ],
    [
      120.56555807590485,
      32.3864758482849
    ],
    [
      120.56582629680632,
      32.3860137864609
    ],
    [
      120.56633055210114,
      32.38600472640151
    ],
    [
      120.56684553623201,
      32.38619951747816
    ],
    [
      120.56762337684631,
      32.38673858826796
    ],
    [
      120.56717813014984,
      32.38752227367817
    ],
    [
      120.566126704216,
      32.387214236293275
    ],
    [
      120.56571900844574,
      32.387264065941466
    ]
  ];
  var options = {
    type: "dae",
    obj: "models/路灯.dae",
    scale: 0.1,
    units: "meters",
    // material: new THREE.MeshBasicMaterial({
    //   map: new THREE.TextureLoader().load("models/粮仓模型/002.png"),
    //   side: THREE.FrontSide,
    //   transparent: true,
    //   wireframe: false,
    // }),
    rotation: { x: 180, y: 180, z: 30 },
  };
  points.forEach((point) => {
    tb.loadObj(options, function (model) {
      const truck = model.setCoords(point);
      tb.add(truck);
    });
  });
}


function addlinagc2(points,SelectedChange) {
  
  var options = {
    type: "mtl",
    obj: "models/粮仓模型/gong001.obj",
    scale: 1,
    units: "meters",
    material: new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("models/粮仓模型/d001.png"),
      side: THREE.FrontSide,
      transparent: true,
      clipIntersection: false,
    }),
    anchor: "center",
    rotation: { x: 90, y: 180, z: 180 },
  };
  points.forEach((point,index) => {
    tb.loadObj(options, function (model) {
      const obj = model.setCoords(point);
      obj.attributes={name:(index+1)+'号玉米谷仓'}
      obj.addEventListener(
                "SelectedChange",
                SelectedChange,
                false
              );
      tb.add(obj);
    });
  });
}

function addlinagc3(points,SelectedChange) {
 
  var options = {
    type: "mtl",
    obj: "models/粮仓模型/003.obj",
    scale: 1,
    units: "meters",
    anchor: "center",
    material: new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("models/粮仓模型/003.png"),
      side: THREE.FrontSide,
      transparent: true,
      clipIntersection: true,
    }),
    rotation: { x: 90, y: 295, z: 0 },
  };
   anchor: "center",
  points.forEach((point,index) => {
    tb.loadObj(options, function (model) {
      const obj = model.setCoords(point);
      obj.attributes={name:(index+1)+'号大豆谷仓'}
      obj.addEventListener(
                "SelectedChange",
                SelectedChange,
                false
              );
      tb.add(obj);
    });
  });
}

function addWalkPeop(point){
  var options = {
    obj: 'models/Soldier.glb',
    type: 'gltf',
    scale: 2,
    units: 'meters',
    rotation: { x: 90, y: 0, z: 0 }, //default rotation
    anchor: 'center'
    }
    let peop;
    tb.loadObj(options, function (model) {
        //origin3[2] += model.modelSize.z;
        peop = model.setCoords(point);
        tb.add(peop);
        // play animation 3, for 10 seconds
        peop.playAnimation(options = { animation: 1, duration: 1000 });

    })

    return peop;
}

function addRoads(resolution,roads) {
  var arcSegments = 25;
  var linemeshs = [];


  roads.forEach((line, index) => {

    addTravelTruck(line);


    var straightProject = tb.utils.lnglatsToWorld(line);
    var normalized = tb.utils.normalizeVertices(straightProject);
    var flattenedArray = tb.utils.flattenVectors(normalized.vertices);
    
    const meshLine = new MeshLine();
    meshLine.setGeometry(normalized);

    let material = new MeshLineMaterial({
      map: texture,
      useMap: true,
      lineWidth: 40,
      resolution: resolution,
      dashArray: 0.9, // 破折号之间的长度和间距。(0 -无破折号)
      dashRatio: 0.3, // 定义可见和不可见之间的比率(0 -更可见，1 -更不可见)。
      dashOffset: 0,
      transparent: true,
      sizeAttenuation: 0.5, //使线宽不变，不管距离(1个单位是屏幕上的1px)(0 -衰减，1 -不衰减)
      side: THREE.DoubleSide,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      near: tb.camera.near,
      far: tb.camera.far,
    });

    var tmp = new THREE.Mesh(meshLine.geometry, material);
    var features = featureCollection(
      line.map((e) => {
        return point(e);
      })
    );

    var center = centroid(features);
    tb.add(
      tb
        .Object3D({ obj: tmp, adjustment: { x: 0, y: 0, z: 0.5 } })
        .setCoords(center.geometry.coordinates)
    );

    linemeshs.push(tmp);
  });

  return linemeshs;
}

function addCircle(point) {
  var texture = new THREE.TextureLoader().load("images/circular.png");
  var material = new THREE.MeshLambertMaterial({
    map: texture,
    side: THREE.FrontSide,
    transparent: true,
  });
  function getRingeGeometry(width = 7, height = 7) {
    return new THREE.PlaneGeometry(width, height);
  }

  var ringeGeom = getRingeGeometry();

  let mesh = new THREE.Mesh(ringeGeom, material);
  let cube3d = tb
    .Object3D({ obj: mesh, adjustment: { x: 0, y: 0, z: 0.1 } })
    .setCoords(point);

  tb.add(cube3d);
  return mesh;
}

function addTravelTruck (paths){
  var options = {
    type: "mtl",
    obj: "models/Truck.obj",
    mtl: "models/Truck.mtl",
    scale: 15,
    units: "meters",
    anchor: "center",
    rotation: { x: 90, y: 180, z: 0 }, //rotation to postiion the truck and heading properly
  };

  tb.loadObj(options, function (model) {
    const truck = model.setCoords(paths[0]);
    tb.add(truck);
    var options = {
      path: paths,
      duration: 200000,
    };

    truck.followPath(options, function () {
      // tb.remove(line);
    });
  });
};

export {
  addTripLayer,
  add3dTilesLayer,
  addlinagc3,
  addlinagc2,
  addlinagc,
  addTree,
  addFire,
  addWall,
  addCone,
  addRoads,
  addCircle,
  addLine,
  addTravelTruck,
  addWalkPeop,
  addludeng
};
