/* ==========================================================
   config.js — Brit.Tuna Seller Portal Configuration

   IMPORTANT:
   - Use ONLY the Supabase Publishable Key.
   - NEVER put secret/service_role keys here.
   ========================================================== */

window.BT_SELLER_CONFIG = {

  /* --------------------------------------------------------
     BRAND
  --------------------------------------------------------- */

  brandName: 'Brit.Tuna',

  portalName: 'Seller Portal',


  /* --------------------------------------------------------
     CURRENCY
  --------------------------------------------------------- */

  currency: 'INR',

  currencySymbol: '₹',

  locale: 'en-IN',


  /* --------------------------------------------------------
     SUPABASE
  --------------------------------------------------------- */

  supabase: {

    url: 'YOUR_SUPABASE_PROJECT_URL',

    publishableKey: 'YOUR_SUPABASE_PUBLISHABLE_KEY'

  }

};


/* ==========================================================
   SELLER PORTAL HELPERS
========================================================== */

window.BTSellerUtil = (function () {

  'use strict';


  var cfg =
    window.BT_SELLER_CONFIG;


  /* --------------------------------------------------------
     FORMAT INR
  --------------------------------------------------------- */

  function formatINR(value) {

    var number =
      Number(value) || 0;


    try {

      return new Intl.NumberFormat(
        cfg.locale,
        {
          style: 'currency',
          currency: cfg.currency
        }
      ).format(number);

    }

    catch (error) {

      return (
        cfg.currencySymbol +
        number.toFixed(2)
      );

    }

  }


  /* --------------------------------------------------------
     ESCAPE HTML
  --------------------------------------------------------- */

  function escapeHtml(value) {

    return String(
      value == null ? '' : value
    )

      .replace(/&/g, '&amp;')

      .replace(/</g, '&lt;')

      .replace(/>/g, '&gt;')

      .replace(/"/g, '&quot;')

      .replace(/'/g, '&#39;');

  }


  /* --------------------------------------------------------
     DIGITS ONLY
  --------------------------------------------------------- */

  function digits(value) {

    return String(
      value || ''
    ).replace(
      /\D/g,
      ''
    );

  }


  /* --------------------------------------------------------
     URL PARAMETER
  --------------------------------------------------------- */

  function getParam(name) {

    return new URLSearchParams(
      window.location.search
    ).get(name);

  }


  /* --------------------------------------------------------
     RETURN
  --------------------------------------------------------- */

  return {

    formatINR:
      formatINR,

    escapeHtml:
      escapeHtml,

    digits:
      digits,

    getParam:
      getParam

  };


})();