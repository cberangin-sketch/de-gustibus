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
   * Premier toucher :
   * - doigt posé = texte visible
   * - doigt relâché = texte disparaît
   * - l'article ne s'ouvre pas
   *
   * Deuxième toucher :
   * - l'article s'ouvre normalement
   */

  const featuredLatest =
    document.querySelector('.featured-latest__link');

  if (featuredLatest) {

    let previewArmed = false;
    let previewTouch = false;
    let suppressNextClick = false;

    function isMobileTouch() {
      return window.matchMedia('(max-width: 760px)').matches;
    }


    /* Doigt posé */

    featuredLatest.addEventListener(
      'touchstart',
      function () {

        if (!isMobileTouch()) return;

        /*
         * Premier toucher :
         * on affiche seulement l'aperçu.
         */

        if (!previewArmed) {

          previewTouch = true;

          featuredLatest.classList.add(
            'is-revealed'
          );

        } else {

          /*
           * Deuxième toucher :
           * aucun aperçu supplémentaire,
           * le clic pourra ouvrir l'article.
           */

          previewTouch = false;

        }

      },
      { passive: true }
    );


    /* Doigt relâché */

    featuredLatest.addEventListener(
      'touchend',
      function () {

        if (!isMobileTouch()) return;

        if (previewTouch) {

          /*
           * Le texte disparaît immédiatement.
           */

          featuredLatest.classList.remove(
            'is-revealed'
          );

          /*
           * Le prochain toucher pourra ouvrir
           * l'article.
           */

          previewArmed = true;

          /*
           * On bloque le clic automatique généré
           * par ce premier toucher.
           */

          suppressNextClick = true;

          previewTouch = false;

        }

      },
      { passive: true }
    );


    /* Si le toucher est annulé */

    featuredLatest.addEventListener(
      'touchcancel',
      function () {

        if (!isMobileTouch()) return;

        featuredLatest.classList.remove(
          'is-revealed'
        );

        previewTouch = false;

      },
      { passive: true }
    );


    /*
     * Empêche le menu contextuel du navigateur
     * lors d'un appui prolongé sur téléphone.
     */

    featuredLatest.addEventListener(
      'contextmenu',
      function (event) {

        if (isMobileTouch()) {
          event.preventDefault();
        }

      }
    );


    /* Gestion de l'ouverture de l'article */

    featuredLatest.addEventListener(
      'click',
      function (event) {

        if (!isMobileTouch()) return;

        /*
         * Clic automatique produit après
         * le premier toucher :
         * on l'annule.
         */

        if (suppressNextClick) {

          event.preventDefault();

          suppressNextClick = false;

          return;

        }

        /*
         * Deuxième toucher :
         * on laisse le lien fonctionner normalement.
         */

        if (previewArmed) {
          previewArmed = false;
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


  /*
   * Si nous ne sommes pas sur la page de recherche,
   * le reste du script n'est pas nécessaire.
   */

  if (!f) return;


  const q =
    new URLSearchParams(location.search).get('q') || '';

  i.value = q;


  /* Protection du texte injecté dans les résultats */

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
