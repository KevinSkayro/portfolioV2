<template>
    <section id="about">
        <div class="section-container">
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
                <img title="People vector" src="@src/images/2590505.png" alt="Vector of person programming" />
            </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss">
.about-container {
    transform: skewY(5deg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        margin-bottom: 1rem;
        max-width: 600px;
        text-align: center;
        font-size: 1.2rem;
        line-height: 1.7rem;
    }
}

.about-container h2,
.tech-container h2,
.projects-container h2,
.contact-container h2 {
    font-size: 3rem;
    text-align: center;
    line-height: 3rem;
}
.about-inner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    width: 1000px;
    max-width: 80%;
    h3 {
        font-size: 2rem;
        text-align: center;
        line-height: 2.5rem;
        margin-bottom: 1rem;
    }
    img {
        width: 100%;
    }
}
.about-content {
    flex: 1;
    padding: 2rem;
}
</style>