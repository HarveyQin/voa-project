import React, { useState } from 'react';
import { useEffect } from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

import axios from 'axios';

const getWchairAccess = (props) => (
    <div className="flex items-center justify-center gap-2">
        <span>{props.wchair_access === "1" ? 'Yes' : 'No'}</span>
    </div>
);

const showsGrid = [
    {
        field: 'show_id',
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
        headerText: 'Address',
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
        field: 's_time',
        headerText: 'Start Time',
        width: '100',
        textAlign: 'Center'
    },
    {
        field: 'e_time',
        headerText: 'End Time',
        width: '100',
        textAlign: 'Center'
    },
    {
        template: getWchairAccess,
        headerText: 'Wheelchair Access?',
        width: '100',
        textAlign: 'Center'
    },
    {
        field: 'price',
        headerText: 'Price',
        width: '100',
        textAlign: 'Center'
    }
];


const Shows = () => {

    const [showsData, setShowsData] = useState([]);

    useEffect(() => {
        // avoid mem leak
        let isMounted = true;
        const fetchData = async () => {
            try {
                await axios.get(`/shows`).then(res => {
                    if (isMounted) setShowsData(res.data);
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
            <Header category="Page" title="Shows" />
            <GridComponent
                dataSource={showsData}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                editSettings={editing}
                toolbar={toolbarOptions}
            >
                <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {showsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Search, Page]} />

            </GridComponent>
        </div>
    );
};
export default Shows;
