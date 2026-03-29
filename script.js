// Hanime APK Showcase Script with Multi-language Support
// Customized for Hanime website

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const CONFIG = {
        CONFIG_FILE: 'apks.json',           // Your config file name
        DOWNLOAD_TIMEOUT: 30000,            // Download timeout in ms
        animationThreshold: 0.1,            // Animation trigger threshold
        animationRootMargin: '0px 0px -50px 0px'
    };

    // ===== STATE =====
    let state = {
        currentAPK: null,
        currentCode: null,
        apkName: null,
        appData: null,
        currentLanguage: 'en'
    };

    // ===== DOM ELEMENTS =====
    const elements = {
        heroApkBtn: null,
        navApkBtn: null,
        bannerApkBtn: null,
        heroFeaturesBtn: null,
        toastMsg: null
    };

    // ===== INITIALIZATION =====
    function init() {
        // Detect and apply language
        detectAndApplyLanguage();

        // Setup language switcher if exists
        setupLanguageSwitcher();

        // Cache DOM elements
        elements.heroApkBtn = document.getElementById('heroApkBtn');
        elements.navApkBtn = document.getElementById('navApkBtn');
        elements.bannerApkBtn = document.getElementById('bannerApkBtn');
        elements.heroFeaturesBtn = document.getElementById('heroFeaturesBtn');
        elements.toastMsg = document.getElementById('toastMsg');

        // Load APK configuration
        loadAPKConfig();

        // Attach event listeners
        attachEventListeners();

        // Add entrance animations
        addEntranceAnimations();

        // Setup smooth scroll
        setupSmoothScroll();

        // Add scroll progress
        addScrollProgress();
    }

    // ===== LANGUAGE FUNCTIONS =====
    function detectAndApplyLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0];

        if (translations[langCode]) {
            state.currentLanguage = langCode;
        } else {
            state.currentLanguage = 'en';
        }

        applyLanguage(state.currentLanguage);
        document.documentElement.lang = state.currentLanguage;

        if (state.currentLanguage === 'ar') {
            document.documentElement.dir = 'rtl';
        }

        setTimeout(() => {
            const activeBtn = document.querySelector(`.lang-btn[data-lang="${state.currentLanguage}"]`);
            if (activeBtn) activeBtn.classList.add('active');
        }, 100);
    }

    function setupLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');

        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                if (lang && translations[lang]) {
                    state.currentLanguage = lang;
                    applyLanguage(lang);

                    document.documentElement.lang = lang;
                    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

                    langButtons.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                }
            });
        });
    }

    function applyLanguage(lang) {
        const t = translations[lang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        });

        if (t.title) {
            document.title = t.title;
        }
    }

    // ===== APK CONFIG LOADING =====
    async function loadAPKConfig() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('r');
            state.currentCode = code;

            const response = await fetch(CONFIG.CONFIG_FILE);

            if (!response.ok) {
                throw new Error('Failed to load configuration');
            }

            const config = await response.json();
            state.appData = config;

            if (code && config.apps && config.apps[code]) {
                const app = config.apps[code];
                state.currentAPK = app.filename;
                state.apkName = app.name || 'Hanime';
            } else {
                state.currentAPK = config.default || 'hanime_default.apk';
                state.apkName = 'Hanime';
            }

        } catch (error) {
            console.error('Error loading config:', error);
            state.currentAPK = 'hanime_default.apk';
            state.apkName = 'Hanime';
            state.currentCode = null;
        }
    }

    // ===== EVENT LISTENERS =====
    function attachEventListeners() {
        if (elements.heroApkBtn) {
            elements.heroApkBtn.addEventListener('click', handleDownload);
        }
        if (elements.navApkBtn) {
            elements.navApkBtn.addEventListener('click', handleDownload);
        }
        if (elements.bannerApkBtn) {
            elements.bannerApkBtn.addEventListener('click', handleDownload);
        }
        if (elements.heroFeaturesBtn) {
            elements.heroFeaturesBtn.addEventListener('click', handleFeaturesClick);
        }

        // Thumbnail card clicks
        document.querySelectorAll('.thumb-card').forEach(card => {
            card.addEventListener('click', handleThumbnailClick);
        });
    }

    function handleFeaturesClick() {
        const featuresSection = document.querySelector('.features-mini');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
        showToast('✨ Explore all Hanime app features below!');
    }

    function handleThumbnailClick(e) {
        const card = e.currentTarget;
        const title = card.querySelector('h3')?.textContent;
        if (title) {
            showToast(`🔥 "${title}" — only on Hanime app. Download APK to watch full uncensored!`);
            handleDownload();
        }
    }

    // ===== DOWNLOAD HANDLER =====
    async function handleDownload(e) {
        if (e) e.preventDefault();

        const t = translations[state.currentLanguage];
        showToast(t.downloading || '⬇️ Downloading Hanime APK...');

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            // Create download link
            const downloadLink = document.createElement('a');
            downloadLink.href = state.currentAPK || 'hanime_default.apk';
            downloadLink.download = state.currentAPK || 'hanime_default.apk';
            downloadLink.target = '_blank';

            document.body.appendChild(downloadLink);
            downloadLink.click();

            await new Promise(resolve => setTimeout(resolve, 100));
            document.body.removeChild(downloadLink);

            showToast(t.downloadStarted || '⬇️ Download started: Hanime_v4.2.1.apk — check notifications.');
            console.log(`✓ Download initiated: ${state.currentAPK}`);

        } catch (error) {
            console.error('Download failed:', error);
            showToast(t.downloadError || 'Download failed. Please try again.');
        }
    }

    function showToast(message) {
        if (!elements.toastMsg) return;

        const toast = elements.toastMsg;
        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    }

    // ===== ANIMATIONS =====
    function addEntranceAnimations() {
        const observerOptions = {
            threshold: CONFIG.animationThreshold,
            rootMargin: CONFIG.animationRootMargin
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Animate feature cards
        document.querySelectorAll('.feat-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            observer.observe(card);
        });

        // Animate thumbnail cards
        document.querySelectorAll('.thumb-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s`;
            observer.observe(card);
        });

        // Animate stats
        document.querySelectorAll('.stat-item').forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            stat.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            observer.observe(stat);
        });
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    function addScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        Object.assign(progressBar.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '0%',
            height: '3px',
            background: 'linear-gradient(90deg, #3a3a3a, #666666, #999999)',
            zIndex: '9999',
            transition: 'width 0.1s ease'
        });

        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ===== STARTUP =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'd' || e.key === 'D') {
            if (elements.heroApkBtn) {
                elements.heroApkBtn.click();
            }
        }
        if (e.key === 's' || e.key === 'S') {
            const features = document.querySelector('.features-mini');
            if (features) {
                features.scrollIntoView({ behavior: 'smooth' });
            }
        }
        if (e.key === 'h' || e.key === 'H') {
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // ===== PERFORMANCE MONITORING =====
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        console.log(`Hanime showcase loaded in ${loadTime}ms`);
    });

})();
