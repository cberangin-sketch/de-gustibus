---
layout: default
title: À propos
permalink: /a-propos/
---

<style>
  .about-page {
    max-width: 1120px;
    margin: 0 auto;
    padding: 90px 34px 120px;
  }

  .about-header {
    margin-bottom: 58px;
  }

  .about-header .eyebrow {
    margin-bottom: 18px;
  }

  .about-header h1 {
    margin: 0;
  }

  .about-image {
    position: relative;
    width: 100%;
    margin: 0 0 64px;
    overflow: hidden;
    cursor: default;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
  }

  .about-image img {
    display: block;
    width: 100%;
    height: auto;
  }

  .about-image-caption {
    position: absolute;
    inset: 0;

    display: flex;
    align-items: flex-end;

    padding: 28px;

    background:
      linear-gradient(
        to top,
        rgba(0, 0, 0, .56),
        rgba(0, 0, 0, 0) 55%
      );

    color: #fff;

    font-family: "DM Sans", sans-serif;
    font-size: 11px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: .075em;
    text-transform: uppercase;

    opacity: 0;
    transition: opacity .25s ease;

    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .about-image:hover .about-image-caption {
      opacity: 1;
    }
  }

  .about-image.is-revealed .about-image-caption {
    opacity: 1;
  }

  .about-text {
    max-width: 760px;
  }

  .about-text p {
    margin: 0 0 30px;
  }

  .about-text p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 760px) {
    .about-page {
      padding: 64px 34px 90px;
    }

    .about-header {
      margin-bottom: 42px;
    }

    .about-image {
      margin-bottom: 48px;
    }

    .about-image-caption {
      padding: 20px;
      font-size: 10px;
    }
  }
</style>


<section class="about-page">

  <header class="about-header">

    <p class="eyebrow">À propos</p>

    <h1>Pour ceux que ça intéressera.</h1>

  </header>


  <figure
    class="about-image"
    id="about-image">

    <img
      src="{{ '/assets/images/a-propos.jpg' | relative_url }}"
      alt="Photographie de Jean Baudrillard, Saint-Clément, 1987">

    <figcaption class="about-image-caption">
      jean baudrillard, saint clément . 1987
    </figcaption>

  </figure>


  <div class="about-text">

    <p>
      Philosophaillon pas tout à fait repenti, lecteur, gamer,
      consommateur de biens culturels variés. J’ai la prétention
      de penser qu’un avis critique construit — surtout s’il est
      intuitif, non institutionnel et gratuit — est le meilleur
      hommage possible à rendre aux œuvres.
    </p>

    <p>
      Urgence, toujours, de se poser à la fois contre la culture
      légitime et contre son négatif : le relativisme culturel.
      Ce site est la contribution de son auteur à une forme de
      troisième voie. C’est surtout un carnet de notes,
      volontiers arbitraire.
    </p>

    <p>
      Bonne visite.
    </p>

  </div>

</section>


<script>
(function () {

  const aboutImage =
    document.querySelector('#about-image');

  if (!aboutImage) return;


  function isMobile() {
    return window.matchMedia(
      '(max-width: 760px)'
    ).matches;
  }


  let touchMoved = false;
  let startX = 0;
  let startY = 0;

  const movementThreshold = 10;


  /*
   * MÊME LOGIQUE TACTILE
   * QUE "DERNIER ARTICLE"
   */

  aboutImage.addEventListener(
    'touchstart',
    function (event) {

      if (!isMobile()) return;

      const touch = event.touches[0];

      if (!touch) return;

      startX = touch.clientX;
      startY = touch.clientY;

      touchMoved = false;

      aboutImage.classList.add(
        'is-revealed'
      );

    },
    { passive: true }
  );


  aboutImage.addEventListener(
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


  aboutImage.addEventListener(
    'touchend',
    function () {

      if (!isMobile()) return;

      /*
       * On ne retire PAS la légende ici :
       * elle reste visible après le toucher
       * ou après un scroll commencé sur l'image.
       */

    },
    { passive: true }
  );


  aboutImage.addEventListener(
    'touchcancel',
    function () {

      if (!isMobile()) return;

      /*
       * Même principe :
       * on conserve l'état révélé.
       */

    },
    { passive: true }
  );


  /*
   * TOUCHER AILLEURS :
   * masque la légende.
   */

  document.addEventListener(
    'touchstart',
    function (event) {

      if (!isMobile()) return;

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
    { passive: true }
  );


  /*
   * EMPÊCHE LE MENU CONTEXTUEL
   * SUR APPUI LONG MOBILE.
   */

  aboutImage.addEventListener(
    'contextmenu',
    function (event) {

      if (isMobile()) {
        event.preventDefault();
      }

    }
  );

})();
</script>
