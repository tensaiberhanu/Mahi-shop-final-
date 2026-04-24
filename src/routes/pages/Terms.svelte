<script>
  import SupportPageShell from '$lib/components/SupportPageShell.svelte';

  const sections = [
    {
      title: 'Orders',
      body: 'All Mahi pieces are made to order using the product, options, and measurements submitted at checkout.'
    },
    {
      title: 'Pricing & payment',
      body: 'Prices are shown in GBP. Payment is taken at checkout through the payment provider used by the live site.'
    },
    {
      title: 'Production & delivery',
      body: 'Estimated production and delivery times are provided as guidance. Customs or courier delays may affect arrival times.'
    },
    {
      title: 'Returns',
      body: 'Because each piece is custom-made, returns are limited to approved make issues, defects, or significant order errors.'
    },
    {
      title: 'Contact',
      body: 'For any issue relating to your order, contact hello@mahi.com as soon as possible.'
    }
  ];
</script>

<SupportPageShell
  current="terms"
  eyebrow="Legal"
  title="Terms"
  intro="These terms outline how made-to-order purchases work on Mahi."
  updated="April 2026"
>
  <section class="support-card highlight-card">
    <div class="card-kicker">Made to order</div>
    <h2>Each garment is produced for the customer who placed the order.</h2>
    <p>That means accuracy of measurements, product choice, and delivery details matters at checkout.</p>
  </section>

  {#each sections as section}
    <section class="support-card">
      <div class="card-kicker">{section.title}</div>
      <p>{section.body}</p>
    </section>
  {/each}
</SupportPageShell>

<style>
  .support-card{border:1px solid var(--bdr);background:#fff;padding:16px;}
  .highlight-card{background:var(--soft);}
  .card-kicker{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
  h2{font-family:var(--serif);font-size:28px;font-weight:300;line-height:1.04;}
  p{font-size:13px;line-height:1.8;color:var(--body);margin-top:10px;}
</style>
