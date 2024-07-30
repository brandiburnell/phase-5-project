import React, { useState, useEffect } from "react";
import "../components/styles/ItemForm.css"
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Typography } from "@mui/material";

function UpdateItemForm() {
    const [refreshPage, setRefreshPage] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const itemId = params.itemId;
    const [item, setItem] = useState({});

    useEffect(() => {
        fetch(`/items/${itemId}`)
        .then(r => r.json())
        .then(item => setItem(item))
        .catch(error => console.error(error));
    //eslint-disable-next-line
    }, [refreshPage]);

    const formSchema = yup.object().shape({
        name: yup.string(),
        description: yup.string(),
        yearPurchased: yup.number().positive().integer()
                        .typeError("please enter an integer")
                        .min(1920, "year published must be greater than 1920")
                        .max(2024, "year published must be less than 2024"),
        imageUrl: yup.string(),
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
            fetch(`/items/${itemId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.json);
                        navigate(`/items/${itemId}`)
                    }
                });
        }
    });

    return (
        <div className="item-form-container">
            <Typography variant="h2">update {item.name} using the form below</Typography>
            <Typography variant="h3" sx={{textAlign: "center"}}>leave fields blank that you wish to remain unchanged</Typography>
            <form id="add-item-form" className="item-form" onSubmit={formik.handleSubmit}>
                <label className="form-box">name:</label>
                <input
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder={item.name}
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
                    placeholder={item.description}
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
                    placeholder={item.year_purchased}
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
                    placeholder={item.image_url}
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
                    placeholder={item.owner_id}
                >
                </input>
                <p className="error-tag">{formik.errors.ownerId}</p>
                <button type="submit" className="submit-button">add gear</button>
            </form>
        </div>
    );
}

export default UpdateItemForm;