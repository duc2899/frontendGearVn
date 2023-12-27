import HomePage from "../pages/Home";
import DetailLayout from "../Layouts/DetailsLayout";
import CartLayout from "../Layouts/CartLayout";
import AccountLayout from "../Layouts/AccountLayout";
import CollectionModules from "../Layouts/CollectionsLayout";
import LuckySpinLayout from "../Layouts/LuckySpinLayout";
import NotFoundLayout from "../Layouts/NotFoundLayout";
export const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/details/:name/:id", component: DetailLayout },
  { path: "/collections/:name", component: CollectionModules },
  { path: "/cart", component: CartLayout },
  { path: "*", component: NotFoundLayout },
];
export const privateRoutes = [
  { path: "/", component: HomePage },
  { path: "/luckyCircle", component: LuckySpinLayout },
  { path: "/settingAccount/:id", component: AccountLayout },
  { path: "/details/:name/:id", component: DetailLayout },
  { path: "/collections/:name", component: CollectionModules },
  { path: "/cart", component: CartLayout },
];
