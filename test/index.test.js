import { fantasticaxioswraper } from "../src/index";

async function testGETCall() {
  const response = await fantasticaxioswraper(
    "https://fakestoreapi.com",
    "/products/1",
    "GET"
  );
  console.log("GET request result:", response);
}

async function testPOSTCall() {
  const response = await fantasticaxioswraper(
    "https://fakestoreapi.com",
    "/products",
    "POST",
    {
      title: "test product",
      price: 13.5,
      description: "lorem ipsum set",
      image: "https://i.pravatar.cc",
      category: "electronic",
    }
  );
  console.log("POST request result:", response);
}

async function testInvalidCall() {
  try {
    await fantasticaxioswraper(
      "https://fakestoreapi.com",
      "/products/1",
      "DELETE" // Unsupported method
    );
    console.error("Unsupported method test failed (no error thrown)");
  } catch (error) {
    console.log("Unsupported method test passed");
  }
}

// Run tests
testGETCall();
testPOSTCall();
testInvalidCall();
