//hover
document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu ul li a");
    const currentPath = window.location.pathname.toLowerCase();

    menuItems.forEach(item => {
        // Hover tô màu
        item.addEventListener("mouseenter", () => item.classList.add("active-hover"));
        item.addEventListener("mouseleave", () => item.classList.remove("active-hover"));

        // Giữ màu khi đang ở trang hiện tại
        const href = item.getAttribute("href").toLowerCase();
        if (href && currentPath.includes(href)) {
            item.classList.add("active-page");
        }
    });
});

// Xử lý các nút "Thanh toán"
document.addEventListener("DOMContentLoaded", function () {
    // Thanh toán bằng QR
    const qrBtn = document.querySelector(".pay-method .method button");
    if (qrBtn) {
        qrBtn.addEventListener("click", function () {
            alert("✅ Bạn đã chọn thanh toán bằng QR. Vui lòng quét mã để hoàn tất.");
        });
    }

    // Thanh toán quốc tế (Visa / ATM)
    const payInternationalBtn = document.querySelector(".pay-national button");
    if (payInternationalBtn) {
        payInternationalBtn.addEventListener("click", function () {
            const cardNumber = document.querySelector(".info-atm input[type='text']").value.trim();
            const name = document.querySelectorAll(".info-atm input")[1].value.trim();
            const expDate = document.querySelector(".item .date input[placeholder='dd/mm/yy']").value.trim();
            const cvv = document.querySelector(".item .date input[placeholder='CVV']").value.trim();

            if (!cardNumber || !name || !expDate || !cvv) {
                alert("⚠️ Vui lòng nhập đầy đủ thông tin thẻ!");
                return;
            }
            if (cardNumber.length < 12 || cvv.length < 3) {
                alert("⚠️ Thông tin thẻ không hợp lệ!");
                return;
            }

            alert("💳 Thanh toán thành công! Cảm ơn bạn đã chọn BAD Travel ❤️");
        });
    }
});

// Hiệu ứng chọn logo thẻ
document.querySelectorAll(".img-pay button1").forEach(btn => {
    btn.addEventListener("click", function () {
        document.querySelectorAll(".img-pay button1").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
    });
});
// Footer - gửi email subscribe
document.addEventListener("DOMContentLoaded", function () {
    const subscribeBtn = document.querySelector(".subscribe");
    const emailInput = document.querySelector(".bar input");

    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener("click", function () {
            const email = emailInput.value.trim();
            if (!email.includes("@")) {
                alert("⚠️ Vui lòng nhập email hợp lệ!");
                return;
            }
            alert("✅ Cảm ơn bạn đã đăng ký nhận tin!");
            emailInput.value = "";
        });
    }
});