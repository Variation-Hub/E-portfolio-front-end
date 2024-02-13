import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import AppsOutageOutlinedIcon from "@mui/icons-material/AppsOutageOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import RemoveFromQueueOutlinedIcon from "@mui/icons-material/RemoveFromQueueOutlined";
import DomainVerificationOutlinedIcon from "@mui/icons-material/DomainVerificationOutlined";
import { UserRole } from "src/enum";

export const HomePageData = [
  {
    name: "30",
    color: "default",
    title: "Active learner",
    isIcon: false,
  },
  {
    name: "20",
    color: "default",
    title: "Learners on bil",
    isIcon: false,
  },
  {
    name: "10",
    color: "error",
    title: "Overdue learners",
    isIcon: false,
  },
  {
    name: "10",
    color: "error",
    title: "Overdue progress review",
    isIcon: false,
  },
  {
    name: "30",
    color: "default",
    title: "Learners due complete in next 30 days",
    isIcon: false,
  },
  {
    name: "10",
    color: "error",
    title: "Learners off track",
    isIcon: false,
  },
  {
    name: "10",
    color: "default",
    title: "Unmapped evidences",
    isIcon: false,
  },
  {
    name: "10",
    color: "default",
    title: "Learners assigned by qual",
    isIcon: false,
  },
  {
    name: "10",
    color: "default",
    title: "Days to practical end date (Gateway)",
    isIcon: false,
  },
  {
    name: "10",
    color: "error",
    title: "Overdue IQA action",
    isIcon: false,
  },
  {
    name: "10",
    color: "default",
    title: "Outstanding IQA actions",
    isIcon: false,
  },
  {
    name: "10",
    color: "default",
    title: "Due IQA action in next 30 days",
    isIcon: false,
  },
  {
    name: "20",
    color: "default",
    title: "Due session in next 7 days",
    isIcon: false,
  },
  {
    name: "20",
    color: "default",
    title: "Learner all a sampling plan",
    isIcon: false,
  },
  {
    name: "20",
    color: "default",
    title: "Learner not all a sampling plan",
    isIcon: false,
  },
  {
    name: <AssessmentOutlinedIcon />,
    color: "default",
    title: "Trainer rag report",
    isIcon: true,
  },
  {
    name: <BadgeOutlinedIcon />,
    color: "default",
    title: "Outstanding EQA actions",
    isIcon: true,
  },
  {
    name: <AppsOutlinedIcon />,
    color: "default",
    title: "Due activities",
    isIcon: true,
  },
  {
    name: <AppsOutageOutlinedIcon />,
    color: "default",
    title: "Overdue activities",
    isIcon: true,
  },
  {
    name: <PendingActionsOutlinedIcon />,
    color: "default",
    title: "Activities due in the next 7 days",
    isIcon: true,
  },
  {
    name: <PortraitOutlinedIcon />,
    color: "default",
    title: "Due session",
    isIcon: true,
  },
  {
    name: <DomainVerificationOutlinedIcon />,
    color: "default",
    title: "Sampling due",
    isIcon: true,
  },
  {
    name: <RemoveFromQueueOutlinedIcon />,
    color: "default",
    title: "Sampling overdue",
    isIcon: true,
  },
  {
    name: <DataUsageOutlinedIcon />,
    color: "default",
    title: "Overall progress",
    isIcon: true,
  },
  {
    name: <DateRangeOutlinedIcon />,
    color: "default",
    title: "OTJ up to date against expected",
    isIcon: true,
  },
];

export const AdminPageData = [
  {
    path: "/admin/user",
    name: "User Management",
    info: "Efficiently manage users with streamlined operations including add, delete, and update functionalities within the User Management tab.",
    svg: "assets/images/svgImage/usermanagement.svg"
  },
  {
    path: "/admin/learner",
    name: "Learner Management",
    info: "Optimize learner administration by seamlessly adding, updating, and deleting learners, while also facilitating the assignment of courses, trainers, employers, IQAs, and EQAs within the dedicated Learner Management tab.",
    svg: "assets/images/svgImage/learnermanagement.svg"
  },
];

export const AdminRedirect = {
  link: "/admin",
  name: "Admin",
};

export const userManagementTableColumn = [
  { id: 'first_name', label: 'Name', minWidth: 170, align: "left" },
  { id: 'user_name', label: 'Username', minWidth: 170, align: "left" },
  { id: 'email', label: 'Email', minWidth: 170, align: "left" },
  { id: 'mobile', label: 'Mobile', minWidth: 170, align: "left" },
  { id: 'role', label: 'Role', minWidth: 100, align: "left" },
  { id: 'status', label: 'Status', minWidth: 100, align: "left" },
  { id: 'actions', label: 'Actions', minWidth: 170, align: "center" }
];

export const learnerManagementTableColumn = [
  { id: 'first_name', label: 'Name', minWidth: 170, align: "left" },
  { id: 'user_name', label: 'Username', minWidth: 170, align: "left" },
  { id: 'email', label: 'Email', minWidth: 170, align: "left" },
  { id: 'mobile', label: 'Mobile', minWidth: 170, align: "left" },
  { id: 'status', label: 'Status', minWidth: 100, align: "left" },
  { id: 'actions', label: 'Actions', minWidth: 170, align: "center" }
];

export const roles = [{
  value: UserRole.Admin,
  label: "Admin"
},
{
  value: UserRole.Trainer,
  label: "Trainer"
},
{
  value: UserRole.Employer,
  label: "Employer"
},
{
  value: UserRole.IQA,
  label: "IQA"
},
{
  value: UserRole.EQA,
  label: "EQA"
}
]

export const courseManagementTableColumn = [
  { id: 'course_name', label: 'Course Name', minWidth: 200, align: "left" },
  { id: 'course_code', label: 'Code', minWidth: 70, align: "left" },
  { id: 'level', label: 'Level', minWidth: 170, align: "left" },
  { id: 'sector', label: 'Sector', minWidth: 170, align: "left" },
  { id: 'guided_learning_hours', label: 'Learning Hours', minWidth: 100, align: "left" },
  { id: 'actions', label: 'Actions', minWidth: 170, align: "center" }
];

export const courseManagementUnitColumn = [
  { id: "unit_ref", label: "Unint Ref", minWidth: 80, align: "left" },
  { id: "title", label: "Title", minWidth: 800, align: "left" },
  { id: "level", label: "Level", minWidth: 80, align: "left" },
  { id: "glh", label: "GLH", minWidth: 80, align: "left" },
  { id: "credit_value", label: "Credit Value", minWidth: 80, align: "left" },
  { id: "actions", label: "Action", minWidth: 80, align: "center" }
]