class HeaderBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <!-- Menu Bar -->
        <div class="MENU_BAR">
            <button class="BAR_BUTTON">Art</button> |
            <button class="BAR_BUTTON">Code</button> |
            <button class="BAR_BUTTON">Modeling</button> |
            <button class="BAR_BUTTON">Rocketry</button> |
            <button class="BAR_BUTTON">Video</button> |
            <button class="BAR_BUTTON">Resume</button> |
        </div>
    `;
  }
}

customElements.define('menu-bar', HeaderBar);