import { Purchase } from "./purchase";

export class Article{
    sn_article?:number;
    name_article="";
    description_article="";
    type_article="";
    price_article?:number;
    po_purchase?:number;
    purchase?:Purchase;

    
}