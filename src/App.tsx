import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { SettingsPage } from '@/pages/SettingsPage';

// Placeholder Home Page
const HomePage = () => (
  <div className="space-y-4">
    <h1 className="text-3xl font-bold">Welcome back!</h1>
    <p className="text-muted-foreground text-lg">
      This is an example of an Electron app with a reused settings page.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      <div className="bg-white/70 dark:bg-black/70 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl shadow-xl p-6">
        <h3 className="text-lg font-semibold mb-2">Desktop View</h3>
        <p className="text-sm text-muted-foreground">
          The app uses a classic sidebar navigation for desktop applications.
        </p>
      </div>
      <div className="bg-white/70 dark:bg-black/70 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl shadow-xl p-6">
        <h3 className="text-lg font-semibold mb-2">Menubar View</h3>
        <p className="text-sm text-muted-foreground">
          The layout is responsive and can be used in a smaller menubar/tray window.
        </p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
