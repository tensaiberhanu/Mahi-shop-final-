<script>
  import SupportPageShell from '$lib/components/SupportPageShell.svelte';

  const measurements = [
    {
      n: '01',
      title: 'Bust',
      desc: 'Measure around the fullest part of your chest, keeping the tape level.',
      tip: 'Take the measurement over light clothing or close-fitting underwear.'
    },
    {
      n: '02',
      title: 'Waist',
      desc: 'Measure around your natural waist, the narrowest point of your torso.',
      tip: 'Bend to one side to find the natural crease.'
    },
    {
      n: '03',
      title: 'Hips',
      desc: 'Measure around the fullest part of your hips and seat with feet together.',
      tip: 'Keep the tape parallel to the floor.'
    },
    {
      n: '04',
      title: 'Height',
      desc: 'Measure from the floor to the top of your head without shoes.',
      tip: 'Stand straight against a wall for the most consistent result.'
    }
  ];
</script>

<SupportPageShell
  current="size-guide"
  eyebrow="Fit"
  title="Size Guide"
  intro="Mahi pieces are made to measure. For most orders, you only need four measurements."
>
  <div class="measure-list">
    {#each measurements as item}
      <section class="measure-card">
        <div class="measure-number">{item.n}</div>
        <div>
          <h2>{item.title}</h2>
          <p>{item.desc}</p>
          <div class="tip-box"><strong>Tip:</strong> {item.tip}</div>
        </div>
      </section>
    {/each}
  </div>

  <div class="support-grid">
    <section class="support-card">
      <div class="card-kicker">Men</div>
      <h2>Men's pieces</h2>
      <p>For men's looks we usually ask for chest, waist, shoulders, and height.</p>
    </section>

    <section class="support-card">
      <div class="card-kicker">Children</div>
      <h2>Children's pieces</h2>
      <p>For children we usually ask for chest, waist, height, and age to help with proportions.</p>
    </section>
  </div>

  <section class="support-card">
    <div class="card-kicker">Need extra help?</div>
    <h2>Fit support</h2>
    <p>If you are between measurements or ordering for a special event, contact us and we will guide you before production begins.</p>
  </section>
</SupportPageShell>

<style>
  .measure-list{display:grid;gap:12px;}
  .measure-card,.support-card{border:1px solid var(--bdr);background:#fff;padding:16px;}
  .measure-card{display:grid;grid-template-columns:44px 1fr;gap:14px;align-items:flex-start;}
  .measure-number{font-family:var(--serif);font-size:34px;line-height:1;color:var(--gold);}
  .support-grid{display:grid;gap:12px;}
  .card-kicker{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
  h2{font-family:var(--serif);font-size:28px;font-weight:300;line-height:1.04;}
  p{font-size:13px;line-height:1.8;color:var(--body);margin-top:10px;}
  .tip-box{margin-top:10px;padding:10px 12px;background:var(--soft);border-left:2px solid var(--gold);font-size:12px;line-height:1.7;}

  @media(min-width:760px){
    .support-grid{grid-template-columns:1fr 1fr;}
  }
</style>
