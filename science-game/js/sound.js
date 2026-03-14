/**
 * Science Town Builder — Sound Manager
 * Web Audio API synthesizer for game sounds.
 * Registers on window.ScienceGame.Sound namespace.
 * Requires window.ScienceGame.Profiles to check sound enabled state.
 */
window.ScienceGame = window.ScienceGame || {};

window.ScienceGame.Sound = (function() {
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
     * @returns {boolean} True if audio context is ready and sound is enabled.
     */
    function _canPlay() {
        if (!ctx) return false;
        if (window.ScienceGame && window.ScienceGame.Profiles && !window.ScienceGame.Profiles.isSoundEnabled()) {
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
     * Correct answer — rising two-tone chime.
     * C5 (523 Hz) into E5 (659 Hz), sine wave, gentle volume.
     */
    function playCorrect() {
        _tone(523, 0.12, 'sine', 0.12, 0);
        _tone(659, 0.16, 'sine', 0.12, 0.12);
    }

    /**
     * Wrong answer — low descending buzz.
     * 200 Hz down to 160 Hz, square wave for a buzzy feel.
     */
    function playWrong() {
        _tone(200, 0.28, 'square', 0.08, 0);
        _tone(160, 0.22, 'square', 0.06, 0.14);
    }

    /**
     * Footstep — very subtle tick for walking around town.
     * Must be extremely quiet since it plays frequently.
     */
    function playStep() {
        _tone(300, 0.03, 'triangle', 0.04, 0);
    }

    /**
     * Build — satisfying construction sound.
     * Rising triangle tone sequence (400 → 600 → 800 Hz) with a
     * percussive noise burst at the end for a "snap into place" feel.
     */
    function playBuild() {
        _tone(400, 0.08, 'triangle', 0.10, 0);
        _tone(600, 0.08, 'triangle', 0.10, 0.08);
        _tone(800, 0.12, 'triangle', 0.12, 0.16);
        _noise(0.06, 0.05, 0.24);
    }

    /**
     * Resource earned — bright cha-ching sound.
     * Ascending sine tones (880 → 1100 → 1320 Hz) transitioning
     * from sine to triangle for a shimmery finish.
     */
    function playResourceEarn() {
        _tone(880, 0.08, 'sine', 0.12, 0);
        _tone(1100, 0.10, 'sine', 0.10, 0.08);
        _tone(1320, 0.10, 'triangle', 0.08, 0.16);
    }

    /**
     * Level up — triumphant town level up fanfare.
     * Ascending arpeggio: G4 (392) → B4 (494) → D5 (587) → G5 (784).
     * Final note held longer with a triangle doubling for richness.
     */
    function playLevelUp() {
        _tone(392, 0.14, 'sine', 0.12, 0);
        _tone(494, 0.14, 'sine', 0.12, 0.14);
        _tone(587, 0.14, 'sine', 0.12, 0.28);
        _tone(784, 0.35, 'sine', 0.15, 0.42);
        _tone(784, 0.15, 'triangle', 0.08, 0.48);
    }

    /**
     * Click — short high-pitched tick for UI interactions.
     */
    function playClick() {
        _tone(800, 0.03, 'sine', 0.06, 0);
    }

    /**
     * Enter building — whoosh/door opening sound.
     * Descending tone (600 → 400 Hz) with a brief noise layer
     * for a "swoosh through the door" effect.
     */
    function playEnterBuilding() {
        _tone(600, 0.10, 'sine', 0.08, 0);
        _tone(400, 0.10, 'sine', 0.06, 0.06);
        _noise(0.06, 0.03, 0.04);
    }

    /**
     * Exit building — reverse whoosh sound.
     * Ascending tone (400 → 600 Hz) for a "stepping back outside" feel.
     */
    function playExitBuilding() {
        _tone(400, 0.10, 'sine', 0.06, 0);
        _tone(600, 0.10, 'sine', 0.08, 0.06);
    }

    return {
        init: init,
        playCorrect: playCorrect,
        playWrong: playWrong,
        playStep: playStep,
        playBuild: playBuild,
        playResourceEarn: playResourceEarn,
        playLevelUp: playLevelUp,
        playClick: playClick,
        playEnterBuilding: playEnterBuilding,
        playExitBuilding: playExitBuilding
    };
})();
