/**
 * Robot Brain Builder — Robot Customization & Shop
 * Handles robot CSS rendering, cosmetic state, and shop logic (buy/equip).
 * Registers on window.LogicGame.Robot namespace.
 */
window.LogicGame = window.LogicGame || {};

window.LogicGame.Robot = (function() {
    'use strict';

    var SHOP_ITEMS = {
        antennas: [
            { id: 'default_antenna', name: 'Default Bolt', cost: 0, cssClass: '' },
            { id: 'lightning_antenna', name: 'Lightning Rod', cost: 30, cssClass: 'antenna-lightning' },
            { id: 'star_antenna', name: 'Star Tip', cost: 50, cssClass: 'antenna-star' },
            { id: 'rainbow_antenna', name: 'Rainbow', cost: 80, cssClass: 'antenna-rainbow' },
            { id: 'crown_antenna', name: 'Crown', cost: 120, cssClass: 'antenna-crown' }
        ],
        eyes: [
            { id: 'default_eyes', name: 'Default Green', cost: 0, cssClass: '' },
            { id: 'blue_eyes', name: 'Blue Glow', cost: 25, cssClass: 'eyes-blue' },
            { id: 'red_eyes', name: 'Red Scanner', cost: 45, cssClass: 'eyes-red' },
            { id: 'gold_eyes', name: 'Gold', cost: 75, cssClass: 'eyes-gold' },
            { id: 'rainbow_eyes', name: 'Rainbow Pulse', cost: 100, cssClass: 'eyes-rainbow' }
        ],
        paint: [
            { id: 'default_body', name: 'Default Silver', cost: 0, cssClass: '' },
            { id: 'purple_body', name: 'Purple Plating', cost: 40, cssClass: 'body-purple' },
            { id: 'galaxy_body', name: 'Galaxy', cost: 80, cssClass: 'body-galaxy' },
            { id: 'gold_body', name: 'Gold', cost: 110, cssClass: 'body-gold' },
            { id: 'holo_body', name: 'Holographic', cost: 150, cssClass: 'body-holographic' }
        ],
        accessories: [
            { id: 'none_accessory', name: 'None', cost: 0, cssClass: '' },
            { id: 'bowtie_accessory', name: 'Bow Tie', cost: 20, cssClass: 'accessory-bowtie' },
            { id: 'cape_accessory', name: 'Cape', cost: 60, cssClass: 'accessory-cape' },
            { id: 'jetpack_accessory', name: 'Jetpack', cost: 90, cssClass: 'accessory-jetpack' },
            { id: 'halo_accessory', name: 'Halo', cost: 125, cssClass: 'accessory-halo' }
        ]
    };

    /**
     * Map from robotCustomization slot names to SHOP_ITEMS category keys.
     * Profile stores: antenna, eyes, body, accessory
     * SHOP_ITEMS uses: antennas, eyes, paint, accessories
     */
    var SLOT_TO_CATEGORY = {
        antenna: 'antennas',
        eyes: 'eyes',
        body: 'paint',
        accessory: 'accessories'
    };

    /**
     * Map from SHOP_ITEMS category keys back to profile slot names.
     */
    var CATEGORY_TO_SLOT = {
        antennas: 'antenna',
        eyes: 'eyes',
        paint: 'body',
        accessories: 'accessory'
    };

    /**
     * All cosmetic CSS classes that may be applied to a .robot element.
     * Used to strip old classes before applying new ones.
     */
    var ALL_COSMETIC_CLASSES = [];
    (function buildClassList() {
        var categories = ['antennas', 'eyes', 'paint', 'accessories'];
        for (var c = 0; c < categories.length; c++) {
            var items = SHOP_ITEMS[categories[c]];
            for (var i = 0; i < items.length; i++) {
                if (items[i].cssClass) {
                    ALL_COSMETIC_CLASSES.push(items[i].cssClass);
                }
            }
        }
    })();

    /**
     * Find a shop item by its ID. Searches all categories.
     * Returns the item object or null if not found.
     */
    function getItemById(itemId) {
        var categories = ['antennas', 'eyes', 'paint', 'accessories'];
        for (var c = 0; c < categories.length; c++) {
            var items = SHOP_ITEMS[categories[c]];
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === itemId) {
                    return items[i];
                }
            }
        }
        return null;
    }

    /**
     * Determine which category an item belongs to.
     * Returns the category key ('antennas', 'eyes', 'paint', 'accessories') or null.
     */
    function getCategoryForItem(itemId) {
        var categories = ['antennas', 'eyes', 'paint', 'accessories'];
        for (var c = 0; c < categories.length; c++) {
            var items = SHOP_ITEMS[categories[c]];
            for (var i = 0; i < items.length; i++) {
                if (items[i].id === itemId) {
                    return categories[c];
                }
            }
        }
        return null;
    }

    /**
     * Find the item currently equipped in a given profile slot.
     * Looks up the item ID stored in robotCustomization for the given category,
     * then finds the matching item in SHOP_ITEMS.
     */
    function getEquippedItem(profile, category) {
        if (!profile || !profile.robotCustomization) return null;
        var slot = CATEGORY_TO_SLOT[category];
        if (!slot) return null;
        var equippedValue = profile.robotCustomization[slot];
        // The profile stores short values like 'default', 'lightning', etc.
        // We need to match these against item IDs.
        var items = SHOP_ITEMS[category];
        if (!items) return null;
        for (var i = 0; i < items.length; i++) {
            // Check if the item ID starts with the equipped value or matches directly
            if (items[i].id === equippedValue) {
                return items[i];
            }
        }
        // Fallback: match by prefix (e.g., 'default' matches 'default_antenna')
        for (var j = 0; j < items.length; j++) {
            if (items[j].id.indexOf(equippedValue + '_') === 0 || items[j].id === equippedValue + '_' + slot) {
                return items[j];
            }
        }
        // Final fallback: return the first (default) item
        return items[0];
    }

    /**
     * Update all .robot elements on the page to reflect the current
     * cosmetic configuration from the given profile.
     */
    function updateRobotPreview(profile) {
        var robotEls = document.querySelectorAll('.robot');
        if (!robotEls.length) return;
        if (!profile || !profile.robotCustomization) return;

        // Gather the CSS classes for each equipped cosmetic
        var classesToAdd = [];
        var categories = ['antennas', 'eyes', 'paint', 'accessories'];
        for (var c = 0; c < categories.length; c++) {
            var equippedItem = getEquippedItem(profile, categories[c]);
            if (equippedItem && equippedItem.cssClass) {
                classesToAdd.push(equippedItem.cssClass);
            }
        }

        // Apply to every .robot element
        for (var r = 0; r < robotEls.length; r++) {
            var el = robotEls[r];
            // Remove all cosmetic classes first
            for (var k = 0; k < ALL_COSMETIC_CLASSES.length; k++) {
                el.classList.remove(ALL_COSMETIC_CLASSES[k]);
            }
            // Add the currently equipped classes
            for (var a = 0; a < classesToAdd.length; a++) {
                el.classList.add(classesToAdd[a]);
            }
        }
    }

    /**
     * Render the shop items grid for a given category tab.
     * Populates the #shop-items container with item cards.
     *
     * Each card shows:
     *   - Item name
     *   - Cost (or "Owned" / "Equipped" badge)
     *   - Buy button (if not owned, disabled if insufficient coins)
     *   - Equip button (if owned but not equipped)
     *   - "Equipped" badge (if currently equipped)
     */
    function renderShopItems(category, profile) {
        var container = document.getElementById('shop-items');
        if (!container) return;

        var items = SHOP_ITEMS[category];
        if (!items) {
            container.innerHTML = '<p>No items in this category.</p>';
            return;
        }

        if (!profile) {
            container.innerHTML = '<p>No profile selected.</p>';
            return;
        }

        var html = '';
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var owned = profile.unlockedCosmetics.indexOf(item.id) !== -1;
            var equippedItem = getEquippedItem(profile, category);
            var equipped = equippedItem && equippedItem.id === item.id;
            var canAfford = profile.coins >= item.cost;

            html += '<div class="shop-item' + (equipped ? ' shop-item-equipped' : '') + '">';
            html += '<div class="shop-item-name">' + escapeHtml(item.name) + '</div>';

            if (equipped) {
                html += '<div class="shop-item-badge badge-equipped">Equipped</div>';
            } else if (owned) {
                html += '<div class="shop-item-badge badge-owned">Owned</div>';
            } else {
                html += '<div class="shop-item-cost">';
                html += '<span class="coin-icon">&#129689;</span> ' + item.cost;
                html += '</div>';
            }

            html += '<div class="shop-item-actions">';
            if (equipped) {
                // Already equipped — no action needed
                html += '<button class="btn btn-equipped" disabled>Equipped</button>';
            } else if (owned) {
                // Owned but not equipped — show equip button
                html += '<button class="btn btn-equip" data-item-id="' + item.id + '" data-category="' + category + '">Equip</button>';
            } else {
                // Not owned — show buy button
                html += '<button class="btn btn-buy' + (canAfford ? '' : ' btn-disabled') + '" data-item-id="' + item.id + '" data-category="' + category + '"' + (canAfford ? '' : ' disabled') + '>';
                html += canAfford ? 'Buy' : 'Not enough coins';
                html += '</button>';
            }
            html += '</div>';
            html += '</div>';
        }

        container.innerHTML = html;

        // Attach event listeners to buy and equip buttons
        var buyButtons = container.querySelectorAll('.btn-buy:not(.btn-disabled)');
        for (var b = 0; b < buyButtons.length; b++) {
            buyButtons[b].addEventListener('click', handleBuyClick);
        }

        var equipButtons = container.querySelectorAll('.btn-equip');
        for (var e = 0; e < equipButtons.length; e++) {
            equipButtons[e].addEventListener('click', handleEquipClick);
        }
    }

    /**
     * Handle a buy button click. Reads item-id and category from data attributes.
     */
    function handleBuyClick(evt) {
        var btn = evt.currentTarget;
        var itemId = btn.getAttribute('data-item-id');
        var category = btn.getAttribute('data-category');
        var profile = window.LogicGame.Profiles.getActive();
        if (!profile) return;

        var success = buyItem(itemId, category, profile);
        if (success) {
            // Play purchase sound if available
            if (window.LogicGame.Sound && window.LogicGame.Sound.playBuyItem) {
                window.LogicGame.Sound.playBuyItem();
            }
            // Re-render the shop and update coin display
            renderShopItems(category, profile);
            updateCoinDisplay(profile);
        }
    }

    /**
     * Handle an equip button click. Reads item-id and category from data attributes.
     */
    function handleEquipClick(evt) {
        var btn = evt.currentTarget;
        var itemId = btn.getAttribute('data-item-id');
        var category = btn.getAttribute('data-category');
        var profile = window.LogicGame.Profiles.getActive();
        if (!profile) return;

        var success = equipItem(itemId, category, profile);
        if (success) {
            // Play click sound if available
            if (window.LogicGame.Sound && window.LogicGame.Sound.playClick) {
                window.LogicGame.Sound.playClick();
            }
            // Re-render the shop and update robot preview
            renderShopItems(category, profile);
            updateRobotPreview(profile);
        }
    }

    /**
     * Update the shop coin display to reflect current coin balance.
     */
    function updateCoinDisplay(profile) {
        var coinEl = document.getElementById('coin-count-shop');
        if (coinEl && profile) {
            coinEl.textContent = String(profile.coins);
        }
    }

    /**
     * Purchase an item. Deducts cost from coins, adds to unlockedCosmetics, saves.
     * Returns true if the purchase succeeded, false otherwise.
     */
    function buyItem(itemId, category, profile) {
        if (!profile) return false;

        var item = getItemById(itemId);
        if (!item) return false;

        // Already owned?
        if (profile.unlockedCosmetics.indexOf(itemId) !== -1) return false;

        // Enough coins?
        if (profile.coins < item.cost) return false;

        // Deduct coins via Profiles API
        var spent = window.LogicGame.Profiles.spendCoins(item.cost);
        if (!spent) return false;

        // Unlock the cosmetic
        window.LogicGame.Profiles.unlockCosmetic(itemId);

        return true;
    }

    /**
     * Equip an owned item. Updates robotCustomization for the given category slot.
     * Saves to localStorage. Returns true if successful.
     */
    function equipItem(itemId, category, profile) {
        if (!profile) return false;

        // Verify the item exists and belongs to the given category
        var item = getItemById(itemId);
        if (!item) return false;

        var actualCategory = getCategoryForItem(itemId);
        if (actualCategory !== category) return false;

        // Verify the item is owned (free items and defaults are always considered owned)
        if (item.cost > 0 && profile.unlockedCosmetics.indexOf(itemId) === -1) return false;

        // Determine the profile slot from the category
        var slot = CATEGORY_TO_SLOT[category];
        if (!slot) return false;

        // Update the profile's robotCustomization via Profiles API
        window.LogicGame.Profiles.setRobotPart(slot, itemId);

        return true;
    }

    /**
     * Simple HTML escaping to prevent XSS in item names.
     */
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    return {
        SHOP_ITEMS: SHOP_ITEMS,
        updateRobotPreview: updateRobotPreview,
        renderShopItems: renderShopItems,
        buyItem: buyItem,
        equipItem: equipItem,
        getItemById: getItemById,
        getCategoryForItem: getCategoryForItem
    };
})();
