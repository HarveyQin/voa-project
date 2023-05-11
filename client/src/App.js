import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, Visitors, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Attractions, Shows, Parking, Store, Tickets, PurchaseTicket, Login, Register, AddAttractions, UpdateAttractions } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import { AuthContext } from './contexts/authContext';

const App = () => {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

    const { currentUser } = useContext(AuthContext);



    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    if (currentUser === null) {
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={(<Login />)} />
                        <Route path="/register" element={(<Register />)} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }

    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <BrowserRouter>
                <div className="flex relative dark:bg-main-dark-bg">
                    <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                        <TooltipComponent
                            content="Settings"
                            position="Top"
                        >
                            <button
                                type="button"
                                onClick={() => setThemeSettings(true)}
                                style={{ background: currentColor, borderRadius: '50%' }}
                                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                            >
                                <FiSettings />
                            </button>

                        </TooltipComponent>
                    </div>
                    {activeMenu ? (
                        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                            <Sidebar />
                        </div>
                    ) : (
                        <div className="w-0 dark:bg-secondary-dark-bg">
                            <Sidebar />
                        </div>
                    )}
                    <div
                        className={
                            activeMenu
                                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                        }
                    >
                        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                            <Navbar />
                        </div>
                        <div>
                            {themeSettings && (<ThemeSettings />)}

                            <Routes>
                                {/* dashboard  */}
                                <Route path="/" element={(<Ecommerce />)} />
                                <Route path="/ecommerce" element={(<Ecommerce />)} />

                                {/* pages  */}
                                <Route path="/purchase-tickets" element={<PurchaseTicket />} />
                                <Route path="/tickets" element={<Tickets />} />
                                <Route path="/attractions" element={<Attractions />} />
                                <Route path="/attractions/add" element={<AddAttractions />} />
                                <Route path="/attractions/update" element={<UpdateAttractions />} />

                                <Route path="/shows" element={<Shows />} />
                                <Route path="/parking" element={<Parking />} />
                                <Route path="/store" element={<Store />} />
                                <Route path="/orders" element={<Orders />} />
                                <Route path="/visitors" element={<Visitors />} />
                                <Route path="/customers" element={<Customers />} />

                                {/* apps  */}
                                <Route path="/kanban" element={<Kanban />} />
                                <Route path="/editor" element={<Editor />} />
                                <Route path="/calendar" element={<Calendar />} />
                                <Route path="/color-picker" element={<ColorPicker />} />

                                {/* charts  */}
                                <Route path="/line" element={<Line />} />
                                <Route path="/area" element={<Area />} />
                                <Route path="/bar" element={<Bar />} />
                                <Route path="/pie" element={<Pie />} />
                                <Route path="/financial" element={<Financial />} />
                                <Route path="/color-mapping" element={<ColorMapping />} />
                                <Route path="/pyramid" element={<Pyramid />} />
                                <Route path="/stacked" element={<Stacked />} />

                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
