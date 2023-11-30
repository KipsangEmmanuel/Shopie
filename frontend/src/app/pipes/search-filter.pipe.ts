import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform( products: Product[], product_name: string): Product[] {
    if(!products || product_name==''){
              return products
            };
            const filtered: Product[]=[];
            for(let product of products){
              if(product.product_name.toLowerCase().includes(product_name.toLowerCase())){
                filtered.push(product)
              }
            }
            return filtered;
  }

}


// import { Pipe, PipeTransform } from '@angular/core';
// import { Product } from '../interfaces/product';

// @Pipe({
//   name: 'search'
// })
// export class SearchPipe implements PipeTransform {

//   transform( products: Product[], name: string): Product[]{
//     if(!products || name==''){
//       return products
//     };
//     const filtered: Product[]=[];
//     for(let product of products){
//       if(product.name.toLowerCase().includes(name.toLowerCase())){
//         filtered.push(product)
//       }
//     }
//     return filtered;
//   }

// }


// <div class="flex text-gray-900 ems-center space-x-4">
//       <input   [(ngModel)]="filter"
//         type="text"
//         placeholder="Search..."
//         class="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
//       />
//       <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//         Search
//       </button>
//     </div>