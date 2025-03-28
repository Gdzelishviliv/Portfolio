export { };

declare global {
    interface Window {
        particlesJS: (id: string, options: any) => void;
    }
}
