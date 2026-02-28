import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AddProblem from "./pages/AddProblem";
import Events from "./pages/Events";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import ScrollProgress from "./components/animations/ScrollProgress";
import SmoothScroll from "./components/animations/SmoothScroll";

import Roadmap from "./pages/Roadmap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SmoothScroll>
        <ScrollProgress />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/problems" element={<Problems />} />
              <Route path="/events" element={<Events />} />
              <Route path="/problem/:slug" element={<ProblemDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/add-problem" element={<AddProblem />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SmoothScroll>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
