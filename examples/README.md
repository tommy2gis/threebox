## Examples

These are the examples included in Threebox.

#### [01-basic.html](https://github.com/jscastro76/threebox/blob/master/examples/01-basic.html) 
<img alt="threebox" src="images/basic.png" width="50%"><br/>
- This sample shows the simplest Threebox use with only a sphere with no interactions.<br/>
- - - -

#### [02-line.html](https://github.com/jscastro76/threebox/blob/master/examples/02-line.html) 
<img alt="threebox" src="images/line.png" width="50%"><br/>
- This sample line arcs from a central point to different destinations with no interactions.<br/>  
- - - -

#### [03-tube.html](https://github.com/jscastro76/threebox/blob/master/examples/03-tube.html) 
<img alt="threebox" src="images/tube.png" width="50%"><br/>
- This sample creates an spiral tube geometry to render. 
- Enabled built-in raycasting and selection for this 3D object through `enableSelectingObjects`, all objects can be selected and unselected.
- Enabled built-in dragging mode for 3D objects through `enableDraggingObjects`, 3D object is dragabble, once selected, using [Shift] key for translation and [Ctrl] for altitude.
- Enabled built-in rotation mode for 3D objects through `enableRotatingObjects`, 3D objects is rotable on it's vertical axis, once selected, using [Alt] key.
- Enabled built-in default Labels on altitude for the 3D object through `enableTooltips`.<br/>
- - - -

#### [04-mercator.html](https://github.com/jscastro76/threebox/blob/master/examples/04-mercator.html) 
<img alt="threebox" src="images/mercator.png" width="50%"><br/>
- This sample creates 100 spheres duplicated all around the world at the same height, but they look different because the height is calculated based on the latitude. 
- - - -

#### [05-logistics.html](https://github.com/jscastro76/threebox/blob/master/examples/05-logistics.html) 
<img alt="threebox" src="images/logistics.png" width="50%"><br/>
- This sample loads a 3D `.obj` model of a truck that is animated following a path once a point in the map is clicked. 
- - - -

#### [06-object3d.html](https://github.com/jscastro76/threebox/blob/master/examples/06-object3d.html) 
<img alt="threebox" src="images/object3D.png" width="50%"><br/>  
- This sample loads a 3D `.glb` model of a soldier. <br /><br/>
- - - -

#### [07-alignmentTest.html](https://github.com/jscastro76/threebox/blob/master/examples/07-alignmentTest.html) 
<img alt="threebox" src="images/alignmentTest.png" width="50%"><br/>
- This sample shows camera perspective and depth alignment between fill-extrusion layer and some Object3D created through Threebox.<br />
- - - -  

#### [08-3dbuildings.html](https://github.com/jscastro76/threebox/blob/master/examples/08-3dbuildings.html) 
<img alt="threebox" src="images/3dbuildings.png" width="50%"><br/>
- This sample shows over a default fill-extrusion composite layer different Threebox additions.
- Built-in raycasting and selection through `enableSelectingFeatures` 
- Built-in default Labels on altitude for fill-extrusions through `enableTooltips` 
- Event handler management for Features through `map.on('SelectedFeatureChange', ...)`<br />
- - - -
#### [09-raycaster.html](https://github.com/jscastro76/threebox/blob/master/examples/09-raycaster.html) 
<img alt="threebox" src="images/raycaster.png" width="50%"><br/>
- This sample shows how to create 3 objects over a default fill-extrusion composite layer.
- Enabled built-in raycasting and selection both for fill-extrusion and 3D objects through `enableSelectingFeatures` and `enableSelectingObjects`, all objects can be selected and unselected.
- Enabled built-in dragging mode for 3D objects through `enableDraggingObjects`, 3D objects are dragabble, once selected, using [Shift] key for translation and [Ctrl] for altitude.
- Enabled built-in rotation mode for 3D objects through `enableRotatingObjects`, 3D objects are rotable on it's vertical axis, once selected, using [Alt] key.
- Enabled built-in default Labels on altitude both for fill-extrusions and 3D objects through `enableTooltips`.<br/>
- - - -
#### [10-stylechange.html](https://github.com/jscastro76/threebox/blob/master/examples/10-stylechange.html) 
<img alt="threebox" src="images/stylechange.png" width="50%"><br/>
- This sample shows how to change the style without affecting the 3D objects created using the method `tb.setStyle` <br/>
- - - -
#### [11-animation.html](https://github.com/jscastro76/threebox/blob/master/examples/11-animation.html) 
<img alt="threebox" src="images/animation.png" width="50%"><br/>
- This sample is a mix between [05-logistics.html](https://github.com/jscastro76/threebox/blob/master/examples/05-logistics.html) and [09-raycaster.html](https://github.com/jscastro76/threebox/blob/master/examples/09-raycaster.html) samples, and it shows an object can play at the same time an embedded animation and a Threebox animation. <br/>
- - - -

#### [12-add3dmodel.html](https://github.com/jscastro76/threebox/blob/master/examples/12-add3dmodel.html) 
<img alt="threebox" src="images/add-3d-model.png" width="50%"><br/>
- This sample shows a replica of [add a 3D model sample](https://docs.mapbox.com/mapbox-gl-js/example/add-3d-model/) using only threebox and adding real sunlight position and shadows over the model.
- Enabled built-in raycasting and selection for 3D objects through `enableSelectingObjects`, all objects can be selected and unselected.
- Enabled built-in Tooltips on for through `enableTooltips` 
- Enabled built-in sunlight position for the scene through `realSunlight`
- Enabled built-in shadows for 3D Objects through `castShadow`.
- Set the time map lights based on `setSunlight` for today.
- Changes automatically the style from sunset to sunrise through `tb.getSunTimes`.
- - - -

#### [13-eiffel.html](https://github.com/jscastro76/threebox/blob/master/examples/13-eiffel.html) 
<img alt="threebox" src="images/eiffel.png" width="50%"><br/>
- This sample shows how to  add real sunlight position and shadows over two landmarks, Eiffel Tower and Liberty Statue, using the Satellite mapbox style.
- Enabled built-in raycasting and selection for 3D objects through `enableSelectingObjects`, all objects can be selected and unselected.
- Enabled built-in Tooltips on for through `enableTooltips` 
- Enabled built-in sunlight position for the scene through `realSunlight`
- Enabled built-in shadows for 3D Objects through `castShadow`.
- Set the time map lights based on `setSunlight` for today.
- Changes automatically the style from sunset to sunrise through `tb.getSunTimes`.
<br />
- - - -

#### [14-buildingshadow.html](https://github.com/jscastro76/threebox/blob/master/examples/14-buildingshadow.html) 
<img alt="threebox" src="images/buildingshadow.png" width="50%"><br/>
- This sample shows how to to add real sunlight position and shadows over a default fill-extrusion composite layer. 
- Enabled built-in sunlight position for the scene through `realSunlight`.
- Enabled built-in fill-extrusion shadows through `tb.setBuildingShadows`. <br/>
- Changes automatically the style from sunset to sunrise through `tb.getSunTimes`.
- - - -

#### [15-performance.html](https://github.com/jscastro76/threebox/blob/master/examples/15-performance.html) 
<img alt="threebox" src="images/performance.png" width="50%"><br/>
- This sample shows the performance of Threebox creating up to 1000 objects in a single layer. <br/>
- Added performance stats indicator.

- - - -


#### [16-multilayer.html](https://github.com/jscastro76/threebox/blob/master/examples/16-multilayer.html) 
<img alt="threebox" src="images/multilayer.png" width="50%"><br/>
- This sample shows how to create multiple layers dynamically with Threebox and manage different zoom ranges for each one. 
- Create multiple 3D layers in Mapbox is a heavy consumer of resources because every layer is rendered separately.
- Enabled built-in multilayer support through `multiLayer` param, this param will create an embedded internal layer in Threebox that will manage the render with a single call to tb.update so it's not needed in each layer definition. This saves a lot of resources as mapbox render loop only calls once to three.js render.
- Each layer can be hidden explicitly with a button, but also each layer has a different zoom range through `tb.setLayoutZoomRange` so the layers will hide depending on zoom level. 
- Added performance stats indicator.

- - - -

#### [17-azuremaps.html](https://github.com/jscastro76/threebox/blob/master/examples/17-azuremaps.html) 
<img alt="threebox" src="images/azuremaps.png" width="50%"><br/>
- This sample shows how to create an Azure Maps sample through threebox using the satellite Azure Maps style.
- It adds two models, one with the Space Needle in real size and other with a Giant Soldier.
- This sample shows how to  add real sunlight position and shadows over this two models. 

- - - -

#### [18-extrusions.html](https://github.com/jscastro76/threebox/blob/master/examples/18-extrusions.html) 
<img alt="threebox" src="images/extrusions.png" width="50%"><br/>
- This sample shows how to create extrusions in two different ways. 
- The first way is to create a star based on an array of Vector2 points.
- The second way creates dynamically features from a gesJson file with real complex features from the composite layer. 

- - - -