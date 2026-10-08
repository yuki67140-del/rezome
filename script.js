
    /* افکت ظاهر شدن هنگام اسکرول */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = entry.target.dataset.rotate || 'translateY(0) rotate(0deg)';
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.skill-card, .project-card, .about-text, .section-title').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px) scale(0.9)';
      el.style.transition = `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`;
      observer.observe(el);
    });

    /* منوی همبرگری */
    function toggleMenu() {
      const nav = document.getElementById('mainNav');
      const burger = document.getElementById('hamburger');
      nav.classList.toggle('open');
      burger.classList.toggle('active');
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        document.getElementById('mainNav').classList.remove('open');
        document.getElementById('hamburger').classList.remove('active');
      });
    });

    /* FAQ */
    function toggleFaq(btn) {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    }

    /* چت‌بات */
    const botReplies = {
      'سلام': 'سلام! 🌸 چطور می‌تونم کمکت کنم؟',
      'خدمات': 'زهرا این خدمات رو ارائه می‌ده:\n• طراحی سایت\n• سئو (بهینه‌سازی سایت) 🎨🚀',
      'قیمت': 'برای اطلاع از قیمت، با شماره‌ی ۰۹۳۶۳۷۰۷۷۱۳ تماس بگیر 💰',
      'تماس': 'شماره‌ی تماس زهرا: ۰۹۳۶۳۷۰۷۷۱۳ 📞\nمی‌تونی از دکمه‌ی تلگرام هم استفاده کنی ✈️',
      'شماره': 'شماره‌ی تماس: ۰۹۳۶۳۷۰۷۷۱۳ 📞',
      'درباره': 'زهرا یه طراح سایت و متخصص سئو هست، عاشق طراحی‌های شیک و کارتونی 🌸',
      'پروژه': 'توی بخش پروژه‌ها می‌تونی نمونه کارهای زهرا رو ببینی 🎨',
      'مهارت': 'HTML، CSS، JavaScript، طراحی سایت و سئو از مهارت‌های زهراست 💪',
      'مرسی': 'خواهش می‌کنم! 🌸 هر وقت سوالی داشتی بپرس.',
      'ممنون': 'خواهش می‌کنم! 🌸 هر وقت سوالی داشتی بپرس.',
      'تلگرام': 'آیدی تلگرام زهرا: @YourUsername ✈️',
      'سایت': 'این سایت نمونه‌کار شخصی زهراست، امیدوارم خوشت اومده باشه 💖',
      'ساعت': 'ساعت کاری: هر روز ۱۰ صبح تا ۸ شب 🌸',
      'هزینه': 'برای اطلاع از قیمت، با شماره‌ی ۰۹۳۶۳۷۰۷۷۱۳ تماس بگیر 💰',
      'سئو': 'سئو (SEO) یعنی بهینه‌سازی سایت برای موتورهای جستجو مثل گوگل، تا سایتت بالاتر دیده بشه 🚀',
      'طراحی': 'طراحی سایت شامل ساخت سایت شخصی، فروشگاهی و لندینگ‌پیج با HTML/CSS مدرن 🎨'
    };

    function toggleChat() {
      const win = document.getElementById('chatWindow');
      const badge = document.getElementById('chatBadge');
      win.classList.toggle('open');
      if (win.classList.contains('open')) {
        badge.style.display = 'none';
        setTimeout(() => document.getElementById('chatInput').focus(), 300);
      }
    }

    function handleChatKey(e) {
      if (e.key === 'Enter') sendMessage();
    }

    function quickReply(text) {
      addMessage(text, 'user');
      setTimeout(() => {
        respondTo(text);
      }, 500);
    }

    function sendMessage() {
      const input = document.getElementById('chatInput');
      const text = input.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      input.value = '';
      setTimeout(() => respondTo(text), 500);
    }

    function addMessage(text, sender) {
      const container = document.getElementById('chatMessages');
      const msg = document.createElement('div');
      msg.className = 'message ' + sender;
      msg.textContent = text;
      container.appendChild(msg);
      container.scrollTop = container.scrollHeight;
    }

    function respondTo(text) {
      const lower = text.toLowerCase().trim();
      let reply = 'متوجه نشدم 🤔 برای اطلاعات بیشتر با شماره‌ی ۰۹۳۶۳۷۰۷۷۱۳ تماس بگیر.';

      for (const key in botReplies) {
        if (lower.includes(key)) {
          reply = botReplies[key];
          break;
        }
      }

      const container = document.getElementById('chatMessages');
      const typing = document.createElement('div');
      typing.className = 'message bot typing';
      typing.textContent = '...';
      container.appendChild(typing);
      container.scrollTop = container.scrollHeight;

      setTimeout(() => {
        typing.remove();
        addMessage(reply, 'bot');
      }, 700);
    }

    /* کپی شماره */
    function copyPhone() {
      const phone = '09363707713';
      
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(phone).then(showCopyToast);
      } else {
        const temp = document.createElement('textarea');
        temp.value = phone;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        try {
          document.execCommand('copy');
          showCopyToast();
        } catch (err) {
          alert('شماره: ' + phone);
        }
        document.body.removeChild(temp);
      }
    }

    function showCopyToast() {
      const oldToast = document.querySelector('.copy-toast');
      if (oldToast) oldToast.remove();

      const toast = document.createElement('div');
      toast.className = 'copy-toast';
      toast.textContent = '✅ شماره کپی شد: 09363707713';
      document.body.appendChild(toast);

      setTimeout(() => toast.classList.add('show'), 50);

      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
      }, 2500);
    }
