'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaSave, FaArrowLeft, FaUpload, FaLink } from 'react-icons/fa';
import { useSettings, SiteSettings } from '@/contexts/SettingsContext';

type TabType = 'theme' | 'navbar' | 'hero' | 'about' | 'contact';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { settings: contextSettings, updateSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<TabType>('theme');
  const [formData, setFormData] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [imageInputType, setImageInputType] = useState<'upload' | 'url'>('url');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (contextSettings) {
      setFormData(contextSettings);
    }
  }, [contextSettings]);

  const handleSave = async () => {
    if (!formData) return;

    setSaving(true);
    setMessage('');
    try {
      await updateSettings(formData);
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        updateFormField(field, data.url);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const updateFormField = (field: string, value: string) => {
    if (!formData) return;

    const fieldParts = field.split('.');
    const newFormData = { ...formData };
    
    if (fieldParts.length === 2) {
      const [section, key] = fieldParts;
      (newFormData as any)[section] = {
        ...(newFormData as any)[section],
        [key]: value,
      };
    }
    
    setFormData(newFormData);
  };

  if (status === 'loading' || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Site Settings</h1>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition disabled:opacity-50"
            >
              <FaSave className="mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          {message && (
            <div className={`mt-4 p-4 rounded-xl ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-slate-700 overflow-x-auto">
            {[
              { id: 'theme', label: 'Theme Colors' },
              { id: 'navbar', label: 'Navbar' },
              { id: 'hero', label: 'Hero Section' },
              { id: 'about', label: 'About Us' },
              { id: 'contact', label: 'Contact Info' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-6 py-4 font-semibold whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'theme' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Theme Colors</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={formData.theme.primaryColor}
                      onChange={(e) => updateFormField('theme.primaryColor', e.target.value)}
                      className="h-10 w-20 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.theme.primaryColor}
                      onChange={(e) => updateFormField('theme.primaryColor', e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                      placeholder="#2563eb"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={formData.theme.secondaryColor}
                      onChange={(e) => updateFormField('theme.secondaryColor', e.target.value)}
                      className="h-10 w-20 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.theme.secondaryColor}
                      onChange={(e) => updateFormField('theme.secondaryColor', e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                      placeholder="#1e40af"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'navbar' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Navbar Settings</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Title
                  </label>
                  <input
                    type="text"
                    value={formData.navbar.title}
                    onChange={(e) => updateFormField('navbar.title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      checked={formData.navbar.showLogo}
                      onChange={(e) => {
                        const newFormData = { ...formData };
                        newFormData.navbar.showLogo = e.target.checked;
                        setFormData(newFormData);
                      }}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show Logo</span>
                  </label>
                </div>
                {formData.navbar.showLogo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Logo Image
                    </label>
                    <div className="mb-4">
                      <div className="flex space-x-4 mb-2">
                        <button
                          onClick={() => setImageInputType('url')}
                          className={`flex items-center px-4 py-2 rounded-xl ${
                            imageInputType === 'url'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <FaLink className="mr-2" /> URL
                        </button>
                        <button
                          onClick={() => setImageInputType('upload')}
                          className={`flex items-center px-4 py-2 rounded-xl ${
                            imageInputType === 'upload'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <FaUpload className="mr-2" /> Upload
                        </button>
                      </div>
                      {imageInputType === 'url' ? (
                        <input
                          type="text"
                          value={formData.navbar.logo}
                          onChange={(e) => updateFormField('navbar.logo', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                          placeholder="https://example.com/logo.png"
                        />
                      ) : (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'navbar.logo')}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                            disabled={uploadingImage}
                          />
                          {uploadingImage && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Uploading...</p>}
                        </div>
                      )}
                    </div>
                    {formData.navbar.logo && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Preview:</p>
                        <img src={formData.navbar.logo} alt="Logo preview" className="h-16 object-contain" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Hero Section</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    value={formData.hero.title}
                    onChange={(e) => updateFormField('hero.title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hero Subtitle
                  </label>
                  <textarea
                    value={formData.hero.subtitle}
                    onChange={(e) => updateFormField('hero.subtitle', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      checked={formData.hero.useBackgroundImage}
                      onChange={(e) => {
                        const newFormData = { ...formData };
                        newFormData.hero.useBackgroundImage = e.target.checked;
                        setFormData(newFormData);
                      }}
                      className="rounded"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Use Background Image</span>
                  </label>
                </div>
                {formData.hero.useBackgroundImage && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Background Image
                    </label>
                    <div className="mb-4">
                      <div className="flex space-x-4 mb-2">
                        <button
                          onClick={() => setImageInputType('url')}
                          className={`flex items-center px-4 py-2 rounded-xl ${
                            imageInputType === 'url'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <FaLink className="mr-2" /> URL
                        </button>
                        <button
                          onClick={() => setImageInputType('upload')}
                          className={`flex items-center px-4 py-2 rounded-xl ${
                            imageInputType === 'upload'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <FaUpload className="mr-2" /> Upload
                        </button>
                      </div>
                      {imageInputType === 'url' ? (
                        <input
                          type="text"
                          value={formData.hero.backgroundImage}
                          onChange={(e) => updateFormField('hero.backgroundImage', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                          placeholder="https://example.com/hero-bg.jpg"
                        />
                      ) : (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'hero.backgroundImage')}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                            disabled={uploadingImage}
                          />
                          {uploadingImage && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Uploading...</p>}
                        </div>
                      )}
                    </div>
                    {formData.hero.backgroundImage && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Preview:</p>
                        <img src={formData.hero.backgroundImage} alt="Hero background preview" className="h-32 w-full object-cover rounded-xl" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">About Us Content</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.about.description}
                    onChange={(e) => updateFormField('about.description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Vision
                  </label>
                  <textarea
                    value={formData.about.vision}
                    onChange={(e) => updateFormField('about.vision', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mission
                  </label>
                  <textarea
                    value={formData.about.mission}
                    onChange={(e) => updateFormField('about.mission', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Contact Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={formData.contact.whatsappNumber}
                    onChange={(e) => updateFormField('contact.whatsappNumber', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                    placeholder="+1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => updateFormField('contact.email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                    placeholder="info@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={formData.contact.phone}
                    onChange={(e) => updateFormField('contact.phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                    placeholder="+1 (234) 567-890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address
                  </label>
                  <textarea
                    value={formData.contact.address}
                    onChange={(e) => updateFormField('contact.address', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-100"
                    rows={3}
                    placeholder="123 Business Street, City, Country"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
