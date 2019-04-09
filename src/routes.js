import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Home from "./views/Home.jsx";
import Account from "./views/Account.jsx";
import AddListing from "./views/AddListing.jsx";

const webRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: HomeIcon,
    component: Home
  },
  {
    path: "/new",
    name: "Add Listing",
    icon: AddIcon,
    component: AddListing
  },
  {
    path: "/account-detail",
    name: "Account Detail",
    icon: PersonIcon,
    component: Account
  }
];

export default webRoutes;
