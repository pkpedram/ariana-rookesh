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
  id: number;
  title: string;
  sourceBookId: number;
  hasPhysicalEdition: boolean;
  canonicalId: number;
  subtitle: string;
  description: string;
  htmlDescription: string;
  PublisherID: number;
  publisherSlug: string;
  price: number;
  numberOfPages: number;
  rating: number;
  rates: Array<rates>;
  rateDetails: Array<object>;
  types: Array<bookTypes>;
  sticker: string;
  beforeOffPrice: number;
  offText: string;
  priceColor: string;
  isRtl: boolean;
  showOverlay: boolean;
  PhysicalPrice: number;
  physicalBeforeOffPrice: number;
  ISBN: string;
  publishDate: string;
  destination: number;
  type: string;
  coverUri: string;
  shareUri: string;
  shareText: string;
  publisher: string;
  authors: Array<authors>;
  files: Array<files>;
  labels: Array<object>;
  categories: Array<categories>;
  subscriptionAvailable: boolean;
  state: number;
  encrypted: boolean;
  currencyPrice: number;
  currencyBeforeOffPrice: number;
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
  productList: Array<ProductListItem>;
  productInfo: ProductListItem;
  relatedProductsList: Array<ProductListItem>;
  ordering: string;
  firstTimeFetching: boolean;
  filteredProducts: Array<ProductListItem>;
  publisherList: Array<Publisher>;
  categories: Array<Category>;
}
