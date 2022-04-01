/*
 * @Description: 烟雾报警器首页
 */

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { SvgIcon } from '@components/common';
import { Block } from '@components/layout';
import { Battery } from '@components/business';
import { DataShowDisk } from '../components/data-show-disk/data-show-disk';

import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import dayjs from 'dayjs';

import { DeviceContext } from '../deviceContext';
import { getThemeType } from '@libs/theme';
import { SkinProps } from '../skinProps';

export function Home() {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];
  const history = useHistory();
  const [recordTime, setRecordTime] = useState('');
  const [recordStatus, setRecordStatus] = useState('');

  useEffect(() => {
    // 获取历史记录
    const getDeviceDataHistory = async () => {
      try {
        const time = new Date();
        const currentTime = new Date().getTime();
        const lastYear = new Date().getFullYear() - 1;
        const lastYearTime = time.setFullYear(lastYear);

        const recordListInfo = await sdk.getDeviceDataHistory({
          FieldName: 'smoke_sensor_state',
          MaxTime: currentTime,
          MinTime: lastYearTime,
          Limit: 1,
        });
        console.log('get info', recordListInfo.Results);
        setRecordTime(recordListInfo.Results[0]?.Time || '');
        setRecordStatus(recordListInfo.Results[0]?.Value || '');
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataHistory();
  }, []);

  // 获取时间
  const date = dayjs(Number(recordTime));

  const statusLabel: any = {
    1: '烟雾报警',
    2: '正常',
    3: '检测中',
    4: '未知',
  };

  // 设置
  const handleSetting = () => {
    history.push('/settings');
  };

  // 更多记录
  const handleMoreRecording = () => {
    history.push('/record');
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="smoke-alarm">
          {themeType === 'morandi' ? (
            <div className="alarm-header-morandi">
              <header className="alarm-header">
                {/* 电源模块 */}
                <Battery
                  isShowPercent={true}
                  isShowTip={false}
                  value={deviceData.battery_percentage}
                  {...CurrentSkinProps.battery}
                />
                <div
                  className={classNames(
                    'label',
                    deviceData.smoke_sensor_state === '1' ? 'active' : '',
                  )}
                >
                  {deviceData.smoke_sensor_state === '1'
                    ? '注意，检测到烟雾'
                    : '当前没有烟雾报警'}
                </div>
              </header>

              <DataShowDisk
                status={deviceData.smoke_sensor_state}
                value={deviceData.smoke_sensor_value}
                unit={'ppm'}
              />
            </div>
          ) : (
            <>
              <header className="alarm-header">
                {/* 电源模块 */}
                <Battery
                  isShowPercent={true}
                  isShowTip={false}
                  value={deviceData.battery_percentage}
                  {...CurrentSkinProps.battery}
                />
                <div
                  className={classNames(
                    'label',
                    deviceData.smoke_sensor_state === '1' ? 'active' : '',
                  )}
                >
                  {deviceData.smoke_sensor_state === '1'
                    ? '注意，检测到烟雾'
                    : '当前没有烟雾报警'}
                </div>
              </header>

              <DataShowDisk
                status={deviceData.smoke_sensor_state}
                value={deviceData.smoke_sensor_value}
                unit={'ppm'}
              />
            </>
          )}
          <div className="tips">
            {recordStatus ? (
              <span>
                {date.format('YYYY-MM-DD HH:mm')}&nbsp;&nbsp;
                {statusLabel[Number(recordStatus)]
                  ? statusLabel[Number(recordStatus)]
                  : '未知'}
              </span>
            ) : <span>暂无报警</span>}
          </div>
          <div className="footer-button">
            <Block className="button-block" onClick={handleMoreRecording}>
              <SvgIcon
                className="button-icon icon-record"
                name="icon-record"
                {...CurrentSkinProps.record}
              />
              <p className="button-name">更多记录</p>
            </Block>
            <Block className="button-block" onClick={handleSetting}>
              <SvgIcon
                className="button-icon icon-setting"
                name="icon-setting"
                {...CurrentSkinProps.settings}
              />
              <p className="button-name">设置</p>
            </Block>
          </div>
        </main>
      )}
    </DeviceContext.Consumer>
  );
}
