/**
 * Robot Brain Builder — Interaction Type Renderers
 * Handles rendering 6 interaction types (A-F) and checking answers.
 * Registers on window.LogicGame.Interactions namespace.
 */
window.LogicGame = window.LogicGame || {};

window.LogicGame.Interactions = (function() {
    'use strict';

    // ── Module State ──────────────────────────────────────────────────

    var currentType = null;
    var currentChallenge = null;
    var selectedAnswer = null;

    // ── Helper Functions ──────────────────────────────────────────────

    /**
     * Look up an item's label from the challenge items array by id.
     */
    function getItemLabel(itemId, challenge) {
        for (var i = 0; i < challenge.items.length; i++) {
            if (challenge.items[i].id === itemId) return challenge.items[i].label;
        }
        return itemId;
    }

    // ── Type A: Click-to-Select ───────────────────────────────────────

    function renderTypeA(challenge, container) {
        container.innerHTML = '';
        selectedAnswer = null;

        var prompt = document.createElement('div');
        prompt.className = 'challenge-prompt';
        prompt.textContent = challenge.prompt;
        container.appendChild(prompt);

        var grid = document.createElement('div');
        grid.className = 'option-panel';

        challenge.options.forEach(function(option, index) {
            var card = document.createElement('div');
            card.className = 'option-card';
            card.setAttribute('data-index', index);

            var text = document.createElement('div');
            text.className = 'option-text';
            text.textContent = option.text;
            card.appendChild(text);

            card.addEventListener('click', function() {
                // Deselect all
                container.querySelectorAll('.option-card').forEach(function(c) {
                    c.classList.remove('selected');
                });
                // Select this one
                card.classList.add('selected');
                selectedAnswer = index;
            });

            grid.appendChild(card);
        });

        container.appendChild(grid);
    }

    // ── Type B: Click-to-Place ────────────────────────────────────────

    function renderTypeB(challenge, container) {
        container.innerHTML = '';
        selectedAnswer = {};
        var selectedItem = null;

        var prompt = document.createElement('div');
        prompt.className = 'challenge-prompt';
        prompt.textContent = challenge.prompt;
        container.appendChild(prompt);

        var source = document.createElement('div');
        source.className = 'place-source';

        challenge.items.forEach(function(item) {
            var chip = document.createElement('div');
            chip.className = 'place-item';
            chip.setAttribute('data-id', item.id);
            chip.textContent = item.label;

            chip.addEventListener('click', function() {
                if (chip.classList.contains('placed')) {
                    // Return item to source
                    chip.classList.remove('placed');
                    delete selectedAnswer[item.id];
                    // Remove from zone display
                    var placed = container.querySelector('.placed-item[data-id="' + item.id + '"]');
                    if (placed) placed.remove();
                    updateSourceHighlight();
                    return;
                }

                // Select/deselect item
                source.querySelectorAll('.place-item').forEach(function(c) { c.classList.remove('selected'); });
                if (selectedItem === item.id) {
                    selectedItem = null;
                } else {
                    chip.classList.add('selected');
                    selectedItem = item.id;
                }
            });

            source.appendChild(chip);
        });

        container.appendChild(source);

        function updateSourceHighlight() {
            source.querySelectorAll('.place-item').forEach(function(c) {
                c.classList.remove('selected');
            });
            selectedItem = null;
        }

        var targets = document.createElement('div');
        targets.className = 'place-target';

        challenge.zones.forEach(function(zone) {
            var zoneEl = document.createElement('div');
            zoneEl.className = 'place-zone';
            zoneEl.setAttribute('data-zone', zone.id);

            var label = document.createElement('div');
            label.className = 'place-zone-label';
            label.textContent = zone.label;
            zoneEl.appendChild(label);

            var itemsArea = document.createElement('div');
            itemsArea.className = 'place-zone-items';
            zoneEl.appendChild(itemsArea);

            zoneEl.addEventListener('click', function() {
                if (!selectedItem) return;

                // Place the item
                selectedAnswer[selectedItem] = zone.id;

                // Mark source item as placed
                var sourceChip = source.querySelector('[data-id="' + selectedItem + '"]');
                if (sourceChip) {
                    sourceChip.classList.add('placed');
                    sourceChip.classList.remove('selected');
                }

                // Remove from any other zone first
                var existing = container.querySelector('.placed-item[data-id="' + selectedItem + '"]');
                if (existing) existing.remove();

                // Add to zone visually
                var placedEl = document.createElement('div');
                placedEl.className = 'placed-item';
                placedEl.setAttribute('data-id', selectedItem);
                placedEl.textContent = getItemLabel(selectedItem, challenge);
                placedEl.addEventListener('click', function(e) {
                    e.stopPropagation();
                    // Return item to source
                    var srcChip = source.querySelector('[data-id="' + placedEl.getAttribute('data-id') + '"]');
                    if (srcChip) srcChip.classList.remove('placed');
                    delete selectedAnswer[placedEl.getAttribute('data-id')];
                    placedEl.remove();
                });
                itemsArea.appendChild(placedEl);

                selectedItem = null;
            });

            targets.appendChild(zoneEl);
        });

        container.appendChild(targets);
    }

    // ── Type C: Click-to-Arrange ──────────────────────────────────────

    function renderTypeC(challenge, container) {
        container.innerHTML = '';
        var orderedItems = [];
        selectedAnswer = [];

        var prompt = document.createElement('div');
        prompt.className = 'challenge-prompt';
        prompt.textContent = challenge.prompt;
        container.appendChild(prompt);

        var slotsArea = document.createElement('div');
        slotsArea.className = 'arrange-slots';

        var numSlots = challenge.items.length;
        for (var i = 0; i < numSlots; i++) {
            var slot = document.createElement('div');
            slot.className = 'arrange-slot';
            slot.setAttribute('data-slot', i);

            var num = document.createElement('div');
            num.className = 'arrange-slot-num';
            num.textContent = String(i + 1);
            slot.appendChild(num);

            var slotText = document.createElement('div');
            slotText.className = 'arrange-slot-content';
            slot.appendChild(slotText);

            slotsArea.appendChild(slot);
        }
        container.appendChild(slotsArea);

        // Shuffle items
        var shuffled = challenge.items.slice();
        for (var s = shuffled.length - 1; s > 0; s--) {
            var j = Math.floor(Math.random() * (s + 1));
            var tmp = shuffled[s];
            shuffled[s] = shuffled[j];
            shuffled[j] = tmp;
        }

        var itemsArea = document.createElement('div');
        itemsArea.className = 'arrange-items';

        shuffled.forEach(function(item) {
            var itemEl = document.createElement('div');
            itemEl.className = 'arrange-item';
            itemEl.setAttribute('data-id', item.id);
            itemEl.textContent = item.label;

            itemEl.addEventListener('click', function() {
                if (itemEl.classList.contains('used')) return;
                if (orderedItems.length >= numSlots) return;

                orderedItems.push(item.id);
                selectedAnswer = orderedItems.slice();
                itemEl.classList.add('used');

                // Update slot display
                updateSlots();
            });

            itemsArea.appendChild(itemEl);
        });
        container.appendChild(itemsArea);

        // Undo button
        var undoBtn = document.createElement('button');
        undoBtn.className = 'btn undo-btn';
        undoBtn.textContent = 'Undo';
        undoBtn.addEventListener('click', function() {
            if (orderedItems.length === 0) return;
            var removedId = orderedItems.pop();
            selectedAnswer = orderedItems.slice();
            // Un-use the item
            var itemEl = itemsArea.querySelector('[data-id="' + removedId + '"]');
            if (itemEl) itemEl.classList.remove('used');
            updateSlots();
        });
        container.appendChild(undoBtn);

        function updateSlots() {
            var slots = slotsArea.querySelectorAll('.arrange-slot');
            slots.forEach(function(slot, idx) {
                var textEl = slot.querySelector('.arrange-slot-content');
                if (idx < orderedItems.length) {
                    slot.classList.add('filled');
                    textEl.textContent = getItemLabel(orderedItems[idx], challenge);
                } else {
                    slot.classList.remove('filled');
                    textEl.textContent = '';
                }
            });
        }
    }

    // ── Type D: Click-to-Toggle ───────────────────────────────────────

    function renderTypeD(challenge, container) {
        container.innerHTML = '';
        var gridState = {};
        selectedAnswer = {};

        var prompt = document.createElement('div');
        prompt.className = 'challenge-prompt';
        prompt.textContent = challenge.prompt;
        container.appendChild(prompt);

        var headers = challenge.headers || { columns: [], rows: [] };
        var toggleOptions = challenge.toggleOptions || ['T', 'F'];
        var prefilled = challenge.prefilled || {};

        var numCols = headers.columns ? headers.columns.length : 2;
        var numRows = headers.rows ? headers.rows.length : 2;

        var gridWrapper = document.createElement('div');
        gridWrapper.style.textAlign = 'center';

        var grid = document.createElement('div');
        grid.className = 'toggle-grid';
        grid.style.gridTemplateColumns = 'repeat(' + (numCols + (headers.rows ? 1 : 0)) + ', auto)';

        // Header row
        if (headers.rows) {
            var corner = document.createElement('div');
            corner.className = 'toggle-header';
            corner.textContent = '';
            grid.appendChild(corner);
        }

        if (headers.columns) {
            headers.columns.forEach(function(col) {
                var h = document.createElement('div');
                h.className = 'toggle-header';
                h.textContent = col;
                grid.appendChild(h);
            });
        }

        // Data rows
        for (var r = 0; r < numRows; r++) {
            if (headers.rows) {
                var rowHeader = document.createElement('div');
                rowHeader.className = 'toggle-header';
                rowHeader.textContent = headers.rows[r] || '';
                grid.appendChild(rowHeader);
            }

            for (var c = 0; c < numCols; c++) {
                var key = r + ',' + c;
                var cell = document.createElement('div');
                cell.className = 'toggle-cell';
                cell.setAttribute('data-key', key);

                if (prefilled[key] !== undefined) {
                    // Locked cell
                    cell.classList.add('locked');
                    cell.textContent = prefilled[key];
                    if (prefilled[key] === 'T' || prefilled[key] === true) cell.classList.add('true');
                    else cell.classList.add('false');
                } else {
                    // Interactive cell — starts neutral
                    cell.classList.add('neutral');
                    cell.textContent = '?';
                    gridState[key] = null;

                    (function(cellKey, cellEl) {
                        cellEl.addEventListener('click', function() {
                            // Cycle through toggle options
                            var currentVal = gridState[cellKey];
                            var currentIdx = toggleOptions.indexOf(currentVal);
                            var nextIdx = (currentIdx + 1) % toggleOptions.length;
                            gridState[cellKey] = toggleOptions[nextIdx];
                            selectedAnswer = Object.assign({}, gridState);

                            cellEl.textContent = toggleOptions[nextIdx];
                            cellEl.classList.remove('neutral', 'true', 'false');
                            if (toggleOptions[nextIdx] === 'T' || toggleOptions[nextIdx] === true) cellEl.classList.add('true');
                            else cellEl.classList.add('false');
                        });
                    })(key, cell);
                }

                grid.appendChild(cell);
            }
        }

        gridWrapper.appendChild(grid);
        container.appendChild(gridWrapper);
    }

    // ── Type E: Type-Short-Answer ─────────────────────────────────────

    function renderTypeE(challenge, container) {
        container.innerHTML = '';
        selectedAnswer = '';

        var prompt = document.createElement('div');
        prompt.className = 'challenge-prompt';
        prompt.textContent = challenge.prompt;
        container.appendChild(prompt);

        var area = document.createElement('div');
        area.className = 'answer-input-area';

        var input = document.createElement('input');
        input.type = 'text';
        input.className = 'answer-input';
        input.placeholder = challenge.inputPlaceholder || 'Type your answer...';
        input.maxLength = 50;

        input.addEventListener('input', function() {
            selectedAnswer = input.value;
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                var submitBtn = document.getElementById('submit-btn');
                if (submitBtn && !submitBtn.disabled) submitBtn.click();
            }
        });

        area.appendChild(input);
        container.appendChild(area);

        // Auto-focus after a brief delay
        setTimeout(function() { input.focus(); }, 100);
    }

    // ── Type F: Mixed (dispatches to actual type) ─────────────────────

    function renderTypeF(challenge, container) {
        var type = challenge.type;
        if (type === 'A') renderTypeA(challenge, container);
        else if (type === 'B') renderTypeB(challenge, container);
        else if (type === 'C') renderTypeC(challenge, container);
        else if (type === 'D') renderTypeD(challenge, container);
        else if (type === 'E') renderTypeE(challenge, container);
        else renderTypeA(challenge, container); // fallback
    }

    // ── Main Render Dispatcher ────────────────────────────────────────

    /**
     * Render a challenge into the given container element.
     * Reads challenge.type to determine which interaction renderer to use.
     * @param {Object} challenge - The challenge data object
     * @param {HTMLElement} container - The DOM element to render into
     */
    function render(challenge, container) {
        currentChallenge = challenge;
        currentType = challenge.type;

        if (currentType === 'A') renderTypeA(challenge, container);
        else if (currentType === 'B') renderTypeB(challenge, container);
        else if (currentType === 'C') renderTypeC(challenge, container);
        else if (currentType === 'D') renderTypeD(challenge, container);
        else if (currentType === 'E') renderTypeE(challenge, container);
        else if (currentType === 'F') renderTypeF(challenge, container);
        else renderTypeA(challenge, container);
    }

    // ── Answer Getter ─────────────────────────────────────────────────

    /**
     * Return the current answer state, whatever the active interaction type.
     * @returns {*} The selected/entered answer value
     */
    function getAnswer() {
        return selectedAnswer;
    }

    // ── Answer Checkers ───────────────────────────────────────────────

    /**
     * Type B: Compare each item's zone placement against the correct answer.
     */
    function checkTypeB(challenge, answer) {
        var correct = challenge.correctAnswer;
        for (var itemId in correct) {
            if (correct.hasOwnProperty(itemId)) {
                if (answer[itemId] !== correct[itemId]) return false;
            }
        }
        // Also check all items are placed
        for (var i = 0; i < challenge.items.length; i++) {
            if (!answer[challenge.items[i].id]) return false;
        }
        return true;
    }

    /**
     * Type C: Compare ordered array to correctAnswer array.
     */
    function checkTypeC(challenge, answer) {
        if (!answer || answer.length !== challenge.correctAnswer.length) return false;
        for (var i = 0; i < challenge.correctAnswer.length; i++) {
            if (answer[i] !== challenge.correctAnswer[i]) return false;
        }
        return true;
    }

    /**
     * Type D: Compare grid state to correctAnswer for interactive cells only.
     */
    function checkTypeD(challenge, answer) {
        var correct = challenge.correctAnswer;
        for (var key in correct) {
            if (correct.hasOwnProperty(key)) {
                if (String(answer[key]) !== String(correct[key])) return false;
            }
        }
        return true;
    }

    /**
     * Type E: Normalize and compare text/numeric answers.
     */
    function checkTypeE(challenge, answer) {
        var userAnswer = String(answer || '').trim().toLowerCase();
        var correctAnswer = String(challenge.correctAnswer).trim().toLowerCase();

        if (userAnswer === correctAnswer) return true;

        // Check acceptable answers if provided
        if (challenge.acceptableAnswers) {
            for (var i = 0; i < challenge.acceptableAnswers.length; i++) {
                if (userAnswer === String(challenge.acceptableAnswers[i]).trim().toLowerCase()) return true;
            }
        }

        // Numeric comparison
        var userNum = parseFloat(userAnswer);
        var correctNum = parseFloat(correctAnswer);
        if (!isNaN(userNum) && !isNaN(correctNum) && userNum === correctNum) return true;

        return false;
    }

    /**
     * Main answer checker — dispatches to the appropriate type checker.
     * @param {Object} challenge - The challenge data object
     * @param {*} answer - The user's answer
     * @returns {boolean} Whether the answer is correct
     */
    function checkAnswer(challenge, answer) {
        var type = challenge.type;
        if (type === 'A') return answer === challenge.correctAnswer;
        if (type === 'B') return checkTypeB(challenge, answer);
        if (type === 'C') return checkTypeC(challenge, answer);
        if (type === 'D') return checkTypeD(challenge, answer);
        if (type === 'E') return checkTypeE(challenge, answer);
        if (type === 'F') {
            // Type F challenges carry their own actual type (A-E) in the type field.
            // Since level 24 sets each challenge's type to its real type, this branch
            // is only reached if a challenge literally has type:'F' without a sub-type.
            // Fallback: treat as Type A selection.
            return answer === challenge.correctAnswer;
        }
        return false;
    }

    // ── Public API ────────────────────────────────────────────────────

    return {
        render: render,
        getAnswer: getAnswer,
        checkAnswer: checkAnswer
    };
})();
