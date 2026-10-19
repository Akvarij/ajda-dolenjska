/**
 * Progressive enhancement for every <form data-form>.
 *
 * - With data-endpoint: POSTs the fields (multipart) and shows a status message.
 * - Without it: builds a mailto: link so the form still works on a bare static host.
 * The honeypot field "_gotcha" silently drops bot submissions.
 */
const forms = document.querySelectorAll<HTMLFormElement>('form[data-form]');

function labelFor(form: HTMLFormElement, name: string): string {
  const el = form.elements.namedItem(name);
  if (el instanceof HTMLElement && el.id) {
    const label = form.querySelector(`label[for="${el.id}"]`);
    const text = label?.textContent?.replace('*', '').trim();
    if (text) return text;
  }
  return name;
}

forms.forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-status]');
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  const setStatus = (state: 'ok' | 'error' | '', message: string) => {
    if (!status) return;
    status.dataset.state = state;
    status.textContent = message;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    if (data.get('_gotcha')) return;
    data.delete('_gotcha');

    const endpoint = form.dataset.endpoint;
    if (endpoint) {
      if (submit) submit.disabled = true;
      setStatus('', 'Pošiljam …');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus('ok', form.dataset.success ?? 'Hvala! Vaše sporočilo smo prejeli.');
      } catch {
        setStatus(
          'error',
          `Pošiljanje ni uspelo. Poskusite znova ali nam pišite na ${form.dataset.mailto ?? 'naš e-naslov'}.`,
        );
      } finally {
        if (submit) submit.disabled = false;
      }
      return;
    }

    const lines: string[] = [];
    for (const [name, value] of data.entries()) {
      if (name.startsWith('_') || name === 'soglasje' || typeof value !== 'string' || !value.trim()) continue;
      lines.push(`${labelFor(form, name)}: ${value.trim()}`);
    }
    const subject = form.dataset.subject ?? 'Sporočilo s spletne strani';
    window.location.href =
      `mailto:${form.dataset.mailto ?? ''}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(lines.join('\n'))}`;
    setStatus('ok', 'Odpira se vaš e-poštni program. Sporočilo v njem le še pošljite.');
  });
});
