<script>
  import { activeNavSection, menuOpen, cartOpen, cart, saved, navigateTo } from '$lib/store.js';

  const navGroups = [
    {
      label: 'Women',
      section: 'women',
      items: [
        { label: 'All', page: 'women', options: { navSection: 'women', womenMode: 'all' } },
        { label: 'Dresses', page: 'women', options: { navSection: 'women', womenMode: 'dresses', womenFilter: 'All' } }
      ]
    },
    {
      label: 'Men',
      section: 'men',
      items: [
        { label: 'All', page: 'men', options: { navSection: 'men', menFilter: 'All' } },
        { label: 'Tops', page: 'men', options: { navSection: 'men', menFilter: 'Tops' } },
        { label: 'Sets', page: 'men', options: { navSection: 'men', menFilter: 'Sets' } }
      ]
    },
    {
      label: 'Weddings & Events',
      section: 'weddings',
      items: [
        { label: 'Bridal', page: 'women', options: { navSection: 'weddings', womenMode: 'dresses', womenFilter: 'Bridal' } },
        { label: 'Groom', page: 'men', options: { navSection: 'weddings', menFilter: 'Sets' } },
        { label: 'Couples', page: 'couple-sets', options: { navSection: 'weddings' } },
        { label: 'Group Orders', page: 'weddings', options: { navSection: 'weddings' } }
      ]
    },
    {
      label: 'Matching & Custom',
      section: 'matching',
      items: [
        { label: 'Couples Matching', page: 'couple-sets', options: { navSection: 'matching' } },
        { label: 'Group Matching', page: 'weddings', options: { navSection: 'matching' } },
        { label: 'Custom Design', page: 'custom', options: { navSection: 'matching' } }
      ]
    }
  ];

  $: cartCount = $cart.length;
  $: savedCount = $saved.size;

  function go(page, options = {}) {
    navigateTo(page, options);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function toggleMenu() {
    menuOpen.update((v) => !v);
  }
</script>

<nav id="top-nav">
  <div class="nav-left">
    <button class="hamburger" class:open={$menuOpen} on:click={toggleMenu} aria-label="Menu">
      <span class="hb"></span>
      <span class="hb"></span>
      <span class="hb"></span>
    </button>
    <div class="desk-nav">
      {#each navGroups as group}
        <div class="desk-group">
          <button class="dnav" class:on={$activeNavSection === group.section} on:click={() => go(group.items[0].page, group.items[0].options || {})}>
            {group.label}
          </button>
          <div class="desk-dropdown">
            {#each group.items as item}
              <button class="desk-sub" on:click={() => go(item.page, item.options || {})}>{item.label}</button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="wordmark" on:click={() => go('home')} role="button" tabindex="0" on:keypress={() => go('home')}>
    <div class="wm-name">Mahi</div>
    <div class="wm-tag">Made in Ethiopia. Made for You.</div>
  </div>

  <div class="nav-right">
    <button class="nav-icon" on:click={() => go('saved')} aria-label="Saved">
      {#if savedCount > 0}<span class="nav-dot saved-badge">{savedCount}</span>{/if}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    </button>
    <button class="nav-icon" on:click={() => cartOpen.set(true)} aria-label="Cart">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
      {#if cartCount > 0}<span class="nav-dot cart-badge">{cartCount}</span>{/if}
    </button>
  </div>
</nav>

<style>
  #top-nav{position:fixed;top:0;left:0;right:0;z-index:90;height:var(--nav);background:rgba(255,255,255,.97);border-bottom:1px solid var(--bdr);display:flex;align-items:center;justify-content:space-between;padding:0 16px;backdrop-filter:blur(8px);}
  .nav-left,.nav-right{display:flex;align-items:center;gap:4px;width:80px;}
  .nav-right{justify-content:flex-end;}
  .wordmark{text-align:center;flex:1;cursor:pointer;}
  .wm-name{font-family:'Playfair Display',Georgia,serif;font-size:26px;letter-spacing:.08em;color:var(--gold);font-weight:300;line-height:1;}
  .wm-tag{font-size:8px;letter-spacing:.28em;text-transform:uppercase;color:var(--muted);margin-top:2px;}
  .hamburger{display:flex;flex-direction:column;gap:5px;width:40px;height:40px;align-items:center;justify-content:center;}
  .hb{display:block;width:20px;height:1px;background:var(--ink);transition:all .25s;}
  .hamburger.open .hb:nth-child(1){transform:translateY(6px) rotate(45deg);}
  .hamburger.open .hb:nth-child(2){opacity:0;}
  .hamburger.open .hb:nth-child(3){transform:translateY(-6px) rotate(-45deg);}
  .nav-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;position:relative;color:var(--ink);cursor:pointer;}
  .nav-dot{position:absolute;top:6px;right:6px;width:14px;height:14px;border-radius:50%;background:var(--burg);color:#fff;font-size:8px;display:flex;align-items:center;justify-content:center;}
  .desk-nav{display:none;}
  .desk-group{position:relative;}
  .desk-dropdown{display:none;position:absolute;top:100%;left:0;min-width:220px;background:#fff;border:1px solid var(--bdr);padding:8px 0;box-shadow:0 18px 40px rgba(0,0,0,.08);}
  .desk-group:hover .desk-dropdown,.desk-group:focus-within .desk-dropdown{display:block;}
  .desk-sub{display:block;width:100%;padding:10px 16px;background:none;border:none;text-align:left;font-size:12px;color:var(--body);}
  .desk-sub:hover{background:var(--soft);color:var(--ink);}
  @media(min-width:900px){
    .desk-nav{display:flex;gap:2rem;align-items:center;}
    .hamburger{display:none;}
    .wordmark{text-align:left;}
    #top-nav{padding:0 3rem;}
    .nav-left{width:auto;gap:2rem;}
  }
  .dnav{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);transition:color .15s;cursor:pointer;background:none;border:none;font-family:var(--sans);}
  .dnav:hover,.dnav.on{color:var(--ink);}
</style>
