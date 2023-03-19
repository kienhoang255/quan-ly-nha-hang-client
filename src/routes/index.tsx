import React, { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Loading from "../components/Loading/Loading";
import MainLayout from "../layouts/MainLayout";
import { listPages, listPagesProtect, pageLoginRegister } from "./listPages";
import ProtectRoute from "./ProtectRoute";
import CheckLoginRoute from "./CheckLoginRoute";

const index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route element={<CheckLoginRoute />}>
          {pageLoginRegister.map((e, key) => (
            <Route
              key={key}
              path={e.path}
              element={
                <Suspense fallback={<Loading />}>
                  <e.component />
                </Suspense>
              }
            ></Route>
          ))}
        </Route>
        {listPages.map((e, key) => (
          <Route
            key={key}
            path={e.path}
            element={
              <Suspense fallback={<Loading />}>
                <e.component />
              </Suspense>
            }
          ></Route>
        ))}
        <Route element={<ProtectRoute />}>
          {listPagesProtect.map((e, key) => (
            <Route
              key={key}
              path={e.path}
              element={
                <Suspense fallback={<Loading />}>
                  <e.component />
                </Suspense>
              }
            ></Route>
          ))}
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default index;
