<template>
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
</template>
<style lang="scss">
#tech {
    margin-top: 5rem;
}
.tech-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.tech-inner-container {
    display: flex;
    width: 1000px;
    max-width: 80%;
    margin-top: 2rem;
    flex-wrap: wrap;
}
.tech-inner-container .box {
    flex: 1;
    font-size: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 150px;
    min-height: 150px;
}
.box i {
    transition: 0.5s ease-in-out;
}
.box i:hover {
    font-size: 7rem;
    transform: rotate(360deg);
    cursor: pointer;
    -webkit-filter: drop-shadow(1px 1px 1px #fff);
    filter: drop-shadow(1px 1px 1px #fff);
}
.box-one {
    color: #e44d26;
}
.box-two {
    color: #264de4;
}
.box-three {
    color: #f0db4f;
}
.box-four {
    color: #8993be;
}
.box-five {
    color: #00758f;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.box-five span {
    margin-top: 0.2rem;
    font-size: 1rem;
}
.box-six {
    color: #00749c;
}
</style>