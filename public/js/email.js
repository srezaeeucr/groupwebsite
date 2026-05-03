// email.js - Reveals base64-encoded emails on JS-enabled clients only.
// Pages ship with data-e="<base64>" + a "click to reveal" placeholder,
// which keeps plain addresses out of the static HTML for naive scrapers.

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.email-copy-block[data-e]').forEach(block => {
        let email;
        try {
            email = atob(block.dataset.e);
        } catch (_) {
            return;
        }
        const span = block.querySelector('.email-text');
        if (span) span.textContent = email;
        block.addEventListener('click', () => {
            navigator.clipboard.writeText(email);
            block.classList.add('copied');
            const tooltip = block.querySelector('.tooltip-text');
            if (tooltip) {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
            }
            setTimeout(() => {
                block.classList.remove('copied');
                if (tooltip) {
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.opacity = '0';
                }
            }, 1500);
        });
    });
});
