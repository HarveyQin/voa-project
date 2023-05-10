import React, { useState } from 'react';
import { useEffect } from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

import axios from 'axios';

const getAdress = (props) => (
    <div className="flex items-center justify-center gap-2">
        <span>{props.street + " " + props.city + ", " + props.state + ", " + props.country}</span>
    </div>
);

const getFullname = (props) => (
    <div className="flex items-center justify-center gap-2">
        <span>{props.fname + " " + props.lname}</span>
    </div>
);

const attractGrid = [
    {
        field: 'attract_id',
        headerText: 'ID',
        width: '30',
        textAlign: 'Center'
    },
    {
        field: 'name',
        headerText: 'Name',
        width: '80',
        textAlign: 'Center',
    },
    {
        field: 'description',
        headerText: 'Desctiption',
        width: '200',
        textAlign: 'Center',
    },
    {
        field: 'type',
        headerText: 'Type',
        width: '90',
        textAlign: 'Center',
    },
    {
        field: 'status',
        headerText: 'Status',
        width: '70',
        textAlign: 'Center'
    },
    {
        field: 'cpacity',
        headerText: 'Capacity',
        width: '80',
        textAlign: 'Center'
    },
    {
        field: 'min_height',
        headerText: 'Min Height',
        width: '70',
        textAlign: 'Center'
    },
    {
        field: 'duration',
        headerText: 'Duration',
        width: '70',
        textAlign: 'Center'
    },
    {
        field: 'section',
        headerText: 'Section',
        width: '50',
        textAlign: 'Center'
    },
];


const Attractions = () => {

    const [attractData, setAttractData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                await axios.get(`/attractions`).then(res => {
                    if (isMounted) setAttractData(res.data);
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
            <Header category="Page" title="Attractions" />
            <GridComponent
                dataSource={attractData}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                editSettings={editing}
                toolbar={toolbarOptions}
            >
                <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {attractGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Search, Page]} />

            </GridComponent>
        </div>
    );
};
export default Attractions;
