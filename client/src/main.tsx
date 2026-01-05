import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; 
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.scss";
import ErrorBoundary from "./utils/ErrorBoundary";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </RecoilRoot>
);
