import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {
    AiOutlineCalendar,
    AiOutlineShoppingCart,
    AiOutlineAreaChart,
    AiOutlineBarChart,
    AiOutlineStock,
} from "react-icons/ai";
import {
    FiShoppingBag,
    FiEdit,
    FiPieChart,
    FiBarChart,
    FiCreditCard,
    FiStar,
    FiShoppingCart,
} from "react-icons/fi";
import {
    BsKanban,
    BsBarChart,
    BsBoxSeam,
    BsCurrencyDollar,
    BsShield,
    BsChatLeft,
} from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine, RiStockLine } from "react-icons/ri";
import {
    MdAttractions,
    MdLocalParking,
    MdTheaters,
    MdStore,
    MdAirplaneTicket,
} from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { GiLouvrePyramid } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";
import { useStateContext } from "../contexts/ContextProvider";

const links = [
    {
        title: "Dashboard",
        links: [
            {
                name: "ecommerce",
                icon: <FiShoppingBag />,
                roles: ["admin", "user"],
            },
        ],
    },
    {
        title: "Pages",
        links: [
            {
                name: "purchase-tickets",
                icon: <MdAirplaneTicket />,
                roles: ["admin", "user"],
            },
            {
                name: "tickets",
                icon: <MdAirplaneTicket />,
                roles: ["admin", "user"],
            },
            {
                name: "attractions",
                icon: <MdAttractions />,
                roles: ["user"],
            },
            {
                name: "shows",
                icon: <MdTheaters />,
                roles: ["user"],
            },
            {
                name: "parking",
                icon: <MdLocalParking />,
                roles: ["admin", "user"],
            },
            {
                name: "store",
                icon: <MdStore />,
                roles: ["user"],
            },
            {
                name: "orders",
                icon: <AiOutlineShoppingCart />,
                roles: ["admin", "user"],
            },
            {
                name: "visitors",
                icon: <IoMdContacts />,
                roles: ["user"],
            },
            {
                name: "customers",
                icon: <RiContactsLine />,
                roles: ["admin", "user"],
            },
        ],
    },

    {
        title: "Apps",
        links: [
            {
                name: "calendar",
                icon: <AiOutlineCalendar />,
                roles: ["user"],
            },
            {
                name: "kanban",
                icon: <BsKanban />,
                roles: ["admin", "user"],
            },
            {
                name: "editor",
                icon: <FiEdit />,
                roles: ["user"],
            },
            {
                name: "color-picker",
                icon: <BiColorFill />,
                roles: ["admin", "user"],
            },
        ],
    },
    {
        title: "Charts",
        links: [
            {
                name: "line",
                icon: <AiOutlineStock />,
                roles: ["admin", "user"],
            },
            {
                name: "area",
                icon: <AiOutlineAreaChart />,
                roles: ["admin", "user"],
            },

            {
                name: "bar",
                icon: <AiOutlineBarChart />,
                roles: ["admin", "user"],
            },
            {
                name: "pie",
                icon: <FiPieChart />,
                roles: ["user"],
            },
            {
                name: "financial",
                icon: <RiStockLine />,
                roles: ["user"],
            },
            {
                name: "color-mapping",
                icon: <BsBarChart />,
                roles: ["admin", "user"],
            },
            {
                name: "pyramid",
                icon: <GiLouvrePyramid />,
                roles: ["admin", "user"],
            },
            {
                name: "stacked",
                icon: <AiOutlineBarChart />,
                roles: ["user"],
            },
        ],
    },
];

const Sidebar = () => {
    const { currentColor, activeMenu, setActiveMenu, screenSize } =
        useStateContext();

    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(false);
        }
    };

    const activeLink =
        "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
    const normalLink =
        "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

    return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center">
                        <Link
                            to="/"
                            onClick={handleCloseSideBar}
                            className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                        >
                            <SiShopware /> <span>VOA</span>
                        </Link>
                        <TooltipComponent content="Menu" position="BottomCenter">
                            <button
                                type="button"
                                onClick={() => setActiveMenu(!activeMenu)}
                                style={{ color: currentColor }}
                                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                            >
                                <MdOutlineCancel />
                            </button>
                        </TooltipComponent>
                    </div>
                    <div className="mt-10 ">
                        {links.map((item) => (
                            <div key={item.title}>
                                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                                    {item.title}
                                </p >
                                {item.links
                                    .filter((link) => link.roles.includes("admin"))
                                    .map((link) => (
                                        <NavLink
                                            to={`/${link.name}`}
                                            key={link.name}
                                            onClick={handleCloseSideBar}
                                            style={({ isActive }) => ({
                                                backgroundColor: isActive ? currentColor : "",
                                            })}
                                            className={({ isActive }) =>
                                                isActive ? activeLink : normalLink
                                            }
                                        >
                                            {link.icon}
                                            <span className="capitalize ">{link.name}</span>
                                        </NavLink>
                                    ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;