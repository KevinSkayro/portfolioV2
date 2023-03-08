<template>
    <div class="menu_container">
        <menu class="menu">
        
            <RouterLink to="/projects" class="menu_item" style="--bgColorItem: #f54888;" >
                <svg class="icon" 
                viewBox="0 0 32 32">
            <path class="st0" d="M26,27H6c-1.1,0-2-0.9-2-2V12c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v13C28,26.1,27.1,27,26,27z"/>
            <path class="st0" d="M22.6,18H9.4c-3,0-5.4-2.4-5.4-5.4V12c0-1.1,0.9-2,2-2h20c1.1,0,2,0.9,2,2v0.6C28,15.6,25.6,18,22.6,18z"/>
            <line class="st0" x1="10" y1="20" x2="10" y2="18"/>
            <line class="st0" x1="22" y1="20" x2="22" y2="18"/>
            <path class="st0" d="M9.3,10c0.9-2.9,3.5-5,6.7-5c3.2,0,5.8,2.1,6.7,5"/>
            </svg>

            </RouterLink>

            <button class="menu_item" style="--bgColorItem: #4343f5;" >
                <svg viewBox="0 0 24 24" class="icon">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
            </button>

            <a href="/" class="menu_item active" style="--bgColorItem: #ff8c00;" >
                <svg viewBox="0 0 24 24" class="icon">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </a>

            <button class="menu_item" style="--bgColorItem: #e0b115;" > 
                <svg  viewBox="0 0 24 24" class="icon">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </button>

            <button class="menu_item" style="--bgColorItem:#65ddb7;">
                <svg viewBox="0 0 24 24" class="icon">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            </button>

            <div class="menu_border"></div>

        </menu>
    </div>
    <div class="svg-container">
        <svg viewBox="0 0 202.9 45.5" >
        <clipPath id="menu" clipPathUnits="objectBoundingBox" transform="scale(0.0049285362247413 0.021978021978022)">
            <path  d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
            c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
            c9.2,3.6,17.6,4.2,23.3,4H6.7z"/>
        </clipPath>
        </svg>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
    mounted() {
        // Original designed by: Mauricio Bucardo
        // Original image: https://dribbble.com/shots/5619509-Animated-Tab-Bar

        const menu = document.querySelector(".menu_container .menu")
        const menuItems = menu.querySelectorAll(".menu_item")
        const menuBorder = menu.querySelector(".menu_border")
        let activeItem = menu.querySelector(".active")

        function clickItem(item, index) {

            menu.style.removeProperty("--timeOut")
            
            if (activeItem == item) return
            
            if (activeItem) {
                activeItem.classList.remove("active")
            }
            
            item.classList.add("active")
            activeItem = item
            offsetMenuBorder(activeItem, menuBorder)
            
        }

        function offsetMenuBorder(element, menuBorder) {

            const offsetActiveItem = element.getBoundingClientRect();
            const left = Math.floor(offsetActiveItem.left - menu.offsetLeft - (menuBorder.offsetWidth  - offsetActiveItem.width) / 2) +  "px"
            menuBorder.style.transform = `translate3d(${left}, 0 , 0)`

        }

        offsetMenuBorder(activeItem, menuBorder)

        menuItems.forEach((item, index) => {

            item.addEventListener("click", () => clickItem(item, index))
            
        })

        window.addEventListener("resize", () => {
            offsetMenuBorder(activeItem, menuBorder)
            menu.style.setProperty("--timeOut", "none")
        })
    }
}
</script>

<style >
html {

    box-sizing: border-box;
    --bgColorMenu : #1d1d27;
    --duration: .7s;    

}

html *,
html *::before,
html *::after {

    box-sizing: inherit;

}

.menu_container {
    display: flex;
    justify-content: center;
}

.menu{
    margin: 0;
    display: flex;
    /* Works well with 100% width  */
    width: 32.05em;
    font-size: 1.2em;
    padding: 0 2.85em;
    position: absolute;
    bottom: 10px;
    align-items: center;
    justify-content: center;
    background-color: var(--bgColorMenu);
    border-radius: 1em;
}

.menu_item{
    
    all: unset;
    flex-grow: 1;
    z-index: 100;
    display: flex;
    cursor: pointer;
    position: relative;
    border-radius: 50%;
    align-items: center;
    will-change: transform;
    justify-content: center;
    padding: 0.55em 0 0.85em;
    transition: transform var(--timeOut , var(--duration));
    
}

.menu_item::before{
    
    content: "";
    z-index: -1;
    width: 4.2em;
    height: 4.2em;
    border-radius: 50%;
    position: absolute;
    transform: scale(0);
    transition: background-color var(--duration), transform var(--duration);
    
}


.menu_item.active {

    transform: translate3d(0, -.8em , 0);

}

.menu_item.active::before{
    
    transform: scale(1);
    background-color: var(--bgColorItem);

}

.icon{
    
    width: 2.6em;
    height: 2.6em;
    stroke: white;
    fill: transparent;
    stroke-width: 1pt;
    stroke-miterlimit: 10;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 400;
    
}

.menu_item.active .icon {

    animation: strok 1.5s reverse;
    
}

@keyframes strok {

    100% {

        stroke-dashoffset: 400;

    }

}

.menu_border{

    left: 0;
    bottom: 99%;
    width: 10.9em;
    height: 2.4em;
    position: absolute;
    clip-path: url(#menu);
    will-change: transform;
    background-color: var(--bgColorMenu);
    transition: transform var(--timeOut , var(--duration));
    
}

.svg-container {

    width: 0;
    height: 0;
}


@media screen and (max-width: 50em) {
    .menu{
        font-size: .8em;
    }
}
</style>