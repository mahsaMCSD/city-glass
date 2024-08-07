import { useRouter } from "next/router";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Metadata from "../../components/seo/metadata";
import { contact } from "../../services/otherService";
const Contact = () => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [cell_phone, setCell_phone] = useState("")
    const [content, setContent] = useState("")
    const router = useRouter()
    const { dep } = router.query;
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() !== false) {
            event.stopPropagation();
            contact(name, phone, cell_phone, content, dep);

        }

        setValidated(true);
    };

    return (
        <React.Fragment>
            <Metadata title="شهرگلس - ارتباط با ما" />;
            <div className="container-fluid p-0 bg-light">
                <div className="container py-3">
                    <p className="text-secondary">کاربر گرامی؛ چنانچه خواستار ارتباط با ما هستید پیغام خود را ارسال کنید. </p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card border-white">
                                <div className="card-body">
                                    <h3 className="">پیام شما</h3>
                                    <div className="devider-border mt-3 mb-3 mx-2 w-95"></div>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Form.Label column="lg" lg={3}>
                                            نام
                                            <span className="form-required" title="این فیلد اجباری است.">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            hasvalidation
                                            size="lg"
                                            type="text"
                                            value={name}
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            لطفا شماره ثابت  را وارد کنید
                                        </Form.Control.Feedback>
                                        <Form.Label column="lg" lg={3}>
                                            شماره ثابت
                                            <span className="form-required" title="این فیلد اجباری است.">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            hasvalidation
                                            size="lg"
                                            type="text"
                                            value={phone}
                                            required
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            لطفا شماره ثابت  را وارد کنید
                                        </Form.Control.Feedback>

                                        <Form.Label column="lg" lg={3}>
                                            موبایل
                                            <span className="form-required" title="این فیلد اجباری است.">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            hasvalidation
                                            size="lg"
                                            type="text"
                                            value={cell_phone}
                                            required
                                            onChange={(e) => setCell_phone(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            لطفا شماره موبایل  را وارد کنید
                                        </Form.Control.Feedback>
                                        <div className="form-group mb-3">
                                            <label className="mb-3" htmlFor="cell_phone">دپارتمان<i className="color-pink">*</i>
                                            </label>
                                            <input type="text" value={dep} className="form-control bg-light border-white rounded"
                                                id="department" disabled aria-describedby="department" />
                                        </div>

                                        <Form.Label column="lg" lg={3}>
                                            پیام
                                            <span className="form-required" title="این فیلد اجباری است.">
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            className="mb-3"
                                            hasvalidation
                                            size="lg"
                                            value={content}
                                            as="textarea" rows={3}
                                            required
                                            onChange={(e) => setContent(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            لطفا پیام  را وارد کنید
                                        </Form.Control.Feedback>
                                        <Button type="submit" className="btn btn-pink w-100 rounded-0">ارسال</Button>
                                    </Form>
                                </div>
                            </div>
                        </div>

                        <a target="_blank" href="https://goo.gl/maps/tCiKj1i7cBirkToE6" className="col-md-6 overflow-hidden" style={{ height: '40rem' }}>
                            <img src="../image/map.png" />
                        </a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Contact;
