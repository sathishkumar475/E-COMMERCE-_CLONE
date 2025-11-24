import React, { useEffect, useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import Grid2 from "@mui/material/Grid";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Updateproduct = () => {
  let Paperstyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };
  //    {
  //     "id": 1,
  //     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //     "price": 109.95,
  //     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //     "category": "men's clothing",
  //     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  //     "rating": {
  //       "rate": 3.9,
  //       "count": 120
  //     }
  //   },

  const [updateproduct, setUpdateproduct] = useState(null);
  let navigatchange = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((res) => setUpdateproduct(res.data));
  }, []);

  let handleChange = (e) => {
    let { value, name } = e.target;

    let fieldname = name.split("rating.")[1];
    console.log(fieldname);

    if (name.includes("rating.")) {
      setUpdateproduct({
        ...updateproduct,
        rating: {
          ...updateproduct.rating,
          [fieldname]: value,
        },
      });
    } else {
      setUpdateproduct({
        ...updateproduct,
        [name]: value,
      });
    }
  };
  let handleupdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/product/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updateproduct),
    }).then(() => {
      alert(" Saved  Successfully");
      navigatchange("/product");
    });
  };
  console.log(updateproduct);
  if (updateproduct !== null) {
    return (
      <Paper elevation={20} style={Paperstyle}>
        <Typography variant="h5" textAlign="center">
          Update Product
        </Typography>
        <Grid2
          component="form"
          style={{ display: "grid", gap: "20px " }}
          onSubmit={handleupdate}
        >
          <TextField
            value={updateproduct.title}
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            value={updateproduct.category}
            name="category"
            label="category"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <TextField
                value={updateproduct.rating.rate}
                name="rating.rate"
                type="number"
                label="Rate"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                value={updateproduct.rating.count}
                name="rating.count"
                type="number"
                label="Count"
                variant="outlined"
              />
            </Grid2>
          </Grid2>
          <Button variant="contained" type="submit" color="success">
            Save
          </Button>
        </Grid2>
      </Paper>
    );
  } else {
    <div>Loading...</div>;
  }
};

export default Updateproduct;
