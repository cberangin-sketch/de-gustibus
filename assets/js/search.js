(function () {

  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  const desktopSearchToggle = document.querySelector('.search-toggle');
  const mobileSearchToggle = document.querySelector('.mobile-search-toggle');

  const searchPanel = document.querySelector('#search-panel');
  const searchInput = document.querySelector('#search-input');


  /* Menu mobile */

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {

      const isOpen = mainNav.classList.toggle('is-open');

      menuToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

      menuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Fermer le menu' : 'Ouvrir le menu'
      );

      menuToggle.textContent = isOpen ? '×' : '☰';

    });
  }


  /* Ouverture de la recherche */

  function openSearch() {

    if (!searchPanel) return;

    searchPanel.hidden = false;

    if (desktopSearchToggle) {
      desktopSearchToggle.setAttribute(
        'aria-expanded',
        'true'
      );
    }

    if (mobileSearchToggle) {
      mobileSearchToggle.setAttribute(
        'aria-expanded',
        'true'
      );
    }

    if (searchInput) {
      setTimeout(function () {
        searchInput.focus();
      }, 50);
    }

  }


  function toggleDesktopSearch() {

    if (!searchPanel) return;

    if (searchPanel.hidden) {

      openSearch();

    } else {

      searchPanel.hidden = true;

      if (desktopSearchToggle) {
        desktopSearchToggle.setAttribute(
          'aria-expanded',
          'false'
        );
      }

    }

  }


  if (desktopSearchToggle) {
    desktopSearchToggle.addEventListener(
      'click',
      toggleDesktopSearch
    );
  }


  /* Recherche depuis le menu mobile */

  if (mobileSearchToggle) {

    mobileSearchToggle.addEventListener(
      'click',
      function () {

        if (mainNav) {
          mainNav.classList.remove('is-open');
        }

        if (menuToggle) {

          menuToggle.textContent = '☰';

          menuToggle.setAttribute(
            'aria-expanded',
            'false'
          );

          menuToggle.setAttribute(
            'aria-label',
            'Ouvrir le menu'
          );

        }

        openSearch();

      }
    );

  }


  /*
   * Dernier article sur téléphone
   *
   * - doigt posé : texte visible
   * - doigt relâché : texte invisible
   * - l'aperçu peut être répété autant de fois qu'on veut
   * - premier contact : pas d'ouverture
   * - après un premier contact, un appui bref ouvre l'article
   * - un appui maintenu n'ouvre jamais l'article
   */

  const featuredLatest =
    document.querySelector('.featured-latest__link');

  if (featuredLatest) {

    let touchStartTime = 0;
    let hasPreviewed = false;
    let suppressNextClick = false;

    const longPressDelay = 220;


    function isMobileTouch() {
      return window.matchMedia(
        '(max-width: 760px)'
      ).matches;
    }


    /* Le doigt touche l'image */

    featuredLatest.addEventListener(
      'touchstart',
      function () {

        if (!isMobileTouch()) return;

        touchStartTime = Date.now();

        featuredLatest.classList.add(
          'is-revealed'
        );

      },
      { passive: true }
    );


    /* Le doigt quitte l'image */

    featuredLatest.addEventListener(
      'touchend',
      function () {

        if (!isMobileTouch()) return;

        const duration =
          Date.now() - touchStartTime;

        featuredLatest.classList.remove(
          'is-revealed'
        );


        /*
         * Appui maintenu :
         * il sert uniquement à regarder le titre.
         * Il ne doit jamais ouvrir l'article.
         */

        if (duration >= longPressDelay) {

          hasPreviewed = true;
          suppressNextClick = true;

          return;

        }


        /*
         * Premier appui bref :
         * on l'utilise comme premier contact,
         * sans ouvrir l'article.
         */

        if (!hasPreviewed) {

          hasPreviewed = true;
          suppressNextClick = true;

          return;

        }


        /*
         * Si on arrive ici :
         * un premier contact a déjà eu lieu
         * et l'appui actuel est bref.
         *
         * On laisse donc le clic ouvrir l'article.
         */

        suppressNextClick = false;

      },
      { passive: true }
    );


    /* Si le toucher est interrompu */

    featuredLatest.addEventListener(
      'touchcancel',
      function () {

        if (!isMobileTouch()) return;

        featuredLatest.classList.remove(
          'is-revealed'
        );

      },
      { passive: true }
    );


    /*
     * Empêche le menu contextuel lors
     * d'un appui prolongé.
     */

    featuredLatest.addEventListener(
      'contextmenu',
      function (event) {

        if (isMobileTouch()) {
          event.preventDefault();
        }

      }
    );


    /* Empêche seulement les clics prévus pour l'aperçu */

    featuredLatest.addEventListener(
      'click',
      function (event) {

        if (!isMobileTouch()) return;

        if (suppressNextClick) {

          event.preventDefault();

          suppressNextClick = false;

        }

      }
    );

  }


  /* Page complète de résultats */

  const f =
    document.querySelector('#full-search-form');

  const i =
    document.querySelector('#full-search-input');

  const r =
    document.querySelector('#search-results-list');

  const s =
    document.querySelector('#search-summary');

  const e =
    document.querySelector('#search-empty');

  const posts =
    window.DE_GUSTIBUS_POSTS || [];


  if (!f) return;


  const q =
    new URLSearchParams(location.search).get('q') || '';

  i.value = q;


  /* Protection du texte injecté */

  function esc(x) {

    return String(x).replace(
      /[&<>"']/g,
      c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[c])
    );

  }


  /* Affichage propre de la date */

  function formatDate(value) {

    const dateOnly =
      String(value || '').split('T')[0];

    const parts =
      dateOnly.split('-');

    if (parts.length === 3) {

      return (
        parts[2] +
        '.' +
        parts[1] +
        '.' +
        parts[0]
      );

    }

    return dateOnly;

  }


  /* Recherche */

  function run() {

    let x =
      i.value
        .trim()
        .toLocaleLowerCase('fr');

    r.innerHTML = '';
    e.hidden = true;


    if (!x) {

      s.textContent =
        'Saisissez un mot ou une expression pour rechercher dans le carnet.';

      return;

    }


    let m = posts.filter(p =>

      [
        p.title,
        p.category,
        p.excerpt,
        ...(p.tags || [])
      ]

        .join(' ')
        .toLocaleLowerCase('fr')
        .includes(x)

    );


    s.textContent =
      m.length +
      ' ' +
      (
        m.length > 1
          ? 'articles trouvés.'
          : 'article trouvé.'
      );


    m.forEach(p => {

      let a =
        document.createElement('article');

      a.className =
        'post-card search-card';


      a.innerHTML =

        '<div class="post-card-content">' +

        '<p class="eyebrow">' +
        esc(p.category) +
        ' · ' +
        formatDate(p.date) +
        '</p>' +

        '<h2><a href="' +
        p.url +
        '">' +
        esc(p.title) +
        '</a></h2>' +

        '<div class="post-excerpt">' +
        esc(p.excerpt || '') +
        '</div>' +

        '<a class="read-more" href="' +
        p.url +
        '">Lire l’article →</a>' +

        '</div>';


      r.appendChild(a);

    });


    if (!m.length) {
      e.hidden = false;
    }

  }


  f.onsubmit = z => {

    z.preventDefault();

    history.replaceState(
      {},
      '',
      i.value
        ? '?q=' + encodeURIComponent(i.value)
        : location.pathname
    );

    run();

  };


  run();

})();
