# API Documentation

## Overview

This document provides an overview of the API endpoints available in the ecomarket application. The API is designed to facilitate user registration, authentication, product catalog management, and notification services.

## Base URL

The base URL for the API is:

```
http://localhost:8080/api
```

## Authentication Service

### Register User

- **Endpoint:** `POST /auth/register`
- **Description:** Registers a new user in the system.
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "phone": "string",
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  }
  ```
- **Response:**
  - **201 Created:** User registered successfully.
  - **400 Bad Request:** Validation errors.

### Login User

- **Endpoint:** `POST /auth/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK:** Returns JWT token.
  - **401 Unauthorized:** Invalid credentials.

## Catalog Service

### Get Products

- **Endpoint:** `GET /catalog/products`
- **Description:** Retrieves a list of products.
- **Response:**
  - **200 OK:** Returns an array of products.
  - **500 Internal Server Error:** Server error.

### Get Product by ID

- **Endpoint:** `GET /catalog/products/{id}`
- **Description:** Retrieves a single product by its ID.
- **Response:**
  - **200 OK:** Returns the product details.
  - **404 Not Found:** Product not found.

## Notification Service

### Send Notification

- **Endpoint:** `POST /notifications/send`
- **Description:** Sends a notification to the user.
- **Request Body:**
  ```json
  {
    "userId": "string",
    "message": "string"
  }
  ```
- **Response:**
  - **200 OK:** Notification sent successfully.
  - **400 Bad Request:** Validation errors.

## Error Handling

All API responses will include an error message in the following format:

```json
{
  "error": "string"
}
```

## Conclusion

This API documentation serves as a guide for developers to understand the available endpoints and their usage. For further details, please refer to the individual service documentation.