export class Controls {
  constructor(type) {
    this.forWard = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    switch(type){
      case "KEYS":
        this.addKeyboardListenners();
        break
      case "PNG":
        this.forWard = true;
        break

    }
  }

  addKeyboardListenners() {
    document.onkeydown = (event, e) => {
        
      switch (event.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
          case "ArrowUp":
          this.forWard = true;
          break;
        case "ArrowDown":
          this.reverse = true;
          break;
      }
    };

    document.onkeyup = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp":
          this.forWard = false;
          break;
        case "ArrowDown":
          this.reverse = false;
          break;
      }
    };
  }
}
