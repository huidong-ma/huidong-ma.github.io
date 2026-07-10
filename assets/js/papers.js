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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
