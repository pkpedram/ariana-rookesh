type customFilter = {
  id: number;
  title: string;
  actionType: string;
};

export interface FilterState {
  generatedParams: Object;
  hasMore: boolean;
  nextOffset: string;
  orderingList: Array<object>;
  customFilters: {
    products: Array<customFilter>;
  };
}
export interface ContactUsCategory {
  title: string;
  ordering: number;
  isActive: boolean;
  created_date: string;
  __v: number;
  _id: string;
}

export interface PublicState {
  isMobile: boolean;
  isLoading: boolean;
  layoutType: number;
  generalSetting: {
    _id: string;
    title: string;
    en_title: string;
    phoneNumber: string;
    logo: string;
    secondaryColor: string;
    catalog: string;
    aboutUs: string;
    en_aboutUs: string;
    contactUs: string;
    en_contactUs: string;
    email: string;
    address: string;
    en_address: string;
    isActive: true;
    created_date: string;
    __v: number;
  };
  contactUsCategories: Array<ContactUsCategory>;
  lan: boolean;
}

type authors = {
  id: number;
  firstName: string;
  lastName: string;
  type: number;
};

type files = {
  id: number;
  size: number;
  type: number;
  bookId: number;
  sequenceNo: number;
};

export type categories = {
  id: number;
  parent: number;
  title: string;
  slug: string;
};

type rates = {
  value: number;
  count: number;
};

export type bookTypes = {
  id: number;
  name: string;
  price: number;
  beforeOffPrice: number;
};

export type ProductListItem = {
  _id: string;
  _v: number;
  image: string | null;
  name: string;
  en_name: string;
  description: string;
  en_description: string;
  price: string;
  showPrice: boolean;
  relatedCategory: Category;
  isActive: boolean;
  created_date: string;
};

export type ProductInfo = {
  id: number;
  sourceBookId: number;
  title: string;
  hasPhysicalEdition: boolean;
  canonicalId: number;
  description: string;
  htmlDescription: string;
  faqs: string;
  PublisherID: number;
  publisherSlug: string;
  price: number;
  numberOfPages: number;
  rating: number;
  rates: Array<rates>;
  rateDetails: Array<object>;
  types: Array<object>;
  sticker: string;
};

export type Publisher = {
  id: number | string;
  title: string;
};
export type Category = {
  _id: string;
  banner: string;
  icon: string;
  name: string;
  en_name: string;
  showOnHomePage: boolean;
  slug: string;
  showProductPrices: boolean;
  catalog: string | null;
  isActive: boolean;
  created_date: string;
  __v: 0;
};
export interface ProductState {
  productList: Array<ProductListItem | object>;
  productInfo: any;
  relatedProductsList: Array<ProductListItem>;
  ordering: string;
  firstTimeFetching: boolean;
  filteredProducts: Array<ProductListItem>;
  publisherList: Array<Publisher>;
  categories: Array<Category>;
  categoryInfo: Category;
  productImages: Array<Object>;
  productStaticAtts: Array<Object>;
  productAtts: Array<object>;
  productSellers: Array<object>;
}

export type BlogList = {
  _id: string | number;
  title: string;
  en_title: string;
  image: string;
  isActive: boolean;
  created_date: string;
  __v: number;
};

export type BlogInfo = {
  _id: string | number;
  title: string;
  en_title: string;
  image: string;
  isActive: boolean;
  created_date: string;
  __v: number;
};

export interface BlogState {
  blogList:Array<BlogList>,
  blogInfo:BlogInfo | object,
  blogHome:any,
  blogCategoryInfo:any
}
