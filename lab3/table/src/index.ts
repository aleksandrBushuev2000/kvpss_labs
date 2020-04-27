import { VerySimpleBootstrapTable } from "./very-simple-bootstrap-table/VerySimpleBootstrapTable";

import './global.sass';

const tableData = [
    ["Dessert", "Calories", "Carbs (g)", "Protein (g)"],
    ["Frozen Yogurt", "159", "6", "24"],   
    ["Eclair", "262", "16", "23"],   
    ["Cupcake", "305", "3.7", "67"],   
    ["Ice cream sandwich", "237", "9", "37"],
    ["KitKat", "518", "26", "65"],  
];

const table = new VerySimpleBootstrapTable(tableData);
table.render(document.getElementById("app"));