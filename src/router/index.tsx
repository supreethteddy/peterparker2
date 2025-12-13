import { useNavigate, type NavigateFunction, useRoutes, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { type RouteObject } from "react-router-dom";
import routes from "./config";

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
  }
}

export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
  navigateResolver = resolve;
});

export function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    window.REACT_APP_NAVIGATE = navigate;
    if (navigateResolver) {
      navigateResolver(navigate);
    }
  }, [navigate]);
  
  // Transform routes to ensure fresh elements on every render
  const transformedRoutes = useMemo<RouteObject[]>(() => {
    return routes.map((route) => {
      if (route.Component) {
        const Component = route.Component;
        return {
          ...route,
          element: <Component key={location.pathname} />
        };
      }
      return route;
    });
  }, [location.pathname]);
  
  const element = useRoutes(transformedRoutes);
  
  return element;
}
