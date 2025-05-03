export interface BookModel {
  title: string;
  location: string;
  totalRoom: string;
  roomCapacity:number;
  price: string;
  images: string[];
  slug: string;
  description: string;
  roomFacilities: {
    bedroom: {
      active: boolean;
      value: number;
    };
    livingRoom: {
      active: boolean;
      value: number;
    };
    bathroom: {
      active: boolean;
      value: number;
    };
    diningRoom: {
      active: boolean;
      value: number;
    };
    wifiSpeed: {
      active: boolean;
      value: number;
    };
    unityReady: {
      active: boolean;
      value: number;
    };
    refrigerator: {
      active: boolean;
      value: number;
    };
    tv: {
      active: boolean;
      value: number;
    };
  };
}
