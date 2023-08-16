import { createBrowserRouter } from "react-router-dom";
import AccountHead from "../Pages/Accounts/AccountHead/AccountHead";
import HeadClassification from "../Pages/Accounts/HeadClassification/HeadClassification";
import HeadGroup from "../Pages/Accounts/HeadGroup/HeadGroup";
import HeadIdentifier from "../Pages/Accounts/HeadIdentifier/HeadIdentifier";
import HeadType from "../Pages/Accounts/HeadType/HeadType";
import TransectionType from "../Pages/Accounts/TransectionType/TransectionType";
import CollectionLabel from "../Pages/CollectionLabel/CollectionLabel";
import ForgetPasswordPage from "../Pages/ForgetPasswordPage/ForgetPasswordPage";
import Homepage from "../Pages/Homepage/Homepage";
import InvestigationCategory from "../Pages/Investigation/InvestigationCategory/InvestigationCategory";
import InvestigationGroup from "../Pages/Investigation/InvestigationGroup/InvestigationGoup";
import AddNewInv from "../Pages/Investigation/InvestigationManagement/AddNewInv";
import EditInvestigation from "../Pages/Investigation/InvestigationManagement/EditInvestigation";
import InvestigationManagement from "../Pages/Investigation/InvestigationManagement/InvestigationManagement";
import TestManagement from "../Pages/Investigation/Test/TestManagement";
import MailBoxPage from "../Pages/MailboxPage/MailBoxPage";
import OtpVerification from "../Pages/OtpVerification/OtpVerification";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import ProjectsPage from "../Pages/ProjectsPage/ProjectsPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage/ResetPasswordPage";
import City from "../Pages/Settings/City/City";
import Country from "../Pages/Settings/Country/Country";
import DrugGroupList from "../Pages/Settings/DrugGroupList/DrugGroupList";
import DrugList from "../Pages/Settings/DrugList/DrugList";
import GenderPage from "../Pages/Settings/GenderPage/GenderPage";
import InstrumentCategoryList from "../Pages/Settings/InstrumentCategoryList/InstrumentCategoryList";
import InstrumentsPage from "../Pages/Settings/InstrumentsPage/InstrumentsPage";
import MaritialStatusSettings from "../Pages/Settings/MaritalStatus/MaritalStatusSettings";
import ProfessionSettingsPage from "../Pages/Settings/ProfessionSettingsPage/ProfessionSettingsPage";
import Room from "../Pages/Settings/RoomManagement/Room";
import SettingsPage from "../Pages/Settings/SettingsPage/SettingsPage";
import State from "../Pages/Settings/State/State";
import StaticContentGroupPage from "../Pages/Settings/StaticContentGroupPage/StaticContentGroupPage";
import StaticContentPage from "../Pages/Settings/StaticContentPage/StaticContentPage";
import UOMPage from "../Pages/Settings/UOMPage/UOMPage";
import IndexPage from "../Pages/Signin/IndexPage/IndexPage";
import Signin from "../Pages/Signin/Signin";
import Signup from "../Pages/Signup/Signup";
import ActivityListPage from "../Pages/UserManagement/ActivityListPage/ActivityListPage";
import ModuleListPage from "../Pages/UserManagement/ModuleListPage/ModuleListPageCopy";
import RoleListPage from "../Pages/UserManagement/RoleListPage/RoleListPage";
import RolePermissionPage from "../Pages/UserManagement/RolePermissionPage/RolePermissionPage";
import UserListPage from "../Pages/UserManagement/UserListPage/UserListPage";
import DashboardLayout from "../components/Layout/DashboardLayout";
import PrivateRouter from "./Private/PrivateRouter";
import TermsConditions from "../Pages/UserManagement/TermsConditions/TermsConditions";
import ServiceCategory from "../Pages/UserManagement/ServiceCategory/ServiceCategory";
import ServiceCategoryList from "../Pages/UserManagement/ServiceCategoryList/ServiceCategoryList";
import ContactMessages from "../Pages/Services/ContactMessages/ContactMessages";

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <Signin />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forget-password",
    element: <ForgetPasswordPage />,
  },
  {
    path: "reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "otp-verification",
    element: <OtpVerification />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "mail",
        element: <MailBoxPage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "investigation/investigation-groups",
        element: (
          <PrivateRouter props={21}>
            <InvestigationGroup />
          </PrivateRouter>
        ),
      },

      {
        path: "investigation/investigation-categories",
        element: (
          <PrivateRouter props={22}>
            <InvestigationCategory />
          </PrivateRouter>
        ),
      },
      {
        path: "investigation/investigation-management",
        element: (
          <PrivateRouter props={23}>
            <InvestigationManagement />
          </PrivateRouter>
        ),
      },
      {
        path: "investigation/test-management",
        element: (
          <PrivateRouter props={24}>
            <TestManagement />
          </PrivateRouter>
        ),
      },
      {
        path: "investigation/add-new",
        element: <AddNewInv />,
      },
      {
        path: "investigation/update",
        element: <EditInvestigation />,
      },
      {
        path: "transection-type",
        element: (
          <PrivateRouter props={26}>
            <TransectionType />
          </PrivateRouter>
        ),
      },
      {
        path: "head-type",
        element: (
          <PrivateRouter props={30}>
            <HeadType />
          </PrivateRouter>
        ),
      },
      {
        path: "head-identifier",
        element: (
          <PrivateRouter props={27}>
            <HeadIdentifier />
          </PrivateRouter>
        ),
      },
      {
        path: "head-classification",
        element: (
          <PrivateRouter props={28}>
            <HeadClassification />
          </PrivateRouter>
        ),
      },
      {
        path: "head-group",
        element: (
          <PrivateRouter props={29}>
            <HeadGroup />
          </PrivateRouter>
        ),
      },
      {
        path: "account-head",
        element: (
          <PrivateRouter props={31}>
            <AccountHead />
          </PrivateRouter>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRouter props={5}>
            <UserListPage />
          </PrivateRouter>
        ),
      },
      {
        path: "roles",
        element: (
          <PrivateRouter props={4}>
            <RoleListPage />
          </PrivateRouter>
        ),
      },
      {
        path: "user-management/role-permissions",
        element: (
          <PrivateRouter props={6}>
            <RolePermissionPage />
          </PrivateRouter>
        ),
      },
      {
        path: "user-management/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "user-management/service-category",
        element: <ServiceCategory />,
      },
      {
        path: "user-management/service-category-list",
        element: <ServiceCategoryList />,
      },
      { path: "services/contact-messages", element: <ContactMessages /> },
      {
        path: "module",
        // element: <ModuleListPage />,
        element: (
          <PrivateRouter props={3}>
            <ModuleListPage />
          </PrivateRouter>
        ),
      },
      {
        path: "activity",
        element: (
          <PrivateRouter props={2}>
            <ActivityListPage />
          </PrivateRouter>
        ),
      },
      {
        path: "static-content-groups",
        element: (
          <PrivateRouter props={7}>
            <StaticContentGroupPage />
          </PrivateRouter>
        ),
      },
      {
        path: "static-content",
        element: (
          <PrivateRouter props={8}>
            <StaticContentPage />
          </PrivateRouter>
        ),
      },
      {
        path: "settings/instruments-category",
        element: (
          <PrivateRouter props={9}>
            <InstrumentCategoryList />
          </PrivateRouter>
        ),
      },
      {
        path: "settings/instruments",
        element: (
          <PrivateRouter props={10}>
            <InstrumentsPage />
          </PrivateRouter>
        ),
      },
      {
        path: "setting/drug-groups",
        element: (
          <PrivateRouter props={11}>
            <DrugGroupList />
          </PrivateRouter>
        ),
      },
      {
        path: "setting/drugs",
        element: (
          <PrivateRouter props={12}>
            <DrugList />
          </PrivateRouter>
        ),
      },
      {
        path: "settings/room-management",
        element: (
          <PrivateRouter props={13}>
            <Room />
          </PrivateRouter>
        ),
      },
      {
        path: "settings/uom",
        element: (
          <PrivateRouter props={15}>
            <UOMPage />
          </PrivateRouter>
        ),
      },
      {
        path: "settings/gender",
        element: (
          <PrivateRouter props={14}>
            <GenderPage />
          </PrivateRouter>
        ),
      },
      {
        path: "settings/professions",
        element: (
          <PrivateRouter props={16}>
            <ProfessionSettingsPage />
          </PrivateRouter>
        ),
      },
      {
        path: "settings/merital-status",
        element: (
          <PrivateRouter props={17}>
            <MaritialStatusSettings />
          </PrivateRouter>
        ),
      },
      {
        path: "settings/country",
        element: (
          <PrivateRouter props={18}>
            <Country />
          </PrivateRouter>
        ),
      },
      {
        path: "settings/state",
        element: (
          <PrivateRouter props={19}>
            <State />
          </PrivateRouter>
        ),
      },
      {
        path: "settings/city",
        element: (
          <PrivateRouter props={20}>
            <City />
          </PrivateRouter>
        ),
      },
      {
        path: "settings/system-settings",
        element: (
          <PrivateRouter props={1}>
            <SettingsPage />
          </PrivateRouter>
        ),
      },
      {
        path: "collection-label",
        element: <CollectionLabel />,
      },
    ],
  },
]);

export default router;
