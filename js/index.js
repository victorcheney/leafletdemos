// 生成卡片列表
let listData = [
    {
        name: '生成随机点',
        url: 'examples/demo-randommarker/index.html',
        originalUrl: ''
    },
    {
        name: '图层懒加载',
        url: 'examples/demo-layerindex/index.html',
        originalUrl: ''
    },
    {
        name: '贝塞尔曲线',
        url: 'examples/demo-bezier/index.html',
        originalUrl: ''
    },
    {
        name: '区域填充svg图',
        url: 'examples/demo-polygon-fillPattern/index.html',
        originalUrl: ''
    },
    {
        name: '迁移路线图',
        url: 'examples/demo-migrationLayer/index.html',
        originalUrl: ''
    },
    {
        name: '标签文本冲突',
        url: 'examples/demo-labelTextCollision/index.html',
        originalUrl: ''
    },
    {
        name: '地图图层转换为图片',
        url: 'examples/demo-leafletimage/index.html',
        originalUrl: ''
    },
    {
        name: 'Leaflet加载高德等底图',
        url: 'examples/demo-chinaProvider/index.html',
        originalUrl: 'https://github.com/htoooth/Leaflet.ChineseTmsProviders'
    },
    {
        name: 'LeafletNBA球队飞机航线图',
        url: 'examples/NBAFlight/index.html',
        originalUrl: ''
    }
];

let html = '<ul>';

listData.map(item => {

    html += 
    `<li>
        <img src="img/leaflet.png" alt="">
        <div class="p-link">
            <a href="${item.url}">${item.name}</a>
            <a href="${item.originalUrl}">ORIGINAL</a>
        </div>
    </li>`;

    return item;
});

html += '</ul>';

let node = document.getElementById('card-list');
node.innerHTML = html;