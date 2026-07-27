const NOTES_LIST = [
  { id: 'cloud_computing', title: 'Cloud Computing' },
  { id: 'iam', title: 'IAM: Identity Access & Management' },
  { id: 'ec2', title: 'EC2: Virtual Machines' },
  { id: 'ec2_storage', title: 'EC2 Instance Storage' },
  { id: 'elb_asg', title: 'Elastic Load Balancing & Auto Scaling Groups' },
  { id: 's3', title: 'Amazon S3' },
  { id: 'databases', title: 'Databases & Analytics' },
  { id: 'other_compute', title: 'Other Compute Section' },
  { id: 'deploying', title: 'Deploying & Managing Infrastructure' },
  { id: 'global_infrastructure', title: 'Global Infrastructure' },
  { id: 'cloud_integration', title: 'Cloud Integration' },
  { id: 'cloud_monitoring', title: 'Cloud Monitoring' },
  { id: 'vpc', title: 'VPC' },
  { id: 'security_compliance', title: 'Security & Compliance' },
  { id: 'machine_learning', title: 'Machine Learning' },
  { id: 'account_management_billing_support', title: 'Account Management, Billing & Support' },
  { id: 'advanced_identity', title: 'Advanced Identity' },
  { id: 'other_aws_services', title: 'Other AWS Services' },
  { id: 'architecting_and_ecosystem', title: 'AWS Architecting & Ecosystem' }
];

const EXAMS_COUNT = 23;

const state = {
  activeView: 'dashboard',
  notesProgress: {}, // maps module IDs to true/false
  examAttempts: [],  // list of completed exam scorecards
  selectedExamVersion: 'generated', // 'original' or 'generated'
  
  activeExam: {
    id: null,
    mode: 'study', // study (feedback) or exam (timer)
    isGenerated: false,
    questions: [],
    userAnswers: {}, // question index to chosen options
    flagged: new Set(),
    timeRemaining: 90 * 60, // 90 mins limit
    timeSpent: 0,
    timerInterval: null,
    currentIndex: 0,
    isPaused: false
  }
};

function createIconsSafe() {
  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  } else {
    console.warn('Lucide icons library not loaded yet or unavailable.');
  }
}

window.showAppNotification = function(title, message, isConfirm = false, onConfirm = null, onCancel = null) {
  const modal = document.getElementById('custom-alert-modal');
  const titleEl = document.getElementById('custom-alert-title');
  const msgEl = document.getElementById('custom-alert-message');
  const cancelBtn = document.getElementById('custom-alert-cancel-btn');
  const confirmBtn = document.getElementById('custom-alert-confirm-btn');

  if (!modal || !titleEl || !msgEl || !cancelBtn || !confirmBtn) return;

  titleEl.innerText = title;
  msgEl.innerText = message;
  
  if (isConfirm) {
    cancelBtn.style.display = 'inline-flex';
    confirmBtn.innerText = 'Confirm';
    confirmBtn.className = 'btn btn-primary';
  } else {
    cancelBtn.style.display = 'none';
    confirmBtn.innerText = 'OK';
    confirmBtn.className = 'btn btn-primary';
  }

  modal.style.display = 'flex';

  confirmBtn.onclick = () => {
    modal.style.display = 'none';
    if (onConfirm) onConfirm();
  };

  cancelBtn.onclick = () => {
    modal.style.display = 'none';
    if (onCancel) onCancel();
  };
};

document.addEventListener('DOMContentLoaded', () => {
  loadProgressFromStorage();
  initRouting();
  initTheme();
  initEventListeners();
  renderDashboard();
  renderNotesMenu();
  createIconsSafe();
});

function loadProgressFromStorage() {
  const savedNotes = localStorage.getItem('aws_prep_notes_progress');
  if (savedNotes) {
    state.notesProgress = JSON.parse(savedNotes);
  }
  
  const savedAttempts = localStorage.getItem('aws_prep_exam_attempts');
  if (savedAttempts) {
    state.examAttempts = JSON.parse(savedAttempts);
  }
}

function saveProgressToStorage() {
  localStorage.setItem('aws_prep_notes_progress', JSON.stringify(state.notesProgress));
}

function saveAttemptsToStorage() {
  localStorage.setItem('aws_prep_exam_attempts', JSON.stringify(state.examAttempts));
}

function initTheme() {
  const currentTheme = localStorage.getItem('aws_prep_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeUI(currentTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('aws_prep_theme', newTheme);
  updateThemeUI(newTheme);
  
  if (state.activeView === 'mindmap') {
    setupMindmapView();
  }
}

function updateThemeUI(theme) {
  const themeText = document.querySelector('.theme-text');
  if (themeText) {
    themeText.innerText = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }
}

function initRouting() {
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
}

function handleRouteChange() {
  const hash = window.location.hash || '#dashboard';
  const parts = hash.split('?');
  let route = parts[0];
  const params = {};
  
  if (parts[1]) {
    parts[1].split('&').forEach(param => {
      const kv = param.split('=');
      params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
    });
  }
  
  let isDirectExamLink = false;
  let directExamId = null;
  let directExamGenerated = false;

  if (route.startsWith('#practice-exam/')) {
    isDirectExamLink = true;
    directExamId = parseInt(route.split('/').pop());
    directExamGenerated = false;
    route = '#exams';
  } else if (route.startsWith('#generated/practice-exam/')) {
    isDirectExamLink = true;
    directExamId = parseInt(route.split('/').pop());
    directExamGenerated = true;
    route = '#exams';
  }
  
  const viewName = route.replace('#', '');
  state.activeView = viewName;
  
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-view') === viewName) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  document.querySelectorAll('.view-section').forEach(section => {
    section.classList.remove('active');
  });
  
  const activeSection = document.getElementById(`${viewName}-view`);
  if (activeSection) {
    activeSection.classList.add('active');
  }
  
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.remove('mobile-open');
  
  if (viewName === 'dashboard') {
    renderDashboard();
  } else if (viewName === 'notes') {
    setupNotesView(params.id);
  } else if (viewName === 'exams') {
    if (params.attempt) {
      viewPastResult(parseInt(params.attempt));
    } else if (isDirectExamLink) {
      const examMode = params.mode || 'exam';
      startExamFlow(directExamId, examMode, directExamGenerated);
    } else {
      setupExamsView(params.id);
    }
  } else if (viewName === 'syllabus') {
    setupSyllabusView();
  } else if (viewName === 'mindmap') {
    setupMindmapView();
  }
  
  createIconsSafe();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initEventListeners() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebar = document.getElementById('sidebar');
  const chevronIcon = sidebarToggleBtn ? sidebarToggleBtn.querySelector('i') : null;

  function updateNavBarOffset() {
    // Hide sidebars on smaller breakpoints
    if (window.innerWidth <= 900 || window.innerWidth <= 1100) {
      document.documentElement.style.setProperty('--sidebar-w', '0px');
      return;
    }
    const collapsed = sidebar && sidebar.classList.contains('collapsed');
    document.documentElement.style.setProperty('--sidebar-w', collapsed ? '64px' : '260px');
  }

  updateNavBarOffset();
  window.addEventListener('resize', updateNavBarOffset);

  if (sidebarToggleBtn && sidebar) {
    if (localStorage.getItem('aws_prep_sidebar_collapsed') === 'true') {
      sidebar.classList.add('collapsed');
      if (chevronIcon) chevronIcon.setAttribute('data-lucide', 'chevron-right');
    }
    sidebarToggleBtn.addEventListener('click', () => {
      const isCollapsed = sidebar.classList.toggle('collapsed');
      localStorage.setItem('aws_prep_sidebar_collapsed', isCollapsed);
      if (chevronIcon) {
        chevronIcon.setAttribute('data-lucide', isCollapsed ? 'chevron-right' : 'chevron-left');
        createIconsSafe();
      }
      updateNavBarOffset();
    });
  }
  
  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const resetModal = document.getElementById('reset-confirm-modal');
      if (resetModal) {
        resetModal.style.display = 'flex';
        
        document.getElementById('reset-modal-cancel-btn').onclick = () => {
          resetModal.style.display = 'none';
        };
        
        document.getElementById('reset-modal-confirm-btn').onclick = () => {
          resetModal.style.display = 'none';
          localStorage.removeItem('aws_prep_notes_progress');
          localStorage.removeItem('aws_prep_exam_attempts');
          state.notesProgress = {};
          state.examAttempts = [];
          window.location.hash = '#dashboard';
          window.location.reload();
        };
      }
    });
  }
  
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      document.getElementById('sidebar').classList.add('mobile-open');
    });
  }
  
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', () => {
      document.getElementById('sidebar').classList.remove('mobile-open');
    });
  }

  // Slide-up drawer menus on touch devices
  let activeDrawer = null;
  let drawerOpenedAt = 0;

  function openDrawer(panelEl) {
    closeDrawer();
    if (!panelEl) return;
    panelEl.classList.add('drawer-open');
    activeDrawer = panelEl;
    drawerOpenedAt = Date.now();
    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop) backdrop.classList.add('active');
  }

  function closeDrawer() {
    if (activeDrawer) {
      activeDrawer.classList.remove('drawer-open');
      activeDrawer = null;
    }
    drawerOpenedAt = 0;
    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('drawer-is-open');
  }

  // Close on tap-outside — 300ms guard prevents the opening click from instantly closing
  document.addEventListener('click', (e) => {
    if (!activeDrawer) return;
    if (Date.now() - drawerOpenedAt < 300) return;
    if (activeDrawer.contains(e.target)) return;
    if (e.target.closest('#mobile-toggle-exam-nav') ||
        e.target.closest('#mobile-toggle-results-nav') ||
        e.target.closest('#mobile-toggle-notes-sidebar') ||
        e.target.closest('#mobile-toggle-notes-toc')) return;
    closeDrawer();
  });

  const mobileToggleNotesSidebar = document.getElementById('mobile-toggle-notes-sidebar');
  if (mobileToggleNotesSidebar) {
    mobileToggleNotesSidebar.addEventListener('click', () => {
      const panel = document.querySelector('.notes-sidebar');
      panel && panel.classList.contains('drawer-open') ? closeDrawer() : openDrawer(panel);
    });
  }

  const mobileToggleNotesToc = document.getElementById('mobile-toggle-notes-toc');
  if (mobileToggleNotesToc) {
    mobileToggleNotesToc.addEventListener('click', () => {
      const panel = document.querySelector('.notes-toc-panel');
      panel && panel.classList.contains('drawer-open') ? closeDrawer() : openDrawer(panel);
    });
  }

  const mobileToggleExamNav = document.getElementById('mobile-toggle-exam-nav');
  if (mobileToggleExamNav) {
    mobileToggleExamNav.addEventListener('click', () => {
      const panel = document.querySelector('.exam-sidebar-nav');
      panel && panel.classList.contains('drawer-open') ? closeDrawer() : openDrawer(panel);
    });
  }

  const mobileToggleResultsNav = document.getElementById('mobile-toggle-results-nav');
  if (mobileToggleResultsNav) {
    mobileToggleResultsNav.addEventListener('click', () => {
      const panel = document.querySelector('.results-sidebar-nav');
      panel && panel.classList.contains('drawer-open') ? closeDrawer() : openDrawer(panel);
    });
  }

  // Close mobile drawer on item selection
  document.addEventListener('click', (e) => {
    if (!activeDrawer) return;
    if (e.target.closest('.q-nav-bubble') ||
        e.target.closest('.r-nav-bubble') ||
        e.target.closest('.notes-item-btn') ||
        e.target.closest('.toc-links a') ||
        e.target.closest('.toc-link')) {
      setTimeout(closeDrawer, 150);
    }
  });

  const searchInput = document.getElementById('notes-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.notes-item-btn').forEach(btn => {
        const textBtn = btn.querySelector('.unit-title');
        if (textBtn) {
          const text = textBtn.innerText.toLowerCase();
          if (text.includes(query)) {
            btn.style.display = 'flex';
          } else {
            btn.style.display = 'none';
          }
        }
      });
    });
  }
  
  // Track study completion of individual units
  const compCheckbox = document.getElementById('note-completed-checkbox');
  if (compCheckbox) {
    compCheckbox.addEventListener('change', (e) => {
      const hash = window.location.hash || '';
      const parts = hash.split('?id=');
      const activeId = parts[1] ? decodeURIComponent(parts[1]) : null;

      const isValidNote = NOTES_LIST.some(n => n.id === activeId);
      if (activeId && isValidNote) {
        if (e.target.checked) {
          state.notesProgress[activeId] = true;
        } else {
          delete state.notesProgress[activeId];
        }
        saveProgressToStorage();
        renderNotesMenu();
        renderDomainMastery();
        const totalNotes = NOTES_LIST.length;
        const completedNotes = Object.values(state.notesProgress).filter(Boolean).length;
        const pct = totalNotes > 0 ? Math.round((completedNotes / totalNotes) * 100) : 0;
        const pEl = document.getElementById('stats-progress-percent');
        const cEl = document.getElementById('stats-progress-count');
        const bEl = document.getElementById('bento-progress-fill');
        if (pEl) pEl.innerText = `${pct}%`;
        if (cEl) cEl.innerText = `${completedNotes} of ${totalNotes} units completed`;
        if (bEl) bEl.style.width = `${pct}%`;
      }
    });
  }
  
  // Prevent default routing when clicking anchors in notes body
  const notesContainer = document.getElementById('notes-content-placeholder');
  if (notesContainer) {
    notesContainer.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          let targetEl = document.getElementById(targetId) || 
                         document.getElementById(decodeURIComponent(targetId)) ||
                         document.getElementById(targetId.toLowerCase());
                         
          if (!targetEl) {
            const headings = notesContainer.querySelectorAll('h1, h2, h3, h4');
            for (const h of headings) {
              const hId = h.innerText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              if (hId === targetId || hId === targetId.toLowerCase()) {
                targetEl = h;
                break;
              }
            }
          }
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            console.warn('Anchor target not found:', targetId);
          }
        }
      }
    });
  }

  // Handle TOC layout target scrolling
  const tocLinks = document.getElementById('notes-toc-links');
  if (tocLinks) {
    tocLinks.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  }

  // Bind key events for exam review and navigation
  document.addEventListener('keydown', (e) => {
    if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
      return;
    }
    
    const activeExamContainer = document.getElementById('active-exam-container');
    const resContainer = document.getElementById('exam-results-container');
    
    if (activeExamContainer && activeExamContainer.style.display === 'block') {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextQuestion();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevQuestion();
      }
    } else if (resContainer && resContainer.style.display === 'block') {
      const ae = state.activeExam;
      if (!ae || !ae.questions) return;
      
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIdx = currentReviewIndex + 1;
        if (nextIdx < ae.questions.length) showReviewQuestion(nextIdx);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIdx = currentReviewIndex - 1;
        if (prevIdx >= 0) showReviewQuestion(prevIdx);
      }
    }
  });
}

function renderDashboard() {
  const totalNotes = NOTES_LIST.length;
  const completedNotes = Object.values(state.notesProgress).filter(Boolean).length;
  const progressPercent = totalNotes > 0 ? Math.round((completedNotes / totalNotes) * 100) : 0;
  
  document.getElementById('stats-progress-percent').innerText = `${progressPercent}%`;
  document.getElementById('stats-progress-count').innerText = `${completedNotes} of ${totalNotes} units completed`;
  
  const bentoProgress = document.getElementById('bento-progress-fill');
  if (bentoProgress) {
    bentoProgress.style.width = `${progressPercent}%`;
  }
  
  const attempts = state.examAttempts;
  const examsCompleted = attempts.length;
  document.getElementById('stats-exams-completed').innerText = examsCompleted;
  
  let avgScore = 0;
  if (examsCompleted > 0) {
    const totalScore = attempts.reduce((sum, att) => sum + att.score, 0);
    avgScore = Math.round(totalScore / examsCompleted);
  }
  document.getElementById('stats-average-score').innerText = `${avgScore}%`;
  
  // Calculate exam readiness state
  const readinessEl = document.getElementById('stats-readiness');
  if (readinessEl) {
    let readiness = 'Not Ready';
    let subText = 'Complete units & pass practice exams';
    if (progressPercent > 50 && avgScore >= 70) {
      readiness = 'Excellent';
      subText = 'Excellent readiness metrics';
    } else if (progressPercent > 30 && avgScore >= 60) {
      readiness = 'Moderate';
      subText = 'Average readiness. Keep practicing.';
    } else if (progressPercent > 10) {
      readiness = 'Beginning';
      subText = 'Complete more study units';
    }
    readinessEl.innerText = readiness;
    if (readiness === 'Excellent') {
      readinessEl.style.color = 'var(--success-color)';
    } else if (readiness === 'Moderate') {
      readinessEl.style.color = 'var(--warning-color)';
    } else {
      readinessEl.style.color = 'var(--text-primary)';
    }
    const readinessSubEl = document.getElementById('stats-readiness-sub');
    if (readinessSubEl) readinessSubEl.innerText = subText;
  }
  
  const nextNote = NOTES_LIST.find(note => !state.notesProgress[note.id]);
  const contCard = document.getElementById('continue-card');
  if (nextNote) {
    document.getElementById('continue-title').innerText = nextNote.title;
    document.getElementById('continue-btn').href = `#notes?id=${nextNote.id}`;
    document.getElementById('continue-btn').innerText = 'Resume Reading';
    document.getElementById('continue-description').innerText = 'Ready to begin study';
    contCard.style.display = 'flex';
  } else {
    document.getElementById('continue-title').innerText = 'All Materials Completed!';
    document.getElementById('continue-btn').href = '#exams';
    document.getElementById('continue-btn').innerText = 'Go to Practice Tests';
    document.getElementById('continue-description').innerText = 'Awesome job! Put your skills to the test.';
  }
  
  const tbody = document.getElementById('recent-attempts-list');
  if (examsCompleted === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-state">No exam attempts yet. Choose an exam from the Test Center to begin!</td></tr>`;
  } else {
    tbody.innerHTML = attempts.slice().reverse().slice(0, 5).map(att => {
      const isStudy = att.mode === 'study';
      const statusClass = isStudy ? 'study-badge' : (att.passed ? 'pass' : 'fail');
      const statusText = isStudy ? 'Study' : (att.passed ? 'Pass' : 'Fail');
      return `
        <tr class="clickable-row" onclick="window.location.hash='#exams?attempt=${att.id}'" title="Click to view exam results summary" style="cursor: pointer;">
          <td><strong>Practice Exam ${att.examId}</strong></td>
          <td>${new Date(att.date).toLocaleDateString()}</td>
          <td>${att.score}% (${att.correct}/${att.total})</td>
          <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        </tr>
      `;
    }).join('');
  }

  renderDomainMastery();
}

// Maps CLF-C02 syllabus domains to modules
const DOMAIN_MAP = [
  {
    name: 'Cloud Concepts',
    color: 'domain-color-1',
    units: ['cloud_computing', 'global_infrastructure']
  },
  {
    name: 'Security & Compliance',
    color: 'domain-color-2',
    units: ['iam', 'security_compliance', 'advanced_identity']
  },
  {
    name: 'Technology & Services',
    color: 'domain-color-3',
    units: ['ec2', 'ec2_storage', 'elb_asg', 's3', 'databases', 'other_compute',
            'deploying', 'cloud_integration', 'cloud_monitoring', 'vpc',
            'machine_learning', 'other_aws_services', 'architecting_and_ecosystem']
  },
  {
    name: 'Billing & Pricing',
    color: 'domain-color-4',
    units: ['account_management_billing_support']
  }
];

function renderDomainMastery() {
  const container = document.getElementById('domain-mastery-list');
  if (!container) return;

  const fillColors = [
    'var(--accent-color)',
    '#f87171',
    '#60a5fa',
    'var(--success-color)'
  ];

  container.innerHTML = DOMAIN_MAP.map((domain, i) => {
    const total = domain.units.length;
    const done = domain.units.filter(u => !!state.notesProgress[u]).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return `
      <div class="domain-mastery-item">
        <span class="domain-title-compact">${domain.name}</span>
        <div class="mini-progress">
          <div class="mini-fill" style="width: ${pct}%; background: ${fillColors[i]};"></div>
        </div>
        <span style="font-size:11px; color:var(--text-muted); margin-top:2px; display:block; text-align:right;">${pct}% &bull; ${done}/${total} units</span>
      </div>
    `;
  }).join('');
}

function renderNotesMenu() {
  const menuContainer = document.getElementById('notes-menu-list');
  if (!menuContainer) return;
  
  menuContainer.innerHTML = NOTES_LIST.map((note, index) => {
    const isCompleted = !!state.notesProgress[note.id];
    const completedBadge = isCompleted
      ? `<span class="unit-completed-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: -1px; margin-right: 2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>Done</span>`
      : '';
    return `
      <button class="notes-item-btn${isCompleted ? ' completed' : ''}" data-id="${note.id}" onclick="window.location.hash='#notes?id=${note.id}'">
        <div style="display: flex; width: 100%; align-items: center; justify-content: space-between;">
          <span class="unit-number">Unit ${index + 1}</span>
          ${completedBadge}
        </div>
        <span class="unit-title">${note.title}</span>
      </button>
    `;
  }).join('');
}

function setupNotesView(id) {
  renderNotesMenu();
  
  if (!id) {
    const isMobile = window.innerWidth <= 900;

    if (isMobile) {
      // On mobile the sidebar doesn't exist in the flow — show module list inline
      // Also hide the "Mark as Completed" header since no note is open
      const headerActions = document.querySelector('.notes-header-actions');
      if (headerActions) headerActions.style.display = 'none';

      document.getElementById('notes-content-placeholder').innerHTML = `
        <div class="mobile-module-list">
          <p class="mobile-module-list-label">Tap a unit to begin reading, or use the <strong>Select Module</strong> button below</p>
          ${NOTES_LIST.map((note, index) => {
            const isCompleted = !!state.notesProgress[note.id];
            return `<button class="mobile-module-item${isCompleted ? ' completed' : ''}" onclick="window.location.hash='#notes?id=${note.id}'">
              <span class="mobile-module-num">Unit ${index + 1}</span>
              <span class="mobile-module-title">${note.title}</span>
              ${isCompleted ? '<span class="unit-completed-badge">Done</span>' : ''}
            </button>`;
          }).join('')}
        </div>
      `;
    } else {
      document.getElementById('notes-content-placeholder').innerHTML = `
        <div class="empty-notes-state">
          <i data-lucide="book-open"></i>
          <h2>Select a Study Unit</h2>
          <p>Choose a module from the left panel to begin reading the study notes.</p>
        </div>
      `;
    }

    document.getElementById('note-completed-checkbox').checked = false;
    document.getElementById('note-completed-checkbox').disabled = true;
    document.getElementById('active-note-breadcrumb').innerText = 'Select a Unit';
    document.getElementById('notes-toc-links').innerHTML = '';
    lucide.createIcons();
    return;
  }
  
  function stripTopTOCLinks(markdownText) {
    const lines = markdownText.split('\n');
    let firstHeadingIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('# ')) {
        firstHeadingIndex = i;
        break;
      }
    }
    if (firstHeadingIndex === -1) return markdownText;
    
    let currentIndex = firstHeadingIndex + 1;
    let inTOC = false;
    let startIndex = -1;
    let endIndex = -1;
    
    while (currentIndex < lines.length) {
      const line = lines[currentIndex].trim();
      if (line === '') {
        currentIndex++;
        continue;
      }
      const isTOCItem = /^(?:-|\*)\s+\[.*\]\(#.*\)/.test(line) || /^\s*(?:-|\*)/.test(lines[currentIndex]);
      if (isTOCItem) {
        if (!inTOC) {
          inTOC = true;
          startIndex = currentIndex;
        }
        endIndex = currentIndex;
        currentIndex++;
      } else {
        break;
      }
    }
    
    if (startIndex !== -1 && endIndex !== -1) {
      lines.splice(startIndex, (endIndex - startIndex) + 1);
    }
    return lines.join('\n');
  }
  
  document.querySelectorAll('.notes-item-btn').forEach(btn => {
    if (btn.getAttribute('data-id') === id) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  const compCheckbox = document.getElementById('note-completed-checkbox');
  compCheckbox.disabled = false;
  compCheckbox.checked = !!state.notesProgress[id];

  // Restore the header actions bar (may have been hidden on mobile module list view)
  const headerActions = document.querySelector('.notes-header-actions');
  if (headerActions) headerActions.style.display = '';
  
  // Warn if page is loaded locally via file:// protocol
  if (window.location.protocol === 'file:') {
    document.getElementById('notes-content-placeholder').innerHTML = `
      <div class="empty-notes-state">
        <i data-lucide="alert-triangle" style="color: var(--danger-color);"></i>
        <h2>Local file loading blocked</h2>
        <p>Markdown files cannot be loaded directly when the page is opened via <code>file://</code>. Run a local HTTP server and open this page with <strong>http://localhost</strong> instead.</p>
      </div>
    `;
    document.getElementById('notes-toc-links').innerHTML = '';
    return;
  }
  
  const matchedNote = NOTES_LIST.find(n => n.id === id);
  if (matchedNote) {
    document.getElementById('active-note-breadcrumb').innerText = matchedNote.title;
  }
  
  document.getElementById('notes-content-placeholder').innerHTML = `<p class="empty-state">Loading notes content...</p>`;
  
  fetch(`sections/${id}.md`)
    .then(res => {
      if (!res.ok) throw new Error('File not found');
      return res.text();
    })
    .then(text => {
      let cleanMd = text.replace(/^---[\s\S]*?---/, '');
      
      // Localize image paths
      cleanMd = cleanMd.replace(/\.\.\/images\//g, 'images/');
      
      const strippedMd = stripTopTOCLinks(cleanMd);
      
      let html = typeof marked.parse === 'function' ? marked.parse(strippedMd) : marked(strippedMd);
      
      // Wrap tables in nested wrappers to support mobile scroll & rounded corners clipping
      html = html.replace(/<table/g, '<div class="table-container-outer"><div class="responsive-table-wrapper"><table');
      html = html.replace(/<\/table>/g, '</table></div></div>');
      
      document.getElementById('notes-content-placeholder').innerHTML = html;
      
      buildTOC();
    })
    .catch(err => {
      document.getElementById('notes-content-placeholder').innerHTML = `
        <div class="empty-notes-state">
          <i data-lucide="alert-triangle" style="color: var(--danger-color)"></i>
          <h2>Error Loading Notes</h2>
          <p>We could not retrieve the notes for unit <strong>${id}</strong>. Ensure the file is at sections/${id}.md</p>
        </div>
      `;
      createIconsSafe();
    });
}

function buildTOC() {
  const container = document.getElementById('notes-content-placeholder');
  const headings = container.querySelectorAll('h1, h2, h3, h4');
  const tocContainer = document.getElementById('notes-toc-links');
  
  if (!tocContainer) return;
  if (headings.length === 0) {
    tocContainer.innerHTML = '<span style="color: var(--text-muted); font-size: 13px;">No headings on this page</span>';
    return;
  }
  
  // Assign search-friendly IDs to headings
  headings.forEach((heading) => {
    const id = heading.innerText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    heading.id = id;
  });
  
  let tocHTML = '';
  const tocHeadings = container.querySelectorAll('h2, h3, h4');
  tocHeadings.forEach((heading) => {
    const id = heading.id;
    const tag = heading.tagName.toLowerCase();
    const hClass = tag === 'h3' ? 'toc-link h3-link' : (tag === 'h4' ? 'toc-link h4-link' : 'toc-link');
    tocHTML += `<a href="#${id}" class="${hClass}">${heading.innerText}</a>`;
  });
  
  tocContainer.innerHTML = tocHTML || '<span style="color: var(--text-muted); font-size: 13px;">No headings</span>';
}

function setupExamsView(id) {
  if (id) {
    return;
  }
  
  document.getElementById('exams-list-container').style.display = 'block';
  document.getElementById('active-exam-container').style.display = 'none';
  document.getElementById('exam-results-container').style.display = 'none';
  
  const examsGrid = document.getElementById('exams-grid');
  let gridHTML = '';
  
  const isGen = state.selectedExamVersion === 'generated';
  const count = isGen ? 10 : EXAMS_COUNT;
  
  // Update welcome header badge and text
  const examsPillCount = document.getElementById('exams-pill-count');
  if (examsPillCount) {
    examsPillCount.innerText = count;
  }
  
  for (let i = 1; i <= count; i++) {
    const attempts = state.examAttempts.filter(att => att.examId === i && !!att.isGenerated === isGen);
    let statusDotClass = '';
    let statusText = 'Not Started';
    let bestScoreText = '';
    let historyHTML = '';
    
    if (attempts.length > 0) {
      const highestScore = Math.max(...attempts.map(att => att.score));
      const hasPassed = highestScore >= 70;
      statusDotClass = hasPassed ? 'passed' : 'failed';
      statusText = hasPassed ? 'Passed' : 'Failed';
      bestScoreText = `Best: ${highestScore}% &bull; ${attempts.length} attempt${attempts.length > 1 ? 's' : ''}`;

      const recent = attempts.slice().reverse().slice(0, 3);
      historyHTML = `
        <div class="exam-history">
          <span class="exam-history-label">Recent attempts</span>
          ${recent.map((att, idx) => {
            const modeLabel = att.mode === 'study' ? 'Study' : 'Exam';
            const passClass = att.mode === 'study' ? 'study' : (att.passed ? 'pass' : 'fail');
            const dateStr = new Date(att.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            return `
              <div class="exam-history-row">
                <span class="exam-history-date">${dateStr}</span>
                <span class="exam-history-mode ${passClass}">${modeLabel}</span>
                <span class="exam-history-score">${att.score}%</span>
                <button class="btn-view-result" onclick="viewPastResult(${att.id})" title="View result">
                  <i data-lucide="eye"></i>
                </button>
              </div>`;
          }).join('')}
        </div>`;
    }
    
    const displayName = `Practice Exam ${i}`;
    gridHTML += `
      <div class="exam-panel-card">
        <div class="exam-panel-title-row">
          <h3>${displayName}</h3>
          <span class="exam-status-dot ${statusDotClass}" title="${statusText}"></span>
        </div>
        <div class="exam-panel-details">
          <span class="exam-detail-type">CCP Simulation</span>
          <span class="exam-detail-score">${bestScoreText || 'No attempts yet'}</span>
        </div>
        ${historyHTML}
        <div class="exam-actions-row">
          <button class="btn btn-secondary" onclick="startExamFlow(${i}, 'study', ${isGen})">Study</button>
          <button class="btn btn-primary" onclick="startExamFlow(${i}, 'exam', ${isGen})">Exam Mode</button>
        </div>
      </div>
    `;
  }
  
  examsGrid.innerHTML = gridHTML;
  createIconsSafe();
}

window.switchExamVersion = function(version) {
  state.selectedExamVersion = version;
  setupExamsView();
};

// Load past results from local scorecard
window.viewPastResult = function(attemptId) {
  const attempt = state.examAttempts.find(a => a.id === attemptId);
  if (!attempt) return;

  document.getElementById('exams-list-container').style.display = 'none';
  document.getElementById('active-exam-container').style.display = 'none';
  document.getElementById('exam-results-container').style.display = 'none';

  const resContainer = document.getElementById('exam-results-container');
  resContainer.style.display = 'block';
  const body = document.getElementById('results-active-question-details');
  if (body) body.innerHTML = '<p class="empty-state">Loading past result…</p>';

  const path = attempt.isGenerated 
    ? `practice-exam-generated/practice-exam-${attempt.examId}.md` 
    : `practice-exam/practice-exam-${attempt.examId}.md`;

  fetch(path)
    .then(res => { if (!res.ok) throw new Error(); return res.text(); })
    .then(text => {
      const questions = parseExamMarkdown(text);
      // Rebuild dummy activeExam data block for results navigation renderer
      state.activeExam = {
        id: attempt.examId,
        mode: attempt.mode,
        isGenerated: !!attempt.isGenerated,
        questions: questions,
        userAnswers: {},
        flagged: new Set(),
        timeRemaining: 0,
        timeSpent: attempt.timeSpent,
        timerInterval: null,
        currentIndex: 0,
        isPaused: false
      };
      renderExamResults(attempt);
    })
    .catch(() => {
      if (body) body.innerHTML = '<p class="empty-state" style="color:var(--danger-color)">Could not load exam questions.</p>';
    });
};

window.startExamFlow = function(examId, mode, isGenerated = false) {
  if (state.activeExam.timerInterval) {
    clearInterval(state.activeExam.timerInterval);
  }
  
  document.getElementById('exams-list-container').style.display = 'none';
  document.getElementById('exam-results-container').style.display = 'none';
  document.getElementById('active-exam-container').style.display = 'block';
  
  const displayTitle = `Practice Exam ${examId}`;
  document.getElementById('active-exam-title').innerText = displayTitle;
  
  const modeBadge = document.getElementById('exam-mode-badge');
  modeBadge.innerText = mode === 'study' ? 'Study Mode' : 'Exam Mode';
  modeBadge.style.backgroundColor = mode === 'study' ? 'var(--accent-glow)' : 'var(--primary-blue-glow)';
  modeBadge.style.color = mode === 'study' ? 'var(--accent-color)' : 'var(--primary-blue)';
  
  document.getElementById('exam-pause-btn').style.display = mode === 'study' ? 'none' : 'block';
  
  document.getElementById('current-question-text').innerHTML = 'Parsing practice exam questions. Please wait...';
  document.getElementById('current-options-list').innerHTML = '';
  document.getElementById('question-nav-grid').innerHTML = '';
  
  if (window.location.protocol === 'file:') {
    document.getElementById('current-question-text').innerHTML = `
      <div style="color: var(--danger-color); text-align: center; padding: 20px;">
        <h3>Local file loading blocked</h3>
        <p>Practice exam markdown cannot be loaded via <code>file://</code>. Run a local HTTP server and open this page using <strong>http://localhost</strong>.</p>
      </div>
    `;
    return;
  }
  
  const path = isGenerated 
    ? `practice-exam-generated/practice-exam-${examId}.md` 
    : `practice-exam/practice-exam-${examId}.md`;

  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error('Exam file not found');
      return res.text();
    })
    .then(text => {
      const questions = parseExamMarkdown(text);
      if (questions.length === 0) {
        throw new Error('No questions successfully parsed');
      }
      
      state.activeExam = {
        id: examId,
        mode: mode,
        isGenerated: isGenerated,
        questions: questions,
        userAnswers: {},
        flagged: new Set(),
        timeRemaining: 90 * 60,
        timeSpent: 0,
        timerInterval: null,
        currentIndex: 0,
        isPaused: false
      };
      
      initActiveExamUI();
    })
    .catch(err => {
      console.error(err);
      document.getElementById('current-question-text').innerHTML = `
        <div style="color: var(--danger-color); text-align: center; padding: 20px;">
          <h3>Error Loading Exam</h3>
          <p>We failed to load practice-exam-${examId}.md. Please check the file exists.</p>
          <button class="btn btn-secondary" onclick="window.location.hash='#exams'" style="margin-top: 15px;">Back to Exam List</button>
        </div>
      `;
    });
};

function parseExamMarkdown(text) {
  let cleanText = text.replace(/^---[\s\S]*?---/, '');
  
  // Split file contents into individual question blocks starting with a number and period
  const lines = cleanText.split('\n');
  const questionBlocks = [];
  let currentBlock = null;
  
  lines.forEach(line => {
    const qMatch = line.match(/^\s*(\d+)\.\s*(.*)/);
    if (qMatch) {
      if (currentBlock) {
        questionBlocks.push(currentBlock);
      }
      currentBlock = {
        num: parseInt(qMatch[1]),
        rawLines: [qMatch[2]],
        optionsRaw: [],
        detailsRaw: []
      };
    } else if (currentBlock) {
      currentBlock.rawLines.push(line);
    }
  });
  
  if (currentBlock) {
    questionBlocks.push(currentBlock);
  }
  
  const parsedQuestions = questionBlocks.map((block, idx) => {
    let questionTextLines = [];
    let insideDetails = false;
    
    block.rawLines.forEach(line => {
      const trimmed = line.trim();
      
      if (trimmed.includes('<details')) {
        insideDetails = true;
        block.detailsRaw.push(line);
      } else if (trimmed.includes('</details>')) {
        insideDetails = false;
        block.detailsRaw.push(line);
      } else if (insideDetails) {
        block.detailsRaw.push(line);
      } else if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        block.optionsRaw.push(line);
      } else {
        questionTextLines.push(line);
      }
    });
    
    const questionText = questionTextLines.join(' ').trim();
    const options = {};
    block.optionsRaw.forEach(optLine => {
      const optMatch = optLine.match(/^\s*[-\*]\s*([A-Z])\.\s*(.*)/);
      if (optMatch) {
        options[optMatch[1]] = optMatch[2].trim();
      }
    });
    
    const detailsContent = block.detailsRaw.join('\n');
    let correctAnswers = [];
    const ansMatch = detailsContent.match(/Correct\s+Answer:\s*([A-Z,\s]+)/i) || 
                     detailsContent.match(/Correct\s+answer:\s*([A-Z,\s]+)/i);
    if (ansMatch) {
      correctAnswers = ansMatch[1].match(/[A-Z]/g) || [];
    }
    
    let explanation = '';
    const expMatch = detailsContent.match(/Explanation:\s*([\s\S]*?)(?=<\/details>|$)/i);
    if (expMatch) {
      explanation = expMatch[1].trim();
    }
    
    return {
      index: idx,
      num: block.num,
      questionText: questionText,
      options: options,
      correctAnswers: correctAnswers,
      explanation: explanation
    };
  });
  
  return parsedQuestions;
}

function initActiveExamUI() {
  const ae = state.activeExam;
  
  const navGrid = document.getElementById('question-nav-grid');
  navGrid.innerHTML = ae.questions.map((q, idx) => {
    return `<button class="q-nav-bubble" id="q-nav-bubble-${idx}" onclick="jumpToQuestion(${idx})">${q.num}</button>`;
  }).join('');
  
  if (ae.mode === 'exam') {
    document.getElementById('exam-timer').style.display = 'block';
    startTimer();
  } else {
    document.getElementById('exam-timer').style.display = 'none';
  }
  
  ae.currentIndex = 0;
  showQuestion(0);
  
  document.getElementById('quiz-prev-btn').onclick = prevQuestion;
  document.getElementById('quiz-next-btn').onclick = nextQuestion;
  document.getElementById('quiz-check-btn').onclick = checkQuestionAnswer;
  document.getElementById('flag-question-btn').onclick = toggleFlag;

  const mobPrev = document.getElementById('quiz-prev-btn-mobile');
  const mobNext = document.getElementById('quiz-next-btn-mobile');
  if (mobPrev) mobPrev.onclick = prevQuestion;
  if (mobNext) mobNext.onclick = nextQuestion;
  
  const quizSubmitBtn = document.getElementById('quiz-submit-btn');
  if (quizSubmitBtn) {
    quizSubmitBtn.onclick = openSubmitConfirmModal;
  }
  
  document.getElementById('header-submit-btn').onclick = openSubmitConfirmModal;
  document.getElementById('exam-exit-btn').onclick = exitExamSession;
}

function startTimer() {
  const ae = state.activeExam;
  const display = document.getElementById('exam-timer');
  
  if (ae.timerInterval) clearInterval(ae.timerInterval);
  
  ae.timerInterval = setInterval(() => {
    if (ae.isPaused) return;
    
    ae.timeRemaining--;
    ae.timeSpent++;
    
    const mins = Math.floor(ae.timeRemaining / 60);
    const secs = ae.timeRemaining % 60;
    display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    if (ae.timeRemaining <= 0) {
      clearInterval(ae.timerInterval);
      showAppNotification('Time is Up', 'Time is up! Your exam will be submitted automatically.', false, () => {
        submitActiveExam();
      });
    }
  }, 1000);
  
  const pauseBtn = document.getElementById('exam-pause-btn');
  pauseBtn.onclick = () => {
    ae.isPaused = !ae.isPaused;
    const icon = document.getElementById('pause-icon');
    if (ae.isPaused) {
      icon.setAttribute('data-lucide', 'play');
      display.style.opacity = '0.5';
    } else {
      icon.setAttribute('data-lucide', 'pause');
      display.style.opacity = '1';
    }
    createIconsSafe();
  };
}

function showQuestion(index) {
  const ae = state.activeExam;
  ae.currentIndex = index;
  
  const q = ae.questions[index];
  
  document.getElementById('current-question-num').innerText = `Question ${q.num} of ${ae.questions.length}`;
  
  const flagBtn = document.getElementById('flag-question-btn');
  if (ae.flagged.has(index)) {
    flagBtn.classList.add('active');
  } else {
    flagBtn.classList.remove('active');
  }
  
  document.querySelectorAll('.q-nav-bubble').forEach(btn => btn.classList.remove('active'));
  const activeBubble = document.getElementById(`q-nav-bubble-${index}`);
  if (activeBubble) activeBubble.classList.add('active');
  
  document.getElementById('current-question-text').innerHTML = q.questionText;
  
  // Check if question asks for multiple choices
  const isMultiChoice = q.questionText.toLowerCase().includes('two') || q.correctAnswers.length > 1;
  
  const optionsList = document.getElementById('current-options-list');
  optionsList.innerHTML = Object.entries(q.options).map(([letter, text]) => {
    const isSelected = (ae.userAnswers[index] || []).includes(letter);
    const selClass = isSelected ? 'selected' : '';
    return `
      <div class="option-choice-wrapper ${selClass}" data-letter="${letter}" onclick="selectOption('${letter}', ${isMultiChoice})">
        <div class="option-input-btn"></div>
        <span class="option-text"><strong>${letter}.</strong> ${text}</span>
      </div>
    `;
  }).join('');
  
  document.getElementById('practice-explanation').style.display = 'none';
  
  const isFirst = index === 0;
  const isLast = index === ae.questions.length - 1;

  document.getElementById('quiz-prev-btn').disabled = isFirst;
  const mobPrev = document.getElementById('quiz-prev-btn-mobile');
  if (mobPrev) mobPrev.disabled = isFirst;

  if (isLast) {
    document.getElementById('quiz-next-btn').style.display = 'none';
    const mobNext = document.getElementById('quiz-next-btn-mobile');
    if (mobNext) { mobNext.disabled = true; mobNext.style.opacity = '0.4'; }
  } else {
    document.getElementById('quiz-next-btn').style.display = 'inline-flex';
    const mobNext = document.getElementById('quiz-next-btn-mobile');
    if (mobNext) { mobNext.disabled = false; mobNext.style.opacity = ''; }
  }
  
  const checkBtn = document.getElementById('quiz-check-btn');
  if (ae.mode === 'study') {
    checkBtn.style.display = 'inline-flex';
  } else {
    checkBtn.style.display = 'none';
  }
}

window.jumpToQuestion = function(index) {
  showQuestion(index);
};

function prevQuestion() {
  const ae = state.activeExam;
  if (ae.currentIndex > 0) {
    showQuestion(ae.currentIndex - 1);
  }
}

function nextQuestion() {
  const ae = state.activeExam;
  if (ae.currentIndex < ae.questions.length - 1) {
    showQuestion(ae.currentIndex + 1);
  }
}

window.selectOption = function(letter, isMultiChoice) {
  const ae = state.activeExam;
  const index = ae.currentIndex;
  
  if (!ae.userAnswers[index]) {
    ae.userAnswers[index] = [];
  }
  
  if (isMultiChoice) {
    const listIndex = ae.userAnswers[index].indexOf(letter);
    if (listIndex > -1) {
      ae.userAnswers[index].splice(listIndex, 1);
    } else {
      ae.userAnswers[index].push(letter);
    }
  } else {
    ae.userAnswers[index] = [letter];
  }
  
  document.querySelectorAll('.option-choice-wrapper').forEach(wrapper => {
    const l = wrapper.getAttribute('data-letter');
    if (ae.userAnswers[index].includes(l)) {
      wrapper.classList.add('selected');
    } else {
      wrapper.classList.remove('selected');
    }
  });
  
  const bubble = document.getElementById(`q-nav-bubble-${index}`);
  if (ae.userAnswers[index].length > 0) {
    bubble.classList.add('answered');
  } else {
    bubble.classList.remove('answered');
  }
}

function toggleFlag() {
  const ae = state.activeExam;
  const idx = ae.currentIndex;
  const flagBtn = document.getElementById('flag-question-btn');
  const bubble = document.getElementById(`q-nav-bubble-${idx}`);
  
  if (ae.flagged.has(idx)) {
    ae.flagged.delete(idx);
    flagBtn.classList.remove('active');
    bubble.classList.remove('flagged');
  } else {
    ae.flagged.add(idx);
    flagBtn.classList.add('active');
    bubble.classList.add('flagged');
  }
}

function checkQuestionAnswer() {
  const ae = state.activeExam;
  const idx = ae.currentIndex;
  const q = ae.questions[idx];
  const userAnswers = ae.userAnswers[idx] || [];
  
  if (userAnswers.length === 0) {
    showAppNotification('Selection Required', 'Please select an option first before checking the answer.');
    return;
  }
  
  const isCorrect = userAnswers.length === q.correctAnswers.length &&
                    q.correctAnswers.every(ans => userAnswers.includes(ans));
  
  document.querySelectorAll('.option-choice-wrapper').forEach(wrapper => {
    const l = wrapper.getAttribute('data-letter');
    const isChosen = userAnswers.includes(l);
    const isAnswer = q.correctAnswers.includes(l);
    
    wrapper.classList.remove('selected');
    if (isAnswer) {
      wrapper.classList.add('graded-correct');
    } else if (isChosen) {
      wrapper.classList.add('graded-incorrect');
    }
  });
  
  const expBlock = document.getElementById('practice-explanation');
  const statusEl = document.getElementById('explanation-status');
  const textEl = document.getElementById('explanation-text-content');
  
  statusEl.innerText = isCorrect ? 'Correct!' : 'Incorrect';
  statusEl.className = `explanation-status ${isCorrect ? 'correct' : 'incorrect'}`;
  
  textEl.innerHTML = `
    <p><strong>Correct answer:</strong> ${q.correctAnswers.join(', ')}</p>
    ${q.explanation ? `<p>${q.explanation}</p>` : ''}
  `;
  
  expBlock.style.display = 'block';
}

function openSubmitConfirmModal() {
  const ae = state.activeExam;
  const modal = document.getElementById('submit-modal');
  
  const total = ae.questions.length;
  const answered = Object.keys(ae.userAnswers).filter(k => ae.userAnswers[k].length > 0).length;
  
  document.getElementById('modal-answered-count').innerText = answered;
  document.getElementById('modal-total-count').innerText = total;
  
  modal.style.display = 'flex';
  
  document.getElementById('modal-cancel-btn').onclick = () => {
    modal.style.display = 'none';
  };
  document.getElementById('modal-submit-confirm-btn').onclick = () => {
    modal.style.display = 'none';
    submitActiveExam();
  };
}

function submitActiveExam() {
  const ae = state.activeExam;
  
  if (ae.timerInterval) clearInterval(ae.timerInterval);
  
  let correctCount = 0;
  ae.questions.forEach((q, idx) => {
    const userAns = ae.userAnswers[idx] || [];
    const isCorrect = userAns.length === q.correctAnswers.length &&
                      q.correctAnswers.every(ans => userAns.includes(ans));
    if (isCorrect) correctCount++;
  });
  
  const total = ae.questions.length;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const passed = percentage >= 70;
  
  const attempt = {
    id: Date.now(),
    examId: ae.id,
    mode: ae.mode,
    isGenerated: ae.isGenerated || false,
    score: percentage,
    correct: correctCount,
    total: total,
    date: new Date().toISOString(),
    timeSpent: ae.timeSpent,
    passed: passed
  };
  
  state.examAttempts.push(attempt);
  saveAttemptsToStorage();
  
  renderExamResults(attempt);
}

let currentReviewIndex = 0;

function renderExamResults(attempt) {
  document.getElementById('active-exam-container').style.display = 'none';
  const resContainer = document.getElementById('exam-results-container');
  resContainer.style.display = 'block';

  const isStudy = attempt.mode === 'study';
  const ae = state.activeExam;

  const displayNamePrefix = `Practice Exam ${attempt.examId}`;
  document.getElementById('results-exam-name').innerText = isStudy
    ? `${displayNamePrefix} — Study Summary`
    : `${displayNamePrefix} — Exam Results`;
  document.getElementById('results-date-string').innerText =
    `Completed on ${new Date(attempt.date).toLocaleString()}`;

  const pct = attempt.score;
  const pctEl = document.getElementById('results-score-percent');
  const verdictEl = document.getElementById('results-pass-fail');
  const ringFill = document.getElementById('score-ring-fill');
  const ringWrap = document.querySelector('.score-ring-wrap');

  pctEl.innerText = `${pct}%`;

  if (isStudy) {
    verdictEl.innerText = 'REVIEW';
    verdictEl.className = 'score-ring-verdict study';
    ringWrap.setAttribute('data-verdict', 'study');
    if (ringFill) ringFill.style.stroke = 'var(--accent-color)';
  } else {
    verdictEl.innerText = attempt.passed ? 'PASS' : 'FAIL';
    verdictEl.className = `score-ring-verdict ${attempt.passed ? 'pass' : 'fail'}`;
    ringWrap.setAttribute('data-verdict', attempt.passed ? 'pass' : 'fail');
    if (ringFill) {
      ringFill.style.stroke = attempt.passed ? 'var(--success-color)' : 'var(--danger-color)';
    }
  }

  // Animate radial progress border
  if (ringFill) {
    const offset = 314 - (314 * pct) / 100;
    setTimeout(() => { ringFill.style.strokeDashoffset = offset; }, 80);
  }

  document.getElementById('results-correct-count').innerText = attempt.correct;
  document.getElementById('results-incorrect-count').innerText = attempt.total - attempt.correct;
  document.getElementById('results-total-count').innerText = attempt.total;
  const mins = Math.floor(attempt.timeSpent / 60);
  const secs = attempt.timeSpent % 60;
  document.getElementById('results-time-spent').innerText = `${mins}m ${secs}s`;

  const retakeBtn = document.getElementById('results-retake-btn');
  if (retakeBtn) {
    retakeBtn.onclick = () => startExamFlow(attempt.examId, attempt.mode, !!attempt.isGenerated);
  }

  const backBtn = document.getElementById('results-back-exams-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#exams';
      handleRouteChange();
    });
  }

  // Focus review on first incorrect response
  let firstShowIdx = 0;
  for (let i = 0; i < ae.questions.length; i++) {
    const userAns = ae.userAnswers[i] || [];
    const q = ae.questions[i];
    const ok = userAns.length === q.correctAnswers.length &&
               q.correctAnswers.every(a => userAns.includes(a));
    if (!ok) { firstShowIdx = i; break; }
  }

  populateResultsNavGrid('all');
  showReviewQuestion(firstShowIdx);

  const filters = document.querySelectorAll('.results-review-controls .filter-buttons button');
  filters.forEach(btn => {
    btn.onclick = (e) => {
      filters.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      populateResultsNavGrid(e.target.getAttribute('data-filter'));
    };
  });

  createIconsSafe();
}

function populateResultsNavGrid(filter) {
  const ae = state.activeExam;
  const grid = document.getElementById('results-nav-grid');
  if (!grid) return;
  
  let gridHTML = '';
  ae.questions.forEach((q, idx) => {
    const userAns = ae.userAnswers[idx] || [];
    const isCorrect = userAns.length === q.correctAnswers.length &&
                      q.correctAnswers.every(ans => userAns.includes(ans));
    const isFlagged = ae.flagged.has(idx);
    
    if (filter === 'incorrect' && isCorrect) return;
    if (filter === 'flagged' && !isFlagged) return;
    
    const correctClass = isCorrect ? 'correct' : 'incorrect';
    const flaggedClass = isFlagged ? 'flagged' : '';
    const activeClass = idx === currentReviewIndex ? 'active' : '';
    
    gridHTML += `
      <button class="r-nav-bubble ${correctClass} ${flaggedClass} ${activeClass}" 
              id="r-nav-bubble-${idx}" 
              onclick="showReviewQuestion(${idx})">
        ${q.num}
      </button>
    `;
  });
  
  grid.innerHTML = gridHTML || '<p style="grid-column: 1/-1; font-size: 13px; color: var(--text-muted); text-align: center; padding: 20px;">No matching questions</p>';
}

window.showReviewQuestion = function(index) {
  currentReviewIndex = index;
  const ae = state.activeExam;
  const q = ae.questions[index];
  const userAns = ae.userAnswers[index] || [];

  document.querySelectorAll('.r-nav-bubble').forEach(b => b.classList.remove('active'));
  const bubble = document.getElementById(`r-nav-bubble-${index}`);
  if (bubble) {
    bubble.classList.add('active');
    bubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  const isCorrect = userAns.length === q.correctAnswers.length &&
                    q.correctAnswers.every(a => userAns.includes(a));

  const optsHTML = Object.entries(q.options).map(([letter, text]) => {
    const isChosen = userAns.includes(letter);
    const isAnswer = q.correctAnswers.includes(letter);
    let cls = '';
    let icon = '';
    if (isAnswer) {
      cls = 'graded-correct';
      icon = `<span class="option-grade-icon correct-icon"><i data-lucide="check"></i></span>`;
    } else if (isChosen) {
      cls = 'graded-incorrect';
      icon = `<span class="option-grade-icon incorrect-icon"><i data-lucide="x"></i></span>`;
    }
    return `
      <div class="option-choice-wrapper ${cls}" style="cursor:default;">
        <div class="option-input-btn"></div>
        <span class="option-text"><strong>${letter}.</strong> ${text}</span>
        ${icon}
      </div>`;
  }).join('');

  const chosenText = userAns.length > 0 ? userAns.join(', ') : '<em>No answer selected</em>';

  const detailPanel = document.getElementById('results-active-question-details');
  if (!detailPanel) return;

  detailPanel.className = `results-question-frame ${isCorrect ? 'correct-highlight' : 'incorrect-highlight'}`;
  detailPanel.innerHTML = `
    <div class="rq-header">
      <div class="rq-header-left">
        <span class="rq-num">Question ${q.num} <span class="rq-of">of ${ae.questions.length}</span></span>
        ${ae.flagged.has(index) ? `<span class="rq-flagged-badge"><i data-lucide="flag"></i> Flagged</span>` : ''}
      </div>
      <span class="rq-verdict ${isCorrect ? 'correct' : 'incorrect'}">
        <i data-lucide="${isCorrect ? 'check-circle' : 'x-circle'}"></i>
        ${isCorrect ? 'Correct' : 'Incorrect'}
      </span>
    </div>

    <div class="rq-question-text">${q.questionText}</div>

    <div class="options-container rq-options">${optsHTML}</div>

    <div class="rq-answer-block">
      <div class="rq-answer-row">
        <span class="rq-answer-label">Your answer</span>
        <span class="rq-answer-value ${isCorrect ? 'correct' : 'incorrect'}">${chosenText}</span>
      </div>
      <div class="rq-answer-row">
        <span class="rq-answer-label">Correct answer</span>
        <span class="rq-answer-value correct">${q.correctAnswers.join(', ')}</span>
      </div>
      ${q.explanation ? `<div class="rq-explanation"><i data-lucide="info"></i><span>${q.explanation}</span></div>` : ''}
    </div>
  `;

  const navBar = document.getElementById('results-review-nav-buttons');
  const counter = document.getElementById('results-nav-counter');
  if (navBar) {
    navBar.style.display = 'flex';
    if (counter) counter.innerText = `${index + 1} / ${ae.questions.length}`;

    const prevBtn  = document.getElementById('results-prev-btn');
    const nextBtn  = document.getElementById('results-next-btn');
    const prevMob  = document.getElementById('results-prev-btn-mobile');
    const nextMob  = document.getElementById('results-next-btn-mobile');

    const goTo = (i) => {
      showReviewQuestion(i);
    };

    [prevBtn, prevMob].forEach(btn => {
      if (!btn) return;
      if (index === 0) {
        btn.setAttribute('disabled', 'true');
      } else {
        btn.removeAttribute('disabled');
        btn.onclick = () => goTo(index - 1);
      }
    });

    [nextBtn, nextMob].forEach(btn => {
      if (!btn) return;
      if (index === ae.questions.length - 1) {
        btn.setAttribute('disabled', 'true');
      } else {
        btn.removeAttribute('disabled');
        btn.onclick = () => goTo(index + 1);
      }
    });
  }

  createIconsSafe();
};

function exitExamSession() {
  showAppNotification(
    'Exit Exam?',
    'Are you sure you want to exit the exam? Your current progress will be lost.',
    true,
    () => {
      if (state.activeExam.timerInterval) {
        clearInterval(state.activeExam.timerInterval);
      }
      window.location.hash = '#exams';
      handleRouteChange();
    }
  );
}

function setupSyllabusView() {
  const container = document.getElementById('syllabus-container');
  container.innerHTML = '<p class="empty-state">Loading syllabus domains...</p>';
  
  fetch('study-guide.md')
    .then(res => {
      if (!res.ok) throw new Error('Guide file not found');
      return res.text();
    })
    .then(text => {
      const domains = parseSyllabusMarkdown(text);
      
      container.innerHTML = domains.map((domain, idx) => {
        const letter = String.fromCharCode(65 + idx);
        
        const subtopicsHTML = domain.subtopics.map(sub => {
          const listItems = sub.bullets.map(b => `<li>${b}</li>`).join('');
          return `
            <div class="subtopic-item">
              <h4>${sub.title}</h4>
              <ul>${listItems}</ul>
            </div>
          `;
        }).join('');
        
        return `
          <div class="domain-accordion" id="domain-accordion-${idx}">
            <div class="domain-header" onclick="toggleDomainAccordion(${idx})">
              <div class="domain-title-group">
                <div class="domain-letter-badge">${idx + 1}</div>
                <div class="domain-text">
                  <h3>Domain ${idx + 1}: ${domain.title}</h3>
                  <span>Weight: ${domain.weight || 'N/A'}</span>
                </div>
              </div>
              <i data-lucide="chevron-down"></i>
            </div>
            <div class="domain-content">
              ${subtopicsHTML}
            </div>
          </div>
        `;
      }).join('');
      createIconsSafe();
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = `<p class="empty-state" style="color: var(--danger-color);">Error loading syllabus domains from study-guide.md</p>`;
    });
}

// Parses exam domains from structured guide
function parseSyllabusMarkdown(text) {
  const domains = [];
  const sections = text.split(/\n##\s+Domain\s+\d+:\s*/);
  
  sections.slice(1).forEach(sectionText => {
    const lines = sectionText.split('\n');
    const title = lines[0].trim();
    
    // Map domain weight based on title keyword
    let weight = '20-30%';
    if (title.toLowerCase().includes('concepts')) weight = '26% of Exam';
    if (title.toLowerCase().includes('security')) weight = '25% of Exam';
    if (title.toLowerCase().includes('technology')) weight = '33% of Exam';
    if (title.toLowerCase().includes('billing')) weight = '16% of Exam';
    
    const subtopics = [];
    let currentSubtopic = null;
    
    lines.slice(1).forEach(line => {
      const subMatch = line.match(/^###\s*(.*)/);
      if (subMatch) {
        if (currentSubtopic) {
          subtopics.push(currentSubtopic);
        }
        currentSubtopic = {
          title: subMatch[1].trim(),
          bullets: []
        };
      } else if (currentSubtopic) {
        const bulletMatch = line.match(/^\s*[-\*]\s*(.*)/);
        if (bulletMatch) {
          currentSubtopic.bullets.push(bulletMatch[1].trim());
        }
      }
    });
    
    if (currentSubtopic) {
      subtopics.push(currentSubtopic);
    }
    
    domains.push({
      title: title,
      weight: weight,
      subtopics: subtopics
    });
  });
  
  return domains;
}

window.toggleDomainAccordion = function(index) {
  const acc = document.getElementById(`domain-accordion-${index}`);
  if (acc) {
    acc.classList.toggle('open');
  }
};

const MINDMAP_TREE = [
  {
    domain: 'Domain 1: Cloud Concepts',
    colorClass: 'domain-color-1',
    units: [
      { id: 'cloud_computing', label: 'Cloud Computing' },
      { id: 'global_infrastructure', label: 'Global Infrastructure' }
    ]
  },
  {
    domain: 'Domain 2: Security & Compliance',
    colorClass: 'domain-color-2',
    units: [
      { id: 'iam', label: 'IAM: Identity & Access Management' },
      { id: 'security_compliance', label: 'Security & Compliance' },
      { id: 'advanced_identity', label: 'Advanced Identity' }
    ]
  },
  {
    domain: 'Domain 3: Technology & Services',
    colorClass: 'domain-color-3',
    units: [
      { id: 'ec2', label: 'EC2: Virtual Machines' },
      { id: 'ec2_storage', label: 'EC2 Instance Storage' },
      { id: 'elb_asg', label: 'Elastic Load Balancing & Auto Scaling' },
      { id: 's3', label: 'Amazon S3' },
      { id: 'databases', label: 'Databases & Analytics' },
      { id: 'other_compute', label: 'Other Compute (Lambda, ECS, Fargate)' },
      { id: 'deploying', label: 'Deploying & Managing Infrastructure' },
      { id: 'cloud_integration', label: 'Cloud Integration (SQS, SNS, MQ)' },
      { id: 'cloud_monitoring', label: 'Cloud Monitoring (CloudWatch, CloudTrail)' },
      { id: 'vpc', label: 'VPC & Networking' },
      { id: 'machine_learning', label: 'Machine Learning Services' },
      { id: 'other_aws_services', label: 'Other AWS Services' },
      { id: 'architecting_and_ecosystem', label: 'Architecting & Ecosystem' }
    ]
  },
  {
    domain: 'Domain 4: Billing, Pricing & Support',
    colorClass: 'domain-color-4',
    units: [
      { id: 'account_management_billing_support', label: 'Account Management, Billing & Support' }
    ]
  }
];

function setupMindmapView() {
  const container = document.getElementById('mindmap-container');
  if (!container) return;

  const totalUnits = NOTES_LIST.length;
  const doneUnits = Object.values(state.notesProgress).filter(Boolean).length;
  const pct = totalUnits > 0 ? Math.round((doneUnits / totalUnits) * 100) : 0;
  const countPill = document.getElementById('mindmap-completed-count');
  const pctPill = document.getElementById('mindmap-progress-pill');
  if (countPill) countPill.innerHTML = `<strong>${doneUnits}</strong> Units Done`;
  if (pctPill) pctPill.textContent = `${pct}% Complete`;

  const tree = document.createElement('div');
  tree.className = 'topic-tree';

  MINDMAP_TREE.forEach((domain, di) => {
    const totalUnits = domain.units.length;
    const doneUnits = domain.units.filter(u => !!state.notesProgress[u.id]).length;
    const pct = totalUnits > 0 ? Math.round((doneUnits / totalUnits) * 100) : 0;

    const card = document.createElement('div');
    card.className = 'topic-domain-card';
    if (di === 0) card.classList.add('open');

    const header = document.createElement('div');
    header.className = 'topic-domain-header';
    header.innerHTML = `
      <div class="topic-domain-title">
        <div class="topic-domain-badge ${domain.colorClass}">${di + 1}</div>
        <div>
          <div class="topic-domain-name">${domain.domain}</div>
          <div class="topic-domain-meta">${doneUnits}/${totalUnits} units complete &bull; ${pct}%</div>
        </div>
      </div>
      <svg class="topic-domain-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    `;
    header.addEventListener('click', () => card.classList.toggle('open'));

    const unitsList = document.createElement('div');
    unitsList.className = 'topic-units-list';

    domain.units.forEach(unit => {
      const completed = !!state.notesProgress[unit.id];
      const item = document.createElement('div');
      item.className = `topic-unit-item${completed ? ' completed' : ''}`;
      item.innerHTML = `
        <div class="topic-unit-dot"></div>
        <span class="topic-unit-label">${unit.label}</span>
        <span class="topic-unit-status ${completed ? 'done' : 'todo'}">${completed ? '✓ Done' : 'To Do'}</span>
      `;
      item.addEventListener('click', () => {
        window.location.hash = `#notes?id=${unit.id}`;
      });
      unitsList.appendChild(item);
    });

    card.appendChild(header);
    card.appendChild(unitsList);
    tree.appendChild(card);
  });

  container.innerHTML = '';
  container.appendChild(tree);
}
