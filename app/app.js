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



//************************************************************************************************************************************************************ */
//*************************************************************************MAP ONLOAD************************************************************************
//************************************************************************************************************************************************************ */


map.on('load', function() {

//************************************************************************************************************************************************************ */
//*************************************************************************END LAYERS************************************************************************
//************************************************************************************************************************************************************ */


map.addSource('wms-test-source', {
  'type': 'raster',
  // use the tiles option to specify a WMS tile source URL
  // https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/
  'tiles': [
    'https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?SERVICE=WMTS&REQUEST=GetTile&LAYER=africa_platform:world_flat_no_africa_no_eez_&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&format=image%2Fpng&TileCol={x}&TileRow={y}'
  ],
  'tileSize': 256
  });
  map.addLayer(
  {
  'id': 'wms-test-layer',
  'type': 'raster',
  'source': 'wms-test-source',
  'paint': {}
  }
  );


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
"tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=africa_platform:ap_country_stats&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
},
"source-layer": "ap_country_stats",

'paint': {
'fill-color': '#000000',
'fill-opacity': 0.1,

}, 

}, 'waterway-label');

map.addLayer({
"id": "country_high",
"type": "line",
"source": {
"type": "vector",
"tiles": ["https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/wmts?layer=africa_platform:ap_country_stats&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=application/x-protobuf;type=mapbox-vector&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}"]
},
"source-layer": "ap_country_stats",

paint: {
'line-color': '#ffffff',
'line-width': 1,

}, 'filter': ["in", "wdpaid",'xxx'],

}, 'waterway-label');

//************************************************************************************************************************************************************ */
//*************************************************************************END LAYERS************************************************************************
//************************************************************************************************************************************************************ */


 
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

          


//************************************************************************************************************************************************************ */
//************************************************************************* MAP ON CLICK FUNCTION **************************************************************
//************************************************************************************************************************************************************ */

map.on('click', 'protection_trends_acp', function (e) {

//************************************************************************************************************************************************************ */
//*************************************************************************START STATS************************************************************************
//************************************************************************************************************************************************************ */

// PAs number dynamics
var api_trend =  "https://api.biopama.org/api/protection_level/function/api_country_timeseries/iso3="+e.features[0].properties.iso3
$.ajax({
url: api_trend,
dataType: 'json',
success: function(d) {
$('#pan').highcharts({
chart: {
type: 'column',
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
text: 'Number of Protected Areas and Conserved Areas collected in the WDPA',
style: {
color: '#a1aeb0',
font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
},
align: 'center'

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

caption: {
  verticalAlign: 'bottom',
  useHTML: true,
  style: {
  'padding-top': '10px',
  'color':'white',
  'font-size': '20px'
  },
  text: '<hr><p><i class="tiny material-icons">info</i> This data provides information on the number of Protected Areas collected by UNEP-WCMC. More at https://www.protectedplanet.net/en</p>'

  },
series: [{
type: 'column',
name: ' Terrestrial',
color: '#8fbf4b',
data: [parseFloat(d[0]._2014_terrestrial_count),parseFloat(d[0]._2015_terrestrial_count),parseFloat(d[0]._2016_terrestrial_count),parseFloat(d[0]._2017_terrestrial_count),parseFloat(d[0]._2018_terrestrial_count),parseFloat(d[0]._2019_terrestrial_count),parseFloat(d[0]._2020_terrestrial_count),parseFloat(d[0]._2021_terrestrial_count),parseFloat(d[0]._2022_terrestrial_count),parseFloat(d[0]._2023_terrestrial_count)],
}, {
type: 'column',
name: 'Marine',
color: '#8eb4b1',
data: [parseFloat(d[0]._2014_marine_count),parseFloat(d[0]._2015_marine_count),parseFloat(d[0]._2016_marine_count),parseFloat(d[0]._2017_marine_count),parseFloat(d[0]._2018_marine_count),parseFloat(d[0]._2019_marine_count),parseFloat(d[0]._2020_marine_count),parseFloat(d[0]._2021_marine_count),parseFloat(d[0]._2022_marine_count),parseFloat(d[0]._2023_marine_count)],
}, {
type: 'column',
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

var country_stats_rest = "https://geospatial.jrc.ec.europa.eu/geoserver/wfs?request=getfeature&version=1.0.0&service=wfs&typename=dopa_analyst:countries_25112021&propertyname=area_calcu,iso3,&SORTBY=iso2_digit&CQL_FILTER=iso2_digit='"+e.features[0].properties.iso3+"'&outputFormat=application%2Fjson";
var country_area = 0
$.ajax({
url: country_stats_rest,
dataType: 'json',
success: function(d) {

country_area = parseFloat((d.features[0].properties.area_calcu));

},
async: false 
});

// TMF deforestation inside PAs dynamics
var api_trend_tmf =  "https://api.biopama.org/api/protection_level/function/api_tmf_time_series/iso3="+e.features[0].properties.iso3
$.ajax({
url: api_trend_tmf,
dataType: 'json',
success: function(d) {
var res = d.filter(obj=> obj.protection == "protected");
var avg =  (parseFloat(res[0]._2018_directdeforestation)+parseFloat(res[0]._2019_directdeforestation)+parseFloat(res[0]._2020_directdeforestation)+parseFloat(res[0]._2021_directdeforestation)+parseFloat(res[0]._2018_deforafterdegrad)+parseFloat(res[0]._2019_deforafterdegrad)+parseFloat(res[0]._2020_deforafterdegrad)+parseFloat(res[0]._2021_deforafterdegrad))/4
var first = (parseFloat(res[0]._2018_directdeforestation)+parseFloat(res[0]._2019_directdeforestation)+parseFloat(res[0]._2018_deforafterdegrad)+parseFloat(res[0]._2019_deforafterdegrad))
var last = (parseFloat(res[0]._2020_directdeforestation)+parseFloat(res[0]._2021_directdeforestation)+parseFloat(res[0]._2020_deforafterdegrad)+parseFloat(res[0]._2021_deforafterdegrad))
if (first>last){
var trend = 'decreased'
var color = '#adef2a'
}else{
var trend = 'increased'
var color = '#ff6347'
}

var percentage = (((last-first)/first)*100)

if (parseFloat(res[0]._2000_forestdegradation)>0){

$('#tmf_deforestation_stack').highcharts({
chart: {
type: 'column',
backgroundColor: null,
height: 600,

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
text: 'Protected Tropical Moist Forest Degradation and Deforestation',
style: {
color: '#a1aeb0',
font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
},
align: 'center'

},
xAxis: {
categories: ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021'],
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
fontSize: 10,
color: 'white',
textOutline: 'none'
},
formatter: function() {
return  Highcharts.numberFormat(this.total, 2, ',');
}
}
},

plotOptions: {
column: {
stacking: 'normal',
dataLabels: {
enabled: true,
color: 'white',

style: {
textOutline: 'none',
fontSize: 0,
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
text: '<i>Between 2018 and 2021, in the Tropical Moist Forest ecosystem, the average deforestation  was '+avg.toFixed(2)+' km<sup>2</sup>/yr. Over the period 2020 - 2021 <b>deforestation, inside Protected Areas</b>, has <span style="color:'+color+';">'+trend+'</span> by '+Math.abs(percentage).toFixed(2)+'%  compared to the period 2018 - 2019. <i><hr><p><i class="tiny material-icons">info</i> The Tropical Moist Forest Dataset, developed by the European Commission - Joint Research Centre helps detect and monitor changes in forest cover in tropical moist forests. It provides detailed information on deforestation and degradation, including the timing and intensity of each disturbance. Deforestation is defined as a permanent change in land cover from forest to non-forested land, while degradation encompasses temporary disturbances within a forest that result in remaining forested areas, such as selective logging, fires, and extreme weather events like hurricanes, droughts, and blowdowns. More at <a href="https://forobs.jrc.ec.europa.eu/TMF">https://forobs.jrc.ec.europa.eu/TMF</a>.</p>'
},

series: [{

name: 'Direct Deforestation',
color: '#c80a0a',
data: [parseFloat(res[0]._2000_directdeforestation),parseFloat(res[0]._2001_directdeforestation),parseFloat(res[0]._2002_directdeforestation),parseFloat(res[0]._2003_directdeforestation),parseFloat(res[0]._2004_directdeforestation),parseFloat(res[0]._2005_directdeforestation),parseFloat(res[0]._2006_directdeforestation),parseFloat(res[0]._2007_directdeforestation),parseFloat(res[0]._2008_directdeforestation),parseFloat(res[0]._2009_directdeforestation),parseFloat(res[0]._2010_directdeforestation),parseFloat(res[0]._2011_directdeforestation),parseFloat(res[0]._2012_directdeforestation),parseFloat(res[0]._2013_directdeforestation),parseFloat(res[0]._2014_directdeforestation),parseFloat(res[0]._2015_directdeforestation),parseFloat(res[0]._2016_directdeforestation),parseFloat(res[0]._2017_directdeforestation),parseFloat(res[0]._2018_directdeforestation),parseFloat(res[0]._2019_directdeforestation),parseFloat(res[0]._2020_directdeforestation),parseFloat(res[0]._2021_directdeforestation)],
}, {

name: 'Deforestation after degradation',
color: '#ff6347',
data: [parseFloat(res[0]._2000_deforafterdegrad),parseFloat(res[0]._2001_deforafterdegrad),parseFloat(res[0]._2002_deforafterdegrad),parseFloat(res[0]._2003_deforafterdegrad),parseFloat(res[0]._2004_deforafterdegrad),parseFloat(res[0]._2005_deforafterdegrad),parseFloat(res[0]._2006_deforafterdegrad),parseFloat(res[0]._2007_deforafterdegrad),parseFloat(res[0]._2008_deforafterdegrad),parseFloat(res[0]._2009_deforafterdegrad),parseFloat(res[0]._2010_deforafterdegrad),parseFloat(res[0]._2011_deforafterdegrad),parseFloat(res[0]._2012_deforafterdegrad),parseFloat(res[0]._2013_deforafterdegrad),parseFloat(res[0]._2014_deforafterdegrad),parseFloat(res[0]._2015_deforafterdegrad),parseFloat(res[0]._2016_deforafterdegrad),parseFloat(res[0]._2017_deforafterdegrad),parseFloat(res[0]._2018_deforafterdegrad),parseFloat(res[0]._2019_deforafterdegrad),parseFloat(res[0]._2020_deforafterdegrad),parseFloat(res[0]._2021_deforafterdegrad)],

}, {

name: 'Forest Degradation',
color: '#ffb400',
data: [parseFloat(res[0]._2000_forestdegradation),parseFloat(res[0]._2001_forestdegradation),parseFloat(res[0]._2002_forestdegradation),parseFloat(res[0]._2003_forestdegradation),parseFloat(res[0]._2004_forestdegradation),parseFloat(res[0]._2005_forestdegradation),parseFloat(res[0]._2006_forestdegradation),parseFloat(res[0]._2007_forestdegradation),parseFloat(res[0]._2008_forestdegradation),parseFloat(res[0]._2009_forestdegradation),parseFloat(res[0]._2010_forestdegradation),parseFloat(res[0]._2011_forestdegradation),parseFloat(res[0]._2012_forestdegradation),parseFloat(res[0]._2013_forestdegradation),parseFloat(res[0]._2014_forestdegradation),parseFloat(res[0]._2015_forestdegradation),parseFloat(res[0]._2016_forestdegradation),parseFloat(res[0]._2017_forestdegradation),parseFloat(res[0]._2018_forestdegradation),parseFloat(res[0]._2019_forestdegradation),parseFloat(res[0]._2020_forestdegradation),parseFloat(res[0]._2021_forestdegradation)],

}]

});
}else{
$('#tmf_deforestation_stack').html('<center><b>Statistics not available for the selected country</b> <hr></hr></center>');
}
}


});
// TMF deforestation outside PAs dynamics
var api_trend_tmf =  "https://api.biopama.org/api/protection_level/function/api_tmf_time_series/iso3="+e.features[0].properties.iso3
$.ajax({
url: api_trend_tmf,
dataType: 'json',
success: function(d) {



var res = d.filter(obj=> obj.protection == "unprotected");

var avg =  (parseFloat(res[0]._2018_directdeforestation)+parseFloat(res[0]._2019_directdeforestation)+parseFloat(res[0]._2020_directdeforestation)+parseFloat(res[0]._2021_directdeforestation)+parseFloat(res[0]._2018_deforafterdegrad)+parseFloat(res[0]._2019_deforafterdegrad)+parseFloat(res[0]._2020_deforafterdegrad)+parseFloat(res[0]._2021_deforafterdegrad))/4

var first = (parseFloat(res[0]._2018_directdeforestation)+parseFloat(res[0]._2019_directdeforestation)+parseFloat(res[0]._2018_deforafterdegrad)+parseFloat(res[0]._2019_deforafterdegrad))
var last = (parseFloat(res[0]._2020_directdeforestation)+parseFloat(res[0]._2021_directdeforestation)+parseFloat(res[0]._2020_deforafterdegrad)+parseFloat(res[0]._2021_deforafterdegrad))
var percentage = (((last-first)/first)*100)

if (first>last){
var trend = 'decreased'
var color = '#adef2a'
}else{
var trend = 'increased'
var color = '#ff6347'
}
if (parseFloat(res[0]._2000_forestdegradation)>0){
$('#tmf_deforestation_stack_unprot').highcharts({
chart: {
type: 'column',
backgroundColor: null,
height: 600,
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
text: 'Unprotected Tropical Moist Forest Degradation and Deforestation',
style: {
color: '#a1aeb0',
font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
},
align: 'center'

},
xAxis: {
categories: ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021'],
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
fontSize: 10,
color: 'white',
textOutline: 'none'
},
formatter: function() {
return  Highcharts.numberFormat(this.total, 2, ',');
}
}
},

plotOptions: {
column: {
stacking: 'normal',
dataLabels: {
enabled: true,
color: 'white',

style: {
textOutline: 'none',
fontSize: 0,
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
'font-size': '15px'
},
text: '<i>Between 2018 and 2021, in the Tropical Moist Forest ecosystem, the average deforestation  was '+avg.toFixed(2)+' km<sup>2</sup>/yr. Over the period 2020 - 2021 <b>deforestation, outside Protected Areas</b>, has <span style="color:'+color+';">'+trend+'</span> by '+Math.abs(percentage).toFixed(2)+'%  compared to the period 2018 - 2019. <i><hr><p><p><i class="tiny material-icons">info</i> The Tropical Moist Forest Dataset, developed by the European Commission - Joint Research Centre helps detect and monitor changes in forest cover in tropical moist forests. It provides detailed information on deforestation and degradation, including the timing and intensity of each disturbance. Deforestation is defined as a permanent change in land cover from forest to non-forested land, while degradation encompasses temporary disturbances within a forest that result in remaining forested areas, such as selective logging, fires, and extreme weather events like hurricanes, droughts, and blowdowns. More at <a href="https://forobs.jrc.ec.europa.eu/TMF">https://forobs.jrc.ec.europa.eu/TMF</a>.</p>'
},

series: [{

name: 'Direct Deforestation',
color: '#c80a0a',
data: [parseFloat(res[0]._2000_directdeforestation),parseFloat(res[0]._2001_directdeforestation),parseFloat(res[0]._2002_directdeforestation),parseFloat(res[0]._2003_directdeforestation),parseFloat(res[0]._2004_directdeforestation),parseFloat(res[0]._2005_directdeforestation),parseFloat(res[0]._2006_directdeforestation),parseFloat(res[0]._2007_directdeforestation),parseFloat(res[0]._2008_directdeforestation),parseFloat(res[0]._2009_directdeforestation),parseFloat(res[0]._2010_directdeforestation),parseFloat(res[0]._2011_directdeforestation),parseFloat(res[0]._2012_directdeforestation),parseFloat(res[0]._2013_directdeforestation),parseFloat(res[0]._2014_directdeforestation),parseFloat(res[0]._2015_directdeforestation),parseFloat(res[0]._2016_directdeforestation),parseFloat(res[0]._2017_directdeforestation),parseFloat(res[0]._2018_directdeforestation),parseFloat(res[0]._2019_directdeforestation),parseFloat(res[0]._2020_directdeforestation),parseFloat(res[0]._2021_directdeforestation)],
}, {

name: 'Deforestation after degradation',
color: '#ff6347',
data: [parseFloat(res[0]._2000_deforafterdegrad),parseFloat(res[0]._2001_deforafterdegrad),parseFloat(res[0]._2002_deforafterdegrad),parseFloat(res[0]._2003_deforafterdegrad),parseFloat(res[0]._2004_deforafterdegrad),parseFloat(res[0]._2005_deforafterdegrad),parseFloat(res[0]._2006_deforafterdegrad),parseFloat(res[0]._2007_deforafterdegrad),parseFloat(res[0]._2008_deforafterdegrad),parseFloat(res[0]._2009_deforafterdegrad),parseFloat(res[0]._2010_deforafterdegrad),parseFloat(res[0]._2011_deforafterdegrad),parseFloat(res[0]._2012_deforafterdegrad),parseFloat(res[0]._2013_deforafterdegrad),parseFloat(res[0]._2014_deforafterdegrad),parseFloat(res[0]._2015_deforafterdegrad),parseFloat(res[0]._2016_deforafterdegrad),parseFloat(res[0]._2017_deforafterdegrad),parseFloat(res[0]._2018_deforafterdegrad),parseFloat(res[0]._2019_deforafterdegrad),parseFloat(res[0]._2020_deforafterdegrad),parseFloat(res[0]._2021_deforafterdegrad)],

}, {

name: 'Forest Degradation',
color: '#ffb400',
data: [parseFloat(res[0]._2000_forestdegradation),parseFloat(res[0]._2001_forestdegradation),parseFloat(res[0]._2002_forestdegradation),parseFloat(res[0]._2003_forestdegradation),parseFloat(res[0]._2004_forestdegradation),parseFloat(res[0]._2005_forestdegradation),parseFloat(res[0]._2006_forestdegradation),parseFloat(res[0]._2007_forestdegradation),parseFloat(res[0]._2008_forestdegradation),parseFloat(res[0]._2009_forestdegradation),parseFloat(res[0]._2010_forestdegradation),parseFloat(res[0]._2011_forestdegradation),parseFloat(res[0]._2012_forestdegradation),parseFloat(res[0]._2013_forestdegradation),parseFloat(res[0]._2014_forestdegradation),parseFloat(res[0]._2015_forestdegradation),parseFloat(res[0]._2016_forestdegradation),parseFloat(res[0]._2017_forestdegradation),parseFloat(res[0]._2018_forestdegradation),parseFloat(res[0]._2019_forestdegradation),parseFloat(res[0]._2020_forestdegradation),parseFloat(res[0]._2021_forestdegradation)],

}]

});

}else{
$('#tmf_deforestation_stack_unprot').html('<center><b>Statistics not available for the selected country</b> <hr></hr></center>');
}

}


});
// Undisturbed TMF dynamics
var api_trend_tmf =  "https://api.biopama.org/api/protection_level/function/api_tmf_time_series/iso3="+e.features[0].properties.iso3
$.ajax({
url: api_trend_tmf,
dataType: 'json',
success: function(d) {



var res = d.filter(obj=> obj.protection == "unprotected");
var resp = d.filter(obj=> obj.protection == "protected");

var UndisturbedUnprot1 = parseFloat(res[0]._2000_undisturbedforest)
var UndisturbedUnprot2 = parseFloat(res[0]._2021_undisturbedforest)
var UndisturbedProt1 = parseFloat(resp[0]._2000_undisturbedforest)
var UndisturbedProt2 = parseFloat(resp[0]._2021_undisturbedforest)

var unprotVariation = parseFloat(((UndisturbedUnprot2-UndisturbedUnprot1)/UndisturbedUnprot1)*100) 
var protVariation = parseFloat(((UndisturbedProt2-UndisturbedProt1)/UndisturbedProt1)*100)


var countrycoverage2000 = (((UndisturbedUnprot1+UndisturbedProt1)/(parseFloat(resp[0]._2021_poly_area)+parseFloat(res[0]._2021_poly_area)))*100).toFixed(2)
var countrycoverage2021 = (((UndisturbedUnprot2+UndisturbedProt2)/(parseFloat(resp[0]._2021_poly_area)+parseFloat(res[0]._2021_poly_area)))*100).toFixed(2)


var trendUndisturbUnprot = 'unknown';

if(UndisturbedUnprot1 > UndisturbedUnprot2){
trendUndisturbUnprot = 'decreased'
color1 = '#ff6347'
}else{
trendUndisturbUnprot = 'increased'
color1 = '#adef2a'
}

var trendUndisturbProt = 'unknown';

if(UndisturbedProt1 > UndisturbedProt2){
trendUndisturbProt = 'decreased'
color2 = '#ff6347'
}else{
trendUndisturbProt = 'increased'
color2 = '#adef2a'

}



if (parseFloat(res[0]._2000_undisturbedforest)>0){
$('#tmf_undist_stack_unprot').highcharts({
chart: {
type: 'column',
backgroundColor: null,
height: 600,
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
text: 'Undisturbed Tropical Moist Forest',
style: {
color: '#a1aeb0',
font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
},
align: 'center'

},
xAxis: {
categories: ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021'],
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
fontSize: 10,
color: 'white',
textOutline: 'none'
},
formatter: function() {

return  Highcharts.numberFormat(this.total/1000, 1, ',')+" k";
}
}
},

plotOptions: {
spline: {
marker: {
enabled: false
}
},
column: {
stacking: 'normal',
dataLabels: {
enabled: true,
color: 'white',

style: {
textOutline: 'none',
fontSize: 0,
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
'font-size': '15px'
},
text: '<i>Undisturbed tropical moist forest not subject to protection has <span style="color:'+color1+';"> '+trendUndisturbUnprot+' </span> by <b>'+Math.abs((unprotVariation)).toFixed(2)+'</b>% whereas '+
'undisturbed tropical moist forest subject to protection has <span style="color:'+color2+';"> '+trendUndisturbProt+' </span> by <b>'+Math.abs((protVariation)).toFixed(2)+'</b>%.</i>'+
'<i>Overall, in 2000, Undisturbed Tropical Moist Forest accounted for <b> '+countrycoverage2000+'</b>% of the total country area. In 2021 this proportion stood at <b> '+countrycoverage2021+'</b>%.</i>'+
'<hr>'+
'<p><p><i class="tiny material-icons">info</i> The Tropical Moist Forest Dataset, developed by the European Commission - Joint Research Centre, helps detect and monitor changes in forest cover in tropical moist forests. It provides detailed information on deforestation and degradation, including the timing and intensity of each disturbance. Deforestation is defined as a permanent change in land cover from forest to non-forested land, while degradation encompasses temporary disturbances within a forest that result in remaining forested areas, such as selective logging, fires, and extreme weather events like hurricanes, droughts, and blowdowns. More at <a href="https://forobs.jrc.ec.europa.eu/TMF">https://forobs.jrc.ec.europa.eu/TMF</a>.</p>'

},

series: [{

name: 'Unprotected',
color: '#7fb763',

data: [parseFloat(res[0]._2000_undisturbedforest),parseFloat(res[0]._2001_undisturbedforest),parseFloat(res[0]._2002_undisturbedforest),parseFloat(res[0]._2003_undisturbedforest),parseFloat(res[0]._2004_undisturbedforest),parseFloat(res[0]._2005_undisturbedforest),parseFloat(res[0]._2006_undisturbedforest),parseFloat(res[0]._2007_undisturbedforest),parseFloat(res[0]._2008_undisturbedforest),parseFloat(res[0]._2009_undisturbedforest),parseFloat(res[0]._2010_undisturbedforest),parseFloat(res[0]._2011_undisturbedforest),parseFloat(res[0]._2012_undisturbedforest),parseFloat(res[0]._2013_undisturbedforest),parseFloat(res[0]._2014_undisturbedforest),parseFloat(res[0]._2015_undisturbedforest),parseFloat(res[0]._2016_undisturbedforest),parseFloat(res[0]._2017_undisturbedforest),parseFloat(res[0]._2018_undisturbedforest),parseFloat(res[0]._2019_undisturbedforest),parseFloat(res[0]._2020_undisturbedforest),parseFloat(res[0]._2021_undisturbedforest)],
},{

name: 'Protected',
color: '#369707',

data: [parseFloat(resp[0]._2000_undisturbedforest),parseFloat(resp[0]._2001_undisturbedforest),parseFloat(resp[0]._2002_undisturbedforest),parseFloat(resp[0]._2003_undisturbedforest),parseFloat(resp[0]._2004_undisturbedforest),parseFloat(resp[0]._2005_undisturbedforest),parseFloat(resp[0]._2006_undisturbedforest),parseFloat(resp[0]._2007_undisturbedforest),parseFloat(resp[0]._2008_undisturbedforest),parseFloat(resp[0]._2009_undisturbedforest),parseFloat(resp[0]._2010_undisturbedforest),parseFloat(resp[0]._2011_undisturbedforest),parseFloat(resp[0]._2012_undisturbedforest),parseFloat(resp[0]._2013_undisturbedforest),parseFloat(resp[0]._2014_undisturbedforest),parseFloat(resp[0]._2015_undisturbedforest),parseFloat(resp[0]._2016_undisturbedforest),parseFloat(resp[0]._2017_undisturbedforest),parseFloat(resp[0]._2018_undisturbedforest),parseFloat(resp[0]._2019_undisturbedforest),parseFloat(resp[0]._2020_undisturbedforest),parseFloat(resp[0]._2021_undisturbedforest)],
}]

});
}else{
$('#tmf_undist_stack_unprot').html('<center><b>Statistics not available for the selected country</b> <hr></hr></center>');
}
}


});
// Burned Areas dynamics
var api_burned_area =  "https://api.biopama.org/api/burned_area/function/api_dynamics/iso3="+e.features[0].properties.iso3
$.ajax({
url: api_burned_area,
dataType: 'json',
success: function(d) {



var res = d.filter(obj=> obj.protection == "unprotected");
var resp = d.filter(obj=> obj.protection == "protected");



var start = parseFloat(res[0].burned_2001)+parseFloat(res[0].burned_2002)+parseFloat(res[0].burned_2003)+parseFloat(res[0].burned_2004)+parseFloat(res[0].burned_2005)
var end = parseFloat(res[0].burned_2020)+parseFloat(res[0].burned_2019)+parseFloat(res[0].burned_2018)+parseFloat(res[0].burned_2017)+parseFloat(res[0].burned_2016)

var perc = ((end-start)/start)*100
if(start > end){
trend = 'decrease'
color_up = '#ff6347'
}
else{
trend = 'increase'
color_up = '#adef2a'
}

var startp = parseFloat(resp[0].burned_2001)+parseFloat(resp[0].burned_2002)+parseFloat(resp[0].burned_2003)+parseFloat(resp[0].burned_2004)+parseFloat(resp[0].burned_2005)
var endp = parseFloat(resp[0].burned_2020)+parseFloat(resp[0].burned_2019)+parseFloat(resp[0].burned_2018)+parseFloat(resp[0].burned_2017)+parseFloat(resp[0].burned_2016)

var percp = ((endp-startp)/startp)*100
if(startp > endp){
trendp = 'decrease'
color_p = '#ff6347'
}
else{
trendp = 'increase'
color_p = '#adef2a'
}



$('#burned_areas').highcharts({
chart: {
type: 'column',
backgroundColor: null,
height:'600px'

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
text: 'Burned Areas',
style: {
color: '#a1aeb0',
font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
},
align: 'center'

},
xAxis: {
categories: ['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'],
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
fontSize: 10,
color: 'white',
textOutline: 'none'
},
formatter: function() {

return  Highcharts.numberFormat(this.total/1000, 1, ',')+" k";
}
}
},

plotOptions: {
spline: {
marker: {
enabled: false
}
},
column: {
stacking: 'normal',
dataLabels: {
enabled: true,
color: 'white',

style: {
textOutline: 'none',
fontSize: 0,
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
'font-size': '15px'
},
text: '<i>Over the span of 2016 to 2020, the burned lands inside protected areas showed a <b>'+Math.abs(parseFloat(percp)).toFixed(2)+'% </b><span style="color:'+color_p+';">'+trendp+'</span> when contrasted with the period of 2001 to 2005 </i>'+
'<i> whereas the burned lands outside protected areas within the same time span showed a <b>'+Math.abs(parseFloat(perc)).toFixed(2)+'% </b><span style="color:'+color_up+';">'+trend+'.</span></i>'+
'<hr><p><i class="tiny material-icons">info</i> These statistics are derived from the ESA Climate Change Initiative (CCI). MODIS Fire_cci Burned Area pixel product is a monthly global ~250m spatial resolution dataset containing information on burned areas as well as ancillary data. This dataset is also part of the Copernicus Climate Change Service (C3S).vFor more information please visit <a href="https://climate.esa.int/en/projects/fire/">https://climate.esa.int/en/projects/fire/</a></p>'


},

series: [{

name: 'Unprotected',
color: '#c08108',

data: [parseFloat(res[0].burned_2001),parseFloat(res[0].burned_2002),parseFloat(res[0].burned_2003),parseFloat(res[0].burned_2004),parseFloat(res[0].burned_2005),parseFloat(res[0].burned_2006),parseFloat(res[0].burned_2007),parseFloat(res[0].burned_2008),parseFloat(res[0].burned_2009),parseFloat(res[0].burned_2010),parseFloat(res[0].burned_2011),parseFloat(res[0].burned_2012),parseFloat(res[0].burned_2013),parseFloat(res[0].burned_2014),parseFloat(res[0].burned_2015),parseFloat(res[0].burned_2016),parseFloat(res[0].burned_2017),parseFloat(res[0].burned_2018),parseFloat(res[0].burned_2019),parseFloat(res[0].burned_2020)],
},{

name: 'Protected',
color: '#f1c063',

data: [parseFloat(resp[0].burned_2001),parseFloat(resp[0].burned_2002),parseFloat(resp[0].burned_2003),parseFloat(resp[0].burned_2004),parseFloat(resp[0].burned_2005),parseFloat(resp[0].burned_2006),parseFloat(resp[0].burned_2007),parseFloat(resp[0].burned_2008),parseFloat(resp[0].burned_2009),parseFloat(resp[0].burned_2010),parseFloat(resp[0].burned_2011),parseFloat(resp[0].burned_2012),parseFloat(resp[0].burned_2013),parseFloat(resp[0].burned_2014),parseFloat(resp[0].burned_2015),parseFloat(resp[0].burned_2016),parseFloat(resp[0].burned_2017),parseFloat(resp[0].burned_2018),parseFloat(resp[0].burned_2019),parseFloat(resp[0].burned_2020)],
}]

});

}


});
//Fires dynamics
var api_fires =  "https://api.biopama.org/api/human_modification/function/api_fires/iso3="+e.features[0].properties.iso3
$.ajax({
url: api_fires,
dataType: 'json',
success: function(d) {



var res = d.filter(obj=> obj.protection == "unprotected");
var resp = d.filter(obj=> obj.protection == "protected");

var start = parseFloat(res[0].fires_2001)+parseFloat(res[0].fires_2002)+parseFloat(res[0].fires_2003)+parseFloat(res[0].fires_2004)+parseFloat(res[0].fires_2005)
var end = parseFloat(res[0].fires_2022)+parseFloat(res[0].fires_2021)+parseFloat(res[0].fires_2020)+parseFloat(res[0].fires_2019)+parseFloat(res[0].fires_2018)

var perc = ((end-start)/start)*100
if(start > end){
trend = 'decrease'
color_up = '#ff6347'
}
else{
trend = 'increase'
color_up = '#adef2a'
}

var startp = parseFloat(resp[0].fires_2001)+parseFloat(resp[0].fires_2002)+parseFloat(resp[0].fires_2003)+parseFloat(resp[0].fires_2004)+parseFloat(resp[0].fires_2005)
var endp = parseFloat(resp[0].fires_2022)+parseFloat(resp[0].fires_2021)+parseFloat(resp[0].fires_2020)+parseFloat(resp[0].fires_2019)+parseFloat(resp[0].fires_2018)

var percp = ((endp-startp)/startp)*100
if(startp > endp){
trendp = 'decrease'
color_p = '#ff6347'
}
else{
trendp = 'increase'
color_p = '#adef2a'
}


$('#fires').highcharts({
chart: {
type: 'column',
backgroundColor: null,
height: '600px'

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
text: 'Number of Fires',
style: {
color: '#a1aeb0',
font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
},
align: 'center'

},
xAxis: {
categories: ['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'],
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
text: 'Number of fires '
},
stackLabels: {
enabled: true,
style: {
fontSize: 10,
color: 'white',
textOutline: 'none'
},
formatter: function() {

return  Highcharts.numberFormat(this.total/1000, 1, ',')+"k";
}
}
},

plotOptions: {
spline: {
marker: {
enabled: false
}
},
column: {
stacking: 'normal',
dataLabels: {
enabled: true,
color: 'white',

style: {
textOutline: 'none',
fontSize: 0,
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
'font-size': '15px'
},
text: '<i>Over the span of 2018 to 2022, the number of fires inside protected areas showed a <b>'+Math.abs(parseFloat(percp)).toFixed(2)+'% </b><span style="color:'+color_p+';">'+trendp+'</span> when contrasted with the period of 2001 to 2005 </i>'+
'<i> whereas the number of fires outside protected areas within the same time span showed a <b>'+Math.abs(parseFloat(perc)).toFixed(2)+'% </b><span style="color:'+color_up+';">'+trend+'.</span></i>'+
'<hr><p><i class="tiny material-icons">info</i> These statistics are derived from the Fire Information for Resource Management System (FIRMS). MODIS Collection 6 NRT Hotspot / Active Fire Detections MCD14DL. Available on-line at <a href="https://earthdata.nasa.gov/firms">https://earthdata.nasa.gov/firms</a> </p>'


},

series: [{

name: 'Unprotected',
color: '#c04a08',

data: [parseFloat(res[0].fires_2001),parseFloat(res[0].fires_2002),parseFloat(res[0].fires_2003),parseFloat(res[0].fires_2004),parseFloat(res[0].fires_2005),parseFloat(res[0].fires_2006),parseFloat(res[0].fires_2007),parseFloat(res[0].fires_2008),parseFloat(res[0].fires_2009),parseFloat(res[0].fires_2010),parseFloat(res[0].fires_2011),parseFloat(res[0].fires_2012),parseFloat(res[0].fires_2013),parseFloat(res[0].fires_2014),parseFloat(res[0].fires_2015),parseFloat(res[0].fires_2016),parseFloat(res[0].fires_2017),parseFloat(res[0].fires_2018),parseFloat(res[0].fires_2019),parseFloat(res[0].fires_2020),parseFloat(res[0].fires_2021),parseFloat(res[0].fires_2022)],
},{

name: 'Protected',
color: '#f19562',

data: [parseFloat(resp[0].fires_2001),parseFloat(resp[0].fires_2002),parseFloat(resp[0].fires_2003),parseFloat(resp[0].fires_2004),parseFloat(resp[0].fires_2005),parseFloat(resp[0].fires_2006),parseFloat(resp[0].fires_2007),parseFloat(resp[0].fires_2008),parseFloat(resp[0].fires_2009),parseFloat(resp[0].fires_2010),parseFloat(resp[0].fires_2011),parseFloat(resp[0].fires_2012),parseFloat(resp[0].fires_2013),parseFloat(resp[0].fires_2014),parseFloat(resp[0].fires_2015),parseFloat(resp[0].fires_2016),parseFloat(resp[0].fires_2017),parseFloat(resp[0].fires_2018),parseFloat(resp[0].fires_2019),parseFloat(resp[0].fires_2020),parseFloat(resp[0].fires_2021),parseFloat(resp[0].fires_2022)],
}]

});

}


});


//GHSL dynamics
var api_ghsl =  "https://api.biopama.org/api/human_modification/function/api_ghsl/iso3="+e.features[0].properties.iso3
$.ajax({
url: api_ghsl,
dataType: 'json',
success: function(d) {



var res = d.filter(obj=> obj.protection == "unprotected");
var resp = d.filter(obj=> obj.protection == "protected");

var start = parseFloat(res[0].sum_2000)
var end = parseFloat(res[0].sum_2020)

var perc = ((end-start)/start)*100
if(start > end){
trend = 'decrease'
color_up = '#ff6347'
}
else{
trend = 'increase'
color_up = '#adef2a'
}

var startp = parseFloat(resp[0].sum_2000)
var endp = parseFloat(resp[0].sum_2020)

var percp = ((endp-startp)/startp)*100
if(startp > endp){
trendp = 'decrease'
color_p = '#ff6347'
}
else{
trendp = 'increase'
color_p = '#adef2a'
}


$('#ghsl').highcharts({
chart: {
type: 'column',
backgroundColor: null,
height: '600px'

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
text: 'People',
style: {
color: '#a1aeb0',
font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
},
align: 'center'

},
xAxis: {
categories: ['2000','2005','2010','2015','2020'],
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
text: 'People '
},
stackLabels: {
enabled: true,
style: {
fontSize: 10,
color: 'white',
textOutline: 'none'
},
formatter: function() {

return  Highcharts.numberFormat(this.total/1000, 1, ',')+"k";
}
}
},

plotOptions: {
spline: {
marker: {
enabled: false
}
},
column: {
stacking: 'normal',
dataLabels: {
enabled: true,
color: 'white',

style: {
textOutline: 'none',
fontSize: 0,
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
'font-size': '15px'
},
text: '<i>Between 2000 to 2020, the number of people living inside protected areas showed a <b>'+Math.abs(parseFloat(percp)).toFixed(2)+'% </b><span style="color:'+color_p+';">'+trendp+'</span>.</i>'+
'<i> whereas the number of fires people living outside protected areas within the same time span showed a <b>'+Math.abs(parseFloat(perc)).toFixed(2)+'% </b><span style="color:'+color_up+';">'+trend+'.</span></i>'+
'<hr><p><i class="tiny material-icons">info</i> These statistics are derived from the The Global Human Settlement Layer (GHSL) Developed by the European Commission - Joint Research Centre. The GHSL project produces global spatial information about the human presence on the planet over time. This in the form of built-up maps, population density maps and settlement maps. This information is generated with evidence-based analytics and knowledge using new spatial data mining technologies. Available on-line at <a href="https://ghsl.jrc.ec.europa.eu/index.php">https://ghsl.jrc.ec.europa.eu/index.php</a> </p>'


},

series: [{

name: 'Unprotected',
color: '#c04a08',

data: [parseFloat(res[0].sum_2000),parseFloat(res[0].sum_2005),parseFloat(res[0].sum_2010),parseFloat(res[0].sum_2015),parseFloat(res[0].sum_2020)],
},{

name: 'Protected',
color: '#f19562',

data: [parseFloat(resp[0].sum_2000),parseFloat(resp[0].sum_2005),parseFloat(resp[0].sum_2010),parseFloat(resp[0].sum_2015),parseFloat(resp[0].sum_2020)],}]

});

}


});








// Primary Productivity dynamics
var api_primary_prod =  "https://api.biopama.org/api/forest/function/api_primary_prod/iso3="+e.features[0].properties.iso3
$.ajax({
url: api_primary_prod,
dataType: 'json',
success: function(d) {



var res = d.filter(obj=> obj.protection == "unprotected");
var resp = d.filter(obj=> obj.protection == "protected");

var start = parseFloat(res[0].pp_2001)
var end = parseFloat(res[0].pp_2022)

var perc = ((end-start)/start)*100
if(start > end){
trend = 'decreased'
color_up = '#ff6347'
}
else{
trend = 'increased'
color_up = '#adef2a'
}

var startp = parseFloat(resp[0].pp_2001)
var endp = parseFloat(resp[0].pp_2022)

var percp = ((endp-startp)/startp)*100
if(startp > endp){
trendp = 'decreased'
color_p = '#ff6347'
}
else{
trendp = 'increased'
color_p = '#adef2a'
}

$('#primprod').highcharts({
chart: {
type: 'column',
backgroundColor: null,
height:'600px'

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
text: 'Gross Primary Productivity',
style: {
color: '#a1aeb0',
font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
},
align: 'center'

},
xAxis: {
categories: ['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'],
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
text: 'kg*C/m^2'
},
stackLabels: {
enabled: true,
style: {
fontSize: 10,
color: 'white',
textOutline: 'none'
},
formatter: function() {

return  Highcharts.numberFormat(this.total/1000, 0, ',')+"k";
}
}
},

plotOptions: {
spline: {
marker: {
enabled: false
}
},
column: {
stacking: 'normal',
dataLabels: {
enabled: true,
color: 'white',

style: {
textOutline: 'none',
fontSize: 0,
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
'font-size': '15px'
},
text: '<i>Gross primary productivity inside protected areas has<span style="color:'+color_p+';"> '+trendp+'</span> between 2014 and 2022 by <b>'+Math.abs(parseFloat(percp)).toFixed(2)+'%</b></i>'+
'<i> whereas gross primary productivity outside protected areas has<span style="color:'+color_up+';"> '+trend+'</span> between 2014 and 2022 by <b>'+Math.abs(parseFloat(perc)).toFixed(2)+'%.</b></i>'+
'<hr><p><i class="tiny material-icons">info</i> This data provides information about annual Gross Primary Productivity at 500m pixel resolution. Annual Gross Primary Productivity inside and outside Protected Areas is derived from the sum of all 8-day Net Photosynthesis products from the given year. More at https://lpdaac.usgs.gov/products/mod17a3hgfv061/</p>'

},

series: [{

name: 'Unprotected',
color: '#4d9221',

data: [parseFloat(res[0].pp_2001),parseFloat(res[0].pp_2002),parseFloat(res[0].pp_2003),parseFloat(res[0].pp_2004),parseFloat(res[0].pp_2005),parseFloat(res[0].pp_2006),parseFloat(res[0].pp_2007),parseFloat(res[0].pp_2008),parseFloat(res[0].pp_2009),parseFloat(res[0].pp_2010),parseFloat(res[0].pp_2011),parseFloat(res[0].pp_2012),parseFloat(res[0].pp_2013),parseFloat(res[0].pp_2014),parseFloat(res[0].pp_2015),parseFloat(res[0].pp_2016),parseFloat(res[0].pp_2017),parseFloat(res[0].pp_2018),parseFloat(res[0].pp_2019),parseFloat(res[0].pp_2020),parseFloat(res[0].pp_2021),parseFloat(res[0].pp_2022)],
},{

name: 'Protected',
color: '#87ce59',

data: [parseFloat(resp[0].pp_2001),parseFloat(resp[0].pp_2002),parseFloat(resp[0].pp_2003),parseFloat(resp[0].pp_2004),parseFloat(resp[0].pp_2005),parseFloat(resp[0].pp_2006),parseFloat(resp[0].pp_2007),parseFloat(resp[0].pp_2008),parseFloat(resp[0].pp_2009),parseFloat(resp[0].pp_2010),parseFloat(resp[0].pp_2011),parseFloat(resp[0].pp_2012),parseFloat(resp[0].pp_2013),parseFloat(resp[0].pp_2014),parseFloat(resp[0].pp_2015),parseFloat(resp[0].pp_2016),parseFloat(resp[0].pp_2017),parseFloat(resp[0].pp_2018),parseFloat(resp[0].pp_2019),parseFloat(resp[0].pp_2020),parseFloat(resp[0].pp_2021),parseFloat(resp[0].pp_2022)],
}]

});

}


});
// Nightlights dynamics
var api_nightlights =  "https://api.biopama.org/api/human_modification/function/api_nightlights/iso3="+e.features[0].properties.iso3
$.ajax({
url: api_nightlights,
dataType: 'json',
success: function(d) {



var res = d.filter(obj=> obj.protection == "unprotected");
var resp = d.filter(obj=> obj.protection == "protected");

var start = parseFloat(res[0].rad_2014)
var end = parseFloat(res[0].rad_2022)

var perc = ((end-start)/start)*100
if(start > end){
nighttrend = 'decreased'
color_up = '#ff6347'
}
else{
nighttrend = 'increased'
color_up = '#adef2a'
}

var startp = parseFloat(resp[0].rad_2014)
var endp = parseFloat(resp[0].rad_2022)

var percp = ((endp-startp)/startp)*100
if(startp > endp){
nighttrendp = 'decreased'
color_p = '#ff6347'
}
else{
nighttrendp = 'increased'
color_p = '#adef2a'
}

$('#nightlights').highcharts({
chart: {
type: 'column',
backgroundColor: null,
height:'600px'

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
text: 'Nightlights (average radiance)',
style: {
color: '#a1aeb0',
font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
},
align: 'center'

},
xAxis: {
categories: ['2014','2015','2016','2017','2018','2019','2020','2021','2022'],
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
text: ' '
},
stackLabels: {
enabled: true,
style: {
fontSize: 10,
color: 'white',
textOutline: 'none'
},
formatter: function() {

return  Highcharts.numberFormat(this.total, 1, ',');
}
}
},

plotOptions: {
spline: {
marker: {
enabled: false
}
},
column: {
stacking: 'normal',
dataLabels: {
enabled: true,
color: 'white',

style: {
textOutline: 'none',
fontSize: 0,
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
'font-size': '15px'
},
text: '<i>Nightlighs inside protected areas has<span style="color:'+color_p+';"> '+nighttrendp+'</span> between 2014 and 2022 by <b>'+Math.abs(parseFloat(percp)).toFixed(2)+'%</b></i>'+
'<i> whereas nightlighs outside protected areas has<span style="color:'+color_up+';"> '+nighttrend+'</span> between 2014 and 2022 by <b>'+Math.abs(parseFloat(perc)).toFixed(2)+'%.</b></i>'+
'<hr><p><i class="tiny material-icons">info</i> This data provides information about annual nightime lights at 500m pixel resolution. Annual global VIIRS nighttime lights dataset is a time series produced from monthly cloud-free average radiance grids spanning 2013 to 2021. More at https://www.mdpi.com/2072-4292/13/5/922</p>'

},

series: [{

name: 'Unprotected',
color: '#f3f3e2',
data: [parseFloat(res[0].rad_2014),parseFloat(res[0].rad_2015),parseFloat(res[0].rad_2016),parseFloat(res[0].rad_2017),parseFloat(res[0].rad_2018),parseFloat(res[0].rad_2019),parseFloat(res[0].rad_2020),parseFloat(res[0].rad_2021),parseFloat(res[0].rad_2022)],            
},{
name: 'Protected',
color: '#ceceb4',
data: [parseFloat(resp[0].rad_2014),parseFloat(resp[0].rad_2015),parseFloat(resp[0].rad_2016),parseFloat(resp[0].rad_2017),parseFloat(resp[0].rad_2018),parseFloat(resp[0].rad_2019),parseFloat(resp[0].rad_2020),parseFloat(resp[0].rad_2021),parseFloat(resp[0].rad_2022)],            
}]

});

}


});
//ProtConn dynamics
var api_trend_protcon =  "https://api.biopama.org/api/protection_level/function/api_protconn_ts/iso3="+e.features[0].properties.iso3
$.ajax({
url: api_trend_protcon,
dataType: 'json',
success: function(d) {



var res = d[0];     

var start = parseFloat(res.protconn_2010)
var end = parseFloat(res.protconn_2023)

var perc = ((parseFloat(res.protconn_2023)-parseFloat(res.protconn_2010))/parseFloat(res.protconn_2010))*100
if(parseFloat(res.protconn_2010) > parseFloat(res.protconn_2023)){
protconntrend = 'decreased'
color_p_un = '#ff6347'
}
else{
protconntrend = 'increased'
color_p_un = '#adef2a'
}

$('#protconn').highcharts({
chart: {
type: 'column',
backgroundColor: null,
height: '600px'

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
text: 'ProtConn',
style: {
color: '#a1aeb0',
font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
},
align: 'center'

},
xAxis: {
categories: ['2010','2012','2014','2016','2018','2019','2020','2021','2022','2023'],
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
text: ' '
},
stackLabels: {
enabled: true,
style: {
fontSize: 10,
color: 'white',
textOutline: 'none'
},
formatter: function() {

return  Highcharts.numberFormat(this.total, 2, ',');
}
}
},

plotOptions: {
spline: {
marker: {
enabled: false
}
},
column: {
stacking: 'normal',
dataLabels: {
enabled: true,
color: 'white',

style: {
textOutline: 'none',
fontSize: 0,
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
'font-size': '15px'
},
text: '<i>Protected areas connectivity has<span style="color:'+color_p_un+';"> '+protconntrend+'</span> between 2010 and 2023 by <b>'+Math.abs(parseFloat(perc)).toFixed(2)+'%.</b></i>'+
'<hr><p><i class="tiny material-icons">info</i> This data provides information on the level of Connectivity of Protected Areas in country using the ProtConn indicator developed at the European Commission - Joint Research Centre. The indicator considers the spatial arrangement, size and coverage of protected areas (PAs), and accounts for both the land area that can be reached within PAs and that which is reachable through the connections between different PAs.. More at https://dopa.jrc.ec.europa.eu/</p>'



},

series: [{

name: 'ProtConn',
color: '#7fbc41',
data: [parseFloat(res.protconn_2010),parseFloat(res.protconn_2012),parseFloat(res.protconn_2014),parseFloat(res.protconn_2016),parseFloat(res.protconn_2018),parseFloat(res.protconn_2019),parseFloat(res.protconn_2020),parseFloat(res.protconn_2021),parseFloat(res.protconn_2022),parseFloat(res.protconn_2023)],            
}]

});

}


});
// Surface water dynamics
var api_trend_sw =  "https://api.biopama.org/api/waterdynamics/function/api_prot_unprot_surfacewater_dynamics/iso3="+e.features[0].properties.iso3
$.ajax({
url: api_trend_sw,
dataType: 'json',
success: function(d) {



var res = d.filter(obj=> obj.protection == "unprotected");
var resp = d.filter(obj=> obj.protection == "protected");




var permanent_perc_change_p = ((parseFloat(resp[0].permanent_2021))-(parseFloat(resp[0].permanent_2000)))/(parseFloat(resp[0].permanent_2000))*100
var permanent_perc_change_up = ((parseFloat(res[0].permanent_2021))-(parseFloat(res[0].permanent_2000)))/(parseFloat(res[0].permanent_2000))*100
var seasonal_perc_change_p = ((parseFloat(resp[0].seasonal_2021))-(parseFloat(resp[0].seasonal_2000)))/(parseFloat(resp[0].seasonal_2000))*100
var seasonal_perc_change_up = ((parseFloat(res[0].seasonal_2021))-(parseFloat(res[0].seasonal_2000)))/(parseFloat(res[0].seasonal_2000))*100

var pertrendWaterUnprot = 'unknown';

if(parseFloat(res[0].permanent_2000) > parseFloat(res[0].permanent_2021)){
pertrendWaterUnprot = 'decreased'
color_p_un = '#ff6347'
}
else{
pertrendWaterUnprot = 'increased'
color_p_un = '#adef2a'
}

var pertrendWaterProt = 'unknown';

if(parseFloat(resp[0].permanent_2000) > parseFloat(resp[0].permanent_2021)){
pertrendWaterProt = 'decreased'
color_p_p = '#ff6347'
}else{
pertrendWaterProt = 'increased'
color_p_p = '#adef2a'
}

var seatrendWaterUnprot = 'unknown';

if(parseFloat(res[0].seasonal_2000) > parseFloat(res[0].seasonal_2021)){
seatrendWaterUnprot = 'decreased'
color_s_un = '#ff6347'
}else{
seatrendWaterUnprot = 'increased'
color_s_un = '#adef2a'
}

var seatrendWaterProt = 'unknown';

if(parseFloat(resp[0].seasonal_2000) > parseFloat(resp[0].seasonal_2021)){
seatrendWaterProt = 'decreased'
color_s_p = '#ff6347'
}else{
seatrendWaterProt = 'increased'
color_s_p = '#adef2a'
}


$('#water_unprot_stack_unprot').highcharts({
chart: {
type: 'column',
backgroundColor: null,
height:'600px'

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
text: 'Unprotected Seasonal and Permanent Surface Water ',
style: {
color: '#a1aeb0',
font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
},
align: 'center'

},
xAxis: {
categories: ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021'],
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
fontSize: 10,
color: 'white',
textOutline: 'none'
},
formatter: function() {

return  Highcharts.numberFormat(this.total/1000, 1, ',')+" k";
}
}
},

plotOptions: {
spline: {
marker: {
enabled: false
}
},
column: {
stacking: 'normal',
dataLabels: {
enabled: true,
color: 'white',

style: {
textOutline: 'none',
fontSize: 0,
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
'font-size': '15px'
},
text: '<i>Permanent water not subject to protection has<span style="color:'+color_p_un+';"> '+pertrendWaterUnprot+'</span> between 2000 and 2021 by <b>'+parseFloat(permanent_perc_change_up).toFixed(2)+'%.</b></i>'+
'<hr><p><i class="tiny material-icons">info</i> This data developed by the European Commission Joint Research Centre contains the temporal distribution of surface water and provides statistics on the extent outside Protected Areas. For more information please visit <a href="https://data.jrc.ec.europa.eu/collection/id-0084">https://data.jrc.ec.europa.eu/collection/id-0084</a> </p>'


},

series: [{

name: 'Seasonal',
color: '#6baed6',
data: [parseFloat(res[0].seasonal_2000),parseFloat(res[0].seasonal_2001),parseFloat(res[0].seasonal_2002),parseFloat(res[0].seasonal_2003),parseFloat(res[0].seasonal_2004),parseFloat(res[0].seasonal_2005),parseFloat(res[0].seasonal_2006),parseFloat(res[0].seasonal_2007),parseFloat(res[0].seasonal_2008),parseFloat(res[0].seasonal_2009),parseFloat(res[0].seasonal_2010),parseFloat(res[0].seasonal_2011),parseFloat(res[0].seasonal_2012),parseFloat(res[0].seasonal_2013),parseFloat(res[0].seasonal_2014),parseFloat(res[0].seasonal_2015),parseFloat(res[0].seasonal_2016),parseFloat(res[0].seasonal_2017),parseFloat(res[0].seasonal_2018),parseFloat(res[0].seasonal_2019),parseFloat(res[0].seasonal_2020),parseFloat(res[0].seasonal_2021)],
},{

name: 'Permanent',
color: '#2171b5',
data: [parseFloat(res[0].permanent_2000),parseFloat(res[0].permanent_2001),parseFloat(res[0].permanent_2002),parseFloat(res[0].permanent_2003),parseFloat(res[0].permanent_2004),parseFloat(res[0].permanent_2005),parseFloat(res[0].permanent_2006),parseFloat(res[0].permanent_2007),parseFloat(res[0].permanent_2008),parseFloat(res[0].permanent_2009),parseFloat(res[0].permanent_2010),parseFloat(res[0].permanent_2011),parseFloat(res[0].permanent_2012),parseFloat(res[0].permanent_2013),parseFloat(res[0].permanent_2014),parseFloat(res[0].permanent_2015),parseFloat(res[0].permanent_2016),parseFloat(res[0].permanent_2017),parseFloat(res[0].permanent_2018),parseFloat(res[0].permanent_2019),parseFloat(res[0].permanent_2020),parseFloat(res[0].permanent_2021)],
}]

});

$('#water_prot_stack_unprot').highcharts({
chart: {
type: 'column',
backgroundColor: null,
height:'600px'

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
text: 'Protected Seasonal and Permanent Surface Water ',
style: {
color: '#a1aeb0',
font: '16px "Source Sans Pro", Helvetica Neue , sans-serif',
},
align: 'center'

},
xAxis: {
categories: ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021'],
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
fontSize: 10,
color: 'white',
textOutline: 'none'
},
formatter: function() {

return  Highcharts.numberFormat(this.total/1000, 1, ',')+" k";
}
}
},

plotOptions: {
spline: {
marker: {
enabled: false
}
},
column: {
stacking: 'normal',
dataLabels: {
enabled: true,
color: 'white',

style: {
textOutline: 'none',
fontSize: 0,
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
'font-size': '15px'
},
text: '<i>Permanent water subject to protection has<span style="color:'+color_p_p+';"> '+pertrendWaterProt+'</span> between 2000 and 2021 by <b>'+parseFloat(permanent_perc_change_p).toFixed(2)+'%.</b></i>'+
'<hr> <p><i class="tiny material-icons">info</i> This data developed by the European Commission Joint Research Centre contains the temporal distribution of surface water and provides statistics on the extent inside Protected Areas. For more information please visit <a href="https://data.jrc.ec.europa.eu/collection/id-0084">https://data.jrc.ec.europa.eu/collection/id-0084</a> </p>'


},

series: [{

name: 'Seasonal',
color: '#2171b5',
data: [parseFloat(resp[0].seasonal_2000),parseFloat(resp[0].seasonal_2001),parseFloat(resp[0].seasonal_2002),parseFloat(resp[0].seasonal_2003),parseFloat(resp[0].seasonal_2004),parseFloat(resp[0].seasonal_2005),parseFloat(resp[0].seasonal_2006),parseFloat(resp[0].seasonal_2007),parseFloat(resp[0].seasonal_2008),parseFloat(resp[0].seasonal_2009),parseFloat(resp[0].seasonal_2010),parseFloat(resp[0].seasonal_2011),parseFloat(resp[0].seasonal_2012),parseFloat(resp[0].seasonal_2013),parseFloat(resp[0].seasonal_2014),parseFloat(resp[0].seasonal_2015),parseFloat(resp[0].seasonal_2016),parseFloat(resp[0].seasonal_2017),parseFloat(resp[0].seasonal_2018),parseFloat(resp[0].seasonal_2019),parseFloat(resp[0].seasonal_2020),parseFloat(resp[0].seasonal_2021)],
},{

name: 'Permanent',
color: '#08306b',
data: [parseFloat(resp[0].permanent_2000),parseFloat(resp[0].permanent_2001),parseFloat(resp[0].permanent_2002),parseFloat(resp[0].permanent_2003),parseFloat(resp[0].permanent_2004),parseFloat(resp[0].permanent_2005),parseFloat(resp[0].permanent_2006),parseFloat(resp[0].permanent_2007),parseFloat(resp[0].permanent_2008),parseFloat(resp[0].permanent_2009),parseFloat(resp[0].permanent_2010),parseFloat(resp[0].permanent_2011),parseFloat(resp[0].permanent_2012),parseFloat(resp[0].permanent_2013),parseFloat(resp[0].permanent_2014),parseFloat(resp[0].permanent_2015),parseFloat(resp[0].permanent_2016),parseFloat(resp[0].permanent_2017),parseFloat(resp[0].permanent_2018),parseFloat(resp[0].permanent_2019),parseFloat(resp[0].permanent_2020),parseFloat(resp[0].permanent_2021)],
}]

});





}


});
  

//************************************************************************************************************************************************************ */
//*************************************************************************END STATS************************************************************************
//************************************************************************************************************************************************************ */

  // FILTER WDPA COUNTRY AND COUNTRY HIGHLIGHT
  map.setFilter("dopa_geoserver_wdpa_master_202101_o1", ["in", "iso3", e.features[0].properties.iso3]);
  map.setFilter("protection_trends_acp", ["!in", "iso2_digit", e.features[0].properties.iso2_digit]);
  map.setFilter("country_high", ["in", "iso2_digit", e.features[0].properties.iso2_digit]);

  // SHOW STATS PANEL
  $('#pa_stats').show();

  // GET COUNTRY BBOX      
  var country_stats_rest = "https://geospatial.jrc.ec.europa.eu/geoserver/wfs?request=getfeature&version=1.0.0&service=wfs&typename=africa_platform:ap_country_stats&propertyname=iso3&SORTBY=iso3&CQL_FILTER=iso3='"+e.features[0].properties.iso3+"'&outputFormat=application%2Fjson";
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
                    
//************************************************************************************************************************************************************ */
//*************************************************************************STATS PANEL************************************************************************
//************************************************************************************************************************************************************ */
  $('#pa_stats').html(
  "<div>"+
  "<div id='country_title'><b>"+e.features[0].properties.name+"</b></div>"+

  "<div id='tmf_wrapper'>"+ 
  "<div class = 'title'><h3>Tropical moist forest Dynamics</h3></div>"+  
  "<div id='tmf_undist_stack_unprot' class = 'landcover'></div><br>"+   
  "<div id='tmf_deforestation_stack' class = 'landcover'></div><br>"+
  "<div id='tmf_deforestation_stack_unprot' class = 'landcover'></div></div>"+ 

  "<div id='vegetation_wrapper'>"+ 
  "<div class = 'title'><h3>Vegetation Dynamics</h3></div>"+  
  "<div id='primprod' class = 'landcover'></div></div>"+ 

  "<div id='freshwater_wrapper'>"+ 
  "<div class = 'title'><h3>Freshwater Dynamics</h3></div>"+
  "<div id='water_prot_stack_unprot' class = 'landcover'></div><br>"+
  "<div id='water_unprot_stack_unprot' class = 'landcover'></div></div>"+

  "<div id='burned_wrapper'>"+ 
  "<div class = 'title'><h3>Burned Areas Dynamics</h3></div>"+ 
  "<div id='burned_areas' class = 'landcover'></div></div>"+  
  "<div id='fires' class = 'landcover'></div></div>"+   

  "<div id='nightlight_wrapper'>"+
  "<div class = 'title'><h3>Human Modification Dynamics</h3></div>"+ 
  "<div id='nightlights' class = 'landcover'></div></div>"+
  "<div id='ghsl' class = 'landcover'></div></div>"+

  "<div id='protconn_wrapper'>"+
  "<div class = 'title'><h3>Protected Areas Connectivity Dynamics</h3></div>"+ 
  "<div id='protconn' class = 'landcover'></div></div>"+

  "<div id='pan_wrapper'>"+
  "<div class = 'title'><h3>World Database on Protected Areas Dynamics</h3></div>"+ 
  "<div id='pan' class = 'landcover'></div></div>"+
  "</div></li></ul>");

});

// Layers Popup

map.on('mouseenter', 'protection_trends_acp', function () {
map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'protection_trends_acp', function () {
map.getCanvas().style.cursor = '';
map.setFilter("country_high", ["in", "iso3", "xxx"]);
});

map.on("moveend", function () {
var features = map.queryRenderedFeatures({ layers: ["protection_trends_acp"] });
if (features) {
var uniqueFeatures = getUniqueFeatures(features, "iso3");

renderListings(uniqueFeatures);
country = uniqueFeatures;
}
});

map.on("mousemove", "protection_trends_acp", function (e) {
map.getCanvas().style.cursor = "pointer";
map.setFilter("country_high", ["in", "iso3", e.features[0].properties.iso3]);
var prot_mar_perc_ind = e.features[0].properties.prot_mar_perc_ind;
if (prot_mar_perc_ind == null){
prot_mar_perc_ind = 0
} else{
prot_mar_perc_ind = prot_mar_perc_ind
}
popup.setLngLat(e.lngLat)
.setHTML('<a href="https://dopa-explorer.jrc.ec.europa.eu/country/'+e.features[0].properties.iso3+'" target="_blank">'+e.features[0].properties.name+'</a><br><div class = "marine_eco"></div>')
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


