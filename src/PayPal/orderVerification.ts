const clientId = "AWuutuwcDjV1bKKKixdtA9LkXEw8tSNoUjQXpOBIJlqutaGdLakuH-Q0_HXQQuRbegsOrE1ae78yK8Ik";
const clientSecret = "EKcW6HHiLmaKU0LKX2Kk7OE27tHJDjS3LeTGeKiPG1eUL7F3R5BqD08Y0aizzDm5QHz5wqU-hKK3bwIv";
const authToken = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

const headers = {
  "Content-Type": "application/json",
  Authorization: `Basic ${authToken}`,
};

export const orderVerification = async (orderId:string) => {
  try {
    const response = await fetch(`https://api.paypal.com/v2/checkout/orders/${orderId}`, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    if (response.ok) {
      // console.log(data);
      return data;
    } else {
      console.log(data);
      throw new error(data);
    }
  } catch (error) {
    throw error(error.message);
  }
};


