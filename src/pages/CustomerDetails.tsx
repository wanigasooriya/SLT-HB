import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, CheckCircleIcon, Clock, Calendar, AlertCircle, SunIcon, MoonIcon, XIcon, X, AlertCircleIcon } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
export function CustomerDetails() {
  const {
    t,
    language
  } = useLanguage();
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const [visitReason, setVisitReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [shortNote, setShortNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClosing, setIsClosing] = useState(false);
  const [showAfterHoursModal, setShowAfterHoursModal] = useState(false);
  const [urgencyReason, setUrgencyReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showClosedAlert, setShowClosedAlert] = useState(false);
  const [hasAcknowledgedClosed, setHasAcknowledgedClosed] = useState(false);
  const [validationError, setValidationError] = useState('');
  const customerData = {
    name: 'Milan Shahama',
    address: 'F-06 Main St, Hambantota',
    contactNumber: '0771234567',
    sltNumber: '0472222156',
    accountNumber: '00923453X',
    nicNumber: '991234567V'
  };
  const currentCustomer = customerData;
  const getBranchTiming = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour * 60 + minute;
    const openingTime = 8 * 60 + 30; // 8:30 AM
    const weekdayClosingTime = 17 * 60; // 5:00 PM
    const saturdayClosingTime = 12 * 60 + 30; // 12:30 PM
    const weekdayAlertTime = 16 * 60 + 30; // 4:30 PM
    const saturdayAlertTime = 12 * 60 + 1; // 12:01 PM

    if (day === 0) {
      return {
        isOpen: false,
        isClosingSoon: false,
        isClosed: true,
        statusText: t('time.closed.sunday'),
        nextOpenTime: 'Tomorrow at 8:30 AM',
        remainingTime: null
      };
    }
    if (day === 6) {
      const isOpen = currentTime >= openingTime && currentTime < saturdayClosingTime;
      const isClosingSoon = currentTime >= saturdayAlertTime && currentTime < saturdayClosingTime;
      const isClosed = currentTime >= saturdayClosingTime;
      let remainingTime = null;
      if (isOpen) {
        remainingTime = saturdayClosingTime - currentTime;
      }
      return {
        isOpen,
        isClosingSoon,
        isClosed,
        statusText: isClosed ? t('time.closed.saturday') : isClosingSoon ? t('time.closing.saturday') : t('branch.status.open'),
        nextOpenTime: isClosed ? 'Monday at 8:30 AM' : null,
        remainingTime
      };
    }
    const isOpen = currentTime >= openingTime && currentTime < weekdayClosingTime;
    const isClosingSoon = currentTime >= weekdayAlertTime && currentTime < weekdayClosingTime;
    const isClosed = currentTime >= weekdayClosingTime || currentTime < openingTime;
    let remainingTime = null;
    if (isOpen) {
      remainingTime = weekdayClosingTime - currentTime;
    }
    return {
      isOpen,
      isClosingSoon,
      isClosed,
      statusText: isClosed ? t('time.closed.afterHours') : isClosingSoon ? t('time.closing.normal') : t('branch.status.open'),
      nextOpenTime: isClosed ? 'Tomorrow at 8:30 AM' : null,
      remainingTime
    };
  };
  const formatRemainingTime = minutes => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  const branchStatus = getBranchTiming();
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const day = now.getDay();
      const hour = now.getHours();
      if (day === 0) {
        setIsClosing(true);
      } else if (day === 6) {
        setIsClosing(hour >= 13);
      } else {
        setIsClosing(hour >= 17);
      }
      if (isClosing && !hasAcknowledgedClosed && !showClosedAlert) {
        setShowClosedAlert(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isClosing, hasAcknowledgedClosed, showClosedAlert]);
  useEffect(() => {
    let timer;
    if (validationError) {
      timer = setTimeout(() => {
        setValidationError('');
      }, 8000);
    }
    return () => clearTimeout(timer);
  }, [validationError]);
  const handleClickOutside = e => {
    if (e.target === e.currentTarget) {
      handleCloseAlert();
    }
  };
  const handleCloseAlert = () => {
    setShowClosedAlert(false);
    setHasAcknowledgedClosed(true);
  };
  const handleCloseValidationError = () => {
    setValidationError('');
  };
  const formatDate = date => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  const formatTime = date => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };
  const getClosingMessage = () => {
    const day = currentTime.getDay();
    if (day === 0) return t('time.closed.sunday');
    if (day === 6) return currentTime.getHours() >= 13 ? t('time.closed.saturday') : t('time.closing.saturday');
    return currentTime.getHours() >= 17 ? t('time.closed.afterHours') : t('time.closing.normal');
  };
  const visitReasons = [{
    value: '',
    label: 'Select Reason'
  }, {
    value: 'new_connection',
    label: 'New Connection'
  }, {
    value: 'technical_support',
    label: 'Technical Support'
  }, {
    value: 'plan_upgrade',
    label: 'Plan Upgrade'
  }, {
    value: 'bill_payment',
    label: 'Bill Payment'
  }, {
    value: 'complaint',
    label: 'Complaint'
  }, {
    value: 'package_change',
    label: 'Package Change'
  }, {
    value: 'router_support',
    label: 'Router Support'
  }, {
    value: 'account_inquiry',
    label: 'Account Inquiry'
  }, {
    value: 'service_transfer',
    label: 'Service Transfer'
  }, {
    value: 'termination',
    label: 'Termination'
  }, {
    value: 'other',
    label: 'Other'
  }];
  const recentVisits = [{
    date: '2024-01-15',
    reason: 'Bill Payment',
    details: 'Paid monthly bill of Rs. 2,500'
  }, {
    date: '2023-12-20',
    reason: 'Service Complaint',
    details: 'Reported internet connectivity issues'
  }, {
    date: '2023-12-05',
    reason: 'Package Upgrade',
    details: 'Upgraded to Premium Package'
  }];
  const handleSubmit = () => {
    if (!visitReason) {
      setValidationError(t('error.selectReason'));
      return;
    }
    if (visitReason === 'other' && !otherReason.trim()) {
      setValidationError(t('error.specifyReason'));
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/');
    }, 5000);
  };
  const handleAfterHoursSubmit = () => {
    if (!urgencyReason) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowAfterHoursModal(false);
    }, 1500);
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} className="w-full min-h-screen p-6 relative">
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
            <h2 className="text-2xl font-bold text-white">
              {t('customer.details')}
            </h2>
            <div className="flex items-center justify-between mt-6 gap-4">
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} className="bg-gray-900/50 px-4 py-2 rounded-xl border border-blue-500/20">
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-gray-400" />
                  <span className="text-gray-400">
                    {formatDate(currentTime)}
                  </span>
                </div>
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} className={`flex-1 relative group overflow-hidden rounded-xl border backdrop-blur-sm
                  ${branchStatus.isClosed ? 'bg-red-500/10 border-red-500/30 text-red-400' : branchStatus.isClosingSoon ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 'bg-green-500/10 border-green-500/30 text-green-400'}`}>
                <div className="relative z-10 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {branchStatus.isClosed ? <MoonIcon size={20} className="text-current" /> : branchStatus.isClosingSoon ? <motion.div animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.5, 1]
                    }} transition={{
                      duration: 2,
                      repeat: Infinity
                    }}>
                          <Clock size={20} className="text-current" />
                        </motion.div> : <SunIcon size={20} className="text-current" />}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {branchStatus.statusText}
                        </span>
                        {branchStatus.isOpen && branchStatus.remainingTime && <motion.span initial={{
                        opacity: 0
                      }} animate={{
                        opacity: 1
                      }} className="text-xs opacity-80">
                            {`Closing in ${formatRemainingTime(branchStatus.remainingTime)}`}
                          </motion.span>}
                        {branchStatus.isClosed && branchStatus.nextOpenTime && <motion.span initial={{
                        opacity: 0
                      }} animate={{
                        opacity: 1
                      }} className="text-xs opacity-80">
                            {`Opens ${branchStatus.nextOpenTime}`}
                          </motion.span>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={18} className="text-current" />
                      <motion.span key={currentTime.getTime()} initial={{
                      y: -10,
                      opacity: 0
                    }} animate={{
                      y: 0,
                      opacity: 1
                    }} className="font-mono text-lg">
                        {formatTime(currentTime)}
                      </motion.span>
                    </div>
                  </div>
                </div>
                <motion.div className={`absolute inset-0 ${branchStatus.isClosed ? 'bg-red-500' : branchStatus.isClosingSoon ? 'bg-yellow-500' : 'bg-green-500'}`} initial={{
                opacity: 0
              }} animate={{
                opacity: [0.1, 0.15, 0.1],
                scale: [1, 1.02, 1]
              }} transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }} style={{
                zIndex: -1
              }} />
                <motion.div className={`absolute inset-0 ${branchStatus.isClosed ? 'bg-red-500' : branchStatus.isClosingSoon ? 'bg-yellow-500' : 'bg-green-500'}`} initial={{
                opacity: 0
              }} animate={{
                opacity: [0.2, 0.4, 0.2]
              }} transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }} style={{
                zIndex: -2,
                filter: 'blur(8px)',
                transform: 'translate(0, 0)'
              }} />
              </motion.div>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{
            key: 'name',
            label: 'නම',
            engLabel: 'Name'
          }, {
            key: 'address',
            label: 'ලිපිනය',
            engLabel: 'Address'
          }, {
            key: 'contactNumber',
            label: 'දුරකථන අංකය',
            engLabel: 'Contact Number'
          }, {
            key: 'sltNumber',
            label: 'SLT අංකය',
            engLabel: 'SLT Number'
          }, {
            key: 'accountNumber',
            label: 'ගිණුම් අංකය',
            engLabel: 'Account Number'
          }, {
            key: 'nicNumber',
            label: 'හැඳුනුම්පත් අංකය',
            engLabel: 'NIC Number'
          }].map(({
            key,
            label,
            engLabel
          }) => <div key={key} className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <span className="text-gray-400 text-sm">
                  {language === 'si' ? label : engLabel}
                </span>
                <p className="font-medium text-lg mt-1">{customerData[key]}</p>
              </div>)}
          </div>
          <div className="p-6 border-t border-gray-700">
            <h3 className="text-xl font-semibold mb-4">
              {t('customer.visit.reason')}
            </h3>
            <select value={visitReason} onChange={e => setVisitReason(e.target.value)} className="w-full p-3 bg-gray-900/50 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">
              {visitReasons.map(reason => <option key={reason.value} value={reason.value}>
                  {reason.label}
                </option>)}
            </select>
            {visitReason === 'other' && <motion.textarea initial={{
            height: 0
          }} animate={{
            height: 'auto'
          }} className="w-full mb-4 p-3 bg-gray-900/50 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('form.note')} value={otherReason} onChange={e => setOtherReason(e.target.value)} />}
            <textarea className="w-full p-3 bg-gray-900/50 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6" placeholder={t('form.note')} value={shortNote} onChange={e => setShortNote(e.target.value)} rows={3} />
            <div className="flex space-x-4">
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => navigate('/')} className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium">
                {t('action.cancel')}
              </motion.button>
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={handleSubmit} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium">
                {t('action.submit')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {showSuccess && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => {
        setShowSuccess(false);
        navigate('/');
      }} className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.9,
          opacity: 0
        }} className="bg-gray-800/90 rounded-2xl p-8 border border-green-500/20 overflow-hidden relative">
              <motion.div className="w-20 h-20 mx-auto mb-6 relative" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15
          }}>
                <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircleIcon size={40} className="text-white" />
                </div>
              </motion.div>
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="text-center space-y-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {t('popup.success.visit')}
                </h2>
                <p className="text-gray-400">{t('popup.success.thanks')}</p>
              </motion.div>
              <motion.div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-500`} initial={{
            scaleX: 1
          }} animate={{
            scaleX: 0
          }} transition={{
            duration: 5,
            ease: 'linear'
          }} style={{
            transformOrigin: 'left'
          }} />
              <motion.div className={`absolute inset-0 -z-10`} animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.05, 1]
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl" />
              </motion.div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {showClosedAlert && isClosing && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleClickOutside}>
            <motion.div initial={{
          scale: 0.95,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.95,
          opacity: 0
        }} className="bg-gray-800 rounded-2xl w-full max-w-md border border-red-500/20 overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="bg-gradient-to-r from-red-600 to-red-800 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="text-red-200" size={24} />
                    <h3 className="text-xl font-bold">
                      {t('popup.closed.title')}
                    </h3>
                  </div>
                  <motion.button whileHover={{
                scale: 1.1,
                rotate: 90
              }} whileTap={{
                scale: 0.9
              }} onClick={handleCloseAlert} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <X size={20} />
                  </motion.button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-1">
                    <p className="text-red-400 mb-2">{getClosingMessage()}</p>
                    <p className="text-gray-400 text-sm">
                      {t('popup.closed.message')}
                    </p>
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <motion.button whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={handleCloseAlert} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium">
                    {t('popup.closed.understand')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {showAfterHoursModal && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleClickOutside}>
            <motion.div initial={{
          scale: 0.95,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.95,
          opacity: 0
        }} className="bg-gray-800 rounded-2xl w-full max-w-lg border border-red-500/20 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-800 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="text-red-200" size={24} />
                    <h3 className="text-xl font-bold">
                      {t('popup.afterHours.title')}
                    </h3>
                  </div>
                  <button onClick={() => setShowAfterHoursModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <XIcon size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400">
                    {getClosingMessage()}. {t('popup.afterHours.reason')}
                  </p>
                </div>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm text-gray-400">
                      Urgency Reason
                    </span>
                    <textarea value={urgencyReason} onChange={e => setUrgencyReason(e.target.value)} className="mt-1 w-full p-3 bg-gray-900/50 rounded-xl border border-gray-700 
                               focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Please explain why you need to visit during after hours..." rows={4} />
                  </label>
                  <div className="flex space-x-3">
                    <motion.button whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} onClick={() => setShowAfterHoursModal(false)} className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium">
                      {t('popup.afterHours.cancel')}
                    </motion.button>
                    <motion.button whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} onClick={handleAfterHoursSubmit} disabled={!urgencyReason || isSubmitting} className={`flex-1 py-3 rounded-xl font-medium
                        ${isSubmitting ? 'bg-red-700 cursor-wait' : 'bg-red-600 hover:bg-red-500'}`}>
                      {isSubmitting ? t('action.processing') : t('popup.afterHours.continue')}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {validationError && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleCloseValidationError}>
            <motion.div initial={{
          scale: 0.9,
          opacity: 0,
          y: 20
        }} animate={{
          scale: 1,
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25
          }
        }} exit={{
          scale: 0.9,
          opacity: 0,
          y: -20,
          transition: {
            duration: 0.2
          }
        }} onClick={e => e.stopPropagation()} className="bg-gray-800/90 rounded-2xl max-w-md w-full overflow-hidden relative">
              <div className="p-6 relative">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <motion.div initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }} className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <AlertCircleIcon size={24} className="text-white" />
                    </motion.div>
                    <motion.div animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }} transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }} className="absolute inset-0 bg-red-500 rounded-full filter blur-md opacity-50" />
                  </div>
                  <div className="flex-1">
                    <motion.h3 initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.2
                }} className="text-lg font-semibold text-red-400">
                      {t('error.validation')}
                    </motion.h3>
                    <motion.p initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.3
                }} className="mt-1 text-gray-300">
                      {validationError}
                    </motion.p>
                  </div>
                  <motion.button whileHover={{
                scale: 1.1,
                rotate: 90
              }} whileTap={{
                scale: 0.9
              }} onClick={handleCloseValidationError} className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <X size={20} />
                  </motion.button>
                </div>
                <motion.div initial={{
              scaleX: 1
            }} animate={{
              scaleX: 0
            }} transition={{
              duration: 8,
              ease: 'linear'
            }} className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 origin-left" />
              </div>
              <motion.div className="absolute inset-0 -z-10" animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.05, 1]
          }} transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-2xl blur-xl" />
              </motion.div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
}