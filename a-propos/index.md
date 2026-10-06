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


  /* TITRE */

  .about-header {
    margin-bottom: 58px;
    text-align: center;
  }

  .about-header .eyebrow {
    margin-bottom: 18px;
  }

  .about-header h1 {
    margin: 0;
  }


  /* ENSEMBLE IMAGE */

  .about-visual {
    width: 100%;
    margin: 0 auto 54px;
  }


  /*
   * IMAGE
   *
   * Le fichier original contient un cadre blanc.
   * On zoome légèrement pour le faire disparaître.
   */

  .about-image {
    position: relative;

    width: 100%;
    aspect-ratio: 1.53 / 1;

    overflow: hidden;

    background: var(--paper);

    -webkit-tap-highlight-color: transparent;

    user-select: none;
    -webkit-user-select: none;


    /*
     * Léger fondu sur les côtés.
     */

    -webkit-mask-image:
      linear-gradient(
        to right,
        transparent 0,
        black 3%,
        black 97%,
        transparent 100%
      );

    mask-image:
      linear-gradient(
        to right,
        transparent 0,
        black 3%,
        black 97%,
        transparent 100%
      );
  }


  /*
   * Léger fondu vertical.
   */

  .about-image::after {
    content: "";

    position: absolute;
    inset: 0;

    z-index: 2;

    pointer-events: none;

    background:
      linear-gradient(
        to bottom,
        var(--paper) 0,
        transparent 4%,
        transparent 96%,
        var(--paper) 100%
      );

    opacity: .32;
  }


  .about-image img {
    display: block;

    width: 114%;
    height: 114%;

    max-width: none;

    margin-left: -7%;
    margin-top: -7%;

    object-fit: cover;
    object-position: center;

    pointer-events: none;
  }


  /*
   * VOILE DISCRET POUR LA LÉGENDE
   */

  .about-image-overlay {
    position: absolute;
    inset: 0;

    z-index: 1;

    background:
      linear-gradient(
        to top,
        rgba(0, 0, 0, .24),
        rgba(0, 0, 0, 0) 42%
      );

    opacity: 0;

    transition: opacity .25s ease;

    pointer-events: none;
  }


  /*
   * LÉGENDE
   */

  .about-image-caption {
    position: absolute;

    left: 30px;
    bottom: 26px;

    z-index: 3;

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
      0 1px 8px rgba(0, 0, 0, .28);
  }


  /*
   * SURVOL SOURIS
   */

  @media (hover: hover) and (pointer: fine) {

    .about-image:hover
    .about-image-caption {
      opacity: 1;
      transform: translateY(0);
    }

    .about-image:hover
    .about-image-overlay {
      opacity: 1;
    }

  }


  /*
   * MOBILE : ÉTAT RÉVÉLÉ
   */

  .about-image.is-revealed
  .about-image-caption {
    opacity: 1;
    transform: translateY(0);
  }

  .about-image.is-revealed
  .about-image-overlay {
    opacity: 1;
  }


  /*
   * TEXTE DE PRÉSENTATION
   *
   * Le bloc lui-même est centré
   * sous l'image.
   *
   * Le texte à l'intérieur est justifié.
   */

  .about-text {
    max-width: 760px;

    margin: 0 auto;

    font-family: "EB Garamond", serif;
    font-size: 22px;
    font-weight: 400;
    line-height: 1.65;

    color: var(--ink);

    text-align: justify;
    text-justify: inter-word;

    hyphens: auto;
    -webkit-hyphens: auto;
  }


  .about-text p {
    margin: 0 0 30px;
  }


  .about-text p:last-child {
    margin-bottom: 0;
  }


  /*
   * "Bonne visite." reste indépendante
   * et centrée pour fermer la page
   * de façon plus élégante.
   */

  .about-text .about-goodbye {
    text-align: center;
    margin-top: 38px;
  }


  /* MOBILE */

  @media (max-width: 760px) {

    .about-page {
      padding: 64px 24px 90px;
    }


    .about-header {
      margin-bottom: 42px;
    }


    .about-visual {
      margin-bottom: 46px;
    }


    .about-image {
      aspect-ratio: 1.36 / 1;
    }


    .about-image img {
      width: 118%;
      height: 118%;

      margin-left: -9%;
      margin-top: -9%;
    }


    .about-image-caption {
      left: 20px;
      bottom: 18px;

      font-size: 17px;
    }


    .about-text {
      max-width: 620px;

      font-size: 21px;
      line-height: 1.62;
    }

  }

</style>


<section class="about-page">

  <header class="about-header">

    <p class="eyebrow">
      À propos
    </p>

    <h1>
      Pour ceux que ça intéressera.
    </h1>

  </header>


  <figure class="about-visual">

    <div
      class="about-image"
      id="about-image">

      <img
        src="{{ '/assets/images/a-propos.jpg' | relative_url }}"
        alt="Photographie de Jean Baudrillard, Saint-Clément, 1987">

      <div class="about-image-overlay"></div>

      <figcaption class="about-image-caption">
        jean baudrillard, saint clément . 1987
      </figcaption>

    </div>

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

    <p class="about-goodbye">
      Bonne visite.
    </p>

  </div>

</section>


<script>

(function () {

  const aboutImage =
    document.querySelector(
      '#about-image'
    );


  if (!aboutImage) {
    return;
  }


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
   * TOUCHER L'IMAGE
   *
   * La légende apparaît immédiatement.
   */

  aboutImage.addEventListener(
    'touchstart',
    function (event) {

      if (!isMobile()) {
        return;
      }


      const touch =
        event.touches[0];


      if (!touch) {
        return;
      }


      startX =
        touch.clientX;

      startY =
        touch.clientY;


      touchMoved = false;


      aboutImage.classList.add(
        'is-revealed'
      );

    },
    {
      passive: true
    }
  );


  /*
   * LE SCROLL NE MASQUE PAS
   * LA LÉGENDE
   */

  aboutImage.addEventListener(
    'touchmove',
    function (event) {

      if (!isMobile()) {
        return;
      }


      const touch =
        event.touches[0];


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


  /*
   * ON CONSERVE LA LÉGENDE
   * APRÈS LE RELÂCHEMENT
   */

  aboutImage.addEventListener(
    'touchend',
    function () {

      if (!isMobile()) {
        return;
      }

    },
    {
      passive: true
    }
  );


  /*
   * TOUCHER AILLEURS :
   * LA LÉGENDE DISPARAÎT
   */

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


  /*
   * PAS DE MENU CONTEXTUEL
   * SUR APPUI LONG
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
