
export default function createHTML(): void {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.classList.add('js-game__board');
        canvas.setAttribute('width', '990');
        canvas.setAttribute('height', '500');
        document.body.appendChild(canvas);

        const buttons: string[] = ['js-game__button-play', 'js-game__button-pause', 'js-game__button-clear'];
        buttons.forEach((name: string) => {
            const elem: HTMLButtonElement = document.createElement('button');
            elem.classList.add(name);
            document.body.appendChild(elem);
        });

        const inputs: string[] = ['js-game__input-width', 'js-game__input-height'];
        inputs.forEach((name: string) => {
            const elem: HTMLInputElement = document.createElement('input');
            elem.classList.add(name);
            document.body.appendChild(elem);
        });
}
