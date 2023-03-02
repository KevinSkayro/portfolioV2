<template>
        <header class="hero-container">
            <div class="fullscreen-canvas-wrap">
                <canvas id="bg"></canvas>
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
</template>

<script>


export default {
    created: () => {
        import('@src/components/home/game.js');
    },
}
</script>
<style lang="scss" scoped>
    .hero-container {
        height:100vh;
        overflow: hidden;

        .fullscreen-canvas-wrap {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            z-index: -1;
        }
        .hero-content {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.80) 70%, rgba(0, 0, 0, 0.60) 100%);
            color: #fff;

            .header-text {
                font-size: 3rem;
                font-weight: 600;
                text-align: center;
            }

            .header-subtext {
                margin-top: 1rem;
                font-size: 1.5rem;
                text-align: center;
            }

            .explore-btn {
                color: #fff;
                text-decoration: none;
                margin-top: 2rem;
                border: 1px solid #fff;
                border-radius: 2rem;
                padding: 1rem;
                -webkit-backdrop-filter: blur(0.3rem);
                backdrop-filter: blur(0.3rem);
            }

            .explore-btn:hover {
                background: #f21137;
                border: 1px solid #f21137;
                cursor: pointer;
            }
        }
    }

</style>

