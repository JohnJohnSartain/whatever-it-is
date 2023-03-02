import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CreateIcon from "@mui/icons-material/Create";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import InventoryIcon from '@mui/icons-material/Inventory';

const pageNavigationOptions: { name: string; icon: any }[] = [
  { name: "Home", icon: HomeIcon },
  { name: "Trending", icon: TrendingUpIcon },
  { name: "Creators", icon: Diversity3Icon },
  { name: "Our Story", icon: AutoStoriesIcon },
  { name: "Write", icon: CreateIcon },
  { name: "Archive", icon: InventoryIcon },
  { name: "Administration", icon: AdminPanelSettingsIcon },
];

export default pageNavigationOptions;
