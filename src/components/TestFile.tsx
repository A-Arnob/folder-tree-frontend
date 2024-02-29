
// import React, { PropsWithChildren, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useWindowVisibility } from "../../utils/hooks/useWindowVisibility";
// import { useOrdersContext } from "./OrdersContext";

// const FLASH_TIME_INTERVALS_PENDING = 2000;
// // 15 minutes
// const FLASH_TIME_INTERVALS_NO_PENDING = 900000;

// const TabTitleContext = React.createContext({});

// export const TabTitleProvider: React.FC<PropsWithChildren> = (props) => {
//   const [routeTitle, setRouteTitle] = useState(document.title);
//   const { isWindowVisible } = useWindowVisibility();
//   const location = useLocation();
//   const { totalPendingOrders, getActiveOrdersApiAction } = useOrdersContext();

//   // keep track of current route title
//   useEffect(() => {
//     setTimeout(() => {
//       setRouteTitle(document.title);
//     }, 100);
//   }, [location.pathname]);

//   // Change titles effect
//   useEffect(() => {
//     let interval: any;
//     if (!isWindowVisible && totalPendingOrders > 0) {
//       // window not visible and when pending orders
//       let state = "route";
//       interval = setInterval(() => {
//         if (state === "route") {
//           document.title = `(${totalPendingOrders}) pending orders`;
//           state = "flash";
//         } else {
//           document.title = "New orders pending";
//           state = "route";
//         }
//       }, FLASH_TIME_INTERVALS_PENDING);
//     } else if (!isWindowVisible && !totalPendingOrders) {
//       // window not visible and no pending orders
//       // keeps tab active by changing titles
//       let state = "route";
//       document.title = routeTitle;
//       interval = setInterval(() => {
//         if (state === "route") {
//           document.title = `${routeTitle} | engaze`;
//           state = "flash";
//         } else {
//           document.title = routeTitle;
//           state = "route";
//         }
//       }, FLASH_TIME_INTERVALS_NO_PENDING);
//     } else {
//       // tab is visible again
//       if (interval) clearInterval(interval);
//       document.title = routeTitle;
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [
//     totalPendingOrders,
//     routeTitle,
//     isWindowVisible,
//     getActiveOrdersApiAction,
//   ]);

//   return (
//     <TabTitleContext.Provider value={{}}>
//       {props.children}
//     </TabTitleContext.Provider>
//   );
// };

// export const useTabTitleContext = () => {
//   const context = React.useContext(TabTitleContext);
//   if (context === undefined) {
//     throw new Error(
//       "useTabTitleContext must be used within a TabTitleProvider"
//     );
//   }
//   return context;
// };


