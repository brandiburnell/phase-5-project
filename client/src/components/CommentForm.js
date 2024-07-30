import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Typography } from "@mui/material";

function CommentForm () {
    const params = useParams();
    const itemId = params.itemId;
    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        description: yup.string().required("must enter a review body"),
        subject: yup.string().required("must enter a review title"),
        username: yup.string().required("must enter a username")
    });

    const formik = useFormik({
        initialValues: {
            description: "",
            subject: "",
            username: "",
            itemId: parseInt(itemId)
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values);
            fetch('/comments', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
                .then((res) => {
                    if (res.status === 201) {
                      formik.resetForm();
                      navigate(`/items/${itemId}`)
                    }
                });
        }
    });

    return (
        <div className="comment-form-container">
            <Typography variant="h2">add a comment using the form below</Typography>
            <form id="add-comment-form" className="item-form" onSubmit={formik.handleSubmit}>
                <label className="form-box">username:</label>
                <input
                    id="username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                >
                </input>
                <p className="error-tag">{formik.errors.username}</p>
                <br />
                <label className="form-box">comment title:</label>
                <input
                    id="subject"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                >
                </input>
                <p className="error-tag">{formik.errors.subject}</p>
                <br />
                <label className="form-box">comment:</label>
                <input 
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                >
                </input>
                <p className="error-tag">{formik.errors.description}</p>
                <br />
                <button type="submit" className="submit-button">submit comment</button>
            </form>
        </div>
    );
}

export default CommentForm;