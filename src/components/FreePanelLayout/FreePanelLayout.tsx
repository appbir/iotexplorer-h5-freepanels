import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { DoControlDeviceData } from '@hooks/useDeviceInfo';
import { FuncFooter } from '../FuncFooter';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './FreePanelLayout.less';
import { px2rpx, rpx2rem } from "@utillib";

export interface FreePanelLayoutProps extends StyledProps {
	children: React.ReactNode;
	doControlDeviceData: DoControlDeviceData;
	offline: boolean;
	powerOff: boolean;
	title: string;
	deviceData: any;
	darkMode?: boolean;
	onGoTimingProject: () => any;
	onGoCountDown?: () => any;
	onSwitchChange?: () => any;
	isShareDevice?: boolean;
}

export function FreePanelLayout({
	children,
	className,
	style,
	doControlDeviceData,
	offline,
	powerOff,
	// title,
	deviceData,
	darkMode,
	onGoTimingProject,
	onGoCountDown,
	onSwitchChange,
	isShareDevice,
}: FreePanelLayoutProps) {
	useEffect(() => {
		if (offline) {
			sdk.offlineTip.show();
		} else {
			sdk.offlineTip.hide();
		}
	}, [offline]);

	const bodyHeight = useMemo(() => {
		return `${rpx2rem(px2rpx(document.documentElement.clientHeight) - 256)}rem`;
	}, []);

	return (
		<div
			className={classNames('free-panel-layout clearfix', className)}
			style={style}
		>
			<div
				className='free-panel-body clearfix'
				style={{
					height: bodyHeight,
				}}
			>
				{children}
			</div>

			<FuncFooter
				darkMode={darkMode}
				onGoTimingProject={onGoTimingProject}
				onGoCountDown={onGoCountDown}
				onSwitchChange={onSwitchChange}
				offline={offline}
				powerOff={powerOff}
				controlDeviceData={doControlDeviceData}
				countdown={deviceData.count_down as number}
				isShareDevice={isShareDevice}
			/>
		</div>
	);
}


