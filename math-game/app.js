(function () {
  'use strict';

  // ── Constants ──────────────────────────────────────────────────────────
  var STORAGE_KEY = 'mathGame';
  var QUESTIONS_PER_SESSION = 10;
  var GRADES = ['K', '1', '2', '3', '4', '5', '6', '7', '8'];
  var FEEDBACK_DELAY = 1000;
  var CONFETTI_COLORS = ['#4CAF50', '#FF9800', '#2196F3', '#F44336', '#9C27B0', '#FFEB3B'];
  var GOLD_CONFETTI_COLORS = ['#FFD700', '#FFC107', '#FF9800', '#FFB300', '#F9A825'];
  var TIMER_EASY = 15;
  var TIMER_HARD = 10;
  var AVATARS = [
    '\u{1F98A}', '\u{1F431}', '\u{1F436}', '\u{1F981}',
    '\u{1F438}', '\u{1F43C}', '\u{1F984}', '\u{1F432}',
    '\u{1F916}', '\u{1F680}', '\u{1F31F}', '\u{1F3AE}',
    '\u{1F355}', '\u{1F9C1}', '\u{1F3B8}', '\u{1F308}'
  ];
  var GRADE_MULTIPLIERS = {
    'K': 1, '1': 1.1, '2': 1.2, '3': 1.3, '4': 1.4,
    '5': 1.5, '6': 1.6, '7': 1.7, '8': 1.8
  };
  var LEVEL_THRESHOLDS = [
    0, 50, 120, 200, 300, 420, 560, 720, 900, 1100,
    1320, 1560, 1820, 2100, 2400, 2720, 3060, 3420, 3800, 4200, 4620
  ];
  var ACHIEVEMENTS = [
    { id: 'first_steps', emoji: '\u{1F463}', name: 'First Steps', description: 'Complete first session' },
    { id: 'perfect_10', emoji: '\u{1F4AF}', name: 'Perfect 10', description: 'Score 10/10' },
    { id: 'on_fire', emoji: '\u{1F525}', name: 'On Fire', description: '5-answer streak' },
    { id: 'streak_legend', emoji: '\u26A1', name: 'Streak Legend', description: '10-answer streak' },
    { id: 'speed_demon', emoji: '\u23F1\uFE0F', name: 'Speed Demon', description: 'Timed session under 60s' },
    { id: 'grade_master', emoji: '\u{1F393}', name: 'Grade Master', description: 'Reach hard tier' },
    { id: 'math_whiz', emoji: '\u{1F9D9}', name: 'Math Whiz', description: 'Hard tier on 5 grades' },
    { id: 'comeback_kid', emoji: '\u{1F4AA}', name: 'Comeback Kid', description: '3 wrong, still 7+ correct' },
    { id: 'century', emoji: '\u{1F3C6}', name: 'Century', description: '100 total correct' },
    { id: 'level_10', emoji: '\u2B50', name: 'Level 10', description: 'Reach level 10' }
  ];

  // ── DOM References ─────────────────────────────────────────────────────
  var screens = {
    profile: document.getElementById('screen-profile'),
    grades: document.getElementById('screen-grades'),
    game: document.getElementById('screen-game'),
    results: document.getElementById('screen-results')
  };

  var dom = {
    profileList: document.getElementById('profile-list'),
    newProfileName: document.getElementById('new-profile-name'),
    btnCreateProfile: document.getElementById('btn-create-profile'),
    btnChangeProfile: document.getElementById('btn-change-profile'),
    activeProfileName: document.getElementById('active-profile-name'),
    gradeGrid: document.getElementById('grade-grid'),
    btnQuit: document.getElementById('btn-quit'),
    gameGradeLabel: document.getElementById('game-grade-label'),
    gameQuestionNum: document.getElementById('game-question-num'),
    gameScore: document.getElementById('game-score'),
    gameQuestion: document.getElementById('game-question'),
    answerGrid: document.getElementById('answer-grid'),
    resultsScore: document.getElementById('results-score'),
    btnPlayAgain: document.getElementById('btn-play-again'),
    btnBackGrades: document.getElementById('btn-back-grades'),
    gameProgress: document.getElementById('game-progress-fill'),
    gameTimer: document.getElementById('game-timer'),
    timerBar: document.getElementById('timer-fill'),
    timerText: document.getElementById('timer-text'),
    streakBanner: document.getElementById('streak-banner'),
    timerToggle: document.getElementById('timer-toggle'),
    resultsStars: document.getElementById('results-stars'),
    resultsMessage: document.getElementById('results-message'),
    resultsReview: document.getElementById('results-review'),
    confettiCanvas: document.getElementById('confetti-canvas'),
    btnMute: document.getElementById('btn-mute'),
    avatarPicker: document.getElementById('avatar-picker'),
    avatarGrid: document.getElementById('avatar-grid'),
    profileAvatarHeader: document.getElementById('profile-avatar-header'),
    levelBadge: document.getElementById('level-badge'),
    xpBarFill: document.getElementById('xp-bar-fill'),
    xpText: document.getElementById('xp-text'),
    badgeGrid: document.getElementById('badge-grid'),
    floatingPoints: document.getElementById('floating-points'),
    resultsAvatar: document.getElementById('results-avatar'),
    resultsPoints: document.getElementById('results-points'),
    resultsHighScore: document.getElementById('results-high-score'),
    resultsXP: document.getElementById('results-xp'),
    celebrationOverlay: document.getElementById('celebration-overlay'),
    celebrationText: document.getElementById('celebration-text'),
    levelUpPopup: document.getElementById('level-up-popup'),
    levelUpNumber: document.getElementById('level-up-number'),
    badgeNotification: document.getElementById('badge-notification'),
    badgeNotificationEmoji: document.getElementById('badge-notification-emoji'),
    badgeNotificationText: document.getElementById('badge-notification-text')
  };

  // ── State ──────────────────────────────────────────────────────────────
  var state = {
    currentGrade: null,
    currentTier: null,
    questionIndex: 0,
    score: 0,
    currentAnswer: null,
    advanceTimeout: null,
    streak: 0,
    wrongAnswers: [],
    timerEnabled: false,
    timerInterval: null,
    timeLeft: 0,
    acceptingInput: false,
    pendingProfileName: null,
    sessionPoints: 0,
    sessionXP: 0,
    maxStreak: 0,
    totalTimeRemaining: 0,
    wrongCount: 0,
    sessionStartTime: 0,
    lastTimerCeil: 0
  };

  // ── Sound Manager (Web Audio API — no audio files) ─────────────────────
  var SoundManager = {
    ctx: null,
    enabled: true,

    ensureContext: function () {
      if (!this.ctx) {
        try {
          this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
          return false;
        }
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return true;
    },

    playNote: function (freq, type, duration, startTime, gain) {
      if (!this.enabled || !this.ensureContext()) return;
      var osc = this.ctx.createOscillator();
      var gainNode = this.ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      gainNode.gain.setValueAtTime(gain || 0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    },

    playCorrect: function () {
      if (!this.enabled || !this.ensureContext()) return;
      var now = this.ctx.currentTime;
      this.playNote(523.25, 'sine', 0.15, now, 0.15);      // C5
      this.playNote(659.25, 'sine', 0.2, now + 0.1, 0.15);  // E5
    },

    playWrong: function () {
      if (!this.enabled || !this.ensureContext()) return;
      var now = this.ctx.currentTime;
      this.playNote(200, 'triangle', 0.2, now, 0.12);
    },

    playStreakMilestone: function (count) {
      if (!this.enabled || !this.ensureContext()) return;
      var now = this.ctx.currentTime;
      var steps = Math.min(count, 6);
      for (var i = 0; i < steps; i++) {
        this.playNote(400 + i * 80, 'sine', 0.1, now + i * 0.06, 0.1);
      }
    },

    playTimerTick: function () {
      if (!this.enabled || !this.ensureContext()) return;
      var now = this.ctx.currentTime;
      this.playNote(800, 'square', 0.03, now, 0.05);
    },

    playPerfectFanfare: function () {
      if (!this.enabled || !this.ensureContext()) return;
      var now = this.ctx.currentTime;
      var notes = [523.25, 587.33, 659.25, 783.99, 1046.50]; // C5 D5 E5 G5 C6
      for (var i = 0; i < notes.length; i++) {
        this.playNote(notes[i], 'sine', 0.25, now + i * 0.15, 0.15);
      }
    },

    playLevelUp: function () {
      if (!this.enabled || !this.ensureContext()) return;
      var now = this.ctx.currentTime;
      // Frequency sweep 400→800Hz
      var osc = this.ctx.createOscillator();
      var gainNode = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.4);
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);
      // Chime on top
      this.playNote(1046.50, 'sine', 0.3, now + 0.4, 0.12);
    },

    playBadgeUnlock: function () {
      if (!this.enabled || !this.ensureContext()) return;
      var now = this.ctx.currentTime;
      this.playNote(600, 'sine', 0.15, now, 0.12);
      this.playNote(750, 'sine', 0.15, now + 0.12, 0.12);
      this.playNote(900, 'sine', 0.2, now + 0.24, 0.12);
    }
  };

  // ── Storage ────────────────────────────────────────────────────────────

  function migrateProfile(profile) {
    if (!profile.avatar) {
      profile.avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    }
    if (profile.xp === undefined) profile.xp = 0;
    if (profile.level === undefined) profile.level = 1;
    if (!profile.achievements) profile.achievements = [];
    if (profile.totalSessions === undefined) profile.totalSessions = 0;
    GRADES.forEach(function (g) {
      if (!profile.stats[g]) {
        profile.stats[g] = { attempted: 0, correct: 0, tier: 'easy', highScore: 0 };
      }
      if (profile.stats[g].highScore === undefined) {
        profile.stats[g].highScore = 0;
      }
    });
  }

  function loadData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var data = JSON.parse(raw);
        if (data.soundEnabled === undefined) data.soundEnabled = true;
        if (data.profiles) {
          data.profiles.forEach(migrateProfile);
        }
        return data;
      }
    } catch (e) {
      // Corrupted data, start fresh
    }
    return { profiles: [], activeProfileId: null, soundEnabled: true };
  }

  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function createEmptyStats() {
    var stats = {};
    GRADES.forEach(function (g) {
      stats[g] = { attempted: 0, correct: 0, tier: 'easy', highScore: 0 };
    });
    return stats;
  }

  function getActiveProfile() {
    var data = loadData();
    if (!data.activeProfileId) return null;
    for (var i = 0; i < data.profiles.length; i++) {
      if (data.profiles[i].id === data.activeProfileId) {
        return data.profiles[i];
      }
    }
    return null;
  }

  // ── Screen Navigation ─────────────────────────────────────────────────

  function showScreen(name) {
    Object.keys(screens).forEach(function (key) {
      screens[key].style.display = key === name ? 'block' : 'none';
    });
  }

  // ── Confetti System ────────────────────────────────────────────────────

  function fireConfettiWithOptions(colors, count, maxFrames) {
    var canvas = dom.confettiCanvas;
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    var particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.3,
        dx: (Math.random() - 0.5) * 8,
        dy: -(Math.random() * 6 + 2),
        size: Math.random() * 4 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1
      });
    }

    var frame = 0;

    function animate() {
      frame++;
      if (frame > maxFrames) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.dx;
        p.dy += 0.15;
        p.y += p.dy;
        p.dx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - (frame / maxFrames));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  function fireConfetti() {
    fireConfettiWithOptions(CONFETTI_COLORS, 80, 120);
  }

  function fireGoldenConfetti() {
    fireConfettiWithOptions(GOLD_CONFETTI_COLORS, 180, 180);
  }

  // ── Score & XP Calculations ────────────────────────────────────────────

  function getStreakMultiplier(streak) {
    if (streak >= 8) return 3;
    if (streak >= 5) return 2;
    if (streak >= 3) return 1.5;
    return 1;
  }

  function calculatePoints(streak, grade, timeLeft, timerEnabled) {
    var base = 100;
    var streakMult = getStreakMultiplier(streak);
    var gradeMult = GRADE_MULTIPLIERS[grade] || 1;
    var timerBonus = timerEnabled ? Math.round(timeLeft * 10) : 0;
    return Math.round(base * streakMult * gradeMult) + timerBonus;
  }

  function calculateQuestionXP(streak, grade, timeLeft, timerEnabled) {
    var base = 10;
    var streakMult = getStreakMultiplier(streak);
    var gradeMult = GRADE_MULTIPLIERS[grade] || 1;
    var timerBonus = timerEnabled ? Math.round(timeLeft) : 0;
    return Math.round(base * streakMult * gradeMult) + timerBonus;
  }

  // ── XP & Level ─────────────────────────────────────────────────────────

  function getLevelFromXP(xp) {
    var level = 1;
    for (var i = 1; i < LEVEL_THRESHOLDS.length; i++) {
      if (xp >= LEVEL_THRESHOLDS[i]) {
        level = i + 1;
      } else {
        break;
      }
    }
    // Beyond defined thresholds: each additional level costs 420 XP
    if (level >= LEVEL_THRESHOLDS.length) {
      var lastThreshold = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
      var extra = Math.floor((xp - lastThreshold) / 420);
      level = LEVEL_THRESHOLDS.length + extra;
    }
    return level;
  }

  function getXPForLevel(level) {
    if (level <= 1) return 0;
    var idx = level - 1;
    if (idx < LEVEL_THRESHOLDS.length) return LEVEL_THRESHOLDS[idx];
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (idx - LEVEL_THRESHOLDS.length + 1) * 420;
  }

  function renderXPBar(profile) {
    var level = getLevelFromXP(profile.xp);
    var currentLevelXP = getXPForLevel(level);
    var nextLevelXP = getXPForLevel(level + 1);
    var progressXP = profile.xp - currentLevelXP;
    var neededXP = nextLevelXP - currentLevelXP;
    var pct = neededXP > 0 ? Math.min(100, (progressXP / neededXP) * 100) : 100;

    dom.levelBadge.textContent = 'Lv ' + level;
    dom.xpBarFill.style.width = pct + '%';
    dom.xpText.textContent = profile.xp + ' / ' + nextLevelXP + ' XP';
  }

  // ── Floating Points Animation ──────────────────────────────────────────

  function showFloatingPoints(points) {
    var el = document.createElement('div');
    el.className = 'floating-points';
    el.textContent = '+' + points;
    dom.floatingPoints.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1000);
  }

  // ── Achievement System ─────────────────────────────────────────────────

  function checkAchievements(profile, sessionData) {
    var newBadges = [];

    ACHIEVEMENTS.forEach(function (badge) {
      if (profile.achievements.indexOf(badge.id) !== -1) return;

      var earned = false;
      switch (badge.id) {
        case 'first_steps':
          earned = profile.totalSessions >= 1;
          break;
        case 'perfect_10':
          earned = sessionData.score === QUESTIONS_PER_SESSION;
          break;
        case 'on_fire':
          earned = sessionData.maxStreak >= 5;
          break;
        case 'streak_legend':
          earned = sessionData.maxStreak >= 10;
          break;
        case 'speed_demon':
          earned = sessionData.timerEnabled && sessionData.sessionDuration < 60000;
          break;
        case 'grade_master':
          earned = GRADES.some(function (g) { return profile.stats[g].tier === 'hard'; });
          break;
        case 'math_whiz':
          var hardCount = 0;
          GRADES.forEach(function (g) { if (profile.stats[g].tier === 'hard') hardCount++; });
          earned = hardCount >= 5;
          break;
        case 'comeback_kid':
          earned = sessionData.wrongCount >= 3 && sessionData.score >= 7;
          break;
        case 'century':
          var totalCorrect = 0;
          GRADES.forEach(function (g) { totalCorrect += profile.stats[g].correct; });
          earned = totalCorrect >= 100;
          break;
        case 'level_10':
          earned = getLevelFromXP(profile.xp) >= 10;
          break;
      }

      if (earned) {
        profile.achievements.push(badge.id);
        newBadges.push(badge);
      }
    });

    return newBadges;
  }

  function renderBadges(profile) {
    dom.badgeGrid.innerHTML = '';
    ACHIEVEMENTS.forEach(function (badge) {
      var isEarned = profile.achievements.indexOf(badge.id) !== -1;
      var item = document.createElement('div');
      item.className = 'badge-item ' + (isEarned ? 'earned' : 'locked');
      item.textContent = isEarned ? badge.emoji : '\u{1F512}';

      var tooltip = document.createElement('div');
      tooltip.className = 'badge-tooltip';
      tooltip.textContent = badge.name + ': ' + badge.description;
      item.appendChild(tooltip);

      dom.badgeGrid.appendChild(item);
    });
  }

  function showBadgeNotification(badge) {
    dom.badgeNotificationEmoji.textContent = badge.emoji;
    dom.badgeNotificationText.textContent = badge.name + ' unlocked!';
    dom.badgeNotification.style.display = 'block';
    dom.badgeNotification.style.animation = 'none';
    void dom.badgeNotification.offsetWidth;
    dom.badgeNotification.style.animation = '';

    setTimeout(function () {
      dom.badgeNotification.style.display = 'none';
    }, 3000);
  }

  // ── Celebration System ─────────────────────────────────────────────────

  function showCelebrationOverlay(text, duration) {
    dom.celebrationText.textContent = text;
    dom.celebrationOverlay.style.display = 'flex';
    dom.celebrationText.style.animation = 'none';
    void dom.celebrationText.offsetWidth;
    dom.celebrationText.style.animation = '';

    setTimeout(function () {
      dom.celebrationOverlay.style.display = 'none';
    }, duration || 2500);
  }

  function showLevelUpPopup(level) {
    dom.levelUpNumber.textContent = 'Level ' + level;
    dom.levelUpPopup.style.display = 'flex';
    var content = dom.levelUpPopup.querySelector('.level-up-content');
    content.style.animation = 'none';
    void content.offsetWidth;
    content.style.animation = '';

    setTimeout(function () {
      dom.levelUpPopup.style.display = 'none';
    }, 2500);
  }

  function sequenceCelebrations(celebrations) {
    var delay = 500;
    celebrations.forEach(function (c) {
      setTimeout(c.fn, delay);
      delay += (c.duration || 2500) + 500;
    });
  }

  // ── Streak Banner ──────────────────────────────────────────────────────

  function updateStreakBanner() {
    if (state.streak >= 2) {
      var mult = getStreakMultiplier(state.streak);
      var text = state.streak + ' in a row!';
      if (mult > 1) {
        text += ' (' + mult + 'x)';
      }
      if (state.streak >= 5) {
        text = state.streak + ' in a row! On fire! (' + mult + 'x)';
      }
      dom.streakBanner.textContent = text;
      dom.streakBanner.style.display = 'none';
      void dom.streakBanner.offsetWidth;
      dom.streakBanner.style.display = 'block';
      dom.streakBanner.classList.remove('show');
      void dom.streakBanner.offsetWidth;
      dom.streakBanner.classList.add('show');

      // Play streak milestone sounds at key streaks
      if (state.streak === 3 || state.streak === 5 || state.streak === 8 || state.streak === 10) {
        SoundManager.playStreakMilestone(state.streak);
      }
    } else {
      dom.streakBanner.style.display = 'none';
      dom.streakBanner.classList.remove('show');
    }
  }

  // ── Timer System ───────────────────────────────────────────────────────

  function clearTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function startTimer() {
    var timeLimit = state.currentTier === 'hard' ? TIMER_HARD : TIMER_EASY;
    state.timeLeft = timeLimit;
    state.lastTimerCeil = Math.ceil(timeLimit);

    dom.timerBar.style.width = '100%';
    dom.timerBar.classList.remove('timer-danger');
    dom.timerText.textContent = timeLimit + 's';

    clearTimer();

    state.timerInterval = setInterval(function () {
      state.timeLeft -= 0.1;

      if (state.timeLeft <= 0) {
        state.timeLeft = 0;
        clearTimer();
        handleTimerExpired();
        return;
      }

      var pct = (state.timeLeft / timeLimit) * 100;
      dom.timerBar.style.width = pct + '%';
      dom.timerText.textContent = Math.ceil(state.timeLeft) + 's';

      if (state.timeLeft <= timeLimit * 0.25) {
        dom.timerBar.classList.add('timer-danger');
      }

      // Tick sound when under 3 seconds (on each second crossing)
      var currentCeil = Math.ceil(state.timeLeft);
      if (state.timeLeft <= 3 && currentCeil < state.lastTimerCeil) {
        SoundManager.playTimerTick();
      }
      state.lastTimerCeil = currentCeil;
    }, 100);
  }

  function handleTimerExpired() {
    state.acceptingInput = false;

    var buttons = dom.answerGrid.querySelectorAll('.answer-btn');
    buttons.forEach(function (btn) {
      btn.disabled = true;
    });

    buttons.forEach(function (btn) {
      var answerText = btn.getAttribute('data-answer');
      if (String(answerText) === String(state.currentAnswer)) {
        btn.classList.add('correct');
      }
    });

    SoundManager.playWrong();

    state.wrongAnswers.push({
      question: dom.gameQuestion.innerHTML,
      selected: "Time's up!",
      correct: String(state.currentAnswer)
    });

    state.streak = 0;
    state.wrongCount++;
    updateStreakBanner();

    dom.timerBar.style.width = '0%';
    dom.timerText.textContent = '0s';

    state.questionIndex++;

    state.advanceTimeout = setTimeout(function () {
      showQuestion();
    }, FEEDBACK_DELAY);
  }

  // ── Avatar System ──────────────────────────────────────────────────────

  function renderAvatarPicker() {
    dom.avatarGrid.innerHTML = '';
    AVATARS.forEach(function (emoji) {
      var btn = document.createElement('button');
      btn.className = 'avatar-option';
      btn.textContent = emoji;
      btn.type = 'button';
      btn.addEventListener('click', function () {
        handleAvatarSelect(emoji);
      });
      dom.avatarGrid.appendChild(btn);
    });
  }

  function showAvatarPicker(name) {
    state.pendingProfileName = name;
    dom.avatarPicker.style.display = 'block';
    renderAvatarPicker();
  }

  function handleAvatarSelect(avatar) {
    var name = state.pendingProfileName;
    if (!name) return;

    var data = loadData();
    var profile = {
      id: generateId(),
      name: name,
      avatar: avatar,
      xp: 0,
      level: 1,
      achievements: [],
      totalSessions: 0,
      stats: createEmptyStats()
    };

    data.profiles.push(profile);
    saveData(data);
    state.pendingProfileName = null;
    dom.avatarPicker.style.display = 'none';
    dom.newProfileName.value = '';
    renderProfileList();
  }

  // ── Profile Screen ─────────────────────────────────────────────────────

  function renderProfileList() {
    var data = loadData();
    dom.profileList.innerHTML = '';

    data.profiles.forEach(function (profile) {
      var row = document.createElement('div');
      row.className = 'profile-item';

      var btn = document.createElement('button');
      btn.className = 'btn profile-btn';

      var avatarSpan = document.createElement('span');
      avatarSpan.className = 'profile-avatar';
      avatarSpan.textContent = profile.avatar || '\u{1F98A}';

      var nameSpan = document.createElement('span');
      nameSpan.className = 'profile-name-text';
      nameSpan.textContent = profile.name;

      var levelSpan = document.createElement('span');
      levelSpan.className = 'profile-level';
      levelSpan.textContent = 'Lv ' + getLevelFromXP(profile.xp);

      btn.appendChild(avatarSpan);
      btn.appendChild(nameSpan);
      btn.appendChild(levelSpan);

      btn.addEventListener('click', function () {
        selectProfile(profile.id);
      });

      var delBtn = document.createElement('button');
      delBtn.className = 'btn btn-delete';
      delBtn.textContent = '\u00D7';
      delBtn.title = 'Delete profile';
      delBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        deleteProfile(profile.id);
      });

      row.appendChild(btn);
      row.appendChild(delBtn);
      dom.profileList.appendChild(row);
    });
  }

  function createProfile() {
    var name = dom.newProfileName.value.trim();
    if (!name) return;
    showAvatarPicker(name);
  }

  function selectProfile(id) {
    var data = loadData();
    data.activeProfileId = id;
    saveData(data);
    showGradeSelect();
  }

  function deleteProfile(id) {
    if (!confirm('Delete this profile?')) return;

    var data = loadData();
    data.profiles = data.profiles.filter(function (p) {
      return p.id !== id;
    });
    if (data.activeProfileId === id) {
      data.activeProfileId = null;
    }
    saveData(data);
    renderProfileList();
  }

  // ── Grade Select Screen ────────────────────────────────────────────────

  function showGradeSelect() {
    var profile = getActiveProfile();
    if (!profile) {
      showScreen('profile');
      renderProfileList();
      return;
    }

    dom.profileAvatarHeader.textContent = profile.avatar || '\u{1F98A}';
    dom.activeProfileName.textContent = profile.name;
    renderXPBar(profile);
    renderGradeGrid(profile);
    renderBadges(profile);
    showScreen('grades');
  }

  function renderGradeGrid(profile) {
    dom.gradeGrid.innerHTML = '';

    GRADES.forEach(function (grade) {
      var stats = profile.stats[grade];
      var btn = document.createElement('button');
      btn.className = 'btn grade-btn';

      var label = document.createElement('div');
      label.className = 'grade-label';
      label.textContent = 'Grade ' + grade;

      var statsLine = document.createElement('div');
      statsLine.className = 'grade-stats';
      statsLine.textContent = stats.attempted + ' / ' + stats.correct;

      var tierBadge = document.createElement('div');
      tierBadge.className = 'tier-badge ' + stats.tier;
      tierBadge.textContent = stats.tier;

      btn.appendChild(label);
      btn.appendChild(statsLine);
      btn.appendChild(tierBadge);

      // High score display
      if (stats.highScore > 0) {
        var highScoreLine = document.createElement('div');
        highScoreLine.className = 'grade-high-score';
        highScoreLine.textContent = '\u2605 ' + stats.highScore;
        btn.appendChild(highScoreLine);
      }

      // Progress bar toward tier promotion
      if (stats.tier === 'easy') {
        var progressContainer = document.createElement('div');
        progressContainer.className = 'grade-progress';
        var progressFill = document.createElement('div');
        progressFill.className = 'grade-progress-fill';
        progressFill.style.width = Math.min(100, (stats.correct / 10) * 100) + '%';
        progressContainer.appendChild(progressFill);
        btn.appendChild(progressContainer);
      }

      btn.addEventListener('click', function () {
        startGame(grade);
      });

      dom.gradeGrid.appendChild(btn);
    });
  }

  // ── Game Screen ────────────────────────────────────────────────────────

  function startGame(grade) {
    var profile = getActiveProfile();
    if (!profile) return;

    state.currentGrade = grade;
    state.currentTier = profile.stats[grade].tier;
    state.questionIndex = 0;
    state.score = 0;
    state.streak = 0;
    state.wrongAnswers = [];
    state.timerEnabled = dom.timerToggle.checked;
    state.sessionPoints = 0;
    state.sessionXP = 0;
    state.maxStreak = 0;
    state.totalTimeRemaining = 0;
    state.wrongCount = 0;
    state.sessionStartTime = Date.now();
    state.lastTimerCeil = 0;

    dom.gameGradeLabel.textContent = 'Grade ' + grade;
    dom.gameScore.textContent = '0 pts';
    dom.gameProgress.style.width = '0%';
    dom.gameTimer.style.display = state.timerEnabled ? 'flex' : 'none';
    dom.streakBanner.style.display = 'none';
    dom.streakBanner.classList.remove('show');
    dom.floatingPoints.innerHTML = '';

    showScreen('game');
    showQuestion();
  }

  function showQuestion() {
    if (state.questionIndex >= QUESTIONS_PER_SESSION) {
      dom.gameProgress.style.width = '100%';
      clearTimer();
      showResults();
      return;
    }

    state.acceptingInput = true;

    dom.gameProgress.style.width = (state.questionIndex / QUESTIONS_PER_SESSION * 100) + '%';

    dom.gameQuestionNum.textContent =
      'Question ' + (state.questionIndex + 1) + ' of ' + QUESTIONS_PER_SESSION;

    var qa = generateQuestion(state.currentGrade, state.currentTier);
    state.currentAnswer = qa.answer;

    dom.gameQuestion.innerHTML = qa.question.replace(/\n/g, '<br>');

    var options = generateOptions(
      qa.answer,
      state.currentGrade,
      qa.denominator
    );

    dom.answerGrid.innerHTML = '';
    options.forEach(function (option, index) {
      var btn = document.createElement('button');
      btn.className = 'btn answer-btn';
      btn.setAttribute('data-answer', String(option));

      var kbdHint = document.createElement('span');
      kbdHint.className = 'kbd-hint';
      kbdHint.textContent = (index + 1);
      btn.appendChild(kbdHint);
      btn.appendChild(document.createTextNode(option));

      btn.addEventListener('click', function () {
        handleAnswer(btn, option, qa.answer, options);
      });
      dom.answerGrid.appendChild(btn);
    });

    if (state.timerEnabled) {
      startTimer();
    }
  }

  function handleAnswer(selectedBtn, selected, correct, allOptions) {
    if (!state.acceptingInput) return;
    state.acceptingInput = false;

    clearTimer();

    var buttons = dom.answerGrid.querySelectorAll('.answer-btn');
    buttons.forEach(function (btn) {
      btn.disabled = true;
    });

    var isCorrect = String(selected) === String(correct);

    if (isCorrect) {
      selectedBtn.classList.add('correct');
      state.score++;
      state.streak++;
      if (state.streak > state.maxStreak) state.maxStreak = state.streak;

      // Calculate and add points
      var points = calculatePoints(state.streak, state.currentGrade, state.timeLeft, state.timerEnabled);
      state.sessionPoints += points;

      // Calculate and add XP
      var xp = calculateQuestionXP(state.streak, state.currentGrade, state.timeLeft, state.timerEnabled);
      state.sessionXP += xp;

      // Track timer remaining
      if (state.timerEnabled) {
        state.totalTimeRemaining += state.timeLeft;
      }

      // Show floating points
      showFloatingPoints(points);

      // Update displayed score
      dom.gameScore.textContent = state.sessionPoints + ' pts';

      // Play sound + confetti
      SoundManager.playCorrect();
      fireConfetti();
    } else {
      selectedBtn.classList.add('incorrect');
      selectedBtn.classList.add('shake');
      setTimeout(function () {
        selectedBtn.classList.remove('shake');
      }, 400);

      // Highlight the correct answer
      buttons.forEach(function (btn) {
        if (String(btn.getAttribute('data-answer')) === String(correct)) {
          btn.classList.add('correct');
        }
      });

      // Track wrong answers for review
      state.wrongAnswers.push({
        question: dom.gameQuestion.innerHTML,
        selected: String(selected),
        correct: String(correct)
      });

      state.streak = 0;
      state.wrongCount++;

      SoundManager.playWrong();
    }

    updateStreakBanner();
    state.questionIndex++;

    state.advanceTimeout = setTimeout(function () {
      showQuestion();
    }, FEEDBACK_DELAY);
  }

  // ── Results Screen ─────────────────────────────────────────────────────

  function showResults() {
    var sessionDuration = Date.now() - state.sessionStartTime;

    // Load data for saving
    var data = loadData();
    var savedProfile = null;
    for (var i = 0; i < data.profiles.length; i++) {
      if (data.profiles[i].id === data.activeProfileId) {
        savedProfile = data.profiles[i];
        break;
      }
    }

    if (!savedProfile) {
      showScreen('results');
      return;
    }

    // Show avatar with reaction animation
    var avatarClass = 'results-avatar';
    if (state.score === QUESTIONS_PER_SESSION) avatarClass += ' avatar-bounce';
    else if (state.score >= 7) avatarClass += ' avatar-happy';
    dom.resultsAvatar.className = avatarClass;
    dom.resultsAvatar.textContent = savedProfile.avatar || '\u{1F98A}';

    // Stars
    renderStars(state.score);

    // Score text
    dom.resultsScore.textContent =
      state.score + ' out of ' + QUESTIONS_PER_SESSION + ' correct!';

    // Points
    dom.resultsPoints.textContent = state.sessionPoints.toLocaleString() + ' points';

    // Results message
    renderResultsMessage(state.score);

    // Wrong answer review
    renderWrongAnswerReview();

    // Hide streak banner
    dom.streakBanner.style.display = 'none';
    dom.streakBanner.classList.remove('show');

    // ── Save stats ──
    var gradeStats = savedProfile.stats[state.currentGrade];
    var oldTier = gradeStats.tier;
    var oldLevel = getLevelFromXP(savedProfile.xp);

    gradeStats.attempted += QUESTIONS_PER_SESSION;
    gradeStats.correct += state.score;

    // High score
    var isNewHighScore = state.sessionPoints > gradeStats.highScore;
    if (isNewHighScore) {
      gradeStats.highScore = state.sessionPoints;
    }

    // Tier promotion
    if (gradeStats.tier === 'easy' && gradeStats.correct >= 10) {
      gradeStats.tier = 'hard';
    }
    var tierPromoted = gradeStats.tier === 'hard' && oldTier === 'easy';

    // XP
    savedProfile.xp += state.sessionXP;
    savedProfile.level = getLevelFromXP(savedProfile.xp);
    var leveledUp = savedProfile.level > oldLevel;

    // Session count
    savedProfile.totalSessions++;

    // Check achievements
    var sessionData = {
      score: state.score,
      maxStreak: state.maxStreak,
      wrongCount: state.wrongCount,
      timerEnabled: state.timerEnabled,
      sessionDuration: sessionDuration
    };
    var newBadges = checkAchievements(savedProfile, sessionData);

    saveData(data);

    // Display high score
    if (isNewHighScore) {
      dom.resultsHighScore.textContent = '\u2605 NEW HIGH SCORE! \u2605';
      dom.resultsHighScore.className = 'results-high-score is-new';
    } else {
      dom.resultsHighScore.textContent = 'High Score: ' + gradeStats.highScore.toLocaleString();
      dom.resultsHighScore.className = 'results-high-score';
    }

    // Display XP earned
    dom.resultsXP.textContent = '+' + state.sessionXP + ' XP';

    showScreen('results');

    // ── Sequence celebrations ──
    var celebrations = [];

    if (state.score === QUESTIONS_PER_SESSION) {
      celebrations.push({
        fn: function () {
          fireGoldenConfetti();
          showCelebrationOverlay('PERFECT!', 2500);
          SoundManager.playPerfectFanfare();
        },
        duration: 2500
      });
    }

    if (leveledUp) {
      celebrations.push({
        fn: function () {
          showLevelUpPopup(savedProfile.level);
          SoundManager.playLevelUp();
          fireConfettiWithOptions(CONFETTI_COLORS, 60, 100);
        },
        duration: 2500
      });
    }

    if (tierPromoted) {
      celebrations.push({
        fn: function () {
          showCelebrationOverlay('UNLOCKED: Hard Mode!', 2500);
          SoundManager.playPerfectFanfare();
          fireConfettiWithOptions(CONFETTI_COLORS, 60, 100);
        },
        duration: 2500
      });
    }

    newBadges.forEach(function (badge) {
      celebrations.push({
        fn: function () {
          showBadgeNotification(badge);
          SoundManager.playBadgeUnlock();
        },
        duration: 3000
      });
    });

    if (celebrations.length > 0) {
      sequenceCelebrations(celebrations);
    }
  }

  function renderStars(score) {
    dom.resultsStars.innerHTML = '';
    var starCount = 0;

    if (score === 10) {
      starCount = 3;
    } else if (score >= 7) {
      starCount = 2;
    } else if (score >= 4) {
      starCount = 1;
    }

    for (var i = 0; i < starCount; i++) {
      var starSpan = document.createElement('span');
      starSpan.className = 'result-star';
      starSpan.textContent = '\u2605';
      starSpan.style.animationDelay = (i * 0.2) + 's';
      dom.resultsStars.appendChild(starSpan);
    }
  }

  function renderResultsMessage(score) {
    var message = '';
    if (score === 10) {
      message = 'Perfect score! Amazing!';
    } else if (score >= 7) {
      message = 'Great job! Keep it up!';
    } else if (score >= 4) {
      message = 'Good effort! Practice makes perfect!';
    } else {
      message = 'Keep practicing, you\'ll get better!';
    }
    dom.resultsMessage.textContent = message;
  }

  function renderWrongAnswerReview() {
    dom.resultsReview.innerHTML = '';

    if (state.wrongAnswers.length === 0) return;

    var heading = document.createElement('h3');
    heading.textContent = 'Review';
    dom.resultsReview.appendChild(heading);

    state.wrongAnswers.forEach(function (item) {
      var reviewItem = document.createElement('div');
      reviewItem.className = 'review-item';

      var questionDiv = document.createElement('div');
      questionDiv.className = 'review-question';
      questionDiv.innerHTML = item.question;

      var answersDiv = document.createElement('div');
      answersDiv.className = 'review-answers';

      var wrongSpan = document.createElement('span');
      wrongSpan.className = 'review-wrong';
      wrongSpan.textContent = item.selected;

      var correctSpan = document.createElement('span');
      correctSpan.className = 'review-correct';
      correctSpan.textContent = item.correct;

      answersDiv.appendChild(document.createTextNode('Your answer: '));
      answersDiv.appendChild(wrongSpan);
      answersDiv.appendChild(document.createTextNode(' \u2014 Correct: '));
      answersDiv.appendChild(correctSpan);

      reviewItem.appendChild(questionDiv);
      reviewItem.appendChild(answersDiv);
      dom.resultsReview.appendChild(reviewItem);
    });
  }

  // ── Question Generation ────────────────────────────────────────────────

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateQuestion(grade, tier) {
    var isHard = tier === 'hard';

    switch (grade) {
      case 'K':
        return generateAddition(isHard ? 0 : 0, isHard ? 10 : 5);
      case '1':
        return generateAddition(isHard ? 0 : 0, isHard ? 20 : 10);
      case '2':
        return generateSubtraction(isHard ? 0 : 0, isHard ? 20 : 10);
      case '3':
        return generateMultiplication(isHard ? 0 : 0, isHard ? 10 : 5);
      case '4':
        return generateDivision(isHard ? 1 : 1, isHard ? 10 : 5);
      case '5':
        return generateFraction(isHard ? 2 : 2, isHard ? 12 : 6);
      case '6':
        return generateDecimal(isHard ? 2 : 1);
      case '7':
        return generateIntegers(isHard ? -50 : -10, isHard ? 50 : 10);
      case '8':
        return generateLinearEquation(isHard);
      default:
        return generateAddition(0, 5);
    }
  }

  function generateAddition(min, max) {
    var a = randInt(min, max);
    var b = randInt(min, max);
    return {
      question: a + ' + ' + b + ' = ?',
      answer: a + b
    };
  }

  function generateSubtraction(min, max) {
    var a = randInt(min, max);
    var b = randInt(min, max);
    if (a < b) {
      var temp = a;
      a = b;
      b = temp;
    }
    return {
      question: a + ' - ' + b + ' = ?',
      answer: a - b
    };
  }

  function generateMultiplication(min, max) {
    var a = randInt(min, max);
    var b = randInt(min, max);
    return {
      question: a + ' \u00D7 ' + b + ' = ?',
      answer: a * b
    };
  }

  function generateDivision(minB, maxB) {
    var b = randInt(minB, maxB);
    var m = randInt(0, maxB);
    var a = b * m;
    return {
      question: a + ' \u00F7 ' + b + ' = ?',
      answer: m
    };
  }

  function generateFraction(minD, maxD) {
    var d = randInt(minD, maxD);
    var a = randInt(1, d);
    var b = randInt(1, d);
    var numeratorSum = a + b;
    return {
      question: a + '/' + d + ' + ' + b + '/' + d + ' = ?',
      answer: numeratorSum + '/' + d,
      denominator: d
    };
  }

  function generateDecimal(places) {
    var a, b;
    if (places === 1) {
      a = randInt(1, 99) / 10;
      b = randInt(1, 99) / 10;
    } else {
      a = randInt(1, 999) / 100;
      b = randInt(1, 999) / 100;
    }
    var sum = a + b;
    return {
      question: a.toFixed(places) + ' + ' + b.toFixed(places) + ' = ?',
      answer: sum.toFixed(places)
    };
  }

  function generateIntegers(min, max) {
    var a = randInt(min, max);
    var b = randInt(min, max);
    var op = Math.random() < 0.5 ? '+' : '-';
    var answer = op === '+' ? a + b : a - b;
    var aStr = a < 0 ? '(' + a + ')' : '' + a;
    var bStr = b < 0 ? '(' + b + ')' : '' + b;
    return {
      question: aStr + ' ' + op + ' ' + bStr + ' = ?',
      answer: answer
    };
  }

  function generateLinearEquation(isHard) {
    if (isHard) {
      var a = randInt(2, 10);
      var x = randInt(1, 20);
      var b = randInt(1, 20);
      var c = a * x + b;
      return {
        question: a + 'x + ' + b + ' = ' + c + '\nx = ?',
        answer: x
      };
    } else {
      var a2 = randInt(1, 10);
      var x2 = randInt(1, 10);
      var b2 = x2 + a2;
      return {
        question: 'x + ' + a2 + ' = ' + b2 + '\nx = ?',
        answer: x2
      };
    }
  }

  // ── Distractor Generation ──────────────────────────────────────────────

  function generateOptions(correctAnswer, grade, denominator) {
    var isFraction = grade === '5';
    var noNegatives =
      grade === 'K' ||
      grade === '1' ||
      grade === '2' ||
      grade === '3' ||
      grade === '4';

    var distractors = [];

    if (isFraction && denominator) {
      var correctNum = parseInt(String(correctAnswer).split('/')[0], 10);
      var attempts = 0;
      while (distractors.length < 3 && attempts < 50) {
        var offset = randInt(1, 5) * (Math.random() < 0.5 ? 1 : -1);
        var wrongNum = correctNum + offset;
        if (wrongNum > 0) {
          var wrongAnswer = wrongNum + '/' + denominator;
          if (
            wrongAnswer !== String(correctAnswer) &&
            distractors.indexOf(wrongAnswer) === -1
          ) {
            distractors.push(wrongAnswer);
          }
        }
        attempts++;
      }
      var fallbackOffset = 1;
      while (distractors.length < 3) {
        var wrongNum2 = correctNum + fallbackOffset;
        if (wrongNum2 <= 0) wrongNum2 = correctNum + Math.abs(fallbackOffset) + 5;
        var wrongAnswer2 = wrongNum2 + '/' + denominator;
        if (
          wrongAnswer2 !== String(correctAnswer) &&
          distractors.indexOf(wrongAnswer2) === -1
        ) {
          distractors.push(wrongAnswer2);
        }
        fallbackOffset++;
      }
    } else {
      var correctVal =
        typeof correctAnswer === 'string'
          ? parseFloat(correctAnswer)
          : correctAnswer;
      var isDecimal = typeof correctAnswer === 'string' && correctAnswer.indexOf('.') !== -1;
      var decimalPlaces = 0;
      if (isDecimal) {
        var parts = String(correctAnswer).split('.');
        decimalPlaces = parts[1] ? parts[1].length : 0;
      }

      var attempts2 = 0;
      while (distractors.length < 3 && attempts2 < 50) {
        var off = randInt(1, 5) * (Math.random() < 0.5 ? 1 : -1);
        var wrongVal;
        if (isDecimal) {
          wrongVal = correctVal + off;
          var wrongStr = wrongVal.toFixed(decimalPlaces);
          if (
            wrongStr !== String(correctAnswer) &&
            distractors.indexOf(wrongStr) === -1 &&
            (!noNegatives || parseFloat(wrongStr) >= 0)
          ) {
            distractors.push(wrongStr);
          }
        } else {
          wrongVal = correctVal + off;
          if (
            wrongVal !== correctVal &&
            distractors.indexOf(wrongVal) === -1 &&
            (!noNegatives || wrongVal >= 0)
          ) {
            distractors.push(wrongVal);
          }
        }
        attempts2++;
      }

      var fallbackOff = 1;
      while (distractors.length < 3) {
        var wv = correctVal + fallbackOff;
        if (noNegatives && wv < 0) {
          wv = correctVal + Math.abs(fallbackOff);
        }
        if (isDecimal) {
          var ws = wv.toFixed(decimalPlaces);
          if (
            ws !== String(correctAnswer) &&
            distractors.indexOf(ws) === -1
          ) {
            distractors.push(ws);
          }
        } else {
          if (wv !== correctVal && distractors.indexOf(wv) === -1) {
            distractors.push(wv);
          }
        }
        fallbackOff++;
      }
    }

    var options = [correctAnswer].concat(distractors.slice(0, 3));
    return shuffle(options);
  }

  function shuffle(arr) {
    var shuffled = arr.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled;
  }

  // ── Keyboard Support ───────────────────────────────────────────────────

  document.addEventListener('keydown', function (e) {
    if (screens.game.style.display === 'none') return;
    if (!state.acceptingInput) return;

    var key = e.key;
    if (key >= '1' && key <= '4') {
      var index = parseInt(key, 10) - 1;
      var buttons = dom.answerGrid.querySelectorAll('.answer-btn');
      if (index < buttons.length && !buttons[index].disabled) {
        buttons[index].click();
      }
    }
  });

  // ── Event Listeners ────────────────────────────────────────────────────

  dom.btnCreateProfile.addEventListener('click', createProfile);

  dom.newProfileName.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      createProfile();
    }
  });

  dom.btnChangeProfile.addEventListener('click', function () {
    showScreen('profile');
    renderProfileList();
  });

  dom.btnQuit.addEventListener('click', function () {
    if (state.advanceTimeout) {
      clearTimeout(state.advanceTimeout);
      state.advanceTimeout = null;
    }
    clearTimer();
    state.acceptingInput = false;
    dom.streakBanner.style.display = 'none';
    dom.streakBanner.classList.remove('show');
    showGradeSelect();
  });

  dom.btnPlayAgain.addEventListener('click', function () {
    startGame(state.currentGrade);
  });

  dom.btnBackGrades.addEventListener('click', function () {
    showGradeSelect();
  });

  // Mute button
  dom.btnMute.addEventListener('click', function () {
    SoundManager.enabled = !SoundManager.enabled;
    dom.btnMute.textContent = SoundManager.enabled ? '\u{1F50A}' : '\u{1F507}';
    var data = loadData();
    data.soundEnabled = SoundManager.enabled;
    saveData(data);
    if (SoundManager.enabled) SoundManager.ensureContext();
  });

  // ── Initialization ─────────────────────────────────────────────────────

  (function init() {
    var data = loadData();
    SoundManager.enabled = data.soundEnabled !== false;
    dom.btnMute.textContent = SoundManager.enabled ? '\u{1F50A}' : '\u{1F507}';
    renderProfileList();
  })();

})();
