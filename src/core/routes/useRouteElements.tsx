import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../contexts/app.context";
import MainLayout from "../layouts/MainLayout";
import Login from "modules/Auth/Login";
import { path } from "core/constants";
import PageNotFound from "modules/PageNotFound";
import PageServerError from "modules/PageServerError";
import Banner from "modules/Banner/Banner";
import { MainSystem } from "modules/System";
import { News } from "modules/News";
import Introduction from "modules/introduce/Introduce";
import { WhyChoose } from "modules/WhyChoose";
import { Partner } from "modules/Partner";
import Driver from "modules/Driver/Driver";
import Contact from "modules/Contact/Contact";
import { Product } from "modules/Product";
import { Menu } from "modules/Menu";
import CreateNews from "modules/News/Create/Create";
import Update from "modules/News/Update/Update";
import CreateProduct from "modules/Product/Create/Create";
import UpdateProduct from "modules/Product/Update/Update";
import { ContactUs } from "modules/ContactUs";
import AboutUs from "modules/AboutUs/AboutUs";
import Category from "modules/Category/List";
import CreateCategory from "modules/Category/Create/Create";
import UpdateCategory from "modules/Category/Update/Update";



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
          path: `/admin/system`,
          element: (
            <MainLayout>
              <MainSystem />
            </MainLayout>
          ),
        },
        {
          path: `/admin/news`,
          element: (
            <MainLayout>
              <News />
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
          path: `/admin/category-update/:slug`,
          element: (
            <MainLayout>
              <UpdateCategory />
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
          path: `/admin/news-update/:slug`,
          element: (
            <MainLayout>
              <Update />
            </MainLayout>
          ),
        },
        {
          path: `/admin/why-choose`,
          element: (
            <MainLayout>
              <WhyChoose />
            </MainLayout>
          ),
        },
        {
          path: `/admin/partner`,
          element: (
            <MainLayout>
              <Partner />
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
          path: `/admin/contact`,
          element: (
            <MainLayout>
              <Contact/>
            </MainLayout>
          ),
        },
        {
          path: `/admin/product`,
          element: (
            <MainLayout>
              <Product/>
            </MainLayout>
          ),
        },
        {
          path: `/admin/product-create`,
          element: (
            <MainLayout>
              <CreateProduct/>
            </MainLayout>
          ),
        },
        {
          path: `/admin/product-update/:id`,
          element: (
            <MainLayout>
              <UpdateProduct/>
            </MainLayout>
          ),
        },
        {
          path: `/admin/menu`,
          element: (
            <MainLayout>
              <Menu/>
            </MainLayout>
          ),
        },
        {
          path: `/admin/contact-us`,
          element: (
            <MainLayout>
              <ContactUs/>
            </MainLayout>
          ),
        },
        {
          path: `/admin/about-us`,
          element: (
            <MainLayout>
              <AboutUs/>
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
