(function () {
    'use strict';

    // === Constants ===
    var STORAGE_KEY = 'codingGame';
    var CELL_SIZE = 60;
    var stepDelay = 500;
    var currentSpeed = 'normal';
    var SPEED_VALUES = { slow: 800, normal: 500, fast: 200 };

    var DIRECTIONS = [
        { dx: 0, dy: -1 },  // 0 = up
        { dx: 1, dy: 0 },   // 1 = right
        { dx: 0, dy: 1 },   // 2 = down
        { dx: -1, dy: 0 }   // 3 = left
    ];
    var DIR_ARROWS = ['\u25B2', '\u25B6', '\u25BC', '\u25C0']; // ▲ ▶ ▼ ◀

    var CMD_INFO = {
        forward: { symbol: '\u25B2', label: 'Forward', cls: 'seq-forward' },
        left:    { symbol: '\u21B0', label: 'Left',    cls: 'seq-left' },
        right:   { symbol: '\u21B1', label: 'Right',   cls: 'seq-right' },
        jump:    { symbol: '\u27F0', label: 'Jump',    cls: 'seq-jump' }
    };

    // === Level Data ===
    var LEVELS = [
        {
            id: 1,
            name: 'First Steps',
            grid: [[0,0,0],[0,0,0],[0,0,0]],
            start: { x: 0, y: 2, direction: 0 },
            goal: { x: 0, y: 0 },
            hint: 'Use Forward to move up!',
            optimalSteps: 2
        },
        {
            id: 2,
            name: 'Turn Right',
            grid: [[0,0,0],[0,0,0],[0,0,0]],
            start: { x: 0, y: 2, direction: 0 },
            goal: { x: 1, y: 1 },
            hint: 'You can turn to change direction!',
            optimalSteps: 3
        },
        {
            id: 3,
            name: 'Turn Left',
            grid: [[0,0,0],[0,0,0],[0,0,0]],
            start: { x: 2, y: 2, direction: 0 },
            goal: { x: 0, y: 1 },
            hint: 'Sometimes you need to turn left!',
            optimalSteps: 4
        },
        {
            id: 4,
            name: 'Longer Path',
            grid: [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ],
            start: { x: 0, y: 3, direction: 0 },
            goal: { x: 2, y: 1 },
            hint: 'Plan your path step by step!',
            optimalSteps: 5,
            coins: [{ x: 1, y: 2 }, { x: 3, y: 2 }]
        },
        {
            id: 5,
            name: 'Wall Ahead',
            grid: [
                [0,0,0,0],
                [0,1,1,0],
                [0,0,0,0],
                [0,0,0,0]
            ],
            start: { x: 0, y: 3, direction: 0 },
            goal: { x: 3, y: 0 },
            hint: 'Walls block your path. Go around them!',
            optimalSteps: 7,
            coins: [{ x: 0, y: 1 }, { x: 3, y: 1 }]
        },
        {
            id: 6,
            name: 'L-Shape',
            grid: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,1,1,1],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            start: { x: 0, y: 4, direction: 0 },
            goal: { x: 4, y: 0 },
            hint: 'Find the L-shaped path around the walls!',
            optimalSteps: 9,
            coins: [{ x: 1, y: 2 }, { x: 0, y: 0 }, { x: 4, y: 4 }]
        },
        {
            id: 7,
            name: 'Maze',
            grid: [
                [0,0,0,0,0],
                [1,1,1,0,0],
                [0,0,0,0,1],
                [0,1,1,1,1],
                [0,0,0,0,0]
            ],
            start: { x: 0, y: 4, direction: 0 },
            goal: { x: 4, y: 0 },
            hint: 'Navigate carefully through the maze!',
            optimalSteps: 11,
            coins: [{ x: 3, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 0 }]
        },
        {
            id: 8,
            name: 'Jump Master',
            grid: [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,1,1,1,1],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            start: { x: 0, y: 4, direction: 0 },
            goal: { x: 4, y: 0 },
            hint: 'Jump lets you leap over walls!',
            optimalSteps: 9,
            coins: [{ x: 2, y: 4 }, { x: 2, y: 0 }]
        }
    ];

    // === Achievements ===
    var ACHIEVEMENTS = [
        { id: 'first_steps', name: 'First Steps', icon: '\uD83D\uDC76', description: 'Complete level 1',
          check: function (p) { return p.completedLevels.indexOf(1) !== -1; } },
        { id: 'turn_pro', name: 'Turn Pro', icon: '\uD83D\uDD04', description: 'Complete level 3',
          check: function (p) { return p.completedLevels.indexOf(3) !== -1; } },
        { id: 'wall_whisperer', name: 'Wall Whisperer', icon: '\uD83E\uDDF1', description: 'Complete level 5',
          check: function (p) { return p.completedLevels.indexOf(5) !== -1; } },
        { id: 'jump_master', name: 'Jump Master', icon: '\uD83E\uDD98', description: 'Complete level 8',
          check: function (p) { return p.completedLevels.indexOf(8) !== -1; } },
        { id: 'coin_collector', name: 'Coin Collector', icon: '\uD83E\uDE99', description: 'Collect all coins on any level',
          check: function (p) {
              var bc = p.bestCoins || {};
              for (var k in bc) { if (bc[k]) return true; }
              return false;
          } },
        { id: 'gold_rush', name: 'Gold Rush', icon: '\uD83D\uDCB0', description: 'Collect all coins on 3+ levels',
          check: function (p) {
              var bc = p.bestCoins || {};
              var count = 0;
              for (var k in bc) { if (bc[k]) count++; }
              return count >= 3;
          } },
        { id: 'rising_star', name: 'Rising Star', icon: '\uD83C\uDF1F', description: 'Earn 12+ total stars',
          check: function (p) { return getTotalStars(p) >= 12; } },
        { id: 'superstar', name: 'Superstar', icon: '\u2B50', description: 'Earn all 24 stars',
          check: function (p) { return getTotalStars(p) >= 24; } },
        { id: 'speed_runner', name: 'Speed Runner', icon: '\u26A1', description: 'Complete any level on Fast speed',
          check: function (p, ctx) { return ctx && ctx.speed === 'fast'; } },
        { id: 'persistent', name: 'Persistent', icon: '\uD83D\uDCAA', description: 'Retry a level 3+ times',
          check: function (p, ctx) { return ctx && ctx.retryCount >= 3; } }
    ];

    // === Game State ===
    var profiles = [];
    var activeProfileId = null;
    var currentLevel = null;
    var bot = { x: 0, y: 0, direction: 0 };
    var commandSequence = [];
    var isExecuting = false;
    var collectedCoins = [];
    var retryCount = 0;
    var soundEnabled = true;

    // === DOM References ===
    var screens = {
        profile: document.getElementById('profile-screen'),
        level: document.getElementById('level-screen'),
        game: document.getElementById('game-screen')
    };

    // === Sound Manager ===
    var SoundManager = {
        ctx: null,
        init: function () {
            if (this.ctx) return;
            var AC = window.AudioContext || window.webkitAudioContext;
            if (AC) {
                this.ctx = new AC();
                // Resume context for browsers that start suspended
                if (this.ctx.state === 'suspended') this.ctx.resume();
            }
        },
        _tone: function (freq, duration, type, gainVal) {
            if (!soundEnabled || !this.ctx) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();
            var osc = this.ctx.createOscillator();
            var gain = this.ctx.createGain();
            osc.type = type || 'sine';
            osc.frequency.value = freq;
            gain.gain.value = gainVal || 0.15;
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.stop(this.ctx.currentTime + duration);
        },
        playMove: function () {
            this._tone(440, 0.1, 'sine', 0.12);
        },
        playTurn: function () {
            this._tone(600, 0.05, 'sine', 0.08);
        },
        playJump: function () {
            if (!soundEnabled || !this.ctx) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();
            var osc = this.ctx.createOscillator();
            var gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.2);
            gain.gain.value = 0.15;
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
            osc.stop(this.ctx.currentTime + 0.2);
        },
        playBump: function () {
            this._tone(100, 0.15, 'square', 0.1);
        },
        playWin: function (stars) {
            if (!soundEnabled || !this.ctx) return;
            var notes = stars === 3 ? [523, 659, 784, 1047] : [523, 659, 784];
            var self = this;
            notes.forEach(function (freq, i) {
                setTimeout(function () { self._tone(freq, 0.2, 'sine', 0.15); }, i * 150);
            });
        },
        playLose: function () {
            if (!soundEnabled || !this.ctx) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();
            var osc = this.ctx.createOscillator();
            var gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.4);
            gain.gain.value = 0.12;
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
            osc.stop(this.ctx.currentTime + 0.4);
        },
        playStar: function () {
            this._tone(1200, 0.1, 'triangle', 0.1);
        },
        playCoin: function () {
            this._tone(880, 0.1, 'sine', 0.15);
        },
        playClick: function () {
            this._tone(800, 0.03, 'sine', 0.06);
        }
    };

    // === Helper: Total Stars ===
    function getTotalStars(profile) {
        var bs = profile.bestStars || {};
        var total = 0;
        for (var k in bs) total += bs[k];
        return total;
    }

    // === Storage ===
    function loadData() {
        try {
            var data = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (data) {
                profiles = data.profiles || [];
                activeProfileId = data.activeProfileId || null;
                if (typeof data.soundEnabled === 'boolean') soundEnabled = data.soundEnabled;
            }
        } catch (e) {
            profiles = [];
            activeProfileId = null;
        }
    }

    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            profiles: profiles,
            activeProfileId: activeProfileId,
            soundEnabled: soundEnabled
        }));
    }

    // === Profile CRUD ===
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2);
    }

    function createProfile(name) {
        var profile = {
            id: generateId(),
            name: name.trim(),
            completedLevels: [],
            bestStars: {},
            bestCoins: {},
            achievements: []
        };
        profiles.push(profile);
        activeProfileId = profile.id;
        saveData();
        return profile;
    }

    function deleteProfile(id) {
        profiles = profiles.filter(function (p) { return p.id !== id; });
        if (activeProfileId === id) activeProfileId = null;
        saveData();
    }

    function getActiveProfile() {
        for (var i = 0; i < profiles.length; i++) {
            if (profiles[i].id === activeProfileId) return profiles[i];
        }
        return null;
    }

    // Ensure backward compat for older profiles missing new fields
    function ensureProfileFields(profile) {
        if (!profile.bestStars) profile.bestStars = {};
        if (!profile.bestCoins) profile.bestCoins = {};
        if (!profile.achievements) profile.achievements = [];
    }

    // === Screen Navigation ===
    function showScreen(name) {
        screens.profile.style.display = 'none';
        screens.level.style.display = 'none';
        screens.game.style.display = 'none';
        screens[name].style.display = 'block';
    }

    // === Profile Screen ===
    function renderProfileScreen() {
        var list = document.getElementById('profile-list');
        list.innerHTML = '';

        profiles.forEach(function (p) {
            var item = document.createElement('div');
            item.className = 'profile-item';

            var btn = document.createElement('button');
            btn.className = 'btn profile-btn';
            btn.textContent = p.name;
            btn.addEventListener('click', function () {
                activeProfileId = p.id;
                saveData();
                showLevelScreen();
            });

            var del = document.createElement('button');
            del.className = 'btn profile-delete';
            del.textContent = '\u2715'; // ✕
            del.addEventListener('click', function (e) {
                e.stopPropagation();
                if (confirm('Delete profile "' + p.name + '"?')) {
                    deleteProfile(p.id);
                    renderProfileScreen();
                }
            });

            item.appendChild(btn);
            item.appendChild(del);
            list.appendChild(item);
        });
    }

    // === Level Select Screen ===
    function showLevelScreen() {
        var profile = getActiveProfile();
        if (!profile) return;
        ensureProfileFields(profile);
        document.getElementById('level-profile-name').textContent = 'Player: ' + profile.name;
        renderStarProgress(profile);
        renderLevelGrid(profile);
        renderAchievements(profile);
        showScreen('level');
    }

    function renderStarProgress(profile) {
        var totalStars = getTotalStars(profile);
        var maxStars = LEVELS.length * 3;
        document.getElementById('star-count').textContent = totalStars + ' / ' + maxStars + ' Stars';
        var bar = document.getElementById('star-progress-bar');
        bar.style.width = (totalStars / maxStars * 100) + '%';
        if (totalStars >= maxStars) {
            bar.classList.add('complete');
        } else {
            bar.classList.remove('complete');
        }
    }

    function renderLevelGrid(profile) {
        var grid = document.getElementById('level-grid');
        grid.innerHTML = '';

        LEVELS.forEach(function (level) {
            var btn = document.createElement('button');
            btn.className = 'btn level-btn';
            var completed = profile.completedLevels.indexOf(level.id) !== -1;
            if (completed) btn.classList.add('completed');

            var numSpan = document.createElement('span');
            numSpan.className = 'level-num';
            numSpan.textContent = level.id;

            var nameSpan = document.createElement('span');
            nameSpan.className = 'level-name';
            nameSpan.textContent = level.name;

            btn.appendChild(numSpan);
            btn.appendChild(nameSpan);

            if (completed) {
                var bestStars = profile.bestStars[String(level.id)] || 1;
                var starsSpan = document.createElement('span');
                starsSpan.className = 'level-stars';
                starsSpan.innerHTML = renderStarsText(bestStars);
                btn.appendChild(starsSpan);
            }

            // Coin badge for levels where all coins were collected
            if (level.coins && level.coins.length > 0 && profile.bestCoins[String(level.id)]) {
                var coinBadge = document.createElement('span');
                coinBadge.className = 'coin-badge';
                coinBadge.textContent = '\uD83E\uDE99';
                btn.appendChild(coinBadge);
            }

            btn.addEventListener('click', function () {
                startLevel(level);
            });

            grid.appendChild(btn);
        });
    }

    // === Achievements ===
    function renderAchievements(profile) {
        var container = document.getElementById('achievements-grid');
        if (!container) return;
        container.innerHTML = '';

        ACHIEVEMENTS.forEach(function (ach) {
            var badge = document.createElement('div');
            badge.className = 'badge';
            var earned = profile.achievements && profile.achievements.indexOf(ach.id) !== -1;
            if (earned) badge.classList.add('earned');

            var icon = document.createElement('span');
            icon.className = 'badge-icon';
            icon.textContent = ach.icon;

            var name = document.createElement('span');
            name.className = 'badge-name';
            name.textContent = ach.name;

            badge.appendChild(icon);
            badge.appendChild(name);
            badge.title = ach.description;
            container.appendChild(badge);
        });
    }

    function checkAchievements(context) {
        var profile = getActiveProfile();
        if (!profile) return;
        ensureProfileFields(profile);

        var newlyEarned = [];
        ACHIEVEMENTS.forEach(function (ach) {
            if (profile.achievements.indexOf(ach.id) !== -1) return;
            if (ach.check(profile, context)) {
                profile.achievements.push(ach.id);
                newlyEarned.push(ach);
            }
        });

        if (newlyEarned.length > 0) {
            saveData();
            newlyEarned.forEach(function (ach, i) {
                setTimeout(function () { showAchievementToast(ach); }, (i + 1) * 800);
            });
        }
    }

    function showAchievementToast(achievement) {
        var toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = '<span class="toast-icon">' + achievement.icon + '</span>' +
            '<span class="toast-text"><strong>' + achievement.name + '</strong><br><small>' + achievement.description + '</small></span>';
        document.body.appendChild(toast);
        // Force reflow then show
        toast.offsetHeight;
        toast.classList.add('show');
        setTimeout(function () {
            toast.classList.remove('show');
            setTimeout(function () { toast.remove(); }, 500);
        }, 3000);
    }

    // === Game Screen ===
    function startLevel(level) {
        currentLevel = level;
        bot = { x: level.start.x, y: level.start.y, direction: level.start.direction };
        commandSequence = [];
        collectedCoins = [];
        retryCount = 0;
        isExecuting = false;

        document.getElementById('level-title').textContent =
            'Level ' + level.id + ': ' + level.name;
        document.getElementById('level-hint').textContent = level.hint;

        renderGrid();
        renderBot();
        clearTrail();
        renderCommandSequence();
        hideResult();
        hideConfetti();
        setButtonsEnabled(true);
        showScreen('game');
    }

    // === Grid Rendering ===
    function renderGrid() {
        var container = document.getElementById('grid-container');
        var botEl = document.getElementById('bot');

        // Clear everything
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        var grid = currentLevel.grid;
        var rows = grid.length;
        var cols = grid[0].length;

        container.style.gridTemplateRows = 'repeat(' + rows + ', ' + CELL_SIZE + 'px)';
        container.style.gridTemplateColumns = 'repeat(' + cols + ', ' + CELL_SIZE + 'px)';
        container.style.width = (cols * CELL_SIZE) + 'px';
        container.style.height = (rows * CELL_SIZE) + 'px';

        var coinPositions = currentLevel.coins || [];

        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                var cell = document.createElement('div');
                cell.className = 'cell';
                cell.setAttribute('data-x', x);
                cell.setAttribute('data-y', y);

                if (grid[y][x] === 1) {
                    cell.classList.add('wall');
                } else if (x === currentLevel.goal.x && y === currentLevel.goal.y) {
                    cell.classList.add('goal');
                    cell.textContent = '\u2605'; // ★
                } else {
                    cell.classList.add('floor');
                    // Check if this cell has a coin
                    for (var c = 0; c < coinPositions.length; c++) {
                        if (coinPositions[c].x === x && coinPositions[c].y === y) {
                            cell.classList.add('coin');
                            break;
                        }
                    }
                }

                container.appendChild(cell);
            }
        }

        // Re-add bot element on top
        container.appendChild(botEl);
    }

    // === Bot Rendering ===
    function renderBot() {
        var botEl = document.getElementById('bot');
        var offset = CELL_SIZE * 0.1;
        var size = CELL_SIZE * 0.8;

        botEl.style.left = (bot.x * CELL_SIZE + offset) + 'px';
        botEl.style.top = (bot.y * CELL_SIZE + offset) + 'px';
        botEl.style.width = size + 'px';
        botEl.style.height = size + 'px';
        botEl.textContent = DIR_ARROWS[bot.direction];
    }

    // === Trail ===
    function clearTrail() {
        var dots = document.querySelectorAll('.trail-dot');
        for (var i = 0; i < dots.length; i++) dots[i].remove();
    }

    function addTrailDot(x, y) {
        var container = document.getElementById('grid-container');
        var dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.left = (x * CELL_SIZE + CELL_SIZE * 0.35) + 'px';
        dot.style.top = (y * CELL_SIZE + CELL_SIZE * 0.35) + 'px';
        dot.style.width = (CELL_SIZE * 0.3) + 'px';
        dot.style.height = (CELL_SIZE * 0.3) + 'px';
        container.appendChild(dot);
    }

    // === Coin Collection ===
    function tryCollectCoin(x, y) {
        if (!currentLevel.coins) return false;
        for (var i = 0; i < currentLevel.coins.length; i++) {
            var coin = currentLevel.coins[i];
            if (coin.x === x && coin.y === y && collectedCoins.indexOf(i) === -1) {
                collectedCoins.push(i);
                var cell = document.querySelector('.cell[data-x="' + x + '"][data-y="' + y + '"]');
                if (cell) cell.classList.add('collected');
                SoundManager.playCoin();
                return true;
            }
        }
        return false;
    }

    // === Command System ===
    function addCommand(type) {
        if (isExecuting) return;
        commandSequence.push(type);
        renderCommandSequence();
        SoundManager.playClick();
    }

    function removeCommand(index) {
        if (isExecuting) return;
        commandSequence.splice(index, 1);
        renderCommandSequence();
    }

    function moveCommand(index, direction) {
        if (isExecuting) return;
        var targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= commandSequence.length) return;
        var temp = commandSequence[index];
        commandSequence[index] = commandSequence[targetIndex];
        commandSequence[targetIndex] = temp;
        renderCommandSequence();
    }

    function renderCommandSequence() {
        var container = document.getElementById('command-sequence');
        container.innerHTML = '';

        commandSequence.forEach(function (cmd, i) {
            var info = CMD_INFO[cmd];
            var div = document.createElement('div');
            div.className = 'seq-item ' + info.cls;
            div.setAttribute('data-index', i);

            var label = document.createElement('span');
            label.textContent = info.symbol + ' ' + info.label;

            var controls = document.createElement('span');
            controls.className = 'seq-controls';

            var upBtn = document.createElement('button');
            upBtn.className = 'seq-move';
            upBtn.textContent = '\u25B2'; // ▲
            upBtn.disabled = (i === 0);
            upBtn.addEventListener('click', function () { moveCommand(i, -1); });

            var downBtn = document.createElement('button');
            downBtn.className = 'seq-move';
            downBtn.textContent = '\u25BC'; // ▼
            downBtn.disabled = (i === commandSequence.length - 1);
            downBtn.addEventListener('click', function () { moveCommand(i, 1); });

            var removeBtn = document.createElement('button');
            removeBtn.className = 'seq-remove';
            removeBtn.textContent = '\u2715'; // ✕
            removeBtn.addEventListener('click', function () {
                removeCommand(i);
            });

            controls.appendChild(upBtn);
            controls.appendChild(downBtn);
            controls.appendChild(removeBtn);

            div.appendChild(label);
            div.appendChild(controls);
            container.appendChild(div);
        });
    }

    function resetGame() {
        if (isExecuting) return;
        bot = { x: currentLevel.start.x, y: currentLevel.start.y, direction: currentLevel.start.direction };
        commandSequence = [];
        collectedCoins = [];
        clearTrail();
        renderGrid();
        renderBot();
        renderCommandSequence();
        hideResult();
    }

    // === Execution Engine ===
    function sleep(ms) {
        return new Promise(function (resolve) { setTimeout(resolve, ms); });
    }

    function setButtonsEnabled(enabled) {
        var cmdBtns = document.querySelectorAll('.cmd-btn');
        for (var i = 0; i < cmdBtns.length; i++) cmdBtns[i].disabled = !enabled;

        document.getElementById('run-btn').disabled = !enabled;
        document.getElementById('reset-btn').disabled = !enabled;

        var removeBtns = document.querySelectorAll('.seq-remove');
        for (var j = 0; j < removeBtns.length; j++) removeBtns[j].disabled = !enabled;

        var moveBtns = document.querySelectorAll('.seq-move');
        for (var k = 0; k < moveBtns.length; k++) moveBtns[k].disabled = !enabled;

        var speedBtns = document.querySelectorAll('.speed-btn');
        for (var s = 0; s < speedBtns.length; s++) speedBtns[s].disabled = !enabled;
    }

    function highlightCommand(index) {
        var items = document.querySelectorAll('.seq-item');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
        }
        var target = document.querySelector('.seq-item[data-index="' + index + '"]');
        if (target) target.classList.add('active');
    }

    function clearHighlight() {
        var items = document.querySelectorAll('.seq-item');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('active');
        }
    }

    function executeOneCommand(cmd) {
        var dir = DIRECTIONS[bot.direction];
        var grid = currentLevel.grid;
        var rows = grid.length;
        var cols = grid[0].length;
        var nx, ny;

        switch (cmd) {
            case 'forward':
                nx = bot.x + dir.dx;
                ny = bot.y + dir.dy;
                if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && grid[ny][nx] !== 1) {
                    bot.x = nx;
                    bot.y = ny;
                    return 'moved';
                }
                return 'blocked';

            case 'left':
                bot.direction = (bot.direction + 3) % 4;
                return 'turned';

            case 'right':
                bot.direction = (bot.direction + 1) % 4;
                return 'turned';

            case 'jump':
                nx = bot.x + dir.dx;
                ny = bot.y + dir.dy;
                if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                    bot.x = nx;
                    bot.y = ny;
                    return 'jumped';
                }
                return 'blocked';

            default:
                return 'moved';
        }
    }

    async function runCommands() {
        if (isExecuting || commandSequence.length === 0) return;
        isExecuting = true;
        setButtonsEnabled(false);
        hideResult();
        clearTrail();
        collectedCoins = [];

        // Re-render grid to reset coin visuals
        renderGrid();

        // Reset bot to start before running
        bot = { x: currentLevel.start.x, y: currentLevel.start.y, direction: currentLevel.start.direction };
        renderBot();
        await sleep(300);

        // Starting position trail dot
        addTrailDot(bot.x, bot.y);

        for (var i = 0; i < commandSequence.length; i++) {
            highlightCommand(i);
            await sleep(200);

            var result = executeOneCommand(commandSequence[i]);
            renderBot();

            // Play sound and handle per-result effects
            if (result === 'moved') {
                SoundManager.playMove();
                addTrailDot(bot.x, bot.y);
                tryCollectCoin(bot.x, bot.y);
            } else if (result === 'turned') {
                SoundManager.playTurn();
            } else if (result === 'jumped') {
                SoundManager.playJump();
                addTrailDot(bot.x, bot.y);
                tryCollectCoin(bot.x, bot.y);
            } else if (result === 'blocked') {
                SoundManager.playBump();
                var botEl = document.getElementById('bot');
                botEl.classList.add('bump');
                await sleep(350);
                botEl.classList.remove('bump');
            }

            await sleep(stepDelay);
        }

        clearHighlight();

        // Check win
        if (bot.x === currentLevel.goal.x && bot.y === currentLevel.goal.y) {
            onWin();
        } else {
            onLose();
        }

        isExecuting = false;
        setButtonsEnabled(true);
    }

    // === Confetti ===
    var CONFETTI_COLORS = ['#FF9800', '#4CAF50', '#2196F3', '#9C27B0', '#FFD700', '#EF5350'];
    var PERFECT_CONFETTI_COLORS = ['#FFD700', '#FFA000', '#FFB74D', '#FF9800', '#FFEB3B', '#FFC107'];

    function showConfetti(perfect) {
        var container = document.getElementById('confetti-container');
        container.innerHTML = '';
        var count = perfect ? 60 : 30;
        var colors = perfect ? PERFECT_CONFETTI_COLORS : CONFETTI_COLORS;

        for (var i = 0; i < count; i++) {
            var piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = (Math.random() * 100) + '%';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 0.5) + 's';
            piece.style.animationDuration = (1 + Math.random() * 1) + 's';
            if (perfect) {
                piece.style.width = piece.style.height = (8 + Math.random() * 8) + 'px';
            }
            container.appendChild(piece);
        }
        setTimeout(function () { container.innerHTML = ''; }, 2500);
    }

    function hideConfetti() {
        document.getElementById('confetti-container').innerHTML = '';
    }

    // === Star Rating ===
    function calculateStars(commandCount, optimalSteps) {
        if (commandCount <= optimalSteps) return 3;
        if (commandCount <= optimalSteps + 2) return 2;
        return 1;
    }

    function renderStarsText(starCount) {
        var text = '';
        for (var i = 0; i < 3; i++) {
            if (i < starCount) {
                text += '<span class="star-earned">\u2605</span>';
            } else {
                text += '<span class="star-empty">\u2606</span>';
            }
        }
        return text;
    }

    // === Win / Lose ===
    function onWin() {
        var profile = getActiveProfile();
        var stars = calculateStars(commandSequence.length, currentLevel.optimalSteps);
        var levelCoins = currentLevel.coins ? currentLevel.coins.length : 0;
        var allCoinsCollected = levelCoins > 0 && collectedCoins.length === levelCoins;

        if (profile) {
            ensureProfileFields(profile);
            if (profile.completedLevels.indexOf(currentLevel.id) === -1) {
                profile.completedLevels.push(currentLevel.id);
            }
            var key = String(currentLevel.id);
            if (!profile.bestStars[key] || stars > profile.bestStars[key]) {
                profile.bestStars[key] = stars;
            }
            if (allCoinsCollected) {
                profile.bestCoins[key] = true;
            }
            saveData();
        }

        var isPerfect = stars === 3;
        showConfetti(isPerfect);
        SoundManager.playWin(stars);

        // Stagger star ding sounds
        for (var s = 0; s < stars; s++) {
            (function (idx) {
                setTimeout(function () { SoundManager.playStar(); }, 200 + idx * 300);
            })(s);
        }

        showResult(true, stars, collectedCoins.length, levelCoins);

        // Check achievements
        var coinsLevelCount = 0;
        if (profile && profile.bestCoins) {
            for (var k in profile.bestCoins) { if (profile.bestCoins[k]) coinsLevelCount++; }
        }
        checkAchievements({
            levelId: currentLevel.id,
            stars: stars,
            totalStars: profile ? getTotalStars(profile) : 0,
            speed: currentSpeed,
            allCoinsCollected: allCoinsCollected,
            coinsLevelCount: coinsLevelCount,
            retryCount: retryCount
        });
    }

    function onLose() {
        retryCount++;
        SoundManager.playLose();
        var levelCoins = currentLevel.coins ? currentLevel.coins.length : 0;
        showResult(false, 0, collectedCoins.length, levelCoins);
    }

    function showResult(won, stars, coinsCollected, totalCoins) {
        var overlay = document.getElementById('result-overlay');
        var title = document.getElementById('result-title');
        var message = document.getElementById('result-message');
        var buttons = document.getElementById('result-buttons');
        var resultContent = overlay.querySelector('.result-content');

        overlay.style.display = 'flex';
        buttons.innerHTML = '';
        resultContent.classList.remove('perfect');

        if (won) {
            var isPerfect = stars === 3;
            if (isPerfect) {
                title.textContent = 'PERFECT!';
                title.style.color = '#FFD700';
                resultContent.classList.add('perfect');
            } else {
                title.textContent = 'You did it!';
                title.style.color = '#4CAF50';
            }

            // Star display
            var starsDiv = document.createElement('div');
            starsDiv.className = 'result-stars';
            for (var s = 0; s < 3; s++) {
                var starSpan = document.createElement('span');
                starSpan.className = 'result-star pop';
                if (s < stars) starSpan.classList.add('earned');
                starSpan.textContent = '\u2605';
                starsDiv.appendChild(starSpan);
            }

            var stepInfo = document.createElement('p');
            stepInfo.className = 'result-step-count';
            stepInfo.textContent = 'Completed in ' + commandSequence.length + ' commands (Target: ' + currentLevel.optimalSteps + ')';

            message.textContent = '';
            message.appendChild(starsDiv);
            message.appendChild(stepInfo);

            // Coin info
            if (totalCoins > 0) {
                var coinInfo = document.createElement('p');
                coinInfo.className = 'result-coins';
                coinInfo.textContent = '\uD83E\uDE99 Coins: ' + coinsCollected + ' / ' + totalCoins;
                if (coinsCollected === totalCoins) coinInfo.classList.add('all-collected');
                message.appendChild(coinInfo);
            }

            // Next level button
            var nextLevel = null;
            for (var i = 0; i < LEVELS.length; i++) {
                if (LEVELS[i].id === currentLevel.id + 1) {
                    nextLevel = LEVELS[i];
                    break;
                }
            }

            if (nextLevel) {
                var nextBtn = document.createElement('button');
                nextBtn.className = 'btn btn-primary';
                nextBtn.textContent = 'Next Level \u2192';
                nextBtn.addEventListener('click', function () {
                    startLevel(nextLevel);
                });
                buttons.appendChild(nextBtn);
            }

            var levelsBtn = document.createElement('button');
            levelsBtn.className = 'btn btn-secondary';
            levelsBtn.textContent = 'Back to Levels';
            levelsBtn.addEventListener('click', function () {
                showLevelScreen();
            });
            buttons.appendChild(levelsBtn);
        } else {
            title.textContent = 'Not quite!';
            title.style.color = '#FF9800';

            message.textContent = '';
            var tryAgainText = document.createElement('span');
            tryAgainText.textContent = 'Try again \u2014 you can change your commands!';
            message.appendChild(tryAgainText);

            // Show coins collected even on lose
            if (totalCoins > 0 && coinsCollected > 0) {
                var coinInfoLose = document.createElement('p');
                coinInfoLose.className = 'result-coins';
                coinInfoLose.textContent = '\uD83E\uDE99 Coins: ' + coinsCollected + ' / ' + totalCoins;
                message.appendChild(coinInfoLose);
            }

            var retryBtn = document.createElement('button');
            retryBtn.className = 'btn btn-primary';
            retryBtn.textContent = 'Try Again';
            retryBtn.addEventListener('click', function () {
                hideResult();
                bot = { x: currentLevel.start.x, y: currentLevel.start.y, direction: currentLevel.start.direction };
                collectedCoins = [];
                clearTrail();
                renderGrid();
                renderBot();
            });
            buttons.appendChild(retryBtn);
        }
    }

    function hideResult() {
        document.getElementById('result-overlay').style.display = 'none';
        var resultContent = document.querySelector('.result-content');
        if (resultContent) resultContent.classList.remove('perfect');
        hideConfetti();
    }

    // === Mute Toggle ===
    function updateMuteButton() {
        var btn = document.getElementById('mute-btn');
        if (btn) {
            btn.textContent = soundEnabled ? '\uD83D\uDD0A' : '\uD83D\uDD07';
            btn.title = soundEnabled ? 'Mute sound' : 'Unmute sound';
        }
    }

    // === Initialization ===
    function init() {
        loadData();
        updateMuteButton();

        // Mute button
        var muteBtn = document.getElementById('mute-btn');
        if (muteBtn) {
            muteBtn.addEventListener('click', function () {
                SoundManager.init();
                soundEnabled = !soundEnabled;
                updateMuteButton();
                saveData();
            });
        }

        // Profile creation
        document.getElementById('create-profile-btn').addEventListener('click', function () {
            SoundManager.init();
            var input = document.getElementById('profile-name-input');
            var name = input.value.trim();
            if (!name) return;
            createProfile(name);
            input.value = '';
            showLevelScreen();
        });

        document.getElementById('profile-name-input').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                document.getElementById('create-profile-btn').click();
            }
        });

        // Level screen navigation
        document.getElementById('change-profile-btn').addEventListener('click', function () {
            renderProfileScreen();
            showScreen('profile');
        });

        // Speed control buttons
        var speedBtns = document.querySelectorAll('.speed-btn');
        for (var s = 0; s < speedBtns.length; s++) {
            (function (btn) {
                btn.addEventListener('click', function () {
                    var speed = btn.getAttribute('data-speed');
                    currentSpeed = speed;
                    stepDelay = SPEED_VALUES[speed];
                    var all = document.querySelectorAll('.speed-btn');
                    for (var j = 0; j < all.length; j++) all[j].classList.remove('active');
                    btn.classList.add('active');
                });
            })(speedBtns[s]);
        }

        // Command palette buttons
        var cmdBtns = document.querySelectorAll('.cmd-btn');
        for (var i = 0; i < cmdBtns.length; i++) {
            (function (btn) {
                btn.addEventListener('click', function () {
                    SoundManager.init();
                    addCommand(btn.getAttribute('data-command'));
                });
            })(cmdBtns[i]);
        }

        // Action buttons
        document.getElementById('run-btn').addEventListener('click', function () {
            SoundManager.init();
            runCommands();
        });
        document.getElementById('reset-btn').addEventListener('click', function () {
            resetGame();
        });
        document.getElementById('back-to-levels-btn').addEventListener('click', function () {
            showLevelScreen();
        });

        // Show profile screen
        renderProfileScreen();
        showScreen('profile');
    }

    init();
})();
