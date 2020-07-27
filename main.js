import './styles.less';
import mapImage from './assets/01_1920x1080_Map.jpg';

import waterslide from './assets/02_640x426_1.jpg';
import kidsArea from './assets/03_640x426_2.jpg';
import restaurant from './assets/04_640x426_3.jpg';
import firstAid from './assets/05_640x426_4.jpg';

import $ from 'jquery';
import {
    map
} from 'leaflet';

//these should be based on browser
//then you'll need to scale your point placement accordingly, relative to image size 
//all points should be placed in relative size also? 
const width = $(window).width();
const height = $(window).height();

//is center making a difference compared to set bounds?
const mapid = L.map('map', {
    crs: L.CRS.Simple,
    center: [height/2, width/2],
    zoom: 0,
    zoomControl: false,
    scrollWheelZoom: false,
});

//save the ratio of img dimensions/browser dimensions for point scaling 
//read more here: https://leafletjs.com/examples/crs-simple/crs-simple.html 
//pixel vs map unit 
const widthRatio = 1920/width;
const heightRatio = 1080/height;
 
const testBounds = L.latLngBounds([0, 0], [height, width]);
L.imageOverlay(mapImage, testBounds).addTo(mapid).getBounds();

function onMapClick(e) {
    var mapWidth = mapid._container.offsetWidth;
    var mapHeight = mapid._container.offsetHeight;
    console.log('w', e.containerPoint.x * width / mapWidth);
    console.log('h', e.containerPoint.y * height / mapHeight);
    console.log(e.latlng);
    console.log(e);
}

mapid.on('click', onMapClick);

//panes
mapid.createPane('toddlers')
mapid.createPane('everyone')
mapid.createPane('family')


mapid.createPane('aid')
mapid.createPane('extreme')
mapid.createPane('food')
mapid.createPane('lockers')
mapid.createPane('parking')
mapid.createPane('wc')


import {
    pirateShip,
    toddlerSlide,
    lazyRiver,
    circus,
    pirateLagoon,
    smallLagoon,
    wavepool,
    beach,
    flatSlide,
    windSlide,
    funnelShute,
    spiralShute,
    clamshell,
    funWall,
    lazyRiverSlide,
    cresentSlide,
    loopSlide,
    curvySlide,
    speedSlide,
    bigSlide,
    carouselSlide
} from './markers.js'

const toddler = L.layerGroup([pirateShip, toddlerSlide])
const everyone = L.layerGroup([lazyRiver, circus, pirateLagoon, smallLagoon, wavepool, beach, flatSlide, windSlide, funnelShute, spiralShute, clamshell, funWall]);
const family = L.layerGroup([lazyRiverSlide, cresentSlide])
const extreme = L.layerGroup([loopSlide, curvySlide, speedSlide, bigSlide, carouselSlide])

// Add markers to their respective panes 
toddler.addTo(mapid);
everyone.addTo(mapid);
family.addTo(mapid);
extreme.addTo(mapid);

const filterMap = e => {
    // console.log('tab event', e)
    const tabID = e.target.parentNode.id;
    console.log(tabID)
    $(`#${tabID}`).toggleClass('greyscale');
    $('.leaflet-test1-pane').css('display', 'none');
}

$('.tab').on('click', filterMap);