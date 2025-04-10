import React, { useState, createContext, useContext } from 'react';
type Language = 'en' | 'si';
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
const translations = {
  en: {
    // Header
    'app.title': 'Sri Lanka Telecom',
    'app.subtitle': 'Hambantota Customer Tracking System',
    // Search Screen
    'search.title': 'Enter Customer Details',
    'search.nic': 'NIC Number',
    'search.slt': 'SLT/Account Number',
    'search.button': 'Search Customer',
    'search.placeholder.nic': 'Enter NIC Number',
    'search.placeholder.slt': 'Enter SLT/Account Number',
    // Customer Details
    'customer.details': 'Customer Details',
    'customer.welcome': 'Welcome!',
    'customer.visit.reason': 'Visit Details',
    'customer.select.reason': 'Select Reason',
    'customer.submit': 'Submit',
    'customer.cancel': 'Cancel',
    'customer.success': 'Visit Successfully Recorded!',
    'customer.thanks': 'Thank you for using our service',
    // Visit Reasons
    'reason.new_connection': 'New Connection',
    'reason.technical_support': 'Technical Support',
    'reason.plan_upgrade': 'Plan Upgrade',
    'reason.bill_payment': 'Bill Payment',
    'reason.complaint': 'Service Complaint',
    'reason.package_change': 'Package Change',
    'reason.router_support': 'Router Support',
    'reason.account_inquiry': 'Account Inquiry',
    'reason.service_transfer': 'Service Transfer',
    'reason.termination': 'Service Termination',
    'reason.other': 'Other',
    // Status Messages
    'status.open': 'Currently Open',
    'status.closed': 'Currently Closed',
    'status.closing': 'Closing at',
    // Error Messages
    'error.validation.required': 'Please enter a valid number to search',
    'error.notFound': 'Number not found in our system.',
    'error.selectReason': 'Please select a reason for your visit',
    'error.specifyReason': 'Please specify the reason for your visit',
    'error.tryAgain': 'Try Again',
    'error.validation.firstChar': 'Cannot start with X or V',
    'error.validation.xAndV': 'Cannot use both X and V',
    'error.validation.multipleXV': 'Only one X or V is allowed',
    'error.validation.maxLength': 'Maximum length of 14 characters reached',
    // Popup Messages
    'popup.success.title': 'Success!',
    'popup.success.visit': 'Visit Successfully Recorded!',
    'popup.success.thanks': 'Thank you for using our service',
    'popup.closed.title': 'Branch Closed',
    'popup.closed.message': 'You can still record the visit, but please note that service might be limited.',
    'popup.closed.understand': 'I Understood',
    'popup.afterHours.title': 'After Hours Visit',
    'popup.afterHours.reason': 'Please provide a reason for your after-hours visit.',
    'popup.afterHours.continue': 'Continue Anyway',
    'popup.afterHours.cancel': 'Cancel',
    // Time Messages
    'time.closed.sunday': 'Closed - Sunday',
    'time.closed.saturday': 'Closed - Saturday Afternoon',
    'time.closing.saturday': 'Closing at 1:00 PM',
    'time.closed.afterHours': 'Closed - After Hours',
    'time.closing.normal': 'Closing at 5:00 PM',
    // Common Actions
    'action.search': 'Search',
    'action.searching': 'Searching...',
    'action.clear': 'Clear',
    'action.cancel': 'Cancel',
    'action.submit': 'Submit',
    'action.processing': 'Processing...',
    // Customer Details Fields
    'customer.field.name': 'Name',
    'customer.field.address': 'Address',
    'customer.field.contact': 'Contact Number',
    'customer.field.slt': 'SLT Number',
    'customer.field.account': 'Account Number',
    'customer.field.nic': 'NIC Number',
    // Form Fields
    'form.note': 'Add a short note (optional)...',
    'form.specify': 'Please specify the reason...',
    // Branch Status
    'branch.status.open': 'Currently Open',
    'branch.status.welcome': 'Welcome!',
    'branch.time.current': 'Current Time'
  },
  si: {
    // Header
    'app.title': 'ශ්‍රී ලංකා ටෙලිකොම්',
    'app.subtitle': 'හම්බන්තොට පාරිභෝගික පසුවිපරම් පද්ධතිය',
    // Search Screen
    'search.title': 'පාරිභෝගික තොරතුරු ඇතුලත් කරන්න',
    'search.nic': 'ජාතික හැඳුනුම්පත් අංකය',
    'search.slt': 'SLT/ගිණුම් අංකය',
    'search.button': 'පාරිභෝගිකයා සොයන්න',
    'search.placeholder.nic': 'ජාතික හැඳුනුම්පත් අංකය ඇතුලත් කරන්න',
    'search.placeholder.slt': 'SLT/ගිණුම් අංකය ඇතුලත් කරන්න',
    // Customer Details
    'customer.details': 'පාරිභෝගික විස්තර',
    'customer.welcome': 'සාදරයෙන් පිළිගනිමු!',
    'customer.visit.reason': 'පැමිණීමේ හේතුව',
    'customer.select.reason': 'හේතුව තෝරන්න',
    'customer.submit': 'යොමු කරන්න',
    'customer.cancel': 'අවලංගු කරන්න',
    'customer.success': 'පැමිණීම සාර්ථකව වාර්තා කරන ලදී!',
    'customer.thanks': 'අපගේ සේවාව භාවිතා කිරීම ගැන ස්තූතියි',
    // Visit Reasons
    'reason.new_connection': 'නව සම්බන්ධතාවය',
    'reason.technical_support': 'තාක්ෂණික සහාය',
    'reason.plan_upgrade': 'සැලසුම් වැඩිදියුණු කිරීම',
    'reason.bill_payment': 'බිල්පත් ගෙවීම',
    'reason.complaint': 'සේවා පැමිණිල්ල',
    'reason.package_change': 'පැකේජය වෙනස් කිරීම',
    'reason.router_support': 'රවුටර් සහාය',
    'reason.account_inquiry': 'ගිණුම් විමසීම',
    'reason.service_transfer': 'සේවා මාරු කිරීම',
    'reason.termination': 'සේවාව අවසන් කිරීම',
    'reason.other': 'වෙනත්',
    // Status Messages
    'status.open': 'දැනට විවෘතව ඇත',
    'status.closed': 'දැනට වසා ඇත',
    'status.closing': 'වසා දැමීම',
    // Error Messages
    'error.validation.required': 'කරුණාකර වලංගු අංකයක් ඇතුලත් කරන්න',
    'error.notFound': 'අංකය පද්ධතියේ සොයාගත නොහැක.',
    'error.selectReason': 'කරුණාකර ඔබගේ පැමිණීමේ හේතුව තෝරන්න',
    'error.specifyReason': 'කරුණාකර පැමිණීමේ හේතුව සඳහන් කරන්න',
    'error.tryAgain': 'නැවත උත්සාහ කරන්න',
    'error.validation.firstChar': 'X හෝ V වලින් ආරම්භ කළ නොහැක',
    'error.validation.xAndV': 'X සහ V එකට භාවිතා කළ නොහැක',
    'error.validation.multipleXV': 'එක් X හෝ V අකුරක් පමණක් භාවිතා කළ හැක',
    'error.validation.maxLength': 'උපරිම අකුරු 14ක් ඇතුළත් කළ හැක',
    // Popup Messages
    'popup.success.title': 'සාර්ථකයි!',
    'popup.success.visit': 'පැමිණීම සාර්ථකව වාර්තා කරන ලදී!',
    'popup.success.thanks': 'අපගේ සේවාව භාවිතා කිරීම ගැන ස්තූතියි',
    'popup.closed.title': 'ශාඛාව වසා ඇත',
    'popup.closed.message': 'ඔබට තවමත් පැමිණීම වාර්තා කළ හැක, නමුත් සේවාව සීමා විය හැක.',
    'popup.closed.understand': 'මම තේරුම් ගත්තා',
    'popup.afterHours.title': 'පසු වේලා පැමිණීම',
    'popup.afterHours.reason': 'කරුණාකර පසු වේලා පැමිණීමේ හේතුව සඳහන් කරන්න.',
    'popup.afterHours.continue': 'කෙසේ හෝ ඉදිරියට යන්න',
    'popup.afterHours.cancel': 'අවලංගු කරන්න',
    // Time Messages
    'time.closed.sunday': 'වසා ඇත - ඉරිදා',
    'time.closed.saturday': 'වසා ඇත - සෙනසුරාදා දහවල්',
    'time.closing.saturday': 'ප.ව. 1:00ට වසා දැමීම',
    'time.closed.afterHours': 'වසා ඇත - පසු වේලා',
    'time.closing.normal': 'සවස 5:00ට වසා දැමීම',
    // Common Actions
    'action.search': 'සොයන්න',
    'action.searching': 'සොයමින්...',
    'action.clear': 'මකන්න',
    'action.cancel': 'අවලංගු කරන්න',
    'action.submit': 'යොමු කරන්න',
    'action.processing': 'සකසමින්...',
    // Customer Details Fields
    'customer.field.name': 'නම',
    'customer.field.address': 'ලිපිනය',
    'customer.field.contact': 'දුරකථන අංකය',
    'customer.field.slt': 'SLT අංකය',
    'customer.field.account': 'ගිණුම් අංකය',
    'customer.field.nic': 'හැඳුනුම්පත් අංකය',
    // Form Fields
    'form.note': 'කෙටි සටහනක් එකතු කරන්න (විකල්ප)...',
    'form.specify': 'කරුණාකර හේතුව සඳහන් කරන්න...',
    // Branch Status
    'branch.status.open': 'දැනට විවෘතව ඇත',
    'branch.status.welcome': 'සාදරයෙන් පිළිගනිමු!',
    'branch.time.current': 'වත්මන් වේලාව'
  }
};
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key
});
export function LanguageProvider({
  children
}) {
  const [language, setLanguage] = useState<Language>('en');
  const t = (key: string) => {
    return translations[language][key] || key;
  };
  return <LanguageContext.Provider value={{
    language,
    setLanguage,
    t
  }}>
      {children}
    </LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);