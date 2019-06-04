import { PipeTransform, Pipe } from '@angular/core';
import { Correo } from '../models/correo';

@Pipe({
    name: 'callback',
})
export class CallbackPipe implements PipeTransform {
    transform(values: any[], args?: any): any {
        return values.filter((item) => item.admin_id);
    }
}