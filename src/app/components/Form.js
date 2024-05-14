import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, InputLabel } from "@mui/material";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      latitude: 0,
      longitude: 0,
      // city: "",
      // country_region: "",
      // continent: "",
      name: "",
      message: "",
    },
    validationSchema: Yup.object({
      latitude: Yup.number().required("Required"),
      longitude: Yup.number().required("Required"),
      name: Yup.string()
        .required("Required")
        .min(2, "Must be longer than 2 characters")
        .max(50, "Must be shorter than 50 characters"),
      message: Yup.string()
        .required("Required")
        .min(9, "Must be longer than 9 characters"),
    }),
    onSubmit: async (values) => {
      const res = await fetch("/api/db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(res);
    },
  });

  // const getUserCityRegion = (position) => {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;

  //   // Make a request to a Geocoding API (e.g. Google Maps Geocoding API)
  //   const GEOCODE_API = process.env.GEOCODE_API;
  //   // const geocoding_url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_API_KEY}&region=AU&language=en`;
  //   const geocoding_url = `https://api.distancematrix.ai/maps/api/geocode/json?latlng=${latitude},${longitude}&language=en&result_type=street_address|political|country|locality&key=9aZFBa6eYPUpH650To7UnPSr3XEOx2zNMD2yfpVdjcplk44X9xSJLeglJNtwSW3P`
  //   fetch(geocoding_url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       console.log(data.status);
  //       // Parse the city name from the API response
  //       const city = data.result[0].address_components.find((component) =>
  //         component.types.includes("locality")
  //       ).long_name;
  //       const region = data.result[0].address_components.find((component) =>
  //         component.types.includes("country")
  //       ).long_name;

  //       console.log(`Your city is ${city}.`);
  //       console.log(`Your region is ${region}.`);

  //       // setUserCity(city);
  //       // setUserRegion(region);
  //       formik.setFieldValue("city", city);
  //       formik.setFieldValue("country_region", region);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      // what to do if supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // what to do once we have the position
          console.log(position);

          const { latitude, longitude } = position.coords;
          formik.setFieldValue("latitude", latitude);
          formik.setFieldValue("longitude", longitude);
          // getUserCityRegion(position);
        },
        (error) => {
          // display an error if we cant get the users position
          console.error("Error getting user location:", error);
        },
      );
    } else {
      // display an error if not supported
      console.error("Geolocation is not supported by this browser.");
    }
    // console.log(userLocation);
  };
  return (
    <form onSubmit={formik.handleSubmit} className="inline-flex flex-col">
      <fieldset className="inline-flex flex-col">
        <label htmlFor="get_location_button">
          Click the button to get your location.
        </label>
        <Button
          id="get_location_button"
          type="button"
          onClick={getUserLocation}
        >
          Get
        </Button>

        <InputLabel htmlFor="latitude">latitude</InputLabel>
        <Input
          id="latitude"
          name="latitude"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.latitude}
        />
        {formik.touched.latitude &&
        formik.values.latitude == formik.initialValues.latitude ? (
          <div className="input_invalid text-orange-500">
            {'Hit the button "Get" to get location'}
          </div>
        ) : null}

        <InputLabel htmlFor="longitude">longitude</InputLabel>
        <Input
          id="longitude"
          name="longitude"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.longitude}
        />
        {formik.touched.longitude &&
        formik.values.longitude == formik.initialValues.longitude ? (
          <div className="input_invalid text-orange-500">
            {'Hit the button "Get" to get location'}
          </div>
        ) : null}
        {/* 
        <label htmlFor='city'>city</label>
        <input
          id='city'
          name='city'
          // type='string'
          onchange={formik.handleChange}
          value={formik.values.city}
        />

        <label htmlFor='country_region'>country/region</label>
        <input
          id='country_region'
          name='country_region'
          // type='string'
          onchange={formik.handleChange}
          value={formik.values.country_region}
        />

        <label htmlFor='continent'>continent</label>
        <input
          id='continent'
          name='continent'
          onchange={formik.handleChange}
          value={formik.values.continent}
      />*/}
      </fieldset>

      <fieldset className="inline-flex flex-col">
        <InputLabel htmlFor="name">name</InputLabel>
        <Input
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="input_invalid text-orange-500">
            {formik.errors.name}
          </div>
        ) : null}

        <InputLabel htmlFor="message">message</InputLabel>
        <Input
          id="message"
          name="message"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
        />
        {formik.touched.message && formik.errors.message ? (
          <div className="input_invalid text-orange-500">
            {formik.errors.message}
          </div>
        ) : null}
      </fieldset>

      <Button type="submit" disabled={formik.isSubmitting}>
        Submit
      </Button>
    </form>
  );
};

export default SignupForm;
