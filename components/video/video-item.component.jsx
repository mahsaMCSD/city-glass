import React from "react";

const VideoItem = ({ embedId,padding }) => (

    <div className="h_iframe-aparat_embed_frame sh-video" id="sh-video">
      <span style={{display: 'block',paddingTop: `${padding}%`}}></span>
      <iframe      
        src={`https://www.aparat.com/video/video/embed/videohash/${embedId}/vt/frame?&recom=none`}
        title="مراحل آموزش نصب گلس فول:"
        allowFullScreen={true}
        webkitallowfullscreen={"true"}
        mozallowfullscreen={"true"}
      ></iframe>
    </div>
  
);
export default VideoItem;




