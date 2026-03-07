import { HiHome, HiOfficeBuilding, HiUsers, HiCreditCard, HiChartBar, HiCog, HiClipboardList, HiShieldCheck, HiExclamationCircle, HiCash } from 'react-icons/hi'
import { HiTrophy, HiCalendar, HiUserGroup, HiBolt, HiWallet, HiWrench, HiCube, HiDocumentText, HiUser, HiTicket } from 'react-icons/hi2'

const sidebarConfig = {
    superadmin: [
        { label: 'Dashboard', icon: <HiHome />, path: '/superadmin' },
        { label: 'Branches', icon: <HiOfficeBuilding />, path: '/superadmin/branches' },
        { label: 'Owners', icon: <HiUsers />, path: '/superadmin/owners' },
        { label: 'Subscriptions', icon: <HiCreditCard />, path: '/superadmin/subscriptions' },
        { label: 'Commission', icon: <HiCash />, path: '/superadmin/commission' },
        { label: 'Analytics', icon: <HiChartBar />, path: '/superadmin/analytics' },
        { label: 'Users', icon: <HiUserGroup />, path: '/superadmin/users' },
        { label: 'Payment Logs', icon: <HiClipboardList />, path: '/superadmin/payments' },
        { label: 'Disputes', icon: <HiExclamationCircle />, path: '/superadmin/disputes' },
        { label: 'Settings', icon: <HiCog />, path: '/superadmin/settings' },
    ],
    owner: [
        { label: 'Dashboard', icon: <HiHome />, path: '/owner' },
        { label: 'Sports', icon: <HiBolt />, path: '/owner/sports' },
        { label: 'Slots', icon: <HiCalendar />, path: '/owner/slots' },
        { label: 'Bookings', icon: <HiTicket />, path: '/owner/bookings' },
        { label: 'POS', icon: <HiCreditCard />, path: '/owner/pos' },
        { label: 'Tournaments', icon: <HiTrophy />, path: '/owner/tournaments' },
        { label: 'Teams', icon: <HiUserGroup />, path: '/owner/teams' },
        { label: 'Players', icon: <HiUser />, path: '/owner/players' },
        { label: 'Player Bids', icon: <HiCash />, path: '/owner/bids' },
        { label: 'Wallet', icon: <HiWallet />, path: '/owner/wallet' },
        { label: 'Reports', icon: <HiChartBar />, path: '/owner/reports' },
        { label: 'Inventory', icon: <HiCube />, path: '/owner/inventory' },
        { label: 'Maintenance', icon: <HiWrench />, path: '/owner/maintenance' },
        { label: 'Staff', icon: <HiUsers />, path: '/owner/staff' },
    ],
    staff: [
        { label: 'Dashboard', icon: <HiHome />, path: '/staff' },
        { label: 'Bookings', icon: <HiTicket />, path: '/staff/bookings' },
        { label: 'Tournaments', icon: <HiTrophy />, path: '/staff/tournaments' },
        { label: 'POS Billing', icon: <HiCreditCard />, path: '/staff/pos' },
        { label: 'Refunds', icon: <HiCash />, path: '/staff/refunds' },
        { label: 'Maintenance', icon: <HiWrench />, path: '/staff/maintenance' },
        { label: 'Equipment', icon: <HiCube />, path: '/staff/equipment' },
    ],
    customer: [
        { label: 'Dashboard', icon: <HiHome />, path: '/customer' },
        { label: 'My Bookings', icon: <HiTicket />, path: '/customer/bookings' },
        { label: 'My Teams', icon: <HiUserGroup />, path: '/customer/teams' },
        { label: 'My Matches', icon: <HiTrophy />, path: '/customer/matches' },
        { label: 'Tournaments', icon: <HiDocumentText />, path: '/customer/tournaments' },
        { label: 'Wallet', icon: <HiWallet />, path: '/customer/wallet' },
        { label: 'Profile', icon: <HiUser />, path: '/customer/profile' },
        { label: 'Hire Applications', icon: <HiShieldCheck />, path: '/customer/hire' },
    ],
}

export default sidebarConfig
