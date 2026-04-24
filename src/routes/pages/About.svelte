<script>
  import { navigateTo } from '$lib/store.js';
  function go(page) { navigateTo(page); window.scrollTo({top:0,behavior:'instant'}); }
</script>

<div class="static-page">
  <div class="s-eyebrow">Our story</div>
  <h1 class="static-h1">Made in Ethiopia.<br>Made for You.</h1>
  <div class="static-section" style="border:none;padding-top:.5rem;">
    <p>Mahi was built on a simple belief: Ethiopian and Eritrean women and men around the world deserve access to beautifully made traditional wear, fitted precisely to their body, without compromise.</p>
    <p>Every Mahi piece is handcrafted by skilled tailors in Ethiopia. We don't stock sizes. Each dress or garment is made from scratch to your exact measurements — bust, waist, hips, height — and quality-checked before it leaves Ethiopia.</p>
    <p>We ship worldwide. Our customers are in London, Toronto, Washington DC, Melbourne, Oslo, Dubai — wherever the Ethiopian and Eritrean diaspora has built a home.</p>
  </div>
  <div class="static-section">
    <h2>What makes Mahi different</h2>
    <div style="display:flex;flex-direction:column;gap:1rem;margin-top:.875rem;">
      <div style="border-left:2px solid var(--gold);padding-left:1.25rem;"><div style="font-size:13px;font-weight:500;margin-bottom:.375rem;">Custom measurements</div><p style="font-size:13px;line-height:1.8;color:var(--body);">Every piece is made to your exact measurements. We ask for bust, waist, hips, and height — not a generic size.</p></div>
      <div style="border-left:2px solid var(--gold);padding-left:1.25rem;"><div style="font-size:13px;font-weight:500;margin-bottom:.375rem;">Made in Ethiopia</div><p style="font-size:13px;line-height:1.8;color:var(--body);">Our pieces are made by skilled tailors in Ethiopia using authentic Tilet embroidery and premium Ethiopian cotton.</p></div>
      <div style="border-left:2px solid var(--gold);padding-left:1.25rem;"><div style="font-size:13px;font-weight:500;margin-bottom:.375rem;">Matching sets</div><p style="font-size:13px;line-height:1.8;color:var(--body);">Couple sets, family sets, wedding groups. One look, every fit individual.</p></div>
      <div style="border-left:2px solid var(--gold);padding-left:1.25rem;"><div style="font-size:13px;font-weight:500;margin-bottom:.375rem;">Quality checked</div><p style="font-size:13px;line-height:1.8;color:var(--body);">Every piece is photographed and inspected before dispatch. If it's not right, it doesn't ship.</p></div>
    </div>
  </div>
  <div style="margin-top:2rem;"><p style="font-size:14px;line-height:1.9;color:var(--body);">Questions? Email us at <a href="mailto:hello@mahi.com" style="color:var(--burg);">hello@mahi.com</a></p></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-top:2rem;">
    <button class="btn-p btn-lg" on:click={()=>go('women')}>Shop Women</button>
    <button class="btn-o btn-lg" on:click={()=>go('matching')}>Matching & Custom</button>
  </div>
</div>
