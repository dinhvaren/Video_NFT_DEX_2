// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
// Import thư viện hỗ trợ đếm số token
import "@openzeppelin/contracts/utils/Counters.sol";
// Import ERC721 với tính năng URIStorage để quản lý metadata cho NFT
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// Import chuẩn ERC721
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    // Bộ đếm ID token và số lượng NFT đã bán
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    // Giá niêm yết cho mỗi NFT trên marketplace
    uint256 listingPrice = 0.000001 ether;
    // Chủ sở hữu marketplace
    address payable owner;
    // Mapping lưu trữ thông tin của mỗi NFT dựa trên tokenId
    mapping(uint256 => MarketItem) private idToMarketItem;
    // Cấu trúc lưu thông tin chi tiết của NFT trên marketplace
    struct MarketItem {
        uint256 tokenId;
        // Người bán NFT
        address payable seller;
        // Người sở hữu NFT (hoặc contract nếu đang niêm yết)
        address payable owner;
        // Giá của NFT
        uint256 price;
        // Trạng thái đã bán hay chưa
        bool sold;
    }

    // Sự kiện phát ra khi một NFT được niêm yết trên marketplace
    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // Modifier chỉ cho phép chủ sở hữu marketplace thực hiện hành động
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "only owner of the marketplace can change the listing price"
        );
        _;
    }
    // Constructor khởi tạo hợp đồng với tên token là "Metaverse Tokens" (METT)
    constructor() ERC721("Metaverse Tokens", "METT") {
        // Gán chủ sở hữu marketplace khi triển khai hợp đồng
        owner = payable(msg.sender);
    }

    /* Cập nhật giá niêm yết khi bán NFT */
    function updateListingPrice(
        uint256 _listingPrice
    ) public payable onlyOwner {
        require(
            owner == msg.sender,
            "Only marketplace owner can update listing price."
        );
         // Cập nhật giá niêm yết mới
        listingPrice = _listingPrice;
    }

    /* Trả về giá niêm yết hiện tại */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /* Mint một NFT mới và niêm yết lên marketplace */
    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        // Tăng số lượng token ID
        _tokenIds.increment();
        // Lấy ID mới
        uint256 newTokenId = _tokenIds.current();
         // Mint NFT cho người gọi
        _mint(msg.sender, newTokenId);
        // Gán metadata cho NFT
        _setTokenURI(newTokenId, tokenURI);
        // Đưa NFT lên marketplace
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    /* Tạo một mục niêm yết NFT trên marketplace */
    function createMarketItem(uint256 tokenId, uint256 price) private {
        // Giá NFT phải lớn hơn 0
        require(price > 0, "Price must be at least 1 wei");
        require(
            // Người bán phải trả phí niêm yết
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
// Lưu thông tin NFT vào mapping
        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            // Người bán là người gọi hàm
            payable(msg.sender),
            // Hợp đồng giữ NFT
            payable(address(this)),
            // NFT sẽ thuộc sở hữu của marketplace
            price,
            // Chưa bán
            false
        );
        // Chuyển NFT từ người bán vào marketplace
        _transfer(msg.sender, address(this), tokenId);
        /* Niêm yết lại NFT đã mua lên marketplace */
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    /* Cho phép người sở hữu NFT niêm yết lại NFT của họ để bán */
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            // Kiểm tra người gửi có phải chủ sở hữu NFT không
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            // Người bán phải trả phí niêm yết lại
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        // Đánh dấu NFT chưa bán
        idToMarketItem[tokenId].sold = false;
        // Cập nhật giá mới
        idToMarketItem[tokenId].price = price;
        // Cập nhật người bán
        idToMarketItem[tokenId].seller = payable(msg.sender);
        // Chuyển quyền sở hữu về marketplace
        idToMarketItem[tokenId].owner = payable(address(this));
        // Giảm số lượng NFT đã bán
        _itemsSold.decrement();
        // Chuyển NFT vào marketplace
        _transfer(msg.sender, address(this), tokenId);
    }

    /* Mua NFT từ marketplace */
    function createMarketSale(uint256 tokenId) public payable {
         // Lấy giá NFT
        uint256 price = idToMarketItem[tokenId].price;
        require(
            // Kiểm tra người mua gửi đủ số tiền
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        // Cập nhật chủ sở hữu NFT
        idToMarketItem[tokenId].owner = payable(msg.sender);
        // Đánh dấu NFT đã bán
        idToMarketItem[tokenId].sold = true;
        // Tăng số lượng NFT đã bán
        _itemsSold.increment();
         // Chuyển quyền sở hữu NFT cho người mua
        _transfer(address(this), msg.sender, tokenId);
        // Chuyển phí listing về marketplace
        payable(owner).transfer(listingPrice);
        // Chuyển tiền mua NFT về người bán
        payable(idToMarketItem[tokenId].seller).transfer(msg.value);
        // Xóa thông tin người bán
        idToMarketItem[tokenId].seller = payable(address(0));
    }

    /* Lấy danh sách tất cả các NFT chưa bán trên marketplace */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        // Tổng số NFT đã mint
        uint256 itemCount = _tokenIds.current();
        // NFT chưa bán
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Lấy danh sách các NFT mà người dùng đã mua */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        // Tổng số NFT
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Lấy danh sách các NFT mà người dùng đã niêm yết để bán */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
