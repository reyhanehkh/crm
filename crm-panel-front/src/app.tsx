import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./components/auth-context";
import Dashboard from "./pages/dashboard";
import Layout from "./layout";
import Purchase from "./pages/purchase";
import Usages from "./pages/usages";
import Withdraws from "./pages/withdraws";
import Payment from "./pages/payment";
import Request from "./pages/request";
import Settings from "./pages/settings";
import ChangePassword from "./pages/settings/change-password";
import ChangeAddress from "./pages/settings/change-address";
import ChangeIdentity from "./pages/settings/change-identity";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="purchase">
              <Route path=":type" element={<Purchase />} />
            </Route>
            <Route path="payment">
              <Route path=":receiptId" element={<Payment />} />
            </Route>
            <Route path="usages" element={<Usages />} />
            <Route path="withdraws" element={<Withdraws />} />
            <Route path="request" element={<Request />} />
            <Route path="settings">
              <Route index element={<Settings />} />
              <Route path="password" element={<ChangePassword />} />
              <Route path="address" element={<ChangeAddress />} />
              <Route path="identity" element={<ChangeIdentity />} />
            </Route>
          </Route>
          {/* <Route path="*" element={<E404 />} /> */}
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
