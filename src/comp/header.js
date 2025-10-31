class HeaderBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <!-- Menu Bar -->
        <div class="MENU_BAR">
            <button class="BAR_BUTTON" onclick="window.location.href='index.html'">Home</button> |
            <button class="BAR_BUTTON" onclick="window.location.href='art.html'">Art</button> |
            <button class="BAR_BUTTON" onclick="window.location.href='code.html'">Code</button> |
            <button class="BAR_BUTTON" onclick="window.location.href='rocketry.html'">Rocketry</button> |
            <button class="BAR_BUTTON" onclick="window.location.href='resume.html'">Resume</button> |
        </div>
    `;
  }
}

customElements.define('menu-bar', HeaderBar);