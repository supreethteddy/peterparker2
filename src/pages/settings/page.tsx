import { useState } from 'react';
import Header from '../../components/feature/Header';
import Card from '../../components/base/Card';
import BottomNav from '../../components/feature/BottomNav';
import { HiBell, HiGlobe, HiMoon, HiShieldCheck, HiLockClosed, HiQuestionMarkCircle, HiDocumentText, HiInformationCircle, HiChevronRight } from 'react-icons/hi';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    locationServices: true,
    biometricAuth: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const menuSections = [
    {
      title: 'Notifications',
      items: [
        {
          icon: HiBell,
          label: 'Push Notifications',
          value: settings.pushNotifications,
          onToggle: () => toggleSetting('pushNotifications'),
        },
        {
          icon: HiBell,
          label: 'Email Notifications',
          value: settings.emailNotifications,
          onToggle: () => toggleSetting('emailNotifications'),
        },
        {
          icon: HiBell,
          label: 'SMS Notifications',
          value: settings.smsNotifications,
          onToggle: () => toggleSetting('smsNotifications'),
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: HiShieldCheck,
          label: 'Privacy Settings',
          action: () => {},
        },
        {
          icon: HiLockClosed,
          label: 'Biometric Authentication',
          value: settings.biometricAuth,
          onToggle: () => toggleSetting('biometricAuth'),
        },
        {
          icon: HiLockClosed,
          label: 'Change Password',
          action: () => {},
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: HiGlobe,
          label: 'Language',
          value: 'English',
          action: () => {},
        },
        {
          icon: HiMoon,
          label: 'Dark Mode',
          value: settings.darkMode,
          onToggle: () => toggleSetting('darkMode'),
        },
        {
          icon: HiBell,
          label: 'Location Services',
          value: settings.locationServices,
          onToggle: () => toggleSetting('locationServices'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HiQuestionMarkCircle,
          label: 'Help Center',
          action: () => {},
        },
        {
          icon: HiDocumentText,
          label: 'Terms & Conditions',
          action: () => {},
        },
        {
          icon: HiShieldCheck,
          label: 'Privacy Policy',
          action: () => {},
        },
        {
          icon: HiInformationCircle,
          label: 'About',
          action: () => {},
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 safe-top safe-bottom">
      <Header title="Settings" />
      
      <div className="pt-20 pb-24 px-6 max-w-md mx-auto">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-body font-semibold text-neutral-600 mb-3 px-2">
              {section.title}
            </h3>
            <Card className="divide-y divide-neutral-100">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <div
                    key={itemIndex}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50 transition-colors"
                    onClick={item.action || item.onToggle}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-primary-accent/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-body font-medium text-primary-dark">{item.label}</p>
                        {typeof item.value === 'string' && (
                          <p className="text-caption text-neutral-500 mt-0.5">{item.value}</p>
                        )}
                      </div>
                    </div>
                    {typeof item.value === 'boolean' ? (
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={item.value}
                          onChange={item.onToggle}
                          className="sr-only"
                        />
                        <div
                          className={`w-14 h-7 rounded-full transition-colors ${
                            item.value ? 'bg-primary-accent' : 'bg-neutral-300'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${
                              item.value ? 'translate-x-7' : 'translate-x-1'
                            } mt-0.5`}
                          />
                        </div>
                      </div>
                    ) : (
                      <HiChevronRight className="w-5 h-5 text-neutral-400" />
                    )}
                  </div>
                );
              })}
            </Card>
          </div>
        ))}

        {/* App Version */}
        <div className="text-center mt-8">
          <p className="text-caption text-neutral-500">quickParker v1.0.0</p>
          <p className="text-caption text-neutral-400 mt-1">© 2024 quickParker. All rights reserved.</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
