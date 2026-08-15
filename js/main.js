/* ========================================
   PERSONAL PORTFOLIO - MAIN JAVASCRIPT
   ======================================== */

(function() {
  'use strict';

  // === State ===
  const state = {
    currentSection: 0,
    totalSections: 6,
    lang: 'zh',
    aboutShown: false,
    aboutTimer: null,
    navOpen: false,
    labelPrinted: false,
    filmstripIndex: 0,
    isDesktop: window.innerWidth > 768
  };

  // === DOM Refs ===
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const wrapper = $('#siteWrapper');
  const pageFade = $('#pageFade');
  const archiveTransition = $('#archiveTransition');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const eduContainer = $('.edu-container');
  const eduFloatingTip = $('#eduFloatingTip');
  const homeSection = $('#sectionHome');
  const aboutTextArea = $('#aboutTextArea');
  const aboutTrigger = $('#aboutTrigger');
  const transitionOverlay = $('#transitionOverlay');
  const folderDrop = $('#folderDrop');
  const progressFill = $('#progressFill');
  const pageIndicator = $('#pageIndicator');
  const pixelAvatar = $('#pixelAvatar');
  const pixelNav = $('#pixelNav');
  const navMenu = $('#navMenu');
  const expModal = $('#expModal');
  const expModalContent = $('#expModalContent');
  const expModalClose = $('#expModalClose');
  const labelPrinter = $('#labelPrinter');
  const labelOutput = $('#labelOutput');
  const copyToast = $('#copyToast');
  const langSwitch = $('#langSwitch');
  const langHint = $('#langHint');
  const filmstripTrack = $('#filmstripTrack');
  const filmstripInner = $('#filmstripInner');
  const filmstripPrev = $('#filmstripPrev');
  const filmstripNext = $('#filmstripNext');
  const photoGrid = $('#photoGrid');
  const skillsStage = $('#skillsStage');
  const skillModal = $('#skillModal');
  const skillModalContent = $('#skillModalContent');
  const skillModalClose = $('#skillModalClose');
  const lifeEnvelope = $('#lifeEnvelope');

  // ========================================
  // EXPERIENCE DATA
  // ========================================
  const expData = {
    ctrip: {
      title: { zh: '携程 · 策略运营', en: 'Ctrip · Growth Strategy & Operations' },
      date: '2023.11 – 2024.02',
      goal: {
        zh: '协助执行携程租车元旦及春节等营销活动的全流程增长策略，覆盖活动报备、多端页面搭建、资源位投放、日常运维及效果复盘，通过数据驱动优化转化效果，推动租车订单 GMV 增长。',
        en: 'Supported end-to-end growth operations for Ctrip Car Rental campaigns around New Year and the Spring Festival, spanning campaign setup, cross-channel landing pages, media placements, daily operations and post-campaign analysis to improve conversion and incremental GMV.'
      },
      tasks: [
        {
          label: { zh: '增长策略执行', en: 'Growth Strategy Execution' },
          text: {
            zh: '协助推进元旦、春节营销活动增长策略落地，包括活动报备、在携程 APP 等 6 个渠道搭建 18 个活动页面，负责 20+ 资源位投放与维护；元旦期间累计曝光超 6000 万、点击超 10 万，平均 GMV 增量超百万。',
            en: 'Supported New Year and Spring Festival campaign launches by building 18 landing pages across six channels, including the Ctrip app, and managing 20+ media placements; New Year campaigns generated 60M+ impressions, 100K+ clicks and average incremental GMV of RMB 1M+.'
          }
        },
        {
          label: { zh: '资源位投放', en: 'Resource Placement' },
          text: {
            zh: '制定日常投放方案并持续跟踪效果，负责 Banner、Push、信息流、弹窗等 20+ 资源位投放运营，协调其他业务线完成资源位置换。',
            en: 'Planned and monitored daily placements across 20+ banners, push notifications, feeds and pop-ups; coordinated placement swaps with other business lines to secure campaign inventory.'
          }
        },
        {
          label: { zh: '数据分析与复盘', en: 'Data Analysis & Review' },
          text: {
            zh: '协同分析活动效果并复盘总结，发现火车票、接送机等资源位转化效率更高，推动后续活动资源配置优化。',
            en: 'Analyzed campaign performance data and conducted post-campaign reviews, identifying train ticket and airport transfer resources as higher-converting placements and supporting subsequent resource allocation optimization.'
          }
        }
      ],
      keywords: [
        { zh: '增长策略', en: 'Growth Strategy', color: 1 },
        { zh: '数据分析', en: 'Data Analysis', color: 2 },
        { zh: '跨部门协作与沟通', en: 'Cross-functional Collaboration', color: 3 },
        { zh: '细节把控', en: 'Attention to Detail', color: 4 }
      ]
    },
    shein: {
      title: { zh: 'Shein · 产品运营', en: 'Shein · Marketplace Operations' },
      date: '2025.07 – 2025.11',
      goal: {
        zh: '负责 accessories、shoes、Jewelry、bags 四品类，围绕 C 端用户需求提升品类曝光、用户增长及转化，协助活动落地、内容运营与平台功能优化。',
            en: 'Managed Accessories, Shoes, Jewelry and Bags, supporting campaign execution, content operations and product-feature optimisation to improve category visibility, engagement and conversion.'
      },
      tasks: [
        {
          label: { zh: '用户运营', en: 'User Operations' },
          text: {
            zh: '围绕新客激活与老客转化，负责 4 大品类 Push 运营与触达策略；结合节日营销、折扣促销及流行趋势设计内容，Push 最高打开率 0.83%，订单转化率最高 5.56%。',
            en: 'Owned push-notification strategy for four categories, tailoring messaging to seasonal promotions and trend signals; achieved a peak 0.83% open rate and 5.56% order conversion rate.'
          }
        },
        {
          label: { zh: '内容策划', en: 'Content Planning' },
          text: {
            zh: '基于用户偏好与消费场景，完成 4 条 Ins 社媒内容规划、落地 4 个首页专题 tab；围绕早秋、万圣节等节点输出 Push 触达内容，推动品类曝光与用户互动增长。',
            en: 'Planned four Instagram posts and launched four homepage campaign tabs; developed push content for early autumn, Halloween and other seasonal moments to drive category visibility and engagement.'
          }
        },
        {
          label: { zh: '市场洞察', en: 'Market Insights' },
          text: {
            zh: '基于投放数据复盘用户行为，建立差异化运营思路——高价值用户推高质贵价品、活跃用户推季节新品、时尚偏好用户推流行趋势，实现精细化用户触达。',
            en: 'Translated campaign-performance insights into segmented merchandising: premium products for high-value users, seasonal newness for active users and trend-led assortments for fashion-oriented users.'
          }
        },
        {
          label: { zh: '平台功能优化', en: 'Platform Optimization' },
          text: {
            zh: '完成 400+ 组 SKC 商品关联审核与配置，优化详情页关联推荐逻辑；搭建维护覆盖 4 大品类的 500+ 热销商品榜单，推动榜单内 GMV 增长近 200 万元。',
            en: 'Reviewed and configured 400+ style-colour product associations to improve related-product recommendations; built and maintained rankings for 500+ best sellers across four categories, contributing nearly RMB 2M in GMV growth within ranked products.'
          }
        }
      ],
      keywords: [
        { zh: '营销策划', en: 'Marketing Planning', color: 1 },
        { zh: '功能优化', en: 'Feature Optimization', color: 2 },
        { zh: '数据驱动决策', en: 'Data-Driven Decision', color: 3 },
        { zh: '用户需求洞察', en: 'User Insight', color: 4 }
      ]
    },
    meituan: {
      title: { zh: '美团 · 境外销售运营', en: 'Meituan · Cross-border B2B Operations' },
      date: '2025.12 – 2026.05',
      goal: {
        zh: '面向 B 端分销商推广境外酒店产品，协助商务团队完成售前、售中、售后全流程（分销商运营、展会拓客、数据监控及售后支持）。',
        en: 'Supported the full B2B sales cycle for international hotel products, including distributor operations, trade-show prospecting, order monitoring and post-sales support.'
      },
      tasks: [
        {
          label: { zh: '分销商日常对接与维护', en: 'Distributor Management' },
          text: {
            zh: '维护 200+ 境外酒店分销商社群，协助商务团队完成产品推荐、需求匹配、订单沟通及售后支持；每周跟进 50+ VIP 订单，通过英文邮件或电话直接对接境外酒店确认订单。',
            en: 'Maintained 200+ international hotel distributor groups and supported product matching, order communication and post-sales requests; followed up on 50+ VIP bookings per week with overseas hotels via English email and phone.'
          }
        },
        {
          label: { zh: '数据分析与优化', en: 'Data Analysis & Optimization' },
          text: {
            zh: '持续监测分销商订单表现，定期开展 VIP 订单专项分析；月度盘点中及时发现异常波动，主动定位原因，提出订单提前确认与集中核实流程优化方案，有效降低重要订单取消率。',
            en: 'Monitored distributor performance and conducted regular VIP-booking analyses; identified anomalous cancellation patterns in monthly reviews and proposed earlier confirmation and centralised-verification workflows to reduce cancellations on priority bookings.'
          }
        },
        {
          label: { zh: '展会拓客与社群运营', en: 'Exhibition & Community' },
          text: {
            zh: '参与行业展会拓客与客户沟通，搭建并运营展会客户社群；结合平台直采优势进行产品推介与内容触达，促进潜在 B 端合作转化。',
            en: 'Supported lead generation and client communication at industry trade shows; built and operated event customer groups, using the platform’s direct-procurement advantages in product outreach to advance prospective B2B partnerships.'
          }
        }
      ],
      keywords: [
        { zh: '紧急问题处理', en: 'Issue Resolution', color: 1 },
        { zh: '数据监控', en: 'Data Monitoring', color: 2 },
        { zh: 'To B 商家', en: 'B2B Merchant Relations', color: 3 }
      ]
    }
  };

  // ========================================
  // PAGE NAVIGATION
  // ========================================
  function goToSection(index) {
    if (index < 0 || index >= state.totalSections) return;
    if (index === state.currentSection) return;

    // Returning to Home starts a new Home → About journey. Without this reset,
    // the previous visit leaves aboutShown true and later scrolls are ignored.
    if (index === 0) {
      state.aboutShown = false;
      if (aboutTextArea) aboutTextArea.classList.remove('visible');
      transitionOverlay.classList.remove('active');
      folderDrop.classList.remove('dropping', 'fading');
      homeSection.classList.remove('home-fading');
    }

    // Preserve the existing folder story whenever Home advances to About.
    if (state.isDesktop && state.currentSection === 0 && index === 1 && !reducedMotion.matches) {
      showAbout();
      return;
    }

    // Education → Experience is a page-turn moment: matching transparent notes
    // fall first, then reveal the finished Experience board beneath them.
    if (state.isDesktop && state.currentSection === 2 && index === 3 && archiveTransition && !reducedMotion.matches) {
      if (state.pageSwitching) return;
      state.pageSwitching = true;
      runArchiveTransition(() => {
        state.currentSection = index;
        wrapper.classList.add('no-page-slide');
        wrapper.style.transform = `translateX(-${index * 100}vw)`;
        updateUI();
        wrapper.offsetHeight;
        wrapper.classList.remove('no-page-slide');
      }, () => {
        state.pageSwitching = false;
      });
      return;
    }

    if (state.isDesktop) {
      if (state.pageSwitching) return;
      state.pageSwitching = true;
      pageFade.classList.add('active');
      setTimeout(() => {
        state.currentSection = index;
        wrapper.style.transform = `translateX(-${index * 100}vw)`;
        updateUI();
        requestAnimationFrame(() => {
          pageFade.classList.remove('active');
          setTimeout(() => { state.pageSwitching = false; }, 260);
        });
      }, 190);
    } else {
      state.currentSection = index;
      const section = document.querySelector(`[data-index="${index}"]`);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
      updateUI();
    }

    // Auto-show About content when navigating to About section
    if (index === 1 && !state.aboutShown) {
      setTimeout(() => {
        if (aboutTextArea) aboutTextArea.classList.add('visible');
      }, 1200);
    }
  }

  function runArchiveTransition(onReveal, onComplete) {
    archiveTransition.classList.remove('active', 'leaving');
    // Restart CSS animations on every Education → Experience visit.
    archiveTransition.offsetHeight;
    archiveTransition.classList.add('active');

    setTimeout(onReveal, 350);
    setTimeout(() => archiveTransition.classList.add('leaving'), 720);
    setTimeout(() => {
      archiveTransition.classList.remove('active', 'leaving');
      if (onComplete) onComplete();
    }, 930);
  }

  function updateUI() {
    const idx = state.currentSection;
    // Progress bar
    const pct = ((idx + 1) / state.totalSections) * 100;
    progressFill.style.width = pct + '%';
    pageIndicator.textContent = `${idx + 1}/${state.totalSections}`;

    // Nav active
    $$('.nav-link').forEach((link, i) => {
      link.classList.toggle('active', i === idx);
    });
  }

  // ========================================
  // ABOUT ME TRIGGER (with folder drop transition)
  // ========================================
  function showAbout() {
    if (state.aboutShown) return;
    state.aboutShown = true;
    if (state.aboutTimer) clearTimeout(state.aboutTimer);

    // Phase 1: Show transition overlay and drop the folder
    transitionOverlay.classList.add('active');
    // Force reflow
    folderDrop.offsetHeight;
    folderDrop.classList.add('dropping');

    // Phase 2: After the folder has landed (~0.55s), wait 0.8s, then fade out
    setTimeout(() => {
      folderDrop.classList.add('fading');
      homeSection.classList.add('home-fading');

      // Phase 3: once Home and the folder have faded together, reveal About
      // instantly so no horizontal page motion is visible.
      setTimeout(() => {
        transitionOverlay.classList.remove('active');
        folderDrop.classList.remove('dropping', 'fading');
        wrapper.classList.add('no-page-slide');
        state.currentSection = 1;
        wrapper.style.transform = 'translateX(-100vw)';
        updateUI();
        wrapper.offsetHeight;
        wrapper.classList.remove('no-page-slide');
        homeSection.classList.remove('home-fading');
        setTimeout(() => {
          if (aboutTextArea) aboutTextArea.classList.add('visible');
        }, 120);
      }, 500);
    }, 1350);
  }

  // Click on blank area (aboutTrigger)
  if (aboutTrigger) {
    aboutTrigger.addEventListener('click', (e) => {
      if (state.currentSection === 0) {
        showAbout();
      }
    });
  }

  // ========================================
  // LANGUAGE TOGGLE
  // ========================================
  function switchLang(targetLang) {
    state.lang = targetLang;
    document.documentElement.lang = targetLang === 'zh' ? 'zh-CN' : 'en';

    // Update all [data-zh][data-en] text elements
    document.querySelectorAll('[data-zh][data-en]').forEach((el) => {
      const text = el.dataset[targetLang];
      if (text) {
        if (el.classList.contains('about-body')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });

    // Update lang toggle display
    langSwitch.textContent = targetLang === 'zh' ? 'EN' : 'ZH';
    langHint.textContent = targetLang === 'zh' ? 'How about in English?' : '切换中文？';

    // Update education tooltips. Keep both languages in separate attributes so
    // switching repeatedly never exposes storage prefixes such as "zh:".
    document.querySelectorAll('.edu-tag-hover').forEach((el) => {
      el.setAttribute('data-tip', targetLang === 'zh' ? el.dataset.tipZh : el.dataset.tipEn);
    });
  }

  function toggleLanguage() {
    switchLang(state.lang === 'zh' ? 'en' : 'zh');
  }

  // The small inline controller in index.html owns the physical click target.
  // Exposing this function keeps dynamic content (modals, skill panels) in
  // sync with its internal language state.
  window.switchPortfolioLanguage = toggleLanguage;

  // ========================================
  // EXPERIENCE STICKY NOTES → MODAL
  // ========================================
  function openExpModal(expKey) {
    const data = expData[expKey];
    if (!data) return;

    const lang = state.lang;
    const title = data.title[lang];

    let html = `<h3>${title}</h3>`;
    html += `<p style="font-family:var(--font-print);font-size:0.8rem;color:var(--text-light)">${data.date}</p>`;

    // Goal
    html += `<div class="modal-section"><h4>${lang === 'zh' ? '工作目标' : 'Goal'}</h4><p>${data.goal[lang]}</p></div>`;

    // Tasks
    data.tasks.forEach((task, i) => {
      html += `<div class="modal-section"><h4>${task.label[lang]}</h4><p>${task.text[lang]}</p></div>`;
    });

    // Keywords
    html += `<div class="modal-keywords">`;
    data.keywords.forEach((kw, i) => {
      html += `<span class="modal-kw kw-color-${kw.color}" data-kw="${kw[lang]}">${kw[lang]}</span>`;
    });
    html += `</div>`;

    expModalContent.innerHTML = html;
    expModalContainer.dataset.theme = expKey;
    $$('.exp-sticky').forEach((sticky) => {
      sticky.classList.toggle('selected', sticky.dataset.exp === expKey);
    });
    expModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeExpModal() {
    expModal.classList.remove('open');
    $$('.exp-sticky').forEach((sticky) => sticky.classList.remove('selected'));
    document.body.style.overflow = '';
  }

  // Sticky note click handlers
  $$('.exp-sticky').forEach((sticky) => {
    sticky.addEventListener('click', (e) => {
      e.stopPropagation();
      const expKey = sticky.dataset.exp;
      openExpModal(expKey);
    });
  });

  // Modal close
  if (expModalClose) {
    expModalClose.addEventListener('click', closeExpModal);
  }
  if (expModal) {
    expModal.addEventListener('click', (e) => {
      if (e.target === expModal) closeExpModal();
    });
  }

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && expModal.classList.contains('open')) {
      closeExpModal();
    }
    if (e.key === 'Escape' && skillModal && skillModal.classList.contains('open')) {
      closeSkillModal();
    }
  });

  // ========================================
  // SKILLS & HOBBIES
  // ========================================
  const escapeCovers = [
    'cover-122.png', 'cover-128.png', 'cover-23.png', 'cover-7.png',
    'cover-8.png', 'cover-915.png', 'cover-cqc.png'
  ];
  const skillData = {
    operations:{zh:['核心运营能力','电商运营','品类运营','CRM 策略','用户运营','增长策略'],en:['Core Operations','E-commerce Operations','Category Operations','CRM Strategy','User Operations','Growth Strategy']},
    marketing:{zh:['品牌与营销能力','用户分层','需求洞察','营销内容策划','社媒传播','笔记种草','市场洞察'],en:['Brand & Marketing','User Segmentation','Customer Insight','Marketing Content Strategy','Social Media Distribution','Social Commerce Content','Market Insight']},
    soft:{zh:['软实力','跨部门协作能力','问题闭环','项目推进与管理','数据复盘沉淀','自驱成长'],en:['Soft Skills','Cross-functional Collaboration','End-to-end Problem Solving','Project Delivery','Data Review & Documentation','Self-directed Learning']},
    tools:{zh:['工具与语言','Excel（数据透视表、函数）','SQL','SPSS','ChatGPT','Work Buddy','Photoshop','Canva','秀米','CET-6（500+）'],en:['Tools & Language','Excel (Pivot Tables & Functions)','SQL','SPSS','ChatGPT','Work Buddy','Photoshop','Canva','Xiumi','CET-6 (500+)']}
  };

  function setSkillsScene(index) {
    if (!skillsStage) return;
    const scene=Math.max(0,Math.min(2,index));
    skillsStage.dataset.scene=scene;
    document.documentElement.style.setProperty('--skills-bg-y', `${scene*50}%`);
    $$('.skills-scene').forEach((el,i)=>el.classList.toggle('active',i===scene));
    $$('.skills-scene-nav button').forEach((el,i)=>el.classList.toggle('active',i===scene));
  }
  $$('.skills-scene-nav button').forEach(btn=>btn.addEventListener('click',()=>setSkillsScene(+btn.dataset.sceneTo)));

  function openSkillModal(html, kind = '') {
    skillModalContent.innerHTML=html;
    $('#skillModalPaper').classList.toggle('film-modal', kind === 'film');
    skillModal.classList.add('open');
    document.body.style.overflow='hidden';
    const filmstrip = skillModalContent.querySelector('.project-filmstrip');
    if (filmstrip) {
      const moveFilmstrip = (direction) => {
        const cell = filmstrip.querySelector('.film-cell');
        const distance = cell ? cell.getBoundingClientRect().width : filmstrip.clientWidth * .72;
        filmstrip.scrollBy({ left: direction * distance, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      };
      skillModalContent.querySelector('[data-film-direction="prev"]')?.addEventListener('click', () => moveFilmstrip(-1));
      skillModalContent.querySelector('[data-film-direction="next"]')?.addEventListener('click', () => moveFilmstrip(1));
    }
  }
  function closeSkillModal(){skillModal.classList.remove('open');document.body.style.overflow='';}
  $$('.stationery-item').forEach(btn=>btn.addEventListener('click',()=>{
    if(btn.classList.contains('revealed')) return;
    const rows=skillData[btn.dataset.skill][state.lang];
    btn.querySelector('.stationery-detail').innerHTML=rows.slice(1).map(x=>`<span>${x}</span>`).join('');
    btn.classList.add('revealed');
  }));
  $$('.project-entry').forEach(btn=>btn.addEventListener('click',()=>{
    if(btn.dataset.project==='shop'){
      const shopIcons=`<span class="shop-app-icons"><img src="assets/app-xiaohongshu.png" alt="小红书"><img src="assets/app-xianyu.png" alt="闲鱼"></span>`;
      const evidence=`<section class="shop-evidence" aria-label="爆款笔记表现"><figure class="shop-post-frame"><img src="assets/shop-hit-post.png" alt="小红书爆款笔记截图：2.3万+阅读与1496次点赞收藏"></figure><div class="shop-evidence-copy"><p class="shop-proof-kicker">内容带动成交</p><h4>爆款笔记表现</h4><div class="shop-proof-metrics"><b>2.3万+<small>阅读</small></b><b>1500+<small>点赞收藏</small></b><b>50+<small>订单转化</small></b><b>近 ¥5,000<small>GMV</small></b></div><p>围绕艺人热点、圈层话题与商品卖点策划内容，实现从自然曝光、互动沉淀到成交转化的闭环。</p></div></section>`;
      const zh=`<div class="shop-modal-heading"><h3>My Shop · 电商店铺运营</h3>${shopIcons}</div><div class="metric-row"><b>300+ SKU</b><b>1000+ 订单</b><b>GMV 近 ¥100,000</b></div><div class="project-copy shop-copy"><p class="shop-intro">独立运营闲鱼与小红书店铺，聚焦 K-POP 专辑、小卡、吧唧等明星周边，完成从选品采购、内容营销、流量获取到订单履约与数据复盘的全流程运营。</p><div class="shop-module-grid"><section><h4>01｜选品与供应链</h4><p>基于“热度趋势 × 市场流通度 × 用户需求”规划选品，重点布局艺人回归、巡演等高需求节点；结合库存周转控制备货节奏，降低资金占用风险。</p></section><section><h4>02｜内容与流量增长</h4><p>累计发布 70+ 篇内容，围绕艺人热点、圈层话题与商品卖点设计标题和视觉内容，持续提升自然搜索曝光与点击。</p></section></div>${evidence}<div class="shop-module-grid"><section><h4>03｜用户洞察与转化</h4><p>通过订单与行为数据复盘用户特征，识别学生群体为核心用户、周末活跃度更高；据此设计差异化促销，并结合节假日优惠券与平台活动提升转化效率。</p></section><section><h4>04｜经营复盘与风险控制</h4><p>搭建经营数据看板，持续追踪曝光、加购、GMV、取消率等指标；低周转商品以买赠、清仓加速回款，高单价低频商品采用预售或小批量备货。</p></section></div></div>`;
      const en=`<div class="shop-modal-heading"><h3>My Shop · E-commerce Operations</h3>${shopIcons}</div><div class="metric-row"><b>300+ SKUs</b><b>1,000+ orders</b><b>GMV ≈ RMB 100K</b></div><div class="project-copy shop-copy"><p class="shop-intro">Independently operated Xianyu and RED shops for K-pop albums, photo cards and fan merchandise, covering sourcing, content marketing, acquisition, fulfilment and data review end to end.</p><div class="shop-module-grid"><section><h4>01｜Sourcing & Supply</h4><p>Planned assortments through demand, trend and market-circulation signals, with focused inventory around comebacks and tours while managing turnover and capital risk.</p></section><section><h4>02｜Content & Traffic Growth</h4><p>Published 70+ posts around artist moments, community topics and product value, improving organic discovery and click-through.</p></section></div><section class="shop-evidence" aria-label="Top post performance"><figure class="shop-post-frame"><img src="assets/shop-hit-post.png" alt="Top RED post screenshot"></figure><div class="shop-evidence-copy"><p class="shop-proof-kicker">CONTENT TO CONVERSION</p><h4>Top post performance</h4><div class="shop-proof-metrics"><b>23K+<small>views</small></b><b>1.5K+<small>likes & saves</small></b><b>50+<small>orders</small></b><b>≈ ¥5K<small>GMV</small></b></div><p>Content aligned to artist topics and product value created a direct path from organic reach and engagement to conversion.</p></div></section><div class="shop-module-grid"><section><h4>03｜User Insights & Conversion</h4><p>Order and behaviour reviews identified students as the core audience and weekends as higher-activity periods, informing targeted promotions and campaign participation.</p></section><section><h4>04｜Review & Risk Control</h4><p>Tracked exposure, add-to-cart, GMV and cancellations; used clearance for slow stock and pre-orders or small batches for high-value low-frequency products.</p></section></div></div>`;
      openSkillModal(state.lang==='zh'?zh:en, 'shop');
      return;
      {
      const icons=`<span class="shop-app-icons"><img src="assets/app-xiaohongshu.png" alt="小红书"><img src="assets/app-xianyu.png" alt="闲鱼"></span>`;
      const zh=`<div class="shop-modal-heading"><h3>My Shop · 电商店铺运营</h3>${icons}</div><div class="metric-row"><b>1000+ 单</b><b>GMV 约 10 万</b></div><div class="project-copy"><p>基于对 K-pop 市场的理解，负责闲鱼与小红书店铺的选品、内容策划、流量获取与用户转化，实现从内容曝光到成交的全流程运营。</p><h4>流量获取</h4><p>围绕商品卖点与用户兴趣策划图文内容，提升自然搜索曝光与点击率。</p><h4>内容优化</h4><p>持续拆解高赞笔记与高曝光内容，总结高互动特征并迭代内容策略。</p><h4>数据分析</h4><p>搭建店铺经营数据看板，监控曝光、加购、GMV、取消率等核心指标；根据用户特征制定差异化促销策略，结合节假日优惠券与平台活动提报提升转化。</p></div>`;
      const en=`<div class="shop-modal-heading"><h3>My Shop · E-commerce Operations</h3>${icons}</div><div class="metric-row"><b>1,000+ orders</b><b>GMV ≈ RMB 100K</b></div><div class="project-copy"><p>Managed product selection, content, traffic acquisition and conversion across Xianyu and RED based on insight into the K-pop market.</p><h4>Traffic</h4><p>Planned product-led content around user interests to improve organic discovery and clicks.</p><h4>Content</h4><p>Analysed high-performing posts and iterated the content strategy around engagement patterns.</p><h4>Data</h4><p>Built an operating dashboard for exposure, add-to-cart, GMV and cancellation rate, then applied segmented promotions and platform campaigns.</p></div>`;
      openSkillModal(state.lang==='zh'?zh:en);
      }
    } else {
      const covers=escapeCovers.map(x=>`<figure class="film-cell"><span class="film-perf"></span><img src="assets/escape-covers/${x}" alt="Escape to cover"><span class="film-perf"></span></figure>`).join('');
      const intro=state.lang==='zh'?'个人微信公众号运营，分享日常生活与旅行摄影；共发布 8 篇推文，通过朋友圈私域引流与微博联动进行传播。':'Personal WeChat photography account sharing daily life and travel; 8 posts distributed through private social sharing and Weibo.';
      const hint=state.lang==='zh'?'点击按钮或拖动胶卷浏览':'Use the buttons or drag the filmstrip';
      const controls=state.lang==='zh'
        ? '<button class="film-control" type="button" data-film-direction="prev" aria-label="上一张">‹</button><p class="film-swipe-hint">'+hint+'</p><button class="film-control" type="button" data-film-direction="next" aria-label="下一张">›</button>'
        : '<button class="film-control" type="button" data-film-direction="prev" aria-label="Previous cover">‹</button><p class="film-swipe-hint">'+hint+'</p><button class="film-control" type="button" data-film-direction="next" aria-label="Next cover">›</button>';
      openSkillModal(`<div class="escape-modal-heading"><img src="assets/escape-logo.png" alt=""><h3>Escape to...</h3></div><div class="project-copy"><p>${intro}</p></div><div class="project-filmstrip">${covers}</div><div class="film-controls">${controls}</div>`, 'film');
    }
  }));

  if(skillModalClose)skillModalClose.addEventListener('click',closeSkillModal);
  if(skillModal)skillModal.addEventListener('click',e=>{if(e.target===skillModal)closeSkillModal();});

  function initPhotoGallery() {
    if (!photoGrid) return;
    // The gallery belongs only to Skills & Hobbies scene three, after the
    // envelope opens. Its 5 rows follow the approved v6 composition.
    const rows = [
      [
        ['photo (3).JPG', 'wide', '-0.6deg'], ['photo (1).JPG', 'wide', '0.45deg'],
        ['photo (10).jpg', 'wide', '-0.25deg'], ['photo (4).JPG', 'portrait', '0.5deg']
      ],
      [
        ['photo (11).jpg', 'wide', '0.35deg'], ['photo (12).jpg', 'portrait', '-0.45deg'],
        ['photo (5).JPG', 'wide', '0.3deg'], ['photo (2).JPG', 'wide', '-0.25deg']
      ],
      [
        ['photo (14).jpg', 'portrait', '-0.5deg'], ['photo (15).JPG', 'wide', '0.3deg'],
        ['photo (13).jpg', 'portrait', '-0.35deg'], ['photo (17).jpg', 'portrait', '0.48deg']
      ],
      [
        ['photo (16).jpg', 'portrait', '0.4deg'], ['photo (18).JPG', 'portrait', '-0.3deg'],
        ['photo (9).jpg', 'wide', '0.35deg'], ['photo-finale.jpg', 'wide', '-0.48deg']
      ],
      [
        ['photo (6).jpg', 'portrait', '-0.38deg'], ['photo (8).jpg', 'portrait', '0.3deg'],
        ['retouch_2023042210491008.jpg', 'portrait', '-0.25deg'], ['1786598637795.jpg', 'portrait', '0.42deg'],
        ['photo (7).jpg', 'wide', '-0.32deg']
      ]
    ];
    const decor = [
      'pin-blue.png', 'clip-mint.png', 'flower-pink.png', 'button-sky-blue.png',
      'tape-cream.png', 'bow-olive-satin.png', 'button-yellow-face.png', 'heart-pink.png',
      'clip-pink.png', 'button-gingham-blue.png', 'tape-grid-pink.png', 'star-yellow.png',
      'bow-lime-stripe-button.png', 'button-pale-pink-four-hole.png', 'IMG_2276.PNG',
      'button-red-fishbowl.png', 'pin-yellow.png', 'bow-red.png', 'button-purple-star.png',
      'IMG_2277.PNG', 'button-green-cat.png', 'bow-sage.png', 'IMG_2278.PNG',
      'button-brown-polka-dot.png', 'IMG_2280.PNG', 'button-ivory-four-hole.png',
      'IMG_2281.PNG', 'button-pink-four-hole.png', 'IMG_2287.PNG'
    ];
    const placements = ['top-left', 'top-right', 'right-mid', 'bottom-right', 'bottom-left', 'left-mid'];
    let photoIndex = 0;
    let decorIndex = 0;

    rows.forEach((photos, rowIndex) => {
      const row = document.createElement('div');
      row.className = `life-photo-row life-photo-row-${rowIndex + 1}`;
      photos.forEach(([file, orientation, tilt]) => {
        const item = document.createElement('figure');
        item.className = `photo-item photo-${orientation}`;
        item.style.setProperty('--tilt', tilt);
        const img = document.createElement('img');
        img.src = `assets/photos/${file}`;
        img.alt = `生活照片 ${photoIndex + 1}`;
        img.loading = 'lazy';
        item.appendChild(img);

        // Use every supplied transparent embellishment exactly once. The first
        // eight frames receive a second small piece, while clips and bows are
        // deliberately a little larger than buttons/tape.
        const decorCount = photoIndex < 8 ? 2 : 1;
        const usedPlacements = new Set();
        const decorForPhoto = decor.slice(decorIndex, decorIndex + decorCount);
        const hasClip = decorForPhoto.some((name) => name.startsWith('clip-') || ['IMG_2276.PNG', 'IMG_2277.PNG', 'IMG_2281.PNG', 'IMG_2287.PNG'].includes(name));
        for (let d = 0; d < decorCount; d += 1) {
          const name = decor[decorIndex++];
          const decoration = document.createElement('img');
          const isClip = name.startsWith('clip-') || ['IMG_2276.PNG', 'IMG_2277.PNG', 'IMG_2281.PNG', 'IMG_2287.PNG'].includes(name);
          const isBow = name.startsWith('bow-');
          const candidates = hasClip && !isClip
            ? ['bottom-left', 'bottom-right', 'left-mid', 'right-mid']
            : placements;
          const placement = isClip
            ? 'top-center'
            : candidates.find((candidate, offset) => !usedPlacements.has(candidate) && offset >= (photoIndex + d * 2) % candidates.length)
              || candidates.find((candidate) => !usedPlacements.has(candidate));
          usedPlacements.add(placement);
          decoration.className = `photo-decor ${placement}${isClip ? ' decor-clip' : ''}${isBow ? ' decor-bow' : ''}`;
          decoration.src = `assets/photo-decor/${name}`;
          decoration.alt = '';
          decoration.setAttribute('aria-hidden', 'true');
          decoration.loading = 'lazy';
          item.appendChild(decoration);
        }
        row.appendChild(item);
        photoIndex += 1;
      });
      photoGrid.appendChild(row);
    });
  }
  if(lifeEnvelope)lifeEnvelope.addEventListener('click',()=>{
    photoGrid.classList.toggle('open');
    lifeEnvelope.classList.toggle('open');
  });

  // ========================================
  // LABEL PRINTER
  // ========================================
  function printLabel() {
    if (state.labelPrinted) return;
    state.labelPrinted = true;
    labelPrinter.classList.add('printed');

    const lines = labelOutput.querySelectorAll('.label-line');
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('visible');
      }, i * 500);
    });
  }

  if (labelPrinter) {
    labelPrinter.addEventListener('click', printLabel);
  }

  async function copyContact(value, message) {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      const temp=document.createElement('textarea');
      temp.value=value;
      temp.setAttribute('readonly','');
      temp.style.position='fixed';
      temp.style.opacity='0';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
    }
    if (!copyToast) return;
    copyToast.textContent=message;
    copyToast.classList.remove('show');
    copyToast.offsetHeight;
    copyToast.classList.add('show');
    clearTimeout(copyContact.toastTimer);
    copyContact.toastTimer=setTimeout(()=>copyToast.classList.remove('show'),1900);
  }
  $$('.contact-sticker').forEach(btn=>btn.addEventListener('click',()=>{
    const message=state.lang==='zh'?btn.dataset.messageZh:btn.dataset.messageEn;
    copyContact(btn.dataset.copy,message);
  }));
  // Auto-print on first visit to Contact
  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !state.labelPrinted) {
        setTimeout(printLabel, 1500);
      }
    });
  }, { threshold: 0.5 });

  const contactSection = $('#sectionContact');
  if (contactSection) {
    contactObserver.observe(contactSection);
  }

  // ========================================
  // PIXEL NAVIGATION
  // ========================================
  function toggleNav() {
    state.navOpen = !state.navOpen;
    if(pixelNav)pixelNav.classList.toggle('nav-open',state.navOpen);
    if (state.navOpen) {
      navMenu.classList.add('open');
    } else {
      navMenu.classList.remove('open');
    }
  }

  if (pixelAvatar) {
    pixelAvatar.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNav();
    });
  }

  // Nav link clicks
  $$('.nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const index = parseInt(link.dataset.nav);
      goToSection(index);
      // Close nav
      state.navOpen = false;
      navMenu.classList.remove('open');
      if(pixelNav)pixelNav.classList.remove('nav-open');
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (state.navOpen && !e.target.closest('.pixel-nav')) {
      state.navOpen = false;
      navMenu.classList.remove('open');
      if(pixelNav)pixelNav.classList.remove('nav-open');
    }
  });

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================
  document.addEventListener('keydown', (e) => {
    if (expModal.classList.contains('open') || (skillModal && skillModal.classList.contains('open'))) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      goToSection(state.currentSection + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      goToSection(state.currentSection - 1);
    }
  });

  // ========================================
  // WHEEL / SWIPE NAVIGATION
  // ========================================
  let wheelTimeout;
  let wheelIntent = 0;
  let wheelDirection = 0;
  document.addEventListener('wheel', (e) => {
    if (expModal.classList.contains('open') || (skillModal && skillModal.classList.contains('open'))) return;
    if (transitionOverlay.classList.contains('active')) return;
    // Education owns the wheel while the pointer is over its paper. It never
    // hands the same gesture to page navigation, even at either scroll edge.
    if (e.target.closest('.edu-container')) {
      e.stopPropagation();
      return;
    }
    if (state.currentSection === 4 && e.target.closest('.skills-stage')) {
      const scene=+(skillsStage.dataset.scene||0);
      if (Math.abs(e.deltaY) > 28) {
        if (e.deltaY > 0 && scene < 2) setSkillsScene(scene+1);
        else if (e.deltaY < 0 && scene > 0) setSkillsScene(scene-1);
      }
      return;
    }
    // Check if we're scrolling inside another scrollable container
    if (e.target.closest('.skills-container') ||
        e.target.closest('.about-text-area') ||
        e.target.closest('.filmstrip-track') ||
        e.target.closest('.life-photo-wall')) {
      return;
    }

    const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    const direction = Math.sign(delta);
    if (!direction) return;
    if (direction !== wheelDirection) wheelIntent = 0;
    wheelDirection = direction;
    wheelIntent += Math.min(Math.abs(delta), 70);
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => { wheelIntent = 0; wheelDirection = 0; }, 260);
    if (wheelIntent < 150 || state.pageSwitching) return;
    wheelIntent = 0;

    if (state.currentSection === 0 && direction > 0) {
      showAbout();
    } else if (direction > 0) {
      goToSection(state.currentSection + 1);
    } else {
      goToSection(state.currentSection - 1);
    }
  }, { passive: true });

  // Render education award details above the clipped/scrollable content area.
  function showEduTip(el) {
    if (!eduFloatingTip) return;
    eduFloatingTip.textContent = state.lang === 'zh' ? el.dataset.tipZh : el.dataset.tipEn;
    const rect = el.getBoundingClientRect();
    eduFloatingTip.style.left = `${Math.max(190, Math.min(window.innerWidth - 190, rect.left + rect.width / 2))}px`;
    eduFloatingTip.style.top = `${Math.max(90, rect.top)}px`;
    eduFloatingTip.classList.add('visible');
  }
  function hideEduTip() { if (eduFloatingTip) eduFloatingTip.classList.remove('visible'); }
  $$('.edu-tag-hover').forEach((el) => {
    el.addEventListener('mouseenter', () => showEduTip(el));
    el.addEventListener('mouseleave', hideEduTip);
    el.addEventListener('focus', () => showEduTip(el));
    el.addEventListener('blur', hideEduTip);
  });

  // Touch swipe
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', (e) => {
    if (expModal.classList.contains('open')) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (expModal.classList.contains('open')) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < -50) goToSection(state.currentSection + 1);
      else if (dx > 50) goToSection(state.currentSection - 1);
    }
  });

  // ========================================
  // RESIZE HANDLER
  // ========================================
  window.addEventListener('resize', () => {
    state.isDesktop = window.innerWidth > 768;
    if (!state.isDesktop) {
      wrapper.style.transform = 'none';
    } else {
      wrapper.style.transform = `translateX(-${state.currentSection * 100}vw)`;
    }
  });

  // ========================================
  // INIT
  // ========================================
  function init() {
    initPhotoGallery();
    setSkillsScene(0);
    updateUI();

    // Show about text area immediately if already on about section
    if (state.currentSection === 1) {
      if (aboutTextArea) aboutTextArea.classList.add('visible');
      state.aboutShown = true;
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
