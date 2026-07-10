(function () {
  'use strict';

  var activeAuthorFilter = '';
  var activeTopicFilter = '';

  function updateFilterButtons() {
    document.querySelectorAll('[data-author-filter]').forEach(function (btn) {
      var key = btn.dataset.authorFilter;
      var isActive = key === activeAuthorFilter;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    document.querySelectorAll('[data-topic-filter]').forEach(function (btn) {
      var key = btn.dataset.topicFilter;
      var isActive = key === activeTopicFilter;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  function applyFilters() {
    var items = Array.from(document.querySelectorAll('.paper-list-item[data-paper-tags]'));
    var emptyEl = document.getElementById('paper-filter-empty');
    var visible = 0;

    items.forEach(function (item) {
      var tags = item.dataset.paperTags.split(',').map(function (tag) {
        return tag.trim();
      }).filter(Boolean);

      var authorMatch = !activeAuthorFilter || tags.indexOf(activeAuthorFilter) !== -1;
      var topicMatch = !activeTopicFilter || tags.indexOf(activeTopicFilter) !== -1;
      var match = authorMatch && topicMatch;

      item.hidden = !match;
      if (match) visible++;
    });

    if (emptyEl) emptyEl.hidden = visible !== 0;
    updateFilterButtons();
  }

  function closeVenueTooltips(exceptEl) {
    document.querySelectorAll('.venue-tooltip.is-open').forEach(function (tooltip) {
      if (tooltip !== exceptEl) {
        tooltip.classList.remove('is-open');
        tooltip.style.removeProperty('--venue-tooltip-shift');
      }
    });
  }

  function updateVenueTooltipPosition(tooltip) {
    var rect = tooltip.getBoundingClientRect();
    var tooltipCenter = rect.left + rect.width / 2;
    var viewportCenter = window.innerWidth / 2;
    tooltip.style.setProperty('--venue-tooltip-shift', (viewportCenter - tooltipCenter) + 'px');
  }

  function initVenueTooltips() {
    var tooltips = Array.from(document.querySelectorAll('.venue-tooltip[data-tooltip]'));
    if (!tooltips.length) return;

    tooltips.forEach(function (tooltip) {
      tooltip.addEventListener('click', function (event) {
        event.stopPropagation();
        var willOpen = !tooltip.classList.contains('is-open');
        closeVenueTooltips(tooltip);
        if (willOpen) updateVenueTooltipPosition(tooltip);
        tooltip.classList.toggle('is-open', willOpen);
      });

      tooltip.addEventListener('focus', function () {
        updateVenueTooltipPosition(tooltip);
      });

      tooltip.addEventListener('blur', function () {
        tooltip.classList.remove('is-open');
        tooltip.style.removeProperty('--venue-tooltip-shift');
      });
    });

    document.addEventListener('click', function () {
      closeVenueTooltips();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeVenueTooltips();
    });

    window.addEventListener('resize', function () {
      document.querySelectorAll('.venue-tooltip.is-open').forEach(updateVenueTooltipPosition);
    });
  }

  function init() {
    var toolbar = document.getElementById('paper-filter-toolbar');
    var list = document.getElementById('paper-list');
    if (!toolbar || !list) return;

    var activeAuthorButton = toolbar.querySelector('[data-author-filter].is-active');
    if (activeAuthorButton) {
      activeAuthorFilter = activeAuthorButton.dataset.authorFilter || '';
    }

    toolbar.querySelectorAll('[data-author-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.authorFilter;
        activeAuthorFilter = activeAuthorFilter === key ? '' : key;
        applyFilters();
      });
    });

    toolbar.querySelectorAll('[data-topic-filter]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.topicFilter;
        activeTopicFilter = activeTopicFilter === key ? '' : key;
        applyFilters();
      });
    });

    applyFilters();
    initVenueTooltips();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
