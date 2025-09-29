import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const UpdateContactDataPage = lazy(
  () => import("@pages/update-contact-data/UpdateContactDataPage")
);
const FinishPurchase = lazy(
  () => import("@pages/finish-purchase/FinishPurchase")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/update-contact-data" replace />,
  },
  {
    path: "/update-contact-data",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <UpdateContactDataPage />
      </Suspense>
    ),
  },
  {
    path: "/finish-purchase",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <FinishPurchase />
      </Suspense>
    ),
  },
]);

export default router;
