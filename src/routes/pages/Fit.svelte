<script>
  import { showToast } from '$lib/store.js';
  let saved = false;
  let bust='', waist='', hips='', height='', shoulder='', notes='';
  function save() { saved = true; showToast('Fit profile saved'); }
</script>

<div style="background:var(--cream);padding:2.5rem 16px;">
  <div class="s-eyebrow">Your account</div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,6vw,44px);font-weight:300;margin-top:.375rem;">Fit profile</h1>
  <p style="font-size:13px;color:var(--body);line-height:1.8;margin-top:.625rem;">Save your measurements once. Pre-filled on every product page and at checkout.</p>
</div>

<div style="border:1px solid var(--bdr);margin:16px;padding:16px;">
  <div style="font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;">Body measurements (cm)</div>
  <div class="meas-grid">
    <div><label class="inp-label">Bust</label><input class="inp" type="number" bind:value={bust} placeholder="e.g. 88"></div>
    <div><label class="inp-label">Waist</label><input class="inp" type="number" bind:value={waist} placeholder="e.g. 70"></div>
    <div><label class="inp-label">Hips</label><input class="inp" type="number" bind:value={hips} placeholder="e.g. 95"></div>
    <div><label class="inp-label">Height</label><input class="inp" type="number" bind:value={height} placeholder="e.g. 165"></div>
    <div style="grid-column:1/-1;"><label class="inp-label">Shoulder <span style="color:var(--burg);">optional</span></label><input class="inp" type="number" bind:value={shoulder} placeholder="e.g. 38"></div>
    <div style="grid-column:1/-1;"><label class="inp-label">Notes <span style="color:var(--burg);">optional</span></label><textarea class="inp" style="resize:vertical;min-height:72px;" bind:value={notes} placeholder="e.g. prefer slightly looser waist…"></textarea></div>
  </div>
</div>

<button class="btn-p btn-full btn-lg" style="margin:0 16px;width:calc(100% - 32px);" on:click={save}>
  {saved ? '✓ Saved' : 'Save fit profile'}
</button>

<div style="margin:16px;background:var(--soft);border:1px solid var(--bdr);padding:16px;">
  <div style="font-size:11px;font-weight:500;margin-bottom:.875rem;">How to measure yourself</div>
  <div style="display:flex;flex-direction:column;gap:.5rem;font-size:12px;color:var(--body);line-height:1.8;">
    <div><strong>Bust</strong> — Around the fullest part of your chest, tape level.</div>
    <div><strong>Waist</strong> — Around the narrowest part of your torso.</div>
    <div><strong>Hips</strong> — Around the fullest part of your hips and seat.</div>
    <div><strong>Height</strong> — Floor to top of head, without shoes.</div>
  </div>
</div>
<div style="height:2rem;"></div>
