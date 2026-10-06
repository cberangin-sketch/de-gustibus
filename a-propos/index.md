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


  /* EN-TÊTE */

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


  /* IMAGE */

  .about-visual {
    width: 100%;
    margin: 0 0 52px;
  }

  .about-image {
    position: relative;

    width: 100%;
    aspect-ratio: 1.50 / 1;

    overflow: hidden;

    background: var(--paper);

    -webkit-tap-highlight-color: transparent;

    user-select: none;
    -webkit-user-select: none;
  }


  /*
   * Recadrage volontairement plus fort
   * pour supprimer complètement
   * les bordures blanches du fichier.
   */

  .about-image img {
    display: block;

    width: 126%;
    height: 126%;

    max-width: none;

    margin-left: -13%;
    margin-top: -13%;

    object-fit: cover;
    object-position: center;

    pointer-events: none;
  }


  /* LÉGENDE */

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


  /*
   * Léger assombrissement uniquement
   * derrière la légende.
   * Ce n'est PAS un fondu des bords.
   */

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


  /* SURVOL SOURIS */

  @media (hover: hover) and (pointer: fine) {

    .about-image:hover
    .about-image-caption {
      opacity: 1;
      transform: translateY(0);
    }

    .about-image:hover
    .about-caption-background {
      opacity: 1;
    }

  }


  /* MOBILE */

  .about-image.is-revealed
  .about-image-caption {
    opacity: 1;
    transform: translateY(0);
  }

  .about-image.is-revealed
  .about-caption-background {
    opacity: 1;
  }


  /* TEXTE DE PRÉSENTATION */

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

    hyphens: auto;
    -webkit-hyphens: auto;
  }

  .about-text p {
    margin: 0 0 30px;
  }

  .about-text p:last-child {
    margin-bottom: 0;
  }


  /* MOBILE */

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

    .about-image {
      aspect-ratio: 1.34 / 1;
    }

    /*
     * Recadrage encore légèrement
     * plus fort sur petit écran.
     */

    .about-image img {
      width: 132%;
      height: 132%;

      margin-left: -16%;
      margin-top: -16%;
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

      <div class="about-caption-background"></div>

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

    <p>
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
   * TOUCHER L'IMAGE :
   * la légende apparaît.
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
   * Un déplacement du doigt
   * ne masque pas la légende.
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
   * Toucher ailleurs :
   * la légende disparaît.
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
   * Pas de menu contextuel
   * lors d'un appui long.
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
