import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { LogOut, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.navigate({ to: "/auth" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao sair");
      setLoggingOut(false);
    }
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      {/* min-w-0: sem isso as tabelas largas esticam o flex item em vez de rolar. */}
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-1 h-6" />
            <span className="truncate text-sm font-semibold">Painel Administrativo</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 border-border bg-background text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            Sair
          </Button>
        </header>

        <div className="flex-1">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
