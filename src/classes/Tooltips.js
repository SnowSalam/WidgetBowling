export class Tooltips {
    static tooltip = null;
    static tooltipTimeout = 1500;

    static showTooltip(target, text) {
        if (!this.tooltip) {
            this.tooltip = document.createElement('div');
            this.tooltip.className = 'tooltip';
            document.body.appendChild(this.tooltip); // добавлять только в body, если добавить в виджет - не будет работать
        }

        this.tooltip.textContent = text;

        const rect = target.getBoundingClientRect();

        const top = rect.top - this.tooltip.offsetHeight - 8;
        const left = rect.left + rect.width / 2 - this.tooltip.offsetWidth / 2;

        this.tooltip.style.top = `${top}px`;
        this.tooltip.style.left = `${left}px`;

        this.tooltip.classList.add('show');

        clearTimeout(this.tooltip._timer);
        this.tooltip._timer = setTimeout(() => {
            this.tooltip.classList.remove('show');
        }, this.tooltipTimeout);
    }

    static showQtyWarning(target, targetName, action) {

    }
}