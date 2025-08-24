class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="BOTTOM_BAR">
            <p style="display: inline;">Copyright: Brendan Apple </p>

            <div class="SOCIALS">
                <button onclick="window.open('https://www.linkedin.com/in/brendan-apple-81b4a132b/', '_blank').focus();" class="SOCIALS_BUTTON">
                    <img src="img/linkedin_logo.png" alt="LINKED IN" class="SOCIALS_LOGO">
                </button>
                <button onclick="window.open('https://github.com/brendancapple', '_blank').focus();" class="SOCIALS_BUTTON">
                    <img src="img/github_logo.png" alt="GITHUB" class="SOCIALS_LOGO">
                </button>
                <button onclick="window.open('https://www.youtube.com/@soulninja7606', '_blank').focus();" class="SOCIALS_BUTTON">
                    <img src="img/youtube_logo.png" alt="YOUTUBE" class="SOCIALS_LOGO">
                </button>
                <button onclick="window.open('https://www.instagram.com/oosoulninjaoo/', '_blank').focus();" class="SOCIALS_BUTTON">
                    <img src="img/instagram_logo.png" alt="INSTA" class="SOCIALS_LOGO">
                </button>
            </div>
        </div>
    `;
  }
}

customElements.define('footer-module', Footer);