import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './heater_head.less';
import classNames from 'classnames';

export function Normal_head() {
  return (
    <article id={'theme_normal_head'} className={classNames('theme_normal_head')}>
      <div className="img_span">
        <img className="head_img" src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/water-heater/water-heater-img-normal.png" alt=""/>
      </div>

      <div className="head_font">
        <div id={'temp'} className="top_size">
          {sdk.deviceData.temp_set ? sdk.deviceData.temp_set : 0}℃
        </div>
        <div className="foot_size">
          当前温度 {sdk.deviceData.temp_current ? sdk.deviceData.temp_current : 0}℃
        </div>
      </div>
    </article>
  );
}

export default Normal_head;

