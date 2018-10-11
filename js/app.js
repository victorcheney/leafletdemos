var osm = L.tileLayer('http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors,' +
        'tiles from <a href="http://www.opencyclemap.org/">OpenCycleMap</a>'
});

var fmMapboxWinter = L.tileLayer('http://60.205.94.247:8888/fm-mapbox-winter/{z}/{x}/{y}.png', {});

// 高德地图 
var godmapLayer = L.tileLayer(
    'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        subdomains: "1234"
    });
// 高德影像图
var godmapImgeLayer = L.layerGroup([L.tileLayer(
    'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
        subdomains: "1234"
    }), L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}', {
    subdomains: "1234"
})]);

// fmMapboxWinter.addTo(map);

var glLayer = L.mapboxGL({
    accessToken: 'no-token',
    // style: 'https://www.fmbiz.com.cn:10248/styles/fiord-color/style.json'
    // style: 'https://www.fmbiz.com.cn:10240/map/styles/positron/style.json'
    style: 'https://www.fmbiz.com.cn:10240/map/styles/fiord-color/style.json'
})

var map = L.map('map', {
    center: new L.LatLng(36.47830972326979, 119.36542510986328),
    zoom: 8,
    // layers: [osm]
})

map.setView([36.47830972326979, 119.36542510986328], 16);

// glLayer.addTo(self.map);

godmapLayer.addTo(map);

// 定位（移动端）
/* map.locate({
        setView: true,
        maxZoom: 15
    })
    .on('locationfound', function (e) {
        var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
        var circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
            weight: 1,
            color: 'blue',
            fillColor: '#cacaca',
            fillOpacity: 0.2
        });
        map.addLayer(marker);
        map.addLayer(circle);
    })
    .on('locationerror', function (e) {
        console.log(e);
        alert("Location access denied.");
    }); */

/**定位到当前位置*/
var toCurLocaltion = function () {
    $.ajax({
        // url: 'https://restapi.amap.com/v3/ip?key=70c887068b7f10ca71379eb0b9953948',
        url: 'https://api.map.baidu.com/location/ip?ak=Qdr38ubEtGtD0AwFF85yPElUsjIHGL3Z&coor=bd09ll',
        // url:'http://api.map.baidu.com/location/ip?ak=Qdr38ubEtGtD0AwFF85yPElUsjIHGL3Z&coor=bd09ll',
        dataType: 'jsonp',
        processData: false,
        type: 'get',
        success: function (msg) {
            console.log('lnglat', msg);

            // 高德
            /* var lngLatArry = msg.rectangle.split(";"); //字符分割

            var lngLat_1 = lngLatArry[0].split(',');
            var lngLat_2 = lngLatArry[1].split(',');

            console.log('lngLat_1', lngLat_1);
            console.log('lngLat_2', lngLat_2);

            var bound = L.latLngBounds(lngLat_1, lngLat_2);

            var center = bound.getCenter();

            console.log('center', center);

            L.marker(lngLat_1.reverse()).addTo(map);
            L.marker(lngLat_2.reverse()).addTo(map);
            L.marker([center.lng, center.lat]).addTo(map); 
            map.setView([center.lng, center.lat], 15);
            */
            // 百度
            var center = msg.content.point
            L.marker([center.y, center.x]).addTo(map);
            map.setView([center.y, center.x], 15);

            // $(".leaflet-tile ,.leaflet-tile-loaded").fadeTo("slow", 0.4);
        }
    })

};

// toCurLocaltion();

/* if (window.navigator.geolocation) {
var options = {
enableHighAccuracy: true
};
window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
} else {
alert("浏览器不支持html5来获取地理位置信息");
}
function handleSuccess(position){
// 获取到当前位置经纬度  本例中是chrome浏览器取到的是google地图中的经纬度
var lng = position.coords.longitude;
var lat = position.coords.latitude;

console.log('lat', lat, 'lng', lng);

L.marker([lat, lng]).addTo(map);

map.setView([lat, lng]);

}
function handleError(error){
console.log('error', error);
}*/

// leaflet-maskcanvas

$.ajax({
    url: 'lib/leaflet-maskcanvas/VBB.json',
    type: 'get',
    success: function (response) {
        // console.log(response);
        var data = response;
        var layer = L.TileLayer.maskCanvas({
            radius: 5, // radius in pixels or in meters (see useAbsoluteRadius)
            useAbsoluteRadius: true, // true: r in meters, false: r in pixels
            color: '#000', // the color of the layer
            opacity: 0.5, // opacity of the not covered area
            noMask: false, // true results in normal (filled) circled, instead masked circles
            lineColor: '#A00' // color of the circle outline if noMask is true);
        });
        layer.setData(data);
        // map.addLayer(layer);
        layer.addTo(map);
    }
})
