// import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import CreateProductForm from "../components/CreateProductForm";
// import ProductsList from "../components/ProductsList";
// import AnalyticsTab from "../components/AnalyticsTab";
// import "../pages/CSS/AdminPage.css"

// // Static data
// const initialProducts = [
//   {
//     id: 1,
//     name: "Product 1",
//     category: "Category 1",
//     price: 100,
//     image: "/assets/product1.png",
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     category: "Category 2",
//     price: 200,
//     image: "/assets/product2.png",
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     category: "Category 1",
//     price: 150,
//     image: "/assets/product3.png",
//   },
// ];

// const tabs = [
//   { id: "create", label: "Create Product", icon: PlusCircle },
//   { id: "products", label: "Products", icon: ShoppingBasket },
//   { id: "analytics", label: "Analytics", icon: BarChart },
// ];

// const AdminPage = () => {
//   const [activeTab, setActiveTab] = useState("create");
//   const [products, setProducts] = useState(initialProducts);

//   useEffect(() => {
//     // Replace API call with static data logic
//     // Static data is already loaded into the state as 'products'
//   }, []);

//   const handleAddProduct = (newProduct) => {
//     const productWithId = { ...newProduct, id: products.length + 1 };
//     setProducts([...products, productWithId]);
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       <div className="relative z-10 container mx-auto px-4 py-16">
//         <motion.h1
//           className="text-4xl font-bold mb-8 text-emerald-400 text-center"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Admin Dashboard
//         </motion.h1>

//         <div className="flex justify-center mb-8">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
//                 activeTab === tab.id
//                   ? "bg-emerald-600 text-white"
//                   : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//               }`}
//             >
//               <tab.icon className="mr-2 h-5 w-5" />
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {activeTab === "create" && <CreateProductForm onAddProduct={handleAddProduct} />}
//         {activeTab === "products" && <ProductsList products={products} />}
//         {activeTab === "analytics" && <AnalyticsTab products={products} />}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;


import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
import "../pages/CSS/AdminPage.css";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    const productWithId = { ...newProduct, id: Date.now() }; // Ensure unique ID
    setProducts((prevProducts) => [...prevProducts, productWithId]);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  return (
    <div className="admin-page">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
          >
            <tab.icon />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "create" && <CreateProductForm onAddProduct={handleAddProduct} />}
      {activeTab === "products" && <ProductsList products={products}  onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}/>}
      {activeTab === "analytics" && <AnalyticsTab products={products} />}
    </div>
  );
};

export default AdminPage;
