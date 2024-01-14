import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EventIcon from '@mui/icons-material/Event';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const menuItems = [
    {text:"Home", icon:HomeIcon , link:"/home" },
    {text:"Users", icon:GroupIcon , link:"/users" },
    {text:"Food", icon:FastfoodIcon , link:"/food" },
    {text:"Exercises", icon:FitnessCenterIcon , link:"/exercises" },
    {text:"Days", icon:EventIcon , link:"/days" },
    {text:"Plans", icon:NextPlanIcon , link:"/plans" }
]

export const menuBottomItems = [
    {text:"Setting", icon:AdminPanelSettingsIcon , link:"/setting" },
    {text:"Logout", icon:LogoutIcon , link:"/logout" }
]
