// === Word Lists ===
var WORD_LISTS = {
  homeRow: ['dad', 'sad', 'lad', 'ash', 'dash', 'gash', 'lash', 'hash', 'flask', 'shall', 'salad', 'glass', 'falls', 'flash', 'glad', 'flag', 'half', 'add', 'lass', 'fall'],
  topRow: ['pour', 'wire', 'ripe', 'wipe', 'tier', 'trip', 'type', 'pier', 'rope', 'pout', 'riot', 'quit', 'poet', 'weep', 'root', 'pipe', 'your', 'erupt', 'power', 'quiet'],
  bottomRow: ['ban', 'van', 'cab', 'man', 'can', 'nab', 'zinc', 'bomb', 'comb', 'vine', 'vibe', 'zone', 'bone', 'come', 'mine', 'name', 'move', 'nice', 'maze', 'five'],
  numbersRow: ['123', '456', '789', '101', '200', '350', '411', '520', '630', '742', '853', '961', '147', '258', '369', '808', '919', '505', '212', '333'],
  fullKeyboard: ['the', 'cat', 'dog', 'run', 'jump', 'play', 'book', 'tree', 'fish', 'bird', 'happy', 'water', 'green', 'house', 'table', 'chair', 'light', 'music', 'river', 'cloud', 'pencil', 'orange', 'purple', 'window', 'garden'],
  allKeys: ['keyboard', 'complete', 'practice', 'exercise', 'alphabet', 'sentence', 'question', 'favorite', 'mountain', 'together', 'dinosaur', 'elephant', 'treasure', 'surprise', 'birthday', 'sandwich', 'homework', 'backpack', 'champion', 'firework']
};

var LEVEL_META = {
  homeRow:      { name: 'Home Row',      order: 1 },
  topRow:       { name: 'Top Row',       order: 2 },
  bottomRow:    { name: 'Bottom Row',    order: 3 },
  numbersRow:   { name: 'Numbers',       order: 4 },
  fullKeyboard: { name: 'Full Keyboard', order: 5 },
  allKeys:      { name: 'All Keys',      order: 6 }
};

var KEYBOARD_LAYOUT = [
  ['1','2','3','4','5','6','7','8','9','0'],
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m']
];

var FINGER_COLORS = {
  '1':'#E91E63','q':'#E91E63','a':'#E91E63','z':'#E91E63',
  '2':'#9C27B0','w':'#9C27B0','s':'#9C27B0','x':'#9C27B0',
  '3':'#673AB7','e':'#673AB7','d':'#673AB7','c':'#673AB7',
  '4':'#3F51B5','r':'#3F51B5','f':'#3F51B5','v':'#3F51B5',
  '5':'#009688','t':'#009688','g':'#009688','b':'#009688',
  '6':'#009688','y':'#009688','h':'#009688','n':'#009688',
  '7':'#FF9800','u':'#FF9800','j':'#FF9800','m':'#FF9800',
  '8':'#FF5722','i':'#FF5722','k':'#FF5722',
  '9':'#795548','o':'#795548','l':'#795548',
  '0':'#607D8B','p':'#607D8B'
};

// === Sound Engine (Web Audio API, all synthesized) ===
var SoundEngine = {
  ctx: null,
  enabled: true,

  init: function() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  _tone: function(freq, type, duration, startDelay) {
    if (!this.enabled || !this.ctx) return;
    var now = this.ctx.currentTime + (startDelay || 0);
    var osc = this.ctx.createOscillator();
    var gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
  },

  correctKey: function() { this._tone(880, 'sine', 0.05); },
  wrongKey: function() { this._tone(200, 'square', 0.08); },

  wordComplete: function() {
    this._tone(523, 'sine', 0.08, 0);
    this._tone(659, 'sine', 0.08, 0.08);
    this._tone(784, 'sine', 0.08, 0.16);
  },

  sessionComplete: function() {
    this._tone(523, 'sine', 0.1, 0);
    this._tone(587, 'sine', 0.1, 0.1);
    this._tone(659, 'sine', 0.1, 0.2);
    this._tone(784, 'sine', 0.1, 0.3);
    this._tone(880, 'sine', 0.15, 0.4);
  },

  newRecord: function() {
    this._tone(523, 'sine', 0.1, 0);
    this._tone(659, 'sine', 0.1, 0.1);
    this._tone(784, 'sine', 0.1, 0.2);
    this._tone(880, 'sine', 0.1, 0.3);
    this._tone(1047, 'sine', 0.2, 0.4);
    // Sustaining chord
    this._tone(523, 'sine', 0.4, 0.6);
    this._tone(659, 'sine', 0.4, 0.6);
    this._tone(784, 'sine', 0.4, 0.6);
  },

  streakMilestone: function() {
    this._tone(1047, 'sine', 0.06, 0);
    this._tone(1319, 'sine', 0.06, 0.06);
    this._tone(1568, 'sine', 0.1, 0.12);
  },

  play: function(type) {
    if (!this.enabled || !this.ctx) return;
    switch (type) {
      case 'correct': this.correctKey(); break;
      case 'wrong': this.wrongKey(); break;
      case 'wordComplete': this.wordComplete(); break;
      case 'sessionComplete': this.sessionComplete(); break;
      case 'newRecord': this.newRecord(); break;
      case 'streakMilestone': this.streakMilestone(); break;
    }
  }
};

// === Game State ===
var currentLevel = null;
var gameMode = 'practice';
var timedDuration = 30;
var timedWordsCompleted = 0;
var completedCorrect = 0;
var completedTyped = 0;
var timerInterval = null;
var timeRemaining = 0;
var words = [];
var wordPool = [];
var currentWordIndex = 0;
var currentCharIndex = 0;
var startTime = null;
var totalCorrect = 0;
var totalTyped = 0;
var firstAttempt = [];
var gameActive = false;
var currentStreak = 0;
var bestSessionStreak = 0;
var selectedLevel = null;
var currentChartMode = 'wpm';
var currentChartLevel = null;

// === localStorage with Migration ===

function defaultStats() {
  return { bestWpm: 0, bestAccuracy: 0, sessions: 0, bestStreak: 0, history: [] };
}

function migrateData(data) {
  if (!data.version) {
    data.version = 1;
    if (!data.settings) {
      data.settings = { soundEnabled: true };
    }
    var levelKeys = Object.keys(LEVEL_META);
    data.profiles.forEach(function(profile) {
      levelKeys.forEach(function(key) {
        if (!profile.stats[key]) {
          profile.stats[key] = defaultStats();
        } else {
          if (profile.stats[key].bestStreak === undefined) profile.stats[key].bestStreak = 0;
          if (!profile.stats[key].history) profile.stats[key].history = [];
        }
      });
      if (!profile.stats.timed) {
        profile.stats.timed = {};
      }
    });
  }
  return data;
}

function loadData() {
  try {
    var raw = localStorage.getItem('typingGame');
    if (raw) {
      var data = JSON.parse(raw);
      var hadVersion = data.version !== undefined;
      var migrated = migrateData(data);
      if (!hadVersion) {
        saveData(migrated);
      }
      return migrated;
    }
  } catch (e) {
    // ignore parse errors
  }
  return migrateData({ profiles: [], activeProfileId: null });
}

function saveData(data) {
  localStorage.setItem('typingGame', JSON.stringify(data));
}

// === Screen Navigation ===

function showScreen(screenId) {
  document.getElementById('screen-profile').style.display = 'none';
  document.getElementById('screen-levels').style.display = 'none';
  document.getElementById('screen-typing').style.display = 'none';

  var screen = document.getElementById(screenId);
  screen.style.display = 'block';

  // Trigger enter animation
  screen.classList.remove('screen-enter');
  void screen.offsetWidth;
  screen.classList.add('screen-enter');

  if (document.activeElement) {
    document.activeElement.blur();
  }
}

// === Profile CRUD ===

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function createProfile(name) {
  var data = loadData();
  var stats = {};
  Object.keys(LEVEL_META).forEach(function(key) {
    stats[key] = defaultStats();
  });
  stats.timed = {};
  var profile = { id: generateId(), name: name, stats: stats };
  data.profiles.push(profile);
  saveData(data);
  renderProfileList();
}

function deleteProfile(id) {
  var data = loadData();
  var profile = data.profiles.find(function(p) { return p.id === id; });
  if (!profile) return;
  if (!confirm('Delete profile "' + profile.name + '"?')) return;
  data.profiles = data.profiles.filter(function(p) { return p.id !== id; });
  if (data.activeProfileId === id) {
    data.activeProfileId = null;
  }
  saveData(data);
  renderProfileList();
}

function selectProfile(id) {
  var data = loadData();
  data.activeProfileId = id;
  saveData(data);
  showLevelSelect();
}

function renderProfileList() {
  var data = loadData();
  var listEl = document.getElementById('profile-list');
  listEl.innerHTML = '';

  data.profiles.forEach(function(profile) {
    var item = document.createElement('div');
    item.className = 'profile-item';

    var btn = document.createElement('button');
    btn.className = 'profile-btn';
    btn.textContent = profile.name;
    btn.addEventListener('click', function() {
      selectProfile(profile.id);
    });

    var delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'X';
    delBtn.addEventListener('click', function() {
      deleteProfile(profile.id);
    });

    item.appendChild(btn);
    item.appendChild(delBtn);
    listEl.appendChild(item);
  });
}

// === Level Select ===

function getActiveProfile() {
  var data = loadData();
  if (!data.activeProfileId) return null;
  return data.profiles.find(function(p) { return p.id === data.activeProfileId; }) || null;
}

function showLevelSelect() {
  var profile = getActiveProfile();
  if (!profile) {
    showScreen('screen-profile');
    return;
  }

  document.getElementById('active-profile-name').textContent = profile.name;
  document.getElementById('mode-selector').style.display = 'none';
  document.getElementById('level-list').style.display = 'grid';
  document.getElementById('change-profile-btn').style.display = 'block';
  renderLevelButtons(profile);
  showScreen('screen-levels');
}

function renderLevelButtons(profile) {
  var container = document.getElementById('level-list');
  container.innerHTML = '';

  var levelKeys = Object.keys(LEVEL_META).sort(function(a, b) {
    return LEVEL_META[a].order - LEVEL_META[b].order;
  });

  levelKeys.forEach(function(key) {
    var meta = LEVEL_META[key];
    var stats = profile.stats[key] || defaultStats();

    var btn = document.createElement('button');
    btn.className = 'level-btn';
    btn.setAttribute('data-level', key);

    var title = document.createElement('span');
    title.className = 'level-title';
    title.textContent = meta.name;

    var statsDiv = document.createElement('div');
    statsDiv.className = 'level-stats';
    if (stats.sessions > 0) {
      statsDiv.textContent = 'Best: ' + stats.bestWpm + ' WPM | ' + stats.bestAccuracy + '%';
    }

    btn.appendChild(title);
    btn.appendChild(statsDiv);

    // Stats chart button
    var chartBtn = document.createElement('button');
    chartBtn.className = 'stats-btn';
    chartBtn.textContent = '\uD83D\uDCCA';
    chartBtn.title = 'View history';
    chartBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showStatsOverlay(key);
    });
    btn.appendChild(chartBtn);

    btn.addEventListener('click', function() {
      SoundEngine.init();
      selectedLevel = key;
      showModeSelector(key);
    });

    container.appendChild(btn);
  });
}

function showModeSelector(level) {
  document.getElementById('mode-level-name').textContent = LEVEL_META[level].name;
  document.getElementById('level-list').style.display = 'none';
  document.getElementById('mode-selector').style.display = 'block';
  document.getElementById('change-profile-btn').style.display = 'none';
}

function hideModeSelector() {
  document.getElementById('mode-selector').style.display = 'none';
  document.getElementById('level-list').style.display = 'grid';
  document.getElementById('change-profile-btn').style.display = 'block';
}

// === Word Selection (Fisher-Yates) ===

function shuffleArray(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function pickWords(level, count) {
  var shuffled = shuffleArray(WORD_LISTS[level]);
  return shuffled.slice(0, count || 5);
}

// === On-Screen Keyboard ===

function renderKeyboard() {
  var container = document.getElementById('keyboard-container');
  container.innerHTML = '';
  container.style.display = '';

  KEYBOARD_LAYOUT.forEach(function(row) {
    var rowDiv = document.createElement('div');
    rowDiv.className = 'kb-row';

    row.forEach(function(key) {
      var keyDiv = document.createElement('div');
      keyDiv.className = 'kb-key';
      keyDiv.setAttribute('data-key', key);
      keyDiv.textContent = key;
      if (FINGER_COLORS[key]) {
        keyDiv.style.borderBottom = '3px solid ' + FINGER_COLORS[key];
      }
      rowDiv.appendChild(keyDiv);
    });

    container.appendChild(rowDiv);
  });
}

function highlightNextKey(char) {
  var keys = document.querySelectorAll('.kb-key');
  keys.forEach(function(k) { k.classList.remove('kb-next'); });
  if (char) {
    var target = document.querySelector('.kb-key[data-key="' + char + '"]');
    if (target) target.classList.add('kb-next');
  }
}

function flashKey(char, isCorrect) {
  var target = document.querySelector('.kb-key[data-key="' + char.toLowerCase() + '"]');
  if (!target) return;
  var cls = isCorrect ? 'kb-correct' : 'kb-wrong';
  target.classList.add(cls);
  setTimeout(function() { target.classList.remove(cls); }, 200);
}

// === Streak ===

function updateStreakDisplay() {
  var countEl = document.getElementById('streak-count');
  var displayEl = document.getElementById('streak-display');
  countEl.textContent = currentStreak;

  displayEl.classList.remove('streak-warm', 'streak-hot', 'streak-fire', 'streak-epic');

  if (currentStreak >= 20) {
    displayEl.classList.add('streak-epic');
  } else if (currentStreak >= 15) {
    displayEl.classList.add('streak-fire');
  } else if (currentStreak >= 10) {
    displayEl.classList.add('streak-hot');
  } else if (currentStreak >= 5) {
    displayEl.classList.add('streak-warm');
  }
}

// === Confetti ===

function showConfetti(mini) {
  var canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  var dpr = window.devicePixelRatio || 1;
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  var count = mini ? 20 : 50;
  var particles = [];
  var colors = ['#F44336','#E91E63','#9C27B0','#2196F3','#4CAF50','#FF9800','#FFEB3B'];

  for (var i = 0; i < count; i++) {
    particles.push({
      x: mini ? w / 2 : Math.random() * w,
      y: mini ? h * 0.4 : -10,
      vx: (Math.random() - 0.5) * (mini ? 8 : 6),
      vy: mini ? -(Math.random() * 6 + 2) : (Math.random() * 3 + 2),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      gravity: 0.15
    });
  }

  var startT = Date.now();
  var duration = mini ? 1200 : 2000;

  function animate() {
    var elapsed = Date.now() - startT;
    if (elapsed > duration) {
      canvas.remove();
      return;
    }
    ctx.clearRect(0, 0, w, h);
    var life = Math.max(0, 1 - elapsed / duration);
    particles.forEach(function(p) {
      p.x += p.vx;
      p.vy += p.gravity;
      p.y += p.vy;
      ctx.globalAlpha = life;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// === Game ===

function resetTypingUI() {
  document.getElementById('word-display').style.display = 'flex';
  document.getElementById('word-counter').style.display = 'block';
  document.getElementById('keyboard-container').style.display = '';
  document.getElementById('streak-display').style.display = 'block';
}

function startGame(level, mode, duration) {
  currentLevel = level;
  gameMode = mode || 'practice';
  currentWordIndex = 0;
  currentCharIndex = 0;
  startTime = null;
  totalCorrect = 0;
  totalTyped = 0;
  firstAttempt = [];
  currentStreak = 0;
  bestSessionStreak = 0;

  resetTypingUI();

  // Level name
  var suffix = gameMode === 'timed' ? ' (Timed)' : '';
  document.getElementById('level-name').textContent = LEVEL_META[level].name + suffix;

  // Hide results
  document.getElementById('results').style.display = 'none';
  document.getElementById('result-best').style.display = 'none';
  document.getElementById('result-words-completed').style.display = 'none';

  // Timer setup
  if (gameMode === 'timed') {
    timedDuration = duration || 30;
    timeRemaining = timedDuration;
    timedWordsCompleted = 0;
    completedCorrect = 0;
    completedTyped = 0;
    timerInterval = null;
    document.getElementById('timer-display').style.display = 'block';
    document.getElementById('time-remaining').textContent = timeRemaining;
    document.getElementById('time-remaining').classList.remove('timer-warning');
    document.getElementById('word-counter').textContent = 'Words: 0';
    // Full shuffled pool for timed mode
    wordPool = shuffleArray(WORD_LISTS[level]);
    words = wordPool;
  } else {
    document.getElementById('timer-display').style.display = 'none';
    words = pickWords(level, 5);
    updateWordCounter();
  }

  showScreen('screen-typing');
  renderKeyboard();
  updateStreakDisplay();
  renderWord(words[currentWordIndex]);
  gameActive = true;
}

function renderWord(word) {
  var display = document.getElementById('word-display');
  display.innerHTML = '';
  firstAttempt[currentWordIndex] = [];

  for (var i = 0; i < word.length; i++) {
    var span = document.createElement('span');
    span.className = 'char pending';
    span.textContent = word[i];
    if (i === 0) {
      span.classList.add('current');
    }
    display.appendChild(span);
    firstAttempt[currentWordIndex][i] = null;
  }

  highlightNextKey(word[0]);
}

function updateWordCounter() {
  document.getElementById('word-counter').textContent = 'Word ' + (currentWordIndex + 1) + ' of 5';
}

function getCharSpans() {
  return document.getElementById('word-display').querySelectorAll('.char');
}

function handleCharInput(typed) {
  if (!startTime) {
    startTime = Date.now();
    if (gameMode === 'timed') {
      startTimer();
    }
  }

  var word = words[currentWordIndex];
  var expected = word[currentCharIndex];
  var spans = getCharSpans();
  var span = spans[currentCharIndex];

  span.classList.remove('current');

  var isCorrect = typed === expected;

  if (isCorrect) {
    span.className = 'char correct';
    totalCorrect++;
    currentStreak++;
    if (currentStreak > bestSessionStreak) bestSessionStreak = currentStreak;

    span.classList.add('correct-pop');
    span.addEventListener('animationend', function handler() {
      span.classList.remove('correct-pop');
      span.removeEventListener('animationend', handler);
    });

    SoundEngine.play('correct');
    flashKey(typed, true);

    // Streak milestones
    if (currentStreak === 5 || currentStreak === 10 || currentStreak === 15 || currentStreak === 20) {
      SoundEngine.play('streakMilestone');
      showConfetti(true);
    }
  } else {
    span.className = 'char incorrect';
    currentStreak = 0;

    span.classList.add('wrong-shake');
    span.addEventListener('animationend', function handler() {
      span.classList.remove('wrong-shake');
      span.removeEventListener('animationend', handler);
    });

    SoundEngine.play('wrong');
    flashKey(expected, false);
  }

  totalTyped++;
  updateStreakDisplay();

  if (firstAttempt[currentWordIndex][currentCharIndex] === null) {
    firstAttempt[currentWordIndex][currentCharIndex] = isCorrect;
  }

  currentCharIndex++;

  if (currentCharIndex < word.length) {
    spans[currentCharIndex].classList.add('current');
    highlightNextKey(word[currentCharIndex]);
  } else {
    // Word complete
    SoundEngine.play('wordComplete');
    highlightNextKey(null);

    if (gameMode === 'timed') {
      timedWordsCompleted++;
      completedCorrect = totalCorrect;
      completedTyped = totalTyped;
      document.getElementById('word-counter').textContent = 'Words: ' + timedWordsCompleted;

      // Immediately advance — no delay in timed mode
      currentWordIndex++;
      if (currentWordIndex >= words.length) {
        wordPool = shuffleArray(WORD_LISTS[currentLevel]);
        words = wordPool;
        currentWordIndex = 0;
      }
      currentCharIndex = 0;
      renderWord(words[currentWordIndex]);
    } else {
      gameActive = false;
      if (currentWordIndex < 4) {
        setTimeout(function() { nextWord(); }, 500);
      } else {
        setTimeout(function() { showResults(); }, 500);
      }
    }
  }
}

function handleBackspace() {
  if (currentCharIndex > 0) {
    var spans = getCharSpans();

    if (currentCharIndex < spans.length) {
      spans[currentCharIndex].classList.remove('current');
    }

    currentCharIndex--;
    totalTyped--;

    var span = spans[currentCharIndex];
    span.className = 'char pending current';

    highlightNextKey(words[currentWordIndex][currentCharIndex]);
  }
}

function nextWord() {
  currentWordIndex++;
  currentCharIndex = 0;
  updateWordCounter();
  renderWord(words[currentWordIndex]);
  gameActive = true;
}

// === Timer (Timed Mode) ===

function startTimer() {
  timerInterval = setInterval(function() {
    timeRemaining--;
    var el = document.getElementById('time-remaining');
    el.textContent = timeRemaining;

    if (timeRemaining <= 10) {
      el.classList.add('timer-warning');
    }

    if (timeRemaining <= 0) {
      endTimedGame();
    }
  }, 1000);
}

function endTimedGame() {
  clearInterval(timerInterval);
  timerInterval = null;
  gameActive = false;
  showTimedResults();
}

function hideGameUI() {
  document.getElementById('keyboard-container').style.display = 'none';
  document.getElementById('streak-display').style.display = 'none';
  document.getElementById('word-display').style.display = 'none';
  document.getElementById('word-counter').style.display = 'none';
  document.getElementById('timer-display').style.display = 'none';
}

function showTimedResults() {
  // Use only completed-word stats
  var usedCorrect = completedCorrect;
  var usedTyped = completedTyped;
  var elapsedMinutes = timedDuration / 60;
  var wpm = usedTyped > 0 ? Math.round((usedTyped / 5) / elapsedMinutes) : 0;
  var accuracy = usedTyped > 0 ? Math.round((usedCorrect / usedTyped) * 100) : 0;

  document.getElementById('result-wpm').innerHTML =
    '<div class="result-value">' + wpm + ' WPM</div><div class="result-label">Words Per Minute</div>';
  document.getElementById('result-accuracy').innerHTML =
    '<div class="result-value">' + accuracy + '%</div><div class="result-label">Accuracy</div>';
  document.getElementById('result-streak').innerHTML =
    '<div class="result-value">' + bestSessionStreak + '</div><div class="result-label">Best Streak</div>';
  document.getElementById('result-words-completed').textContent = timedWordsCompleted + ' words completed';
  document.getElementById('result-words-completed').style.display = 'block';

  // Save timed stats
  var data = loadData();
  var profile = data.profiles.find(function(p) { return p.id === data.activeProfileId; });
  var isNewBest = false;

  if (profile) {
    if (!profile.stats.timed[currentLevel]) {
      profile.stats.timed[currentLevel] = {};
    }
    if (!profile.stats.timed[currentLevel][timedDuration]) {
      profile.stats.timed[currentLevel][timedDuration] = { bestWpm: 0, bestAccuracy: 0, sessions: 0, bestWords: 0 };
    }
    var ts = profile.stats.timed[currentLevel][timedDuration];
    ts.sessions++;
    if (wpm > ts.bestWpm) { ts.bestWpm = wpm; isNewBest = true; }
    if (accuracy > ts.bestAccuracy) { ts.bestAccuracy = accuracy; isNewBest = true; }
    if (timedWordsCompleted > (ts.bestWords || 0)) { ts.bestWords = timedWordsCompleted; isNewBest = true; }
    saveData(data);
  }

  var bestEl = document.getElementById('result-best');
  if (isNewBest) {
    bestEl.textContent = 'New personal best!';
    bestEl.style.display = 'block';
    SoundEngine.play('newRecord');
    showConfetti(false);
  } else {
    bestEl.style.display = 'none';
    SoundEngine.play('sessionComplete');
  }

  hideGameUI();
  document.getElementById('results').style.display = 'block';
}

// === Results (Practice Mode) ===

function showResults() {
  var endTime = Date.now();
  var elapsedMinutes = (endTime - startTime) / 60000;
  var wpm = Math.round((totalTyped / 5) / elapsedMinutes);
  var accuracy = Math.round((totalCorrect / totalTyped) * 100);

  document.getElementById('result-wpm').innerHTML =
    '<div class="result-value">' + wpm + ' WPM</div><div class="result-label">Words Per Minute</div>';
  document.getElementById('result-accuracy').innerHTML =
    '<div class="result-value">' + accuracy + '%</div><div class="result-label">Accuracy</div>';
  document.getElementById('result-streak').innerHTML =
    '<div class="result-value">' + bestSessionStreak + '</div><div class="result-label">Best Streak</div>';
  document.getElementById('result-words-completed').style.display = 'none';

  // Update personal best
  var data = loadData();
  var profile = data.profiles.find(function(p) { return p.id === data.activeProfileId; });
  var isNewBest = false;

  if (profile) {
    var stats = profile.stats[currentLevel];
    stats.sessions++;

    if (wpm > stats.bestWpm) {
      stats.bestWpm = wpm;
      isNewBest = true;
    }
    if (accuracy > stats.bestAccuracy) {
      stats.bestAccuracy = accuracy;
      isNewBest = true;
    }
    if (bestSessionStreak > stats.bestStreak) {
      stats.bestStreak = bestSessionStreak;
    }

    // Session history (cap at 20)
    stats.history.push({ date: Date.now(), wpm: wpm, accuracy: accuracy });
    if (stats.history.length > 20) {
      stats.history.shift();
    }

    saveData(data);
  }

  var bestEl = document.getElementById('result-best');
  if (isNewBest) {
    bestEl.textContent = 'New personal best!';
    bestEl.style.display = 'block';
    SoundEngine.play('newRecord');
    showConfetti(false);
  } else {
    bestEl.style.display = 'none';
    SoundEngine.play('sessionComplete');
  }

  hideGameUI();
  document.getElementById('results').style.display = 'block';
  gameActive = false;
}

// === Stats Overlay & Chart ===

function showStatsOverlay(level) {
  currentChartLevel = level;
  currentChartMode = 'wpm';
  document.getElementById('stats-overlay-title').textContent = LEVEL_META[level].name + ' History';
  document.getElementById('chart-wpm-btn').classList.add('btn-primary');
  document.getElementById('chart-acc-btn').classList.remove('btn-primary');
  renderChart(level, 'wpm');
  document.getElementById('stats-overlay').style.display = 'flex';
}

function hideStatsOverlay() {
  document.getElementById('stats-overlay').style.display = 'none';
}

function renderChart(level, mode) {
  var canvas = document.getElementById('stats-chart');
  var dpr = window.devicePixelRatio || 1;
  var cssW = 350;
  var cssH = 200;
  canvas.style.width = cssW + 'px';
  canvas.style.height = cssH + 'px';
  canvas.width = cssW * dpr;
  canvas.height = cssH * dpr;

  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, cssW, cssH);

  var profile = getActiveProfile();
  if (!profile || !profile.stats[level]) return;
  var history = profile.stats[level].history || [];

  if (history.length === 0) {
    ctx.fillStyle = '#666';
    ctx.font = '16px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('No sessions yet', cssW / 2, cssH / 2);
    return;
  }

  var values = history.map(function(h) { return mode === 'wpm' ? h.wpm : h.accuracy; });
  var maxVal = Math.max.apply(null, values);
  var minVal = Math.min.apply(null, values);
  if (maxVal === minVal) {
    maxVal += 10;
    minVal = Math.max(0, minVal - 10);
  }

  var padL = 45, padR = 15, padT = 20, padB = 30;
  var chartW = cssW - padL - padR;
  var chartH = cssH - padT - padB;

  // Axes
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padL, padT);
  ctx.lineTo(padL, padT + chartH);
  ctx.lineTo(padL + chartW, padT + chartH);
  ctx.stroke();

  // Y axis labels & grid
  ctx.fillStyle = '#666';
  ctx.font = '12px Segoe UI, sans-serif';
  ctx.textAlign = 'right';
  for (var i = 0; i <= 4; i++) {
    var val = Math.round(minVal + (maxVal - minVal) * (i / 4));
    var y = padT + chartH - (chartH * (i / 4));
    ctx.fillText(val + (mode === 'accuracy' ? '%' : ''), padL - 5, y + 4);
    ctx.strokeStyle = '#eee';
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(padL + chartW, y);
    ctx.stroke();
  }

  // X axis labels
  ctx.textAlign = 'center';
  ctx.fillStyle = '#666';

  // Plot line
  var points = [];
  ctx.strokeStyle = '#2196F3';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (var j = 0; j < values.length; j++) {
    var x = values.length === 1
      ? padL + chartW / 2
      : padL + (chartW * j / (values.length - 1));
    var yVal = padT + chartH - (chartH * (values[j] - minVal) / (maxVal - minVal));
    points.push({ x: x, y: yVal });
    if (j === 0) ctx.moveTo(x, yVal);
    else ctx.lineTo(x, yVal);

    if (values.length <= 10 || j % Math.ceil(values.length / 10) === 0) {
      ctx.fillText(j + 1, x, padT + chartH + 18);
    }
  }
  ctx.stroke();

  // Dots
  points.forEach(function(pt) {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#2196F3';
    ctx.fill();
  });
}

// === Sound Button ===

function updateSoundButton() {
  document.getElementById('sound-toggle').textContent = SoundEngine.enabled ? '\uD83D\uDD0A' : '\uD83D\uDD07';
}

// === Keydown Handler ===

document.addEventListener('keydown', function(e) {
  if (!gameActive) return;

  if (e.key === 'Backspace') {
    e.preventDefault();
    handleBackspace();
    return;
  }

  if (e.key.length !== 1) return;
  if (e.ctrlKey || e.altKey || e.metaKey) return;

  e.preventDefault();

  var typed = e.key.toLowerCase();
  handleCharInput(typed);
});

// === Initialization ===

document.addEventListener('DOMContentLoaded', function() {
  var data = loadData();
  SoundEngine.enabled = data.settings ? data.settings.soundEnabled : true;
  updateSoundButton();

  renderProfileList();

  // Create Profile
  document.getElementById('create-profile-btn').addEventListener('click', function() {
    var input = document.getElementById('profile-name-input');
    var name = input.value.trim();
    if (!name) return;
    createProfile(name);
    input.value = '';
  });

  document.getElementById('profile-name-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('create-profile-btn').click();
    }
  });

  // Change profile
  document.getElementById('change-profile-btn').addEventListener('click', function() {
    showScreen('screen-profile');
  });

  // Mode selector
  document.getElementById('mode-practice-btn').addEventListener('click', function() {
    startGame(selectedLevel, 'practice');
  });

  document.getElementById('mode-timed-30-btn').addEventListener('click', function() {
    startGame(selectedLevel, 'timed', 30);
  });

  document.getElementById('mode-timed-60-btn').addEventListener('click', function() {
    startGame(selectedLevel, 'timed', 60);
  });

  document.getElementById('mode-back-btn').addEventListener('click', function() {
    hideModeSelector();
  });

  // Play Again
  document.getElementById('play-again-btn').addEventListener('click', function() {
    resetTypingUI();
    startGame(currentLevel, gameMode, gameMode === 'timed' ? timedDuration : undefined);
  });

  // Back to Levels
  document.getElementById('back-to-levels-btn').addEventListener('click', function() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    resetTypingUI();
    showLevelSelect();
  });

  // Sound toggle
  document.getElementById('sound-toggle').addEventListener('click', function() {
    SoundEngine.init();
    SoundEngine.enabled = !SoundEngine.enabled;
    var d = loadData();
    d.settings.soundEnabled = SoundEngine.enabled;
    saveData(d);
    updateSoundButton();
  });

  // Stats overlay
  document.getElementById('stats-close-btn').addEventListener('click', hideStatsOverlay);

  document.getElementById('chart-wpm-btn').addEventListener('click', function() {
    currentChartMode = 'wpm';
    this.classList.add('btn-primary');
    document.getElementById('chart-acc-btn').classList.remove('btn-primary');
    renderChart(currentChartLevel, 'wpm');
  });

  document.getElementById('chart-acc-btn').addEventListener('click', function() {
    currentChartMode = 'accuracy';
    this.classList.add('btn-primary');
    document.getElementById('chart-wpm-btn').classList.remove('btn-primary');
    renderChart(currentChartLevel, 'accuracy');
  });

  document.getElementById('stats-overlay').addEventListener('click', function(e) {
    if (e.target === this) hideStatsOverlay();
  });
});
