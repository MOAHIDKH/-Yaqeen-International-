// Mobile menu logic (as before)
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});
// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .service-item').forEach(el => observer.observe(el));
document.querySelectorAll('.service-item').forEach(el => observer.observe(el));

// Complete translation dictionary
const translations = {
    ar: {
        nav_home: "الرئيسية", nav_about: "من نحن", nav_services: "خدماتنا", nav_clients: "عملاؤنا", nav_contact: "اتصل بنا",
        hero_badge: "خبرة تتجاوز 20 عامًا",
        hero_title: "اليقين العالمية <span class='gold-text'>للخدمات النفطية</span> والفنية",
        hero_desc: "حلول متكاملة لقطاع النفط والغاز والطاقة بأعلى معايير الجودة والسلامة",
        hero_btn: "استكشف خدماتنا <i class='fas fa-arrow-left'></i>",
        about_subtitle: "من نحن",
        about_title: "نحو التميز في <span class='gold-text'>الخدمات النفطية</span>",
        about_h3: "شركة رائدة في الخدمات النفطية والتقنية",
        about_p1: "تأسست شركة اليقين العالمية للخدمات النفطية والفنية في ديسمبر 2023 لتقديم خدماتها لشركات النفط والغاز وشركات توليد الطاقة، وتدار الشركة بطاقم مهندسين وأخصائيين لهم خبرة طويلة تتجاوز الثلاثون عامًا في مجال النفط والغاز.",
        about_p2: "نتخصص في صيانة محطات النفط والغاز، إنشاء وصيانة الخزانات، توريد قطع الغيار والمعدات والمواد الكيميائية، بالإضافة إلى توفير العمالة الفنية المتخصصة.",
        about_p3: "نتميز أيضًا بخدمات إزالة المواد المشعة وإدارة النفايات الإشعاعية والمسح الإشعاعي، ودورات تدريبية معتمدة في مجال الوقاية الإشعاعية.",
        exp_text: "عاماً من الخبرة",
        stat1: "سنوات خبرة", stat2: "مشروع منجز", stat3: "عميل موثوق",
        skill1: "صيانة محطات", skill2: "توريد قطع غيار", skill3: "إدارة النفايات المشعة",
        skill4: "تدريب معتمد", skill5: "إنشاء خزانات", skill6: "عمالة فنية",
        services_subtitle: "خدماتنا",
        services_title: "ما <span class='gold-text'>نقدمه</span> لكم",
        service1_title: "توريد قطع الغيار والمعدات", service1_desc: "توريد قطع الغيار الكهربائية والإلكترونية، قطع غيار الضواغط والمضخات والصمامات ومعدات الحفر والمواد الكيميائية.",
        service1_tag1: "قطع غيار", service1_tag2: "معدات حفر", service1_tag3: "كيماويات",
        service2_title: "صيانة المحطات النفطية", service2_desc: "صيانة الفواصل والضواغط والمضخات والمبادلات الحرارية والمسخنات داخل محطات النفط والغاز.",
        service2_tag1: "ضواغط", service2_tag2: "مضخات", service2_tag3: "مبادلات",
        service3_title: "إنشاء وصيانة الخزانات", service3_desc: "خدمات إنشاء وصيانة الخزانات النفطية بأيدي مهندسين وفنيين ذوي خبرة عالية.",
        service3_tag1: "خزانات نفط", service3_tag2: "هياكل معدنية", service3_tag3: "لحام",
        service4_title: "توفير العمالة الفنية", service4_desc: "مهندسون متخصصون في الحفر، الإلكترونيات، الآلات الدقيقة، المعدات الدوارة كالتربينات وضواغط الغاز.",
        service4_tag1: "مهندسون", service4_tag2: "فنيون", service4_tag3: "لحامون",
        service5_title: "إزالة المواد المشعة", service5_desc: "مسح إشعاعي، إدارة النفايات المشعة، نقل المصادر المشعة وإعادة تصديرها، معتمدون من مؤسسة الطاقة الذرية.",
        service5_tag1: "مسح إشعاعي", service5_tag2: "نفايات مشعة", service5_tag3: "معتمد",
        service6_title: "التدريب في الوقاية الإشعاعية", service6_desc: "دورات متقدمة لمسؤولي الوقاية الإشعاعية معتمدة من مؤسسة الطاقة الذرية الليبية ووزارة القوى العاملة.",
        service6_tag1: "تدريب معتمد", service6_tag2: "شهادات", service6_tag3: "خبراء",
        clients_subtitle: "شركاء النجاح", clients_title: "نفخر <span class='gold-text'>بثقتهم</span>",
        client1: "شركة الهروج للعمليات النفطية", badge1: "شريك استراتيجي",
        client2: "شركة السرير", badge2: "شريك موثوق",
        client3: "شركة أكاكوس", badge3: "شريك استراتيجي",
        client4: "شركة ديتسمان", badge4: "شريك موثوق",
        client5: "شركة الإنشاءات الكهربائية", badge5: "شريك استراتيجي",
        contact_subtitle: "تواصل معنا", contact_title: "نحن هنا <span class='gold-text'>لخدمتك</span>",
        contact_desc: "نحن هنا للإجابة على استفساراتكم وتقديم العروض المناسبة لمشاريعكم",
        address: "طريق خدمات الدائري الثاني / غوط الشعال - ليبيا",
        name_label: "الاسم", email_label: "البريد الإلكتروني", subject_label: "الموضوع", message_label: "الرسالة",
        submit_btn: "إرسال الرسالة <i class='fas fa-paper-plane'></i>",
        copyright: "جميع الحقوق محفوظة"
    },
    en: {
        nav_home: "Home", nav_about: "About Us", nav_services: "Services", nav_clients: "Clients", nav_contact: "Contact Us",
        hero_badge: "Over 20 Years of Experience",
        hero_title: "Yaqeen International <span class='gold-text'>for Oil</span> & Technical Services",
        hero_desc: "Integrated solutions for oil, gas and energy sectors with highest quality and safety standards",
        hero_btn: "Explore Our Services <i class='fas fa-arrow-right'></i>",
        about_subtitle: "About Us",
        about_title: "Excellence in <span class='gold-text'>Oil Services</span>",
        about_h3: "A Leading Company in Oil & Technical Services",
        about_p1: "Yaqeen International for Oil & Technical Services was established in December 2023 to provide services to oil, gas and power generation companies. The company is managed by a team of engineers and specialists with over thirty years of experience in the oil and gas industry.",
        about_p2: "We specialize in oil and gas plant maintenance, tank construction and maintenance, supply of spare parts, equipment and chemicals, as well as providing specialized technical manpower.",
        about_p3: "We also  provide NORM  decontamination removal, NORM waste management, radiation surveys, and certified training courses in radiation protection.",
        exp_text: "Years of Experience",
        stat1: "Years Experience", stat2: "Projects Done", stat3: "Trusted Clients",
        skill1: "Plant Maintenance", skill2: "Spare Parts Supply", skill3: "Radioactive Waste Management",
        skill4: "Certified Training", skill5: "Tank Construction", skill6: "Technical Manpower",
        services_subtitle: "Our Services",
        services_title: "What <span class='gold-text'>We Offer</span>",
        service1_title: "Spare Parts & Equipment Supply", service1_desc: "Supply of electrical and electronic spare parts, compressor and pump parts, valves, drilling equipment and chemicals.",
        service1_tag1: "Spare Parts", service1_tag2: "Drilling Equipment", service1_tag3: "Chemicals",
        service2_title: "Oil Plant Maintenance", service2_desc: "Maintenance of separators, compressors, pumps, heat exchangers and heaters within oil and gas plants.",
        service2_tag1: "Compressors", service2_tag2: "Pumps", service2_tag3: "Heat Exchangers",
        service3_title: "Tank Construction & Maintenance", service3_desc: "Tank construction and maintenance services with highly experienced engineers and technicians.",
        service3_tag1: "Oil Tanks", service3_tag2: "Metal Structures", service3_tag3: "Welding",
        service4_title: "Technical Manpower Supply", service4_desc: "Specialized engineers in drilling, electronics, precision machinery, rotating equipment like turbines, gas compressors and pumps.",
        service4_tag1: "Engineers", service4_tag2: "Technicians", service4_tag3: "Welders",
        service5_title: "NORM  decontamination removal", service5_desc: "Radiation surveys, radioactive waste management, transport and re-export of radioactive sources, approved by the Atomic Energy Authority.",
        service5_tag1: "Radiation Survey", service5_tag2: "Radioactive Waste", service5_tag3: "Certified",
        service6_title: "Radiation Protection Training", service6_desc: "Advanced courses for radiation protection officers accredited by the Libyan Atomic Energy Authority and Ministry of Labor.",
        service6_tag1: "Certified Training", service6_tag2: "Certificates", service6_tag3: "Experts",
        clients_subtitle: "Success Partners", clients_title: "Proud of <span class='gold-text'>Their Trust</span>",
        client1: "Harouge Oil Operations Company", badge1: "Strategic Partner",
        client2: "Sarir oil", badge2: "Trusted Partner",
        client3: "Akakusb oil Company", badge3: "Strategic Partner",
        client4: "Dietsmann energy", badge4: "Trusted Partner",
        client5: "Electrical Construction Company", badge5: "Strategic Partner",
        contact_subtitle: "Contact Us", contact_title: "We Are <span class='gold-text'>Here For You</span>",
        contact_desc: "We are here to answer your inquiries and provide suitable offers for your projects",
        address: "Second Ring Road Services / Ghot AlShaal - Libya",
        name_label: "Full Name", email_label: "Email Address", subject_label: "Subject", message_label: "Message",
        submit_btn: "Send Message <i class='fas fa-paper-plane'></i>",
        copyright: "All Rights Reserved"
    }
};

let currentLang = 'ar';

function setLanguage(lang) {
    currentLang = lang;
    const isEn = lang === 'en';
    // update direction and class
    document.documentElement.setAttribute('dir', isEn ? 'ltr' : 'rtl');
    document.documentElement.setAttribute('lang', isEn ? 'en' : 'ar');
    document.body.classList.toggle('english', isEn);
    // update logo text visibility
    const logoAr = document.querySelector('.logo-text-ar');
    const logoEn = document.querySelector('.logo-text-en');
    if (logoAr && logoEn) {
        logoAr.style.display = isEn ? 'none' : 'block';
        logoEn.style.display = isEn ? 'block' : 'none';
    }
    // update footer text visibility
    const footerAr = document.querySelector('.footer-logo-text-ar');
    const footerEn = document.querySelector('.footer-logo-text-en');
    if (footerAr && footerEn) {
        footerAr.style.display = isEn ? 'none' : 'block';
        footerEn.style.display = isEn ? 'block' : 'none';
    }
    // update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key] !== undefined) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else if (el.classList.contains('section-title') || key.includes('title')) {
                // handle HTML content for titles that may contain <span>
                el.innerHTML = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    // update stat labels (they have data-i18n but also separate)
    document.querySelectorAll('.stat-label').forEach((el, idx) => {
        const key = el.getAttribute('data-i18n');
        if (key && translations[lang][key]) el.textContent = translations[lang][key];
    });
    // update skills spans
    document.querySelectorAll('.skills .skill-tag span').forEach((el, idx) => {
        const key = `skill${idx+1}`;
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    // update experience badge text
    const expBadgeText = document.querySelector('.experience-badge .text');
    if (expBadgeText && translations[lang].exp_text) expBadgeText.textContent = translations[lang].exp_text;
    // update CTA button (special because contains icon)
    const ctaBtn = document.querySelector('.cta-button');
    if (ctaBtn && translations[lang].hero_btn) ctaBtn.innerHTML = translations[lang].hero_btn;
    // update marquee clients (dynamic)
    const marqueeDiv = document.getElementById('marqueeClients');
    if (marqueeDiv) {
        const clients = ['client1','client2','client3','client4','client5'];
        let html = '';
        for (let i=0; i<2; i++) {
            clients.forEach(c => { html += `<span>${translations[lang][c]}</span>`; });
        }
        marqueeDiv.innerHTML = html;
    }
    // update submit button (handled by data-i18n but ensure)
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn && translations[lang].submit_btn) submitBtn.innerHTML = translations[lang].submit_btn;
    // store and update toggle button text
    localStorage.setItem('language', lang);
    const langToggle = document.getElementById('langToggle');
    if (langToggle) langToggle.textContent = lang === 'ar' ? 'English' : 'العربية';
}

// Form submission (with language-aware messages)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.querySelector('.submit-btn');
        const original = btn.innerHTML;
        const isEn = currentLang === 'en';
        btn.innerHTML = isEn ? 'Sending... <i class="fas fa-spinner fa-pulse"></i>' : 'جاري الإرسال... <i class="fas fa-spinner fa-pulse"></i>';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = isEn ? 'Sent! ✓' : 'تم الإرسال! ✓';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.disabled = false;
                btn.style.background = '';
                contactForm.reset();
                const msg = document.createElement('div');
                msg.textContent = isEn ? 'Thank you for contacting us! We will reply soon.' : 'شكراً لتواصلك! سنرد عليك قريباً.';
                msg.style.cssText = 'background:#10b981; color:white; padding:1rem; border-radius:10px; margin-top:1rem; text-align:center;';
                contactForm.appendChild(msg);
                setTimeout(() => msg.remove(), 4000);
            }, 2000);
        }, 1500);
    });
}

// Language toggle button
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        setLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language');
    setLanguage(savedLang === 'en' ? 'en' : 'ar');
    // Re-run animations for visible items
    setTimeout(() => {
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .service-item').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('animate');
        });
    }, 200);
});