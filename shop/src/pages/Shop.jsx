import React, { useContext, useState, useEffect} from 'react';

import TypeBar from "../component/TypeBar";
import BrandBar from "../component/BrandBar";
import DeviceList from "../component/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/DeviceApi";
import Pages from "../component/Pages";
import DeviceFilter from "../component/DeviceFilter";

const Shop = observer(() => {
    const {device} = useContext(Context)
    const [filteredDevices, setFilteredDevices] = useState([]);
    
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 9).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 9).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand,])

    const handleFilterChange = (priceRange) => {
        const filtered = device.devices.filter(
          (device) => device.price >= priceRange[0] && device.price <= priceRange[1]
        );
        setFilteredDevices(filtered);
      };
    
      const handleResetFilter = () => {
        setFilteredDevices([]);
      };
    
      const devicesToRender = filteredDevices.length > 0 ? filteredDevices : device.devices;
      
    return (
        <div className="wrapper">
            <div>  
                <div>
                    <TypeBar/>
                    <div className='brandandlist'>
                        <div>
                            <DeviceFilter
                                  onFilterChange={handleFilterChange}
                                  onResetFilter={handleResetFilter}
                            />
                            <BrandBar/>
                        </div>
                        <DeviceList devices={devicesToRender} />
                    </div>
                    <Pages/>
                </div>
            </div>
        </div>
    );
});

export {Shop};