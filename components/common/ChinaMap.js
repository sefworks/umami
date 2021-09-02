import ReactDOM from 'react-dom';
import React, { useState, useRef } from 'react';
import { Map, APILoader, Marker } from '@uiw/react-amap';
import { CHINA_REGION } from 'lib/china'

const Example = (props) => {
  let propsData = props.data;
  let GDPSpeed = {};
  CHINA_REGION.map(region => {
    GDPSpeed[region.code] = 0;
    propsData && propsData.map(data => {
      if (data.x === region.ename) {
        GDPSpeed[region.code] = (data.z/10).toFixed(1)
      }
    })
    region.ename
  });
  let colors = {};
  let getColorByDGP = function (adcode) {
    if (!colors[adcode]) {
      let gdp = GDPSpeed[adcode];
      if (!gdp) {
        colors[adcode] = 'rgb(227,227,227)';
      } else {
        let r = 3;
        let g = 140;
        let b = 230;
        let a = gdp / 10;
        colors[adcode] = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
      }
    }
    return colors[adcode];
  };
  let disCountry = new AMap.DistrictLayer.Country({
    zIndex: 10,
    SOC: 'CHN',
    depth: 1,
    styles: {
      'nation-stroke': '#ff0000',
      'coastline-stroke': '#0088ff',
      'province-stroke': 'grey',
      fill: function (props) {
        return getColorByDGP(props.adcode_pro);
      },
    },
  });
  let LabelsData = [
    {"name":"","position":["113.280637","23.125178"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"广东","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["113.665412","34.757975"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"河南","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["111.670801","40.818311"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"内蒙古","direction":"top","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["126.642464","45.756967"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"黑龙江","direction":"top","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["87.617733","43.792818"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"新疆","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["114.298572","30.584355"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"湖北","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["123.429096","41.796767"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"辽宁","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["117.000923","36.675807"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"山东","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["108.948024","34.263161"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"陕西","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["121.472644","31.231706"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"上海","direction":"right","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["106.713478","26.578343"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"贵州","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["106.504962","29.533155"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"重庆","direction":"right","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["91.132212","29.660361"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"西藏","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["117.283042","31.86119"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"安徽","direction":"top","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["119.306239","26.075302"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"福建","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["112.982279","28.19409"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"湖南","direction":"left","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["110.33119","20.031971"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"海南","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["118.767413","32.041544"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"江苏","direction":"right","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["101.778916","36.623178"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"青海","direction":"left","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["108.320004","22.82402"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"广西","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["106.278179","38.46637"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"宁夏","direction":"bottom","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["115.892151","28.676493"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"江西","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["120.153576","30.287459"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"浙江","direction":"bottom","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["114.502461","38.045474"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"河北","direction":"right","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["113.54909","22.198951"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"澳门","direction":"bottom","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["121.509062","25.044332"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"台湾","direction":"bottom","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["114.173355","22.320048"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"香港","direction":"right","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["103.823557","36.058039"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"甘肃","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["104.065735","30.659462"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"四川","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["125.3245","43.886841"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"吉林","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["117.190182","39.125596"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"天津","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["102.712251","25.040609"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"云南","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["116.405285","39.904989"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"北京","direction":"top","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}},
    {"name":"","position":["112.549248","37.857014"],"zooms":[4,13],"zIndex":1,"opacity":1,"text":{"content":"山西","direction":"center","offset":[0,0],"zooms":[3,20],"style":{"fontSize":10,"fontWeight":"normal","fillColor":"#eee","strokeColor":"#88f","strokeWidth":2}}}
  ]
  let layer = new AMap.LabelsLayer({
    // 开启标注避让，默认为开启，v1.4.15 新增属性
    collision: false,
    // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
    animation: true,
  });
  for (let i = 0; i < LabelsData.length; i++) {
    let labelsMarker = new AMap.LabelMarker(LabelsData[i]);
    layer.add(labelsMarker);
  }
  return (
    <APILoader akay="a7a90e05a37d3f6bf76d4a9032fc9129">
      {/* <button onClick={() => setShow(!show)}>{show ? '隐藏' : '显示'}</button> */}
      <div style={{ width: '100%', height: '100%' }}>
        <Map
          zooms={[4, 10]}
          zoom={4}
          isHotspot={false}
          layers={[disCountry, layer]}
          viewMode={'3D'}
          center={[106.122082, 33.719192]}
        ></Map>
      </div>
    </APILoader>
  );
};

export default class ChinaMap extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
  }
  render() {
    const { data } = this.props;
    return (
      <APILoader akay="a7a90e05a37d3f6bf76d4a9032fc9129">
        <Example data={data} />
      </APILoader>
    );
  }
}
