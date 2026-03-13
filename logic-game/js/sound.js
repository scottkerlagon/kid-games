/**
 * Robot Brain Builder — Sound Manager
 * Web Audio API synthesizer for game sounds.
 * Registers on window.LogicGame.Sound namespace.
 * Requires window.LogicGame.Profiles to check sound enabled state.
 */
window.LogicGame = window.LogicGame || {};

window.LogicGame.Sound = (function() {
    'use strict';

    var ctx = null;

    /**
     * Initialize the AudioContext. Must be called from a user gesture
     * (click/tap) on the page to satisfy browser autoplay policies.
     */
    function init() {
        if (ctx) {
            // Already initialized — just ensure it's running
            if (ctx.state === 'suspended') ctx.resume();
            return;
        }
        var AC = window.AudioContext || window.webkitAudioContext;
        if (AC) {
            try {
                ctx = new AC();
                if (ctx.state === 'suspended') ctx.resume();
            } catch (e) {
                ctx = null;
            }
        }
    }

    /**
     * Check if sound should play right now.
     */
    function _canPlay() {
        if (!ctx) return false;
        if (window.LogicGame && window.LogicGame.Profiles && !window.LogicGame.Profiles.isSoundEnabled()) {
            return false;
        }
        if (ctx.state === 'suspended') ctx.resume();
        return true;
    }

    /**
     * Play a single tone with the given parameters.
     * @param {number} freq - Frequency in Hz
     * @param {number} duration - Duration in seconds
     * @param {string} type - Oscillator type: 'sine', 'square', 'triangle', 'sawtooth'
     * @param {number} gainVal - Volume (0.0 to 1.0)
     * @param {number} delay - Delay before starting in seconds (default 0)
     */
    function _tone(freq, duration, type, gainVal, delay) {
        if (!_canPlay()) return;
        var startTime = ctx.currentTime + (delay || 0);
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(gainVal || 0.15, startTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.stop(startTime + duration + 0.01);
    }

    /**
     * Play a noise burst (for percussive sounds).
     * @param {number} duration - Duration in seconds
     * @param {number} gainVal - Volume
     * @param {number} delay - Delay before starting in seconds
     */
    function _noise(duration, gainVal, delay) {
        if (!_canPlay()) return;
        var startTime = ctx.currentTime + (delay || 0);
        var bufferSize = Math.floor(ctx.sampleRate * duration);
        var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.5;
        }
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(gainVal || 0.05, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(startTime);
        source.stop(startTime + duration + 0.01);
    }

    /**
     * Correct answer — happy ascending two-note chime.
     */
    function playCorrect() {
        _tone(523, 0.1, 'sine', 0.12, 0);
        _tone(659, 0.15, 'sine', 0.12, 0.1);
    }

    /**
     * Wrong answer — low descending buzz.
     */
    function playWrong() {
        _tone(200, 0.3, 'square', 0.08, 0);
        _tone(160, 0.25, 'square', 0.06, 0.15);
    }

    /**
     * Level complete — ascending fanfare. More notes for more stars.
     * @param {number} stars - Number of stars earned (1-3)
     */
    function playLevelComplete(stars) {
        var s = stars || 1;
        // Base notes: C5 -> E5 -> G5
        _tone(523, 0.2, 'sine', 0.15, 0);
        _tone(659, 0.2, 'sine', 0.15, 0.15);
        _tone(784, 0.25, 'sine', 0.15, 0.3);

        if (s >= 2) {
            // Add a higher resolution note
            _tone(880, 0.25, 'triangle', 0.12, 0.5);
        }
        if (s >= 3) {
            // Full fanfare with high C and sparkle
            _tone(1047, 0.4, 'sine', 0.15, 0.65);
            _tone(1319, 0.15, 'triangle', 0.08, 0.75);
            _noise(0.08, 0.03, 0.75);
        }
    }

    /**
     * Level failed — sad descending three-note sequence.
     */
    function playLevelFailed() {
        _tone(400, 0.15, 'sine', 0.1, 0);
        _tone(300, 0.15, 'sine', 0.1, 0.15);
        _tone(200, 0.35, 'sine', 0.1, 0.3);
    }

    /**
     * UI click — short high-pitched tick.
     */
    function playClick() {
        _tone(800, 0.03, 'sine', 0.06, 0);
    }

    /**
     * Coin earned — bright cha-ching.
     */
    function playCoinEarn() {
        _tone(880, 0.08, 'sine', 0.15, 0);
        _tone(1100, 0.12, 'sine', 0.12, 0.08);
        _tone(1320, 0.1, 'triangle', 0.08, 0.16);
    }

    /**
     * Star earned — sparkle shimmer.
     */
    function playStarEarn() {
        _tone(1200, 0.08, 'triangle', 0.1, 0);
        _tone(1500, 0.08, 'triangle', 0.08, 0.06);
        _tone(1800, 0.12, 'triangle', 0.06, 0.12);
    }

    /**
     * Buy item from shop — cash register ding.
     */
    function playBuyItem() {
        _tone(600, 0.08, 'sine', 0.1, 0);
        _tone(800, 0.12, 'sine', 0.1, 0.08);
        _noise(0.05, 0.04, 0.08);
        _tone(1000, 0.15, 'triangle', 0.08, 0.18);
    }

    /**
     * Professor speaking — short blip for text animation.
     */
    function playProfessorSpeak() {
        _tone(500, 0.05, 'sine', 0.05, 0);
    }

    /**
     * Drag start — subtle pickup sound.
     */
    function playDragStart() {
        _tone(600, 0.04, 'triangle', 0.06, 0);
    }

    /**
     * Drop / snap into place — satisfying click.
     */
    function playDrop() {
        _tone(700, 0.06, 'sine', 0.08, 0);
        _tone(900, 0.04, 'triangle', 0.05, 0.04);
    }

    /**
     * Timer warning — urgent pulse.
     */
    function playTimerWarning() {
        _tone(440, 0.08, 'square', 0.06, 0);
        _tone(440, 0.08, 'square', 0.06, 0.2);
    }

    /**
     * Hint used — gentle notification.
     */
    function playHint() {
        _tone(660, 0.1, 'sine', 0.08, 0);
        _tone(880, 0.15, 'sine', 0.06, 0.1);
    }

    /**
     * Module unlocked — triumphant sequence.
     */
    function playModuleUnlocked() {
        _tone(392, 0.15, 'sine', 0.12, 0);
        _tone(494, 0.15, 'sine', 0.12, 0.15);
        _tone(587, 0.15, 'sine', 0.12, 0.3);
        _tone(784, 0.35, 'sine', 0.15, 0.45);
        _tone(784, 0.15, 'triangle', 0.08, 0.5);
    }

    /**
     * Achievement unlocked — special celebratory jingle.
     */
    function playAchievement() {
        _tone(523, 0.1, 'sine', 0.12, 0);
        _tone(659, 0.1, 'sine', 0.12, 0.1);
        _tone(784, 0.1, 'sine', 0.12, 0.2);
        _tone(1047, 0.3, 'triangle', 0.15, 0.3);
        _noise(0.05, 0.03, 0.35);
    }

    /**
     * Navigate / page transition — soft whoosh.
     */
    function playNavigate() {
        _tone(400, 0.06, 'sine', 0.04, 0);
        _tone(600, 0.06, 'sine', 0.04, 0.03);
    }

    return {
        init: init,
        playCorrect: playCorrect,
        playWrong: playWrong,
        playLevelComplete: playLevelComplete,
        playLevelFailed: playLevelFailed,
        playClick: playClick,
        playCoinEarn: playCoinEarn,
        playStarEarn: playStarEarn,
        playBuyItem: playBuyItem,
        playProfessorSpeak: playProfessorSpeak,
        playDragStart: playDragStart,
        playDrop: playDrop,
        playTimerWarning: playTimerWarning,
        playHint: playHint,
        playModuleUnlocked: playModuleUnlocked,
        playAchievement: playAchievement,
        playNavigate: playNavigate
    };
})();
