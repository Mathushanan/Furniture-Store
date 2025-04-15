import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const verifyJwtToken = (token) => {
  if (token) {
    try {
      const decodedToken = jwtDecode(token);

      // Check for expiration
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        return {
          valid: false,
          userType: null,
          stateMessage: { type: "error", message: "JWT Expired!" },
        };
      }
      const issuer = decodedToken.iss;
      const audience = decodedToken.aud;

      if (
        issuer !== `${import.meta.env.VITE_JWT_ISSUER}` ||
        audience !== `${import.meta.env.VITE_JWT_AUDIENCE}`
        /*issuer !== `${process.env.JWT_ISSUER}` ||
        audience !== `${process.env.JWT_AUDIENCE}`*/
      ) {
        return {
          valid: false,
          userType: null,
          stateMessage: {
            type: "error",
            message: "You are blocked for this site!",
          },
        };
      } else {
        return {
          valid: true,
          userType: decodedToken.UserType,
          stateMessage: {
            type: "success",
            message: "User successfully verified!",
          },
        };
      }
    } catch (error) {
      console.error(
        "Error validating token:",
        error.response ? error.response.data : error.message
      );
      return {
        valid: false,
        userType: null,
        stateMessage: { type: "error", message: "Error validating token!" },
      };
    }
  } else {
    return {
      valid: false,
      userType: null,
      stateMessage: { type: "error", message: "Token not found!" },
    };
  }
};

export default verifyJwtToken;
