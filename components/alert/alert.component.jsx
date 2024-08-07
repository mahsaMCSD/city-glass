import { useState } from "react";
import { Alert } from "react-bootstrap";

const AlertMessage=({colorAlert,contentAlert,customClass})=>{
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert className={customClass?customClass:""} variant={colorAlert} onClose={() => setShow(false)} dismissible>
          <p>
           {contentAlert}
          </p>
        </Alert>
      );
    }
    return null
  }
  export default AlertMessage