// ====== Helper function dùng chung ======
function qs(selector, root = document) {
    return root.querySelector(selector);
}
function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
}
function on(el, evt, cb) {
    if (el) el.addEventListener(evt, cb);
}

// ====== MENU HOVER & ACTIVE TRANG HIỆN TẠI ======
document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".menu-list li a");

    menuLinks.forEach(link => {
        // Hiệu ứng hover (chỉ đổi màu khi rê chuột)
        link.addEventListener("mouseenter", () => link.classList.add("active-hover"));
        link.addEventListener("mouseleave", () => link.classList.remove("active-hover"));
    });

    // Giữ màu cho trang hiện tại dựa vào URL
    const currentPage = window.location.pathname.toLowerCase();
    menuLinks.forEach(link => {
        const href = link.getAttribute("href")?.toLowerCase();
        if (href && currentPage.includes(href)) {
            link.classList.add("active-page");
        }
    });
});

// ====== TESTIMONIAL CAROUSEL (Feedback đổi tự động) ======
(function setupCarousel() {
    const slides = [
        {
            quote: '"Vel officiis dolor sit illo aut eligendi ullam non laudantium..."',
            cite: 'Christine Beckam - Designer',
            avatar: 'Content/assets/img/Feedback_background/Ellipse 624.png'
        },
        {
            quote: '"Một trải nghiệm tuyệt vời, dịch vụ chuyên nghiệp và chu đáo."',
            cite: 'Nguyễn Văn A - Photographer',
            avatar: 'Content/assets/img/User/user1.png'
        },
        {
            quote: '"Tour rất đáng nhớ, hướng dẫn viên nhiệt tình."',
            cite: 'Lê Thị B - Student',
            avatar: 'Content/assets/img/User/user2.png'
        }
    ];

    let idx = 0;
    const quoteBox = qs(".quote-box blockquote");
    const citeEl = qs(".quote-box cite");
    const avatarImg = qs(".testimonial-avatar");
    const prev = qs(".prev-arrow");
    const next = qs(".next-arrow");
    const autoplayInterval = 5000;
    let timer = null;

    if (!quoteBox || !citeEl) return;

    // Hàm hiển thị slide hiện tại
    function render() {
        const s = slides[idx];
        quoteBox.textContent = s.quote;
        citeEl.textContent = s.cite;
        if (avatarImg) avatarImg.src = s.avatar;
    }

    // Chuyển slide
    function nextSlide() { idx = (idx + 1) % slides.length; render(); }
    function prevSlide() { idx = (idx - 1 + slides.length) % slides.length; render(); }

    // Nút điều hướng
    if (next) on(next, "click", e => { e.preventDefault(); nextSlide(); resetTimer(); });
    if (prev) on(prev, "click", e => { e.preventDefault(); prevSlide(); resetTimer(); });

    // Tự động chạy
    function startTimer() { timer = setInterval(nextSlide, autoplayInterval); }
    function resetTimer() { if (timer) clearInterval(timer); startTimer(); }

    // Cho phép dùng phím ← → để chuyển slide
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") { prevSlide(); resetTimer(); }
        if (e.key === "ArrowRight") { nextSlide(); resetTimer(); }
    });

    render();
    startTimer();
})();

// ====== FOOTER: GỬI EMAIL SUBSCRIBE ======
document.addEventListener("DOMContentLoaded", function () {
    const subscribeBtn = document.querySelector(".subscribe");
    const emailInput = document.querySelector(".bar input[type='email']");

    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener("click", function () {
            const email = emailInput.value.trim();

            // Kiểm tra email hợp lệ
            if (!email || !email.includes("@") || !email.includes(".")) {
                alert("⚠️ Vui lòng nhập email hợp lệ!");
                return;
            }

            // Hiển thị thông báo thành công
            alert("✅ Cảm ơn bạn đã đăng ký nhận tin!");
            emailInput.value = ""; // Xóa ô nhập sau khi gửi
        });
    }
});
