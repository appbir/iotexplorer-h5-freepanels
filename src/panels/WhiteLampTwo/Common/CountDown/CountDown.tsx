import React from 'react';
import { TimePickerList } from '@custom/TimePickerList';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
export const CountDown = (props) => {
  // const { deviceData, doControlDeviceData } = props;
  const { doControlDeviceData } = props;
  // 添加进入刷新定时值
  const [state] = useDeviceInfo();
  const onChange = (count_down) => {
    doControlDeviceData({ count_down });
  };

  return (
    <div>
      <TimePickerList
        value={state.deviceData.count_down}
        onChange={onChange}
        emptyTitle="设置倒计时关灯时间"
      ></TimePickerList>
    </div>
  );
};
