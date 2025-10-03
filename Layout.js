import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, PenSquare, Leaf } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "レビュー一覧",
    url: createPageUrl("Reviews"),
    icon: Home,
  },
  {
    title: "新規投稿",
    url: createPageUrl("NewReview"),
    icon: PenSquare,
  },
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --sage-50: #f6f8f6;
          --sage-100: #e8ede8;
          --sage-200: #d1dbd1;
          --sage-300: #a8baa8;
          --sage-400: #7d997d;
          --sage-500: #5a7a5a;
          --sage-600: #466146;
          --sage-700: #374d37;
          --sage-800: #2e3f2e;
          --beige-50: #faf9f7;
          --beige-100: #f5f3ef;
        }
        
        body {
          background: linear-gradient(135deg, var(--beige-50) 0%, var(--sage-50) 100%);
        }
      `}</style>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-sage-200 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-sage-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sage-400 to-sage-600 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-sage-800">お茶レビュー</h2>
                <p className="text-xs text-sage-500">スーパーのお茶評価ブログ</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`mb-1 rounded-lg transition-all duration-300 ${
                          location.pathname === item.url 
                            ? 'bg-sage-100 text-sage-800 shadow-sm' 
                            : 'hover:bg-sage-50 text-sage-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-sage-200 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-sage-50 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-sage-800">お茶レビュー</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}