import POS from "../containers/POS";
import Purchase from "../containers/Purchase";
import Cash from "../containers/Cash";
import Customers from "../containers/Customers";
import Settings from "../containers/Settings";
import SvgPos from "../Icons/Pos";
import React from "react";
import SvgPurchases from "../Icons/Purchases";
import SvgCashManagement from "../Icons/CashManagement";
import SvgCustomers from "../Icons/Customers";
import SvgSettings from "../Icons/Settings";
import SvgPosG from "../Icons/PosG";
import SvgPurchasesG from "../Icons/PurchasesG";
import SvgSettingsG from "../Icons/SettingsG";
import SvgCustomersG from "../Icons/CustomersG";
import SvgCashManagementG from "../Icons/CashManagementG";
import SvgPosA from "../Icons/PosA";
import SvgPosI from "../Icons/PosI";
import SvgPurchasesA from "../Icons/PurchasesA";
import SvgPurchasesI from "../Icons/PurchasesI";
import SvgCashManagementA from "../Icons/CashManagementA";
import SvgCashManagementI from "../Icons/CashManagementI";
import SvgCustomersA from "../Icons/CustomersA";
import SvgCustomersI from "../Icons/CustomersI";
import SvgSettingsA from "../Icons/SettingsA";
import SvgSettingsI from "../Icons/SettingsI";
const routesParam = [
    {
        path: "/main/pos",
        name: "POS",
        icon: <SvgPosA />,
        icon1: <SvgPosI />,
        component: React.lazy(() => import('../containers/POS'))
    },
    {
        path: "/main/purchase",
        name: "Purchases",
        icon: <SvgPurchasesA />,
        icon1: <SvgPurchasesI/>,
        component: React.lazy(() => import("../containers/Purchase"))
    },
    {
        path: "/main/cash",
        name: "Cash Management",
        icon: <SvgCashManagementA />,
        icon1: <SvgCashManagementI/>,
        component: React.lazy(() => import("../containers/Cash"))
    },
    {
        path: "/main/customers",
        name: "Customers",
        icon: <SvgCustomersA />,
        icon1: <SvgCustomersI/>,
        component: React.lazy(() => import("../containers/Customers"))
    },
    {
        path: "/main/settings",
        name: "Settings",
        icon: <SvgSettingsA />,
        icon1: <SvgSettingsI/>,
        component: React.lazy(() => import("../containers/Settings"))
    },
    {
        redirect: true,
        path: "/main",
        pathTo: "/main/pos",
        name: "POS Page"
    }
];
export default routesParam;
