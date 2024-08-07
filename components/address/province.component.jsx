import React from "react";
import { Form } from "react-bootstrap";

class Province extends React.Component {
  onSelect = (event) => {
    this.props.onSelect(parseInt(event.target.value));
  };
  render() {
    return (
      <div>
        <Form.Control
          as="select"
          defaultValue="Choose..."
          onChange={this.onSelect}
          required
        >
          {this.props.data.map((prov) => (
            <option
              key={prov.id}
              value={prov.id}
              defaultValue="انتخاب استان"
              selected={this.props.selectedId === prov.id}
              required
            >
              {prov.name}
            </option>
          ))}
        </Form.Control>
      </div>
    );
  }
}
export default Province;
