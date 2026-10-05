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
   * 1er toucher :
   * le titre apparaît et reste affiché.
   *
   * 2e toucher sur l'image :
   * ouverture de l'article.
   *
   * Toucher ailleurs :
   * le titre disparaît.
   *
   * Recommencer à faire défiler la page :
   * le titre disparaît.
   */

  const featuredLatest =
    document.querySelector('.featured-latest__link');

  if (featuredLatest) {

    let touchStartedRevealed = false;
    let touchMoved = false;
    let suppressNextClick = false;

    let startX = 0;
    let startY = 0;

    const movementThreshold = 10;


    function isMobileTouch() {

      return window.matchMedia(
        '(max-width: 760px)'
      ).matches;

    }


    /*
     * Début du toucher sur l'image.
     */

    featuredLatest.addEventListener(
      'touchstart',
      function (event) {

        if (!isMobileTouch()) return;

        const touch = event.touches[0];

        if (!touch) return;

        startX = touch.clientX;
        startY = touch.clientY;

        touchMoved = false;

        /*
         * On mémorise si le titre était déjà visible
         * AVANT ce nouveau toucher.
         */

        touchStartedRevealed =
          featuredLatest.classList.contains(
            'is-revealed'
          );


        /*
         * Premier toucher :
         * apparition immédiate du titre.
         */

        if (!touchStartedRevealed) {

          featuredLatest.classList.add(
            'is-revealed'
          );

        }

      },
      { passive: true }
    );


    /*
     * Si le doigt se déplace suffisamment,
     * on considère que l'utilisateur veut scroller.
     */

    featuredLatest.addEventListener(
      'touchmove',
      function (event) {

        if (!isMobileTouch()) return;

        const touch = event.touches[0];

        if (!touch) return;

        const distanceX =
          Math.abs(touch.clientX - startX);

        const distanceY =
          Math.abs(touch.clientY - startY);


        if (
          distanceX > movementThreshold ||
          distanceY > movementThreshold
        ) {

          touchMoved = true;

          /*
           * Dès que le scroll commence,
           * le faux "hover" disparaît.
           */

          featuredLatest.classList.remove(
            'is-revealed'
          );

          /*
           * Par sécurité, aucun clic ne doit
           * être déclenché après ce geste.
           */

          suppressNextClick = true;

        }

      },
      { passive: true }
    );


    /*
     * Fin du toucher.
     */

    featuredLatest.addEventListener(
      'touchend',
      function () {

        if (!isMobileTouch()) return;


        /*
         * L'utilisateur a fait défiler :
         * aucune ouverture de l'article.
         */

        if (touchMoved) {

          suppressNextClick = true;

          return;

        }


        /*
         * Si le titre n'était PAS visible
         * avant le toucher :
         *
         * c'était le premier toucher.
         * On garde le titre affiché,
         * mais on bloque l'ouverture.
         */

        if (!touchStartedRevealed) {

          suppressNextClick = true;

          return;

        }


        /*
         * Si le titre était déjà visible :
         *
         * c'est le deuxième toucher.
         * On laisse le lien s'ouvrir normalement.
         */

        suppressNextClick = false;

      },
      { passive: true }
    );


    /*
     * Si Android/iOS annule le geste.
     */

    featuredLatest.addEventListener(
      'touchcancel',
      function () {

        if (!isMobileTouch()) return;

        featuredLatest.classList.remove(
          'is-revealed'
        );

        touchMoved = false;
        suppressNextClick = true;

      },
      { passive: true }
    );


    /*
     * Gestion du clic généré après le toucher.
     */

    featuredLatest.addEventListener(
      'click',
      function (event) {

        if (!isMobileTouch()) return;


        /*
         * Premier toucher ou scroll :
         * on empêche l'ouverture.
         */

        if (suppressNextClick) {

          event.preventDefault();

          suppressNextClick = false;

        }

        /*
         * Sinon :
         * c'était bien le deuxième toucher.
         * Le lien fonctionne normalement.
         */

      }
    );


    /*
     * Toucher n'importe où ailleurs sur la page :
     * disparition du titre.
     */

    document.addEventListener(
      'touchstart',
      function (event) {

        if (!isMobileTouch()) return;


        if (
          !featuredLatest.contains(event.target)
        ) {

          featuredLatest.classList.remove(
            'is-revealed'
          );

          suppressNextClick = false;

        }

      },
      { passive: true }
    );


    /*
     * Si la page commence à défiler,
     * le titre disparaît également.
     */

    window.addEventListener(
      'scroll',
      function () {

        if (!isMobileTouch()) return;


        if (
          featuredLatest.classList.contains(
            'is-revealed'
          )
        ) {

          featuredLatest.classList.remove(
            'is-revealed'
          );

        }

      },
      { passive: true }
    );


    /*
     * Évite le menu contextuel Android/iOS
     * sur appui prolongé.
     */

    featuredLatest.addEventListener(
      'contextmenu',
      function (event) {

        if (isMobileTouch()) {
          event.preventDefault();
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
   * Le reste ne concerne que
   * la page de recherche.
   */

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
