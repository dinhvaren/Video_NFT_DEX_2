const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () {
  // Mô tả bộ kiểm thử cho hợp đồng Lock
  async function deployOneYearLockFixture() {
    // Hàm triển khai hợp đồng, dùng fixture để tái sử dụng
    // Định nghĩa một năm tính theo giây
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // Định nghĩa giá trị khóa là 1 GWEI
    const ONE_GWEI = 1_000_000_000;
    // Số tiền bị khóa trong hợp đồng
    const lockedAmount = ONE_GWEI;
    // Thời gian mở khóa là thời gian hiện tại + 1 năm
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
    // Lấy danh sách các tài khoản thử nghiệm
    // Hợp đồng được triển khai bằng cách sử dụng người ký/tài khoản đầu tiên theo mặc định    const [owner, otherAccount] = await ethers.getSigners();
    const Lock = await ethers.getContractFactory("Lock");
    // Triển khai hợp đồng với thời gian mở khóa và số tiền bị khóa
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    // Trả về đối tượng chứa hợp đồng và tài khoản
    return { lock, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    // Kiểm thử quá trình triển khai hợp đồng
    it("Should set the right unlockTime", async function () {
      // Kiểm tra giá trị unlockTime
      const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
      // Xác nhận giá trị unlockTime đúng
      expect(await lock.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      // Kiểm tra chủ sở hữu hợp đồng
      const { lock, owner } = await loadFixture(deployOneYearLockFixture);
      expect(await lock.owner()).to.equal(owner.address);
      // Xác nhận chủ sở hữu hợp đồng đúng
    });

    it("Should receive and store the funds to lock", async function () {
      // Kiểm tra hợp đồng nhận đúng số tiền bị khóa
      const { lock, lockedAmount } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await ethers.provider.getBalance(lock.address)).to.equal(
        lockedAmount
      );
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      // Kiểm tra lỗi nếu unlockTime không phải là thời điểm trong tương lai
      const latestTime = await time.latest();
      const Lock = await ethers.getContractFactory("Lock");
      // Xác nhận hợp đồng không thể triển khai với unlockTime không hợp lệ
      await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
        "Unlock time should be in the future"
      );
    });
  });

  describe("Withdrawals", function () {
    // Kiểm thử chức năng rút tiền
    describe("Validations", function () {
      // Kiểm tra điều kiện hợp lệ khi rút tiền
      it("Should revert with the right error if called too soon", async function () {
        // Kiểm tra lỗi nếu gọi rút tiền trước thời gian mở khóa
        const { lock } = await loadFixture(deployOneYearLockFixture);
        // Xác nhận lỗi đúng
        await expect(lock.withdraw()).to.be.revertedWith(
          "You can't withdraw yet"
        );
      });

      it("Should revert with the right error if called from another account", async function () {
        // Kiểm tra lỗi nếu người gọi không phải là chủ sở hữu hợp đồng
        const { lock, unlockTime, otherAccount } = await loadFixture(
          deployOneYearLockFixture
        );
        // Tăng thời gian đến lúc mở khóa
        await time.increaseTo(unlockTime);
        // Xác nhận lỗi khi không phải chủ sở hữu gọi rút tiền
        await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
          "You aren't the owner"
        );
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        // Kiểm tra hợp đồng cho phép rút tiền khi thời gian mở khóa đến
        const { lock, unlockTime } = await loadFixture(
          deployOneYearLockFixture
        );
        await time.increaseTo(unlockTime);
        // Xác nhận giao dịch không bị lỗi
        await expect(lock.withdraw()).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      // Kiểm tra sự kiện phát ra khi rút tiền
      it("Should emit an event on withdrawals", async function () {
        // Kiểm tra sự kiện Withdrawal khi rút tiền thành công
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );
        await time.increaseTo(unlockTime);
        // Xác nhận sự kiện phát ra đúng giá trị
        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue);
      });
    });

    describe("Transfers", function () {
      // Kiểm tra việc chuyển tiền khi rút
      it("Should transfer the funds to the owner", async function () {
        // Kiểm tra tiền được gửi về chủ sở hữu khi rút thành công
        const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
          deployOneYearLockFixture
        );
        await time.increaseTo(unlockTime);
        // Xác nhận số dư của chủ sở hữu tăng và hợp đồng giảm đúng số tiền
        await expect(lock.withdraw()).to.changeEtherBalances(
          [owner, lock],
          [lockedAmount, -lockedAmount]
        );
      });
    });
  });
});
