import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, LineChart, BarChart2, Users, Calendar, HomeIcon, Settings, LogOut, Search, Mail, UserCircle, Bell, AlertCircle, CheckCircleIcon, InfoIcon, X } from 'lucide-react';
import { CustomerInfoPopup } from '../components/CustomerInfoPopup';
import { VisitsPieChart } from '../components/VisitsPieChart';
import { VisitsLineChart } from '../components/VisitsLineChart';
import { VisitsBarChart } from '../components/VisitsBarChart';
import { TodayVisitsPopup } from '../components/TodayVisitsPopup';
import { ProfileMenu } from '../components/ProfileMenu';
import { MessageInbox } from '../components/MessageInbox';
import { QuickFilters } from '../components/QuickFilters';
import { SettingsPanel } from '../components/SettingsPanel';
import { RecentVisitsSection } from '../components/RecentVisitsSection';
import { VisitSummaryPopup } from '../components/VisitSummaryPopup';
import { AdminHeader } from '../components/AdminHeader';
export function AdminPage() {
  const [authStep, setAuthStep] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showTodayVisits, setShowTodayVisits] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [quickFilter, setQuickFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [showPeriodSummary, setShowPeriodSummary] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const navigate = useNavigate();
  const handleCloseSettings = () => {
    setShowSettings(false);
  };
  const recentVisits = [{
    id: 'NIC123456',
    name: 'John Doe',
    time: '10:30 AM',
    reason: 'Bill Payment',
    hasComplaint: false,
    contact: '+94 77 123 4567',
    totalVisits: 15,
    lastVisit: '2024-01-15',
    recentActivity: [{
      date: '2024-01-15',
      action: 'Bill Payment',
      details: 'Paid monthly bill of Rs. 2,500'
    }, {
      date: '2023-12-20',
      action: 'Service Complaint',
      details: 'Reported internet connectivity issues'
    }, {
      date: '2023-12-05',
      action: 'Package Upgrade',
      details: 'Upgraded to Premium Package'
    }]
  }, {
    id: 'SLT789012',
    name: 'Jane Smith',
    time: '11:15 AM',
    reason: 'Complaint',
    hasComplaint: true,
    contact: '+94 77 234 5678',
    totalVisits: 8,
    lastVisit: '2024-01-16',
    recentActivity: [{
      date: '2024-01-16',
      action: 'Technical Support',
      details: 'Router configuration issues'
    }, {
      date: '2024-01-02',
      action: 'Bill Payment',
      details: 'Paid monthly bill of Rs. 3,500'
    }]
  }, {
    id: 'ACC345678',
    name: 'Mike Johnson',
    time: '12:45 PM',
    reason: 'New Connection',
    hasComplaint: false,
    contact: '+94 77 345 6789',
    totalVisits: 10,
    lastVisit: '2024-01-17',
    recentActivity: [{
      date: '2024-01-17',
      action: 'Service Complaint',
      details: 'Router connectivity issues'
    }, {
      date: '2024-01-10',
      action: 'Package Upgrade',
      details: 'Upgraded to Premium Package'
    }]
  }, {
    id: 'NIC901234',
    name: 'Sarah Williams',
    time: '2:00 PM',
    reason: 'Complaint',
    hasComplaint: true,
    contact: '+94 77 456 7890',
    totalVisits: 5,
    lastVisit: '2024-01-18',
    recentActivity: [{
      date: '2024-01-18',
      action: 'Technical Support',
      details: 'Router connectivity issues'
    }]
  }];
  const uniqueReasons = [...new Set(recentVisits.map(visit => visit.reason))];
  const visitReasonStats = [{
    reason: 'Bill Payment',
    count: 45,
    recentCustomers: [{
      name: 'John Doe',
      date: '2024-01-15',
      time: '10:30 AM'
    }, {
      name: 'Jane Smith',
      date: '2024-01-14',
      time: '2:15 PM'
    }]
  }, {
    reason: 'Technical Support',
    count: 32,
    recentCustomers: [{
      name: 'Mike Johnson',
      date: '2024-01-15',
      time: '11:45 AM'
    }]
  }];
  const weeklyVisitData = [{
    label: 'Mon',
    count: 24
  }, {
    label: 'Tue',
    count: 32
  }, {
    label: 'Wed',
    count: 18
  }, {
    label: 'Thu',
    count: 45
  }, {
    label: 'Fri',
    count: 35
  }, {
    label: 'Sat',
    count: 20
  }, {
    label: 'Sun',
    count: 15
  }];
  const monthlyVisitData = [{
    label: 'Jan',
    count: 120
  }, {
    label: 'Feb',
    count: 145
  }, {
    label: 'Mar',
    count: 98
  }, {
    label: 'Apr',
    count: 156
  }, {
    label: 'May',
    count: 132
  }, {
    label: 'Jun',
    count: 178
  }];
  const complaintMessages = [{
    id: 1,
    customerName: 'John Doe',
    type: 'Network Issue',
    message: 'Customer reported continuous network disconnections',
    time: '2 hours ago',
    status: 'pending'
  }, {
    id: 2,
    customerName: 'Sarah Williams',
    type: 'Service Quality',
    message: 'Poor internet speed during peak hours',
    time: '4 hours ago',
    status: 'resolved'
  }];
  const visitStats = {
    today: 24,
    week: 156,
    month: 678,
    year: 8942
  };
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);
  const handlePeriodClick = period => {
    setSelectedPeriod(period);
    setShowPeriodSummary(true);
  };
  const getPeriodVisits = period => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    return recentVisits.filter(visit => {
      const visitDate = new Date(visit.lastVisit);
      switch (period) {
        case 'today':
          return visitDate >= today;
        case 'week':
          return visitDate >= weekStart;
        case 'month':
          return visitDate >= monthStart;
        default:
          return true;
      }
    });
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} className="w-full min-h-screen p-6 relative">
      <div className="fixed inset-0 z-0 bg-cover bg-center" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3')"
    }}>
        <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm" />
      </div>
      <div className="relative z-10">
        <AdminHeader />
        <div className="flex justify-end items-center mb-8">
          <ProfileMenu navigate={navigate} showProfileMenu={showProfileMenu} setShowProfileMenu={setShowProfileMenu} setShowInbox={setShowInbox} unreadMessages={complaintMessages.filter(m => m.status === 'pending').length} />
        </div>
        <QuickFilters onFilterChange={setQuickFilter} currentFilter={quickFilter} stats={visitStats} onPeriodClick={handlePeriodClick} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <VisitsPieChart data={visitReasonStats} />
          <VisitsLineChart />
        </div>
        <RecentVisitsSection visits={recentVisits} onVisitClick={setSelectedCustomer} />
      </div>
      <CustomerInfoPopup isOpen={selectedCustomer !== null} onClose={() => setSelectedCustomer(null)} customer={selectedCustomer} />
      <TodayVisitsPopup isOpen={showTodayVisits} onClose={() => setShowTodayVisits(false)} data={{
      visits: recentVisits
    }} />
      <MessageInbox isOpen={showInbox} onClose={() => setShowInbox(false)} messages={complaintMessages} />
      <SettingsPanel isOpen={showSettings} onClose={handleCloseSettings} currentAdmin={{
      email: 'admin@slt.lk'
    }} />
      <VisitSummaryPopup isOpen={showPeriodSummary} onClose={() => setShowPeriodSummary(false)} data={getPeriodVisits(selectedPeriod)} period={selectedPeriod} />
    </motion.div>;
}