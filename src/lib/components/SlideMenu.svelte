<script>
  import { menuOpen, navigateTo } from '$lib/store.js';

  const menuGroups = [
    {
      label: 'Women',
      items: [
        { label: 'All', page: 'women', options: { navSection: 'women', womenMode: 'all' } },
        { label: 'Dresses', page: 'women', options: { navSection: 'women', womenMode: 'dresses', womenFilter: 'All' } }
      ]
    },
    {
      label: 'Men',
      items: [
        { label: 'All', page: 'men', options: { navSection: 'men', menFilter: 'All' } },
        { label: 'Tops', page: 'men', options: { navSection: 'men', menFilter: 'Tops' } },
        { label: 'Sets', page: 'men', options: { navSection: 'men', menFilter: 'Sets' } }
      ]
    },
    {
      label: 'Weddings & Events',
      items: [
        { label: 'Bridal', page: 'women', options: { navSection: 'weddings', womenMode: 'dresses', womenFilter: 'Bridal' } },
        { label: 'Groom', page: 'men', options: { navSection: 'weddings', menFilter: 'Sets' } },
        { label: 'Couples', page: 'couple-sets', options: { navSection: 'weddings' } },
        { label: 'Group Orders', page: 'weddings', options: { navSection: 'weddings' } }
      ]
    },
    {
      label: 'Matching & Custom',
      items: [
        { label: 'Couples Matching', page: 'couple-sets', options: { navSection: 'matching' } },
        { label: 'Group Matching', page: 'weddings', options: { navSection: 'matching' } },
        { label: 'Custom Design', page: 'custom', options: { navSection: 'matching' } }
      ]
    }
  ];

  let openSection = null;

  function go(page, options = {}) {
    navigateTo(page, options);
    menuOpen.set(false);
    openSection = null;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function closeMenu() {
    menuOpen.set(false);
    openSection = null;
  }

  function toggleSection(label) {
    openSection = openSection === label ? null : label;
  }
</script>

<div id="menu" class:open={$menuOpen}>
  <div id="menu-bd" on:click={closeMenu} role="presentation"></div>
  <div id="menu-panel">
    <div class="menu-hd">
      <div class="menu-wm">Mahi</div>
      <button class="menu-x" on:click={closeMenu}>X</button>
    </div>

    {#each menuGroups as group}
      <div class="menu-section">
        <button class="menu-link menu-accordion" class:open={openSection === group.label} on:click={() => toggleSection(group.label)}>
          {group.label}
          <svg class="acc-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="acc-body" class:open={openSection === group.label}>
          {#each group.items as item}
            <button class="menu-link-sub" on:click={() => go(item.page, item.options || {})}>{item.label}</button>
          {/each}
        </div>
      </div>
    {/each}

    <div class="menu-section">
      <button class="menu-link-sub" on:click={() => go('fit')}>Fit profile</button>
      <button class="menu-link-sub" on:click={() => go('account')}>My account</button>
      <button class="menu-link-sub" on:click={() => go('track')}>Track my order</button>
      <button class="menu-link-sub" on:click={() => go('about')}>About Mahi</button>
      <button class="menu-link-sub" on:click={() => go('contact')}>Contact</button>
    </div>

    <div class="menu-foot">
      <p>Made in Ethiopia<br>Made for You.<br>(c) 2025 Mahi</p>
    </div>
  </div>
</div>

<style>
  #menu{position:fixed;inset:0;z-index:200;pointer-events:none;}
  #menu-bd{position:absolute;inset:0;background:rgba(0,0,0,0);transition:background .3s;cursor:pointer;}
  #menu-panel{position:absolute;top:0;left:0;bottom:0;width:min(320px,85vw);background:#fff;transform:translateX(-100%);transition:transform .32s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;overflow-y:auto;border-right:1px solid var(--bdr);}
  #menu.open{pointer-events:all;}
  #menu.open #menu-bd{background:rgba(0,0,0,.5);}
  #menu.open #menu-panel{transform:translateX(0);}
  .menu-hd{display:flex;align-items:center;justify-content:space-between;padding:16px;border-bottom:1px solid var(--bdr);}
  .menu-wm{font-family:'Playfair Display',Georgia,serif;font-size:22px;color:var(--gold);font-weight:300;letter-spacing:.08em;}
  .menu-x{width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;}
  .menu-link{display:flex;width:100%;padding:14px 16px;text-align:left;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink);border-bottom:1px solid var(--bdr);cursor:pointer;transition:background .15s;background:none;font-family:var(--sans);font-weight:500;}
  .menu-link:hover{background:var(--soft);}
  .menu-link-sub{padding:11px 28px;font-size:12px;letter-spacing:.06em;text-transform:none;color:var(--body);border-bottom:1px solid var(--bdr);display:block;width:100%;text-align:left;cursor:pointer;background:none;font-family:var(--sans);}
  .menu-link-sub:hover{background:var(--soft);color:var(--ink);}
  .menu-accordion{display:flex;align-items:center;justify-content:space-between;}
  .acc-arr{flex-shrink:0;transition:transform .25s;color:var(--muted);}
  .menu-accordion.open .acc-arr{transform:rotate(180deg);}
  .acc-body{max-height:0;overflow:hidden;transition:max-height .3s cubic-bezier(.4,0,.2,1);background:var(--soft);}
  .acc-body.open{max-height:320px;}
  .acc-body .menu-link-sub{border-bottom:1px solid var(--bdr);padding:12px 32px;font-size:13px;color:var(--body);}
  .acc-body .menu-link-sub:hover{color:var(--ink);background:#f0ede8;}
  .menu-foot{padding:16px;margin-top:auto;border-top:1px solid var(--bdr);}
  .menu-foot p{font-size:11px;color:var(--muted);line-height:1.8;}
</style>
