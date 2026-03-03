import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'

// Layouts
import WebsiteLayout from './layouts/WebsiteLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Auth
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'

// Public Website
import HomePage from './pages/website/HomePage'
import AllTurfsPage from './pages/website/AllTurfsPage'
import TurfDetailPage from './pages/website/TurfDetailPage'
import SlotBookingPage from './pages/website/SlotBookingPage'
import TournamentListPage from './pages/website/TournamentListPage'
import TournamentDetailPage from './pages/website/TournamentDetailPage'
import PlayerMarketplacePage from './pages/website/PlayerMarketplacePage'
import MembershipPage from './pages/website/MembershipPage'
import ContactPage from './pages/website/ContactPage'

// Super Admin
import SADashboard from './pages/superadmin/SADashboard'
import BranchManagement from './pages/superadmin/BranchManagement'
import OwnerManagement from './pages/superadmin/OwnerManagement'
import SubscriptionPlans from './pages/superadmin/SubscriptionPlans'
import CommissionSettings from './pages/superadmin/CommissionSettings'
import GlobalAnalytics from './pages/superadmin/GlobalAnalytics'
import UserManagement from './pages/superadmin/UserManagement'
import PaymentLogs from './pages/superadmin/PaymentLogs'
import Disputes from './pages/superadmin/Disputes'
import SystemSettings from './pages/superadmin/SystemSettings'

// Owner
import OwnerDashboard from './pages/owner/OwnerDashboard'
import SportsManagement from './pages/owner/SportsManagement'
import SlotManagement from './pages/owner/SlotManagement'
import BookingManagement from './pages/owner/BookingManagement'
import TournamentManagement from './pages/owner/TournamentManagement'
import TeamsPlayers from './pages/owner/TeamsPlayers'
import PlayerBids from './pages/owner/PlayerBids'
import WalletPage from './pages/owner/WalletPage'
import ReportsPage from './pages/owner/ReportsPage'
import InventoryPage from './pages/owner/InventoryPage'
import MaintenancePage from './pages/owner/MaintenancePage'
import StaffManagement from './pages/owner/StaffManagement'

// Staff
import StaffDashboard from './pages/staff/StaffDashboard'
import StaffBookings from './pages/staff/StaffBookings'
import StaffTournaments from './pages/staff/StaffTournaments'
import StaffPOS from './pages/staff/StaffPOS'
import StaffRefunds from './pages/staff/StaffRefunds'
import StaffMaintenance from './pages/staff/StaffMaintenance'

// Customer
import CustomerDashboard from './pages/customer/CustomerDashboard'
import CustomerBookings from './pages/customer/CustomerBookings'
import CustomerTeams from './pages/customer/CustomerTeams'
import CustomerTournaments from './pages/customer/CustomerTournaments'
import CustomerWallet from './pages/customer/CustomerWallet'
import CustomerProfile from './pages/customer/CustomerProfile'
import CustomerHire from './pages/customer/CustomerHire'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Public Website */}
          <Route path="/" element={<WebsiteLayout><HomePage /></WebsiteLayout>} />
          <Route path="/turfs" element={<WebsiteLayout><AllTurfsPage /></WebsiteLayout>} />
          <Route path="/turfs/:id" element={<WebsiteLayout><TurfDetailPage /></WebsiteLayout>} />
          <Route path="/booking/:id" element={<WebsiteLayout><SlotBookingPage /></WebsiteLayout>} />
          <Route path="/tournaments" element={<WebsiteLayout><TournamentListPage /></WebsiteLayout>} />
          <Route path="/tournaments/:id" element={<WebsiteLayout><TournamentDetailPage /></WebsiteLayout>} />
          <Route path="/marketplace" element={<WebsiteLayout><PlayerMarketplacePage /></WebsiteLayout>} />
          <Route path="/membership" element={<WebsiteLayout><MembershipPage /></WebsiteLayout>} />
          <Route path="/contact" element={<WebsiteLayout><ContactPage /></WebsiteLayout>} />

          {/* Super Admin Dashboard */}
          <Route path="/superadmin" element={<DashboardLayout role="superadmin" />}>
            <Route index element={<SADashboard />} />
            <Route path="branches" element={<BranchManagement />} />
            <Route path="owners" element={<OwnerManagement />} />
            <Route path="subscriptions" element={<SubscriptionPlans />} />
            <Route path="commission" element={<CommissionSettings />} />
            <Route path="analytics" element={<GlobalAnalytics />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="payments" element={<PaymentLogs />} />
            <Route path="disputes" element={<Disputes />} />
            <Route path="settings" element={<SystemSettings />} />
          </Route>

          {/* Owner Dashboard */}
          <Route path="/owner" element={<DashboardLayout role="owner" />}>
            <Route index element={<OwnerDashboard />} />
            <Route path="sports" element={<SportsManagement />} />
            <Route path="slots" element={<SlotManagement />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="tournaments" element={<TournamentManagement />} />
            <Route path="teams" element={<TeamsPlayers />} />
            <Route path="players" element={<TeamsPlayers />} />
            <Route path="bids" element={<PlayerBids />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="maintenance" element={<MaintenancePage />} />
            <Route path="staff" element={<StaffManagement />} />
          </Route>

          {/* Staff Dashboard */}
          <Route path="/staff" element={<DashboardLayout role="staff" />}>
            <Route index element={<StaffDashboard />} />
            <Route path="bookings" element={<StaffBookings />} />
            <Route path="tournaments" element={<StaffTournaments />} />
            <Route path="pos" element={<StaffPOS />} />
            <Route path="refunds" element={<StaffRefunds />} />
            <Route path="maintenance" element={<StaffMaintenance />} />
            <Route path="equipment" element={<StaffMaintenance />} />
          </Route>

          {/* Customer Dashboard */}
          <Route path="/customer" element={<DashboardLayout role="customer" />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="bookings" element={<CustomerBookings />} />
            <Route path="teams" element={<CustomerTeams />} />
            <Route path="matches" element={<CustomerTeams />} />
            <Route path="tournaments" element={<CustomerTournaments />} />
            <Route path="wallet" element={<CustomerWallet />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="hire" element={<CustomerHire />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}
