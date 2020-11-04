import { Component, OnInit, ViewChild } from '@angular/core';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  //GetElementById here is viewchild decorator
  @ViewChild("board",{static : false}) myCanvas;
  topText:string = "";
  bottomText:string = "";
  fileEve:any;
  _textColor:string = "#00FFFFFF"; 
  _bgColor:string = "#faf6f0";
  constructor() { }

  ngOnInit(): void {
  }
  displayPic(e:any){
    this.fileEve = e;
    //Getting canvas element to draw image on canvas;
    let canvas = this.myCanvas.nativeElement;
    //console.log(canvas);
    let ctx = canvas.getContext("2d");
    //console.log(ctx); 
    let render = new FileReader();
    render.readAsDataURL(e.target.files[0]);
    render.onload = (eve)=>{
      const img = new Image();
      img.src = eve.target.result as string;
      img.onload = ()=>{
        ctx.drawImage(img,25,100,450,450);
      }
    }
    
  }
  drawText(){
    let canvas = this.myCanvas.nativeElement;
    //console.log(canvas);
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = this._bgColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = this._textColor;
    ctx.font = "20px Itim "
    ctx.textAlign = "center";
    ctx.fillText(this.topText,canvas.width/2,70);
    ctx.fillText(this.bottomText,canvas.width/2,585);
    this.displayPic(this.fileEve);    
    
  }
  textColor($event:ColorEvent){
    this._textColor = $event.color.hex;
    this.drawText();
  }
  bgColor($event:ColorEvent){
    this._bgColor = $event.color.hex;
    this.drawText();
  }
  download(){
    let canvas = this.myCanvas.nativeElement;
    let image = canvas.toDataURL("image/png");
    let link = document.createElement('a');
    link.download = 'meme.png';
    link.href = image;
    link.click();
  }
}
