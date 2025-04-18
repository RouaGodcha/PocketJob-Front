import { animate, style, transition, trigger } from '@angular/animations';
export const slideInOutAnimation = [
    trigger('filter-animation', [
        transition(':enter', [
            style({
                'height': '{{heightEnter}}',
                'opacity': '0',
                'width' :'{{widthEnter}}'
            }),
            animate('{{timeIn}}', style({
                'height': '{{heightLeave}}',
                'opacity': '1',
                'width' :'{{widthLeave}}'
            }))    
        ],{ params: { heightEnter:'auto', widthEnter:'auto', timeIn:'200ms', heightLeave:'auto', widthLeave:'auto' } }),
        transition(':leave', [ 
            animate('{{timeOut}}', style({
                'height': '{{heightOut}}',
                'opacity': '0',
                'margin-top': '{{marginTop}}',
                'width':'{{widthOut}}'
            },)),                 
        ],{ params: { widthOut:'auto', heightOut:'auto', timeOut:'200ms',marginTop :'0' } }),    
    ]),
    
]
