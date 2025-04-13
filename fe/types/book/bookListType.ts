interface BookModel {
  _id?:string
  title:string,
  location:string,
  totalRoom:string,
  price:string,
  description:string,
  slug:string,
  images:[]|undefined
  roomFacilities:{
      bedroom:{
          active:string,
          value:number
      },
      livingRoom:{
          active:string,
          value:number
      },
      bathroom:{
          active:string,
          value:number
      },
      diningRoom:{
          active:string,
          value:number
      },
      wifiSpeed:{
          active:string,
          value:number
      },
      unityReady:{
          active:string,
          value:number
      },
      refrigerator:{
          active:string,
          value:number
      },
      tv:{
          active:string,
          value:number
      },
  }
}

interface multiDeleteBookModel{
    ids:string[]
}

interface searchBookModel{
    searchText:string
}