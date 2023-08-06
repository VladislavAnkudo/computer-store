import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import DeviceItem from './DeviceItem';

const DeviceList = observer(({ devices }) => {
  const {device} = useContext(Context)

  return (
    <div>
      <div className='devicelist'>
        {devices.map((device) => (
          <DeviceItem key={device.id} device={device} />
        ))}
      </div>
    </div>
  );
});

export default DeviceList;
