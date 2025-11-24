import React, { useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // ✅ correct import
import { useNavigate } from "react-router-dom";

const Newproduct = () => {
  const Paperstyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };

  const navigator = useNavigate();

  const [Newproduct, setNewProduct] = useState({
    title: "",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name.includes("rating.")) {
      const fieldname = name.split("rating.")[1];
      setNewProduct((prev) => ({
        ...prev,
        rating: {
          ...prev.rating,
          [fieldname]: value,
        },
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleadd = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/product", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Newproduct),
    }).then(() => {
      alert("Product Added Successfully");
      navigator("/product");
    });
  };

  return (
    <Paper elevation={20} style={Paperstyle}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Create New Product
      </Typography>

      <Grid2
        component="form"
        sx={{ display: "grid", gap: 2 }}
        onSubmit={handleadd}
      >
        <TextField
          value={Newproduct.title}
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />

        <TextField
          value={Newproduct.category}
          name="category"
          label="category"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />

        {/* Rate + Count side by side */}
        <Grid2 container spacing={2}>
          <Grid2 xs={6}>
            <TextField
              value={Newproduct.rating.rate}
              name="rating.rate"
              type="number"
              label="Rate"
              variant="outlined"
              fullWidth // ✅ makes it fill the half-width column
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 xs={6}>
            <TextField
              value={Newproduct.rating.count}
              name="rating.count"
              type="number"
              label="Count"
              variant="outlined"
              fullWidth // ✅
              onChange={handleChange}
            />
          </Grid2>
        </Grid2>

        <Button variant="contained" type="submit" fullWidth>
          Add
        </Button>
      </Grid2>
    </Paper>
  );
};

export default Newproduct;
