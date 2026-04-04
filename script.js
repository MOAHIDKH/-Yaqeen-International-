// Mobile Menu
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
}

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

document.addEventListener('click', (e) => {
    if (mobileMenuToggle && mobileMenu) {
        if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Animations
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.service-item');
            items.forEach((item, index) => {
                setTimeout(() => item.classList.add('animate'), index * 100);
            });
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
    
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) servicesObserver.observe(servicesGrid);
    
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => observer.observe(item));
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'جاري الإرسال... <i class="fas fa-spinner fa-pulse"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = 'تم الإرسال! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
                
                const successMsg = document.createElement('div');
                successMsg.textContent = 'شكراً لتواصلك! سنرد عليك قريباً.';
                successMsg.style.cssText = 'background: #10b981; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem; text-align: center;';
                contactForm.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 4000);
            }, 2000);
        }, 1500);
    });
}

// Language Switch
const langToggle = document.getElementById('langToggle');
let currentLang = 'ar';

function updateLanguage(lang) {
    const elementsToTranslate = {
        'ar': {
            'navLinks a:nth-child(1)': 'الرئيسية',
            'navLinks a:nth-child(2)': 'من نحن',
            'navLinks a:nth-child(3)': 'خدماتنا',
            'navLinks a:nth-child(4)': 'عملاؤنا',
            'navLinks a:nth-child(5)': 'اتصل بنا',
            'hero-badge': 'خبرة تتجاوز 30 عامًا',
            'hero h1': 'اليقين العالمية <span class="gold-text">للخدمات النفطية</span> والفنية',
            'hero .subtitle': 'حلول متكاملة لقطاع النفط والغاز والطاقة بأعلى معايير الجودة والسلامة',
            'cta-button': 'استكشف خدماتنا <i class="fas fa-arrow-left"></i>',
            'section-subtitle-first': 'من نحن',
            'section-title-first': 'نحو التميز في <span class="gold-text">الخدمات النفطية</span>',
            'about-text h3': 'شركة رائدة في الخدمات النفطية والتقنية',
            'about-text p:first-of-type': 'تأسست شركة اليقين العالمية للخدمات النفطية والفنية في ديسمبر 2023 لتقديم خدماتها لشركات النفط والغاز وشركات توليد الطاقة، وتدار الشركة بطاقم مهندسين وأخصائيين لهم خبرة طويلة تتجاوز الثلاثون عامًا في مجال النفط والغاز.',
            'about-text p:nth-of-type(2)': 'نتخصص في صيانة محطات النفط والغاز، إنشاء وصيانة الخزانات، توريد قطع الغيار والمعدات والمواد الكيميائية، بالإضافة إلى توفير العمالة الفنية المتخصصة.',
            'about-text p:nth-of-type(3)': 'نتميز أيضًا بخدمات إزالة المواد المشعة وإدارة النفايات الإشعاعية والمسح الإشعاعي، ودورات تدريبية معتمدة في مجال الوقاية الإشعاعية.',
            'stat-label-first': 'سنوات خبرة',
            'stat-label-second': 'مشروع منجز',
            'stat-label-third': 'عميل موثوق',
            'section-subtitle-second': 'خدماتنا',
            'section-title-second': 'ما <span class="gold-text">نقدمه</span> لكم',
            'section-subtitle-third': 'شركاء النجاح',
            'section-title-third': 'نفخر <span class="gold-text">بثقتهم</span>',
            'contact-section-subtitle': 'تواصل معنا',
            'contact-section-title': 'نحن هنا <span class="gold-text">لخدمتك</span>',
            'contact-desc': 'نحن هنا للإجابة على استفساراتكم وتقديم العروض المناسبة لمشاريعكم',
            'footer-copyright': 'جميع الحقوق محفوظة'
        },
        'en': {
            'navLinks a:nth-child(1)': 'Home',
            'navLinks a:nth-child(2)': 'About Us',
            'navLinks a:nth-child(3)': 'Services',
            'navLinks a:nth-child(4)': 'Clients',
            'navLinks a:nth-child(5)': 'Contact Us',
            'hero-badge': 'Over 30 Years of Experience',
            'hero h1': 'Yaqeen International <span class="gold-text">for Oil</span> & Technical Services',
            'hero .subtitle': 'Integrated solutions for oil, gas and energy sectors with highest quality and safety standards',
            'cta-button': 'Explore Our Services <i class="fas fa-arrow-right"></i>',
            'section-subtitle-first': 'About Us',
            'section-title-first': 'Excellence in <span class="gold-text">Oil Services</span>',
            'about-text h3': 'A Leading Company in Oil & Technical Services',
            'about-text p:first-of-type': 'Yaqeen International for Oil & Technical Services was established in December 2023 to provide services to oil, gas and power generation companies. The company is managed by a team of engineers and specialists with over thirty years of experience in the oil and gas industry.',
            'about-text p:nth-of-type(2)': 'We specialize in oil and gas plant maintenance, tank construction and maintenance, supply of spare parts, equipment and chemicals, as well as providing specialized technical manpower.',
            'about-text p:nth-of-type(3)': 'We also excel in radioactive material removal, radioactive waste management, radiation surveys, and certified training courses in radiation protection.',
            'stat-label-first': 'Years Experience',
            'stat-label-second': 'Projects Done',
            'stat-label-third': 'Trusted Clients',
            'section-subtitle-second': 'Our Services',
            'section-title-second': 'What <span class="gold-text">We Offer</span>',
            'section-subtitle-third': 'Success Partners',
            'section-title-third': 'Proud of <span class="gold-text">Their Trust</span>',
            'contact-section-subtitle': 'Contact Us',
            'contact-section-title': 'We Are <span class="gold-text">Here For You</span>',
            'contact-desc': 'We are here to answer your inquiries and provide suitable offers for your projects',
            'footer-copyright': 'All Rights Reserved'
        }
    };
    
    if (lang === 'en') {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
        document.body.classList.add('english');
        document.body.style.direction = 'ltr';
        document.body.style.textAlign = 'left';
        
        document.querySelector('.logo-text-ar').style.display = 'none';
        document.querySelector('.logo-text-en').style.display = 'block';
    } else {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
        document.body.classList.remove('english');
        document.body.style.direction = 'rtl';
        document.body.style.textAlign = 'right';
        
        document.querySelector('.logo-text-ar').style.display = 'block';
        document.querySelector('.logo-text-en').style.display = 'none';
    }
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link, index) => {
        if (elementsToTranslate[lang][`navLinks a:nth-child(${index + 1})`]) {
            link.textContent = elementsToTranslate[lang][`navLinks a:nth-child(${index + 1})`];
        }
    });
    
    // Update mobile navigation links
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach((link, index) => {
        if (elementsToTranslate[lang][`navLinks a:nth-child(${index + 1})`]) {
            link.textContent = elementsToTranslate[lang][`navLinks a:nth-child(${index + 1})`];
        }
    });
    
    // Update hero badge
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.textContent = elementsToTranslate[lang]['hero-badge'];
    
    // Update hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.innerHTML = elementsToTranslate[lang]['hero h1'];
    
    // Update hero subtitle
    const heroSubtitle = document.querySelector('.hero .subtitle');
    if (heroSubtitle) heroSubtitle.textContent = elementsToTranslate[lang]['hero .subtitle'];
    
    // Update CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) ctaButton.innerHTML = elementsToTranslate[lang]['cta-button'];
    
    // Update section subtitles and titles
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    if (sectionSubtitles[0]) sectionSubtitles[0].textContent = elementsToTranslate[lang]['section-subtitle-first'];
    if (sectionSubtitles[1]) sectionSubtitles[1].textContent = elementsToTranslate[lang]['section-subtitle-second'];
    if (sectionSubtitles[2]) sectionSubtitles[2].textContent = elementsToTranslate[lang]['section-subtitle-third'];
    if (sectionSubtitles[3]) sectionSubtitles[3].textContent = elementsToTranslate[lang]['contact-section-subtitle'];
    
    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles[0]) sectionTitles[0].innerHTML = elementsToTranslate[lang]['section-title-first'];
    if (sectionTitles[1]) sectionTitles[1].innerHTML = elementsToTranslate[lang]['section-title-second'];
    if (sectionTitles[2]) sectionTitles[2].innerHTML = elementsToTranslate[lang]['section-title-third'];
    if (sectionTitles[3]) sectionTitles[3].innerHTML = elementsToTranslate[lang]['contact-section-title'];
    
    // Update about text
    const aboutH3 = document.querySelector('.about-text h3');
    if (aboutH3) aboutH3.textContent = elementsToTranslate[lang]['about-text h3'];
    
    const aboutParagraphs = document.querySelectorAll('.about-text p');
    if (aboutParagraphs[0]) aboutParagraphs[0].textContent = elementsToTranslate[lang]['about-text p:first-of-type'];
    if (aboutParagraphs[1]) aboutParagraphs[1].textContent = elementsToTranslate[lang]['about-text p:nth-of-type(2)'];
    if (aboutParagraphs[2]) aboutParagraphs[2].textContent = elementsToTranslate[lang]['about-text p:nth-of-type(3)'];
    
    // Update stat labels
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels[0]) statLabels[0].textContent = elementsToTranslate[lang]['stat-label-first'];
    if (statLabels[1]) statLabels[1].textContent = elementsToTranslate[lang]['stat-label-second'];
    if (statLabels[2]) statLabels[2].textContent = elementsToTranslate[lang]['stat-label-third'];
    
    // Update contact description
    const contactDesc = document.querySelector('.contact-info-section p');
    if (contactDesc) contactDesc.textContent = elementsToTranslate[lang]['contact-desc'];
    
    // Update footer copyright
    const footerCopyright = document.querySelector('.footer-copyright p span');
    if (footerCopyright) footerCopyright.textContent = elementsToTranslate[lang]['footer-copyright'];
    
    currentLang = lang;
    localStorage.setItem('language', lang);
    langToggle.textContent = lang === 'ar' ? 'English' : 'العربية';
}

if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        updateLanguage(newLang);
    });
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'en') {
        updateLanguage('en');
    } else {
        updateLanguage('ar');
    }
});

// Keyboard Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Experience badge text update based on language
function updateExperienceBadge() {
    const expText = document.querySelector('.experience-badge .text');
    if (expText) {
        expText.textContent = currentLang === 'ar' ? 'عاماً من الخبرة' : 'Years of Experience';
    }
}

// Call this when language changes
const originalUpdateLanguage = updateLanguage;
window.updateLanguage = function(lang) {
    originalUpdateLanguage(lang);
    updateExperienceBadge();
};