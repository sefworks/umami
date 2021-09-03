import ReactDOM from 'react-dom';
import React, { useState, useRef } from 'react';
import { Map, APILoader, Marker } from '@uiw/react-amap';
import { CHINA_REGION, LabelsData } from 'lib/china';

const Example = props => {
  let propsData = props.data;
  let GDPSpeed = {};
  CHINA_REGION.map(region => {
    GDPSpeed[region.code] = 0;
    propsData &&
      propsData.map(data => {
        if (data.x === region.ename) {
          GDPSpeed[region.code] = (data.z / 10).toFixed(1);
        }
      });
    region.ename;
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
    <div style={{ width: '100%', height: '100%' }}>
      <Map
        zooms={[4, 10]}
        zoom={4}
        isHotspot={true}
        layers={[disCountry, layer]}
        center={[106.122082, 36.719192]}
      ></Map>
    </div>
  );
};

export default class ChinaMap extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    return (
      <APILoader akay="b287a307b9677562290b52743b4ab624">
        <Example data={data} />
      </APILoader>
    );
  }
}
