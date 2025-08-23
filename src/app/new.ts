"use strict"
let user={name:"nbigga"};
console.log(user.name);
let name1: string="newname";
const thlo:string="no way this shit is real";
console.log(name1);
let no:number=2;
console.log(no+name1);
function newone(name:String,num:number) :  number{
    return num+2;
}
type user={
    readonly id:number;
    name:string;
    credit?:number
}
type newone=user &{
    nig:string;
}
const newarr :string[]=[];
for (let int = 0; int < 10 ; int++) {
    newarr[int]="helo"; 
}
console.log(newarr);
const new2: Array<number> =[];
let firstnoe:boolean|number=22;
firstnoe=false;
const arr: Array<string|number>=[];
for(let i=0;i<10;i++){
    if(i%2==0){
        arr.push("hello")
    }
    else{
        arr.push(123)
    }
}
console.log(arr);
const tup:[string,number,boolean]=["hello",2,true];;
 const enum nofnig{
    nigga1,
    nigg2,
    nigga3    
}
interface fuckass{
    email:string,
    code:number,
    isgay:boolean
}
interface newfuckass extends fuckass{
    isnotgay: "notgay" | "maybegay"
}
let newass:newfuckass={
    email:"hellowrold",
    code:2,
    isgay:false,
    isnotgay:"notgay"
}
class Fk{
    name:string
    protected email:string
    private nigga:number
    constructor(email:string,name:string){
        this.email=email;
        this.name=name;
        this.nigga=2
    }

}
class fk2 extends Fk{
    newname:string;
    constructor(nnig:string){
        super("hajsd","kjfhsadkljf");
        this.newname=nnig
    }
}
const new12= new Fk("hello","nigga");
interface nforop{
    name:string,
    enail:string,
    nigga:number
}
class anotheerone implements nforop{
    
    constructor( public name:string, public enail:string,public nigga :number){
        
    }
}
const newfunciton=<t>(number:t[]):t{
    return number[0];
}
function identtity<type,>(arg:type[]):type{
    return arg[0];
}

export{}