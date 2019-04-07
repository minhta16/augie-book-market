import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import Home from "./views/Home.jsx";
import Account from "./views/Account.jsx";

const webRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: HomeIcon,
    component: Home
  },
  {
    path: "/account-detail",
    name: "Account Detail",
    icon: PersonIcon,
    component: Account
  }
];

export default webRoutes;
