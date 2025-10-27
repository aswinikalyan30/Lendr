"use client";
import React, { useState } from "react";
import { SidebarProvider, SidebarBody, SidebarLink } from "../common/sidebar/Sidebar";
import { useSidebar } from "../common/sidebar/SidebarContext";
import {
  IconHome2,
  IconSettings,
  IconShoppingCartBolt,
  IconUserCog,
  IconBrandDatabricks
} from "@tabler/icons-react";
import StatCards from "./StatCards";
import { cn } from "../lib/utils";
import InventoryTable from "./InventoryTable";
import BookingsTable from "./BookingsTable";
function SideBar() {
  const links = [
    {
      id: 'dashboard',
      label: "Dashboard",
      
      icon: (
        <IconHome2 className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      id: 'inventory',
      label: "Inventory",
      
      icon: (
        <IconShoppingCartBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      id: 'requests',
      label: "Requests",
      
      icon: (
        <IconBrandDatabricks className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      id: 'users',
      label: "User Management",
      
      icon: (
        <IconUserCog className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      id: 'settings',
      label: "Settings",
      
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        // Use the remaining viewport height after the fixed header so content is visible
        "flex flex-1 flex-col overflow-hidden bg-gray-100 md:flex-row dark:bg-neutral-800",
        "min-h-[calc(100vh-73px)] w-full"
      )}>
      <SidebarProvider open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link) => (
                <SidebarLink key={link.id} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>

        {/* Initialize selection to first link */}
        <InitSelection links={links} />

        {/* Main content area that renders based on selected link */}
        <ContentArea />
      </SidebarProvider>
    </div>
  );
}

function InitSelection({ links }) {
  const { selectedId, setSelectedId } = useSidebar();
  React.useEffect(() => {
    if (!selectedId && links && links.length > 0) {
      setSelectedId(links[0].id);
    }
  }, [selectedId, setSelectedId, links]);
  return null;
}

function ContentArea() {
  const { selectedId } = useSidebar();

  switch (selectedId) {
    case 'inventory':
      return (
        <div className="flex flex-1">
          <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
            <h2 className="text-lg font-semibold mb-4">Inventory</h2>
          </div>
        </div>
      );
    case 'requests':
      return (
        <div className="flex flex-1">
          <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
            <h2 className="text-lg font-semibold mb-4">Requests</h2>
          </div>
        </div>
      );
    case 'users':
      return (
        <div className="flex flex-1">
          <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
            <h2 className="text-lg font-semibold mb-4">User Management</h2>
          </div>
        </div>
      );
    case 'settings':
      return (
        <div className="flex flex-1">
          <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
          </div>
        </div>
      );
    case 'dashboard':
    default:
      return <Dashboard />;
  }
}

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div
        className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <StatCards />
        <div className="flex flex-1 gap-2">
            <BookingsTable fromHome={true}  />
            <InventoryTable fromHome={true}  />
        </div>
      </div>
    </div>
  );
};

export default function AdminHome() {
  return (
    <>
      <SideBar />
    </>
  );
}
