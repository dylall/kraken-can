initLottieInteractivity();

async function initLottieInteractivity() {
    try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // The user has enabled reduced motion
            console.log('Do not load Lottie animation');
            return
        } else {
            // The user has not enabled reduced motion
            const scriptsLoaded = await loadLottieScripts();
            console.log(scriptsLoaded); // true

            // add code here to use the Lottie scripts
            defineLottieInteractivity();
        }

    } catch (error) {
        console.error(error);
    }
}

function defineLottieInteractivity() {
    // The createLottieInteractivity The function needs to have 4 parameters: 
    // animationUrl: Lottie Animation URL
    // visibility: Array [start, end]
    //frames:  Array [start from , end at]
    // tagName: Custom element tag name

    // For example
    createLottieInteractivity('https://lottie.host/?file=768b15e8-cdc5-41ab-9038-7bb026a1ea81/FSOeRXA9Lt.json', [0, 1], [0, 48], 'kraken-can');
}

function loadLottieScripts() {
    return new Promise((resolve, reject) => {

        const lottieInteractivityScript = document.createElement('script');
        lottieInteractivityScript.src = 'https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js';

        lottieInteractivityScript.onload = () => {

            const lottiePlayerScript = document.createElement('script');
            lottiePlayerScript.src = 'https://unpkg.com/@lottiefiles/lottie-player@1.5.7/dist/lottie-player.js';

            lottiePlayerScript.onload = () => {
                resolve(true);
            };

            lottiePlayerScript.onerror = () => {
                reject(new Error('Failed to load Lottie Player script.'));
            };

            document.body.appendChild(lottiePlayerScript);
        };

        lottieInteractivityScript.onerror = () => {
            reject(new Error('Failed to load Lottie Interactivity script.'));
        };

        document.body.appendChild(lottieInteractivityScript);
    });
}

async function createLottieInteractivity(animationUrl, visibility, frames, tagName) {
    class LottieOnScroll extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            console.log('Custom element is loaded!');
            const lottiePlayer = document.createElement('lottie-player');
            lottiePlayer.src = animationUrl;
            lottiePlayer.autoplay = false;
            lottiePlayer.loop = true;
            lottiePlayer.id = `lottie-${tagName}`;
            this.appendChild(lottiePlayer);

            lottiePlayer.addEventListener("ready", () => {
                LottieInteractivity.create({
                    player: `#${lottiePlayer.id}`,
                    mode: "scroll",
                    // container: `#${containerSelector}`,
                    actions: [{
                        visibility,
                        type: "seek",
                        frames,
                    }, ]
                });
            });
        }
    }

    customElements.define(tagName, LottieOnScroll);
}
