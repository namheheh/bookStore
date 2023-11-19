import { RouteObject } from "react-router-dom";
import { RoleView } from "../views/admin/Category";
import CategoryAdd from "../views/admin/Category/CategoryAdd";
import CategoryEdit from "../views/admin/Category/CategoryEdit";
import { ProductView } from "../views/admin/Product";
import ProductAdd from "../views/admin/Product/ProductAdd";
import ProductEdit from "../views/admin/Product/ProductEdit";

import Index from "../views/client/home/Index";
import IndexProduct from "../views/client/product/Index";
import HomeClient from "../views/client/Home";
import { CommentView } from "../views/admin/Comment";
import IndexAdmin from "../views/admin/Index";
import Signin from "../views/client/user/Signin";
import Signup from "../views/client/user/Signup";
import UserView from "../views/admin/User/UserView";
import UserUpdate from "../views/admin/User/UserUpdate";
import ProductDetail from "../views/client/product/ProductDetail";
import Cart from "../views/client/Cart/Cart";
import CheckOut from "../views/client/home/CheckOut";
import Profile from "../views/client/profile/Profile";
import UserAdd from "../views/admin/User/UserAdd";
import { PaymentView } from "../views/admin/payment";
import PaymentAdd from "../views/admin/payment/PaymentAdd";
import PaymentEdit from "../views/admin/payment/PaymentEdit";
import Oops404 from "../views/client/Oops404/Oops404";
import OrderMane from "../views/admin/OrderMane/OrderMane";
import HistoryOrder from "../views/admin/OrderMane/HistoryOrder/HistoryOrder";
import Abortorder from "../views/admin/OrderMane/Abortorder/Abortorder";
import Ordersuccess from "../views/client/home/ordersuccess";
import Orderhistory from "../views/client/profile/orderhistory";

const routes: RouteObject[] = [
    {
        path: '/admin',
        element: <IndexAdmin />,
        children: [
            {
                index: true,
                element: <ProductView />
            },
            {
                path: 'category', element: <RoleView />
            },
            {
                path: 'category/add', element: <CategoryAdd />
            },
            {
                path: 'category/:idAuthor/edit', element: <CategoryEdit />
            },
            // Product
            {
                path: 'product', element: <ProductView />
            },
            {
                path: 'product/add', element: <ProductAdd />
            },
            {
                path: 'product/:idProduct/edit', element: <ProductEdit />
            },
            // Comment
            {
                path: 'comment', element: <CommentView />
            },
            //user
            {
                path: "user", element: <UserView />
            },
            {
                path: "user/:id/edit", element: <UserUpdate />
            },
            {
                path: "user/add", element: <UserAdd />
            },

            //paymnet
            {
                path: 'payment', element: <PaymentView />
            },
            {
                path: 'payment/add', element: <PaymentAdd />
            },
            {
                path: 'payment/:idPayment/edit', element: <PaymentEdit />
            },
            // orderManagement
            {
                path: 'orderManagement', element: <OrderMane />
            },
            {
                path: 'historyOrder', element: <HistoryOrder />
            },
            {
                path: 'abortOrder', element: <Abortorder />
            },
        ],
    },
    {
        path: '/',
        element: <HomeClient />,
        children: [
            {
                index: true,
                element: <Index />
            },
            {
                path: 'product',
                element: <IndexProduct />
            },
            {
                path: 'product/:_id/detail',

                element: <ProductDetail />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: 'checkout',
                element: <CheckOut />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'ordersuccess',
                element: <Ordersuccess />
            },
            {
                path: 'orderhistory',
                element: <Orderhistory />
            },
        ]
    },
    {
        path: '/signin',
        element: <Signin />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: "*",
        element: <Oops404 />
    },
];

export default routes;
