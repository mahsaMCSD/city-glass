import React, { useState, useEffect } from "react";
import Collapse from "react-bootstrap/Collapse";
import { useDispatch, useSelector } from "react-redux";
import ContentIcon from "../../components/content-icon/content-icon.component";
import Directory from "../../components/directory/directory.component";
import { Row, Col, Button, Tab } from "react-bootstrap";
import API_URL from "../../configurations/environment";
import { getProfile } from "../../redux/user/user.actions";
import {
  editShippingAddress,
  removeItemFromAddress,
} from "../../redux/cart/cart.actions";
import AddressAdd from "../../components/address/addAddress.component";
import AddressEdit from "../../components/address/editAddress.component";
import SideBar from "../../components/sideBar/sideBar.component";
import Metadata from "../../components/seo/metadata";
import axiosInstance from "../../configurations/axiosInstance";
const Profile = () => {
  const userToken = useSelector((state) => state.user.userToken);
  const refreshToken = useSelector((state) => state.user.refreshToken);
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState('');
  const dispatch = useDispatch();
  const handleChange = (newValue) => {
    setOpen(newValue);
  };

  const toggle = idx => () => {
    setOpenEdit(idx)
  }


  useEffect(() => {

    dispatch(getProfile(userToken,refreshToken));


  }, []);
  const onRadioChange = (e) => {
    const editedAddress = shippingAddress.map((address) => {
      if (address.id == e.currentTarget.value) {
        return {
          ...address,
          is_default: true,
        };
      } else {
        return {
          ...address,
          is_default: false,
        };
      }
    });
    dispatch(editShippingAddress([editedAddress]));

    let deepCopyObj = JSON.parse(JSON.stringify(editedAddress));
    let fShippingAddress = deepCopyObj.map(rs => { delete rs['id']; return rs })

    try {
      axiosInstance(userToken, refreshToken, dispatch).get(`${API_URL}/users/self`, {
        method: "put",
        responseType: "stream",
        data: {
          addresses: fShippingAddress,
        }
      })
    }
    catch (ex) {
      console.log(ex)
    }  
  };
  const handleRemove = (id) => {
    let filterd = shippingAddress.filter(
      (address) => address.id == id
    );
      if (filterd[0].is_default !== true) {
       let rShippingAddress = shippingAddress.filter(
          (address) => address.id !== id
        );
        dispatch(removeItemFromAddress([rShippingAddress]));
        let deepCopyObj = JSON.parse(JSON.stringify(rShippingAddress));

        let fShipphingAddress = deepCopyObj.map(rs => { delete rs['id']; return rs })
        try {
          axiosInstance(userToken, refreshToken, dispatch).get(`${API_URL}/users/self`, {
            method: "put",
            responseType: "stream",
            data: {
              addresses: fShipphingAddress,
            }
          })
        }
        catch (ex) {
          console.log(ex)
        }  
     
      }
      else {
        alert('لطفا ابتدا آدرس دیگری رو منتخب نمایید سپس این آدرس را پاک کنید')

      }  
  };

  return (
    <React.Fragment>
      <Metadata title="شهرگلس - مشاهده پروفایل" />;
      <div className="container mx-auto mb-mt-7">
        <Tab.Container id="left-tabs-example">
          <Row className="mb-5">
            <SideBar currentComponent={"address"} />
            <Col sm={8}>
              {shippingAddress !== null &&
                shippingAddress.length > 0 &&
                shippingAddress.map((address, id) => {
                  return (
                    <>
                      <div key={id} className={`custom-control custom-radio p-2`}>
                        <input
                          type="radio"
                          value={address.id}
                          checked={address.is_default ? true : false}
                          onChange={onRadioChange}
                          id="customRadio1"
                          name="customRadio"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label d-block"
                          htmlFor="customRadio1"
                        >
                          <div className="form-group row m-0">
                            <div className="col-md-10">
                              <label htmlFor="name" className="text-secondary">
                                {address.is_default
                                  ? "آدرس منتخب فعال"
                                  : "آدرس منتخب غیرفعال"}
                              </label>
                              <p>{address.postal_address}</p>
                            </div>
                            <div className="d-flex justify-content-around align-items-center col-md-2">
                              <a
                                className="cursor-pointer m-auto d-block text-decoration-none text-center text-muted"
                                onClick={toggle(address.id)}
                                aria-controls="example-collapse-text"
                                aria-expanded={openEdit}
                              >
                                <img src="/image/edit.svg" />
                              </a>

                              <img
                                className="cursor-pointer"
                                onClick={() => handleRemove(address.id)}
                                value={address.id}
                                src="/image/delete.svg"
                                alt=""
                              />
                            </div>
                            <Collapse in={openEdit === address.id}>
                              <div id="example-collapse-text">
                                <AddressEdit
                                  addressId={address.id}
                                  openEdit={openEdit}
                                  onEditChange={toggle()}
                                />
                              </div>
                            </Collapse>
                          </div>
                        </label>
                      </div>
                      <div className="devider-border w-95 m-auto my-3"></div>
                    </>
                  );
                })}
              <>
                <div className="card-body">
                  <a
                    className="cursor-pointer m-auto d-block text-decoration-none text-center text-muted"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    <img src="/image/pin.png" />
                    <p>افزودن آدرس</p>
                  </a>
                  <Collapse in={open}>
                    <div id="example-collapse-text">
                      <AddressAdd open={open} onChange={handleChange} />
                    </div>
                  </Collapse>
                </div>
              </>
            </Col>
            <Col sm={2} className="h-100 overflow-hidden d-none d-sm-block">
              <img
                className="img-fluid"
                src="/image/shahrglass-profile-panner.svg"
                alt=""
              />
            </Col>
          </Row>
        </Tab.Container>
        {/* BEST SELLER */}
        <div className="content-box mb-5">
          <h3 className="text-center mb-5">محصولات پرفروش</h3>
          <div className="row py-5 px-2">
            <Directory />
          </div>
        </div>
        {/* SECURITY CUSTOMER */}
        <div className="security_customer my-5 half-opacity">
          <ContentIcon />
        </div>

      </div>
    </React.Fragment>
  );
};
export default Profile;
