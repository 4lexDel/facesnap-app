export class FaceSnap {
    id!:number;
    title!:string;
    description!:string;
    createdDate!:Date;
    snaps!:number;
    imageURL!:string;
    location?:string;
  
    constructor(id:number,title:string,description:string,createdDate:Date,snaps:number,imageURL:string, location:string){
      this.id=id;
      this.title = title;
      this.description = description;
      this.createdDate = createdDate;
      this.snaps = snaps;
      this.imageURL = imageURL;
      this.location = location;
    }
}