import { Toaster } from "@/components/ui/sonner";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import { AdminPage } from "./pages/AdminPage";
import { BookAppointmentPage } from "./pages/BookAppointmentPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { MyAppointmentsPage } from "./pages/MyAppointmentsPage";

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const bookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book",
  component: BookAppointmentPage,
});

const myAppointmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-appointments",
  component: MyAppointmentsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  bookRoute,
  myAppointmentsRoute,
  adminRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}
