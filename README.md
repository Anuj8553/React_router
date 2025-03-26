# React Router Setup and Explanation

## 1. Setting Up React Router
Before we can use routing, we need to install React Router. Run:
```sh
npm install react-router-dom
```
Now, let's configure routing.

---

## 2. Configuring Routes in `main.jsx`
Your `main.jsx` is the entry point where we define routes. Here's how we set up the router:

### Code for `main.jsx`
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Github, { githubInfoLoader } from "./Components/Github/Github";
import User from "./Components/User/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/github", element: <Github />, loader: githubInfoLoader },
      { path: "/user/:userid", element: <User /> }, // Dynamic route
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

### 3. Understanding This Setup
- `createBrowserRouter()` defines all routes.
- `RouterProvider` connects our app to the router.
- The `Layout` component wraps all pages, meaning it provides a common structure (like a navbar).
- `children` inside `/` means these pages are rendered inside `Layout`.

---

## 4. Creating a Layout for Shared UI
### Code for `Layout.jsx`
```jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
```
### How This Works
- `<Header />` and `<Footer />` appear on every page.
- `<Outlet />` dynamically renders the page matching the route.

---

## 5. Linking Pages Using `NavLink`
### Code in `Header.jsx`
```jsx
<NavLink to="/" className={({ isActive }) => isActive ? "text-orange-700" : "text-gray-700"}>
  Home
</NavLink>
<NavLink to="/about" className={({ isActive }) => isActive ? "text-orange-700" : "text-gray-700"}>
  About
</NavLink>
<NavLink to="/contact" className={({ isActive }) => isActive ? "text-orange-700" : "text-gray-700"}>
  Contact Us
</NavLink>
<NavLink to="/github" className={({ isActive }) => isActive ? "text-orange-700" : "text-gray-700"}>
  Github
</NavLink>
```
### How This Works
- `NavLink` highlights the active link using `isActive`.
- Clicking links updates the URL without a page refresh.

---

## 6. Handling Dynamic Routes
We use `useParams()` to get dynamic values.

### Code in `User.jsx`
```jsx
import React from "react";
import { useParams } from "react-router-dom";

function User() {
  const { userid } = useParams();
  return (
    <div>
      User: {userid}
    </div>
  );
}

export default User;
```
### How This Works
- `useParams()` extracts `userid` from the URL.
- Visiting `/user/anuj` will display `User: anuj`.

---

## 7. Using Loaders to Fetch Data Before Rendering
### Code in `Github.jsx`
```jsx
import React from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData();
  return (
    <div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
      Github: {data.followers}
      <img src={data.avatar_url} alt="GitHub Profile" width={300} />
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/anuj8553");
  return response.json();
};
```
### How This Works
- `useLoaderData()` fetches data before rendering.
- The `githubInfoLoader` function is defined in `main.jsx` as the loader for `/github`.

---

## 8. Summary
- Define routes in `main.jsx` using `createBrowserRouter()`.
- Use `Layout.jsx` to wrap common UI (Header, Footer).
- Link pages using `NavLink`.
- Fetch data before rendering using loaders.
- Handle dynamic routing using `useParams()`.

---

# Use and Used For

### `createBrowserRouter()`
**Used to:** Define all application routes.
**Use case:** Setting up structured navigation in `main.jsx`.

### `RouterProvider`
**Used to:** Provide routing context to the entire application.
**Use case:** Wrapping the app to make routing work.

### `Layout.jsx`
**Used to:** Maintain a common UI structure across different pages.
**Use case:** Adding a shared header and footer to all pages.

### `Outlet`
**Used to:** Render the matching child route dynamically inside `Layout`.
**Use case:** Displaying different page content within a common layout.

### `NavLink`
**Used to:** Create navigation links that highlight when active.
**Use case:** Providing user-friendly navigation in the header.

### `useParams()`
**Used to:** Extract dynamic parameters from the URL.
**Use case:** Fetching and displaying user-specific content in `User.jsx`.

### `useLoaderData()`
**Used to:** Load data before rendering a component.
**Use case:** Preloading GitHub user data before rendering `Github.jsx`.

### `loader` function
**Used to:** Fetch external data before the component mounts.
**Use case:** Fetching GitHub API data before rendering the page.

This document provides a structured guide to setting up and using React Router efficiently.
