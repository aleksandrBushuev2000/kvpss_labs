import { VerySimpleBootstrapTableException } from "./VerySimpleBootstrapTableException";

export class VerySimpleBootstrapTable {
    private data : Array<Array<string>>;

    private BAD_SHAPE_MESSAGE = "Data Array should have 1 or more rows and each rows should have equal length";

    private BOOTSTRAP_TABLE_CLASS_LIST = "table table-bordered table-striped";

    private isRendered : boolean;
    private renderedNode : HTMLElement;

    constructor(data : Array<Array<string>>) {
        this.data = data;
        this.checkShape();
    }

    private checkShape() : void {
        if (!this.data.length || !this.data[0].length) {
            throw new VerySimpleBootstrapTableException(this.BAD_SHAPE_MESSAGE);
        }
        let canonicalShape = this.data[0].length;

        for (let i = 1; i < this.data.length; i++) {
            if (this.data[i]) {
                if (this.data[i].length != canonicalShape) {
                    throw new VerySimpleBootstrapTableException(this.BAD_SHAPE_MESSAGE);
                }
            } else {
                throw new VerySimpleBootstrapTableException(this.BAD_SHAPE_MESSAGE);
            }
        }     
    }

    makeHeader() : HTMLTableSectionElement {
        let head = document.createElement('thead');
        head.append(this.makeRow(0));
        return head;
    }

    makeRow(index : number) : HTMLTableRowElement {
        let row = document.createElement('tr');
        let cells : Array<HTMLTableCellElement> = this.data[index].map(el => this.makeCell(el));
        row.append(...cells);
        return row;
    }

    makeCell(data : string) : HTMLTableCellElement {
        let cell = document.createElement('td');
        cell.innerHTML = data;
        return cell;
    }

    makeBody() : HTMLTableSectionElement {
        let body = document.createElement('tbody');
        for (let i = 1; i < this.data.length; i++) {
            let row = this.makeRow(i);
            body.append(row);
        }
        return body;
    }

    makeNode() : HTMLElement {
        let table = document.createElement("table");
        table.className = this.BOOTSTRAP_TABLE_CLASS_LIST;
        table.append(this.makeHeader());
        table.append(this.makeBody());
        return table;
    }

    render(parent : HTMLElement) : void {
        if (!this.isRendered) {
            let node = this.makeNode();
            this.renderedNode = node;
            parent.append(node);
            this.isRendered = true;
        }
    }

    removeNode() : void {
        this.renderedNode.remove();
    }

    destroy() : void {
        if (this.isRendered) {
            this.removeNode();
        }
    }
}

