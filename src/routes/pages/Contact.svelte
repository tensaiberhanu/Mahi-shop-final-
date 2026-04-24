<script>
  import SupportPageShell from '$lib/components/SupportPageShell.svelte';

  let submitted = false;
  let form = {
    firstName: '',
    lastName: '',
    email: '',
    subject: 'Order enquiry',
    message: ''
  };
  let errors = {};

  function submit() {
    errors = {};
    if (!form.email.trim()) errors.email = 'Email is required.';
    if (!form.message.trim()) errors.message = 'Message is required.';
    if (Object.keys(errors).length > 0) return;
    submitted = true;
  }
</script>

<SupportPageShell
  current="contact"
  eyebrow="Contact"
  title="Get in touch"
  intro="We respond to every message. If your enquiry is about an order, include your order number."
>
  <div class="support-grid">
    <section class="support-card">
      <div class="card-kicker">Email</div>
      <h2>hello@mahi.com</h2>
      <p>Best for delivery questions, fit support, returns, and custom or group enquiries.</p>
    </section>

    <section class="support-card">
      <div class="card-kicker">Response time</div>
      <h2>Usually within 24 hours</h2>
      <p>Our customer support is coordinated in London, with production managed directly in Ethiopia.</p>
    </section>
  </div>

  <section class="support-card">
    <div class="card-kicker">Message us</div>
    <h2>Contact form</h2>

    {#if submitted}
      <div class="success-box">
        <div class="success-mark">OK</div>
        <p>Your message is ready to send. This front-end form still needs live email handling.</p>
      </div>
    {:else}
      <div class="form-grid">
        <div>
          <label class="inp-label">First name</label>
          <input class="inp" bind:value={form.firstName} placeholder="Selam">
        </div>
        <div>
          <label class="inp-label">Last name</label>
          <input class="inp" bind:value={form.lastName} placeholder="Tadesse">
        </div>
        <div class="full">
          <label class="inp-label">Email</label>
          <input class="inp" type="email" bind:value={form.email} placeholder="selam@example.com">
          {#if errors.email}<div class="field-error">{errors.email}</div>{/if}
        </div>
        <div class="full">
          <label class="inp-label">Subject</label>
          <select class="inp" bind:value={form.subject}>
            <option>Order enquiry</option>
            <option>Custom design request</option>
            <option>Returns or defects</option>
            <option>Sizing question</option>
            <option>Group order</option>
            <option>Other</option>
          </select>
        </div>
        <div class="full">
          <label class="inp-label">Message</label>
          <textarea class="inp textarea" bind:value={form.message} placeholder="How can we help?"></textarea>
          {#if errors.message}<div class="field-error">{errors.message}</div>{/if}
        </div>
      </div>
      <button class="btn-p btn-lg" style="margin-top:16px;" on:click={submit}>Send message</button>
    {/if}
  </section>
</SupportPageShell>

<style>
  .support-card{border:1px solid var(--bdr);background:#fff;padding:16px;}
  .support-grid{display:grid;gap:12px;}
  .card-kicker{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
  h2{font-family:var(--serif);font-size:28px;font-weight:300;line-height:1.04;}
  p{font-size:13px;line-height:1.8;color:var(--body);margin-top:10px;}
  .form-grid{display:grid;gap:12px;margin-top:12px;}
  .full{grid-column:1/-1;}
  .textarea{min-height:140px;resize:vertical;}
  .field-error{font-size:10px;color:#8a3d33;margin-top:6px;}
  .success-box{padding:16px;border:1px solid var(--bdr);background:var(--soft);margin-top:12px;}
  .success-mark{font-size:14px;line-height:1;color:var(--burg);letter-spacing:.18em;text-transform:uppercase;}

  @media(min-width:760px){
    .support-grid,.form-grid{grid-template-columns:1fr 1fr;}
  }
</style>
