import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "sort"
})
export class SortPipe implements PipeTransform {
    transform(items: any, args: string[]): any {
        return items.sort(function (a, b) {
            if (a.score < b.score) {
                return 1;
            }
            if (a.score > b.score) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
    }
}