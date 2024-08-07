import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Button, Row } from "react-bootstrap";
import Province from "../../components/address/province.component";
import City from "../../components/address/city.component";
import PROVINCES from "../../components/checkout/province.data";
import CITIES from "../../components/checkout/cities.data";
import { saveShippingAddress } from "../../redux/cart/cart.actions";
import API_URL from "../../configurations/environment";
import uuid from 'react-uuid'
import axiosInstance from "../../configurations/axiosInstance";

const data = {
  provinces: PROVINCES,
  cities: CITIES,
};

const AddressAdd = (props) => {
  const [validated, setValidated] = useState(false);
  const userToken = useSelector((state) => state.user.userToken);
  const refreshToken = useSelector((state) => state.user.refreshToken);
  const [receiver, setReceiver] = useState("");
  const [receiver_phone, setReceiver_phone] = useState("");
  const [provinces, setProvinces] = useState(data.provinces);
  const [provinceId, setProvinceId] = useState();
  const [province, setProvince] = useState("");
  const [cities, setCities] = useState(data.cities);
  const [cityId, setCityId] = useState();
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState();
  const [postal_address, setPostal_address] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [plaque, setPlaque] = useState("");
  const dispatch = useDispatch();
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
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
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() !== false) {
      event.stopPropagation();
      dispatch(
        saveShippingAddress([
          {
            id: uuid(),
            receiver,
            receiver_phone,
            province,
            city,
            district,
            postal_address,
            postal_code,
            plaque,
            is_default: shippingAddress.length > 0 ? false : true,
            location: [0, 0]

          },
        ])
      );
      let deepCopyObj = JSON.parse(JSON.stringify(shippingAddress));
      let fShippingAddress = deepCopyObj.map(rs => { delete rs['id']; return rs })
      try {
        axiosInstance(userToken, refreshToken, dispatch).get(`${API_URL}/users/self`, {
          method: "put",
          responseType: "stream",
          data: {
            addresses: [
              ...fShippingAddress,
              {
                receiver,
                receiver_phone,
                province,
                city,
                district,
                postal_address,
                postal_code,
                plaque,
                location: [0, 0],
                is_default: shippingAddress.length > 0 ? false : true,
              },
            ],
          }
        })
        props.onChange(false);
      }
      catch (ex) {
        console.log(ex)
      }  
    }
    setValidated(true);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="m-auto mb-5">
        <Form.Group as={Row} controlId="receiver">
          <Form.Label column="lg" lg={3}>
            نام گیرنده
            <span className="form-required" title="این فیلد اجباری است.">
              *
            </span>
          </Form.Label>
          <Col lg={9}>

            <Form.Control
              hasvalidation
              size="lg"
              type="text"
              value={receiver}
              required
              onChange={(e) => setReceiver(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              لطفا نام گیرنده را وارد کنید
            </Form.Control.Feedback>


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
              hasvalidation
              size="lg"
              type="number"
              value={receiver_phone}
              required
              onChange={(e) => setReceiver_phone(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              لطفا شماره تلفن همراه را وارد کنید
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <br />
        <Form.Group as={Row} controlId="postalCode">
          <Form.Label column="lg" lg={3}>
            کدپستی

          </Form.Label>
          <Col lg={9}>
            <Form.Control
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
              required={true}
            />
            <Form.Control.Feedback type="invalid">
              لطفا منطقه خود را وارد کنید
            </Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">
              لطفا پلاک خود را وارد کنید
            </Form.Control.Feedback>
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
              hasvalidation
              as="textarea"
              rows={3}
              value={postal_address}
              onChange={(e) => setPostal_address(e.target.value)}
              required

            />
            <Form.Control.Feedback type="invalid">
              لطفا آدرس خود را وارد کنید
            </Form.Control.Feedback>

          </Col>
        </Form.Group>
        <Button type="submit" variant="secondary" closebutton="true">
          افزودن آدرس
        </Button>
      </Form>
    </div>
  );
};

export default AddressAdd;
