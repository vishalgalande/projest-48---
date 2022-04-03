class Bullet{
    constructor(x,y,angle){

        this.positionX = x;
        this.positionY = y;
        this.angle = angle;

        this.speed = 1;
        this.r = 1;
    }


    display()
    {
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);

        push();
        noStroke();
        fill(15);
        ellipse(this.x, this.y, this.r*2, this.r*2);	
        pop();

    }


}