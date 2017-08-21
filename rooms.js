"use strict";
/**
 * Created by Roman on 08.08.2017.
 */
//rooms
/*
export const rooms = [
{
    name: 'livingroom'
},
{
    name: 'kitchen'
},
{
    name: 'bedroom'
},
{
    name: 'bathroom'
},
{
    name: 'playroom'
}


];
*/
exports.single = [
    {
        "name": "Kitchen",
        "value": 8940000
    },
    {
        "name": "Livingroom",
        "value": 5000000
    },
    {
        "name": "Bedroom",
        "value": 7200000
    },
    {
        "name": "Bathroom",
        "value": 3000000
    }
];
/*
export var multi = [
    {
        "name": "Kitchen",
        "series": [
            {
                "name": new Date(2017, 0, 1),
                "value": 23
            },
            {
                "name": new Date(2017, 11, 1),
                "value": 27
            }
        ]
    },

    {
        "name": "Livingroom",
        "series": [
            {
                "name": new Date(2017, 0, 1),
                "value": 24
            },
            {
                "name": new Date(2017, 11, 1),
                "value": 26
            }
        ]
    },

    {
        "name": "Bedroom",
        "series": [
            {
                "name": new Date(2017, 0, 1),
                "value": 21
            },
            {
                "name": new Date(2017, 11, 1),
                "value": 27
            }
        ]
    },
    {
        "name": "Bathroom",
        "series": [
            {
                "name": new Date(2017, 0, 1),
                "value": 23
            },
            {
                "name": new Date(2017, 11, 1),
                "value": 24
            }
        ]
    }
];

*/
/*
export var multi = [
    {
        "name": "Kitchen",
        "series": [
            {
                "name": new Date(2017, 0, 1),
                "value": 0
            },
            {
                "name": new Date(2017, 1, 1),
                "value": 10
            },
            {
                "name": new Date(2017, 2, 1),
                "value": 15
            },
            {
                "name": new Date(2017, 3, 1),
                "value": 25
            },
            {
                "name": new Date(2017, 4, 1),
                "value": 30
            },
            {
                "name": new Date(2017, 5, 1),
                "value": 40
            },
            {
                "name": new Date(2017, 6, 1),
                "value": 45
            },
            {
                "name": new Date(2017, 7, 1),
                "value": 55
            },
            {
                "name": new Date(2017, 8, 1),
                "value": 60
            },
            {
                "name": new Date(2017, 9, 1),
                "value": 70
            },
            {
                "name": new Date(2017, 10, 1),
                "value": 75
            },
            {
                "name": new Date(2017, 11, 1),
                "value": 80
            }
        ]
    }
];
*/
exports.multi = [];
//multi = generateData(2);
/*
export function generateData(seriesRooms: number = 1, dataPoints: number = 12): any[]{
    const results = [];
    const domain: Date[] = [];

    for (let j = 0; j < dataPoints; j++){
        domain.push(new Date(2017, j, 1));
    }

    for (let i = 0; i < seriesRooms; i++){
        const series = {
            name: rooms[i].name,
            series: []
        };

        for (let j = 0; j < domain.length; j++){
            const value = Math.floor(50 + Math.random() * 50); // temperature from 50 to 100.
            const timestamp = domain[j];

            series.series.push({
                value,
                name: timestamp
            });
        }
        results.push(series);
    }

    //console.log(results);
    return results;
}
*/
var Rooms = (function () {
    function Rooms(name) {
        this.name = name;
    }
    return Rooms;
}());
exports.Rooms = Rooms;
//# sourceMappingURL=rooms.js.map