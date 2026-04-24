<script>
  import SupportPageShell from '$lib/components/SupportPageShell.svelte';
</script>

<SupportPageShell
  current="returns"
  eyebrow="Returns"
  title="Returns & Remakes"
  intro="Because each piece is made to your measurements, our returns policy is focused on defects and genuine make issues."
>
  <section class="support-card highlight-card">
    <div class="card-kicker">Important</div>
    <h2>Made-to-order pieces are not returnable for change of mind.</h2>
    <p>We also cannot accept returns for incorrect measurements submitted by the customer.</p>
  </section>

  <div class="support-grid">
    <section class="support-card">
      <div class="card-kicker">We can help if</div>
      <h2>Eligible issues</h2>
      <p>Your order arrives with a manufacturing defect, differs significantly from the approved design, or is clearly outside the measurements you provided.</p>
    </section>

    <section class="support-card">
      <div class="card-kicker">Timeframe</div>
      <h2>Report within 7 days</h2>
      <p>Email us within 7 days of delivery with your order number, clear photos, and a short explanation of the issue.</p>
    </section>
  </div>

  <section class="support-card">
    <div class="card-kicker">Next step</div>
    <h2>What happens after review</h2>
    <p>If approved, we will arrange the most appropriate resolution, which may be a remake, alteration support, or refund.</p>
  </section>

  <section class="support-card">
    <div class="card-kicker">Contact</div>
    <h2>Start a returns request</h2>
    <p>Email <a href="mailto:hello@mahi.com">hello@mahi.com</a>. We read every message and aim to reply within 48 hours.</p>
  </section>
</SupportPageShell>

<style>
  .support-card{border:1px solid var(--bdr);background:#fff;padding:16px;}
  .support-grid{display:grid;gap:12px;}
  .highlight-card{background:#fbefed;border-color:#e3b5ae;}
  .card-kicker{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
  h2{font-family:var(--serif);font-size:28px;font-weight:300;line-height:1.04;}
  p{font-size:13px;line-height:1.8;color:var(--body);margin-top:10px;}
  a{color:var(--burg);}

  @media(min-width:760px){
    .support-grid{grid-template-columns:1fr 1fr;}
  }
</style>
