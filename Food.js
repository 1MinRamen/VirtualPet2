class Food {
    constructor() {
        this.foodStock = 0,
        this.lastFed,
        this.milkBottle = loadImage("images/milk.png")
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    deductFood(){
        if (this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    display(){
        background("pink");
        fill(255,255,254);
        textSize(15);
        if(lastFed>=12){
            text("Last Fed : "+ lastFed%12 + " PM",350,30);
        }else if (lastFed === 0){
            text("Last Fed : 12 AM",350,30);
        }else{
            text("Last Fed : "+ lastFed + " AM", 350 ,30);
        }

        var x = 70, y = 100;
        imageMode(CENTER);
        if (this.foodStock !== 0){
            for (var i = 0; i < this.foodStock; i++){
                if (i%10 === 0){
                    x = 70;
                    y = y + 50;
                }
                image(this.milkBottle,x,y,50,50);
                x = x + 30;
            }
        }
    }
}
