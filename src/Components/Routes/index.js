import HomePage from "../pages/Home";
import DetailLayout from "../Layouts/DetailsLayout";
import CartLayout from "../Layouts/CartLayout";
import AccountLayout from "../Layouts/AccountLayout";
import CollectionModules from "../Layouts/CollectionsLayout";
import LuckySpinLayout from "../Layouts/LuckySpinLayout";
export const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/details/:name/:id", component: DetailLayout },
  { path: "/collections/:name", component: CollectionModules },
  { path: "/cart", component: CartLayout },
  { path: "/luckyCircle", component: LuckySpinLayout },
  { path: "/settingAccount/:id", component: AccountLayout },
];
