import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
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
    path: "/manange-your-listing",
    name: "Manage Your Listing",
    icon: ListAltIcon,
    component: Account
  }
];

export default webRoutes;
