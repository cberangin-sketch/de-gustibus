(function () {

  const menuToggle =
    document.querySelector('.menu-toggle');

  const mainNav =
    document.querySelector('.main-nav');

  const desktopSearchToggle =
    document.querySelector('.search-toggle');

  const mobileSearchToggle =
    document.querySelector('.mobile-search-toggle');

  const searchPanel =
    document.querySelector('#search-panel');

  const searchInput =
    document.querySelector('#search-input');


  /*
   * MENU MOBILE
   */

  function isMobile() {
    return window.matchMedia(
      '(max-width: 760px)'
    ).matches;
  }


  function closeMobileMenu() {

    if (!menuToggle || !mainNav) return;

    mainNav.classList.remove('is-open');

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


  if (menuToggle && mainNav) {

    menuToggle.addEventListener(
      'click',
      function () {

        const isOpen =
          mainNav.classList.toggle('is-open');

        menuToggle.setAttribute(
          'aria-expanded',
          String(isOpen)
        );

        menuToggle.setAttribute(
          'aria-label',
          isOpen
            ? 'Fermer le menu'
            : 'Ouvrir le menu'
        );

        menuToggle.textContent =
          isOpen ? '×' : '☰';

      }
    );


    /*
     * Sur téléphone :
     * toucher n'importe où hors du menu
     * ferme immédiatement le menu.
     */

    document.addEventListener(
      'pointerdown',
      function (event) {

        if (!isMobile()) return;

        if (
          !mainNav.classList.contains('is-open')
        ) {
          return;
        }

        if (
          mainNav.contains(event.target) ||
          menuToggle.contains(event.target)
        ) {
          return;
        }

        closeMobileMenu();

      }
    );

  }


  /*
   * PANNEAU DE RECHERCHE
   */

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

      setTimeout(
        function () {
          searchInput.focus();
        },
        50
      );

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


  if (mobileSearchToggle) {

    mobileSearchToggle.addEventListener(
      'click',
      function () {

        closeMobileMenu();
        openSearch();

      }
    );

  }


  /*
   * DERNIER ARTICLE SUR TÉLÉPHONE
   *
   * Premier toucher :
   * le texte apparaît et reste affiché.
   *
   * Scroll :
   * le texte reste affiché.
   *
   * Deuxième toucher sur l'image :
   * ouverture de l'article.
   *
   * Toucher ailleurs :
   * disparition du texte.
   */

  const featuredLatest =
    document.querySelector(
      '.featured-latest__link'
    );


  if (featuredLatest) {

    let wasAlreadyRevealed = false;
    let suppressNextClick = false;
    let touchMoved = false;

    let startX = 0;
    let startY = 0;

    const movementThreshold = 10;


    featuredLatest.addEventListener(
      'touchstart',
      function (event) {

        if (!isMobile()) return;

        const touch = event.touches[0];

        if (!touch) return;

        startX = touch.clientX;
        startY = touch.clientY;

        touchMoved = false;

        wasAlreadyRevealed =
          featuredLatest.classList.contains(
            'is-revealed'
          );

        if (!wasAlreadyRevealed) {

          featuredLatest.classList.add(
            'is-revealed'
          );

        }

      },
      { passive: true }
    );


    featuredLatest.addEventListener(
      'touchmove',
      function (event) {

        if (!isMobile()) return;

        const touch = event.touches[0];

        if (!touch) return;

        const distanceX =
          Math.abs(
            touch.clientX - startX
          );

        const distanceY =
          Math.abs(
            touch.clientY - startY
          );

        if (
          distanceX > movementThreshold ||
          distanceY > movementThreshold
        ) {
          touchMoved = true;
        }

      },
      { passive: true }
    );


    featuredLatest.addEventListener(
      'touchend',
      function () {

        if (!isMobile()) return;

        if (touchMoved) {

          suppressNextClick = true;
          return;

        }

        if (!wasAlreadyRevealed) {

          suppressNextClick = true;
          return;

        }

        suppressNextClick = false;

      },
      { passive: true }
    );


    featuredLatest.addEventListener(
      'touchcancel',
      function () {

        if (!isMobile()) return;

        suppressNextClick = true;

      },
      { passive: true }
    );


    featuredLatest.addEventListener(
      'click',
      function (event) {

        if (!isMobile()) return;

        if (suppressNextClick) {

          event.preventDefault();
          suppressNextClick = false;

        }

      }
    );


    document.addEventListener(
      'touchstart',
      function (event) {

        if (!isMobile()) return;

        if (
          !featuredLatest.contains(
            event.target
          )
        ) {

          featuredLatest.classList.remove(
            'is-revealed'
          );

          suppressNextClick = false;
          wasAlreadyRevealed = false;

        }

      },
      { passive: true }
    );


    featuredLatest.addEventListener(
      'contextmenu',
      function (event) {

        if (isMobile()) {
          event.preventDefault();
        }

      }
    );

  }


  /*
   * PAGINATION DE LA PAGE
   * "TOUS LES ARTICLES"
   */

  const archiveItems =
    Array.from(
      document.querySelectorAll(
        '.archive-page-item'
      )
    );

  const archivePagination =
    document.querySelector(
      '#archive-pagination'
    );

  const archiveSection =
    document.querySelector(
      '#all-articles'
    );

  const postsPerPage = 10;


  if (
    archiveItems.length &&
    archivePagination
  ) {

    const pageCount =
      Math.ceil(
        archiveItems.length /
        postsPerPage
      );


    function getRequestedPage() {

      const params =
        new URLSearchParams(
          window.location.search
        );

      const value =
        parseInt(
          params.get('page'),
          10
        );

      if (
        Number.isNaN(value) ||
        value < 1
      ) {
        return 1;
      }

      if (value > pageCount) {
        return pageCount;
      }

      return value;

    }


    function pageHref(pageNumber) {

      const url =
        new URL(
          window.location.href
        );

      if (pageNumber === 1) {

        url.searchParams.delete(
          'page'
        );

      } else {

        url.searchParams.set(
          'page',
          pageNumber
        );

      }

      return (
        url.pathname +
        url.search
      );

    }


    function addPageLink(
      container,
      pageNumber,
      currentPage
    ) {

      const link =
        document.createElement('a');

      link.href =
        pageHref(pageNumber);

      link.textContent =
        String(pageNumber);

      link.setAttribute(
        'aria-label',
        'Page ' + pageNumber
      );

      if (
        pageNumber === currentPage
      ) {

        link.classList.add(
          'is-current'
        );

        link.setAttribute(
          'aria-current',
          'page'
        );

      }

      link.addEventListener(
        'click',
        function (event) {

          event.preventDefault();

          showArchivePage(
            pageNumber,
            true
          );

        }
      );

      container.appendChild(link);

    }


    function addEllipsis(container) {

      const ellipsis =
        document.createElement('span');

      ellipsis.className =
        'pagination-ellipsis';

      ellipsis.textContent = '…';

      container.appendChild(
        ellipsis
      );

    }


    function renderPagination(
      currentPage
    ) {

      archivePagination.innerHTML = '';

      if (pageCount <= 1) {

        archivePagination.hidden = true;
        return;

      }

      archivePagination.hidden = false;


      /*
       * Flèche précédente
       */

      if (currentPage > 1) {

        const previous =
          document.createElement('a');

        previous.href =
          pageHref(
            currentPage - 1
          );

        previous.textContent = '←';

        previous.setAttribute(
          'aria-label',
          'Page précédente'
        );

        previous.addEventListener(
          'click',
          function (event) {

            event.preventDefault();

            showArchivePage(
              currentPage - 1,
              true
            );

          }
        );

        archivePagination.appendChild(
          previous
        );

      }


      /*
       * Numéros
       */

      if (pageCount <= 7) {

        for (
          let page = 1;
          page <= pageCount;
          page++
        ) {

          addPageLink(
            archivePagination,
            page,
            currentPage
          );

        }

      } else {

        addPageLink(
          archivePagination,
          1,
          currentPage
        );


        if (currentPage <= 3) {

          addPageLink(
            archivePagination,
            2,
            currentPage
          );

          addPageLink(
            archivePagination,
            3,
            currentPage
          );

          addEllipsis(
            archivePagination
          );

        } else if (
          currentPage >=
          pageCount - 2
        ) {

          addEllipsis(
            archivePagination
          );

          addPageLink(
            archivePagination,
            pageCount - 2,
            currentPage
          );

          addPageLink(
            archivePagination,
            pageCount - 1,
            currentPage
          );

        } else {

          addEllipsis(
            archivePagination
          );

          addPageLink(
            archivePagination,
            currentPage - 1,
            currentPage
          );

          addPageLink(
            archivePagination,
            currentPage,
            currentPage
          );

          addPageLink(
            archivePagination,
            currentPage + 1,
            currentPage
          );

          addEllipsis(
            archivePagination
          );

        }


        addPageLink(
          archivePagination,
          pageCount,
          currentPage
        );

      }


      /*
       * Flèche suivante
       */

      if (currentPage < pageCount) {

        const next =
          document.createElement('a');

        next.href =
          pageHref(
            currentPage + 1
          );

        next.textContent = '→';

        next.setAttribute(
          'aria-label',
          'Page suivante'
        );

        next.addEventListener(
          'click',
          function (event) {

            event.preventDefault();

            showArchivePage(
              currentPage + 1,
              true
            );

          }
        );

        archivePagination.appendChild(
          next
        );

      }

    }


    function showArchivePage(
      pageNumber,
      updateHistory
    ) {

      const safePage =
        Math.min(
          Math.max(
            pageNumber,
            1
          ),
          pageCount
        );

      const start =
        (safePage - 1) *
        postsPerPage;

      const end =
        start + postsPerPage;


      archiveItems.forEach(
        function (
          item,
          index
        ) {

          item.hidden =
            !(
              index >= start &&
              index < end
            );

        }
      );


      renderPagination(
        safePage
      );


      if (updateHistory) {

        history.pushState(
          {
            archivePage:
              safePage
          },
          '',
          pageHref(
            safePage
          )
        );

        if (archiveSection) {

          archiveSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

        }

      }

    }


    showArchivePage(
      getRequestedPage(),
      false
    );


    window.addEventListener(
      'popstate',
      function () {

        showArchivePage(
          getRequestedPage(),
          false
        );

      }
    );

  }


  /*
   * PAGE COMPLÈTE DE RECHERCHE
   */

  const f =
    document.querySelector(
      '#full-search-form'
    );

  const i =
    document.querySelector(
      '#full-search-input'
    );

  const r =
    document.querySelector(
      '#search-results-list'
    );

  const s =
    document.querySelector(
      '#search-summary'
    );

  const e =
    document.querySelector(
      '#search-empty'
    );

  const posts =
    window.DE_GUSTIBUS_POSTS || [];


  /*
   * Si nous ne sommes pas sur
   * la page de recherche,
   * le reste n'est pas nécessaire.
   */

  if (!f) return;


  const q =
    new URLSearchParams(
      location.search
    ).get('q') || '';

  i.value = q;


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


  function formatDate(value) {

    const dateOnly =
      String(value || '')
        .split('T')[0];

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


  function run() {

    const x =
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


    const matches =
      posts.filter(
        p =>
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
      matches.length +
      ' ' +
      (
        matches.length > 1
          ? 'articles trouvés.'
          : 'article trouvé.'
      );


    matches.forEach(
      p => {

        const article =
          document.createElement(
            'article'
          );

        article.className =
          'post-card search-card';


        article.innerHTML =
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


        r.appendChild(
          article
        );

      }
    );


    if (!matches.length) {
      e.hidden = false;
    }

  }


  f.onsubmit =
    function (event) {

      event.preventDefault();

      history.replaceState(
        {},
        '',
        i.value
          ? '?q=' +
            encodeURIComponent(
              i.value
            )
          : location.pathname
      );

      run();

    };


  run();

})();
