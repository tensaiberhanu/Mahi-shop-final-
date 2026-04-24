<script>
  import DressCard from '$lib/components/DressCard.svelte';
  import { navigateTo, WOMEN, MEN } from '$lib/store.js';

  const featuredWomen = WOMEN.slice(0, 4);
  const featuredMen = MEN.slice(0, 4);
  const featuredReviews = [
    {
      quote: '"Absolutely beautiful. The fit was perfect."',
      by: 'Selam T. - London, UK'
    },
    {
      quote: '"Beautiful quality and everything arrived together."',
      by: 'Meron & Yonas - Toronto, Canada'
    }
  ];

  function go(page) {
    navigateTo(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
</script>

<div class="hero">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-h1">Ethiopian dresses,<br>made for you.</h1>
    <p class="hero-sub">Made to measure.</p>
    <div class="hero-btns">
      <button class="hero-btn-p" on:click={() => go('women')}>Shop Women</button>
      <button class="hero-btn-o" on:click={() => go('men')}>Shop Men</button>
    </div>
  </div>
</div>

<div class="matching-banner">
  <p>One design. Multiple ways to order.</p>
  <button on:click={() => go('matching')}>MATCHING &amp; CUSTOM &rarr;</button>
</div>

<div class="ticker">
  <div class="ticker-track">
    <span class="t-item">Made in Ethiopia <span style="color:var(--burg);">&middot;</span></span>
    <span class="t-item">Custom fit <span style="color:var(--burg);">&middot;</span></span>
    <span class="t-item">Couple sets <span style="color:var(--burg);">&middot;</span></span>
    <span class="t-item">Family sets <span style="color:var(--burg);">&middot;</span></span>
    <span class="t-item">Worldwide delivery <span style="color:var(--burg);">&middot;</span></span>
    <span class="t-item">Made in Ethiopia <span style="color:var(--burg);">&middot;</span></span>
    <span class="t-item">Custom fit <span style="color:var(--burg);">&middot;</span></span>
    <span class="t-item">Couple sets <span style="color:var(--burg);">&middot;</span></span>
    <span class="t-item">Family sets <span style="color:var(--burg);">&middot;</span></span>
    <span class="t-item">Worldwide delivery <span style="color:var(--burg);">&middot;</span></span>
  </div>
</div>

<div class="s-hd">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;">
    <div><div class="s-eyebrow">Women</div><h2 class="s-h2">New arrivals</h2></div>
    <button class="s-link" on:click={() => go('women')}>View all</button>
  </div>
</div>
<div class="dress-grid" style="border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);">
  {#each featuredWomen as dress}
    <DressCard {dress} />
  {/each}
</div>

<div class="s-hd">
  <div style="display:flex;align-items:flex-end;justify-content:space-between;">
    <div><div class="s-eyebrow">Men</div><h2 class="s-h2">Men's collection</h2></div>
    <button class="s-link" on:click={() => go('men')}>View all</button>
  </div>
</div>
<div class="dress-grid" style="border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);">
  {#each featuredMen as dress}
    <DressCard {dress} isMen={true} />
  {/each}
</div>

<div class="custom-block">
  <div>
    <div class="s-eyebrow">Custom design</div>
    <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;margin-top:.375rem;">Seen something you love?</h2>
    <p style="font-size:13px;color:var(--body);line-height:1.8;margin-top:.625rem;max-width:320px;">Upload a photo. We&apos;ll make it for you.</p>
  </div>
  <button class="btn-p" style="align-self:flex-start;" on:click={() => go('custom')}>UPLOAD YOUR DESIGN</button>
</div>

<div class="editorial">
  <div class="s-eyebrow">Matching &amp; Custom</div>
  <h2>One look.<br>Every fit<br><em>her own.</em></h2>
  <p>Choose one design. Everyone orders their own fit.</p>
  <button class="editorial-btn" on:click={() => go('matching')}>CREATE YOUR LOOK &rarr;</button>
</div>

<div class="s-hd" style="padding-bottom:0;">
  <div class="s-eyebrow">The Mahi process</div>
  <h2 class="s-h2">How it works</h2>
</div>
<div class="hiw-list">
  <div class="hiw-item">
    <div class="hiw-n">1</div>
    <div><div class="hiw-title">Choose your dress</div><p class="hiw-text">Find the style you love.</p></div>
  </div>
  <div class="hiw-item">
    <div class="hiw-n">2</div>
    <div><div class="hiw-title">Add your measurements</div><p class="hiw-text">Just four numbers. No sizes.</p></div>
  </div>
  <div class="hiw-item">
    <div class="hiw-n">3</div>
    <div><div class="hiw-title">Made in Ethiopia</div><p class="hiw-text">Handcrafted by skilled tailors.</p></div>
  </div>
  <div class="hiw-item" style="border-bottom:none;">
    <div class="hiw-n">4</div>
    <div><div class="hiw-title">Delivered to you</div><p class="hiw-text">Worldwide delivery.</p></div>
  </div>
</div>

<div class="s-hd">
  <div class="s-eyebrow">Reviews</div>
  <h2 class="s-h2">What our customers say</h2>
</div>
<div class="review-grid">
  {#each featuredReviews as review}
    <div class="review-card">
      <div class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      <div class="review-q">{review.quote}</div>
      <div class="review-by">{review.by}</div>
    </div>
  {/each}
</div>

<footer>
  <div class="footer-top">
    <div class="footer-logo">Mahi</div>
    <div class="footer-tag">Made in Ethiopia. Made for You.</div>
  </div>
  <div class="footer-links">
    <button on:click={() => go('about')}>About</button>
    <button on:click={() => go('delivery')}>Delivery</button>
    <button on:click={() => go('returns')}>Returns</button>
    <button on:click={() => go('size-guide')}>Size guide</button>
    <button on:click={() => go('terms')}>Terms</button>
    <button on:click={() => go('privacy')}>Privacy</button>
    <button on:click={() => go('contact')}>Contact</button>
  </div>
  <div class="footer-copy">&copy; 2025 Mahi &middot; hello@mahi.com</div>
</footer>

<style>
  .hero{width:100%;height:100svh;max-height:780px;min-height:520px;background:linear-gradient(180deg,var(--cream),#d0c8c0);position:relative;overflow:hidden;display:flex;align-items:flex-end;}
  .hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.65) 0%,rgba(0,0,0,.1) 45%,transparent 70%);}
  .hero-content{position:relative;z-index:1;padding:30px 20px 28px;color:#fff;width:100%;}
  .hero-h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(44px,11vw,72px);line-height:.9;letter-spacing:-.02em;font-weight:300;max-width:420px;}
  .hero-sub{font-size:13px;line-height:1.7;color:rgba(255,255,255,.82);margin-top:14px;max-width:300px;}
  .hero-btns{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:26px;max-width:340px;}
  .hero-btn-p{background:#fff;color:var(--ink);font-size:10px;letter-spacing:.2em;text-transform:uppercase;padding:14px 8px;text-align:center;cursor:pointer;border:none;font-family:var(--sans);min-height:46px;}
  .hero-btn-o{background:transparent;color:#fff;font-size:10px;letter-spacing:.2em;text-transform:uppercase;padding:14px 8px;text-align:center;cursor:pointer;border:1px solid rgba(255,255,255,.5);font-family:var(--sans);min-height:46px;}
  .matching-banner{background:var(--burg);color:#fff;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;}
  .matching-banner p{font-size:12px;letter-spacing:.08em;}
  .matching-banner button{background:#fff;color:var(--burg);font-size:9px;letter-spacing:.18em;text-transform:uppercase;padding:10px 16px;border:none;cursor:pointer;font-family:var(--sans);flex-shrink:0;min-height:42px;}
  .custom-block{background:var(--soft);border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);padding:2.25rem 20px;display:flex;flex-direction:column;gap:1rem;}
  footer{background:var(--ink);color:#fff;padding:2.25rem 20px 2rem;}
  .footer-top{margin-bottom:1.5rem;}
  .footer-logo{font-family:'Playfair Display',Georgia,serif;font-size:28px;color:var(--gold);font-weight:300;letter-spacing:.08em;}
  .footer-tag{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:4px;}
  .footer-links{display:flex;flex-wrap:wrap;gap:.5rem 1rem;margin-bottom:1.5rem;}
  .footer-links button{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55);background:none;border:none;cursor:pointer;padding:10px 0;transition:color .15s;min-height:40px;}
  .footer-links button:hover{color:#fff;}
  .footer-copy{font-size:10px;color:rgba(255,255,255,.3);letter-spacing:.1em;}
  .review-grid{padding:0 16px 2.25rem;display:grid;gap:12px;}
  @media(max-width:640px){
    .hero{min-height:560px;}
    .hero-content{padding:28px 16px 24px;}
    .matching-banner{padding:16px;}
    .matching-banner button{width:100%;justify-content:center;}
    .custom-block{padding:2rem 16px;}
    footer{padding:2rem 16px calc(2rem + env(safe-area-inset-bottom,0px));}
  }
  @media(min-width:900px){.review-grid{grid-template-columns:1fr 1fr;}}
</style>
