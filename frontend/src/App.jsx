import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import UserLayout from "./Components/Layout/UserLayout";

import Home from "./Pages/Home";
import About from "./Pages/About";
import MensSection from "./Pages/MensSection";
import WomensSection from "./Pages/WomensSection";
import TopItems from "./Pages/TopItems";
import Profile from "./Pages/Profile";
import SignupPage from "./Pages/SignupPage";
import SigninPage from "./Pages/SigninPage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";

import AdminDashboard from "./Admin/AdminDashboard";
import AdminPage from "./Admin/AdminPage";
import UserManagement from "./Admin/UserManagement";
import ProductManagement from "./Admin/ProductManagement";
import OrderManagement from "./Admin/OrderManagement";
import ShopManagement from "./Admin/ShopManagement";

import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";
import ProductDetail from "./Components/Products/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />

          <Route path="about" element={<About />} />
          <Route path="MensSection" element={<MensSection />} />
          <Route path="WomensSection" element={<WomensSection />} />
          <Route path="TopItems" element={<TopItems />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="SignupPage" element={<SignupPage />} />
          <Route path="SigninPage" element={<SigninPage />} />

          <Route
            path="CheckoutPage"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="order-confirmation"
            element={
              <ProtectedRoute>
                <OrderConfirmationPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="shops" element={<ShopManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;