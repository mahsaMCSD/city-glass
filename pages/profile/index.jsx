import React, { useState, useEffect } from "react";
import Collapse from "react-bootstrap/Collapse";
import { useDispatch, useSelector } from "react-redux";
import ContentIcon from "../../components/content-icon/content-icon.component";
import Directory from "../../components/directory/directory.component";
import { Form, Tab, Row, Col } from "react-bootstrap";
import { getProfile } from "../../redux/user/user.actions";
import AddressAdd from "../../components/address/addAddress.component";
import AddressEdit from "../../components/address/editAddress.component";
import SideBar from "../../components/sideBar/sideBar.component";
import Metadata from "../../components/seo/metadata";
import axiosInstance from "../../configurations/axiosInstance";
import API_URL from './../../configurations/environment';

const Profile = (props) => {
  const user = useSelector((state) => state.user.userInfo);
  const userToken=useSelector((state) => state.user.userToken);
  const refreshToken = useSelector((state) => state.user.refreshToken);
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const [fullname, setFullname] = useState(
    user !== undefined ? user.first_name : null
  );
  const [readOnly, setReadonly] = useState(true);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const tAddress = shippingAddress.filter((address) => {
    return address.is_default == true;
  });
  const handleChange = (newValue) => {
    setOpen(newValue);
  };
  const handleEditChange = (nValue) => {
    setOpenEdit(nValue);
  };

  
  useEffect(() => {
    if(!loading){

      dispatch(getProfile(userToken,refreshToken));
      setLoading(false)
    }

  });

  // USERNAME EDIT
  const handleSubmit = async () => {
    setReadonly(false);
    try {
      await axiosInstance(userToken,refreshToken,dispatch)
        .get(`${API_URL}/users/self`,{
          method: "put",
          data: { first_name: fullname },
          responseType: "stream"
        })
      
    } catch (ex) {
      console.log(ex);
    }

  };
  return (
    <React.Fragment>
      <Metadata title="شهرگلس - ویرایش آدرس" />;
      <div className="container mx-auto mb-mt-7">
        <Tab.Container id="left-tabs-example">
          <Row className="mb-5">
            <SideBar currentComponent={"profile"} />
            <Col sm={8}>
              <div className="card-body row">
                <Form className="col-md-6 border-left">
                  <div className="form-group row">
                    <Form.Group controlId="receiver">
                      <Form.Label column="lg">نام و نام خانوادگی</Form.Label>
                      <Col lg={9}>
                        <Form.Control
                          size="lg"
                          type="text"
                          readOnly={readOnly}
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                        />
                      </Col>
                    </Form.Group>
                    {readOnly ? (
                      <a
                        onClick={setReadonly(false)}
                        className="cursor-pointer d-flex text-muted text-decoration-none justify-content-end"
                      >
                        <img width="16" src="/image/edit.svg" alt="" />
                        ویرایش
                      </a>
                    ) : (
                      <a
                        onClick={handleSubmit}
                        className="cursor-pointer d-flex text-muted text-decoration-none justify-content-end"
                      >
                        ذخیره
                      </a>
                    )}
                  </div>

                  <Form.Group controlId="receiver">
                    <Form.Label column="lg">شماره تماس</Form.Label>
                    <Col lg={9}>
                      <Form.Control
                        size="lg"
                        type="text"
                        readOnly
                        value={user !== undefined ? user.phone : null}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <div className="devider-border w-95 m-auto my-3"></div>
                </Form>
                <Form className="col-md-6">
                  <div className="form-group row">
                    <label htmlFor="name" className="text-secondary">
                      آدرس منتخب فعال
                    </label>
                    {shippingAddress.length > 0 && tAddress.length > 0 ? (
                      <>
                        <p className="mb-0">{tAddress[0].postal_address}</p>

                        <a
                          className="cursor-pointer mb-3 m-auto d-block text-decoration-none text-center text-muted"
                          onClick={() => setOpenEdit(!openEdit)}
                          aria-controls="example-collapse-text"
                          aria-expanded={openEdit}
                        >
                          <img src="/image/edit.svg" />
                        </a>
                        <Collapse in={openEdit}>
                          <div id="example-collapse-text">
                            <AddressEdit
                              addressId={tAddress[0].id}
                              openEdit={openEdit}
                              onEditChange={handleEditChange}
                            />
                          </div>
                        </Collapse>
            
                      </>
                    ) : (
                      <div
                        className="card mb-4 border-less"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <div className="card-body m-auto d-flex">
                          <a
                            className="cursor-pointer m-auto d-block text-decoration-none text-center text-muted"
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                          >
                            <img src="/image/pin.png" />
                            <p>افزودن آدرس</p>
                          </a>
                        </div>
                        <Collapse in={open}>
                          <div id="example-collapse-text">
                            <AddressAdd open={open} onChange={handleChange} />
                          </div>
                        </Collapse>
                      </div>
                    )}
                  </div>
                </Form>
              </div>
              <div className="card-body row d-none d-sm-block">
                <label htmlFor="name" className="text-secondary">
                  آخرین وضعبت مرسوله خریداری شده
                </label>
                <div className="d-flex" style={{ height: "10rem" }}></div>
              </div>
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
