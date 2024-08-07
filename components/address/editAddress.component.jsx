import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Button, Row, Tab } from "react-bootstrap";
import Province from "../../components/address/province.component";
import City from "../../components/address/city.component";
import PROVINCES from "../../components/checkout/province.data";
import CITIES from "../../components/checkout/cities.data";
import { editShippingAddress } from "../../redux/cart/cart.actions";
import API_URL from "../../configurations/environment";
import axiosInstance from "../../configurations/axiosInstance";
const data = {
  provinces: PROVINCES,
  cities: CITIES,
};
const AddressEdit = (props) => {
  const userToken = useSelector((state) => state.user.userToken);
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const dispatch = useDispatch();
  const editAddress = shippingAddress.filter((address) => {
    return address.id == props.addressId;
  });
  const [receiver, setReceiver] = useState(editAddress[0] && editAddress[0].receiver);
  const [receiver_phone, setReceiver_phone] = useState(
    editAddress[0] && editAddress[0].receiver_phone
  );
  const [provinces, setProvinces] = useState(data.provinces);
  const [provinceId, setProvinceId] = useState("");
  const [province, setProvince] = useState(editAddress[0] && editAddress[0].province);
  const [cities, setCities] = useState(data.cities);
  const [cityId, setCityId] = useState("");
  const [city, setCity] = useState(editAddress[0] && editAddress[0].city);
  const [district, setDistrict] = useState(editAddress[0] && editAddress[0].district);
  const [postal_address, setPostal_address] = useState(
    editAddress[0] && editAddress[0].postal_address
  );
  const [postal_code, setPostal_code] = useState(editAddress[0] && editAddress[0].postal_code);
  const [plaque, setPlaque] = useState(editAddress[0] && editAddress[0].plaque);

  const onSelectProvince = (provId) => {
    const selCities = data.cities.filter((c) => c.provinceId === provId);
    const selProvince = data.provinces.find((c) => c.id === provId);
    setProvinceId(provId);
    setCities(selCities);
    setProvince(selProvince.name);
  };
  const onSelectCity = (city) => {
    const selCity = data.cities.find((c) => c.id === city);
    setCityId(city);
    setCity(selCity.name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const editedAddress = shippingAddress.map((address) => {
      if (address.id == editAddress[0].id) {
        return {
          ...address,
          receiver,
          receiver_phone,
          province,
          city,
          district,
          postal_address,
          postal_code,
          plaque,
          location:[0,0],          
          is_default: editAddress[0] && editAddress[0].is_default,
        };

      } else {
        return {
          ...address,
        };
      }

    });

    dispatch(editShippingAddress([editedAddress]));
    let deepCopyObj = JSON.parse(JSON.stringify(editedAddress));
    let fShippingAddress=deepCopyObj.map(rs => {delete rs['id']; return rs})
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

    props.onEditChange('');
  };
  return (
    <React.Fragment>
      <div className="container mx-auto">
        <Tab.Container id="left-tabs-example">
          <Row className="mb-5">
            <Form className="m-auto mb-5">
              <Form.Group as={Row} controlId="receiver">
                <Form.Label column="lg" lg={3}>
                  نام گیرنده
                  <span className="form-required" title="این فیلد اجباری است.">
                    *
                  </span>
                </Form.Label>
                <Col lg={9}>
                  <Form.Control
                    size="lg"
                    type="text"
                    required
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <br />
              <Form.Group as={Row} controlId="receiver_phone">
                <Form.Label column="lg" lg={3}>
                  شماره تلفن همراه
                  <span className="form-required" title="این فیلد اجباری است.">
                    *
                  </span>
                </Form.Label>
                <Col lg={9}>
                  <Form.Control
                    size="lg"
                    required
                    type="number"
                    value={receiver_phone}
                    onChange={(e) => setReceiver_phone(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <br />
              <Form.Group as={Row} controlId="postalCode">
                <Form.Label column="lg" lg={3}>
                  کدپستی
                  <span className="form-required" title="این فیلد اجباری است.">
                    *
                  </span>
                </Form.Label>
                <Col lg={9}>
                  <Form.Control
                    required
                    size="lg"
                    type="postal_code"
                    value={postal_code}
                    onChange={(e) => setPostal_code(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <br />

              <Form.Group as={Row} controlId="province">
                <Form.Label column="lg" lg={3}>
                  استان/شهر
                </Form.Label>
                <Col lg={9}>
                  <Province
                    defaultValue="انتخاب استان"
                    data={provinces}
                    selectedId={provinceId}
                    onSelect={onSelectProvince}
                    required
                  />
                </Col>
              </Form.Group>
              <br />
              <Form.Group as={Row} controlId="city">
                <Form.Label column="lg" lg={3}></Form.Label>
                <Col lg={9}>
                  <City
                    defaultValue="انتخاب شهر"
                    data={cities}
                    selectedId={cityId}
                    onSelect={onSelectCity}
                    required
                  />
                </Col>
              </Form.Group>
              <br />
              <Form.Group as={Row} controlId="district">
                <Form.Label column="lg" lg={3}>
                  منطقه
                  <span className="form-required" title="این فیلد اجباری است.">
                    *
                  </span>
                </Form.Label>
                <Col lg={9}>
                  <Form.Control
                    size="lg"
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <br />
              <Form.Group as={Row} controlId="plaque">
                <Form.Label column="lg" lg={3}>
                  پلاک
                  <span className="form-required" title="این فیلد اجباری است.">
                    *
                  </span>
                </Form.Label>
                <Col lg={9}>
                  <Form.Control
                    size="lg"
                    type="number"
                    value={plaque}
                    onChange={(e) => setPlaque(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <br />

              <Form.Group as={Row} controlId="address">
                <Form.Label column="lg" lg={3}>
                  آدرس
                  <span className="form-required" title="این فیلد اجباری است.">
                    *
                  </span>
                </Form.Label>
                <Col lg={9}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={postal_address}
                    onChange={(e) => setPostal_address(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Button variant="secondary" onClick={handleSubmit} closebutton="true">
                ویرایش آدرس
              </Button>
            </Form>
          </Row>
        </Tab.Container>
      </div>
    </React.Fragment>
  );
};
export default AddressEdit;

