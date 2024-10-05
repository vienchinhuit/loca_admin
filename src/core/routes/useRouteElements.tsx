import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../contexts/app.context";
import MainLayout from "../layouts/MainLayout";
import Login from "modules/Auth/Login";
import { path } from "core/constants";
import PageNotFound from "modules/PageNotFound";
import PageServerError from "modules/PageServerError";
import Banner from "modules/Banner/Banner";
import Introduction from "modules/introduce/Introduce";
import { MainPartner } from "modules/Partner";
import Driver from "modules/Driver/Driver";
import { Product } from "modules/Product";
import { Menu } from "modules/Menu";
import CreateNews from "modules/News/Create/Create";
import Update from "modules/News/Update/Update";
import CreateProduct from "modules/Product/Create/Create";
import UpdateProduct from "modules/Product/Update/Update";
import AboutUs from "modules/AboutUs/AboutUs";
import Category from "modules/Category/List";
import CreateCategory from "modules/Category/Create/Create";
import UpdateCategory from "modules/Category/Update/Update";
import MainBranch from "modules/System/Main";
import MainWhyChoose from "modules/WhyChoose/Main";
import MainNews from "modules/News/Main";
import Setting from "modules/Setting/Setting";
import MainContactUs from "modules/ContactUs/Main";

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={path.LOGIN} />;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/admin/banner" />;
}

export default function useRouteElements() {
  const element = useRoutes([
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "/",
          element: <Navigate to={path.LOGIN} replace />,
        },
        {
          path: `${path.LOGIN}`,
          element: <Login />,
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: `/admin/banner`,
          element: (
            <MainLayout>
              <Banner />
            </MainLayout>
          ),
        },
        {
          path: `/admin/introduce`,
          element: (
            <MainLayout>
              <Introduction />
            </MainLayout>
          ),
        },
        {
          path: `/admin/branch`,
          element: (
            <MainLayout>
              <MainBranch />
            </MainLayout>
          ),
        },
        {
          path: `/admin/news`,
          element: (
            <MainLayout>
              <MainNews />
            </MainLayout>
          ),
        },
        {
          path: `/admin/news-create`,
          element: (
            <MainLayout>
              <CreateNews />
            </MainLayout>
          ),
        },
        {
          path: `/admin/news-update/:id`,
          element: (
            <MainLayout>
              <Update />
            </MainLayout>
          ),
        },
        {
          path: `/admin/category`,
          element: (
            <MainLayout>
              <Category />
            </MainLayout>
          ),
        },
        {
          path: `/admin/category-create`,
          element: (
            <MainLayout>
              <CreateCategory />
            </MainLayout>
          ),
        },
        {
          path: `/admin/category-update/:id`,
          element: (
            <MainLayout>
              <UpdateCategory />
            </MainLayout>
          ),
        },

        {
          path: `/admin/why-choose`,
          element: (
            <MainLayout>
              <MainWhyChoose />
            </MainLayout>
          ),
        },
        {
          path: `/admin/partner`,
          element: (
            <MainLayout>
              <MainPartner />
            </MainLayout>
          ),
        },
        {
          path: `/admin/driver`,
          element: (
            <MainLayout>
              <Driver />
            </MainLayout>
          ),
        },
        {
          path: `/admin/setting`,
          element: (
            <MainLayout>
              <Setting />
            </MainLayout>
          ),
        },
        {
          path: `/admin/product`,
          element: (
            <MainLayout>
              <Product />
            </MainLayout>
          ),
        },
        {
          path: `/admin/product-create`,
          element: (
            <MainLayout>
              <CreateProduct />
            </MainLayout>
          ),
        },
        {
          path: `/admin/product-update/:id`,
          element: (
            <MainLayout>
              <UpdateProduct />
            </MainLayout>
          ),
        },
        {
          path: `/admin/menu`,
          element: (
            <MainLayout>
              <Menu />
            </MainLayout>
          ),
        },
        {
          path: `/admin/contact-us`,
          element: (
            <MainLayout>
              <MainContactUs />
            </MainLayout>
          ),
        },
        {
          path: `/admin/about-us`,
          element: (
            <MainLayout>
              <AboutUs />
            </MainLayout>
          ),
        },
      ],
    },
    {
      path: `/server-error`, // Wildcard cho tất cả các trang không khớp
      element: <PageServerError />,
    },
    {
      path: "*", // Wildcard cho tất cả các trang không khớp
      element: <PageNotFound />,
    },
  ]);

  return element;
}
