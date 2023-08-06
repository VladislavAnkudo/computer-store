import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
            <div className="brandbar">
                {device.brands.map(brand =>
                    <Card
                        style={{cursor:'pointer', paddingRight: '130px'}}
                        key={brand.id}
                        className="p3"
                        onClick={() => device.setSelectedBrand(brand)}
                        border={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
                    >
                        {brand.name}
                    </Card>
                )}
            </div>
    );
});

export default BrandBar;