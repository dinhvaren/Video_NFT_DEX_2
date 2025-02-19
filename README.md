
---
#  🎥 Video NFT DEX – Sàn Giao Dịch Phi Tập Trung Cho NFT Video 🚀  

![Video NFT DEX](https://cryptoviet.info/_next/image?url=https%3A%2F%2Fadmin.cryptoviet.info%2Fuploads%2FCelestia_la_gi_64878a024f.jpg&w=3840&q=100)  
## 📌 Video NFT DEX là một sàn giao dịch phi tập trung (DEX) cho phép người dùng mint, mua, bán và giao dịch NFT video một cách an toàn, minh bạch và không cần trung gian trên blockchain. Dự án này sử dụng smart contract, IPFS và công nghệ Web3 để xây dựng một hệ sinh thái NFT video thực sự phi tập trung.  

## 💡 Tại sao chọn Video NFT DEX?  
- Nền tảng chuyên biệt cho NFT Video – Được thiết kế riêng cho nội dung video.  
- Bảo vệ bản quyền – Creator nhận được phí bản quyền mỗi khi NFT được giao dịch.  
- Giao dịch phi tập trung – Không qua trung gian, giúp giảm chi phí giao dịch.  
- Lưu trữ an toàn với IPFS – Dữ liệu video và metadata không thể bị thay đổi hoặc mất mát.  


##  🌟 Tính Năng Nổi Bật  
- **Tạo và mint NFT** Dễ dàng chuyển đổi hình ảnh, video và âm nhạc thành NFT chỉ với vài cú click.
- **Mua/Bán NFT** Giao Dịch Phi Tập Trung – Mua/bán NFT trực tiếp trên blockchain thông qua smart contract.
- **Hỗ trợ đa blockchain** (Polygon Amoy Testnet, Optimism Sepolia, Polygon Mainnet)  
- **Lưu trữ IPFS** thông qua Pinata lưu trữ dữ liệu phi tập trung và không thể bị thay đổi.  
- **Kết nối ví Web3** Tích Hợp Ví Web3 – Kết nối nhanh chóng với MetaMask, WalletConnect.  

---

## 📌 Công nghệ sử dụng  
- **Smart Contract**: Solidity, OpenZeppelin, Hardhat  
- **Blockchain**: Polygon, Optimism  
- **Frontend**: Next.js, React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js, MongoDB  (tương lai sẽ kết hợp)
- **Lưu trữ**: IPFS (Pinata)  
- **Ví**: Web3.js, Ethers.js  

---

## 📥 Cài đặt  

### 1️⃣ Clone dự án  
```bash
git clone https://github.com/dinhvaren/Video_NFT_DEX_2.git
cd Video_NFT_DEX
```

### 2️⃣ Cài đặt dependencies  
```bash
npm install
```

### 3️⃣ Thiết lập biến môi trường  
Tạo file `.env` và `.env.local`, sau đó thêm thông tin sau:  

#### `.env`  
```env
POLYGON_URL=https://polygon-rpc.com
POLYGON_URL_OPTIONAL=https://polygon-mainnet.infura.io/v3/YOUR_API_KEY
AMOY_URL=https://rpc-amoy.polygon.technology/
AMOY_URL_OPTIONAL=https://polygon-amoy.infura.io/v3/YOUR_API_KEY
OPTIMISM_URL=https://sepolia.optimism.io
OPTIMISM_URL_OPTIONAL=https://optimism-sepolia.infura.io/v3/YOUR_API_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY
## MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nft-marketplace
```

#### `.env.local`  
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_CONTRACT_ADDRESS
NEXT_PUBLIC_NETWORK=polygon_amoy # testnet
NEXT_PUBLIC_PINATA_POST_URL=https://api.pinata.cloud/pinning/pinFileToIPFS
NEXT_PUBLIC_PINATA_POST_JSON_URL=https://api.pinata.cloud/pinning/pinJSONToIPFS
NEXT_PUBLIC_PINATA_HASH_URL=https://gateway.pinata.cloud/ipfs/
NEXT_PUBLIC_PINATA_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_PINATA_SECRECT_KEY=YOUR_SECRET_KEY
## NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

---

## 🔨 Triển khai Smart Contract  
### 1️⃣ Cấu hình Hardhat  
Kiểm tra file `hardhat.config.js`, đảm bảo có thông tin mạng blockchain.  

### 2️⃣ Compile hợp đồng  
```bash
npx hardhat compile
```

### 3️⃣ Deploy hợp đồng lên Testnet/Mainnet  
```bash
npx hardhat run scripts/deploy.js --network polygon_amoy
```
(Lưu ý: Thay `polygon_amoy` bằng `optimism_sepolia` hoặc `polygon` nếu cần)

---

## 🖼️ Chạy giao diện người dùng  
```bash
npm run dev
```
Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)  

---

## 📜 Cấu trúc thư mục  

```
D:.
|-- 📦 AccountPage/          # Trang tài khoản người dùng
|-- 📦 artifacts/            # Chứa file build từ smart contract
|-- 📦 collectionPage/       # Trang hiển thị bộ sưu tập NFT
|-- 📦 components/           # Chứa các component chung
|-- 📦 contracts/            # Hợp đồng thông minh Solidity
|-- 📦 img/                  # Hình ảnh sử dụng trong dự án
|-- 📦 NFTDetailsPage/       # Trang chi tiết NFT
|-- 📦 pages/                # Trang chính của ứng dụng Next.js
|-- 📦 public/               # Tài nguyên tĩnh (hình ảnh, nhạc, video)
|-- 📦 scripts/              # Script deploy smart contract
|-- 📦 styles/               # CSS module
|-- 📄 hardhat.config.js     # Cấu hình Hardhat
|-- 📄 next.config.js        # Cấu hình Next.js
|-- 📄 package.json

```

---

## 🔥 Lộ Trình Phát Triển (Roadmap)  

✔ **Giai đoạn 1 – Ra mắt MVP**  
- Hỗ trợ **mint và giao dịch NFT Video** trên testnet (Polygon Amoy, Optimism Sepolia).  
- Tích hợp **ví Web3** (Metamask, WalletConnect).  
- Lưu trữ NFT trên **IPFS thông qua Pinata**.  

🚀 **Giai đoạn 2 – Mở rộng**  
- Hỗ trợ **stablecoin** (USDC, USDT) làm phương thức thanh toán.  
- Tích hợp **API GraphQL** để tối ưu hóa truy vấn dữ liệu NFT.  
- Cải thiện **giao diện người dùng (UI/UX)** cho trải nghiệm mượt mà hơn.  
- Bổ sung **VRF (Verifiable Random Function)** – Hỗ trợ chức năng ngẫu nhiên có thể xác minh trên blockchain.  
- **Time on Chain** – Ghi lại chính xác thời gian giao dịch trên blockchain.  

🌍 **Giai đoạn 3 – Hợp tác & Phát triển nâng cao**  
- **Hợp tác với các nhà sáng tạo** để mở rộng hệ sinh thái NFT.  
- Phát triển tính năng **staking NFT** – Cho phép người dùng khóa NFT để nhận phần thưởng.  
- Xây dựng **cộng đồng trò chuyện** – Kết nối và giao lưu với những người đam mê NFT khác.  
- Triển khai **backend với MongoDB**:  
  - Lưu thông tin **NFT, lịch sử giao dịch, metadata**.  
  - Hỗ trợ **quản lý người dùng** và theo dõi danh sách NFT của họ.  
  - Cung cấp **thống kê dữ liệu**: Tổng giao dịch, doanh số, xu hướng.  
  - Xây dựng **API RESTful** để giao tiếp với frontend.  

---

##  🤝 Đóng Góp & Hỗ Trợ  
💡 Bạn muốn tham gia phát triển? Hãy mở issue hoặc gửi pull request!  
💰 Bạn muốn đầu tư? Chúng tôi luôn chào đón các nhà đầu tư và đối tác chiến lược.  

---

## 📩 Liên Hệ & Cộng Đồng  
📧 Email: dinhlnng2003@gmail.com  
🌐 Website: [localhost](http://localhost:3000)  
📞 Phone: +84 976 095 303

---

 📄 Giấy Phép  
Dự án được cấp phép theo MIT License. Bạn có thể sử dụng, chỉnh sửa và phát triển mà không bị giới hạn.  

---

🎬 Bắt đầu giao dịch NFT video ngay hôm nay trên Video NFT DEX! 🚀  

---

