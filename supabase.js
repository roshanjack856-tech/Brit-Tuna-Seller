/* ==========================================================
   supabase.js — Brit.Tuna Seller Portal Supabase Connection

   LOAD ORDER:

   1. Supabase CDN
   2. config.js
   3. supabase.js
   4. Other Seller Portal JavaScript

   IMPORTANT:
   Frontend must use ONLY the Supabase Publishable Key.
   NEVER use sb_secret_ or service_role here.
   ========================================================== */

(function () {

  'use strict';


  /* ========================================================
     CHECK SUPABASE JAVASCRIPT LIBRARY
  ======================================================== */

  if (!window.supabase) {

    console.error(
      'Brit.Tuna Seller: Supabase JavaScript library is not loaded.'
    );

    return;

  }


  /* ========================================================
     CHECK SELLER CONFIG
  ======================================================== */

  if (!window.BT_SELLER_CONFIG) {

    console.error(
      'Brit.Tuna Seller: BT_SELLER_CONFIG was not found. Check config.js.'
    );

    return;

  }


  /* ========================================================
     CHECK SUPABASE CONFIG
  ======================================================== */

  if (!window.BT_SELLER_CONFIG.supabase) {

    console.error(
      'Brit.Tuna Seller: Supabase configuration was not found.'
    );

    return;

  }


  /* ========================================================
     GET SUPABASE DETAILS
  ======================================================== */

  const supabaseUrl =
    window.BT_SELLER_CONFIG.supabase.url;


  const supabaseKey =
    window.BT_SELLER_CONFIG.supabase.publishableKey;


  /* ========================================================
     CHECK PROJECT URL
  ======================================================== */

  if (
    !supabaseUrl ||
    typeof supabaseUrl !== 'string' ||
    supabaseUrl.trim() === ''
  ) {

    console.error(
      'Brit.Tuna Seller: Supabase Project URL is missing.'
    );

    return;

  }


  if (
    !supabaseUrl.startsWith(
      'https://'
    )
  ) {

    console.error(
      'Brit.Tuna Seller: Supabase Project URL is invalid.'
    );

    return;

  }


  /* ========================================================
     CHECK PUBLISHABLE KEY
  ======================================================== */

  if (
    !supabaseKey ||
    typeof supabaseKey !== 'string' ||
    supabaseKey.trim() === ''
  ) {

    console.error(
      'Brit.Tuna Seller: Supabase Publishable Key is missing.'
    );

    return;

  }


  if (
    supabaseKey.includes(
      'YOUR_SUPABASE'
    ) ||
    supabaseKey.includes(
      'PASTE_YOUR'
    )
  ) {

    console.error(
      'Brit.Tuna Seller: Replace the Supabase key placeholder in config.js.'
    );

    return;

  }


  /* ========================================================
     SECURITY CHECK

     NEVER ALLOW SECRET KEY IN BROWSER
  ======================================================== */

  if (
    supabaseKey.startsWith(
      'sb_secret_'
    )
  ) {

    console.error(
      'SECURITY ERROR: Never use a Supabase secret key in frontend code.'
    );

    return;

  }


  /* ========================================================
     EXTRA SERVICE ROLE PROTECTION
  ======================================================== */

  if (
    supabaseKey.toLowerCase().includes(
      'service_role'
    )
  ) {

    console.error(
      'SECURITY ERROR: Never use the Supabase service_role key in frontend code.'
    );

    return;

  }


  /* ========================================================
     CREATE SUPABASE CLIENT
  ======================================================== */

  try {

    window.supabaseClient =
      window.supabase.createClient(
        supabaseUrl,
        supabaseKey
      );


    console.log(
      'Brit.Tuna Seller: Supabase connected successfully.'
    );

  }

  catch (error) {

    console.error(
      'Brit.Tuna Seller: Failed to create Supabase client:',
      error
    );

  }


})();