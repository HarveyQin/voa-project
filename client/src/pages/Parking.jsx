import React, { useState } from 'react';
import { useEffect } from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

import axios from 'axios';


const parkingGrid = [
    {
        field: 'park_id',
        headerText: 'ID',

        textAlign: 'Center'
    },
    {
        field: 'lot',
        headerText: 'Section Lot',

        textAlign: 'Center'
    },
    {
        field: 'spot_number',
        headerText: 'Spot',

        textAlign: 'Center',
    },
    {
        field: 'time_in',
        headerText: 'Time In',
        textAlign: 'Center',
    },
    {
        field: 'time_out',
        headerText: 'Time Out',

        textAlign: 'Center',
    },
    {
        field: 'fee',
        headerText: 'Fee',

        textAlign: 'Center'
    },
    {
        field: 'visitor_id',
        headerText: 'Visitor ID',

        textAlign: 'Center'
    },
];


const Parking = () => {

    const [parkingData, setParkingData] = useState([]);

    useEffect(() => {
        // avoid mem leak
        let isMounted = true;
        const fetchData = async () => {
            try {
                await axios.get(`/parking`).then(res => {
                    if (isMounted) setParkingData(res.data);
                });
                // console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
        return () => { isMounted = false };
    }, []);

    const toolbarOptions = ['Search'];

    const editing = { allowDeleting: true, allowEditing: true };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Parking" />
            <GridComponent
                dataSource={parkingData}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                editSettings={editing}
                toolbar={toolbarOptions}
            >
                <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {parkingGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Search, Page]} />

            </GridComponent>
        </div>
    );
};
export default Parking;
