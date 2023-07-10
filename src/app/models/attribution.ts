import { Article } from "./article";
import { User } from "./user";
import { Purchase } from "./purchase";

export class Attribution{
    id_attribution?:number;
    sn_article?:number | null;
    article?: Article |null;
    id_user?:number |null;
     user?: User;
     po_purchase?:number | null;
     purchase?: Purchase |null;
     comment_attribution="";
     status_attribution="";
     
    
   
    date_attribution?:Date;
    
}