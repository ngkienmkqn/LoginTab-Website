/**
 * LoginTab Marketing Website — Interactive Script
 * Handles: scroll animations, pricing toggle, FAQ, mobile menu, counters
 */

(function () {
    'use strict';

    // ── Navbar scroll effect ──
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ── Mobile menu toggle ──
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });

    // ── Scroll reveal animations ──
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ── Animated counters ──
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            if (target > 1000) {
                element.innerHTML = current.toLocaleString() + '<span class="accent">+</span>';
            } else {
                element.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    const statElements = document.querySelectorAll('.stat-value[data-target]');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statElements.forEach(el => statsObserver.observe(el));

    // ── Pricing toggle (Monthly/Annual) ──
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const annualLabel = document.getElementById('annualLabel');
    let isAnnual = false;

    if (pricingToggle) {
        pricingToggle.addEventListener('click', () => {
            isAnnual = !isAnnual;
            pricingToggle.classList.toggle('annual', isAnnual);
            monthlyLabel.classList.toggle('active', !isAnnual);
            annualLabel.classList.toggle('active', isAnnual);

            document.querySelectorAll('.price').forEach(priceEl => {
                const monthly = priceEl.getAttribute('data-monthly');
                const annual = priceEl.getAttribute('data-annual');
                priceEl.textContent = isAnnual ? annual : monthly;
            });
        });
    }

    // ── Hero mockup generation ──
    const heroMockup = document.getElementById('heroMockup');
    if (heroMockup) {
        generateDashboardMockup(heroMockup);
    }

    function generateDashboardMockup(imgElement) {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 420;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = '#1a1a24';
        ctx.beginPath();
        ctx.roundRect(0, 0, 640, 420, 12);
        ctx.fill();

        // Title bar
        ctx.fillStyle = '#111118';
        ctx.fillRect(0, 0, 640, 40);
        // Traffic lights
        const dots = ['#ff5f57', '#ffbd2e', '#28ca41'];
        dots.forEach((c, i) => {
            ctx.fillStyle = c;
            ctx.beginPath();
            ctx.arc(20 + i * 20, 20, 6, 0, Math.PI * 2);
            ctx.fill();
        });
        // Title
        ctx.fillStyle = '#bb86fc';
        ctx.font = 'bold 13px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('LoginTab — Profile Manager', 320, 25);

        // Sidebar
        ctx.fillStyle = '#16161f';
        ctx.fillRect(0, 40, 160, 380);

        // Sidebar items
        ctx.fillStyle = '#bb86fc';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'left';

        const sidebarItems = [
            { icon: '◈', label: 'Profiles', active: true },
            { icon: '⚡', label: 'Automation', active: false },
            { icon: '⊕', label: 'Proxies', active: false },
            { icon: '◎', label: 'Users', active: false },
            { icon: '⚙', label: 'Settings', active: false }
        ];

        sidebarItems.forEach((item, i) => {
            const y = 70 + i * 36;
            if (item.active) {
                ctx.fillStyle = 'rgba(187, 134, 252, 0.1)';
                ctx.beginPath();
                ctx.roundRect(8, y - 12, 144, 30, 6);
                ctx.fill();
                ctx.fillStyle = '#bb86fc';
                ctx.fillRect(0, y - 6, 3, 18);
            }
            ctx.fillStyle = item.active ? '#bb86fc' : '#55556a';
            ctx.font = '14px Inter, sans-serif';
            ctx.fillText(item.icon, 20, y + 5);
            ctx.font = '12px Inter, sans-serif';
            ctx.fillText(item.label, 42, y + 5);
        });

        // Table header
        ctx.fillStyle = '#111118';
        ctx.fillRect(160, 40, 480, 36);
        ctx.fillStyle = '#55556a';
        ctx.font = '10px Inter, sans-serif';
        const headers = ['Profile', 'Platform', 'Proxy', 'Status', 'Actions'];
        const headerX = [180, 280, 360, 460, 550];
        headers.forEach((h, i) => {
            ctx.fillText(h.toUpperCase(), headerX[i], 62);
        });

        // Table rows
        const profiles = [
            { name: 'facebook_shop_de', platform: 'Facebook', proxy: '🇩🇪 DE-Berlin', status: 'Running', color: '#03dac6' },
            { name: 'google_ads_fr', platform: 'Google', proxy: '🇫🇷 FR-Paris', status: 'Ready', color: '#bb86fc' },
            { name: 'tiktok_agency_uk', platform: 'TikTok', proxy: '🇬🇧 UK-London', status: 'Running', color: '#03dac6' },
            { name: 'amazon_store_it', platform: 'Amazon', proxy: '🇮🇹 IT-Milan', status: 'Ready', color: '#bb86fc' },
            { name: 'instagram_mgr_es', platform: 'Instagram', proxy: '🇪🇸 ES-Madrid', status: 'Syncing', color: '#f0c27f' },
            { name: 'meta_ads_nl', platform: 'Meta', proxy: '🇳🇱 NL-Amsterdam', status: 'Running', color: '#03dac6' },
            { name: 'shopify_pl_01', platform: 'Shopify', proxy: '🇵🇱 PL-Warsaw', status: 'Ready', color: '#bb86fc' },
            { name: 'ebay_seller_at', platform: 'eBay', proxy: '🇦🇹 AT-Vienna', status: 'Ready', color: '#bb86fc' },
        ];

        profiles.forEach((p, i) => {
            const y = 86 + i * 38;
            // Row bg (alternate)
            if (i % 2 === 0) {
                ctx.fillStyle = 'rgba(255,255,255,0.02)';
                ctx.fillRect(160, y, 480, 38);
            }
            // Row hover line
            ctx.fillStyle = '#e0e0e0';
            ctx.font = '11px Inter, sans-serif';
            ctx.fillText(p.name, 180, y + 23);

            ctx.fillStyle = '#8888a0';
            ctx.fillText(p.platform, 280, y + 23);
            ctx.fillText(p.proxy, 360, y + 23);

            // Status badge
            ctx.fillStyle = p.color === '#03dac6' ? 'rgba(3,218,198,0.15)' : p.color === '#f0c27f' ? 'rgba(240,194,127,0.15)' : 'rgba(187,134,252,0.15)';
            ctx.beginPath();
            ctx.roundRect(455, y + 10, 60, 20, 10);
            ctx.fill();
            ctx.fillStyle = p.color;
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(p.status, 485, y + 24);
            ctx.textAlign = 'left';

            // Action button
            ctx.fillStyle = 'rgba(187,134,252,0.1)';
            ctx.beginPath();
            ctx.roundRect(545, y + 10, 40, 20, 6);
            ctx.fill();
            ctx.fillStyle = '#bb86fc';
            ctx.font = '10px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Open', 565, y + 24);
            ctx.textAlign = 'left';
        });

        // Bottom bar
        ctx.fillStyle = '#111118';
        ctx.fillRect(160, 388, 480, 32);
        ctx.fillStyle = '#55556a';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText('8 profiles · 3 running · Team: 4 members', 180, 408);
        ctx.fillStyle = '#03dac6';
        ctx.fillText('● All systems operational', 460, 408);

        imgElement.src = canvas.toDataURL('image/png');
    }

})();

// ── FAQ toggle (global scope for onclick) ──
function toggleFaq(el) {
    const item = el.closest('.faq-item');
    const wasActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
    });

    // Toggle current
    if (!wasActive) {
        item.classList.add('active');
    }
}
