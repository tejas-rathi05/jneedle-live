export type Product = {
  $id: string;
  imgurl: {
    id: string;
    name: string;
    previewUrl: string;
  }[];
  name: string;
  productCategory: {
    $id: string;
    name: string;
  };
  price: number;
  sku: string;
  archived: boolean;
  featured: boolean;
};


export type NewProductProps = {
  width: number,
  category: string,
  color: string,
  desc: string,
  height: number,
  length: number,
  name: string,
  price: number,
  quantity: number,
  inventory_sku: string,
  images: string,
}


export type UserCartHandlerProps = {
  userId: string,
  productId: string,
  quantity: number,
  product: any
}

export type ProductDetails = {
  $id: string;
  length: number;
  width: number;
  height: number;
  desc: string;
  imgurl: [];
  name: string;
  productCategory: {
    name: string;
  };
  price: number;
  productInventory: [];
};

export type ProductDetailsNotParsed = {
  $id: string;
  length: number;
  width: number;
  height: number;
  desc: string;
  imgurl: string;
  name: string;
  productCategory: {
    name: string;
  };
  price: number;
  productInventory: [];
};

export type ProductCategory = {
  name: string;
  $id: string;
}

export type UserCartItem = {
  userId?: string;
  $id?: string | undefined;
  id?: string;
  product?: ProductDetailsNotParsed;
  productId?: string;
  quantity: number;
  name?: string;
  price?: number;
  imgurl?: [];
}

export type UpdateUserParams = {
  name?: string;
  password?: string;
  mobile_number?: string;
}

export type UpdateUserResponse = {
  $id: string;
  name: string;
  password: string;
  mobile_number: string;
}

export type NewAddressProps = {
  firstName: string,
  lastName: string,
  phone: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  country: string,
  pincode: string,
  isDefault: boolean
}
