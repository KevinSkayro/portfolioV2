<template>
        <header class="video-container">
            <div class="fullscreen-video-wrap">
                <canvas id="bg"></canvas>
            </div>
            <!-- <div class="hero-content">
                <h1 class="header-text">Hi, I'm Kevin</h1>
                <h1 class="header-text">I'm a Front-end Developer</h1>
                <h2 class="header-subtext">I build websites and web applications.</h2>
                <a data-goto-btn class="explore-btn" href="#projects">
                    SEE PROJECTS <i class="fas fa-arrow-right" id="btn-arrow"></i>
                </a>
            </div> -->
      </header>
</template>

<script>


export default {
    created: () => {
        import('@src/components/header/header.js');
    },
}

</script>
