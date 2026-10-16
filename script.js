/* ==========================================================
   BRIT.TUNA SELLER PORTAL
   script.js

   COMMON FUNCTIONS:
   - Header
   - Footer
   - Mobile menu
   - Supabase session
   - Profile / role
   - Seller access check
   - Admin + Seller dual access
   - Logout
========================================================== */

(function () {

  'use strict';


  /* ========================================================
     STATE
  ======================================================== */

  var currentUser = null;
  var currentProfile = null;


  /* ========================================================
     PAGE NAME
  ======================================================== */

  function getCurrentPage() {

    var path = window.location.pathname;

    var page = path
      .split('/')
      .pop();

    if (!page || page === '') {
      return 'index.html';
    }

    return page;
  }


  /* ========================================================
     ACTIVE LINK
  ======================================================== */

  function activeClass(fileName) {

    return getCurrentPage() === fileName
      ? 'active'
      : '';
  }


  /* ========================================================
     SELLER ACCESS ROLE CHECK

     seller = Seller Portal access
     admin  = Seller Portal + Admin Portal access
     customer = No Seller Portal protected access
  ======================================================== */

  function hasSellerAccess(profile) {

    if (!profile) {
      return false;
    }

    return (
      profile.role === 'seller' ||
      profile.role === 'admin'
    );
  }


  /* ========================================================
     ADMIN CHECK
  ======================================================== */

  function isAdmin(profile) {

    return !!(
      profile &&
      profile.role === 'admin'
    );
  }


  /* ========================================================
     HEADER
  ======================================================== */

  function createHeader() {

    var target =
      document.getElementById(
        'site-header'
      );

    if (!target) {
      return;
    }

    target.innerHTML = `

      <header class="seller-header">

        <div class="container seller-header-inner">

          <a
            href="index.html"
            class="seller-logo"
            aria-label="Brit.Tuna Seller Portal"
          >

            <span class="seller-logo-mark">
              B
            </span>

            <span class="seller-logo-text">

              Brit.Tuna

              <small>
                Seller Portal
              </small>

            </span>

          </a>


          <nav
            class="seller-nav"
            aria-label="Seller navigation"
          >

            <a
              href="seller-dashboard.html"
              class="${activeClass(
                'seller-dashboard.html'
              )}"
            >
              Dashboard
            </a>

            <a
              href="products.html"
              class="${activeClass(
                'products.html'
              )}"
            >
              Products
            </a>

            <a
              href="add-product.html"
              class="${activeClass(
                'add-product.html'
              )}"
            >
              Add Product
            </a>

            <a
              href="orders.html"
              class="${activeClass(
                'orders.html'
              )}"
            >
              Orders
            </a>

          </nav>


          <div class="header-actions">

            <span
              id="header-user-name"
              class="muted"
              hidden
            ></span>

            <a
              href="index.html"
              class="btn btn-outline"
              id="header-login-link"
            >
              Sign in
            </a>

            <button
              type="button"
              class="btn btn-outline"
              id="header-logout-button"
              hidden
            >
              Sign out
            </button>

          </div>


          <button
            type="button"
            class="mobile-menu-button"
            id="mobile-menu-button"
            aria-label="Open menu"
            aria-controls="mobile-drawer"
            aria-expanded="false"
          >
            ☰
          </button>

        </div>

      </header>


      <div
        class="mobile-backdrop"
        id="mobile-backdrop"
      ></div>


      <aside
        class="mobile-drawer"
        id="mobile-drawer"
        aria-label="Mobile seller navigation"
        aria-hidden="true"
      >

        <div class="mobile-drawer-header">

          <div class="seller-logo">

            <span class="seller-logo-mark">
              B
            </span>

            <span class="seller-logo-text">

              Brit.Tuna

              <small>
                Seller Portal
              </small>

            </span>

          </div>


          <button
            type="button"
            class="mobile-close"
            id="mobile-close"
            aria-label="Close menu"
          >
            ×
          </button>

        </div>


        <nav class="mobile-nav">

          <a
            href="seller-dashboard.html"
            class="${activeClass(
              'seller-dashboard.html'
            )}"
          >
            Dashboard
          </a>

          <a
            href="products.html"
            class="${activeClass(
              'products.html'
            )}"
          >
            Products
          </a>

          <a
            href="add-product.html"
            class="${activeClass(
              'add-product.html'
            )}"
          >
            Add Product
          </a>

          <a
            href="orders.html"
            class="${activeClass(
              'orders.html'
            )}"
          >
            Orders
          </a>

          <a
            href="seller-register.html"
            class="${activeClass(
              'seller-register.html'
            )}"
          >
            Seller Application
          </a>

        </nav>


        <div class="mt-2">

          <p
            id="mobile-user-name"
            class="muted"
            hidden
          ></p>

          <a
            href="index.html"
            class="btn btn-primary btn-block"
            id="mobile-login-link"
          >
            Sign in
          </a>

          <button
            type="button"
            class="btn btn-outline btn-block mt-1"
            id="mobile-logout-button"
            hidden
          >
            Sign out
          </button>

        </div>

      </aside>

    `;

    setupMobileMenu();
    setupLogoutButtons();
  }


  /* ========================================================
     FOOTER
  ======================================================== */

  function createFooter() {

    var target =
      document.getElementById(
        'site-footer'
      );

    if (!target) {
      return;
    }

    var year =
      new Date().getFullYear();

    target.innerHTML = `

      <footer class="seller-footer">

        <div class="container seller-footer-inner">

          <div>
            © ${year} Brit.Tuna Seller Portal
          </div>

          <div>
            Marketplace seller management
          </div>

        </div>

      </footer>

    `;
  }


  /* ========================================================
     MOBILE MENU
  ======================================================== */

  function setupMobileMenu() {

    var openButton =
      document.getElementById(
        'mobile-menu-button'
      );

    var closeButton =
      document.getElementById(
        'mobile-close'
      );

    var drawer =
      document.getElementById(
        'mobile-drawer'
      );

    var backdrop =
      document.getElementById(
        'mobile-backdrop'
      );

    if (
      !openButton ||
      !closeButton ||
      !drawer ||
      !backdrop
    ) {
      return;
    }


    function openMenu() {

      drawer.classList.add(
        'open'
      );

      backdrop.classList.add(
        'open'
      );

      document.body.classList.add(
        'menu-open'
      );

      openButton.setAttribute(
        'aria-expanded',
        'true'
      );

      drawer.setAttribute(
        'aria-hidden',
        'false'
      );

      closeButton.focus();
    }


    function closeMenu() {

      drawer.classList.remove(
        'open'
      );

      backdrop.classList.remove(
        'open'
      );

      document.body.classList.remove(
        'menu-open'
      );

      openButton.setAttribute(
        'aria-expanded',
        'false'
      );

      drawer.setAttribute(
        'aria-hidden',
        'true'
      );
    }


    openButton.addEventListener(
      'click',
      openMenu
    );

    closeButton.addEventListener(
      'click',
      closeMenu
    );

    backdrop.addEventListener(
      'click',
      closeMenu
    );


    drawer
      .querySelectorAll('a')
      .forEach(
        function (link) {

          link.addEventListener(
            'click',
            closeMenu
          );
        }
      );


    document.addEventListener(
      'keydown',
      function (event) {

        if (event.key === 'Escape') {
          closeMenu();
        }
      }
    );
  }


  /* ========================================================
     UPDATE AUTH UI
  ======================================================== */

  function updateAuthUI(
    user,
    profile
  ) {

    var headerName =
      document.getElementById(
        'header-user-name'
      );

    var mobileName =
      document.getElementById(
        'mobile-user-name'
      );

    var headerLogin =
      document.getElementById(
        'header-login-link'
      );

    var mobileLogin =
      document.getElementById(
        'mobile-login-link'
      );

    var headerLogout =
      document.getElementById(
        'header-logout-button'
      );

    var mobileLogout =
      document.getElementById(
        'mobile-logout-button'
      );


    if (!user) {

      if (headerName) {
        headerName.hidden = true;
        headerName.textContent = '';
      }

      if (mobileName) {
        mobileName.hidden = true;
        mobileName.textContent = '';
      }

      if (headerLogin) {
        headerLogin.hidden = false;
      }

      if (mobileLogin) {
        mobileLogin.hidden = false;
      }

      if (headerLogout) {
        headerLogout.hidden = true;
      }

      if (mobileLogout) {
        mobileLogout.hidden = true;
      }

      return;
    }


    var metadata =
      user.user_metadata || {};


    var name =
      (
        profile &&
        profile.full_name
      )
      ||
      metadata.full_name
      ||
      metadata.name
      ||
      user.email
      ||
      'Seller';


    /*
     * Show Admin badge text when the account
     * has the Admin role but is using Seller Portal.
     */

    var displayName =
      isAdmin(profile)
        ? name + ' (Admin)'
        : name;


    if (headerName) {

      headerName.textContent =
        displayName;

      headerName.hidden =
        false;
    }


    if (mobileName) {

      mobileName.textContent =
        'Signed in as ' +
        displayName;

      mobileName.hidden =
        false;
    }


    if (headerLogin) {
      headerLogin.hidden = true;
    }

    if (mobileLogin) {
      mobileLogin.hidden = true;
    }

    if (headerLogout) {
      headerLogout.hidden = false;
    }

    if (mobileLogout) {
      mobileLogout.hidden = false;
    }
  }


  /* ========================================================
     GET PROFILE
  ======================================================== */

  async function getProfile(
    userId
  ) {

    if (
      !window.supabaseClient ||
      !userId
    ) {
      return null;
    }


    try {

      var result =
        await window.supabaseClient

          .from('profiles')

          .select(
            'id, full_name, phone, role'
          )

          .eq(
            'id',
            userId
          )

          .maybeSingle();


      if (result.error) {

        console.error(
          'Brit.Tuna Seller: Profile load error:',
          result.error
        );

        return null;
      }


      return result.data || null;

    }

    catch (error) {

      console.error(
        'Brit.Tuna Seller: Unexpected profile error:',
        error
      );

      return null;
    }
  }


  /* ========================================================
     LOAD SESSION
  ======================================================== */

  async function loadSession() {

    if (!window.supabaseClient) {

      console.error(
        'Brit.Tuna Seller: Supabase client is not available.'
      );

      return {
        user: null,
        profile: null
      };
    }


    try {

      var result =
        await window.supabaseClient
          .auth
          .getSession();


      if (result.error) {

        console.error(
          'Brit.Tuna Seller: Session error:',
          result.error
        );

        return {
          user: null,
          profile: null
        };
      }


      var session =
        result.data
          ? result.data.session
          : null;


      if (
        !session ||
        !session.user
      ) {

        currentUser = null;
        currentProfile = null;

        updateAuthUI(
          null,
          null
        );

        return {
          user: null,
          profile: null
        };
      }


      currentUser =
        session.user;


      currentProfile =
        await getProfile(
          currentUser.id
        );


      updateAuthUI(
        currentUser,
        currentProfile
      );


      return {
        user: currentUser,
        profile: currentProfile
      };

    }

    catch (error) {

      console.error(
        'Brit.Tuna Seller: Unexpected session error:',
        error
      );

      currentUser = null;
      currentProfile = null;

      updateAuthUI(
        null,
        null
      );

      return {
        user: null,
        profile: null
      };
    }
  }


  /* ========================================================
     REQUIRE LOGIN
  ======================================================== */

  async function requireLogin() {

    var auth =
      await loadSession();


    if (!auth.user) {

      var destination =
        getCurrentPage();


      try {

        sessionStorage.setItem(
          'britTunaSellerReturnTo',
          destination
        );

      }

      catch (error) {

        console.warn(
          'Brit.Tuna Seller: Could not save return page.'
        );
      }


      window.location.href =
        'index.html';


      return null;
    }


    return auth;
  }


  /* ========================================================
     REQUIRE SELLER

     ALLOWED:
     - seller
     - admin

     NOT ALLOWED:
     - customer
     - missing profile

     IMPORTANT:
     Admin keeps role = admin.
     We DO NOT change Admin to seller.
  ======================================================== */

  async function requireSeller() {

    var auth =
      await requireLogin();


    if (!auth) {
      return null;
    }


    if (
      !auth.profile ||
      !hasSellerAccess(
        auth.profile
      )
    ) {

      window.location.href =
        'seller-register.html';

      return null;
    }


    return auth;
  }


  /* ========================================================
     LOGOUT
  ======================================================== */

  async function logout() {

    if (!window.supabaseClient) {
      return;
    }


    var buttons = [

      document.getElementById(
        'header-logout-button'
      ),

      document.getElementById(
        'mobile-logout-button'
      )

    ];


    buttons.forEach(
      function (button) {

        if (button) {
          button.disabled = true;
        }
      }
    );


    try {

      var result =
        await window.supabaseClient
          .auth
          .signOut();


      if (result.error) {

        console.error(
          'Brit.Tuna Seller: Sign out error:',
          result.error
        );


        buttons.forEach(
          function (button) {

            if (button) {
              button.disabled = false;
            }
          }
        );


        return;
      }


      currentUser = null;
      currentProfile = null;


      try {

        sessionStorage.removeItem(
          'britTunaSellerReturnTo'
        );

      } catch (error) {
        // Ignore storage error.
      }


      window.location.href =
        'index.html';

    }

    catch (error) {

      console.error(
        'Brit.Tuna Seller: Unexpected sign out error:',
        error
      );


      buttons.forEach(
        function (button) {

          if (button) {
            button.disabled = false;
          }
        }
      );
    }
  }


  /* ========================================================
     LOGOUT BUTTON EVENTS
  ======================================================== */

  function setupLogoutButtons() {

    var headerButton =
      document.getElementById(
        'header-logout-button'
      );


    var mobileButton =
      document.getElementById(
        'mobile-logout-button'
      );


    if (headerButton) {

      headerButton.addEventListener(
        'click',
        logout
      );
    }


    if (mobileButton) {

      mobileButton.addEventListener(
        'click',
        logout
      );
    }
  }


  /* ========================================================
     AUTH STATE CHANGES
  ======================================================== */

  function setupAuthListener() {

    if (!window.supabaseClient) {
      return;
    }


    window.supabaseClient
      .auth
      .onAuthStateChange(

        function (
          event,
          session
        ) {

          if (
            event ===
            'SIGNED_OUT'
          ) {

            currentUser = null;
            currentProfile = null;

            updateAuthUI(
              null,
              null
            );
          }


          if (
            event === 'SIGNED_IN' &&
            session &&
            session.user
          ) {

            setTimeout(
              function () {

                loadSession();

              },
              0
            );
          }
        }
      );
  }


  /* ========================================================
     INITIALISE COMMON UI
  ======================================================== */

  async function initialise() {

    createHeader();

    createFooter();

    setupAuthListener();

    await loadSession();


    console.log(
      'Brit.Tuna Seller: Common UI ready.'
    );
  }


  /* ========================================================
     PUBLIC API
  ======================================================== */

  window.BTSeller = {

    loadSession:
      loadSession,

    requireLogin:
      requireLogin,

    requireSeller:
      requireSeller,

    getProfile:
      getProfile,

    logout:
      logout,

    hasSellerAccess:
      hasSellerAccess,

    isAdmin:
      function () {

        return isAdmin(
          currentProfile
        );
      },

    getCurrentUser:
      function () {

        return currentUser;
      },

    getCurrentProfile:
      function () {

        return currentProfile;
      }

  };


  /* ========================================================
     START
  ======================================================== */

  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      initialise
    );

  }

  else {

    initialise();
  }


})();
