mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lzZGV2ZWxvcG1hcCIsImEiOiJjamZrdmp3bWYwY280MndteDg1dGlmdzF3In0.4m2zz_ISrUCXyz27MdL8_Q';
$(document).ready(function(){
    $('.modal').modal();
  });




  $(document).ready(function(){
    $('select').formSelect();
  });


$(document).ready(function(){
    $('.tooltipped').tooltip();
  });
  $(document).ready(function(){
    $('.collapsible').collapsible();
  });

  $( ".search_icon" ).click(function() {
    $( "#geocoder" ).slideToggle( "slow", function() {});
    $( "#live_var_dropdown" ).hide();
    $( "#country_var_dropdown" ).hide();
    $( ".sidebar" ).hide();
    $( ".calculation-box" ).hide();
  });

  $( ".layers_icon" ).click(function() {
    $( "#country_var_dropdown" ).slideToggle( "slow", function() {});
    $( "#geocoder" ).hide();
    $( ".sidebar" ).hide();
    $( ".top_dropdown" ).hide();
    $( ".calculation-box" ).hide();
    $('.mapbox-gl-draw_trash').click();

  });



  $( ".legend_icon" ).click(function() {
    $( ".legend" ).slideToggle( "slow", function() {});
  });
  $( ".zoom_icon" ).click(function() {



});

var filterEl = document.getElementById('feature-filter');
var listingEl = document.getElementById('feature-listing');

function normalize(str) {
    return str.trim().toLowerCase();
}

function renderListings(features) {
  var empty = document.createElement("p");

  if (features.length) {
    features.forEach(function (feature) {
      var prop = feature.properties;
      var item = document.createElement("a");
      item.href = prop.wikipedia;
      item.target = "_blank";
      item.textContent = prop.adm0_code + " (" + prop.adm0_code + ")";
      item.addEventListener("mouseover", function () {
        popup
          .setLngLat(getFeatureCenter(feature))
          .setText(
           'klajlkdas'
          )
          .addTo(map);
      });
    });
  } 
}

function getFeatureCenter(feature) {
	let center = [];
	let latitude = 0;
	let longitude = 0;
	let height = 0;
	let coordinates = [];
	feature.geometry.coordinates.forEach(function (c) {
		let dupe = [];
		if (feature.geometry.type === "MultiPolygon")
			dupe.push(...c[0]); //deep clone to avoid modifying the original array
		else 
			dupe.push(...c); //deep clone to avoid modifying the original array
		dupe.splice(-1, 1); //features in mapbox repeat the first coordinates at the end. We remove it.
		coordinates = coordinates.concat(dupe);
	});
	if (feature.geometry.type === "Point") {
		center = coordinates[0];
	}
	else {
		coordinates.forEach(function (c) {
			latitude += c[0];
			longitude += c[1];
		});
		center = [latitude / coordinates.length, longitude / coordinates.length];
	}

	return center;
}

function getUniqueFeatures(array, comparatorProperty) {
  var existingFeatureKeys = {};
  var uniqueFeatures = array.filter(function (el) {
    if (existingFeatureKeys[el.properties[comparatorProperty]]) {
      return false;
    } else {
      existingFeatureKeys[el.properties[comparatorProperty]] = true;
      return true;
    }
  });

  return uniqueFeatures;
}

var zoomThreshold = 4;

var bounds = [
[-180, -70], // Southwest coordinates
[180, 80] // Northeast coordinates
];

var map = new mapboxgl.Map({
    container: 'map',

    projection: 'globe',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [19, 3], // starting position[35.890, -75.664]
    zoom: 3.11, // starting zoom
    hash: true,
    minZoom: 2.09,
    opacity: 0.5,
   

    preserveDrawingBuffer: true
});

map.addControl(new mapboxgl.NavigationControl());



$('.all_tools').click(function() {
  $('.pa_select').toggle();
  $('.country_select').toggle();
  $('.ecoregion_select').toggle();
  $('.live_select').toggle();
  $('.search_icon').toggle();
 
})




map.on('load', function() {














        map.addLayer({
          "id": "dopa_geoserver_wdpa_master_202101_o1",
          "type": "fill",
          "source": {
              "type": "vector",
              "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=dopa_explorer_3:dopa_geoserver_wdpa_master_202101_o1&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
              },
          "source-layer": "dopa_geoserver_wdpa_master_202101_o1",
    
          'paint': { 
            'fill-color': [
              'match',
              ['get', 'marine'],
              '0',
              '#77bb0b',
              '1',
              '#b9cda5',
              '2',
              '#13a6ec',
              /* other */ '#ffffff'
              ],
              'fill-opacity': 0.5
              },  'filter': ["in", "wdpaid",'xxx']
    
      }, 'waterway-label');

      map.addLayer({
        "id": "wdpa_high",
        "type": "line",
        "source": {
            "type": "vector",
            "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=dopa_explorer_3:dopa_geoserver_wdpa_master_202101_o1&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
            },
        "source-layer": "dopa_geoserver_wdpa_master_202101_o1",
  
        paint: {
          'line-color': '#ffffff',
          'line-width': 1.2,
          'line-dasharray': [1, 1],
        }, 'filter': ["in", "wdpaid",'xxx'],
  
    }, 'waterway-label');

    map.addLayer({
      "id": "wdpa_high2",
      "type": "line",
      "source": {
          "type": "vector",
          "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=dopa_explorer_3:dopa_geoserver_wdpa_master_202101_o1&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
          },
      "source-layer": "dopa_geoserver_wdpa_master_202101_o1",

      paint: {
        'line-color': '#ffffff',
        'line-width': 1.5,
        'line-dasharray': [1, 1],
      }, 'filter': ["in", "wdpaid",'xxx'],

  }, 'waterway-label');

      map.addLayer({
        "id": "protection_trends_acp",
        "type": "fill",
        "source": {
            "type": "vector",
            "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=dopa_analyst:protection_trends_acp&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
            },
        "source-layer": "protection_trends_acp",
  
        'paint': {
          'fill-color': {
            property: 'prot_perc_ind', 
            stops: [
              [0, '#08306b'],
              [1, '#2171b5'],
              [2, '#6baed6'],
              [5, '#c6dbef'],
              [8, '#f7f7f7'],
              [12, '#e6f5d0'],
              [17, '#b8e186'],
              [30, '#7fbc41'],
              [50, '#4d9221'],
            
            ]
          },
          'fill-opacity': 0.8
        }, 'filter': [">", "prot_perc_ind",-1],
  
    }, 'waterway-label');

    map.addLayer({
      "id": "country_high",
      "type": "line",
      "source": {
          "type": "vector",
          "tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=dopa_analyst:protection_trends_acp&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
          },
      "source-layer": "protection_trends_acp",

      paint: {
        'line-color': '#ffffff',
        'line-width': 1,
        
      }, 'filter': ["in", "wdpaid",'xxx'],

  }, 'waterway-label');


  // COUNTRY LAYER LAYOUT

var layer_country = document.getElementById('layer_country');

layer_country.addEventListener('change', function() {

var layer_country_value = document.getElementById('layer_country').value;




if (layer_country_value =='prot_mar_perc_ind'){
map.setFilter("protection_trends_acp", [">", "prot_mar_perc_ind", 0]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',0.5, '#2171b5',1, '#6baed6',2, '#c6dbef',5, '#f7f7f7',8, '#e6f5d0',12, '#b8e186',17, '#7fbc41',30, '#4d9221',
]);


$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Marine Protection</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0%</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>0,5%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>1%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>2%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>5%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>8%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>12%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>17%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>30% or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");


}else if (layer_country_value =='prot_terr_perc_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',1, '#2171b5',2, '#6baed6',5, '#c6dbef',8, '#f7f7f7',12, '#e6f5d0',17, '#b8e186',30, '#7fbc41',50, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Terrestrial Protection</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0%</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>1%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>2%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>5%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>8%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>12%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>17%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>30%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>50% or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='protconn_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',1, '#2171b5',2, '#6baed6',5, '#c6dbef',8, '#f7f7f7',12, '#e6f5d0',17, '#b8e186',30, '#7fbc41',50, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Terrestrial Connectivity</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0%</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>1%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>2%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>5%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>8%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>12%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>17%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>30%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>50% or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
} else if (layer_country_value =='prot_perc_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',1, '#2171b5',2, '#6baed6',5, '#c6dbef',8, '#f7f7f7',12, '#e6f5d0',17, '#b8e186',30, '#7fbc41',50, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Overall Protection</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0%</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>1%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>2%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>5%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>8%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>12%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>17%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>30%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>50% or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
} else if (layer_country_value =='forest_perc_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',1, '#2171b5',2, '#6baed6',5, '#c6dbef',8, '#f7f7f7',12, '#e6f5d0',17, '#b8e186',30, '#4d9221',50, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Forest Cover</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0%</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>1%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>2%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>5%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>8%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>12%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>17%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>30%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>50% or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='forest_gain_perc_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',0.2, '#2171b5',0.4, '#6baed6',0.6, '#c6dbef',0.8, '#f7f7f7',1, '#e6f5d0',1.2, '#b8e186',1.4, '#7fbc41',2, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Forest Gain</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0.0%</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>0.2%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>0.4%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>0.6%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>0.8%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>1.0%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>1.2%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>1.4%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>2.0% or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='forest_loss_perc_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',1, '#2171b5',2, '#6baed6',3, '#c6dbef',4, '#f7f7f7',5, '#e6f5d0',6, '#b8e186',7, '#7fbc41',8, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Forest Loss</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0%</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>1%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>2%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>3%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>4%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>5%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>6%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>7%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>8% or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='water_p_netchange_perc_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
-10, '#08306b',-5, '#2171b5',0, '#6baed6',5, '#c6dbef',10, '#f7f7f7',15, '#e6f5d0',20, '#b8e186',25, '#7fbc41',30, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Surface Water Change</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>-10%</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>-5%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>0%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>5%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>10%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>15%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>20%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>25%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>30% or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='tot_carbon_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',0.5, '#2171b5',1, '#6baed6',1.5, '#c6dbef',2, '#f7f7f7',2.5, '#e6f5d0',3, '#b8e186',4, '#7fbc41',5, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Total Carbon (Pg)</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>0.5</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>1</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>1.5</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>2</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>2.5</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>3</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>4</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>5 or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='tot_species_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',250, '#2171b5',500, '#6baed6',1000, '#c6dbef',1500, '#f7f7f7',2000, '#e6f5d0',3000, '#b8e186',4000, '#7fbc41',5000, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Number of Species</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>250</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>500</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>1000</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>1500</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>2000</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>3000</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>4000</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>5000 or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='species_endem_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',10, '#2171b5',25, '#6baed6',50, '#c6dbef',100, '#f7f7f7',150, '#e6f5d0',200, '#b8e186',500, '#7fbc41',1000, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Number of Endemic Species</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>10</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>25</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>50</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>100</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>150</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>200</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>500</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>1000 or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='threat_species_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',5, '#2171b5',10, '#6baed6',20, '#c6dbef',40, '#f7f7f7',60, '#e6f5d0',100, '#b8e186',200, '#7fbc41',300, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Number of Threatened Species</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>5</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>10</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>20</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>40</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>60</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>100</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>200</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>300 or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='species_endem_threat_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',5, '#2171b5',10, '#6baed6',20, '#c6dbef',40, '#f7f7f7',60, '#e6f5d0',100, '#b8e186',200, '#7fbc41',300, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Number of Threatened Endemic Species</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>5</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>10</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>20</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>40</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>60</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>100</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>200</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>300 or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='tot_pop_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',10000000, '#2171b5',20000000, '#6baed6',50000000, '#c6dbef',100000000, '#f7f7f7',250000000, '#e6f5d0',500000000, '#b8e186',750000000, '#7fbc41',1000000000, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Total Population </p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0M</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>10M</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>20M</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>50M</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>100M</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>250M</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>500M</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>750M</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>1B or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='dens_pop_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',10, '#2171b5',25, '#6baed6',50, '#c6dbef',75, '#f7f7f7',100, '#e6f5d0',150, '#b8e186',200, '#7fbc41',250, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Population Density</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0 per km<sup>2</sup></div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>10 per km<sup>2</sup></div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>25 per km<sup>2</sup></div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>50 per km<sup>2</sup></div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>75 per km<sup>2</sup></div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>100 per km<sup>2</sup></div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>150 per km<sup>2</sup></div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>200 per km<sup>2</sup></div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>250 per km<sup>2</sup> or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='growth_pop_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
-2, '#08306b',-1.5, '#2171b5',-1, '#6baed6',0, '#c6dbef',1, '#f7f7f7',1.5, '#e6f5d0',2, '#b8e186',2.5, '#7fbc41',3, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Population Growth</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>-2% or less</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>-1.5%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>-1%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>0%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>1%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>1.5%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>2%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>2.5%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>3% or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='agri_area_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',5, '#2171b5',10, '#6baed6',20, '#c6dbef',30, '#f7f7f7',40, '#e6f5d0',50, '#b8e186',60, '#7fbc41',70, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Agricultural Lands (% of land area)</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0%</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>5%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>10%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>20%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>30%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>40%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>50%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>60%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>70% or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='land_natural_perc_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',30, '#2171b5',40, '#6baed6',50, '#c6dbef',60, '#f7f7f7',70, '#e6f5d0',80, '#b8e186',90, '#7fbc41',100, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Natural Area (% of land area)</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0%</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>30%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>40%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>50%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>60%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>70%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>80%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>90%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>100%</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}else if (layer_country_value =='land_degradation_ind') {

map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
map.setPaintProperty('protection_trends_acp', 'fill-color', 
['interpolate',['linear'],['get', layer_country_value],
0, '#08306b',1, '#2171b5',2, '#6baed6',5, '#c6dbef',10, '#f7f7f7',20, '#e6f5d0',30, '#b8e186',40, '#7fbc41',50, '#4d9221',
]);
$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Degraded land (% of land area)</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0%</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>1%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>2%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>5%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>10%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>20%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>30%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>40%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>50% or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
}


rangeSlidercountry();


});















$('.country_select').click(function() {
 $('.mapboxgl-popup-close-button').click();

  if($('.country_select').hasClass('clickedtool')){
    $('.country_select').removeClass('clickedtool');
    map.setFilter("ecoregion_master_202104", ["in", "id", "xxx"]);
    map.setFilter("protection_trends_acp", ["in", "id", "xxx"]);
    map.setFilter("dopa_geoserver_wdpa_master_202101_o1", ["in", "id", "xxx"]);
    map.setFilter("country_high", ["in", "id", "xxx"]);
    map.setFilter("ecoregion_high", ["in", "id", "xxx"]);
    map.setFilter("wdpa_high", ["in", "id", "xxx"]);
    map.setFilter("wdpa_high2", ["in", "id", "xxx"]);
    $('#pa_title').hide();
    $('#pa_stats').hide();
    $('#live_layer_container').hide();
    $(".select-dropdown").val("Select a layer");
    $('.legend').empty();
  }else{
    $('.country_select').addClass('clickedtool');
    map.setFilter("ecoregion_master_202104", ["in", "id", "xxx"]);
    map.setFilter("protection_trends_acp", [">", "prot_perc_ind",-1]);
    map.setFilter("dopa_geoserver_wdpa_master_202101_o1", ["in", "id", "xxx"]);
    map.setFilter("country_high", ["in", "id", "xxx"]);
    map.setFilter("ecoregion_high", ["in", "id", "xxx"]);
    map.setFilter("wdpa_high", ["in", "id", "xxx"]);
    map.setFilter("wdpa_high2", ["in", "id", "xxx"]);
    map.setPaintProperty('protection_trends_acp', 'fill-color', 
    ['interpolate',['linear'],['get', 'prot_perc_ind'],
    0, '#08306b',1, '#2171b5',2, '#6baed6',5, '#c6dbef',8, '#f7f7f7',12, '#e6f5d0',17, '#b8e186',30, '#7fbc41',50, '#4d9221',
  ]);
    $('#pa_title').hide();
    $('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Overall Protection</p>"+
    "<div><span class='square_pa'style='background-color: #08306b'></span>0%</div>"+
    "<div><span class='square_pa'style='background-color: #2171b5'></span>1%</div>"+
    "<div><span class='square_pa'style='background-color: #6baed6'></span>2%</div>"+
    "<div><span class='square_pa'style='background-color: #c6dbef'></span>5%</div>"+
    "<div><span class='square_pa'style='background-color: #f7f7f7'></span>8%</div>"+
    "<div><span class='square_pa'style='background-color: #e6f5d0'></span>12%</div>"+
    "<div><span class='square_pa'style='background-color: #b8e186'></span>17%</div>"+
    "<div><span class='square_pa'style='background-color: #7fbc41'></span>30%</div>"+
    "<div><span class='square_pa'style='background-color: #4d9221'></span>50% or more</div>"+
    "</div>"+
    "<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>");
    setTimeout(function(){
      rangeSlidercountry();
    }, 500)
    $('#pa_title').hide();
  $('#pa_stats').hide();
  $('#live_layer_container').hide();
  $(".select-dropdown").val("Select a layer");
  }
  if($('.pa_select').hasClass('clickedtool')){
    $('.pa_select').removeClass('clickedtool');
  }else{
  }
  if($('.ecoregion_select').hasClass('clickedtool')){
    $('.ecoregion_select').removeClass('clickedtool');
  }else{
  }
  if($('.live_select').hasClass('clickedtool')){
    $('.live_select').removeClass('clickedtool');
  }else{
  }

})







$('.legend').html("<br><div id='country_prot_legend'> <p class='country_sel_legend_title'>Overall Protection</p>"+
"<div><span class='square_pa'style='background-color: #08306b'></span>0%</div>"+
"<div><span class='square_pa'style='background-color: #2171b5'></span>1%</div>"+
"<div><span class='square_pa'style='background-color: #6baed6'></span>2%</div>"+
"<div><span class='square_pa'style='background-color: #c6dbef'></span>5%</div>"+
"<div><span class='square_pa'style='background-color: #f7f7f7'></span>8%</div>"+
"<div><span class='square_pa'style='background-color: #e6f5d0'></span>12%</div>"+
"<div><span class='square_pa'style='background-color: #b8e186'></span>17%</div>"+
"<div><span class='square_pa'style='background-color: #7fbc41'></span>30%</div>"+
"<div><span class='square_pa'style='background-color: #4d9221'></span>50% or more</div>"+
"</div>"+
"<div><div><input id='slider-country' type='range' min='0' max='100' step='0' value='100'></div></div>"

);
rangeSlidercountry();

 
// PA Popup
map.on('click', 'dopa_geoserver_wdpa_master_202101_o1', function (e) {
     


        map.setFilter("wdpa_high2", ["in", "wdpaid", e.features[0].properties.wdpaid]);




        new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<a href="https://dopa-explorer.jrc.ec.europa.eu/wdpa/'+e.features[0].properties.wdpaid+'" target="_blank">'+e.features[0].properties.name+
        '</a><br><i>WDPA ID <b class = "higlightpa">'+e.features[0].properties.wdpaid+
        '</b></i><br><i>Status <b class = "higlightpa">'+e.features[0].properties.status+
        '</b></i><br><i>Status Year <b class = "higlightpa">'+e.features[0].properties.status_yr+
        '</b></i><br><i>IUCN Category <b class = "higlightpa">'+e.features[0].properties.iucn_cat+
        '</b></i><br><i>Reported Area <b class = "higlightpa">'+(e.features[0].properties.rep_area).toFixed(2)+ ' km<sup>2</sup>'+
        '</b></i><br><i>Designation <b class = "higlightpa"> '+e.features[0].properties.desig_eng+'</b></i>')
        .addTo(map);
        });
         
        map.on('mouseenter', 'dopa_geoserver_wdpa_master_202101_o1', function () {
        map.getCanvas().style.cursor = 'pointer';
        });
         
        map.on('mouseleave', 'dopa_geoserver_wdpa_master_202101_o1', function () {
        map.getCanvas().style.cursor = '';
        map.setFilter("wdpa_high", ["in", "wdpaid", "xxx"]);
        });
        map.on("moveend", function () {
          var features = map.queryRenderedFeatures({ layers: ["dopa_geoserver_wdpa_master_202101_o1"] });
          if (features) {
          var uniqueFeatures = getUniqueFeatures(features, "wdpaid");
          renderListings(uniqueFeatures);
          airports = uniqueFeatures;
          }
          });
          
          map.on("mousemove", "dopa_geoserver_wdpa_master_202101_o1", function (e) {
            map.setFilter("wdpa_high", ["in", "wdpaid", e.features[0].properties.wdpaid]);
          map.getCanvas().style.cursor = "pointer";
          popup.setLngLat(e.lngLat)         .setHTML('<a href="https://dopa-explorer.jrc.ec.europa.eu/wdpa/'+e.features[0].properties.wdpaid+'" target="_blank">'+e.features[0].properties.name+
          '</a><br><i>WDPA ID <b class = "higlightpa">'+e.features[0].properties.wdpaid+
          '</b></i><br><i>Status <b class = "higlightpa">'+e.features[0].properties.status+
          '</b></i><br><i>Status Year <b class = "higlightpa">'+e.features[0].properties.status_yr+
          '</b></i><br><i>IUCN Category <b class = "higlightpa">'+e.features[0].properties.iucn_cat+
          '</b></i><br><i>Reported Area <b class = "higlightpa">'+(e.features[0].properties.rep_area).toFixed(2)+ ' km<sup>2</sup>'+
          '</b></i><br><i>Designation <b class = "higlightpa"> '+e.features[0].properties.desig_eng+'</b></i>')
          .addTo(map);
        
        });
          
          map.on("mouseleave", "dopa_geoserver_wdpa_master_202101_o1", function () {
          map.getCanvas().style.cursor = "";
          map.getCanvas().style.cursor = "";
          popup.remove();
          });

          



map.on('click', 'protection_trends_acp', function (e) {

  /// FIRST CHART


        var api_trend =  "https://api.biopama.org/api/protection_level/function/api_country_timeseries/iso3="+e.features[0].properties.iso3_digit
        $.ajax({
          url: api_trend,
          dataType: 'json',
          success: function(d) {
        


        $('#protection').highcharts({
          chart: {
            backgroundColor: null,
            type: 'line',
            fontFamily: 'Helvetica',
           
        },
        legend: {
          itemStyle: {

             color: '#A0A0A0'
          },
          itemHoverStyle: {
             color: '#000'
          },
          itemHiddenStyle: {
             color: '#fff'
          }
       
    },
          title: {
            text: 'Protection Dynamics',
            style: {
              color: '#a1aeb0',
              font: 'bold 20px "Source Sans Pro", Helvetica Neue , sans-serif',
              },
            align: 'left'
        },
        xAxis: {
            categories: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
            lineColor: '#7a8386',
          tickColor: '#7a8386',
          labels: {
            style: {
                color: '#7a8386'
            },
          }
        },
        yAxis: {
          visible: false,
          labels: {
            style: {
                color: '#7a8386'
            },
          },
          lineColor: '#7a8386',
          tickColor: '#7a8386',
        title: {
          text: '%'
        },
        
        
      },
        series: [{
            data: [parseFloat(d[0]._2014_prot_perc), parseFloat(d[0]._2015_prot_perc),parseFloat(d[0]._2015_prot_perc),parseFloat(d[0]._2017_prot_perc),parseFloat(d[0]._2018_prot_perc),parseFloat(d[0]._2019_prot_perc),parseFloat(d[0]._2020_prot_perc),parseFloat(d[0]._2021_prot_perc),parseFloat(d[0]._2022_prot_perc),parseFloat(d[0]._2023_prot_perc)],
           
            color: '#8fbf4b',
            name: 'Terrestrial Protection (%)'
        }, {
            data: [parseFloat(d[0]._2014_prot_mar_perc), parseFloat(d[0]._2015_prot_mar_perc),parseFloat(d[0]._2015_prot_mar_perc),parseFloat(d[0]._2017_prot_mar_perc),parseFloat(d[0]._2018_prot_mar_perc),parseFloat(d[0]._2019_prot_mar_perc),parseFloat(d[0]._2020_prot_mar_perc),parseFloat(d[0]._2021_prot_mar_perc),parseFloat(d[0]._2022_prot_mar_perc),parseFloat(d[0]._2023_prot_mar_perc)],
            
            color: '#8eb4b1',
            name: 'Marine Priotection (%)'
        }],

      });

/// SECOND CHART

      $('#pan').highcharts({
        chart: {
          type: 'columnpyramid',
          backgroundColor: null,

      },
      legend: {
        itemStyle: {

            color: '#A0A0A0'
        },
        itemHoverStyle: {
            color: '#000'
        },
        itemHiddenStyle: {
            color: '#fff'
        }
      
  },
    
        title: {
          text: 'Evolution of the number of Protected Areas',
          style: {
            color: '#a1aeb0',
            font: 'bold 20px "Source Sans Pro", Helvetica Neue , sans-serif',
            },
          align: 'left'
          
      },
      xAxis: {
          categories: ['2014', '2015', '2016', '2017', '2018','2019', '2020', '2021', '2022', '2023'],
          lineColor: '#7a8386',
          tickColor: '#7a8386',
          labels: {
            style: {
                color: '#7a8386'
            },
          }
      },
      yAxis: {
        visible: false,
          title: {
              text: 'Number of Protected Areas '
          }
      },

      plotOptions: {
          series: {
              
              borderWidth: 0
          }
      },
      series: [{
          type: 'columnpyramid',
          name: ' Terrestrial',
          color: '#8fbf4b',
          data: [parseFloat(d[0]._2014_terrestrial_count),parseFloat(d[0]._2015_terrestrial_count),parseFloat(d[0]._2016_terrestrial_count),parseFloat(d[0]._2017_terrestrial_count),parseFloat(d[0]._2018_terrestrial_count),parseFloat(d[0]._2019_terrestrial_count),parseFloat(d[0]._2020_terrestrial_count),parseFloat(d[0]._2021_terrestrial_count),parseFloat(d[0]._2022_terrestrial_count),parseFloat(d[0]._2023_terrestrial_count)],
      }, {
          type: 'columnpyramid',
          name: 'Marine',
          color: '#8eb4b1',
          data: [parseFloat(d[0]._2014_marine_count),parseFloat(d[0]._2015_marine_count),parseFloat(d[0]._2016_marine_count),parseFloat(d[0]._2017_marine_count),parseFloat(d[0]._2018_marine_count),parseFloat(d[0]._2019_marine_count),parseFloat(d[0]._2020_marine_count),parseFloat(d[0]._2021_marine_count),parseFloat(d[0]._2022_marine_count),parseFloat(d[0]._2023_marine_count)],
      }, {
          type: 'columnpyramid',
          name: 'Coastal',
          color: '#b4a98e',
          data: [parseFloat(d[0]._2014_costal_count),parseFloat(d[0]._2015_costal_count),parseFloat(d[0]._2016_costal_count),parseFloat(d[0]._2017_marine_count),parseFloat(d[0]._2018_costal_count),parseFloat(d[0]._2019_costal_count),parseFloat(d[0]._2020_costal_count),parseFloat(d[0]._2021_costal_count),parseFloat(d[0]._2022_costal_count),parseFloat(d[0]._2023_costal_count)],
      }, {
          type: 'spline',
          name: 'All',
          color: '#b8bfc1',
          data: [parseFloat(d[0].count),parseFloat(d[0]._2015_count),parseFloat(d[0]._2016_count),parseFloat(d[0]._2017_count),parseFloat(d[0]._2018_count),parseFloat(d[0]._2019_count),parseFloat(d[0]._2020_count),parseFloat(d[0]._2021_count),parseFloat(d[0]._2022_count),parseFloat(d[0]._2023_count)],
          marker: {
              lineWidth: 2,
              lineColor: '#b8bfc1',
              fillColor: '#b8bfc1'
          }
      }]

    });

  }

});


var country_stats_rest = "https://geospatial.jrc.ec.europa.eu/geoserver/wfs?request=getfeature&version=1.0.0&service=wfs&typename=dopa_analyst:protection_trends_acp&propertyname=country_area,iso2_digit,&SORTBY=iso2_digit&CQL_FILTER=iso2_digit='"+e.features[0].properties.iso2_digit+"'&outputFormat=application%2Fjson";


var country_area = 0
$.ajax({
    url: country_stats_rest,
    dataType: 'json',
    success: function(d) {
       
            country_area = parseFloat((d.features[0].properties.country_area))/1000000;
          
      },
      async: false 
  });


var api_trend =  "https://api.biopama.org/api/protection_level/function/api_lc_copernicus_trends/iso3="+e.features[0].properties.iso3_digit
$.ajax({
  url: api_trend,
  dataType: 'json',
  success: function(d) {



  var filter_20 = d.filter(obj=> obj.lc_class == "20");

  if (filter_20[0].lc_class == "20")
  
  {

  
    res = d.filter(obj=> obj.lc_class == "20")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }

    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }


    var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);


    $('#landcover_20').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });


  } 
  
  var filter_30 = d.filter(obj=> obj.lc_class == "30");
  
  if (filter_30[0].lc_class == "30"){

    res = d.filter(obj=> obj.lc_class == "30")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }
    
    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }

    var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);


    $('#landcover_30').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });

  }

  
  var filter_40 = d.filter(obj=> obj.lc_class == "40");
  
  if (filter_40[0].lc_class == "40"){

    res = d.filter(obj=> obj.lc_class == "40")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }
    
    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }

        var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);

    $('#landcover_40').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });

  }

  var filter_50 = d.filter(obj=> obj.lc_class == "50");
  
  if (filter_50[0].lc_class == "50"){

    res = d.filter(obj=> obj.lc_class == "50")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }
    
    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }
    var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);

    console.log(_2023_lc_unprot_perc)
    console.log(_2023_lc_prot_perc)
    
    $('#landcover_50').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });

  }

  var filter_60 = d.filter(obj=> obj.lc_class == "60");
  
  if (filter_60[0].lc_class == "60"){

    res = d.filter(obj=> obj.lc_class == "60")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }
    
    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }
    var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);
    
    $('#landcover_60').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });

  }

  var filter_80 = d.filter(obj=> obj.lc_class == "80");
  
  if (filter_80[0].lc_class == "80"){

    res = d.filter(obj=> obj.lc_class == "80")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }
    
    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }
    var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);
    
    $('#landcover_80').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });

  }


  var filter_90 = d.filter(obj=> obj.lc_class == "90");
  
  if (filter_90[0].lc_class == "90"){

    res = d.filter(obj=> obj.lc_class == "90")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }
    
    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }
    var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);
    
    $('#landcover_90').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });

  }

  var filter_112 = d.filter(obj=> obj.lc_class == "112");
  
  if (filter_112[0].lc_class == "112"){

    res = d.filter(obj=> obj.lc_class == "112")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }
    
    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }

    var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);

    $('#landcover_112').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });

  }


  var filter_114 = d.filter(obj=> obj.lc_class == "114");
  
  if (filter_114[0].lc_class == "114"){

    res = d.filter(obj=> obj.lc_class == "114")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }
    
    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }

        var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);

    $('#landcover_114').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });

  }



  var filter_116 = d.filter(obj=> obj.lc_class == "116");
  
  if (filter_116[0].lc_class == "116"){

    res = d.filter(obj=> obj.lc_class == "116")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }
    
    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }

        var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);
    $('#landcover_116').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });

  }


  var filter_122 = d.filter(obj=> obj.lc_class == "122");
  
  if (filter_122[0].lc_class == "122"){

    res = d.filter(obj=> obj.lc_class == "122")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }
    
    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }

    var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);
    $('#landcover_122').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });

  }

  var filter_124 = d.filter(obj=> obj.lc_class == "124");
  
  if (filter_124[0].lc_class == "124"){

    res = d.filter(obj=> obj.lc_class == "124")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }
    
    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }
    var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);
    
    $('#landcover_124').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });

  }


  var filter_126 = d.filter(obj=> obj.lc_class == "126");
  
  if (filter_126[0].lc_class == "126"){

    res = d.filter(obj=> obj.lc_class == "126")
    if (res[0].trend_lc_unprot =='increased') {
    color1 = '#adef2a'
    }else {
    color1 = '#e77323'
    }
    
    if (res[0].trend_lc_prot =='increased') {
    color2 = '#adef2a'
    }else {
    color2 = '#e77323'
    }

    var _2018_lc_unprot_perc = (res[0]._2023_lc_unprot*100)/country_area
    var _2023_lc_unprot_perc = (res[0]._2018_lc_unprot*100)/country_area
    var unprot_normal_variation_perc = Math.abs(_2023_lc_unprot_perc - _2018_lc_unprot_perc).toFixed(3);
    var _2018_lc_prot_perc = (res[0]._2023_lc_prot*100)/country_area
    var _2023_lc_prot_perc = (res[0]._2018_lc_prot*100)/country_area
    var prot_normal_variation_perc = Math.abs(_2023_lc_prot_perc - _2018_lc_prot_perc).toFixed(3);
    
    $('#landcover_126').highcharts({
      chart: {
        type: 'columnpyramid',
        backgroundColor: null,

    },
    legend: {
      itemStyle: {

          color: '#A0A0A0'
      },
      itemHoverStyle: {
          color: '#000'
      },
      itemHiddenStyle: {
          color: '#fff'
      }

    },

      title: {
        text: 'Land cover dynamics ('+ res[0].lc_class_1+')',
        style: {
          color: '#a1aeb0',
          font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
          },
        align: 'center'
        
    },
    xAxis: {
        categories: ['2018', '2023'],
        gridLineColor: '#404040',
        
        labels: {
          style: {
              color: '#7a8386'
          },
        }
    },
    yAxis: {
      visible: true,
      gridLineColor: '#404040',
        title: {
            text: 'SQKM '
        },
        stackLabels: {
          enabled: true,
          style: {
            fontSize: 23,
              color: 'white',
              textOutline: 'none'
          }
      }
    },

    plotOptions: {
      columnpyramid: {
          stacking: 'normal',
          dataLabels: {
              enabled: true,
              color: 'white',
          
              style: {
                textOutline: 'none',
                fontSize: 13,
              }
          }
      },
      series: {
                  
        borderWidth: 0
    }
    },

    caption: {
      verticalAlign: 'bottom',
      useHTML: true,
      style: {
          'padding-top': '10px',
          'color':'white',
          'font-size': '20px'
      },
      text: '<p><b>'+ res[0].lc_class_1+'</b> coverage represents '+(_2023_lc_unprot_perc+_2023_lc_prot_perc).toFixed(2)+' % of the country area of wich '+_2023_lc_prot_perc.toFixed(2)+' % is located within Protected Area boundaries as of 2023.  <b>Outside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color1+';">'+ res[0].trend_lc_unprot+'</span> by '+Math.abs(unprot_normal_variation_perc)+' % while <b>inside protected areas</b> '+ (res[0].lc_class_1).toLowerCase()+' has <span style="color:'+color2+';">'+res[0].trend_lc_prot+' </span> by '+Math.abs(prot_normal_variation_perc)+' % between 2018 and 2023 with respect to the country area.</p>'
    },

    series: [{
        
        name: ' Unprotected',
        color: '#788864',
        data: [parseFloat(res[0]._2018_lc_unprot),parseFloat(res[0]._2023_lc_unprot)],
    }, {
        
        name: 'Protected',
        color: '#4d9221',
        data: [parseFloat(res[0]._2018_lc_prot),parseFloat(res[0]._2023_lc_prot)],}]

        

    });

  }




  }

});



          map.setFilter("dopa_geoserver_wdpa_master_202101_o1", ["in", "iso3", e.features[0].properties.iso3_digit]);

          map.setFilter("protection_trends_acp", ["!in", "iso2_digit", e.features[0].properties.iso2_digit]);

          $('#country_var_dropdown').show();

          if($('#prot_legend').length == 0) {
             $('.legend').append("<br><div id='prot_legend'> <p class='country_sel_legend_title'>Protected Areas</p>"+
            "<div><span class='square_pa'style='background-color: #7fbc41'></span>Terrestrial</div>"+
            "<div><span class='square_pa'style='background-color: #b9cda5'></span>Coastal</div>"+
            "<div><span class='square_pa'style='background-color: #13a6ec'></span>Marine</div>"+
            "</div>"+
           "<div><div><input id='slider-pa' type='range' min='0' max='100' step='0' value='100'></div></div>"
           
        );
        rangeSliderwdpa();
          }else{

          }

 

          if($('#live_layer_container').is(':visible')) {
            $('#pa_stats').addClass("relPosition");
            $('#country_var_dropdown').addClass("relPosition");
           $('#country_var_dropdown').show().prependTo('#pa_stats');
        }else{
          $('#pa_stats').removeClass("relPosition");
        }
          map.setFilter("country_high", ["in", "iso2_digit", e.features[0].properties.iso2_digit]);

          var prot_mar_perc_ind = e.features[0].properties.prot_mar_perc_ind;
          if (prot_mar_perc_ind == null){
            prot_mar_perc_ind = 0
          } else{
            prot_mar_perc_ind = prot_mar_perc_ind
          }
          var prot_mar_perc_rank = e.features[0].properties.prot_mar_perc_rank;
          if (prot_mar_perc_rank == null){
            prot_mar_perc_rank = 'No marine area detected'
          } else{
            prot_mar_perc_rank = prot_mar_perc_rank
          }
          $('#pa_stats').show();



        
             var country_stats_rest = "https://geospatial.jrc.ec.europa.eu/geoserver/wfs?request=getfeature&version=1.0.0&service=wfs&typename=dopa_analyst:protection_trends_acp&propertyname=country_area,iso2_digit,&SORTBY=iso2_digit&CQL_FILTER=iso2_digit='"+e.features[0].properties.iso2_digit+"'&outputFormat=application%2Fjson";
             console.log(country_stats_rest);
             $.ajax({
                 url: country_stats_rest,
                 dataType: 'json',
                 success: function(d) {
                    
                         var bbox = [];
                         console.log(d.features[0].properties.bbox[0]);
                         
                         var x1 = d.features[0].properties.bbox[0];
                         var x2 = d.features[0].properties.bbox[1];
                         var x3 = d.features[0].properties.bbox[2];
                         var x4 = d.features[0].properties.bbox[3];
                        
                         map.fitBounds([[x3,x4],[x1,x2]], {padding: {top: 100, bottom:40, left: 1000, right: 0}})
        
 
                       
                   },
               });
         
             


          $('#pa_stats').html(
          "<div>"+
          "<div id='country_title'><b>"+e.features[0].properties.name_c+"</b></div>"+
          "<div id='country_subtitle'><i>Protected Areas Dynamics Dashboard</i></div>"+
          "<div id='protection'></div><br>"+
          "<div id='pan'></div><br>"+
          "<div id='landcover_20' class = 'landcover'></div><br>"+
          "<div id='landcover_30' class = 'landcover'></div><br>"+
          "<div id='landcover_40' class = 'landcover'></div><br>"+
          "<div id='landcover_50' class = 'landcover'></div><br>"+
          "<div id='landcover_60' class = 'landcover'></div><br>"+
          "<div id='landcover_80' class = 'landcover'></div><br>"+
          "<div id='landcover_90' class = 'landcover'></div><br>"+
          "<div id='landcover_112' class = 'landcover'></div><br>"+
          "<div id='landcover_114' class = 'landcover'></div><br>"+
          "<div id='landcover_116' class = 'landcover'></div><br>"+
          "<div id='landcover_122' class = 'landcover'></div><br>"+
          "<div id='landcover_124' class = 'landcover'></div><br>"+
          "<div id='landcover_126' class = 'landcover'></div><br>"+

          
          "</div></li></ul>");

});
          
          map.on('mouseenter', 'protection_trends_acp', function () {
          map.getCanvas().style.cursor = 'pointer';
          });
           
          map.on('mouseleave', 'protection_trends_acp', function () {
          map.getCanvas().style.cursor = '';
          map.setFilter("country_high", ["in", "iso2_digit", "xxx"]);
          });

          map.on("moveend", function () {
            var features = map.queryRenderedFeatures({ layers: ["protection_trends_acp"] });
            if (features) {
            var uniqueFeatures = getUniqueFeatures(features, "iso2_digit");
           
            renderListings(uniqueFeatures);
            country = uniqueFeatures;
            }
            });
            
            map.on("mousemove", "protection_trends_acp", function (e) {
            map.getCanvas().style.cursor = "pointer";
            map.setFilter("country_high", ["in", "iso2_digit", e.features[0].properties.iso2_digit]);
            var prot_mar_perc_ind = e.features[0].properties.prot_mar_perc_ind;
            if (prot_mar_perc_ind == null){
              prot_mar_perc_ind = 0
            } else{
              prot_mar_perc_ind = prot_mar_perc_ind
            }
            popup.setLngLat(e.lngLat)
            .setHTML('<a href="https://dopa-explorer.jrc.ec.europa.eu/country/'+e.features[0].properties.iso2_digit+'" target="_blank">'+e.features[0].properties.name_c+'</a><br><div class = "marine_eco"></div>'+
            " <ul><li>"+
            "<div><span class = 'coll_item_title' > Terrestrial Protection ("+Math.round(( e.features[0].properties.prot_terr_perc_ind)*100)/100+")</span>"+
              "<div id='progressbar'><div style='width:"+e.features[0].properties.prot_terr_perc_ind+"%'></div></div>"+
              "<span class = 'coll_item_title' > Marine Protection(" +Math.round(( e.features[0].properties.prot_mar_perc_ind)*100)/100+")</span>"+
              "<div id='progressbar'><div style='width:" +prot_mar_perc_ind+"%'></div></div>"+
              "<span class = 'coll_item_title' > Terrestrial Connectivity ("+Math.round(( e.features[0].properties.protconn_ind)*100)/100+")</span>"+
              "<div id='progressbar'><div style='width:"+e.features[0].properties.protconn_ind+"%'></div></div>"+
              "</div></li></ul>")
            .addTo(map);
           });
            map.on("mouseleave", "protection_trends_acp", function () {
            map.getCanvas().style.cursor = "";
            map.getCanvas().style.cursor = "";
            popup.remove();
            });




     

    function rangeSliderwdpa() {
      var slider = document.getElementById('slider-pa');
      slider.addEventListener('input', function (e) {
        map.setPaintProperty(
        'dopa_geoserver_wdpa_master_202101_o1', 
        'fill-opacity',
        parseInt(e.target.value, 10) / 100
        );
      });
    }

    function rangeSlidercountry() {
      var slider = document.getElementById('slider-country');
      slider.addEventListener('input', function (e) {
        map.setPaintProperty(
        'protection_trends_acp', 
        'fill-opacity',
        parseInt(e.target.value, 10) / 100
        );
      });
    }
    function rangeSliderecoregion() {
      var slider = document.getElementById('slider-ecoregion');
      slider.addEventListener('input', function (e) {
        map.setPaintProperty(
        'ecoregion_master_202104', 
        'fill-opacity',
        parseInt(e.target.value, 10) / 100
        );
      });
    }
// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false
});
 

}); // map on load function


var popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: true
});

map.addControl(new mapboxgl.NavigationControl());


