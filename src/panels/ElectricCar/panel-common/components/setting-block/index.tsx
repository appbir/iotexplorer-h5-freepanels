/*
 * @Description: 首页-设置按钮
 */

import React from 'react';
import classNames from 'classnames';
import { SvgIcon } from '@components/common';
import { Block } from '@components/layout';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { onControlDevice } from '@hooks/useDeviceData';
import { getThemeType } from '@libs/theme';
import { SkinProps } from '../skinProps';
import './index.less';

export function SettingBlock() {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];

  // 报警
  const handleAlarm = () => {
    onControlDevice('alert_status', Number(!sdk.deviceData.alert_status));
  };

  // 静音
  const handleMute = () => {
    onControlDevice('search', sdk.deviceData.search !== 'sound' ? 'sound' : '');
  };

  return (
    <div className="electric-car-setting">
      <Block
        className={classNames(
          'setting-button',
          sdk.deviceData.bluetooth === 1 ? 'active' : '',
        )}
        onClick={() => {
          onControlDevice('bluetooth', Number(!sdk.deviceData.bluetooth));
        }}>
        {sdk.deviceData.bluetooth === 1 ? (
          <SvgIcon
            className="button-icon icon-bluetooth"
            name="icon-bluetooth"
              {...CurrentSkinProps.alarm.active}
            />
        ) : (
            <SvgIcon
            className="button-icon icon-bluetooth"
            name="icon-bluetooth"
              {...CurrentSkinProps.alarm.default}
            />
        )}
        <p className="button-name">蓝牙未连接</p>
      </Block>
      <Block
        className={classNames(
          'setting-button',
          sdk.deviceData.alert_status === 1 ? 'active' : '',
        )}
        onClick={handleAlarm}
      >
        {sdk.deviceData.alert_status === 1 ? (
          <SvgIcon
            className="button-icon icon-alarm"
            name="icon-alarm"
            {...CurrentSkinProps.alarm.active}
          />
        ) : (
          <SvgIcon
            className="button-icon icon-alarm"
            name="icon-alarm"
            {...CurrentSkinProps.alarm.default}
          />
        )}
        <p className="button-name">
          {sdk.deviceData.alert_status === 1 ? '报警已开' : '报警未开'}
        </p>
      </Block>
      <Block
        className={classNames(
          'setting-button',
          sdk.deviceData.search === 'sound' ? 'active' : '',
        )}
        onClick={handleMute}
      >
        {sdk.deviceData.search !== 'sound' ? (
          <SvgIcon
            className="button-icon icon-mute"
            name="icon-mute"
            {...CurrentSkinProps.mute}
          />
        ) : (
          <SvgIcon
            className="button-icon icon-whistle"
            name="icon-whistle"
            {...CurrentSkinProps.whistle}
          />
        )}
        <p className="button-name">
          {sdk.deviceData.search !== 'sound' ? '鸣笛寻车' : '鸣笛中'}
        </p>
      </Block>
    </div>
  );
}
