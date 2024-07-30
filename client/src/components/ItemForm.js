import React, { useState, useEffect } from "react";
import "../components/styles/ItemForm.css"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Typography } from "@mui/material";

function ItemForm() {
    const [refreshPage, setRefreshPage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // setBooks([...books]);
        if (refreshPage) {
            navigate('/');
        }
    //eslint-disable-next-line
    }, [refreshPage]);

    const formSchema = yup.object().shape({
        name: yup.string().required("must enter an item name"),
        description: yup.string().required("must enter a description"),
        yearPurchased: yup.number().positive().integer()
                        .required("must enter a year purchased")
                        .typeError("please enter an integer")
                        .min(1920, "year published must be greater than 1920")
                        .max(2024, "year published must be less than 2024"),
        imageUrl: yup.string().required("must enter an image url").url("image url must be a valid url"),
        // add owner as current user
        ownerId: yup.number().positive().integer()
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            yearPurchased: "",
            imageUrl: "",
            ownerId: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/items', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
                .then((res) => {
                    if (res.status === 201) {
                        formik.resetForm();
                        setRefreshPage(!refreshPage);
                    }
                });
        }
    });

    return (
        <div className="item-form-container">
            <Typography variant="h2">add a new piece of gear using the form below</Typography>
            <form id="add-item-form" className="item-form" onSubmit={formik.handleSubmit}>
                <label className="form-box">name:</label>
                <input
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                >
                </input>
                <p className="error-tag">{formik.errors.name}</p>
                <br/>
                <label className="form-box">description:</ label>
                <input
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                >
                </input>
                <p className="error-tag">{formik.errors.description}</p>
                <br />
                <label className="form-box">year purchased:</label>
                <input
                    id="yearPurchased"
                    name="yearPurchased"
                    value={formik.values.yearPurchased}
                    onChange={formik.handleChange}
                    type="number"
                >
                </input>
                <p className="error-tag">{formik.errors.yearPurchased}</p>
                <br />
                <label className="form-box">gear image:</label>
                <input
                    id="imageUrl"
                    name="imageUrl"
                    value={formik.values.imageUrl}
                    onChange={formik.handleChange}
                >
                </input>
                <p className="error-tag">{formik.errors.imageUrl}</p>
                <br />
                <label className="form-box">owner id:</label>
                <input 
                    id="ownerId"
                    name="ownerId"
                    value={formik.values.ownerId}
                    onChange={formik.handleChange}
                >
                </input>
                <p className="error-tag">{formik.errors.ownerId}</p>
                <button type="submit" className="submit-button">add gear</button>
            </form>
        </div>
    );
}

export default ItemForm;