<script>
  import SupportPageShell from '$lib/components/SupportPageShell.svelte';

  const deliverySteps = [
    { label: 'Production', note: 'Made to measure in Ethiopia', timing: '7-14 days' },
    { label: 'UK delivery', note: 'Tracked courier delivery', timing: '3-5 days' },
    { label: 'USA & Canada', note: 'Tracked international delivery', timing: '5-8 days' },
    { label: 'Europe', note: 'Tracked international delivery', timing: '4-6 days' },
    { label: 'Australia', note: 'Tracked international delivery', timing: '7-10 days' }
  ];
</script>

<SupportPageShell
  current="delivery"
  eyebrow="Shipping"
  title="Delivery"
  intro="Every Mahi piece is made to measure first, then shipped worldwide with tracking."
>
  <div class="support-card">
    <div class="card-kicker">Estimated timeline</div>
    <div class="timeline-list">
      {#each deliverySteps as step}
        <div class="timeline-row">
          <div>
            <div class="timeline-label">{step.label}</div>
            <div class="timeline-note">{step.note}</div>
          </div>
          <div class="timeline-time">{step.timing}</div>
        </div>
      {/each}
    </div>
    <p class="fine-print">Most orders arrive within 2 to 4 weeks depending on location and the complexity of the design.</p>
  </div>

  <div class="support-grid">
    <section class="support-card">
      <div class="card-kicker">Tracking</div>
      <h2>Follow your order</h2>
      <p>You will receive a dispatch message with tracking details as soon as your order leaves Ethiopia.</p>
    </section>

    <section class="support-card">
      <div class="card-kicker">Customs</div>
      <h2>Import duties</h2>
      <p>Orders may be subject to customs or import charges in the destination country. These are paid by the customer.</p>
    </section>
  </div>

  <section class="support-card">
    <div class="card-kicker">Need help?</div>
    <h2>Delivery questions</h2>
    <p>Email <a href="mailto:hello@mahi.com">hello@mahi.com</a> and include your order number if you already placed an order.</p>
  </section>
</SupportPageShell>

<style>
  .support-card{border:1px solid var(--bdr);background:#fff;padding:16px;}
  .support-grid{display:grid;gap:12px;}
  .card-kicker{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
  h2{font-family:var(--serif);font-size:28px;font-weight:300;line-height:1.04;}
  p{font-size:13px;line-height:1.8;color:var(--body);margin-top:10px;}
  a{color:var(--burg);}
  .timeline-list{display:grid;border:1px solid var(--bdr);}
  .timeline-row{display:grid;grid-template-columns:1fr auto;gap:12px;padding:12px;border-bottom:1px solid var(--bdr);background:#fff;}
  .timeline-row:last-child{border-bottom:none;}
  .timeline-label{font-size:13px;font-weight:500;}
  .timeline-note{font-size:11px;color:var(--muted);margin-top:4px;}
  .timeline-time{font-size:12px;font-weight:500;color:var(--ink);white-space:nowrap;}
  .fine-print{font-size:11px;color:var(--muted);margin-top:12px;}

  @media(min-width:760px){
    .support-grid{grid-template-columns:1fr 1fr;}
  }
</style>
