import React from "react";
import { Form } from "react-bootstrap";

class City extends React.Component {
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
        >
          {this.props.data.map((city) => (
            <option
              key={city.id}
              value={city.id}
              defaultValue="انتخاب شهر"
              selected={this.props.selectedId === city.id}
            >
              {city.name}
            </option>
          ))}
        </Form.Control>
      </div>
    );
  }
}
export default City;
