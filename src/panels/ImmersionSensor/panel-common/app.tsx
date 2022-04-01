/*
 * @Description: 水浸传感器
 */
import React, { useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

import { useDeviceData } from '@hooks/useDeviceData';
import { DeviceContext } from './deviceContext';

import 'antd-mobile/es/global';
import '@icons/themes/global.less';
import '@icons/themes/icons/svg/immersion-sensor';
import './style.less';

import { Home } from './views/home';
import { Record } from './views/record';
import { Settings } from './views/settings';
import { QuicknessMode } from '@components/base/quicknessMode';

export const App = QuicknessMode(() => {
  const [state, { onDeviceDataChange, onDeviceStatusChange }] = useDeviceData(sdk);
  console.log(state, 'state===============');

  // webSecket 监听
  useEffect(() => {
    const handleWsControl = ({ deviceId, deviceData }) => {
      console.log('wsControl==========', deviceData);
      if (deviceId === sdk.deviceId) {
        onDeviceDataChange(deviceData);
      }
    };
    const handleWsReport = ({ deviceId, deviceData }) => {
      console.log('wsReport==========', deviceData);
      if (deviceId === sdk.deviceId) {
        onDeviceDataChange(deviceData);
      }
    };
    const handleWsStatusChange = ({ deviceId, deviceStatus }) => {
      if (deviceId === sdk.deviceId) {
        onDeviceStatusChange(deviceStatus);
      }
    };

    sdk
      .on('wsControl', handleWsControl)
      .on('wsReport', handleWsReport)
      .on('wsStatusChange', handleWsStatusChange);

    return () => {
      sdk
        .off('wsControl', handleWsControl)
        .off('wsReport', handleWsReport)
        .off('wsStatusChange', handleWsStatusChange);
    };
  }, []);

  return (
    <DeviceContext.Provider value={state}>
      <HashRouter>
        <Redirect exact from="/" to="/home"></Redirect>
        <Switch>
          {/* 首页 */}
          <Route
            path="/home"
            render={() => (
              <Home></Home>
            )}>
          </Route>
          <Route
            path="/record"
            render={() => (
              <Record></Record>
            )}>
          </Route>
          <Route
            path="/settings"
            render={() => (
              <Settings></Settings>
            )}>
          </Route>
        </Switch>
      </HashRouter>
    </DeviceContext.Provider>
  );
});
