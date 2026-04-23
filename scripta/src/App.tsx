import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from "@/components/Toast";
import { isLoggedIn } from "@/lib/auth";

import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Modelos from "@/pages/Modelos";
import Questionario from "@/pages/Questionario";
import Editor from "@/pages/Editor";
import Preview from "@/pages/Preview";
import Versoes from "@/pages/Versoes";
import Biblioteca from "@/pages/Biblioteca";
import Compartilhar from "@/pages/Compartilhar";
import Planos from "@/pages/Planos";
import Configuracoes from "@/pages/Configuracoes";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function PrivateRoute({ component: Component }: { component: () => JSX.Element }) {
  if (!isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/dashboard" />} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={() => <PrivateRoute component={Dashboard} />} />
      <Route path="/modelos" component={() => <PrivateRoute component={Modelos} />} />
      <Route path="/questionario" component={() => <PrivateRoute component={Questionario} />} />
      <Route path="/editor" component={() => <PrivateRoute component={Editor} />} />
      <Route path="/preview" component={() => <PrivateRoute component={Preview} />} />
      <Route path="/versoes" component={() => <PrivateRoute component={Versoes} />} />
      <Route path="/biblioteca" component={() => <PrivateRoute component={Biblioteca} />} />
      <Route path="/compartilhar" component={() => <PrivateRoute component={Compartilhar} />} />
      <Route path="/planos" component={() => <PrivateRoute component={Planos} />} />
      <Route path="/configuracoes" component={() => <PrivateRoute component={Configuracoes} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
        <ToastContainer />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
