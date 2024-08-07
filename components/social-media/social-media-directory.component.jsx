import React from "react";

import MenuItem from "../menu-item/menu-item.component";

class SocialMediaDirectory extends React.Component {
  constructor() {
    super();
    this.state = {
      sections: [
        {
          imageUrl: "../image/shahr glass Post012.png",
          id: 1,
        },
        {
          imageUrl: "../image/shahr glass Post001.png",
          id: 2,
        },
        {
          imageUrl: "../image/shahr-glass-Post003.png",
          id: 3,
        },
        {
          imageUrl: "../image/shahr glass Post004.png",
          id: 4,
        },
        {
          imageUrl: "../image/Shahr Glass Instagram Cover 02.png",
          id: 5,
        },
        {
          imageUrl: "../image/Shahr Glass Post005.png",
          id: 6,
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.sections.map(({ id, ...otherSectionProps }) => (
          <div key={id} className="col-md-4 col-6 mb-4">
            <MenuItem key={id} {...otherSectionProps} />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default SocialMediaDirectory;
