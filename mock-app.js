/**
 * UPJ IoT Enterprise Mock Web Application Core Script
 * Shared across all mock pages for smooth, realistic interaction & seamless GitHub Pages demo
 */

(function () {
  'use strict';

  // --- 1. PAGE ROUTING & NAVIGATION MAP ---
  const routes = [
    { key: 'dashboard', paths: ['index.html', 'dashboard.html', ''], file: 'index.html', label: 'Tổng quan', icon: 'dashboard', selectorIds: ['dashboard-overview', 'overview'] },
    { key: 'systems', paths: ['system_and_Space.html', 'system_and_space.html', 'system.html'], file: 'system_and_Space.html', label: 'Hệ thống & Không gian', icon: 'home', selectorIds: ['systems-and-spaces', 'systems-spaces'] },
    { key: 'devices', paths: ['device.html'], file: 'device.html', label: 'Bảng điều khiển Thiết bị', icon: 'bolt', selectorIds: ['device-center', 'devices'] },
    { key: 'gateways', paths: ['gateway.html', 'controller.html', 'gateways'], file: 'gateway.html', label: 'Cổng điều khiển ESP32', icon: 'sensors', selectorIds: ['hardware-gateways', 'gateways'] },
    { key: 'automations', paths: ['rule.html'], file: 'rule.html', label: 'Kịch bản Tự động hóa', icon: 'settings', selectorIds: ['automations'] },
    { key: 'energy', paths: ['stat.html'], file: 'stat.html', label: 'Thống kê Năng lượng & Nhật ký', icon: 'monitoring', selectorIds: ['energy-and-logs', 'energy-logs'] },
    { key: 'ai', paths: ['AI.html', 'ai.html'], file: 'AI.html', label: 'Trợ lý AI Cấu hình', icon: 'smart_toy', selectorIds: ['gemini-generative-setup', 'ai-assistant'] },
    { key: 'members', paths: ['admin.html'], file: 'admin.html', label: 'Quản trị Thành viên & Phân quyền', icon: 'shield_person', selectorIds: ['members-and-rbac', 'members'] },
    { key: 'profile', paths: ['profile.html'], file: 'profile.html', label: 'Hồ sơ Cá nhân', icon: 'account_circle', selectorIds: ['profile'] }
  ];

  // Helper to get current file name
  function getCurrentPageName() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const last = segments.length > 0 ? segments[segments.length - 1] : '';
    if (!last || last === '' || last === '/') return 'index.html';
    return last.toLowerCase();
  }

  // --- 2. TOAST NOTIFICATION SYSTEM ---
  function createToastContainer() {
    let container = document.getElementById('mock-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'mock-toast-container';
      container.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none max-w-sm w-full';
      document.body.appendChild(container);
    }
    return container;
  }

  window.showToast = function (title, message, type = 'info') {
    const container = createToastContainer();
    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto transform translate-y-3 opacity-0 transition-all duration-300 flex items-start gap-3 p-3.5 rounded-xl shadow-xl border bg-surface-container-high text-on-surface';

    let iconName = 'info';
    let iconClass = 'text-primary';
    let borderColor = 'border-surface-border-subtle';

    if (type === 'success') {
      iconName = 'check_circle';
      iconClass = 'text-status-online';
      borderColor = 'border-status-online/30';
    } else if (type === 'warning') {
      iconName = 'warning';
      iconClass = 'text-status-warm';
      borderColor = 'border-status-warm/30';
    } else if (type === 'error' || type === 'alarm') {
      iconName = 'error';
      iconClass = 'text-status-alarm';
      borderColor = 'border-status-alarm/30';
    }

    toast.classList.add(borderColor);
    toast.innerHTML = `
      <span class="material-symbols-outlined text-xl ${iconClass} shrink-0 mt-0.5">${iconName}</span>
      <div class="flex flex-col flex-1 min-w-0">
        <span class="font-headline-sm text-sm font-semibold text-on-surface leading-tight">${title}</span>
        <span class="font-body-sm text-xs text-text-muted mt-0.5 leading-snug break-words">${message}</span>
      </div>
      <button class="text-text-muted hover:text-on-surface p-0.5 rounded transition-colors" type="button" aria-label="Close">
        <span class="material-symbols-outlined text-base">close</span>
      </button>
    `;

    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => {
      removeToast(toast);
    });

    container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    const timer = setTimeout(() => {
      removeToast(toast);
    }, 4000);

    function removeToast(el) {
      clearTimeout(timer);
      el.classList.add('translate-y-2', 'opacity-0');
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 300);
    }
  };

  // --- 3. AUTO-WIRE SIDEBAR NAVIGATION ---
  function wireSidebarNavigation() {
    const cur = getCurrentPageName();
    const navLinks = document.querySelectorAll('aside nav a');

    navLinks.forEach(link => {
      const dataPath = link.getAttribute('data-path') || '';
      const text = link.textContent.trim().toLowerCase();

      // Find matching route
      const matchedRoute = routes.find(r => 
        (dataPath && r.selectorIds.includes(dataPath)) ||
        r.paths.some(p => p.toLowerCase() === text) ||
        text.includes(r.label.toLowerCase()) ||
        r.label.toLowerCase().includes(text)
      );

      if (matchedRoute) {
        link.setAttribute('href', matchedRoute.file);

        // Check if this route is currently active
        const isCurrentActive = 
          matchedRoute.paths.includes(cur) ||
          (cur === 'index.html' && matchedRoute.key === 'dashboard') ||
          (cur === 'dashboard.html' && matchedRoute.key === 'dashboard');

        if (isCurrentActive) {
          link.setAttribute('aria-current', 'page');
          link.className = 'flex items-center gap-space-sm px-space-md py-space-sm transition-colors bg-primary-container text-on-primary-container font-medium rounded-xl shadow-sm';
        } else {
          link.removeAttribute('aria-current');
          link.className = 'flex items-center gap-space-sm px-space-md py-space-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors rounded-xl';
        }
      }
    });

    // Wire logo click to index.html
    const logoContainer = document.querySelector('aside .p-space-lg, aside > div:first-child');
    if (logoContainer) {
      logoContainer.style.cursor = 'pointer';
      logoContainer.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          window.location.href = 'index.html';
        }
      });
    }

    // Wire user profile badge in sidebar bottom to profile.html
    const profileCard = document.querySelector('aside .bg-surface-container-lowest, aside > div:last-child');
    if (profileCard) {
      const profileInfo = profileCard.querySelector('.flex.items-center.gap-space-sm');
      if (profileInfo) {
        profileInfo.style.cursor = 'pointer';
        profileInfo.title = 'Xem Hồ sơ Cá nhân & Phân quyền';
        profileInfo.addEventListener('click', () => {
          window.location.href = 'profile.html';
        });
      }

      // Logout button
      const logoutBtn = profileCard.querySelector('button');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          window.showToast('Đăng xuất', 'Đã mô phỏng đăng xuất phiên bảo mật mTLS (Session Token Revoked).', 'warning');
        });
      }
    }

    // Wire facility selector dropdown if present
    const facilitySelect = document.querySelector('aside select');
    if (facilitySelect) {
      const savedFacility = localStorage.getItem('upj_selected_facility');
      if (savedFacility) facilitySelect.value = savedFacility;

      facilitySelect.addEventListener('change', (e) => {
        localStorage.setItem('upj_selected_facility', e.target.value);
        const name = e.target.options[e.target.selectedIndex].text;
        window.showToast('Chuyển Khu Vực', `Đang tải telemetry cho cụm: ${name}`, 'info');
      });
    }
  }

  // --- 4. COMMAND PALETTE SEARCH MODAL (CMD+K / CTRL+K) ---
  function createCommandPalette() {
    const modal = document.createElement('div');
    modal.id = 'cmd-palette-modal';
    modal.className = 'fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm hidden flex items-start justify-center pt-24 px-4';
    modal.innerHTML = `
      <div class="bg-surface-container-low border border-surface-border-subtle rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col transform transition-all scale-95 opacity-0 duration-200" id="cmd-palette-box">
        <div class="p-3 border-b border-surface-border-subtle flex items-center gap-3">
          <span class="material-symbols-outlined text-outline text-xl">search</span>
          <input id="cmd-input" type="text" placeholder="Tìm thiết bị, phòng, gateway, kịch bản, hoặc lệnh..." class="bg-transparent text-on-surface placeholder:text-text-muted flex-1 text-sm focus:outline-none font-body-sm" />
          <kbd class="font-label-code text-label-xs text-outline bg-surface-container px-1.5 py-0.5 rounded border border-surface-border-subtle">ESC</kbd>
        </div>
        <div class="max-h-80 overflow-y-auto p-2 space-y-1" id="cmd-results">
          <!-- Search items will be injected here -->
        </div>
        <div class="p-2.5 bg-surface-container-lowest border-t border-surface-border-subtle flex items-center justify-between text-label-code text-xs text-text-muted font-label-code">
          <div class="flex items-center gap-2">
            <span>↑↓ di chuyển</span>
            <span>↵ chọn</span>
            <span>ESC đóng</span>
          </div>
          <span class="text-primary font-medium">UPJ Quick Navigator</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const searchItems = [
      { type: 'page', title: 'Tổng quan Hệ thống (Dashboard)', desc: 'Chỉ số realtime, telemetry nodes, trạng thái thiết bị', icon: 'dashboard', url: 'index.html' },
      { type: 'page', title: 'Hệ thống & Phân vùng Không gian', desc: 'Quản lý phòng khách, bếp, phòng ngủ, sân vườn & Gateway', icon: 'home', url: 'system_and_Space.html' },
      { type: 'page', title: 'Bảng điều khiển Thiết bị', desc: 'Công tắc relay, điều khiển quạt PWM, giám sát nhiệt độ', icon: 'bolt', url: 'device.html' },
      { type: 'page', title: 'Cổng điều khiển ESP32 & Ghép nối', desc: 'Quét QR, nhập mã PIN/MAC, giám sát heap FreeRTOS', icon: 'sensors', url: 'gateway.html' },
      { type: 'page', title: 'Kịch bản Tự động hóa & Rule Engine', desc: 'Bộ quy tắc IF-THEN, tự động hóa cảm biến khói & nhiệt độ', icon: 'settings', url: 'rule.html' },
      { type: 'page', title: 'Thống kê Năng lượng & Nhật ký', desc: 'Biểu đồ điện EVN kWh, chi phí tạm tính, Log Explorer', icon: 'monitoring', url: 'stat.html' },
      { type: 'page', title: 'Gemini Generative IoT Copilot', desc: 'Trợ lý AI phân tích ngôn ngữ tự nhiên thành cấu hình GPIO', icon: 'smart_toy', url: 'AI.html' },
      { type: 'page', title: 'Quản trị Thành viên & Phân quyền', desc: 'Bảo mật RBAC Layer 3, mTLS certs, mời thành viên', icon: 'shield_person', url: 'admin.html' },
      { type: 'page', title: 'Hồ sơ Cá nhân & API Token', desc: 'Thông tin tài khoản SUPER_ADMIN, Session TTL, API Key', icon: 'account_circle', url: 'profile.html' },
      { type: 'action', title: 'Ghép nối Controller ESP32 Mới (QR / PIN)', desc: 'Mở wizard ghép nối ESP32 qua QR code hoặc MAC và Setup PIN', icon: 'qr_code_scanner', action: () => { window.location.href = 'gateway.html'; } },
      { type: 'action', title: 'Thêm thiết bị mới (+)', desc: 'Mở cửa sổ đăng ký ngoại vi phần cứng ESP32', icon: 'add_circle', action: () => openAddDeviceModal() },
      { type: 'action', title: 'Đồng bộ Mesh Mạng IoT', desc: 'Ping kiểm tra và đồng bộ gói tin tới 3 Node ESP32', icon: 'sync', action: () => simulateSyncMesh() },
      { type: 'action', title: 'Khởi động lại Gateway', desc: 'Gửi gói tin Soft Reset ESP-IDF qua MQTT broker', icon: 'restart_alt', action: () => simulateRebootGateway() },
      { type: 'action', title: 'Xuất Nhật ký Telemetry CSV', desc: 'Tải xuống bản ghi log 24 giờ qua file upj-telemetry-feed.csv', icon: 'download', action: () => simulateExportTelemetry() }
    ];

    const input = modal.querySelector('#cmd-input');
    const resultsContainer = modal.querySelector('#cmd-results');
    const box = modal.querySelector('#cmd-palette-box');

    function renderResults(filterText = '') {
      const q = filterText.toLowerCase().trim();
      const filtered = searchItems.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      );

      resultsContainer.innerHTML = '';
      if (filtered.length === 0) {
        resultsContainer.innerHTML = `
          <div class="py-8 text-center text-text-muted font-body-sm text-sm">
            Không tìm thấy mục nào khớp với "<strong>${escapeHtml(filterText)}</strong>"
          </div>
        `;
        return;
      }

      filtered.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = `p-2.5 rounded-xl cursor-pointer flex items-center justify-between transition-colors ${index === 0 ? 'bg-surface-container-high text-on-surface' : 'hover:bg-surface-container text-on-surface-variant hover:text-on-surface'}`;
        row.setAttribute('data-index', index);
        row.innerHTML = `
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
              <span class="material-symbols-outlined text-lg">${item.icon}</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-body-sm text-sm font-medium text-on-surface truncate">${item.title}</span>
              <span class="font-body-sm text-xs text-text-muted truncate">${item.desc}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-sm text-outline">arrow_forward</span>
        `;

        row.addEventListener('click', () => {
          closeCommandPalette();
          if (item.url) {
            window.location.href = item.url;
          } else if (item.action) {
            item.action();
          }
        });

        resultsContainer.appendChild(row);
      });
    }

    function openCommandPalette() {
      modal.classList.remove('hidden');
      requestAnimationFrame(() => {
        box.classList.remove('scale-95', 'opacity-0');
        box.classList.add('scale-100', 'opacity-100');
        input.value = '';
        renderResults('');
        input.focus();
      });
    }

    function closeCommandPalette() {
      box.classList.add('scale-95', 'opacity-0');
      box.classList.remove('scale-100', 'opacity-100');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 150);
    }

    // Backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCommandPalette();
    });

    // Input filter
    input.addEventListener('input', (e) => {
      renderResults(e.target.value);
    });

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCommandPalette();
      } else if (e.key === 'Enter') {
        const first = resultsContainer.querySelector('[data-index="0"]');
        if (first) first.click();
      }
    });

    // Global Keydown Shortcut (Ctrl+K or Cmd+K)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modal.classList.contains('hidden')) {
          openCommandPalette();
        } else {
          closeCommandPalette();
        }
      }
    });

    // Wire all search inputs in header
    const headerSearchInputs = document.querySelectorAll('header input[type="text"]');
    headerSearchInputs.forEach(inp => {
      inp.addEventListener('focus', (e) => {
        e.target.blur();
        openCommandPalette();
      });
      inp.addEventListener('click', () => {
        openCommandPalette();
      });
    });
  }

  // --- 5. NOTIFICATION POPUP PANEL ---
  function createNotificationPanel() {
    const notifButtons = document.querySelectorAll('header .relative.cursor-pointer, header span.material-symbols-outlined:contains("notifications")');
    let notifTrigger = null;

    // Find the notifications icon container
    document.querySelectorAll('header .material-symbols-outlined').forEach(icon => {
      if (icon.textContent.trim() === 'notifications') {
        notifTrigger = icon.closest('.relative') || icon.parentElement;
      }
    });

    if (!notifTrigger) return;

    // Create dropdown panel
    const panel = document.createElement('div');
    panel.id = 'notif-popover';
    panel.className = 'absolute right-0 top-12 w-80 sm:w-96 bg-surface-container-low border border-surface-border-subtle rounded-2xl shadow-2xl z-[9995] hidden overflow-hidden';
    panel.innerHTML = `
      <div class="p-3.5 bg-surface-container border-b border-surface-border-subtle flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="font-headline-sm text-sm font-semibold text-on-surface">Thông báo & Cảnh báo</span>
          <span class="bg-status-alarm/20 text-status-alarm text-label-xs font-label-code px-1.5 py-0.5 rounded-full font-bold" id="notif-badge-count">3 MỚI</span>
        </div>
        <button id="mark-all-read" class="text-primary hover:underline text-xs font-body-sm font-medium">Đánh dấu đã đọc</button>
      </div>
      <div class="max-h-80 overflow-y-auto divide-y divide-surface-border-subtle" id="notif-list">
        <div class="p-3 hover:bg-surface-container transition-colors flex items-start gap-3 cursor-pointer">
          <span class="material-symbols-outlined text-status-alarm text-xl shrink-0 mt-0.5">warning</span>
          <div class="flex flex-col flex-1 min-w-0">
            <span class="font-body-sm text-xs font-semibold text-on-surface">Cảm biến Khí gas MQ-2 Bếp</span>
            <span class="font-body-sm text-xs text-text-muted mt-0.5">Phát hiện nồng độ vượt ngưỡng 480 PPM. Đã kích hoạt quạt hút khói.</span>
            <span class="font-label-code text-label-xs text-text-muted mt-1">2 phút trước • ESP32-Kitchen</span>
          </div>
        </div>
        <div class="p-3 hover:bg-surface-container transition-colors flex items-start gap-3 cursor-pointer">
          <span class="material-symbols-outlined text-status-online text-xl shrink-0 mt-0.5">check_circle</span>
          <div class="flex flex-col flex-1 min-w-0">
            <span class="font-body-sm text-xs font-semibold text-on-surface">Gateway ESP32-LivingRoom</span>
            <span class="font-body-sm text-xs text-text-muted mt-0.5">Kết nối lại thành công tới MQTT Broker. Độ trễ RTT: 12ms.</span>
            <span class="font-label-code text-label-xs text-text-muted mt-1">15 phút trước • Wi-Fi Mesh</span>
          </div>
        </div>
        <div class="p-3 hover:bg-surface-container transition-colors flex items-start gap-3 cursor-pointer">
          <span class="material-symbols-outlined text-status-telemetry text-xl shrink-0 mt-0.5">smart_toy</span>
          <div class="flex flex-col flex-1 min-w-0">
            <span class="font-body-sm text-xs font-semibold text-on-surface">Gemini Copilot Provisioning</span>
            <span class="font-body-sm text-xs text-text-muted mt-0.5">Đã phân tích cú pháp và nạp schema GPIO 16 (Đèn) & GPIO 18 (Quạt).</span>
            <span class="font-label-code text-label-xs text-text-muted mt-1">32 phút trước • AI Engine</span>
          </div>
        </div>
      </div>
      <div class="p-2 bg-surface-container-lowest border-t border-surface-border-subtle text-center">
        <a href="stat.html" class="text-primary hover:underline font-label-code text-xs font-medium">Mở toàn bộ Nhật ký Hệ thống →</a>
      </div>
    `;

    notifTrigger.style.position = 'relative';
    notifTrigger.appendChild(panel);

    notifTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !notifTrigger.contains(e.target)) {
        panel.classList.add('hidden');
      }
    });

    const markReadBtn = panel.querySelector('#mark-all-read');
    if (markReadBtn) {
      markReadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const badge = notifTrigger.querySelector('.bg-status-alarm');
        if (badge) badge.style.display = 'none';
        const innerBadge = panel.querySelector('#notif-badge-count');
        if (innerBadge) innerBadge.textContent = '0';
        window.showToast('Thông báo', 'Đã đánh dấu tất cả thông báo là đã đọc.', 'success');
      });
    }
  }

  // --- 6. GLOBAL "THÊM THIẾT BỊ" MODAL ---
  function createAddDeviceModal() {
    const modal = document.createElement('div');
    modal.id = 'global-add-device-modal';
    modal.className = 'fixed inset-0 z-[9992] bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="bg-surface-container-low border border-surface-border-subtle rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col transform transition-all duration-200">
        <div class="p-space-lg bg-surface-container border-b border-surface-border-subtle flex items-center justify-between">
          <div class="flex items-center gap-space-sm">
            <div class="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
              <span class="material-symbols-outlined text-lg">add_box</span>
            </div>
            <div>
              <h3 class="font-headline-sm text-headline-sm text-on-surface font-semibold">Thêm Thiết Bị Ngoại Vi Mới</h3>
              <p class="font-body-sm text-xs text-text-muted">Ánh xạ chân GPIO và cấu hình driver cho Node ESP32</p>
            </div>
          </div>
          <button id="close-add-device-modal" class="text-text-muted hover:text-on-surface p-1 rounded-lg" type="button">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <form id="global-add-device-form" class="p-space-lg space-y-space-md">
          <div>
            <label class="font-body-sm text-xs text-text-muted block mb-1">Tên thiết bị hiển thị *</label>
            <input id="new-dev-name" required placeholder="Ví dụ: Đèn âm trần ban công, Quạt thông gió..." class="w-full bg-surface-container text-on-surface px-space-md py-2 rounded-xl text-body-sm font-body-sm border border-surface-border-subtle focus:outline-none focus:border-primary" />
          </div>
          <div class="grid grid-cols-2 gap-space-md">
            <div>
              <label class="font-body-sm text-xs text-text-muted block mb-1">Khu vực / Phòng *</label>
              <select id="new-dev-space" class="w-full bg-surface-container text-on-surface px-space-md py-2 rounded-xl text-body-sm font-body-sm border border-surface-border-subtle focus:outline-none focus:border-primary">
                <option value="living_room">Phòng khách (Tầng 1)</option>
                <option value="kitchen">Phòng bếp (Tầng 1)</option>
                <option value="bedroom_master">Phòng ngủ Master (Tầng 2)</option>
                <option value="work_room">Phòng làm việc (Tầng 2)</option>
                <option value="balcony">Sân thượng & Ban công</option>
              </select>
            </div>
            <div>
              <label class="font-body-sm text-xs text-text-muted block mb-1">ESP32 Gateway *</label>
              <select id="new-dev-gateway" class="w-full bg-surface-container text-on-surface px-space-md py-2 rounded-xl text-body-sm font-body-sm border border-surface-border-subtle focus:outline-none focus:border-primary">
                <option value="esp32_living">ESP32-LivingRoom (48:E7:...)</option>
                <option value="esp32_kitchen">ESP32-Kitchen-SensorHub</option>
                <option value="esp32_bedroom">ESP32-Bedroom</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-space-md">
            <div>
              <label class="font-body-sm text-xs text-text-muted block mb-1">Loại Driver / Ngoại vi *</label>
              <select id="new-dev-driver" class="w-full bg-surface-container text-on-surface px-space-md py-2 rounded-xl text-body-sm font-body-sm border border-surface-border-subtle focus:outline-none focus:border-primary">
                <option value="RELAY_DIGITAL">RELAY_DIGITAL (Công tắc Bật/Tắt)</option>
                <option value="PWM_FAN">PWM_FAN (Điều tốc quạt 0-100%)</option>
                <option value="DIMMER_LIGHT">DIMMER_LIGHT (Độ sáng LED 0-100%)</option>
                <option value="SENSOR_DHT22">DHT22 (Nhiệt độ & Độ ẩm)</option>
                <option value="SENSOR_MQ2">MQ-2 Gas (Nồng độ Khí hóa lỏng)</option>
                <option value="SERVO_MOTOR">SERVO_MOTOR (Đóng/Mở Rèm - Khóa)</option>
              </select>
            </div>
            <div>
              <label class="font-body-sm text-xs text-text-muted block mb-1">Chân GPIO ESP32 *</label>
              <select id="new-dev-pin" class="w-full bg-surface-container text-on-surface px-space-md py-2 rounded-xl text-body-sm font-body-sm border border-surface-border-subtle focus:outline-none focus:border-primary">
                <option value="18">GPIO 18 (PWM / Output)</option>
                <option value="16">GPIO 16 (Digital Out)</option>
                <option value="4">GPIO 4 (I/O General)</option>
                <option value="17">GPIO 17 (Digital Out)</option>
                <option value="21">GPIO 21 (I2C SDA)</option>
                <option value="22">GPIO 22 (I2C SCL)</option>
                <option value="34">GPIO 34 (ADC1 Analog In)</option>
              </select>
            </div>
          </div>
          <div class="p-3 bg-surface-container rounded-xl flex items-center gap-2 text-xs font-label-code text-text-muted">
            <span class="material-symbols-outlined text-status-online text-sm">verified</span>
            <span>Check an toàn: Không trùng Boot Strapping Pin (GPIO 0, 2, 12, 15).</span>
          </div>
          <div class="pt-2 flex items-center justify-end gap-space-sm">
            <button type="button" id="cancel-add-device-modal" class="px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-sm transition-colors">
              Hủy bỏ
            </button>
            <button type="submit" id="submit-add-device-btn" class="px-space-lg py-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-body-sm text-sm font-semibold transition-all shadow-md flex items-center gap-1.5">
              <span class="material-symbols-outlined text-sm">save</span>
              <span>Lưu & Đồng bộ Gateway</span>
            </button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('#close-add-device-modal');
    const cancelBtn = modal.querySelector('#cancel-add-device-modal');
    const form = modal.querySelector('#global-add-device-form');

    function closeModal() {
      modal.classList.add('hidden');
    }

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const devName = document.getElementById('new-dev-name').value;
      const devDriver = document.getElementById('new-dev-driver').value;
      const devPin = document.getElementById('new-dev-pin').value;
      const submitBtn = document.getElementById('submit-add-device-btn');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="material-symbols-outlined text-sm animate-spin">refresh</span><span>Đang ghi NVS Flash...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="material-symbols-outlined text-sm">save</span><span>Lưu & Đồng bộ Gateway</span>';
        closeModal();
        form.reset();
        window.showToast(
          'Thêm Thiết Bị Thành Công',
          `Thiết bị "${devName}" đã gán vào GPIO ${devPin} (${devDriver}) trên Gateway qua MQTT.`,
          'success'
        );
      }, 700);
    });

    window.openAddDeviceModal = function () {
      modal.classList.remove('hidden');
      document.getElementById('new-dev-name').focus();
    };

    // Wire all "+ Thêm thiết bị" buttons in header across all pages
    document.querySelectorAll('header button').forEach(btn => {
      if (btn.textContent.includes('Thêm thiết bị') || btn.querySelector('span:contains("add")')) {
        btn.addEventListener('click', () => {
          window.openAddDeviceModal();
        });
      }
    });
  }

  // --- 7. GLOBAL QUICK ACTIONS SIMULATION ---
  function simulateSyncMesh() {
    window.showToast('Đồng bộ Mesh', 'Đang gửi broadcast ping tới 3 Node ESP32...', 'info');
    setTimeout(() => {
      window.showToast('Mesh Đã Đồng Bộ', '3 Node Gateway trực tuyến. Tỷ lệ phản hồi 100%, 0 gói tin thất thoát.', 'success');
    }, 1200);
  }

  function simulateRebootGateway() {
    window.showToast('Khởi động lại Gateway', 'Gói tin MQTT RESET gửi tới Gateway ESP32-LivingRoom...', 'warning');
    setTimeout(() => {
      window.showToast('Gateway Đã Online', 'Node ESP32-LivingRoom đã boot LittleFS thành công và tái kết nối mTLS.', 'success');
    }, 2000);
  }

  function simulateExportTelemetry() {
    const csvData = "Timestamp,Device_ID,Space,Metric,Value,Status\n" +
      "2026-09-28 21:30:00,ESP32_LIVING_01,Phòng Khách,Light_LED,100%,OK\n" +
      "2026-09-28 21:30:05,ESP32_LIVING_01,Phòng Khách,Fan_PWM,Speed_2,OK\n" +
      "2026-09-28 21:30:10,ESP32_KITCHEN_01,Bếp,MQ2_Gas,42_PPM,SAFE\n" +
      "2026-09-28 21:30:15,ESP32_KITCHEN_01,Bếp,DHT22_Temp,28.2_C,OK\n" +
      "2026-09-28 21:30:20,ESP32_BEDROOM_01,Phòng Ngủ,DHT22_Humid,58.4_RH,OK\n";

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `upj-telemetry-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    window.showToast('Xuất File CSV', 'Đã tải xuống tập tin thống kê Telemetry thành công.', 'success');
  }

  // --- 8. WIRE HEADER ACTIONS & COMMON BUTTONS ---
  function wireCommonButtons() {
    // Dark mode toggle
    const darkModeBtns = document.querySelectorAll('header button span.material-symbols-outlined');
    darkModeBtns.forEach(icon => {
      if (icon.textContent.trim() === 'dark_mode') {
        const btn = icon.parentElement;
        btn.addEventListener('click', () => {
          const isDark = document.documentElement.classList.toggle('dark');
          icon.textContent = isDark ? 'dark_mode' : 'light_mode';
          window.showToast('Giao diện', isDark ? 'Đã bật chế độ Dark Mode.' : 'Đã bật chế độ Light Mode.', 'info');
        });
      }
    });

    // Wire buttons with specific text
    document.querySelectorAll('button').forEach(btn => {
      const text = btn.textContent.trim();
      if (text.includes('Đồng bộ Mesh')) {
        btn.addEventListener('click', simulateSyncMesh);
      } else if (text.includes('Khởi động lại GW') || text.includes('Khởi động lại Gateway')) {
        btn.addEventListener('click', simulateRebootGateway);
      } else if (text.includes('Xuất Telemetry') || (text.includes('Xuất CSV') && !btn.hasAttribute('onclick'))) {
        btn.addEventListener('click', simulateExportTelemetry);
      } else if (text.includes('Tạo Kịch bản Mới') || text.id === 'btnCreateRule') {
        btn.addEventListener('click', () => {
          window.showToast('Rule Engine', 'Mở trình soạn thảo kịch bản logic IF-THEN...', 'info');
        });
      } else if (text.includes('Chạy ngay')) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const orig = btn.innerHTML;
          btn.innerHTML = '<span class="material-symbols-outlined text-xs animate-spin">refresh</span><span>Đang gửi...</span>';
          setTimeout(() => {
            btn.innerHTML = orig;
            window.showToast('Kích hoạt Kịch bản', 'Đã phát lệnh chạy kịch bản qua LAN Direct Command tới Gateway.', 'success');
          }, 800);
        });
      }
    });
  }

  // Helper escape
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // --- INITIALIZE ALL ON DOM READY ---
  function init() {
    wireSidebarNavigation();
    createCommandPalette();
    createNotificationPanel();
    createAddDeviceModal();
    wireCommonButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
