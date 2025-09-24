import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StaggeredMenu from "./components/layout/StaggeredMenu";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import ReportPage from "./pages/ReportPage";
import TutorialPage from "./pages/TutorialPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "@/pages/not-found";
import LanguageSwitcher from "./components/ui/LanguageSwitcher"; // <--- import

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "New Report", ariaLabel: "Create new hazard report", link: "/report" },
  { label: "Crisis Map", ariaLabel: "View existing hazard reports", link: "/map" },
  { label: "How to Use", ariaLabel: "Learn how to use the app", link: "/tutorial" }
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" }
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="relative min-h-screen bg-dark-bg text-foreground">
            <LanguageSwitcher /> {/* Add this at the top */}
            <StaggeredMenu
              position="right"
              items={menuItems}
              socialItems={socialItems}
              displaySocials={true}
              displayItemNumbering={true}
              menuButtonColor="#fff"
              openMenuButtonColor="#fff"
              changeMenuColorOnOpen={true}
              colors={['#B19EEF', '#5227FF']}
              accentColor="#ff6b6b"
              onMenuOpen={() => console.log('Menu opened')}
              onMenuClose={() => console.log('Menu closed')}
            />
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/tutorial" element={<TutorialPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;