---
layout: default
title: À propos
permalink: /a-propos/
image: /assets/images/a-propos.jpg
social_image: /assets/images/a-propos.jpg
chapeau: "Ici je parle un peu d'art"
social_description: "Ici je parle un peu d'art"
---

<style>

  .about-page {
    max-width: 1120px;
    margin: 0 auto;
    padding: 90px 34px 120px;
  }

  .about-header {
    margin-bottom: 52px;
    text-align: left;
  }

  .about-header .eyebrow {
    margin-bottom: 18px;
  }

  .about-header h1 {
    margin: 0;
    text-align: left;
  }

  .about-visual {
    width: 100%;
    margin: 0 0 52px;
  }

  .about-image {
    position: relative;
    width: 100%;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
  }

  .about-image img {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    pointer-events: none;
  }

  .about-image-caption {
    position: absolute;
    left: 28px;
    bottom: 24px;
    z-index: 2;
    margin: 0;
    color: #fff;
    font-family: "EB Garamond", serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.35;
    text-transform: none;
    letter-spacing: 0;
    opacity: 0;
    transform: translateY(3px);
    transition:
      opacity .25s ease,
      transform .25s ease;
    pointer-events: none;
    text-shadow:
      0 1px 8px rgba(0, 0, 0, .38);
  }

  .about-caption-background {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 34%;
    z-index: 1;
    background:
      linear-gradient(
        to top,
        rgba(0, 0, 0, .28),
        rgba(0, 0, 0, 0)
      );
    opacity: 0;
    transition: opacity .25s ease;
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {

    .about-image:hover .about-image-caption {
      opacity: 1;
      transform: translateY(0);
    }

    .about-image:hover .about-caption-background {
      opacity: 1;
    }

  }

  .about-image.is-revealed .about-image-caption {
    opacity: 1;
    transform: translateY(0);
  }

  .about-image.is-revealed .about-caption-background {
    opacity: 1;
  }


  /*
   * TEXTE
   */

  .about-text {
    max-width: 760px;
    margin: 0;
    font-family: "EB Garamond", serif;
    font-size: 22px;
    font-weight: 400;
    line-height: 1.65;
    color: var(--ink);
    text-align: justify;
    text-justify: inter-word;
    hyphens: none;
    -webkit-hyphens: none;
    -ms-hyphens: none;
    word-break: normal;
    overflow-wrap: normal;
  }

  .about-text p {
    margin: 0 0 30px;
  }

  .about-text p:last-child {
    margin-bottom: 0;
  }


  /*
   * PARTAGE
   */

  .about-share {
    max-width: 760px;
    margin: 52px 0 0;
    padding-top: 22px;
    border-top: 1px solid var(--line);
    display: flex;
    align-items: center;
    gap: 22px;
  }

  .about-share__label {
    margin: 0;
    flex: 0 0 auto;
    font-family: "DM Sans", sans-serif;
    font-size: 10px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: .11em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .about-share__desktop {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .about-share__button {
    width: 28px;
    height: 28px;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--ink);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: .68;
    transition: opacity .2s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .about-share__button:hover {
    opacity: 1;
  }

  .about-share__button svg {
    display: block;
    width: 17px;
    height: 17px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .about-share__button--fill svg {
    fill: currentColor;
    stroke: none;
  }


  /*
   * PARTAGE NATIF MOBILE
   */

  .about-share__native {
    display: none;
    align-items: center;
    gap: 9px;
    padding: 8px 0;
    border: 0;
    background: transparent;
    color: var(--ink);
    font-family: "DM Sans", sans-serif;
    font-size: 11px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: .06em;
    text-transform: uppercase;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
  }

  .about-share__native svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .about-share__status {
    font-family: "EB Garamond", serif;
    font-size: 15px;
    color: var(--muted);
  }


  /*
   * MOBILE
   */

  @media (max-width: 760px) {

    .about-page {
      padding: 64px 24px 90px;
    }

    .about-header {
      margin-bottom: 40px;
    }

    .about-visual {
      margin-bottom: 42px;
    }

    .about-image-caption {
      left: 20px;
      bottom: 18px;
      font-size: 17px;
    }

    .about-text {
      max-width: none;
      font-size: 21px;
      line-height: 1.62;
    }

    .about-share {
      max-width: none;
      margin-top: 46px;
      padding-top: 22px;
      user-select: none;
      -webkit-user-select: none;
    }

    .about-share__label {
      display: none;
    }

    .about-share__desktop {
      display: none;
    }

    .about-share__native {
      display: inline-flex;
    }

  }

</style>


<section class="about-page">

  <header class="about-header">

    <p class="eyebrow">
      À propos
    </p>

    <h1>
      À propos, donc.
    </h1>

  </header>


  <figure class="about-visual">

    <div
      class="about-image"
      id="about-image">

      <img
        src="{{ '/assets/images/a-propos.jpg' | relative_url }}"
        alt="Photographie de Jean Baudrillard, Saint-Clément, 1987">

      <div class="about-caption-background"></div>

      <figcaption class="about-image-caption">
        jean baudrillard, saint clément . 1987
      </figcaption>

    </div>

  </figure>


  <div class="about-text">

    <p>
      Philosophaillon pas tout à fait repenti, lecteur, gamer, consommateur de biens culturels variés. J’ai la prétention de penser qu’un avis critique construit — surtout s’il est intuitif, non institutionnel et gratuit — est le meilleur hommage possible à rendre aux œuvres.
    </p>

    <p>
      Urgence, toujours, de se poser à la fois contre la culture légitime et contre son négatif : le relativisme culturel. Ce site est la contribution de son auteur à une forme de troisième voie.<br>
      C’est surtout un carnet de notes, volontiers arbitraire.
    </p>

    <p>
      Bonne visite.
    </p>

  </div>


  <!-- PARTAGE -->

  <div
    class="about-share"
    data-share-title="À propos">


    <p class="about-share__label">
      Partager
    </p>


    <!-- Version ordinateur -->

    <div class="about-share__desktop">


      <!-- Facebook -->

      <button
        class="about-share__button about-share__button--fill"
        type="button"
        data-about-share="facebook"
        aria-label="Partager sur Facebook">

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true">

          <path
            d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v8h4v-8h3.4l.6-4H13V9c0-.7.3-1 1-1z">
          </path>

        </svg>

      </button>


      <!-- X -->

      <button
        class="about-share__button about-share__button--fill"
        type="button"
        data-about-share="x"
        aria-label="Partager sur X">

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true">

          <path
            d="M18.7 3H22l-7.2 8.2L23.3 21h-6.6l-5.2-6.7L5.6 21H2.3l7.7-8.8L1.8 3h6.8l4.7 6.1L18.7 3zm-1.2 16h1.8L7.6 4.9H5.7L17.5 19z">
          </path>

        </svg>

      </button>


      <!-- WhatsApp -->

      <button
        class="about-share__button"
        type="button"
        data-about-share="whatsapp"
        aria-label="Partager sur WhatsApp">

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true">

          <path
            d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.4-5a8.4 8.4 0 1 1 16.1-3.8z">
          </path>

          <path
            d="M8.3 7.8c.3-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.9 2c.1.3.1.5-.1.7l-.7.8c-.2.2-.1.4 0 .6.5 1 1.3 1.8 2.3 2.3.2.1.4.2.6 0l.9-1.1c.2-.2.4-.2.7-.1l2 .9c.3.1.4.3.4.5 0 .3-.1 1.5-.8 2.1-.7.7-1.7 1-2.8.7-1.1-.3-2.8-1-4.5-2.5-1.4-1.3-2.4-2.8-2.7-3.9-.3-1.1 0-2.1.5-2.7l.5-.3z">
          </path>

        </svg>

      </button>


      <!-- Telegram -->

      <button
        class="about-share__button about-share__button--fill"
        type="button"
        data-about-share="telegram"
        aria-label="Partager sur Telegram">

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true">

          <path
            d="M21.5 3.5 18.2 20c-.2 1.1-.8 1.4-1.7.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L5.7 13.5.8 12c-1.1-.3-1.1-1.1.2-1.6L20 3.1c.9-.3 1.7.2 1.5.4z">
          </path>

        </svg>

      </button>


      <!-- E-mail -->

      <button
        class="about-share__button"
        type="button"
        data-about-share="email"
        aria-label="Partager par e-mail">

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true">

          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="1">
          </rect>

          <path
            d="m4 7 8 6 8-6">
          </path>

        </svg>

      </button>


      <!-- Copier -->

      <button
        class="about-share__button"
        type="button"
        data-about-share="copy"
        aria-label="Copier le lien">

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true">

          <rect
            x="9"
            y="9"
            width="11"
            height="11"
            rx="1">
          </rect>

          <path
            d="M15 9V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4">
          </path>

        </svg>

      </button>

    </div>


    <!-- Version smartphone -->

    <button
      class="about-share__native"
      type="button"
      id="about-native-share">

      <svg
        viewBox="0 0 24 24"
        aria-hidden="true">

        <path d="M12 16V3"></path>
        <path d="m7 8 5-5 5 5"></path>
        <path d="M5 12v8h14v-8"></path>

      </svg>

      <span>
        Partager
      </span>

    </button>


    <span
      class="about-share__status"
      id="about-share-status"
      aria-live="polite">
    </span>

  </div>

</section>


<script>

(function () {

  /*
   * TOUCH REVEAL DE LA PHOTO
   */

  const aboutImage =
    document.querySelector(
      '#about-image'
    );

  if (aboutImage) {

    function isMobile() {
      return window.matchMedia(
        '(max-width: 760px)'
      ).matches;
    }

    let touchMoved = false;
    let startX = 0;
    let startY = 0;
    const movementThreshold = 10;

    aboutImage.addEventListener(
      'touchstart',
      function (event) {

        if (!isMobile()) {
          return;
        }

        const touch = event.touches[0];

        if (!touch) {
          return;
        }

        startX = touch.clientX;
        startY = touch.clientY;
        touchMoved = false;

        aboutImage.classList.add(
          'is-revealed'
        );

      },
      {
        passive: true
      }
    );

    aboutImage.addEventListener(
      'touchmove',
      function (event) {

        if (!isMobile()) {
          return;
        }

        const touch = event.touches[0];

        if (!touch) {
          return;
        }

        const distanceX =
          Math.abs(
            touch.clientX -
            startX
          );

        const distanceY =
          Math.abs(
            touch.clientY -
            startY
          );

        if (
          distanceX > movementThreshold ||
          distanceY > movementThreshold
        ) {
          touchMoved = true;
        }

      },
      {
        passive: true
      }
    );

    document.addEventListener(
      'touchstart',
      function (event) {

        if (!isMobile()) {
          return;
        }

        if (
          !aboutImage.contains(
            event.target
          )
        ) {

          aboutImage.classList.remove(
            'is-revealed'
          );

          touchMoved = false;

        }

      },
      {
        passive: true
      }
    );

    aboutImage.addEventListener(
      'contextmenu',
      function (event) {

        if (isMobile()) {
          event.preventDefault();
        }

      }
    );

  }


  /*
   * PARTAGE
   */

  const shareBlock =
    document.querySelector(
      '.about-share'
    );

  if (!shareBlock) {
    return;
  }

  const pageTitle =
    shareBlock.dataset.shareTitle ||
    document.title;

  const pageUrl =
    window.location.href;


  function openShareWindow(url) {

    window.open(
      url,
      '_blank',
      'noopener,noreferrer,width=720,height=620'
    );

  }


  async function copyPageUrl() {

    const status =
      document.querySelector(
        '#about-share-status'
      );

    try {

      await navigator.clipboard.writeText(
        pageUrl
      );

    } catch (error) {

      const temporaryInput =
        document.createElement('textarea');

      temporaryInput.value =
        pageUrl;

      temporaryInput.setAttribute(
        'readonly',
        ''
      );

      temporaryInput.style.position =
        'fixed';

      temporaryInput.style.opacity =
        '0';

      document.body.appendChild(
        temporaryInput
      );

      temporaryInput.select();

      document.execCommand(
        'copy'
      );

      document.body.removeChild(
        temporaryInput
      );

    }


    if (status) {

      status.textContent =
        'Lien copié';

      window.setTimeout(
        function () {

          status.textContent = '';

        },
        1800
      );

    }

  }


  document.querySelectorAll(
    '[data-about-share]'
  ).forEach(function (button) {

    button.addEventListener(
      'click',
      async function () {

        const service =
          button.dataset.aboutShare;

        const encodedUrl =
          encodeURIComponent(pageUrl);

        const encodedTitle =
          encodeURIComponent(pageTitle);


        if (service === 'facebook') {

          openShareWindow(
            'https://www.facebook.com/sharer/sharer.php?u=' +
            encodedUrl
          );

        }


        if (service === 'x') {

          openShareWindow(
            'https://twitter.com/intent/tweet?text=' +
            encodedTitle +
            '&url=' +
            encodedUrl
          );

        }


        if (service === 'whatsapp') {

          window.location.href =
            'https://wa.me/?text=' +
            encodeURIComponent(
              pageTitle +
              ' ' +
              pageUrl
            );

        }


        if (service === 'telegram') {

          openShareWindow(
            'https://t.me/share/url?url=' +
            encodedUrl +
            '&text=' +
            encodedTitle
          );

        }


        if (service === 'email') {

          window.location.href =
            'mailto:?subject=' +
            encodedTitle +
            '&body=' +
            encodeURIComponent(
              pageTitle +
              '\n\n' +
              pageUrl
            );

        }


        if (service === 'copy') {

          await copyPageUrl();

        }

      }
    );

  });


  /*
   * PARTAGE NATIF SMARTPHONE
   *
   * URL uniquement :
   * aucun texte ajouté avant l'aperçu.
   */

  const nativeShare =
    document.querySelector(
      '#about-native-share'
    );

  if (nativeShare) {

    nativeShare.addEventListener(
      'click',
      async function () {

        if (navigator.share) {

          try {

            await navigator.share({
              url: pageUrl
            });

          } catch (error) {

            if (
              error.name !== 'AbortError'
            ) {

              await copyPageUrl();

            }

          }

        } else {

          await copyPageUrl();

        }

      }
    );

  }

})();

</script>
