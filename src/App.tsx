import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchScreen } from './components/SearchScreen';
import { CustomerDetails } from './pages/CustomerDetails';
import { AdminPage } from './pages/AdminPage';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { MSProduction } from './components/MSProduction';
import { LanguageProvider } from './components/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
export function App() {
  return <LanguageProvider>
      <BrowserRouter>
        <div className="flex flex-col w-full min-h-screen bg-gray-900 text-white relative overflow-hidden">
          <BackgroundAnimation />
          <LanguageSwitcher />
          <Routes>
            <Route path="/" element={<SearchScreen />} />
            <Route path="/customer/:id" element={<CustomerDetails />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <MSProduction />
        </div>
      </BrowserRouter>
    </LanguageProvider>;
}