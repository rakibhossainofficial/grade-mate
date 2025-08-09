import { Navbar } from "@/components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-150px)]">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </>
  );
}
