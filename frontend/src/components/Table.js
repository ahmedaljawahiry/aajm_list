import React from "react";
import Item from "./Item";
import ItemForm from "./forms/ItemForm";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.sort = this.sort.bind(this);
        this.addItem = this.addItem.bind(this);
        this.state = {
            data: this.props.items,
        };
    }

    componentDidMount() {
        this.sort();
    }

    sort(updatedItem) {
        let data = this.state.data;

        if (updatedItem) {
            const itemIndex = data.findIndex(item => item['id'] === updatedItem['id']);
            if (itemIndex !== -1) {
                data.splice(itemIndex, 1, updatedItem);
            }
        }

        data.sort(function (item_1, item_2) {
            return item_1['is_checked'] - item_2['is_checked'] // false values first
        });
        this.setState({data: data});
    }

    addItem(newItem) {
        this.state.data.push(newItem);
        this.sort();
    }

    render() {
        const items = this.state.data;
        return <div>
            <table className="table is-striped is-narrow">
                <thead>
                <tr>
                    <th>name</th>
                    <th>quantity</th>
                    <th>who</th>
                    <th>when</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                   <td colSpan={6} className="has-text-centered">
                       <ItemForm listId={this.props.listId} updateParent={this.addItem}></ItemForm>
                   </td>
                </tr>
                {items.map(item => <Item key={item['id']} item={item} updateTable={this.sort} />)}
            </tbody>
            </table>
        </div>;
    }
}

export default Table;