// farsi date

const date = new Date();
const weekday = new Intl.DateTimeFormat("fa", {
  weekday: "long",
}).format(date);

document.getElementById("weekday").innerHTML = weekday;

const faDate = new Intl.DateTimeFormat("fa", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(date);

document.getElementById("fadate").innerHTML = faDate;

// tile layer
var tile = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

// vector layer
const coords = [
  48.459565, 36.622539, 48.453399, 36.622712, 48.450274, 36.627786, 48.457118,
  36.632373, 48.45739, 36.629497,
];
let path = [];
for (let i = 0; i < coords.length; i += 2) {
  path.push([coords[i], coords[i + 1]]);
}
const lineString = new ol.geom.LineString(path);
lineString.transform("EPSG:4326", "EPSG:3857");
const feature = new ol.Feature({
  geometry: lineString,
});
const source = new ol.source.Vector();
source.addFeature(feature);
var vector = new ol.layer.Vector({
  source,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "blue",
      width: 3,
    }),
  }),
});

// map

var map = new ol.Map({
  target: "map",
  layers: [
    tile,
    //image,
    vector,
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([48.453098, 36.629122]),
    zoom: 14,
  }),
});
