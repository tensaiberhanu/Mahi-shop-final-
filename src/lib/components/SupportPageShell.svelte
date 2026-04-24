<script>
  import { navigateTo } from '$lib/store.js';

  export let eyebrow = '';
  export let title = '';
  export let intro = '';
  export let updated = '';
  export let current = '';

  const supportLinks = [
    { id: 'delivery', label: 'Delivery' },
    { id: 'returns', label: 'Returns' },
    { id: 'size-guide', label: 'Size Guide' },
    { id: 'contact', label: 'Contact' },
    { id: 'terms', label: 'Terms' },
    { id: 'privacy', label: 'Privacy' }
  ];

  function go(page) {
    navigateTo(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
</script>

<section class="support-hero">
  <div class="support-eyebrow">{eyebrow}</div>
  <h1 class="support-title">{title}</h1>
  {#if intro}
    <p class="support-intro">{intro}</p>
  {/if}
  {#if updated}
    <div class="support-updated">Last updated: {updated}</div>
  {/if}
</section>

<nav class="support-nav" aria-label="Support pages">
  {#each supportLinks as link}
    <button class="support-nav-link" class:on={current === link.id} on:click={() => go(link.id)}>
      {link.label}
    </button>
  {/each}
</nav>

<section class="support-body">
  <slot />
</section>

<style>
  .support-hero{padding:34px 20px 20px;background:linear-gradient(180deg,var(--cream),#f7f1ea);}
  .support-eyebrow{font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:var(--muted);}
  .support-title{font-family:var(--serif);font-size:clamp(34px,8vw,56px);font-weight:300;line-height:.96;margin-top:10px;}
  .support-intro{max-width:34rem;font-size:13px;line-height:1.8;color:var(--body);margin-top:14px;}
  .support-updated{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-top:16px;}
  .support-nav{display:flex;gap:8px;overflow:auto;padding:14px 16px;border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);background:#fff;scrollbar-width:none;}
  .support-nav::-webkit-scrollbar{display:none;}
  .support-nav-link{padding:11px 14px;border:1px solid var(--bdr);background:#fff;font-size:10px;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;min-height:40px;}
  .support-nav-link.on{background:var(--ink);border-color:var(--ink);color:#fff;}
  .support-body{padding:18px 16px 44px;display:grid;gap:14px;}

  @media(max-width:640px){
    .support-hero{padding:30px 16px 18px;}
    .support-body{padding:18px 16px 38px;}
  }

  @media(min-width:900px){
    .support-hero{padding:44px 28px 22px;}
    .support-body{padding:20px 28px 48px;max-width:960px;margin:0 auto;}
  }
</style>
