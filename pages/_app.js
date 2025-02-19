import "../styles/globals.css";

// Import các component nội bộ
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";

// Component chính của ứng dụng, bao bọc toàn bộ ứng dụng với context provider
const MyApp = ({ Component, pageProps }) => (
  <div>
    {/* Cung cấp ngữ cảnh NFTMarketplace cho toàn bộ ứng dụng */}
    <NFTMarketplaceProvider>
      {/* Thanh điều hướng */}
      <NavBar />
      {/* Hiển thị nội dung trang cụ thể */}
      {/* Chân trang */}
      <Component {...pageProps} />
      <Footer />
    </NFTMarketplaceProvider>
  </div>
);

export default MyApp;
