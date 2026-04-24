<script>
  import { currentPage, navigateTo } from '$lib/store.js';
  import { BOT_MAP } from '$lib/store.js';

  function go(page) {
    navigateTo(page);
    window.scrollTo({top:0,behavior:'instant'});
  }

  $: activeBot = BOT_MAP[$currentPage] || 'home';
</script>

<nav id="bot-nav">
  <button class="bnav" class:on={activeBot==='home'} on:click={()=>go('home')} id="bn-home">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    Home
  </button>
  <button class="bnav" class:on={activeBot==='shop'} on:click={()=>go('women')} id="bn-women">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3L5 7v14h14V7l-4-4"/><path d="M9 3c0 2.2 1.3 4 3 4s3-1.8 3-4"/></svg>
    Shop
  </button>
  <button class="bnav" class:on={activeBot==='matching'} on:click={()=>go('matching')} id="bn-matching">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>
    Matching
  </button>
  <button class="bnav" class:on={activeBot==='account'} on:click={()=>go('account')} id="bn-account">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    Account
  </button>
</nav>

<style>
  #bot-nav{position:fixed;bottom:0;left:0;right:0;z-index:90;height:var(--bot);background:#fff;border-top:1px solid var(--bdr);display:grid;grid-template-columns:repeat(4,1fr);}
  @media(min-width:900px){#bot-nav{display:none;}}
  .bnav{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);cursor:pointer;border:none;background:none;transition:color .15s;}
  .bnav.on{color:var(--burg);}
  .bnav svg{width:18px;height:18px;}
</style>
