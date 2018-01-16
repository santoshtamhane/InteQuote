import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
/**
 * Generated class for the UniquePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'unique',
})
export class UniquePipe implements PipeTransform {
  /**
   * Takes a array and makes it unique.
   */
  transform(value: any,sortby:string): any{
        if(value!== undefined && value!== null){
            return _.uniqBy(value, sortby);
        }
        return value;
    }
}
