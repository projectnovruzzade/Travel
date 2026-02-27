import DashboardHeader from "../components/DashboardHeader";
import DashboardAside from "../components/DashboardAside";
import { Outlet, useLocation } from "react-router-dom";

const TITLE_BY_PATH = [
  { path: "/admin/settings", title: "Parametrlər" },
  { path: "/admin/statistics", title: "Statistika" },
  { path: "/admin/users", title: "İstifadəçilər" },
  { path: "/admin/trends", title: "Trendlər" },
  { path: "/admin", title: "Ümumi Baxış" },
];

const getHeaderTitle = (pathname) => {
  const normalizedPath =
    pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;

  const matchedItem = TITLE_BY_PATH.find(({ path }) => {
    if (path === "/admin") {
      return normalizedPath === path;
    }

    return normalizedPath === path || normalizedPath.startsWith(`${path}/`);
  });

  return matchedItem?.title || "Umumi Baxis";
};

const AdminLayout = () => {
  const { pathname } = useLocation();
  const title = getHeaderTitle(pathname);

  return (
    <main id="admin-layout">
      <DashboardAside />
      <div className="wrapper-content">
        <DashboardHeader title={title} />
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;
