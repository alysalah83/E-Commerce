export async function getAddressInformation({ latitude, longitude }) {
  try {
    const response = await fetch(
      `/api/geocode?lat=${latitude}&lon=${longitude}`,
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching address:", errorData);
      throw new Error("Couldn't get your address information");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Address fetch error:", error);
    throw new Error("Couldn't get your address information");
  }
}
