import { VerySimpleBootstrapTable } from "./core/components/table/very-simple-bootstrap-table/VerySimpleBootstrapTable";

const tableData = [
    ["Dessert", "Calories", "Carbs (g)", "Protein (g)"],
    ["Frozen Yogurt", "159", "6", "24"],   
    ["Eclair", "262", "16", "23"],   
    ["Cupcake", "305", "3.7", "67"],   
    ["Ice cream sandwich", "237", "9", "37"],
    ["KitKat", "518", "26", "65"],  
];

const table = new VerySimpleBootstrapTable(tableData);

export default {
    instance : table
}