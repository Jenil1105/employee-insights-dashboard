# Employee Insights Dashboard

This project is a **React-based Employee Insights Dashboard** built as part of the **Jotish Frontend Developer Assignment**.

The application demonstrates handling of **browser hardware APIs, custom virtualization, canvas-based image processing, and data visualization** without relying on UI component libraries.

---

# Tech Stack

- React
- React Router
- React Context API
- Tailwind CSS
- HTML5 Canvas
- SVG (Custom Charts)
- React Leaflet (Map Visualization)

---

# Application Overview

The application contains **four major screens**:

1. Login (Authentication)
2. High Performance Employee List
3. Identity Verification (Camera + Signature)
4. Analytics Dashboard (Chart + Map)

---

# 1. Authentication

Authentication is implemented using **React Context API**.

Features:
- Protected routes
- Session persistence using `localStorage`
- Redirect to login if user is not authenticated

When the user logs in successfully, the authentication state is stored in localStorage.

Example:

```
auth = true
```

This ensures the user remains logged in even after refreshing the page.

---

# 2. High Performance Employee Grid (Custom Virtualization)

The employee dataset is fetched from the provided API.

Since datasets can be large, the application implements **custom virtualization** instead of rendering all rows in the DOM.

## Core Idea

Instead of rendering the entire dataset, only the rows that are currently visible inside the viewport are rendered.

The system calculates:

- Current scroll position
- Row height
- Container height

Based on these values, it determines which rows should be visible.

## Virtualization Strategy

1. Determine the current scroll position of the container.
2. Calculate which portion of the dataset should be visible.
3. Render only those rows along with a small buffer for smooth scrolling.
4. Maintain the full scrollable height of the dataset.
5. Position visible rows correctly using vertical offset.

This approach significantly improves performance by reducing the number of DOM nodes rendered.

---

# 3. Identity Verification (Camera + Signature)

The details page implements **identity verification using browser hardware APIs**.

## Camera Capture

The browser **MediaDevices API** is used to capture the employee photo.

```
navigator.mediaDevices.getUserMedia()
```

This allows accessing the device camera directly from the browser.

## Signature Overlay

After capturing the photo, a **canvas overlay** appears on top of the image.

Users can draw their signature using mouse events:

- mousedown
- mousemove
- mouseup
- mouseleave

This allows freehand drawing directly over the captured photo.

---

# Image Merging Logic

To generate the **final audit image**, the captured photo and signature drawing are merged using a canvas.

Steps:

1. Create a canvas element.
2. Draw the captured photo onto the canvas.
3. Draw the signature canvas on top of the photo.
4. Export the merged result using:

```
canvas.toDataURL("image/png")
```

The output is a **single image containing both the captured photo and the signature**.

---

# 4. Analytics Dashboard

The analytics page visualizes employee data.

## Salary Distribution Chart

A **custom SVG bar chart** is implemented to display salary distribution across cities.

Chart libraries like Chart.js or D3 were intentionally not used.

The chart dynamically scales bar heights relative to the maximum salary value.

## Geospatial Map

City locations are visualized on a world map using **React Leaflet**.

Each city is mapped to geographic coordinates.

Example:

```
const cityCoordinates = {
  Edinburgh: [55.9533, -3.1883],
  Tokyo: [35.6762, 139.6503],
  "San Francisco": [37.7749, -122.4194],
  "New York": [40.7128, -74.0060],
  London: [51.5072, -0.1276],
  Sidney: [-33.8688, 151.2093],
  Singapore: [1.3521, 103.8198]
}
```

Markers are rendered on the map using these coordinates.

---

# Intentional Bug (Required by Assignment)

An intentional bug has been added to simulate a **browser hardware resource leak**.

## Location


[src/pages/Details.jsx](src/pages/Details.jsx)    (Commented Part)


## Description

After capturing a photo using the camera, the **MediaStream tracks are not stopped**.

Normally the camera stream should be cleaned up using:

```
stream.getTracks().forEach(track => track.stop());
```

However, this cleanup code has been intentionally commented out.

## Result

The camera stream may continue running in the background after capturing the image, which can lead to a **MediaStream resource leak**.

This bug was intentionally introduced to satisfy the assignment requirement of including a **performance or logic vulnerability**.

---

# Performance Considerations

- Custom virtualization reduces DOM rendering cost
- Only visible rows are rendered
- Smooth scrolling with large datasets
- Efficient canvas operations for image processing

---
# Running the Project

## 1. Clone the Repository

```
https://github.com/Jenil1105/employee-insights-dashboard.git
```

## 2. Navigate to the Project Directory

```
cd employee-insights-dashboard
```

## 3. Install Dependencies

```
npm install
```

## 4. Start the Development Server

```
npm run dev
```

The application will start on:

```
http://localhost:5173
```

Open the URL in your browser to access the dashboard.
---

# Login Credentials

```
Username: testuser
Password: Test123
```

---

# Notes

The project intentionally avoids:

- UI component libraries
- Charting libraries
- Virtualization libraries

All features are implemented using **core React concepts and browser APIs**.
