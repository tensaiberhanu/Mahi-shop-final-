<script>
  import { showToast } from '$lib/store.js';
  let submitted = false;
  function submit() { submitted = true; showToast('Request submitted!'); }
</script>

<div class="custom-hero">
  <div style="font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;">Custom Design</div>
  <h1 class="custom-h1">Your vision.<br>Our <em>craft.</em></h1>
  <p style="font-size:13px;color:var(--body);line-height:1.8;margin-top:.875rem;max-width:320px;">Seen something on Instagram or TikTok? Screenshot it and upload it here. Our tailors in Ethiopia will make it for you.</p>
  <div style="display:flex;flex-direction:column;gap:6px;margin-top:1.25rem;">
    <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--body);"><span style="color:var(--burg);font-size:14px;">✓</span> 100+ custom orders completed</div>
    <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--body);"><span style="color:var(--burg);font-size:14px;">✓</span> Tailored by expert Ethiopian artisans</div>
    <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--body);"><span style="color:var(--burg);font-size:14px;">✓</span> We confirm your design before production starts</div>
  </div>
</div>

{#if submitted}
  <div style="padding:3rem 16px;text-align:center;">
    <div style="width:56px;height:56px;background:var(--ink);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>
    <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;margin-top:1.5rem;">Request received</h2>
    <p style="font-size:13px;color:var(--body);line-height:1.8;margin-top:1rem;max-width:280px;margin-left:auto;margin-right:auto;">We'll review your request and reply within 24 hours with a quote and timeline.</p>
  </div>
{:else}
  <div style="padding:0 0 1rem;">
    <div style="padding:16px 16px 0;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);">Step 1 — Upload your inspiration</div>
    <div class="upload-big" style="margin:16px;">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:var(--muted);opacity:.5;"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
      <div style="font-size:13px;font-weight:500;">Upload photo or screenshot</div>
      <div style="font-size:11px;color:var(--muted);text-align:center;max-width:220px;line-height:1.6;">Instagram, TikTok, Pinterest — any screenshot or photo</div>
      <button class="btn-p" style="font-size:9px;padding:10px 20px;">Choose file</button>
    </div>
  </div>
  <div class="custom-form">
    <div style="font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);">Step 2 — Describe your request</div>
    <div><label class="inp-label">What type of piece?</label>
      <select class="inp"><option>Women's kemis / dress</option><option>Men's Ethiopian wear</option><option>Couple set</option><option>Family set</option><option>Wedding group</option><option>Other — I'll describe below</option></select>
    </div>
    <div><label class="inp-label">Describe what you want</label>
      <textarea class="inp" style="resize:vertical;min-height:120px;" placeholder="e.g. I saw this dress on Instagram — I want the same style but with gold Tilet instead of blue, and I need it in a full length. It's for my wedding in March…"></textarea>
    </div>
    <div><label class="inp-label">Occasion</label>
      <select class="inp"><option>Wedding</option><option>Engagement</option><option>Cultural celebration (Meskel, Enkutatash…)</option><option>Graduation</option><option>Family event</option><option>Other</option></select>
    </div>
    <div><label class="inp-label">When do you need it?</label><input class="inp" type="date"></div>
    <div style="border-top:1px solid var(--bdr);padding-top:1rem;">
      <div style="font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:.875rem;">Step 3 — Your measurements</div>
      <div class="meas-grid">
        <div><label class="inp-label">Bust (cm)</label><input class="inp" type="number" placeholder="e.g. 88"></div>
        <div><label class="inp-label">Waist (cm)</label><input class="inp" type="number" placeholder="e.g. 70"></div>
        <div><label class="inp-label">Hips (cm)</label><input class="inp" type="number" placeholder="e.g. 95"></div>
        <div><label class="inp-label">Height (cm)</label><input class="inp" type="number" placeholder="e.g. 165"></div>
      </div>
    </div>
    <div><label class="inp-label">Your contact email</label><input class="inp" type="email" placeholder="selam@example.com"></div>
    <button class="btn-p btn-full btn-lg" on:click={submit}>Submit custom request</button>
    <p style="font-size:11px;color:var(--muted);text-align:center;line-height:1.7;">We'll review your request and reply within 24 hours with a quote and timeline.</p>
  </div>
{/if}
