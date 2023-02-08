<template>
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
</template>