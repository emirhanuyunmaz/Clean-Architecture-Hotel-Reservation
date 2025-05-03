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
          active:boolean,
          value:number
      },
      livingRoom:{
          active:boolean,
          value:number
      },
      bathroom:{
          active:boolean,
          value:number
      },
      diningRoom:{
          active:boolean,
          value:number
      },
      wifiSpeed:{
          active:boolean,
          value:number
      },
      unityReady:{
          active:boolean,
          value:number
      },
      refrigerator:{
          active:boolean,
          value:number
      },
      tv:{
          active:boolean,
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

interface userBookModel {
    _id:string,
    bookID:{_id: string, images: [], price: string, title: string,location:string},
    startDay:string,
    endDay:string,
    isPayment:boolean,
    totalPrice:number
}