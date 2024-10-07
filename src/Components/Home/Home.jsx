import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../Header/Header';
import Dashboard from '../../Pages/Dashboard/Dashboard';
import AllCategory from '../../Pages/Category/AllCategory';
import AddCategory from '../../Pages/Category/AddCategory';
import EditCategory from '../../Pages/Category/EditCategory';
import AllProduct from '../../Pages/Products/AllProduct';
import AddProduct from '../../Pages/Products/AddProduct';
import EditProduct from '../../Pages/Products/EditProduct';
import AllBanner from '../../Pages/Banners/AllBanner';
import AddBanner from '../../Pages/Banners/AddBanner';
import EditBanner from '../../Pages/Banners/EditBanner';
import AllShopBanner from '../../Pages/ShopBanner/AllShopBanner';
import AddShopBanner from '../../Pages/ShopBanner/AddShopBanner';
import EditShopBanner from '../../Pages/ShopBanner/EditShopBanner';
import AllTags from '../../Pages/Tags/AllTags';
import AddTag from '../../Pages/Tags/AddTag';
import EditTag from '../../Pages/Tags/EditTag';
import AllVoucher from '../../Pages/Vouchers/AllVoucher';
import CreateVoucher from '../../Pages/Vouchers/AddVoucher';
import AllOrder from '../../Pages/Orders/AllOrder';
import EditOrder from '../../Pages/Orders/EditOrder';
import AllUsers from '../../Pages/Users/AllUsers';
import Login from '../auth/Login'; // Login page component

const Home = () => {
  // Check if the user is logged in by reading sessionStorage
  const isLoggedIn = sessionStorage.getItem('login') === 'true';

  return (
    <>
      {isLoggedIn ? (
        <>
          {/* Ensure the Header and content are properly wrapped */}
          <Header />
          <div className="rightside">
            <Routes>
              {/* Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Category Routes */}
              <Route path="/all-category" element={<AllCategory />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/edit-category/:id" element={<EditCategory />} />

              {/* Product Routes */}
              <Route path="/all-products" element={<AllProduct />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />

              {/* Users */}
              <Route path="/all-users" element={<AllUsers />} />

              {/* Voucher Routes */}
              <Route path="/all-voucher" element={<AllVoucher />} />
              <Route path="/add-voucher" element={<CreateVoucher />} />

              {/* Tag Routes */}
              <Route path="/all-tags" element={<AllTags />} />
              <Route path="/add-tag" element={<AddTag />} />
              <Route path="/edit-tag/:id" element={<EditTag />} />

              {/* Banner Routes */}
              <Route path="/all-banners" element={<AllBanner />} />
              <Route path="/add-banner" element={<AddBanner />} />
              <Route path="/edit-banner/:id" element={<EditBanner />} />

              {/* Shop Banner Routes */}
              <Route path="/all-shop-banners" element={<AllShopBanner />} />
              <Route path="/add-shop-banner" element={<AddShopBanner />} />
              <Route path="/edit-shop-banner/:id" element={<EditShopBanner />} />

              {/* Order Routes */}
              <Route path="/all-orders" element={<AllOrder />} />
              <Route path="/edit-order/:id" element={<EditOrder />} />
            </Routes>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
