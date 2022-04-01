/*
 * @Author: wrq
 * @Date: 2021-10-17 07:13:52
 * @Description:
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { Battery } from '@components/business';
import { Block } from '@components/layout';
import { SvgIcon } from '@components/common';

import { getThemeType } from '@libs/theme';
import { SkinProps } from '../skinProps';
import dayjs from 'dayjs';
import './home.less';

export function Home() {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];
  const history = useHistory();
  const [state] = useDeviceData(sdk);
  const { deviceData } = state;
  // 设备状态
  const [isOn, setPowerOn] = useState(false);
  const [recordTime, setRecordTime] = useState('');
  const [recordStatus, setRecordStatus] = useState('');

  useEffect(() => {
    const { doorsensor_state } = deviceData;

    setPowerOn(doorsensor_state === 1);
    // 获取历史记录
    const getDeviceDataHistory = async () => {
      try {
        const time = new Date();
        const currentTime = new Date().getTime();
        const lastYear = new Date().getFullYear() - 1;
        const lastYearTime = time.setFullYear(lastYear);

        const recordListInfo = await sdk.getDeviceDataHistory({
          FieldName: 'doorsensor_state',
          MaxTime: currentTime,
          MinTime: lastYearTime,
          Limit: 1,
        });
        setRecordTime(recordListInfo.Results[0]?.Time || '');
        setRecordStatus(recordListInfo.Results[0]?.Value || '');
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataHistory();
  });

  // 获取时间
  const date = dayjs(Number(recordTime));

  const statusLabel: any = {
    0: '关闭',
    1: '打开',
  };

  const handleOpen = () => {
    const data = !deviceData.doorsensor_state;
    setPowerOn(data);
    onControlDevice('doorsensor_state', Number(data));
  };

  return (
    <div className="app-magnetic-door-view">
      <div className="magnetic-door-header">
        <div className="status-bar">
          <Battery
            value={deviceData.battery_percentage}
            isShowTip={false}
            {...CurrentSkinProps.battery}
          />

          <span className="status-desc">
            {isOn ? '打开' : '关闭'}
          </span>
        </div>

        <div
          className={classNames('main-view', { is_on: isOn })}
          onClick={handleOpen}
        >
          <div className="left-block">
            {isOn ? (
              <SvgIcon name="icon-triangle" {...CurrentSkinProps.triangle} />
            ) : (
              <SvgIcon name="icon-triangle" />
            )}
          </div>
          <div className="right-block">
            {isOn ? (
              <SvgIcon name="icon-triangle" {...CurrentSkinProps.triangle} />
            ) : (
              <SvgIcon name="icon-triangle" />
            )}
          </div>
        </div>
      </div>

      <div className="tips">
        {recordStatus ? (
          <span>
            {date.format('YYYY-MM-DD HH:mm')}&nbsp;&nbsp;
            {statusLabel[Number(recordStatus)]
              ? statusLabel[Number(recordStatus)]
              : '未知'}
          </span>
        ) : (
          <span>暂无记录</span>
        )}
      </div>

      <div className="control-area">
        <Block
          className="control-button"
          onClick={() => {
            history.push('/records');
          }}
        >
          <SvgIcon
            className="button-icon icon-record"
            name="icon-record"
            {...CurrentSkinProps.record}
          />
          <p className="button-name">更多记录</p>
        </Block>
        <Block
          className="control-button"
          onClick={() => {
            sdk.showDeviceDetail();
          }}
        >
          <SvgIcon
            className="button-icon icon-setting"
            name="icon-setting"
            {...CurrentSkinProps.settings}
          />
          <p className="button-name">设置</p>
        </Block>
      </div>
    </div>
  );
}
