<template>
    <div class="main-container">
      <header class="video-container">
        <div class="fullscreen-video-wrap">
          <video src="./VIDEO/Motion.mp4" autoplay muted loop></video>
        </div>
        <div class="hero-content">
          <h1 class="header-text">Hi, I'm Kevin</h1>
          <h1 class="header-text">I'm a Front-end Developer</h1>
          <h2 class="header-subtext">I build websites and web applications.</h2>
          <a data-goto-btn class="explore-btn" href="#projects">
            SEE PROJECTS <i class="fas fa-arrow-right" id="btn-arrow"></i>
          </a>
        </div>
      </header>
      <main>
        <section id="about">
          <div class="about-container">
            <h2>ABOUT</h2>
            <hr />
            <div class="about-inner-container">
              <div class="about-content content-one">
                <h3>
                  Front-end focused with <br />
                  full stack experience
                </h3>
                <p>
                  As a curious developer, I always find myself learning new things to improve my skills and can adapt to
                  new technologies within a few days.
                </p>
                <p>
                  I have most of my experience within the front-end space (HTML, CSS, JavaScript) but lately, I've been
                  working a lot with PHP and MySQL which I like and I find myself pretty confident about.
                </p>
              </div>
              <div class="about-content content-two">
                <img title="People vector" src="./IMG/2590505.png" alt="Vector of person programming" />
              </div>
            </div>
          </div>
        </section>
        <section id="tech">
          <div class="tech-container">
            <h2>TECHNOLOGIES</h2>
            <hr class="white-hr" />
            <div class="tech-inner-container">
                <div class="box box-three">
                    <font-awesome-icon icon="fa-brands fa-vuejs" />
                </div>
                <div class="box box-four">
                    <font-awesome-icon icon="fa-brands fa-laravel" />
                </div>
                <div class="box box-five">
                    <font-awesome-icon icon="fa-brands fa-aws" />
                </div>
                <div class="box box-five">
                    <font-awesome-icon icon="fa-solid fa-database" />
                    <span>mySQL</span>
                </div>
                <div class="box box-six">
                    <font-awesome-icon icon="fa-brands fa-wordpress" />
                </div>
            </div>
          </div>
        </section>
        <section id="projects">
          <div class="projects-container">
            <h2>PROJECTS</h2>
            <hr />
            <div class="projects-inner-container">
              <div data-card-hover="#card-1" class="project-card" id="card-1">
                <div class="overlay"></div>
                <button data-popup-target="#popup-1" class="preview-btn">VIEW PROJECT</button>
                <div class="project-title"><span>Weather API App</span></div>
              </div>
              <div data-card-hover="#card-2" class="project-card" id="card-2">
                <div class="overlay"></div>
                <button data-popup-target="#popup-2" class="preview-btn">VIEW PROJECT</button>
                <div class="project-title"><span>TO-DO List App</span></div>
              </div>
              <div data-card-hover="#card-3" class="project-card" id="card-3">
                <div class="overlay"></div>
                <button data-popup-target="#popup-3" class="preview-btn">VIEW PROJECT</button>
                <div class="project-title"><span>PHP Login System</span></div>
              </div>
            </div>
          </div>
        </section>
        <div class="popups">
          <div class="popup" id="popup-1">
            <div class="popup-content">
              <div class="popup-content-container">
                <div class="project-preview preview-1">
                  <img src="./IMG/weather-app.gif" alt="" />
                </div>
                <div class="project-btns-container">
                  <div class="close-popup-container">
                    <i data-close-popup class="fas fa-times"></i>
                  </div>
                  <div class="btns-container">
                    <div class="popup-text-container">
                      <span>Weather API App</span>
                      <p>Technologies used:</p>
                      <ul>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>API</li>
                      </ul>
                    </div>
                    <a class="project-popup-btn btn-one" target="_blank" href="https://github.com/KevinSkayro/weather"
                      >View source code</a
                    >
                    <a class="project-popup-btn btn-two" target="_blank" href="./weather/weather.html">Go to project</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="popup" id="popup-2">
            <div class="popup-content">
              <div class="popup-content-container">
                <div class="project-preview preview-2">
                  <img src="./IMG/todo-app.gif" alt="" />
                </div>
                <div class="project-btns-container">
                  <div class="close-popup-container">
                    <i data-close-popup class="fas fa-times"></i>
                  </div>
                  <div class="btns-container">
                    <div class="popup-text-container">
                      <span>TO-DO List App</span>
                      <p>Technologies used:</p>
                      <ul>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                      </ul>
                    </div>
                    <a
                      class="project-popup-btn btn-one"
                      target="_blank"
                      href="https://github.com/KevinSkayro/todo-list-seize"
                      >View source code</a
                    >
                    <a class="project-popup-btn btn-two" target="_blank" href="./todo-list-seize/seize-time.html"
                      >Go to project</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="popup" id="popup-3">
            <div class="popup-content">
              <div class="popup-content-container">
                <div class="project-preview preview-3">
                  <img src="./IMG/login-app.gif" alt="" />
                </div>
                <div class="project-btns-container">
                  <div class="close-popup-container">
                    <i data-close-popup class="fas fa-times"></i>
                  </div>
                  <div class="btns-container">
                    <div class="popup-text-container">
                      <span>PHP Login System</span>
                      <p>Technologies used:</p>
                      <ul>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>PHP</li>
                        <li>mySQL</li>
                      </ul>
                    </div>
                    <a
                      class="project-popup-btn btn-one"
                      target="_blank"
                      href="https://github.com/KevinSkayro/php-login-system"
                      >View source code</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div data-popup-overlay class="popup-overlay"></div>
        </div>
        <section id="contact">
          <div class="contact-container">
            <h2>CONTACT</h2>
            <hr class="white-hr" />
            <div class="contact-inner-container">
              <div class="social-menu">
                <ul>
                  <li>
                    <a href="https://www.facebook.com/KevinSkayroJourney"><i class="fab fa-facebook-f"></i></a>
                  </li>
                  <li>
                    <a href="https://twitter.com/Kevinskayro"><i class="fab fa-twitter"></i></a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/kevinskayro_journey/"><i class="fab fa-instagram"></i></a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UC4SZMSA6juTx9aCCCsu-0iw"
                      ><i class="fab fa-youtube"></i
                    ></a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/kevin-skayro/"><i class="fab fa-linkedin-in"></i></a>
                  </li>
                  <li>
                    <a href="https://github.com/KevinSkayro"><i class="fab fa-github-alt"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <a target="_blank" class="footer-links" href="https://www.freepik.com/vectors/people"
            >People vector in "about" section created by pikisuperstar - www.freepik.com</a
          >
          <a target="_blank" class="footer-links" href="https://github.com/KevinSkayro/portfolio2021"
            >Portfolio's source code</a
          >
          <a target="_blank" class="footer-links" href="https://www.kevinskayro.com">Site by Kevin Castro</a>
        </section>
      </main>
    </div>

</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
