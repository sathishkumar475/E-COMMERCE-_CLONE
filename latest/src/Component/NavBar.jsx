import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import useFetch from "./Custom -hooks/useFetch";
import { useSearch } from "./SearchContext";

function NavBar() {
  const navigate = useNavigate();

  // ✅ searchQuery state from context
  const { searchQuery, setSearchQuery } = useSearch();

  // ✅ fetch products
  const { data: products = [] } = useFetch("http://localhost:5000/product");
  // default empty array to avoid undefined

  // ✅ filter products safely
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#1976d2", padding: "10px 0" }}
    >
      <Container fluid>
        <Navbar.Brand
          style={{ color: "#fff", fontWeight: "bold", fontSize: "1.5rem" }}
        >
          SathSoftware
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          style={{ backgroundColor: "#fff" }}
        />
        <Navbar.Collapse id="navbarScroll">
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              variant="light"
              onClick={() => navigate("/wishlist")}
            >
              <FaCartPlus style={{ color: "#1976d2" }} />
            </Button>
            <Button
              variant="outline-light"
              onClick={() => navigate("/checkout")}
            >
              Go to Cart
            </Button>
          </div>
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Form className="d-flex" style={{ justifyContent: "center" }}>
              <div
                style={{
                  display: "flex",
                  width: "40%",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Form.Control
                  type="search"
                  placeholder="Search products..."
                  className="me-2"
                  aria-label="Search  vaer"
                  value={searchQuery} // ✅ controlled input
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ height: "45px", width: "400px", fontSize: "16px" }}
                />
                <div
                  style={{
                    fontSize: "20px",
                    color: "#667eea",
                    padding: "5px 10px",
                  }}
                >
                  <FaSearch />
                </div>
              </div>
            </Form>

            {/* ✅ show filtered product count */}
            {/* {searchQuery && (
              <p
                style={{ color: "#fff", marginTop: "10px", marginBottom: "0" }}
              >
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            )} */}

            <Nav.Link
              as={Link}
              to="/home"
              style={{ color: "#fff", fontWeight: "500" }}
            >
              Back Home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
