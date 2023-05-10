import React, { useState } from 'react';
import { useEffect } from "react";
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

import axios from 'axios';


const storeGrid = [
    {
        field: 'store_id',
        headerText: 'ID',
        textAlign: 'Center'
    },
    {
        field: 'name',
        headerText: 'Name',
        textAlign: 'Center'
    },
    {
        field: 'category',
        headerText: 'Category',
        textAlign: 'Center',
    },
    {
        field: 'description',
        headerText: 'Description',
        textAlign: 'Center',
    },
    {
        field: 'menu_item',
        headerText: 'Menu Item',
        textAlign: 'Center',
    },
    {
        field: 'unit_price',
        headerText: 'Unit Price',
        textAlign: 'Center'
    },
];


const Store = () => {

    const [storeData, setStoreData] = useState([]);

    useEffect(() => {
        // avoid mem leak
        let isMounted = true;
        const fetchData = async () => {
            try {
                await axios.get(`/store`).then(res => {
                    if (isMounted) setStoreData(res.data);
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
            <Header category="Page" title="Store" />
            <GridComponent
                dataSource={storeData}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                editSettings={editing}
                toolbar={toolbarOptions}
            >
                <ColumnsDirective>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {storeGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Search, Page]} />

            </GridComponent>
        </div>
    );
};
export default Store;
