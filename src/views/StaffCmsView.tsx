/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Inbox,
  Package,
  Bell,
  MapPin,
  History,
  Download,
  CheckCircle,
  Clock,
  Eye,
  Edit2,
  KeyRound,
  Filter
} from 'lucide-react';
import { CustomerInquiry, Product, PublicNotice, RetailOutlet, AuditLog, StaffUser } from '../types';
import { staffLoginSchema } from '../lib/validation';
import { addAuditLog } from '../lib/storage';

interface StaffCmsViewProps {
  onClose: () => void;
  inquiries: CustomerInquiry[];
  onUpdateInquiryStatus: (inquiryId: string, newStatus: CustomerInquiry['status'], internalNotes?: string) => void;
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  notices: PublicNotice[];
  onAddNotice: (notice: PublicNotice) => void;
  outlets: RetailOutlet[];
  auditLogs: AuditLog[];
}

export const StaffCmsView: React.FC<StaffCmsViewProps> = ({
  onClose,
  inquiries,
  onUpdateInquiryStatus,
  products,
  onUpdateProduct,
  notices,
  onAddNotice,
  outlets,
  auditLogs
}) => {
  // Staff Auth State
  const [currentUser, setCurrentUser] = useState<StaffUser | null>({
    id: 'usr-001',
    username: 'director.kacl',
    fullName: 'Dr. Mensah Bonsu (Director of Operations)',
    role: 'super_admin',
    email: 'm.bonsu@kumasiabattoir.com',
    lastLogin: '2026-10-29T06:15:00Z'
  });

  const [activeTab, setActiveTab] = useState<'inquiries' | 'products' | 'notices' | 'outlets' | 'audit'>('inquiries');
  const [inquiryFilter, setInquiryFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(null);
  const [statusUpdateVal, setStatusUpdateVal] = useState<CustomerInquiry['status']>('reviewed');
  const [internalNoteVal, setInternalNoteVal] = useState<string>('');

  // New Notice Modal / Form State
  const [showNewNoticeModal, setShowNewNoticeModal] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<PublicNotice['category']>('Operational');
  const [newNoticeSummary, setNewNoticeSummary] = useState('');
  const [newNoticeFullText, setNewNoticeFullText] = useState('');
  const [newNoticeIsImportant, setNewNoticeIsImportant] = useState(false);

  // Login Form State (when logged out)
  const [loginUsername, setLoginUsername] = useState('director.kacl');
  const [loginPassword, setLoginPassword] = useState('Abattoir2026!');
  const [loginMfa, setLoginMfa] = useState('482910');
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const validation = staffLoginSchema.safeParse({
      username: loginUsername,
      password: loginPassword,
      mfaCode: loginMfa
    });

    if (!validation.success) {
      setLoginError(validation.error.issues[0]?.message || 'Invalid credentials');
      return;
    }

    const newUser: StaffUser = {
      id: 'usr-001',
      username: loginUsername,
      fullName: 'Dr. Mensah Bonsu (Director of Operations)',
      role: 'super_admin',
      email: 'm.bonsu@kumasiabattoir.com',
      lastLogin: new Date().toISOString()
    };

    setCurrentUser(newUser);
    addAuditLog('STAFF_LOGIN', 'auth', `Staff user ${loginUsername} authenticated with MFA`, loginUsername);
  };

  const handleLogout = () => {
    if (currentUser) {
      addAuditLog('STAFF_LOGOUT', 'auth', `Staff user ${currentUser.username} ended session`, currentUser.username);
    }
    setCurrentUser(null);
  };

  const handleRoleChange = (role: StaffUser['role']) => {
    if (!currentUser) return;
    const roleNames: Record<StaffUser['role'], string> = {
      super_admin: 'Dr. Mensah Bonsu (Super Administrator)',
      sales_manager: 'Kofi Owusu (Commercial Sales Manager)',
      quality_inspector: 'Dr. Yeboah (Senior Veterinary Inspector)',
      content_editor: 'Ama Serwaa (Public Relations Officer)'
    };
    setCurrentUser({
      ...currentUser,
      role,
      fullName: roleNames[role]
    });
    addAuditLog('ROLE_SWITCH', 'auth', `Switched active role view to ${role}`, currentUser.username);
  };

  const handleSaveInquiryStatus = () => {
    if (!selectedInquiry) return;
    onUpdateInquiryStatus(selectedInquiry.id, statusUpdateVal, internalNoteVal);
    addAuditLog(
      'UPDATE_INQUIRY',
      'inquiries',
      `Updated RFQ ${selectedInquiry.referenceNumber} status to ${statusUpdateVal.toUpperCase()}`,
      currentUser?.username || 'staff'
    );
    setSelectedInquiry({
      ...selectedInquiry,
      status: statusUpdateVal,
      internalNotes: internalNoteVal
    });
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeSummary || !newNoticeFullText) return;

    const notice: PublicNotice = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle.trim(),
      date: new Date().toISOString().split('T')[0],
      category: newNoticeCategory,
      summary: newNoticeSummary.trim(),
      fullText: newNoticeFullText.trim(),
      isImportant: newNoticeIsImportant
    };

    onAddNotice(notice);
    addAuditLog('CREATE_NOTICE', 'notices', `Published public notice: ${notice.title}`, currentUser?.username || 'staff');
    setShowNewNoticeModal(false);
    setNewNoticeTitle('');
    setNewNoticeSummary('');
    setNewNoticeFullText('');
  };

  const handleExportInquiriesCsv = () => {
    const headers = ['Reference', 'Date', 'Type', 'Customer Name', 'Organization', 'Email', 'Phone', 'Location', 'Status', 'Notes'];
    const rows = inquiries.map((inq) => [
      inq.referenceNumber,
      inq.createdAt,
      inq.inquiryType,
      `"${inq.fullName.replace(/"/g, '""')}"`,
      `"${(inq.organizationName || '').replace(/"/g, '""')}"`,
      inq.email,
      inq.phoneNumber,
      `"${(inq.deliveryLocation || '').replace(/"/g, '""')}"`,
      inq.status,
      `"${inq.notes.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `KACL_Inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addAuditLog('EXPORT_CSV', 'inquiries', `Exported ${inquiries.length} inquiries to CSV file`, currentUser?.username || 'staff');
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryFilter === 'all') return true;
    return inq.status === inquiryFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex flex-col justify-start">
      <div className="min-h-screen bg-slate-100 flex flex-col">
        {/* Top CMS Bar */}
        <div className="bg-[#0F172A] text-white px-4 sm:px-8 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-sky-400" />
            <div>
              <span className="font-bold text-sm tracking-tight">KACL Protected Staff Administration</span>
              <span className="text-slate-400 text-xs hidden sm:inline ml-2">
                Kaase Facility Internal Operations Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {currentUser && (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="font-semibold text-slate-200">{currentUser.fullName}</div>
                  <div className="text-[11px] text-slate-400 font-mono">Role: {currentUser.role}</div>
                </div>

                {/* Role Switcher */}
                <select
                  value={currentUser.role}
                  onChange={(e) => handleRoleChange(e.target.value as StaffUser['role'])}
                  className="bg-slate-800 text-slate-200 border border-slate-700 px-2 py-1 rounded text-xs focus:outline-none"
                  title="Switch Staff Role View"
                >
                  <option value="super_admin">Super Administrator</option>
                  <option value="sales_manager">Commercial Sales Manager</option>
                  <option value="quality_inspector">Veterinary Inspector</option>
                  <option value="content_editor">Content Editor</option>
                </select>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 cursor-pointer"
            >
              Exit to Website
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
          {!currentUser ? (
            /* Staff Login Form */
            <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
              <div className="text-center space-y-2">
                <div className="w-10 h-10 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-[#0756a3]">
                  <Lock className="w-5 h-5" />
                </div>
                <h1 className="text-lg font-bold text-[#0F172A]">KACL Staff Access Authentication</h1>
                <p className="text-xs text-slate-500">
                  Protected portal for authorised operations and sales management staff.
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="cms-username" className="text-xs font-semibold text-slate-700 block">Staff Username</label>
                  <input
                    id="cms-username"
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0756a3]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="cms-password" className="text-xs font-semibold text-slate-700 block">Password</label>
                  <input
                    id="cms-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0756a3]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label htmlFor="cms-mfa" className="text-xs font-semibold text-slate-700 block">Multi-Factor Code (MFA)</label>
                    <span className="text-[10px] text-slate-400 font-mono">6 digits</span>
                  </div>
                  <input
                    id="cms-mfa"
                    type="text"
                    maxLength={6}
                    value={loginMfa}
                    onChange={(e) => setLoginMfa(e.target.value)}
                    placeholder="482910"
                    className="w-full px-3 py-2 text-xs font-mono tracking-widest border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0756a3]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0756a3] hover:bg-[#1e3c5a] text-white text-xs font-semibold rounded cursor-pointer transition-colors"
                >
                  Authenticate & Sign In
                </button>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-500 space-y-1">
                  <div className="font-semibold text-slate-700">Preloaded Demo Credentials:</div>
                  <div>Username: <span className="font-mono text-slate-800">director.kacl</span></div>
                  <div>Password: <span className="font-mono text-slate-800">Abattoir2026!</span></div>
                  <div>MFA Code: <span className="font-mono text-slate-800">482910</span></div>
                </div>
              </form>
            </div>
          ) : (
            /* Staff Dashboard Tabs */
            <div className="space-y-6">
              {/* CMS Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === 'inquiries'
                        ? 'bg-[#0756a3] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                    }`}
                  >
                    <Inbox className="w-3.5 h-3.5" />
                    <span>Customer Enquiries & RFQs</span>
                    <span className="ml-1 px-1.5 py-0.2 bg-white/20 rounded-full text-[10px] tabular-nums">
                      {inquiries.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('products')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === 'products'
                        ? 'bg-[#0756a3] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                    }`}
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Product Catalogue ({products.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('notices')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === 'notices'
                        ? 'bg-[#0756a3] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                    }`}
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Public Notices ({notices.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('outlets')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      activeTab === 'outlets'
                        ? 'bg-[#0756a3] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Retail Depots ({outlets.length})</span>
                  </button>

                  {currentUser.role === 'super_admin' && (
                    <button
                      onClick={() => setActiveTab('audit')}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        activeTab === 'audit'
                          ? 'bg-[#0756a3] text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                      }`}
                    >
                      <History className="w-3.5 h-3.5" />
                      <span>Security Audit Log ({auditLogs.length})</span>
                    </button>
                  )}
                </div>

                {activeTab === 'inquiries' && (
                  <button
                    onClick={handleExportInquiriesCsv}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>Export Inquiries CSV</span>
                  </button>
                )}
              </div>

              {/* Tab 1: Inquiries & RFQs Dashboard */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  {/* Filter Sub-bar */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 font-medium">Status Filter:</span>
                    {['all', 'new', 'reviewed', 'quoted', 'fulfilled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setInquiryFilter(status)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                          inquiryFilter === status
                            ? 'bg-slate-800 text-white font-semibold'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {status.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Inquiries Table */}
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                          <tr>
                            <th className="p-3">Reference</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Client / Organization</th>
                            <th className="p-3">Contact</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredInquiries.map((inq) => (
                            <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="p-3 font-mono font-bold text-[#0756a3]">
                                {inq.referenceNumber}
                              </td>
                              <td className="p-3 text-slate-500 font-mono">
                                {new Date(inq.createdAt).toLocaleDateString()}
                              </td>
                              <td className="p-3">
                                <div className="font-semibold text-slate-900">{inq.fullName}</div>
                                {inq.organizationName && (
                                  <div className="text-[11px] text-slate-500">{inq.organizationName}</div>
                                )}
                              </td>
                              <td className="p-3 font-mono text-[11px] text-slate-600">
                                <div>{inq.phoneNumber}</div>
                                <div className="text-slate-400">{inq.email}</div>
                              </td>
                              <td className="p-3 text-slate-700 capitalize">
                                {inq.inquiryType.replace('_', ' ')}
                              </td>
                              <td className="p-3">
                                <span
                                  className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                    inq.status === 'new'
                                      ? 'bg-slate-200 text-slate-800'
                                      : inq.status === 'reviewed'
                                      ? 'bg-blue-100 text-blue-900'
                                      : inq.status === 'quoted'
                                      ? 'bg-sky-100 text-sky-900'
                                      : 'bg-slate-100 text-slate-800'
                                  }`}
                                >
                                  {inq.status}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => {
                                    setSelectedInquiry(inq);
                                    setStatusUpdateVal(inq.status);
                                    setInternalNoteVal(inq.internalNotes || '');
                                  }}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-medium cursor-pointer"
                                >
                                  Review
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Review / Status Update Modal */}
                  {selectedInquiry && (
                    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
                      <div className="bg-white border border-slate-200 rounded-lg max-w-xl w-full p-6 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
                        <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                          <div>
                            <span className="font-mono text-xs font-bold text-[#0756a3]">
                              {selectedInquiry.referenceNumber}
                            </span>
                            <h3 className="text-base font-bold text-slate-900">
                              Enquiry Detail & Status Management
                            </h3>
                          </div>
                          <button
                            onClick={() => setSelectedInquiry(null)}
                            className="text-slate-400 hover:text-slate-700 cursor-pointer font-bold text-base"
                          >
                            ×
                          </button>
                        </div>

                        <div className="space-y-3 text-xs text-slate-700">
                          <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded">
                            <div>
                              <span className="text-slate-500 block">Customer:</span>
                              <strong className="text-slate-900">{selectedInquiry.fullName}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Organisation:</span>
                              <strong>{selectedInquiry.organizationName || 'N/A'}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Phone / Channel:</span>
                              <span className="font-mono">{selectedInquiry.phoneNumber}</span> ({selectedInquiry.preferredContact})
                            </div>
                            <div>
                              <span className="text-slate-500 block">Destination:</span>
                              <span>{selectedInquiry.deliveryLocation}</span>
                            </div>
                          </div>

                          <div className="p-3 bg-slate-50 rounded space-y-1">
                            <span className="text-slate-500 block font-semibold">Client Requirements / Notes:</span>
                            <p className="whitespace-pre-line leading-relaxed">{selectedInquiry.notes}</p>
                          </div>

                          {/* Status and Notes update form */}
                          <div className="space-y-2 pt-2 border-t border-slate-100">
                            <label className="font-bold text-slate-800 block">Update Workflow Status:</label>
                            <select
                              value={statusUpdateVal}
                              onChange={(e) => setStatusUpdateVal(e.target.value as CustomerInquiry['status'])}
                              className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0756a3]"
                            >
                              <option value="new">NEW (Unreviewed)</option>
                              <option value="reviewed">REVIEWED (Contact initiated)</option>
                              <option value="quoted">QUOTED (Proforma issued)</option>
                              <option value="fulfilled">FULFILLED (Order delivered)</option>
                              <option value="archived">ARCHIVED</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-slate-800 block">Staff Internal Follow-up Notes:</label>
                            <textarea
                              rows={3}
                              value={internalNoteVal}
                              onChange={(e) => setInternalNoteVal(e.target.value)}
                              placeholder="Record quote issued, driver assigned, or customer feedback..."
                              className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0756a3]"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                          <button
                            onClick={() => setSelectedInquiry(null)}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded cursor-pointer"
                          >
                            Close
                          </button>
                          <button
                            onClick={handleSaveInquiryStatus}
                            className="px-4 py-2 bg-[#0756a3] hover:bg-[#1e3c5a] text-white text-xs font-semibold rounded cursor-pointer"
                          >
                            Save Updates
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Products Catalogue Manager */}
              {activeTab === 'products' && (
                <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Wholesale Catalogue Administration</h3>
                      <p className="text-xs text-slate-500">Manage minimum wholesale order rules and stock statuses.</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                        <tr>
                          <th className="p-3">Code</th>
                          <th className="p-3">Product Name</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Storage</th>
                          <th className="p-3">Packaging</th>
                          <th className="p-3">Stock State</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {products.map((p) => (
                          <tr key={p.id}>
                            <td className="p-3 font-mono font-bold text-slate-700">{p.code}</td>
                            <td className="p-3 font-semibold text-slate-900">{p.name}</td>
                            <td className="p-3 text-slate-600">{p.categoryLabel}</td>
                            <td className="p-3 text-slate-600">{p.storageRequirement}</td>
                            <td className="p-3 text-slate-600">{p.packagingType}</td>
                            <td className="p-3">
                              <span className="text-sky-800 font-semibold bg-sky-50 px-2 py-0.5 rounded text-[10px]">
                                Active Available
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 3: Public Notices Manager */}
              {activeTab === 'notices' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Official Facility Notices & Advisories</h3>
                      <p className="text-xs text-slate-500">Publish operational updates for butchers, institutions, and consumers.</p>
                    </div>
                    <button
                      onClick={() => setShowNewNoticeModal(true)}
                      className="px-3 py-1.5 bg-[#0756a3] hover:bg-[#1e3c5a] text-white text-xs font-semibold rounded cursor-pointer"
                    >
                      Publish New Advisory
                    </button>
                  </div>

                  <div className="space-y-3">
                    {notices.map((n) => (
                      <div key={n.id} className="p-4 bg-white border border-slate-200 rounded-lg space-y-1.5 text-xs shadow-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-500">{n.category} · {n.date}</span>
                          {n.isImportant && (
                            <span className="text-red-800 font-bold text-[10px] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                              Priority Notice
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-slate-900">{n.title}</h4>
                        <p className="text-slate-600">{n.summary}</p>
                      </div>
                    ))}
                  </div>

                  {/* New Notice Modal */}
                  {showNewNoticeModal && (
                    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
                      <div className="bg-white border border-slate-200 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-xl">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                          Publish Official Public Notice
                        </h3>
                        <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
                          <div className="space-y-1">
                            <label className="font-semibold text-slate-700 block">Notice Title</label>
                            <input
                              type="text"
                              value={newNoticeTitle}
                              onChange={(e) => setNewNoticeTitle(e.target.value)}
                              placeholder="e.g. Easter Holiday Slaughtering Schedule"
                              className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none"
                              required
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-semibold text-slate-700 block">Category</label>
                            <select
                              value={newNoticeCategory}
                              onChange={(e) => setNewNoticeCategory(e.target.value as PublicNotice['category'])}
                              className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none"
                            >
                              <option value="Operational">Operational</option>
                              <option value="Holiday Schedule">Holiday Schedule</option>
                              <option value="Veterinary Notice">Veterinary Notice</option>
                              <option value="Public Announcement">Public Announcement</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="font-semibold text-slate-700 block">Executive Summary</label>
                            <input
                              type="text"
                              value={newNoticeSummary}
                              onChange={(e) => setNewNoticeSummary(e.target.value)}
                              placeholder="1-2 sentences for headline banner..."
                              className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none"
                              required
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-semibold text-slate-700 block">Full Announcement Text</label>
                            <textarea
                              rows={4}
                              value={newNoticeFullText}
                              onChange={(e) => setNewNoticeFullText(e.target.value)}
                              placeholder="Detailed directive and operational advice..."
                              className="w-full px-3 py-1.5 border border-slate-300 rounded focus:outline-none"
                              required
                            />
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="checkbox"
                              id="isImp"
                              checked={newNoticeIsImportant}
                              onChange={(e) => setNewNoticeIsImportant(e.target.checked)}
                            />
                            <label htmlFor="isImp" className="text-slate-700">Display as priority notice banner</label>
                          </div>

                          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => setShowNewNoticeModal(false)}
                              className="px-4 py-2 bg-slate-100 text-slate-700 rounded cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-[#0756a3] text-white rounded cursor-pointer"
                            >
                              Publish Notice
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 4: Outlets Directory */}
              {activeTab === 'outlets' && (
                <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
                  <h3 className="text-sm font-bold text-slate-900">KACL Municipal Retail & Wholesale Depots</h3>
                  <div className="divide-y divide-slate-100 text-xs">
                    {outlets.map((o) => (
                      <div key={o.id} className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <div className="font-bold text-slate-900">{o.name}</div>
                          <div className="text-slate-500 font-mono text-[11px]">{o.ghanaPostAddress} · {o.locationArea}</div>
                        </div>
                        <div className="font-mono text-slate-700">{o.phoneNumber}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Security Audit Log */}
              {activeTab === 'audit' && (
                <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4 shadow-xs">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Security Audit Log & Traceability</h3>
                      <p className="text-xs text-slate-500">Immutable operational activity tracking for statutory compliance.</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="p-3 bg-slate-50 border border-slate-200 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#0756a3]">{log.action}</span>
                            <span className="text-slate-400">·</span>
                            <span className="text-slate-700 font-semibold">{log.user}</span>
                          </div>
                          <p className="text-slate-600">{log.details}</p>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400 shrink-0">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
