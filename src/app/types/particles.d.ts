export { };

declare global {
    interface ParticleJSOptions {
        particles: {
            number: {
                value: number;
                density?: {
                    enable: boolean;
                    value_area: number;
                };
            };
            size: {
                value: number;
                random: boolean;
                anim: {
                    enable: boolean;
                    speed: number;
                    size_min: number;
                    sync: boolean;
                };
            };
            move?: {
                speed: number;
                direction?: string;
                enable: boolean;
                random: boolean;
                straight: boolean;
                out_mode: string;
                bounce: boolean;
                attract: {
                    enable: boolean;
                    rotateX: number;
                    rotateY: number;
                };
            };
            line_linked?: {
                enable: boolean;
                distance: number;
                color: string;
                opacity: number;
                width: number;
            };
            opacity?: {
                value: number;
                random: boolean;
                anim: {
                    enable: boolean;
                    speed: number;
                    opacity_min: number;
                    sync: boolean;
                };
            };
            shape?: {
                type: string;
                stroke?: {
                    width: number;
                    color: string;
                };
                polygon?: {
                    nb_sides: number;
                };
                image?: {
                    src: string;
                    width: number;
                    height: number;
                };
            };
            color?: {
                value: string;
            };
        };
        interactivity?: {
            detect_on: string;
            events: {
                onhover: {
                    enable: boolean;
                    mode: string;
                };
                onclick: {
                    enable: boolean;
                    mode: string;
                };
                resize: boolean;
            };
            modes: {
                grab?: {
                    distance: number;
                    line_linked: {
                        opacity: number;
                    };
                };
                bubble?: {
                    distance: number;
                    size: number;
                    duration: number;
                    opacity: number;
                    speed: number;
                };
                repulse?: {
                    distance: number;
                    duration: number;
                };
                push?: {
                    particles_nb: number;
                };
                remove?: {
                    particles_nb: number;
                };
            };
        };
        retina_detect: boolean;
    }

    interface Window {
        particlesJS: (id: string, options: ParticleJSOptions) => void;
    }
}