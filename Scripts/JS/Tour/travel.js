// main.js
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.toLowerCase();
    const menuItems = document.querySelectorAll(".menu-list a");

    menuItems.forEach(link => {
        if (link.href.toLowerCase().includes(currentPage)) {
            link.classList.add("active");
        }

        link.addEventListener("mouseenter", () => {
            link.style.color = "#DF6951";
        });
        link.addEventListener("mouseleave", () => {
            if (!link.classList.contains("active")) {
                link.style.color = "#fff";
            }
        });
    });
});
const buttons = document.querySelectorAll(".menu-button");
const boxes = document.querySelectorAll(".travel-section .box-section");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        // bỏ active cũ, thêm active mới
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        // xử lý lọc/sắp xếp
        const text = button.textContent.toLowerCase();
        if (text.includes("thấp đến cao")) sortTours("asc");
        else if (text.includes("cao đến thấp")) sortTours("desc");
        else if (text.includes("tên")) sortTours("name");
    });
});

function sortTours(type) {
    const container = document.querySelector(".travel-section");
    const tours = Array.from(container.querySelectorAll(".box-section"));

    let sorted = [...tours];
    if (type === "asc") {
        sorted.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (type === "desc") {
        sorted.sort((a, b) => getPrice(b) - getPrice(a));
    } else if (type === "name") {
        sorted.sort((a, b) => a.querySelector("h2").textContent.localeCompare(b.querySelector("h2").textContent));
    }

    sorted.forEach(el => container.appendChild(el));
}

function getPrice(tour) {
    return parseFloat(tour.querySelector(".price").textContent.replace("$", "").replace(",", ""));
}
const boxes2 = document.querySelectorAll(".box-section");

boxes2.forEach(box => {
    const img = box.querySelector("img");
    box.addEventListener("mouseenter", () => {
        img.style.opacity = "0.8";
    });
    box.addEventListener("mouseleave", () => {
        img.style.opacity = "1";
    });
});
const priceRange = document.getElementById("price-range");
const priceText = document.querySelector(".price-filter p");

priceRange.addEventListener("input", () => {
    const val = priceRange.value;
    priceText.textContent = `Giá: $12 – $${val}`;
});
/* navigation.js
   -------------------------
   Chức năng:
   - Toggle menu trên mobile (ẩn/hiện menu)
   - Dropdown submenu (Packages, Languages, ...)
   - Hover effect cho menu item
   - Giữ hành vi thân thiện với desktop & mobile
*/

(function () {
    'use strict';

    // Helpers
    function qs(selector, root) { return (root || document).querySelector(selector); }
    function qsa(selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); }
    function on(el, event, cb) { if (!el) return; el.addEventListener(event, cb); }

    document.addEventListener('DOMContentLoaded', function () {
        // === MOBILE MENU TOGGLE ===
        var nav = qs('.navigation');
        var menuList = qs('.menu-list');

        if (nav && menuList) {
            var toggle = document.createElement('button');
            toggle.className = 'menu-toggle';
            toggle.type = 'button';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                font-size: 22px;
                border: none;
                background: transparent;
                color: #fff;
                cursor: pointer;
                padding: 8px;
                display: none;
            `;
            nav.insertBefore(toggle, nav.firstChild);

            // Hiển thị nút toggle khi màn hình nhỏ
            function refreshToggleVisibility() {
                if (window.innerWidth < 900) {
                    toggle.style.display = 'inline-block';
                    if (!menuList.classList.contains('open')) menuList.style.display = 'none';
                } else {
                    toggle.style.display = 'none';
                    menuList.style.display = '';
                    menuList.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }

            on(window, 'resize', refreshToggleVisibility);
            refreshToggleVisibility();

            // Khi click vào toggle => mở/đóng menu
            on(toggle, 'click', function () {
                var open = menuList.classList.toggle('open');
                toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                menuList.style.display = open ? 'flex' : 'none';
                menuList.style.flexDirection = window.innerWidth < 900 ? 'column' : 'row';
            });
        }
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
