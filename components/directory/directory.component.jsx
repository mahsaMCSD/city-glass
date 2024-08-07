import React from "react";
class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      sections: [
        {
          imageUrl: "/image/shahrglass lenzglass.png",
          id: 1,
          column4: "col-md-4",
        },
        {
          imageUrl: "/image/shahrglass mobileglass.png",
          id: 2,
          column4: "col-md-4",
        },
        {
          imageUrl: "/image/shahrglass watchglass.png",
          id: 3,
          column4: "col-md-4",
        },
        {
          imageUrl: "/image/shahrglass iwatchglass.png",
          id: 4,
          column4: "col-md-4",
        },
        {
          imageUrl: "/image/shahrglass redIwatchglass.png",
          id: 5,
          column4: "col-md-4",
        },
        {
          imageUrl: "/image/shahrglass tabletglass.png",
          id: 6,
          column4: "col-md-4",
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.sections.map(({ imageUrl, column4 }, idx) => (
          <div key={idx} className={`${column4} mb-2 col-6`}>
            <img className="img-fluid" src={imageUrl} alt="" />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Directory;
