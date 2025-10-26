/* main.js
   Interactive behaviors for Home page
   - Mobile menu toggle
   - Dropdown submenus (click to open on touch devices)
   - Booking bar custom selectors (destination, package type, time)
   - Testimonial carousel with autoplay and keyboard controls

   Comments and labels are in Vietnamese for easier maintenance.
*/
(function () {
    'use strict';

    // Helpers
    function qs(selector, root) { return (root || document).querySelector(selector); }
    function qsa(selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); }
    function on(el, event, cb) { if (!el) return; el.addEventListener(event, cb); }

    document.addEventListener('DOMContentLoaded', function () {
        // MOBILE MENU TOGGLE
        var nav = qs('.navigation');
        var menuList = qs('.menu-list');
        if (nav && menuList) {
            var toggle = document.createElement('button');
            toggle.className = 'menu-toggle';
            toggle.type = 'button';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.innerHTML = '☰';
            toggle.style.cssText = 'font-size:22px;border:none;background:transparent;color:#fff;cursor:pointer;padding:8px;display:none;';
            nav.insertBefore(toggle, nav.firstChild);

            // show toggle only on small screens
            function refreshToggleVisibility() {
                if (window.innerWidth < 900) {
                    toggle.style.display = 'inline-block';
                    // hide menu by default on small screens
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

            on(toggle, 'click', function () {
                var open = menuList.classList.toggle('open');
                toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                menuList.style.display = open ? 'flex' : 'none';
                menuList.style.flexDirection = 'row';
                if (window.innerWidth < 900) menuList.style.flexDirection = 'column';
            });
        }

        // SUBMENU HANDLING: make dropdowns clickable on touch devices and close when clicking outside
        qsa('.menu-item.dropdown').forEach(function (item) {
            var trigger = qs(':scope > a', item);
            var submenu = qs(':scope > .submenu', item);
            if (!trigger || !submenu) return;

            // If device supports touch, allow click to toggle submenu
            function isTouch() { return ('ontouchstart' in window) || navigator.maxTouchPoints > 0; }
            if (isTouch()) {
                trigger.addEventListener('click', function (e) {
                    e.preventDefault();
                    var open = item.classList.toggle('open');
                    submenu.style.display = open ? 'block' : 'none';
                });
            }
        });

        // Close open submenus and custom dropdowns when clicking outside
        document.addEventListener('click', function (e) {
            // close menu-item dropdowns
            qsa('.menu-item.dropdown.open').forEach(function (it) {
                if (!it.contains(e.target)) {
                    it.classList.remove('open');
                    var sub = qs(':scope > .submenu', it);
                    if (sub) sub.style.display = '';
                }
            });
            // close booking custom dropdowns
            qsa('.custom-dropdown').forEach(function (dd) {
                if (!dd.contains(e.target)) dd.parentNode.removeChild(dd);
            });
        });

        // BOOKING BAR: custom dropdown selectors
        var bookingButtons = qsa('.booking-detail .booking-detail-item');
        var bookingOptions = [
            ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Phú Quốc', 'Đà Lạt'],
            ['Tour Trọn Gói', 'Tự chọn dịch vụ', 'Tour Hướng dẫn', 'Bay + Khách sạn'],
            ['01/11/2025', '05/11/2025', '10/11/2025', '20/11/2025']
        ];

        bookingButtons.forEach(function (btn, idx) {
            btn.style.cursor = 'pointer';
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                // remove other open dropdowns
                qsa('.custom-dropdown').forEach(function (d) { d.parentNode.removeChild(d); });

                var rect = btn.getBoundingClientRect();
                var dd = document.createElement('ul');
                dd.className = 'custom-dropdown';
                dd.style.position = 'absolute';
                dd.style.zIndex = 9999;
                dd.style.listStyle = 'none';
                dd.style.background = '#fff';
                dd.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                dd.style.borderRadius = '10px';
                dd.style.padding = '8px 0';
                dd.style.minWidth = Math.max(180, rect.width) + 'px';
                // position below the button
                var top = window.scrollY + rect.bottom + 6;
                var left = window.scrollX + rect.left;
                dd.style.top = top + 'px';
                dd.style.left = left + 'px';

                var options = bookingOptions[idx] || ['Option 1', 'Option 2'];
                options.forEach(function (opt) {
                    var li = document.createElement('li');
                    li.textContent = opt;
                    li.style.padding = '8px 16px';
                    li.style.cursor = 'pointer';
                    li.addEventListener('mouseenter', function () { li.style.background = '#f5f5f5'; });
                    li.addEventListener('mouseleave', function () { li.style.background = ''; });
                    li.addEventListener('click', function (ev) {
                        ev.stopPropagation();
                        // set selected text inside the button (preserve icons if any)
                        var icon = '';
                        var iEl = qs('i', btn);
                        if (iEl) icon = iEl.outerHTML + ' ';
                        btn.innerHTML = icon + '<span>' + opt + '</span>' + ' <i class="fa-solid fa-chevron-down"></i>';
                        if (dd && dd.parentNode) dd.parentNode.removeChild(dd);
                    });
                    dd.appendChild(li);
                });

                document.body.appendChild(dd);
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
