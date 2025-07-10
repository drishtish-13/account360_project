// File: src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Settings, MessageSquare, Tag, FileText,
  Server, Sliders, Cpu, Database, Activity, HelpCircle, Ticket,
  ClipboardList, LifeBuoy, ChevronDown, ChevronRight, Shield, PenTool
} from 'lucide-react';

const SidebarSection = ({ title, links }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-200"
      >
        <div className="flex items-center gap-2">
          {links.icon}
          <span>{title}</span>
        </div>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </div>
      {open && (
        <div className="ml-6">
          {links.items.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block p-2 text-sm rounded hover:bg-gray-200 ${isActive ? 'bg-blue-200 font-semibold' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow h-screen flex flex-col justify-between">
      <div className="flex-grow overflow-auto">
        <div className="p-4 border-b font-bold text-lg">account360.ai</div>
        <nav className="p-2 space-y-2">
          <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-2 p-2 hover:bg-gray-200 ${isActive ? 'bg-blue-200 font-semibold' : ''}`}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <SidebarSection
            title="Master"
            links={{
              icon: <Settings size={18} />,
              items: [
                { path: '/master/configuration', label: 'Configuration' },
                { path: '/master/labels', label: 'Labels' },
                { path: '/master/messages', label: 'Messages' },
                { path: '/master/releasenotes', label: 'Release Notes' },
                { path: '/master/services', label: 'Services' },
                { path: '/master/appconfiguration', label: 'App Configuration' },
              ]
            }}
          />

          <SidebarSection
            title="AI"
            links={{ icon: <Cpu size={18} />, items: [{ path: '/ai', label: 'AI' }] }}
          />

          <SidebarSection
            title="Sync & Logs"
            links={{ icon: <Database size={18} />, items: [{ path: '/synclogs', label: 'Sync & Logs' }] }}
          />

          <SidebarSection
            title="Utility"
            links={{ icon: <Activity size={18} />, items: [{ path: '/utility', label: 'Utility' }] }}
          />

          <SidebarSection
            title="Ticket"
            links={{ icon: <Ticket size={18} />, items: [{ path: '/ticket', label: 'Ticket' }] }}
          />

          <SidebarSection
            title="Report"
            links={{
              icon: <ClipboardList size={18} />,
              items: [
                { path: '/report', label: 'Report' },
                { path: '/report/uploaddocuments', label: 'Upload Documents' },
              ]
            }}
          />

          <SidebarSection
            title="Support"
            links={{ icon: <LifeBuoy size={18} />, items: [{ path: '/support', label: 'Support' }] }}
          />

          <SidebarSection
            title="Permissions"
            links={{ icon: <Shield size={18} />, items: [{ path: '/permissions', label: 'Permissions' }] }}
          />

          <SidebarSection
            title="Brand Annotation"
            links={{ icon: <PenTool size={18} />, items: [{ path: '/brand-annotation', label: 'Brand Annotation' }] }}
          />
          <SidebarSection
            title="Contact"
            links={{ icon: <FileText size={18} />, items: [{ path: '/contacts', label: 'Contact' }] }}
          />
        </nav>
      </div>
      <div className="text-center text-xs text-gray-500 p-4 border-t">
        <div>V.S1.0.1.3</div>
        <div>Powered by <span className="font-semibold">account360.ai</span></div>
      </div>
    </div>
  );
};

export default Sidebar;
