import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Collapse from 'react-bootstrap/Collapse';
import {
  fetchCategoriesWithEachRoot,
} from "../../services/filterService";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCategorySubWithFilterKey } from "../../redux/product/product.action";
import Form from "react-bootstrap/Form";

const FilterDirectory = (props) => {
  const [catDevices, setCatDevices] = useState([]);
  const [catModels, setCatModels] = useState([]);
  const [catBrands, setCatBrands] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [activeKey, setActiveKey] = useState(0)
  const mainCatSubFilterKeyBaseds = useSelector((state) => state.product.mainCatSubFilterKeyBased);

  const [device, setDevice] = useState("device");
  const [model, setModel] = useState("model");
  const [brand, setBrand] = useState("brand");

  let menuFiltered = useSelector((state) => state.product.menuFiltered);
  let catSubLoading = useSelector((state) => state.product.catSubLoading);
  let rootFilterKey = "";
  let secondFilterKey = "";
  let defaultActiveKeyRoot = "";
  let innerText = "";
  if (menuFiltered) {
    rootFilterKey = menuFiltered[0].rootFilterKey;
    secondFilterKey = menuFiltered[0].secondFilterKey;
    innerText = menuFiltered[0].innerText;
  }
  defaultActiveKeyRoot = rootFilterKey;
  const dispatch = useDispatch()

  const toggle = (idx) => {
    setOpenEdit(idx)
    dispatch(fetchCategorySubWithFilterKey(idx))
  }
  useEffect(() => {
    if (secondFilterKey || secondFilterKey != null) {
      toggle(secondFilterKey);
    }
  }, [])
  useEffect(() => {
    fetchCategoriesWithEachRoot(device).then((catOfRoot) =>
      setCatDevices(catOfRoot)
    );
    fetchCategoriesWithEachRoot(model).then((catOfRoot) =>
      setCatModels(catOfRoot)
    );
    fetchCategoriesWithEachRoot(brand).then((catOfRoot) =>
      setCatBrands(catOfRoot)
    );
  }, []);

  return (
    <React.Fragment>


      <Accordion className="filter-accordion" defaultActiveKey={defaultActiveKeyRoot}>
        <Accordion.Item eventKey="device">
          <Accordion.Header>نوع دستگاه</Accordion.Header>
          <Accordion.Body eventKey="device">
            {catDevices.map((catDevice, id) =>
              catDevice.is_last_node ? (
                <Form.Check
                  key={id}
                  label={catDevice.category}
                  value={catDevice.category}
                  defaultChecked={
                    catDevice.category === innerText ? true : false
                  }
                  name={device}
                  onChange={props.handleChangeCategory}
                />
              ) : (
                <Accordion key={id}>
                  <Accordion.Item
                    eventKey="device"
                    className="btn btn-default"
                  >
                    {catDevice.category}
                  </Accordion.Item>
                </Accordion>
              )
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>


      <Accordion className="filter-accordion" defaultActiveKey={defaultActiveKeyRoot}>
        <Accordion.Item eventKey="model">
          <Accordion.Header>مدل</Accordion.Header>
          <Accordion.Body eventKey="model">
            {catModels.map((catModel, idx) =>
              catModel.is_last_node ? (
                <Form.Check
                  key={idx}
                  label={catModel.category}
                  defaultChecked={
                    catModel.category === innerText ? true : false
                  }
                  value={catModel.category}
                  name={model}
                  onChange={props.handleChangeCategory}
                />
              ) : (
                <React.Fragment>
                  <button
                    className="cursor-pointer d-flex justify-content-between btn btn-default w-100"
                    onClick={() => toggle(catModel.filter_key)}
                    aria-controls={catModel.filter_key}
                    aria-expanded={openEdit}
                  >
                    {catModel.category}
                    <div className={openEdit === catModel.filter_key?`collapse-button-open`:'collapse-button-close'}></div>
                  </button>
                  <Collapse className="mx-4" in={openEdit === catModel.filter_key}>
                    <div id={catModel.category}>
                      {catSubLoading == false ? mainCatSubFilterKeyBaseds &&
                        mainCatSubFilterKeyBaseds.map((mainCatSubFilterKeyBased, idx) => {
                          return (
                            <Form.Check
                              defaultChecked={
                                mainCatSubFilterKeyBased.category ===
                                  innerText
                                  ? true
                                  : false
                              }
                              key={idx}
                              onChange={props.handleChangeCategory}
                              value={mainCatSubFilterKeyBased.category}
                              label={mainCatSubFilterKeyBased.category}
                              name={model}
                            />

                          );
                        }) :
                        <div className="loading d-flex justify-content-center">
                          <img height="100" src="/image/ShahrGlassLoading.gif" alt="loading" />
                        </div>}


                    </div>
                  </Collapse>

                </React.Fragment>
              )
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion className="filter-accordion" defaultActiveKey={defaultActiveKeyRoot}>
        <Accordion.Item eventKey="brand">
          <Accordion.Header>برند</Accordion.Header>
          <Accordion.Body eventKey="brand">
            {catBrands.map((catBrand, id) =>
              catBrand.is_last_node ? (
                <Form.Check
                  key={id}
                  label={catBrand.category}
                  name={brand}
                  value={catBrand.category}
                  defaultChecked={
                    catBrand.category === innerText ? true : false
                  }
                  onChange={props.handleChangeCategory}
                />
              ) : (
                <Accordion key={id}>
                  <Accordion.Body
                    eventKey="brand"
                    className="btn btn-default"
                  >
                    {catBrand.category}
                  </Accordion.Body>

                </Accordion>
              )
            )}
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </React.Fragment>
  );
};

export default FilterDirectory;
