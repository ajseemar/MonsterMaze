class Game {
    constructor(size, rm) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        // this.canvas.width = window.innerWidth;
        // this.canvas.height = window.innerHeight;
        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('orientationchange', this.resize.bind(this), false);
        this.resize();
    }

    resize() {
        const ratio = 16 / 9;
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        // if (c.width > c.height / ratio) c.width = c.height * ratio;
        // else if (c.height > c.width / ration) c.height = c.width * ratio;
        this.width = c.width;
        this.height = c.height;
        // const widthToHeight = 4 / 3;
        // let width = window.innerWidth - 5;
        // let height = window.innerHeight - 5;
        // this.canvas.width = width;
        // this.canvas.height = height;
        // const fwidthToHeight = width / height;

        // const gameContent = document.getElementById('main-content');
        // // debugger
        // if (fwidthToHeight > widthToHeight) {
        //     width = height * widthToHeight;
        //     gameContent.style.height = height + 'px';
        //     gameContent.style.width = width + 'px';
        // } else {
        //     height = width / widthToHeight;
        //     gameContent.style.height = height + 'px';
        //     gameContent.style.width = width + 'px';
        // }

        // gameContent.style.marginTop = (-height / 2) + 'px';
        // gameContent.style.marginLeft = (-width / 2) + 'px';

        // this.canvas.width = innerWidth;
        // this.canvas.height = innerHeight;
    }

    update() {

    }

    render() {

    }
}

module.exports = Game;