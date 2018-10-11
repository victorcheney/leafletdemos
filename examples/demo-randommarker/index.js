var map = L.map('map').setView([36.47830972326979, 119.36542510986328], 13);

/* L.tileLayer('https://cartodb-basemaps-c.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(map); */

var glLayer = L.mapboxGL({
    accessToken: 'no-token',
    // style: 'https://www.fmbiz.com.cn:10240/map/styles/positron/style.json'
    style: 'https://www.fmbiz.com.cn:10240/map/styles/fiord-color/style.json'
})

glLayer.addTo(map);


/**
 * 根据边界坐标点随机生成标记点
 * @param {Array} bounds 区域边界（L.latLngBounds）
 * @param {Number} num 生成随机点的个数
 */
function _randomLatlng(bounds, num) {
    if (!bounds || !num) {
        return;
    }
    var i = null;
    var tempArr = [];
    for (i = num; i > 0; i--) {
        tempArr.push([
            Math.floor(Math.random() * (Math.abs(bounds[1][0] * 10000000000000 - bounds[0][0] * 10000000000000)) + bounds[0][0] * 10000000000000) / 10000000000000,
            Math.floor(Math.random() * (Math.abs(bounds[1][1] * 10000000000000 - bounds[0][1] * 10000000000000)) + bounds[0][1] * 10000000000000) / 10000000000000
        ]);
    }
    return tempArr;
}
/**
 * 构造标记点对象集合
 * @param {string} type 标记点类型： circleMarker、marker
 * @param {Array} randomMarkerLatlngs 
 * @return {Array} 标记点对象的数据
 */
function _addRandomMarkerToMap(type, randomMarkerLatlngs) {
    return randomMarkerLatlngs.map(function (item) {
        var tempMarker = [];
        if (type === 'circleMarker') {
            tempMarker = L.circleMarker(item, {
                radius: 3,
                color: '#ffa600',
                opacity: '0',
                fill: '#ffa600',
                fillOpacity: '0.5'
            }); // 圆形标记
        } else if (type === 'marker') {
            tempMarker = L.marker(item); // 添加气泡标记
        }
        /* else if (tempMarker === 'divIcon') {
                   tempMarker = L.marker(item, {
                       icon: L.divIcon({html: '<div class="my-div-icon"></div>',className: 'my-div-icon'})
                   }); // 添加divIcon标记      
               } */
        // tempMarker.addTo(map);
        return tempMarker;
    })
}

console.time('randomLatlng')
var randomMarkerLatlngs = _randomLatlng([[36.47996606341267, 119.32456970214845], [36.510188051366164, 119.3858528137207]], 1000);
console.timeEnd('randomLatlng')

var markerArray = _addRandomMarkerToMap('circleMarker', randomMarkerLatlngs);
// var markerArray = _addRandomMarkerToMap('divIcon', map, randomMarkerLatlngs);

console.log(markerArray);

// 设置视口中显示固定个数的图层
var conditionalLayer = L.conditionalMarkers(markerArray, {
    maxMarkers: 100
}).addTo(map);