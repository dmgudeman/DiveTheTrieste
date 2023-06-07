import Ocean from './ocean';
import Sub from './sub';


class CompositeLocation {
    private ocean: Ocean;
    private sub: Sub;
  
    private constructor() {
      this.ocean = Ocean.getInstance();
      this.sub = Sub.getInstance();;
    }
  
    getCompositeX() {
      return this.ocean.getX() + this.sub.getX();
    }
  
    getCompositeY() {
      return this.ocean.getY() + this.sub.getY();
    }
  }